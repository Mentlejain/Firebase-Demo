/***
 * 
 * Service class for handle time more 24 hour
 * @file safetimer.service.ts
 * @description Service class for handle timeout and interval.
 * @author Ajay Kumawat
 * @since 11 Jun 2023
 */
export class Timer {
    private MAX_INT32: number
    private currentId: number
    private activeIds: any

    constructor() {
        this.MAX_INT32 = 2147483647
        this.currentId = 1
        this.activeIds = {}
    }

    private runAtDate = (internalId: number, callback: (...args: any[]) => void, date: Date) => {
        var now = Date.now();
        var then = date.getTime();
        var diff = Math.max((then - now), 0);
        var realId;
        if (diff > this.MAX_INT32) {
            realId = setTimeout(() => {
                this.runAtDate(internalId, callback, date);
            }, this.MAX_INT32);
        }
        else {
            realId = setTimeout(callback, diff);
        }
        this.activeIds["" + internalId] = {
            id: realId,
            type: "timeout"
        };
    }

    private runLongTimeout = (internalId: number, callback: (...args: any[]) => void, delay: number) => {
        this.runAtDate(internalId, callback, new Date(Date.now() + delay));
    }

    private runLongInterval = (internalId: number, callback: (...args: any[]) => void, delay: number) => {
        var intervalFunc = () => {
            callback();
            this.runLongInterval(internalId, callback, delay);
        };
        this.runAtDate(internalId, intervalFunc, new Date(Date.now() + delay));
    }

    private isNeedSafeTimer = (delay: number) => {
        return (
            typeof delay !== "number" ||
            (
                (delay < this.MAX_INT32 && delay > -this.MAX_INT32) ||
                isNaN(delay) ||
                delay === Infinity ||
                delay === -Infinity
            )
        );
    }

    private clear = (internalId: number): void => {
        if (typeof internalId === "string") {
            internalId = parseInt(internalId, 10);
        }
        // Only accept numerical ID values within the expected range
        if (
            typeof internalId !== "number" ||
            isNaN(internalId) ||
            internalId === Infinity ||
            internalId === -Infinity ||
            internalId < 1 ||
            internalId >= this.currentId
        ) {
            return;
        }

        var o = this.activeIds["" + internalId];
        if (o != null && typeof o.id === "string" && o.id) {
            if (o.type === "interval") {
                clearInterval(o.id);
            }
            else {
                clearTimeout(o.id);
            }
            delete this.activeIds["" + internalId];
        }
    }


    setTimeout = (callback: (...args: any[]) => void, delay: number): number => {
        var internalId = this.currentId++;
        if (this.isNeedSafeTimer(delay)) {
            var selfCleaningFunc = () => {
                callback();
                this.clear(internalId);
            };
            var realId = setTimeout(selfCleaningFunc, delay);

            this.activeIds["" + internalId] = {
                id: realId,
                type: "timeout"
            };
        }
        else {
            this.runLongTimeout(internalId, callback, delay);
        }
        return internalId;
    }

    setInterval = (callback: (...args: any[]) => void, delay: number): number => {
        var internalId = this.currentId++;
        if (this.isNeedSafeTimer(delay)) {
            var realId = setInterval(callback, delay);

            this.activeIds["" + internalId] = {
                id: realId,
                type: "interval"
            };
        }
        else {
            this.runLongInterval(internalId, callback, delay);
        }
        return internalId;
    }
    clearTimeout = this.clear
    clearInterval = this.clear
}