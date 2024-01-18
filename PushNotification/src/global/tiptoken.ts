import axios from "axios";
/***
 * 
 * Service class for mainatin tip access token
 * @file tip-token.service.ts
 * @description Service class for mainatin tip access token.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */

export class TipToken {
    private token: string;
    private timer: number;
    private retry: number
    private maxRetry: number
    private snoozeTime: number
    constructor() {
        this.token = '';
        this.retry = 0
        this.maxRetry = 3
        this.snoozeTime = 300
        this.init().catch(this.reset)

    }
    private reset = (e: string) => {
        console.log(e)
        this.retry = 0
        this.maxRetry = 3
        this.token = ''
    }

    private init = async () => {
        return new Promise(async (resolve: Function, reject: Function) => {
            try {
                this.token = ''
                let res = await axios.post(CONSTANT.TIP_ROUTE.AUTH,
                    {
                        "userId": process.env.TIP_USERID,
                        "password": process.env.TIP_PASSWORD
                    }
                )
                this.token = res.data.access_token
                this.scheduleRefreshToken(1000*(res.data.expires_in - this.snoozeTime));
                resolve()
            } catch (e) {
                this.retry = this.retry + 1
                if (this.retry <= this.maxRetry) {
                    setTimeout(() => resolve(this.init()), 10000);
                } else {
                    reject("Max Retries Exceeded For Init Tiptoken Cache. Shutting down the service.")
                }
            }
        })

    }
    private scheduleRefreshToken = (t: any) => {
        if (this.timer) {
            Timer.clearTimeout(this.timer);
        }
        this.timer = Timer.setTimeout(() => {
            this.init().catch(this.reset)
        }, t);
    }

    getToken = (): string => {
        if (!this.token) {
            this.init().catch(this.reset)
        }
        return this.token
    }
}