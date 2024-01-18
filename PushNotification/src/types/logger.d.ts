export declare global {
    namespace Logger {
        function info(message: any): void
        function debug(message: any): void
        function silly(message: any): void
        function warn(message: any): void
        function error(message: any): void
    }
}