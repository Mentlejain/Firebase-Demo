import {belongsTo, Entity, Model, model, property, hasMany} from '@loopback/repository';
import {OrganizationType} from './organization-type.model';
import {AddressSchemaRequest, AddressSchemaResponse,billingAddressSchemaRequest} from './address.model';
import { addressLineMaxLength, auth0OrgIdMaxLength, dateMaxLength, minLengthString, notesPropertyLength, orgDisplayNameMaxLength,orgDisplayNameMinLength, orgNameMaxLength, phoneMaxLength, tipEntityIdMaxLength } from '../constants';
import { SchemaObject } from '@loopback/rest';
import {  userNameProperty,phoneProperty } from './user.model';
import {Util} from '../global'
/***
 * 
 * Model class for Organization
 * @file organization.model.ts
 * @description Define Organization's parameters.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */

export const orgIdProperty = {
 type:'integer',
 minimum:1
}
export const parentOrgIdProperty = {
 type: 'integer',
 minimum:1
}
export const auth0OrgIdProperty = {
 type: 'string',
 maxLength: auth0OrgIdMaxLength
}
export const tipEntityIdProperty = {
  type:'string',
  maxLength: tipEntityIdMaxLength
}
export const orgNameProperty = {
 type: 'string',
 maxLength: orgNameMaxLength
}
export const orgDisplayNameProperty = {
 type: 'string',
 minLength: orgDisplayNameMinLength,
 maxLength: orgDisplayNameMaxLength,
 
 //pattern: "^[a-zA-Z]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$"//'^[A-Za-z0-9]+$'
}
export const orgTypeIdProperty = {
  type: 'integer',
  minimum:1,
  default: 2
}
export const dateProperty = {
 type: 'string',
 format: 'date-time',
 maxLength:dateMaxLength
}
export const isActiveProperty = {
 type: 'boolean'
}
export const levelProperty = {
  type: 'integer'
}
export const leafNodeProperty = {
  type: 'boolean'
}

export const OLSProperty = {
  type: 'boolean',
  default:true
}
export const MarketPlaceProperty = {
    type: 'boolean',
    default:false
  }

  export const notesProperty = {
    type: 'string',
    maxLength: notesPropertyLength
   }

   export const billingRecipientProperty={
    type: 'string',
   }
  
export const organizationProperty = {
 orgId:orgIdProperty,
 parentOrgId:parentOrgIdProperty,
 auth0OrgId:auth0OrgIdProperty,
 tipEntityId:tipEntityIdProperty,
 orgName:orgNameProperty,
 orgDisplayName:orgDisplayNameProperty,
 orgTypeId:orgTypeIdProperty,
 isActive:isActiveProperty,
 createdAt:dateProperty,
 updatedAt:dateProperty,
 level:levelProperty,
 leafNode:leafNodeProperty,
 OLSEnable: OLSProperty,
 marketplaceEnable: MarketPlaceProperty,
 vxLAN: OLSProperty,
 phone:phoneProperty,
 notes:notesProperty,
 billingRecipients:billingRecipientProperty,
}
export const organizationResponseProperty = {
 ...organizationProperty,
 orgAddress:AddressSchemaResponse as SchemaObject,
}
export const organizationRequestProperty = {
  ...organizationProperty,
  orgAddress:AddressSchemaRequest as SchemaObject,
  billingAddress:billingAddressSchemaRequest as SchemaObject
}

const orgSummaryProperty = {
  type:'object',
  properties:{
    totalOrg:{type:'integer'},
    orgTend:{
      type:'array',
      items:{
        type:'integer'
      }
    },
    label:{
      type:'array',
      items:{
        type:'string'
      }
    },
  }
}

export const subOrgCountProperty = {
  orgSummary : orgSummaryProperty
}

export const searchProperty: any ={
  name: 'search',
  in: 'query',
  required:false,
  description:'Search by identityName, email or phone',
  schema:{type:'string', maxLength:userNameProperty.maxLength}
}
export const searchOrgProperty: any ={
    name: 'search',
    in: 'query',
    required:false,
    description:'Search by orgDisplayName, email, status, address, orgType etc.',
    schema:{type:'string', maxLength:userNameProperty.maxLength}
  }
export const orgIdPathProperty: any ={
  name: 'id',
  in: 'path',
  description:'orgId',
  schema:{type:'integer',maximum: 2147483647},
}
export const servicePathProperty: any ={
    name: 'service',
    in: 'path',
    description:'Service',
    schema:{type:'string'},
  }
  export const serviceVersionProperty: any ={
    name: 'version',
    in: 'query',
    description:'Service version',
    schema:{type:'string'},
  }
