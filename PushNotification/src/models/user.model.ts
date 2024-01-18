import {belongsTo, Entity, model, property} from '@loopback/repository';
import { auth0UserIdMaxLength, dateMaxLength, emailMaxLength, minLengthString, orgDisplayNameMaxLength, phoneMaxLength, userNameMaxLength } from '../constants';
import {isActiveProperty, Organization} from './organization.model';
import {Role, roleIdProperty, roleIdsProperty} from './role.model'

/***
 * 
 * Model class for Identity
 * @file user.model.ts
 * @description Define Identity's parameters.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
const orgIdProperty = {
  type:'integer',
  minimum:1
 }
 const dateProperty = {
  type: 'string',
  format: 'date-time',
  maxLength:dateMaxLength
 }
 export const orderByIdentityProperty: any = {
    name: 'orderBy',
    in: 'query',
    description: 'Sort data by createdAt, updatedAt, userName, email, roleId, and blocked',
    schema: {
        type: 'string',
        default: 'createdAt',
        maxLength: 100,
        enum: ['createdAt', 'updatedAt','userName', 'email', 'roleId', 'blocked']
    }
}
export const orderByIdentityVenueProperty: any = {
    name: 'orderBy',
    in: 'query',
    description: 'Sort data by userName, role, status, permissionLevel and lastLogin',
    schema: {
        type: 'string',
        default: 'identityId',
        maxLength: 100,
        enum: ['userName', 'role', 'status', 'permissionLevel', 'lastLogin', 'identityId']
    }
}
export const orderProperty: any = {
    name: 'order',
    in: 'query',
    description: 'Order in which data return',
    schema: {
        type: 'string',
        default: 'DESC',
        maxLength: 100,
        enum: ['ASC', 'DESC']
    }
}
export const roleQueryProperty: any ={
    name: 'role',
    in: 'query',
    required:false,
    description:'RoleId must be comma seperated',
    schema:{type:'string', maxLength:100}
}
export const blockQueryProperty: any ={
    name: 'isBlocked',
    in: 'query',
    required:false,
    description:'blocked must be boolean value',
    schema:{type:'boolean', maxLength:100}
}
export const userIdProperty = {
  type:'string',
  maxLength:auth0UserIdMaxLength
 }
 export const userNameProperty = {
  type: 'string',
  default: 'Ajay',
  maxLength:userNameMaxLength,
 // pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$"
 }
 export const roleNameProperty = {
    type: 'string',
    default: '',
    maxLength:userNameMaxLength,
   // pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$"
   }
 export const auth0UserIdProperty = {
  type: 'string',
  maxLength: auth0UserIdMaxLength
 }
 export const phoneProperty = {
   type: 'string',
   default: '1234567890',
   maxLength: phoneMaxLength,
   
  description:'Phone number is validate internally'
  
  // pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"//"/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)"//'\S(.*\S)?'//'^(\S.*\S|\S)*$',
 }
 export const emailProperty = {
  type: 'string',
  maxLength: emailMaxLength,
  format: 'email',
  //description:'Email is validate internally',
  //pattern: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
  //pattern:'^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)'
}


export const blockedProperty = {
  type: 'boolean',
  default:false
}
export const hierarchyProperty = {
    type: 'integer',
    default: 0,
    enum: [0,4]
}
const venueIdsProperty = {
    type: 'array',
    items: {
        type: 'integer',
        minimum: 1
    }
}
export const userProperty = {
  identityId:userIdProperty,
  auth0UserId:auth0UserIdProperty,
  userName:userNameProperty,
  email:emailProperty,
  hierarchy: hierarchyProperty,
  phone:phoneProperty,
  blocked:blockedProperty,
  lastLogin: dateProperty,
  roleName: roleNameProperty,
  isActive: isActiveProperty,
  roleId:roleIdProperty,
  roleIds: roleIdsProperty,
  allVenues: {
    type: 'boolean',
    default:true
  },
  venues: venueIdsProperty,
  orgId:orgIdProperty,
  createdAt:dateProperty,
  updatedAt:dateProperty
}
export const userIdPathProperty: any ={
  name: 'id',
  in: 'path',
  description:'userId',
  schema:{type:'string', maxLength:auth0UserIdMaxLength}
}

export const forgotIdPathProperty: any ={
    name: 'id',
    in: 'path',
    description:'forgotId',
    schema:{type:'string', maxLength:auth0UserIdMaxLength}
  }
export const userIdQueryProperty: any ={
    name: 'forgotId',
    in: 'query',
    required: true,
    description:'forgotId',
    schema:{type:'string', maxLength:auth0UserIdMaxLength}
  }
@model({
  settings: {
    strict: true, postgresql: {schema: 'public', table: 'Identity'},
    foreignKeys: {
        
        fkOrgId: {
          name: 'fk_org_id',
          entity: 'Organization',
          entityKey: 'org_id',
          foreignKey: 'org_id',
          onDelete: 'CASCADE',
          onUpdate: 'SET NULL'
        },
      },
  }
})

export class Identity extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
    postgresql: {
      columnName: 'identity_id',
    }
  })
  identityId?: string;
  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'auth0_identity_id',
    }
  })
  auth0UserId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'name',
    }
  })
  userName: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'phone',
      nullable: 'YES'
    }
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'email',
    }
  })
  email: string;
  @property({
    type: 'date',
    required: false,
    postgresql: {
      columnName: 'last_login',
      nullable: 'YES'
    }
  })
  lastLogin?: Date;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'token',
    }
  })
  token: string;

  @belongsTo(() => Organization, {name: 'organization'}, {name: 'org_id'})
  orgId: number;
 
  @property({
    type: 'boolean',
    default:false,
    postgresql: {
      columnName: 'blocked',
      nullable: 'YES',
      default:false
    }
  })
  blocked?: boolean;
  @property({
    type: 'boolean',
    default: true,
    postgresql: {
      columnName: 'is_active',
      nullable: 'YES',
      default: true,
    }
  })
  isActive?: boolean;
  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {
      columnName: 'created_at',
    }
  }) 
  createdAt?: Date
  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {
      columnName: 'updated_at',
    }
  }) 
  updatedAt?: Date
  constructor(data?: Partial<Identity>) {
    super(data);
  }
}

export interface IdentityRelations {
  // describe navigational properties here
}

export type IdentityWithRelations = Identity & IdentityRelations;
