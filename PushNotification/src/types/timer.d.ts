export declare global{
    namespace Timer {
        function setTimeout(callback: (...args: any[]) => void, delay: number): number
        function setInterval(callback: (...args: any[]) => void, delay: number): number
        function clearTimeout(timeoutId: number): void
        function clearInterval(intervalId: number): void
    }
}