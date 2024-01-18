export declare global{
    namespace RedisClient{
        function get(key: string): Promise<any>
        function getUEName(mac: string): string
    }
}