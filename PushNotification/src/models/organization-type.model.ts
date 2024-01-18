import {Entity, model, property, hasMany} from '@loopback/repository';
import {Role} from './role.model';

/***
 * 
 * Model class for OrganizationType
 * @file organization-type.model.ts
 * @description Define OrganizationType's parameters.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */


 export const orgTypeProperty = {
  type: 'string',
 }
 export const orgTypeQueryProperty: any = {
    name: 'orgType', 
    in: 'query',
    required: false,
    description: 'OrgType must be comma separated',
     schema: {type: 'string', maxLength: 256}
}
export const orgTypeIdPathProperty: any ={
    name: 'id',
    in: 'path',
    description:'orgTypeId',
    schema:{type:'integer',maximum: 2147483647},
  }
@model({settings: {strict: true, postgresql: {schema: 'public', table: 'OrganizationType'}}})
export class OrganizationType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'org_type_id',
    }
  })
  orgTypeId?: number;

  @property({
    type: 'string',
    required: true,
    index: {unique: true, },
    postgresql: {
      columnName: 'org_type',

    }
  })
  orgType: string;

  @hasMany(() => Role, {keyTo: 'orgTypeId'})
  roles: Role[];

  constructor(data?: Partial<OrganizationType>) {
    super(data);
  }
}

export interface OrganizationTypeRelations {
  // describe navigational properties here
}

export type OrganizationTypeWithRelations = OrganizationType & OrganizationTypeRelations;
