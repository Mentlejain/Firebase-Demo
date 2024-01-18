import { Entity, model, property } from '@loopback/repository';
import { roleNameMaxLength } from '../constants';
import { dateProperty, isActiveProperty, roleNameProperty } from '.';
/***
 * 
 * Model class for Role
 * @file user-type.model.ts
 * @description Define Role's parameters.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export const roleIdProperty = {
    type: 'integer',
    minimum: 1
}
export const roleIdsProperty = {
    type: 'array',
    items: {
        type: 'integer',
        minimum: 1,
        default: 10
    },
    minItems: 1
}
export const roleIdPathProperty: any = {
    name: 'id',
    in: 'path',
    description: 'roleId',
    schema: { type: 'integer', maximum: 2147483647 },
}



export const roleProperty = {
    roleId: roleIdProperty,
    role: roleNameProperty,
    isActive: isActiveProperty,
    createdAt: dateProperty,
    updatedAt: dateProperty
}
export const roleResponse = roleProperty;
@model({ settings: { strict: true, postgresql: { schema: 'public', table: 'Role' } } })
export class Role extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'role_id',
        }
    })
    roleId?: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'role',
        }
    })
    role: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'description',
        }
    })
    description: string
    @property({
        type: 'string',
        default: true,
        required: false,
        postgresql: {
            default: true,
            columnName: 'custom',
        }
    })
    custom: boolean;
    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'org_type_id',
        }
    })
    orgTypeId: number;

    constructor(data?: Partial<Role>) {
        super(data);
    }
}

export interface RoleRelations {
    // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
