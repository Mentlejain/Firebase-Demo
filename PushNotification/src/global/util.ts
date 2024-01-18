
import { HttpErrors, Request } from '@loopback/rest';
import { isoCodes } from '../constants';
import { EError, TIP_PROV_ERROR } from '../util/error';
const { find } = require('geo-tz')
import moment from 'moment-timezone';
/***
 * 
 * Utility function
 * @file index.ts
 * @description Define util function here to use in code.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export interface CustomError {
    statusCode: number,
    message: string
}
const Base64 = require("base-64");

export class Util {

    static throwCustomError(statusCode: number, message: string, errorCode: number): never {
        var errorValue: customErrorBody = {
            statusCode: statusCode || 500,
            message: message || ErrorMessage.SOMETHING_WENT_WRONG,
            code: errorCode || ErrorCode.SOMETHING_WENT_WRONG
        }
        throw errorValue
    }

    static throwError(statusCode: number, message: string): never {

        const customError: customErrorBody = {
            statusCode: statusCode || 500,
            message: message || ErrorMessage.SOMETHING_WENT_WRONG,
            code: ErrorCode.SOMETHING_WENT_WRONG
        }
        throw customError

    }

    static throwTipError(err: any): never {
        let errorValue = err?.error || err
        var customError: customErrorBody = {
            statusCode: 500,
            message: ErrorMessage.SOMETHING_WENT_WRONG,
            code: ErrorCode.SOMETHING_WENT_WRONG + ErrorCode.TIP_PROV_OFFSET
        };
        if (EError.includes(Util.extractErrorCode(errorValue))) {
            customError = {
                statusCode: 503,
                message: ErrorMessage.TIP_PROV_DOWN,
                code: ErrorCode.TIP_PROV_DOWN + ErrorCode.TIP_PROV_OFFSET
            }
        }
        else if (Util.isHttpError(errorValue)) {
            const code: any = Util.extractStatusCodeWithAnyType(errorValue).toString()
            if (code.length && (code[0] === '4' || code[0] === '5')) {
                customError = {
                    statusCode: Number(code) || 500,
                    message: Util.buildErrorMessage(Util.extractErrorMessage(errorValue) || ErrorMessage.SOMETHING_WENT_WRONG, Number(code) || 500),
                    code: (Util.extractErrorCode(errorValue) || ErrorCode.SOMETHING_WENT_WRONG) + ErrorCode.TIP_PROV_OFFSET
                };
            } else if (EError.includes(code)) {
                customError = {
                    statusCode: 503,
                    message: ErrorMessage.TIP_PROV_DOWN,
                    code: ErrorCode.TIP_PROV_DOWN + ErrorCode.TIP_PROV_OFFSET
                }
            }
        } else {
            customError = {
                statusCode: 503,
                message: ErrorMessage.TIP_PROV_DOWN,
                code: ErrorCode.TIP_PROV_DOWN + ErrorCode.TIP_PROV_OFFSET
            }
        }
        throw customError
    }

    static throwAuth0Error(err: any): never {
        throw Util.getAuth0Error(err)
    }
    static getAuth0Error(err: any): customErrorBody {
        let errorValue = err?.error || err
        var customError: customErrorBody = {
            statusCode: 500,
            message: ErrorMessage.SOMETHING_WENT_WRONG,
            code: ErrorCode.SOMETHING_WENT_WRONG + ErrorCode.AUTH0_OFFSET
        };
        if (EError.includes(Util.extractErrorCode(errorValue))) {
            customError = {
                statusCode: 503,
                message: ErrorMessage.AUTH0_DOWN,
                code: ErrorCode.AUTH0_DOWN + ErrorCode.AUTH0_OFFSET
            }
        }
        else if (Util.isHttpError(errorValue)) {
            const code: any = Util.extractStatusCodeWithAnyType(errorValue).toString()
            if (code.length && (code[0] === '4' || code[0] === '5')) {
                customError = {
                    statusCode: Number(code) || 500,
                    message: Util.buildErrorMessage(Util.extractErrorMessage(errorValue) || ErrorMessage.SOMETHING_WENT_WRONG, Number(code) || 500),
                    code: (Util.extractErrorCode(errorValue) || ErrorCode.SOMETHING_WENT_WRONG) + ErrorCode.AUTH0_OFFSET
                };
            } else if (EError.includes(code)) {
                customError = {
                    statusCode: 503,
                    message: ErrorMessage.AUTH0_DOWN,
                    code: ErrorCode.AUTH0_DOWN + ErrorCode.AUTH0_OFFSET
                }
            }
        } else {
            customError = {
                statusCode: 503,
                message: ErrorMessage.AUTH0_DOWN,
                code: ErrorCode.AUTH0_DOWN + ErrorCode.AUTH0_OFFSET
            }
        }
        return customError
    }
    static throwInternalError(err: any): never {
        throw Util.getInternalError(err)
    }
    static getInternalError(err: any): customErrorBody {
        let errorValue = err?.error || err
        var customError: customErrorBody = {
            statusCode: Util.extractErrorCode(errorValue),
            message: Util.extractErrorMessage(errorValue) || ErrorMessage.SOMETHING_WENT_WRONG,
            code: Util.extractErrorCode(errorValue) || ErrorCode.SOMETHING_WENT_WRONG
        };
        const code: any = Util.extractStatusCodeWithAnyType(errorValue).toString()
        if (EError.includes(Util.extractErrorCode(errorValue))) {
            customError = {
                statusCode: 503,
                message: ErrorMessage.DB_DOWN,
                code: ErrorCode.DB_DOWN
            }
        }
        else if (code.length && (code[0] === '4' || code[0] === '5')) {
            customError = {
                statusCode: Number(code) || 500,
                message: Util.buildErrorMessage(Util.extractErrorMessage(errorValue) || ErrorMessage.SOMETHING_WENT_WRONG, Number(code) || 500),
                code: Util.extractErrorCode(errorValue) || ErrorCode.SOMETHING_WENT_WRONG
            };
        } else if (EError.includes(code)) {
            customError = {
                statusCode: 503,
                message: ErrorMessage.DB_DOWN,
                code: ErrorCode.DB_DOWN
            }
        }
        return customError
    }
    static decodeToken(token: any): any {

        if (token == null) {
            return token;
        }

        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);

    }
    static emailVerify: any = {
        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid Email Format',
    }
    static accessToken(req: Request): string {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            return req.headers.authorization.split(' ')[1] as string;
        } else if (req.query && req.query.access_token) {
            return req.query.access_token as string;
        }
        return '';
    }
    static sessionId(req: Request): number {
        if (
            req.headers['x-api-key'] 
        ) {
            return parseInt(req.headers['x-api-key'] as string) || 0
        }
        return 0;
    }
    static converPermissionToJson(list: string[]): object{
        let obj: any = {}
        Object.values(PERMISSION).forEach(val => {
            let tag = val.TAG
            if(tag == PERMISSION.IDENTITY.TAG){
                let sub = list.filter((x: any) => x.includes(':'+tag)).sort((a, b) => (a > b ? -1 : 1))
                if(sub.length){
                    obj['manage'+tag.charAt(0).toUpperCase() + tag.slice(1)] = parseInt(sub[0].charAt(0));
                }
            }
            else if(val.TAG != PERMISSION.LEVEL.TAG){
                let sub = list.filter((x: any) => x.includes(':'+tag)).sort((a, b) => (a > b ? -1 : 1))
                if(sub.length){
                    obj['manage'+tag.charAt(0).toUpperCase() + tag.slice(1)] = parseInt(sub[0].charAt(0));
                }
            }
        });
        return obj
    }
    static getPermissionId(session_id: number = 0, orgs: {orgId: number, hierarchy?: number, children?: number[]}[] = []): number | number[] | void{
        try{
            if (!session_id) {
                return
            }
            if(orgs.some((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.orgId == session_id)){
                return session_id
            }
            const list = orgs.filter((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.hierarchy)
            if(!list.length){
                return
            }
            const found = list.find((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.children?.includes(session_id) || it.orgId == OrgMeta.shastaOrgId)
            if(found){
                return found.orgId
            }
            return list.map((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.orgId)
        }catch(e){
            return
        }
    }
    static getHierarchy(permission_id: number = 0, orgs: {orgId: number, hierarchy?: number}[] = []): number {
        try {
            if (!permission_id) {
                return CONSTANT.SCOPE.NONE
            }
            let subVal = orgs.filter((it: {orgId: number, hierarchy?: number}) => it.orgId == permission_id)
    
            if(subVal.length){
                return subVal[0]?.hierarchy || CONSTANT.SCOPE.NONE
            }
            return CONSTANT.SCOPE.NONE
        } catch (e) {
            return CONSTANT.SCOPE.NONE
        }
    }
    static getAuthIdentityId(token: any): string | null {
        if (!token) {
            return null;
        }
        const d = Util.decodeToken(token);
        if (!d) {
            return null;
        }
        if (d.hasOwnProperty('sub')) {
            return d['sub'];
        }
        return null;
    }
    static getAuthId(token: string): any {
        if (
            token &&
            token.split(' ')[0] === 'Bearer'
        ) {
            return Util.decodeToken(token.split(' ')[1])
        }
        return null;
    }
    static validateUserName(name: string): any {
        var regex = /^[a-zA-Z0-9 ]{1,30}$/;
        return regex.test(name);
    }
    static validatOrgName(name: string): any {
        var regex = /^[a-zA-Z0-9,\-_#' ]{1,30}$/;
        return regex.test(name);
    }
    static shrinkString(val: string): string {
        if (!val) {
            return '';
        }
        let newval = val.replace(/\s/g, "").toLocaleLowerCase();

        // let newval = val1.replace(/[',. -]/g, "").toLocaleLowerCase();
        return newval.replace(/[^a-zA-Z0-9 ]/g, "") + Util.getRandomInt(999999, 999999999).toString();
    }
    static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    static _objectWithoutProperties(obj: any, keys: Array<string>): any {
        var target: any = {};
        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }
        return target;
    }
    static generatePassword(): string {
        let result = Math.random().toString(36).slice(-4);

        const lowerLetter = 'abcdefghijklmnopqrstuvwxyz'
        for (var i = 0; i < 3; i++) {
            result += lowerLetter.charAt(Math.floor(Math.random() * lowerLetter.length));
        }
        const specialChar = '@#$'
        for (var i = 0; i < 2; i++) {
            result += specialChar.charAt(Math.floor(Math.random() * specialChar.length));
        }
        const upperLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = 0; i < 3; i++) {
            result += upperLetter.charAt(Math.floor(Math.random() * upperLetter.length));
        }
        const numbers = '0123456789'
        for (var i = 0; i < 2; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return result
    }
    static extractPermission(data: any): any {
        if (!data || (data && Array.isArray(data) && !data.length)) {
            return []
        }
        return data.map((item: any) => item.permission_name)
    }
    static _objectWithProperties(obj: any, keys: Array<string>): any {
        var target: any = {};
        for (var i in obj) {
            if (keys.indexOf(i) < 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }
        return target;
    }

    static getHierarchyFilter(where: object, fields: object, relation: string, cLevel: number): any {
        if (cLevel < 1) {
            return []
        }

        if (cLevel == 1) {

            return [{
                relation: relation,
                scope: {
                    where: where,
                    fields: fields,
                }
            }]

        } else {

            var array = Util.getHierarchyFilter(where, fields, relation, cLevel - 1) as any
            var subOject = {
                relation: relation,
                scope: {
                    where: where,
                    fields: fields,
                    include: array
                }
            }
            return [subOject] as any
        }

    }
    static isValidPhone(phoneNumber: string): any {
        console.log("Checking started Phone Number after REGEX : ");
        var re = new RegExp(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/)
        var found = re.test(phoneNumber);
        return found;
    }
    static validatePhoneNumber(input: string): any {

        try {
            let ISD_CODES = [93, 355, 213, 1684, 376, 244, 1264, 672, 1268, 54, 374, 297, 61, 43, 994, 1242, 973, 880, 1246, 375, 32, 501, 229, 1441, 975, 591, 387, 267, 55, 246, 1284, 673, 359, 226, 257, 855, 237, 1, 238, 1345, 236, 235, 56, 86, 61, 61, 57, 269, 682, 506, 385, 53, 599, 357, 420, 243, 45, 253, 1767, 1809, 1829, 1849, 670, 593, 20, 503, 240, 291, 372, 251, 500, 298, 679, 358, 33, 689, 241, 220, 995, 49, 233, 350, 30, 299, 1473, 1671, 502, 441481, 224, 245, 592, 509, 504, 852, 36, 354, 91, 62, 98, 964, 353, 441624, 972, 39, 225, 1876, 81, 441534, 962, 7, 254, 686, 383, 965, 996, 856, 371, 961, 266, 231, 218, 423, 370, 352, 853, 389, 261, 265, 60, 960, 223, 356, 692, 222, 230, 262, 52, 691, 373, 377, 976, 382, 1664, 212, 258, 95, 264, 674, 977, 31, 599, 687, 64, 505, 227, 234, 683, 850, 1670, 47, 968, 92, 680, 970, 507, 675, 595, 51, 63, 64, 48, 351, 1787, 1939, 974, 242, 262, 40, 7, 250, 590, 290, 1869, 1758, 590, 508, 1784, 685, 378, 239, 966, 221, 381, 248, 232, 65, 1721, 421, 386, 677, 252, 27, 82, 211, 34, 94, 249, 597, 47, 268, 46, 41, 963, 886, 992, 255, 66, 228, 690, 676, 1868, 216, 90, 993, 1649, 688, 1340, 256, 380, 971, 44, 1, 598, 998, 678, 379, 58, 84, 681, 212, 967, 260, 263]
            //extract numbers from string
            var thenum = input.match(/[0-9]+/g)?.join("")
            console.log(thenum)
            if (!thenum)
                return false
            const totalnums = thenum.length,
                last10Digits = parseInt(thenum) % 10000000000,
                ISDcode = thenum.substring(0, totalnums - 10);

            //phone numbers are generally of 8 to 16 digits
            if (totalnums >= 8 && totalnums <= 16) {
                if (ISDcode) {
                    if (ISD_CODES.includes(parseInt(ISDcode))) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            }
        } catch (e) { }

        return false;
    }
    static convertMultipleSpace(data: any): any {
        if (data.addressLine) {
            data.addressLine = data.addressLine.replace(/\s\s+/g, ' ')
        }
        return data
    }
    static emailToName(email: string): string {
        let last = email.substring(email.indexOf('@') + 1)
        if (!last) {
            return 'name'
        }
        return last.substring(0, last.indexOf('.'))
        //return email
    }

    static makeid(length: number): string {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$~*&-=+";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    static encrypt(password: string): string {
        let enPass = Base64.encode(JSON.stringify(password));
        var sharingKey = "";
        var newPassword = sharingKey.concat(Util.makeid(15), enPass, Util.makeid(14));
        var encodeString = Base64.encode(JSON.stringify(newPassword));
        return encodeString;
    };
    // function name(password:type) {
    //     //let enPass = Base64.encode(JSON.stringify(password));
    //     //var sharingKey = "";
    //     //var newPassword = "".concat(RandomStringWith15Char, Base64.encode(JSON.stringify(password)), RandomStringWith4Char);
    //     var encrptedPassword = Base64.encode(
    //                 JSON.stringify(
    //                     <RandomStringWith15Char> + 
    //                     Base64.encode(JSON.stringify(password)) + 
    //                     <RandomStringWith4Char>
    //                 )
    //             )
    // }
    static decrypt(passwordencode: string): string {
        let decodeString = JSON.parse(Base64.decode(passwordencode));
        return JSON.parse(
            Base64.decode(decodeString.substring(15, decodeString.length - 14))
        );
    };

    static getISOCountryCode(address: string): string {
        console.log("Address: " + address);

        let i = address.lastIndexOf(',');
        let country: string = address.substring(i + 1);
        country = country.trim();

        console.log("country", isoCodes[country]);

        var iso: string;
        if (isoCodes[country]) {
            console.log(isoCodes[country]);
            iso = isoCodes[country];
        }
        else {
            iso = "US";
        }

        return iso;
    }

    static findTimeFromOrganizationAddress(orgAddress: any, time: any): any {
        const address: any = orgAddress;

        var lati: any;
        var longi: any;
        if (address.latitude && address.longitude) {
            lati = address.latitude;
            longi = address.longitude;
        } else {
            lati = 40.7607793;
            longi = -111.8910474;
        }

        const timeZone = find(lati, longi);

        var fmt = "YYYYMMDD HH:mm:ss";
        var zone = timeZone[0];

        var m = moment.tz(time, fmt, zone);

        m.utc();

        return { "time": m.format(fmt), "zone": zone }; // result: "05/30/2014 3:21:37 PM"
    };

    static _objectWithoutUndefined(obj: any, keys: Array<string>) {
        var target: any = {};
        for (var i in obj) {
            if (keys.indexOf(i) < 0) continue;
            if (obj[i] != undefined) {
                target[i] = obj[i];
            }
        }
        return target;
    }
    static currentBrowser(headers: any): string {
        try {
            if (!headers) {
                return "Others";
            }
            var sec = headers["sec-ch-ua"];
            if (sec && typeof sec == "string") {
                if (sec.includes("Chrome")) {
                    return "GoogleChrome";
                } else if (sec.includes("Edge")) {
                    return "MicrosoftEdge";
                } else if (sec.includes("Opera")) {
                    return "Opera";
                }
                return "Others";
            }
            return "Others";
        } catch (e) {
            return "Others";
        }
    }

    static currentOS(headers: any): string {
        try {
            if (!headers) {
                return "unknown";
            }

            var sec = headers["sec-ch-ua-platform"];
            if (typeof sec == "string") {
                const cos = sec.slice(1, -1);
                if (!cos) {
                    return "unknown";
                }
                return cos.split(" ").join("");
            }
            return "unknown";
        } catch (e) {
            return "unknown";
        }
    }


    static extractErrorMessage(err: any): string {
        if (typeof err == 'string') {
            return err
        }
        if (!err) {
            return ErrorMessage.SOMETHING_WENT_WRONG
        }
        let errorValue = err?.error || err
        if (errorValue.hasOwnProperty('response') && errorValue?.response.hasOwnProperty('data')) {
            return Util.extractErrorMessage(errorValue?.response?.data)
        }
        if (errorValue.hasOwnProperty('message')) {
            return errorValue.message
        }
        if (errorValue.hasOwnProperty('detail')) {
            return errorValue.detail
        }
        if (errorValue.hasOwnProperty('ErrorDescription')) {
            let e = errorValue.ErrorDescription
            if (typeof e == 'string' && e.includes(":")) {
                const spitE = e.split(":");
                if (spitE.length > 1) {
                    return spitE[1]
                }
            }
            return e
        }
        return ErrorMessage.SOMETHING_WENT_WRONG
    }
    static buildErrorMessage(message: any, statusCode: number): string {
        if (typeof message == 'string') {
            try {
                const m: any = JSON.parse(message)

                if (statusCode == 401 || statusCode == 403) {
                    return ErrorMessage.NOT_AUTHORIZED
                }
                return ErrorMessage.SOMETHING_WENT_WRONG
            } catch (e) {
                return message
            }
        } else {
            return ErrorMessage.SOMETHING_WENT_WRONG
        }
    }
    static extractErrorCode(err: any): any {
        if (typeof err == 'string') {
            return ErrorCode.SOMETHING_WENT_WRONG
        }
        if (!err) {
            return ErrorCode.SOMETHING_WENT_WRONG
        }
        let errorValue = err?.error || err
        if (errorValue.hasOwnProperty('response') && errorValue?.response.hasOwnProperty('data')) {
            return Util.extractErrorCode(errorValue?.response?.data)
        }
        if (errorValue.hasOwnProperty('code')) {
            if (errorValue.code == 'invalid_token') {
                return 401
            }
            return errorValue.code
        }
        if (errorValue.hasOwnProperty('errorCode')) {
            return errorValue.errorCode
        }
        if (errorValue.hasOwnProperty('ErrorCode')) {
            return errorValue.ErrorCode
        }
        return ErrorCode.SOMETHING_WENT_WRONG
    }
    static extractStatusCode(err: any): any {
        if (!err || typeof err == 'string') {
            return 500
        }
        let errorValue = err?.error || err
        return Number(errorValue?.statusCode || errorValue?.status || errorValue?.response?.status || errorValue?.response?.statusCode || 500) || 500
    }
    static extractStatusCodeWithAnyType(err: any): any {
        if (!err || typeof err == 'string') {
            return 500
        }
        let errorValue = err?.error || err
        return errorValue?.statusCode || errorValue?.status || errorValue?.response?.status || errorValue?.response?.statusCode || 500
    }
    static isHttpError(err: any): boolean {

        if (typeof err == 'string' || !err) {
            return false
        }
        let errorValue = err?.error || err
        return HttpErrors.isHttpError(errorValue) ||
            (errorValue as HttpErrors.HttpError).statusCode ||
            (errorValue as HttpErrors.HttpError).status ||
            (errorValue?.response && errorValue?.response?.status) ||
            (errorValue?.response && errorValue?.response?.statusCode)

    }
    static getTipAuthError(err: any): customErrorBody {
        let errorValue = err?.error || err
        var customError: customErrorBody = {
            statusCode: 500,
            message: ErrorMessage.SOMETHING_WENT_WRONG,
            code: ErrorCode.SOMETHING_WENT_WRONG
        };
        if (EError.includes(Util.extractErrorCode(errorValue))) {
            customError = {
                statusCode: 503,
                message: ErrorMessage.TIP_AUTH_DOWN,
                code: ErrorCode.TIP_AUTH_DOWN
            }
        }
        else if (Util.isHttpError(errorValue)) {
            const code: any = Util.extractStatusCodeWithAnyType(errorValue).toString()
            if (code.length && (code[0] === '4' || code[0] === '5')) {
                customError = {
                    statusCode: Number(code) || 500,
                    message: Util.buildErrorMessage(Util.extractErrorMessage(errorValue) || ErrorMessage.SOMETHING_WENT_WRONG, Number(code) || 500),
                    code: (Util.extractErrorCode(errorValue) || ErrorCode.SOMETHING_WENT_WRONG)
                };
            } else if (EError.includes(code)) {
                customError = {
                    statusCode: 503,
                    message: ErrorMessage.TIP_AUTH_DOWN,
                    code: ErrorCode.TIP_AUTH_DOWN
                }
            }
        } else {
            customError = {
                statusCode: 503,
                message: ErrorMessage.TIP_AUTH_DOWN,
                code: ErrorCode.TIP_AUTH_DOWN
            }
        }
        return customError
    }
    static codeList: any = {
        required: (val: any) => `Missing ${val?.info?.missingProperty || 'data'} in the request`,
        type: (val: any) => `Invalid ${Util.extractString(val?.path)} received in the request`,
        enum: (val: any) => `Invalid ${Util.extractString(val?.path)} received in the request`,
        format: (val: any) => `Invalid ${Util.extractString(val?.path)} received in the request`,
        uniqueItems: (val: any) => `Invalid ${Util.extractString(val?.path)} received in the request`,
        pattern: (val: any) => `Invalid ${Util.extractString(val?.path)} received in the request`,
        minimum: (val: any) => `${Util.extractString(val?.path)} should be minimum ${val?.info?.limit}`,
        maximum: (val: any) => `${Util.extractString(val?.path)} should be maximum ${val?.info?.limit}`,
        minLength: (val: any) => `${Util.extractString(val?.path)} should be minimum ${val?.info?.limit} characters long`,
        maxLength: (val: any) => `${Util.extractString(val?.path)} should be maximum ${val?.info?.limit} characters long`,
        additionalProperties: (val: any) => `Additional property not allowed '${val?.info?.additionalProperty}'`,
        minItems: (val: any) => `${Util.extractString(val?.path)} array length should be minimum ${val?.info?.limit}`
    }
    static mapErrorMessage(err: any): any {
        try {
            if (err?.statusCode == 422 || err?.status == 422) {
                const details = err?.details
                if (!details || !Array.isArray(details) || (Array.isArray(details) && !details.length)) {
                    return err
                }
                err.message = Util.codeList[err?.details[0]?.code]
                    ? Util.codeList[err?.details[0]?.code](err?.details[0])
                    : err?.message
                return err
            } else {
                return err
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }
    static extractString(val: any, spit: string = '/'): string {
        if (!val || typeof val != 'string') {
            return 'data'
        }
        let valList = val.split(spit)
        if (Array.isArray(valList) && valList.length) {
            valList = valList.filter((item: any) => item).filter((item: any) => !Util.isNumeric(item))
            if (valList.length) {
                return valList[valList.length - 1]
            }
        }
        return val
    }
    static stringifyError(err: any): any {
        try {
            if (!err || typeof err == 'string') {
                return err
            }
            const m = JSON.stringify(err)
            if (!m || m == '{}') {
                return err
            }
            return m
        } catch (e) {
            return err
        }
    }
    static isNumeric(str: any): boolean {
        if (typeof str != "string") return false
        return !isNaN(str as any) &&
            !isNaN(parseFloat(str))
    }
    static titleCaseMessage(message: string): string {
        try {
            if (!message) {
                return ErrorMessage.SOMETHING_WENT_WRONG
            }
            return message.charAt(0).toUpperCase() + message.slice(1);

        } catch (e) {
            return message
        }
    }
    static titleCaseString(str: string): string {
        try {
            if (!str) {
                return ''
            }
            return str.charAt(0).toUpperCase() + str.slice(1);

        } catch (e) {
            return str
        }
    }
    static defaultDashboard(systemPermission: {[attribute: string]: number}, markeplace: boolean = false): string {
        try {
            if(systemPermission.manageOrgstats){
                return "maindashboard"
            }else if(systemPermission.manageVenuestats){
                return "venuelisting"
            }else if(systemPermission.manageNotificationstats){
                return "notificationdashboard"
            }else if(systemPermission.manageQuotestats){
                return markeplace ? "quotedashboard" : "venuelisting"
            }else if(systemPermission.manageInfrastats){
                return "infralisting"
            }
            return ""
        } catch (e) {
            return ""
        }
    }

    static identityFieldMap: any = {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        userName: 'name',
        email: 'email',
        roleId: 'role_name',
        blocked: 'blocked'
    }
    static applyQuery(where: string, order: string, orderBy: string, fields: string[], limit: number, offset: number, search?: string): string {

        var searchString: string = '';

        if (search) {

            searchString = `and (name ilike '%${search}%' or 
        email ilike '%${search}%' )`
            const searchForBlock = ['blocked', 'enabled', 'disabled', 'unblocked']
            if (searchForBlock[0].includes(search.toLocaleLowerCase()) || searchForBlock[2].includes(search.toLocaleLowerCase())) {
                searchString = `and (name ilike '%${search}%' or 
            email ilike '%${search}%' or 
            roles.role ilike '%${search}%' or
            blocked is true
            )`
            } else if (searchForBlock[1].includes(search.toLocaleLowerCase()) || searchForBlock[3].includes(search.toLocaleLowerCase())) {

                searchString = `and (name ilike '%${search}%' or 
            email ilike '%${search}%' or 
            roles.role ilike '%${search}%' or
            blocked is false
            )`
            }
        }

        const dbQuery: string = `
    select 
        ${fields.join()}
        from public."Identity" identity
        left join
        (select role_id, role from public."Role")
        roles
        on
        roles.role_id = identity.role_id
        where ${where} 
        ${searchString}
        order by ${orderBy} ${order} 
        limit ${limit}
        offset ${offset}`
        return dbQuery;
    }

    static countOnIdentity(where: string, search?: string): string {

        var searchString: string = '';

        if (search) {

            searchString = `and (name ilike '%${search}%' or 
        email ilike '%${search}%' or 
        roles.role ilike '%${search}%')`
            const searchForBlock = ['blocked', 'enabled', 'disabled', 'unblocked']
            if (searchForBlock[0].includes(search.toLocaleLowerCase()) || searchForBlock[2].includes(search.toLocaleLowerCase())) {
                searchString = `and (name ilike '%${search}%' or 
            email ilike '%${search}%' or 
            roles.role ilike '%${search}%' or
            blocked is true
            )`
            } else if (searchForBlock[1].includes(search.toLocaleLowerCase()) || searchForBlock[3].includes(search.toLocaleLowerCase())) {

                searchString = `and (name ilike '%${search}%' or 
            email ilike '%${search}%' or 
            roles.role ilike '%${search}%' or
            blocked is false
            )`
            }
        }

        const dbQuery: string = `
    select 
        Count(*)::integer
        from public."Identity" identity
        left join
        (select role_id, role from public."Role")
        roles
        on
        roles.role_id = identity.role_id
        where ${where} 
        ${searchString}`
        return dbQuery;
    }

    static orderDictOrg: any = {
        'orgId': 'org_id',
        'status': 'status',
        'orgTypeId': 'org_type_id',
        'createdAt': 'created_at',
        'updatedAt': 'updated_at',
        'orgDisplayName': 'display_name',
        'email': 'email',
        'name': 'name'
    }
    static orderDictAllOrg: any = {
        'orgId': 'org.org_id',
        'status': 'status',
        'orgTypeId': 'org.org_type_id',
        'createdAt': 'org.created_at',
        'updatedAt': 'org.updated_at',
        'orgDisplayName': 'org.display_name',
        'email': 'email'
    }
    static orderDictChildOrg: any = {
        'orgId': 'org_id',
        'status': 'status',
        'orgTypeId': 'org_type_id',
        'createdAt': 'created_at',
        'updatedAt': 'updated_at',
        'orgDisplayName': 'display_name',
        'email': 'email'   
    }
    static orderDictOnSwitchOrg: any = {
        'orgId': 'tree."orgId"',
        'status': 'tree.status',
        'orgTypeId': 'tree."orgTypeId"',
        'createdAt': 'tree."createdAt"',
        'updatedAt': 'tree."updatedAt"',
        'orgDisplayName': 'tree."orgDisplayName"'
    }
    static toArray(data: string, isNumber: boolean = true): any {
        if (!data || typeof data != 'string') {
            return []
        }
        const format = /[!@#$ %^&*()_+\-=\[\]{};':"\\/.<>\/?]/;
        if (isNumber && format.test(data)) {
            return []
        }
        var data_org: any = data.split(',');
        if (!data_org || !Array.isArray(data_org) || (Array.isArray(data_org) && !data_org.length)) {
            return [];
        } else {
            if (isNumber) {
                data_org = data_org.filter((item: any) => Util.isNumeric(item)).map((item: any) => Number(item))
            } else {
                data_org = data_org.map((item: any) => item.trim()).filter((item: any) => item)
            }
            return Array.from(new Set(data_org))
        }
    }
    static timeout(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // export const getDetailsFromRedis = async(serialNumber: string) => {
    //     try{
    //         if(!serialNumber){
    //             generalLogger.error(` unknown unknown redis url// -- getDetailsFromRedis: serialNumber not defined`)

    //             return null
    //         }
    //         let res = await global.redis_client.client.hGetAll(serialNumber)

    //         return {
    //             "infraCategory": parseInt(res.infra_category || '0'),
    //             "status": res.current_status || '',
    //             "infraItemId": parseInt(res.infra_item_id || '0'),
    //             "orgId": parseInt(res.org_id || '0'),
    //             "venueId": parseInt(res.venue_id || 0),
    //             "venueName": res.venue_name || '',
    //             "infraName": res.infra_name || '',
    //         }

    //     }catch(e){
    //         generalLogger.error(` unknown unknown redis url// -- getDetailsFromRedis: [${serialNumber}] Error ${e}`)

    //         return null
    //     }
    // }

    static formatDate(date: Date): string {
        if (!(date instanceof Date)) {
            throw new Error('Invalid "date" argument. You must pass a date instance')
        }

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        const hour = String(date.getHours() + 1).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
    }
    static permissionMap: any = {
        "view:venue": "viewVenue",
        "manage:venue": "manageVenue",
        "view:organization": "viewOrganization",
        "manage:organization": "manageOrganization",
        "manage:firmware": "manageFirmware",
        "manage:platform": "managePlatform"
    }
    static permissionMapping(list: string[] = []): any {
        var permissionsObj = {
            "viewVenue": false,
            "manageVenue": false,
            "viewOrganization": false,
            "manageOrganization": false,
            "manageFirmware": false,
            "managePlatform": false
        }
        return list.reduce((acc: any, it: string) => {
            acc[Util.permissionMap[it]] = true
            return acc
        }, permissionsObj)
    }
    static extractKafkaPayload(kafkaMessageString: string): any {
        try {
            if (!kafkaMessageString) {
                return { id: '', category: '', data: '', err: 'kafkaMessageString is empty' }
            }
            let kafkaMessage: KafkaMessage = JSON.parse(kafkaMessageString)
            if (!kafkaMessage.id) {
                console.log('id not found')
                return { id: '', category: '', data: '', err: 'id not defined' }
            }
            if (!kafkaMessage.message || !kafkaMessage.message.category || !kafkaMessage.message.data) {
                console.log('no message found')
                return { id: kafkaMessage.id, category: '', data: '', err: 'No message defined' }
            }
            return { id: kafkaMessage.id, category: kafkaMessage.message.category, data: JSON.stringify(kafkaMessage.message.data), err: '' }
        } catch (e) {

            return { id: '', category: '', data: '', err: e }
        }
    }
    static vfunForSession(this: any, sessionId: number): number | void {
        try {
            if (!sessionId) {
                return CONSTANT.HIERARCHY.INVALID
            }
            if(this.permissionId == sessionId){
                return CONSTANT.HIERARCHY.VALIDATED
            }
            if (this.hierarchy) {
                return this.isShastaAdmin ? CONSTANT.HIERARCHY.VALIDATED : CONSTANT.HIERARCHY.NEED_VALIDATION
            }
            return CONSTANT.HIERARCHY.INVALID
        } catch (e) {
            return CONSTANT.HIERARCHY.INVALID
        }
    }
    static vfunForPermission(this: any, sessionId: number): number | number[] | void {
        try {
                if (!sessionId) {
                    return
                }
                if(this.orgs.some((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.orgId == sessionId)){
                    return sessionId
                }
                const list = this.orgs.filter((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.hierarchy)
                if(!list.length){
                    return
                }
                const found = list.find((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.children?.includes(sessionId) || it.orgId == OrgMeta.shastaOrgId)
                if(found){
                    return found.orgId
                }
                return list.map((it: {orgId: number, hierarchy?: number, children?: number[]}) => it.orgId)
        } catch (e) {
            return
        }
    }
    static vfunForHierarchy(this: any, permissionId: number): number {
        try {
            if (!permissionId) {
                return CONSTANT.SCOPE.NONE
            }
            let subVal = this.orgs.filter((it: { orgId: number, hierarchy?: number }) => it.orgId == permissionId)
            if (subVal.length) {
                return subVal[0]?.hierarchy || CONSTANT.SCOPE.NONE
            }
            return CONSTANT.SCOPE.NONE
        } catch (e) {
            return CONSTANT.SCOPE.NONE
        }
    }
    static validatVenueName(name: string) {
        var regex = /^[a-zA-Z0-9,\-_#' ]{2,30}$/;
        return regex.test(name);
    }
    static getOrgError(err: any) {
        let errorValue = err?.error || err

        var customError: customErrorBody = {
            statusCode: 500,
            message: ErrorMessage.SOMETHING_WENT_WRONG,
            code: ErrorCode.SOMETHING_WENT_WRONG
        };
        if (EError.includes(Util.extractErrorCode(errorValue))) {
            customError = {
                statusCode: 503,
                message: ErrorMessage.ORG_DOWN,
                code: ErrorCode.ORG_DOWN + ErrorCode.ORG_OFFSET
            }
        }
        else if (Util.isHttpError(errorValue)) {
            const code: any = Util.extractStatusCodeWithAnyType(errorValue).toString()

            if (code.length && (code[0] === '4' || code[0] === '5')) {
                customError = {
                    statusCode: Number(code) || 500,
                    message: Util.extractErrorMessage(errorValue) || ErrorMessage.SOMETHING_WENT_WRONG,
                    code: (Util.extractErrorCode(errorValue) || ErrorCode.SOMETHING_WENT_WRONG)
                };
            } else if (EError.includes(code)) {
                customError = {
                    statusCode: 503,
                    message: ErrorMessage.ORG_DOWN,
                    code: ErrorCode.ORG_DOWN + ErrorCode.ORG_OFFSET
                }
            }
        } else {
            customError = {
                statusCode: 503,
                message: ErrorMessage.ORG_DOWN,
                code: ErrorCode.ORG_DOWN + ErrorCode.ORG_OFFSET
            }
        }
        return customError
    }
}