export const offsetProperty: any ={
  name: 'offset',
  in: 'query',
  description:'Offset',
  schema:{type:'integer', minimum:0,default:0}
}
export const limitProperty: any ={
  name: 'limit',
  in: 'query',
  description:'Limit max items',
  schema:{type:'integer', minimum:1,default:10}
}
export const orderByOrgProperty: any = {
    name: 'orderBy',
    in: 'query',
    description: 'Sort data by status, orgId, orgTypeId, createdAt, updatedAt, orgDisplayName, Email',
    schema: {
      type: 'string',
      default: 'status',
      maxLength: 100,
      enum: ['status','orgId', 'orgTypeId', 'createdAt', 'updatedAt', 'orgDisplayName','email']
    }
  }
  export const actionstartDateProperty: any = {
    name: 'startDate',
    in: 'query',
    description: 'Start date',
    schema:dateProperty
  }
  export const actionendDateProperty: any = {
    name: 'endDate',
    in: 'query',
    description: 'End date',
    schema:dateProperty
  }
  export const actionLevelProperty: any = {
    name: 'level',
    in: 'query',
    description: 'Get action based on level',
    schema: {
      type: 'string',
      default: 'organization',
      maxLength: 100,
      enum: ['organization','access-point']
    }
  }
  export const orderByActivityProperty: any = {
    name: 'orderBy',
    in: 'query',
    description: 'Sort data by timestamp',
    schema: {
      type: 'string',
      default: 'timestamp',
      maxLength: 100,
      enum: ['timestamp']
    }
  }
  export const searchActivityProperty: any ={
    name: 'search',
    in: 'query',
    required:false,
    description:'Search by any in action log',
    schema:{type:'string', maxLength:500}
  }
  export const serialNumberProperty: any ={
    name: 'serialNumber',
    in: 'query',
    required:false,
    description:'SerialNumber',
    schema:{type:'string', maxLength:50}
  }
  export const tagsQueryProperty: any = {
    name: 'tags',
    in: 'query',
    required: false,
    description: 'Tags must be comma seperated',
    schema: {type: 'string', maxLength: 500}
  }
export const timeScheduleProperty: any ={
  orgId:orgIdProperty,
  orgDisplayName : orgDisplayNameProperty,
  utcTime:{type:'string',pattern:"[0-9]{8}[ ][0-9]{2}[:][0-9]{2}[:][0-9]{2}"},
  zone:{type:'string',default:"America/Santiago"}
}

export const partsProp: any = {
    PartNumber: {type: 'integer'},
    ETag: {type: 'string'}
}

export const fileuploadProp: any = {
   fileName: {type: 'string'},
   folderName: {type: 'string'},
   uploadId: {type: 'string'},
   partNumber: {type: 'integer'},
   parts: {
    type:'array',
    items:{
      type:'object',
      properties: Util._objectWithoutProperties(partsProp,[])
    }
  }
}

@model({
  settings: {
    postgresql: {schema: 'public', table: 'Organization'},
    foreignKeys: {
      fkOrgTypeId: {
        name: 'fk_org_type_id',
        entity: 'OrganizationType',
        entityKey: 'org_type_id',
        foreignKey: 'org_type_id',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
      fkOrgId: {
        name: 'fk_org_id',
        entity: 'Organization',
        entityKey: 'org_id',
        foreignKey: 'parent_org_id',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
    },
  }
})
export class Organization extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'org_id',
    }
  })
  orgId?: number;

  @belongsTo(() => Organization,{name: 'parentOrg'}, {name: 'parent_org_id'})
  
  parentOrgId?: number;
  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'auth0_org_id',
    }
  })
  auth0OrgId: string;
  @property({
    type: 'string',
    postgresql: {
      columnName: 'tip_entity_id',
      nullable: 'YES',
    }
  })
  tipEntityId: string;

  @property({
    type: 'string',
    reqired: false,
    postgresql: {
      columnName: 'notes',
      nullable: 'YES',
    }
  })
  notes: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'name',
    }
  })
  orgName: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'display_name',
    }
  })
  orgDisplayName: string;
  @property({
    type: 'object',
    postgresql: {
      columnName: 'address',
      dataType: 'jsonb',
      nullable: 'YES',
    }
  })
  orgAddress: object;
  @property({
    type: 'string',
    default:'Accepted',
    postgresql: {
      columnName: 'status',
      default:'Accepted',
      nullable: 'YES',
    }
  })
  status: string;
  @property({
    type: 'boolean',
    default:true,
    postgresql: {
      columnName: 'leaf_node',
    }
  })
  leafNode: boolean;

  @property({
    type: 'boolean',
    default:true,
    postgresql: {
      columnName: 'enable_notifications',
    }
  })
  enableNotifications: boolean;

  @property({
    type: 'number',
    default:1,
    postgresql: {
      columnName: 'level',
    }
  })
  level: number;

  @belongsTo(() => OrganizationType, {name: 'orgtype'}, {name: 'org_type_id'})
  orgTypeId: number;
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

  @property({
    type: 'boolean',
    default: true,
    postgresql: {
      columnName: 'ols_enable',
      nullable: 'YES',
      default: true,
    }
  })
  OLSEnable?: boolean;

  @property({
    type: 'boolean',
    default: true,
    postgresql: {
      columnName: 'marketplace_enable',
      nullable: 'YES',
      default: true,
    }
  })
  marketplaceEnable: boolean

  @property({
    type: 'boolean',
    default: true,
    postgresql: {
      columnName: 'vxlan',
      nullable: 'YES',
      default: true,
    }
  })
  vxLAN: boolean

  @property({
    type: 'object',
    postgresql: {
      columnName: 'billing_address',
      dataType: 'jsonb',
    }
  })
  billingAddress: object;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'phone',
    }
  })
  phone: string;

  
  @property({
    type: 'string',
    postgresql: {
      columnName: 'billing_recipients',
    }
  })
  billingRecipients?: string;


  @property({
    type: 'number',
    postgresql: {
      columnName: 'state',
    }
  })
  state?: number;
  @hasMany(() => Organization, {keyTo: 'parentOrgId'},)

  subOrganizations: Organization[];

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
 // subOrganizations?:Organization[],
 // orgtype?:OrganizationTypeRelations,
  parentOrg?:Organization
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
