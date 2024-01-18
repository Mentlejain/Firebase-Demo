export declare global{
    ///<reference path="../util/index.ts" />
    namespace Util{
        function throwCustomError(statusCode: number, message: string, errorCode: number): never;
        function throwError(statusCode: number, message: string): never;
        function throwTipError(err: any): never
        function throwAuth0Error(err: any): never
        function getAuth0Error(err: any): customErrorBody
        function throwInternalError(err: any): never
        function getInternalError(err: any): customErrorBody
        function decodeToken(token: any): any
        function accessToken(req: Request): string
        function getAuthIdentityId(token: any): string | null
        function getAuthId(token: string): any
        function validateUserName(name: string): any
        function validatOrgName(name: string):any
        function shrinkString(val: string): string
        function getRandomInt(min: number, max: number): number
        function _objectWithoutProperties(obj: any, keys: Array<string>):any
        function generatePassword(): string
        function extractPermission(data: any): any
        function _objectWithProperties(obj: any, keys: Array<string>):any
        function getHierarchyFilter(where: object, fields: object, relation: string, cLevel: number): any
        function isValidPhone(phoneNumber: string):any
        function validatePhoneNumber(input: string):any
        function convertMultipleSpace(data: any): any
        function emailToName(email: string): string
        function makeid(length: number): string
        function encrypt(password: string): string
        function decrypt(passwordencode: string): string
        function getISOCountryCode(address: string): string
        function findTimeFromOrganizationAddress(orgAddress: any, time: any):any
        function currentBrowser(headers: any):string
        function currentOS(headers: any):string
        function extractErrorMessage(err: any): string
        function buildErrorMessage(message: any, statusCode: number): string
        function extractErrorCode(err: any): any
        function extractStatusCode(err: any): any
        function extractStatusCodeWithAnyType(err: any): any
        function isHttpError(err: any): boolean
        function getTipAuthError(err: any): customErrorBody
        function mapErrorMessage(err: any): any
        function extractString(val: any, spit: string = '/'): string
        function stringifyError(err: any): any
        function isNumeric(str: any): boolean
        function titleCaseMessage(message: string): string
        function titleCaseString(str:string): string
        function applyQuery(where: string, order: string, orderBy: string, fields: string[], limit: number, offset: number, search?: string): string
        function countOnIdentity(where: string,search?: string): string
        function toArray(data: string, isNumber: boolean = true): any
        function timeout(ms: number):Promise<void>
        function formatDate(date: Date): string
        function permissionMapping(list:string[] = []): any
        function extractKafkaPayload(kafkaMessageString: string): any
        //new
        function getPermissionId(session_id: number = 0, orgs: {orgId: number, hierarchy?: number, children?: number[]}[] = []): number | number[] | void
        function sessionId(req: Request): number
        function converPermissionToJson(list: string[]): object
        function getHierarchy(permission_id: number = 0, orgs: {orgId: number, hierarchy?: number}[] = []): number
        function _objectWithoutUndefined(obj: any, keys: Array<string>): any
        function defaultDashboard(systemPermission: {[attribute: string]: number},markeplace: boolean = false): string

        function vfunForSession(this: any, sessionId: number): number | void
        function vfunForPermission(this: any, sessionId: number): number | number[] | void
        function vfunForHierarchy(this: any, permissionId: number): number
        function validatVenueName(name: string): any
        function getOrgError(err: any): customErrorBody
        
        //
        const emailVerify: any
        const orderDictOrg: any
        const orderDictAllOrg: any
        const orderDictChildOrg: any

        const orderDictOnSwitchOrg: any
        const identityFieldMap: any
        const codeList: any
        const permissionMap: any
    }
}