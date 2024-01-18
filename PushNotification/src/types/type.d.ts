export declare global {
    type SocketPayload = {
        category: string
        data: any
        orgId?: number | string
    }
}