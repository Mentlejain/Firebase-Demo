import { belongsTo, Entity, model, property } from '@loopback/repository';
import { OrganizationType } from './organization-type.model';
import { dateProperty, isActiveProperty, Organization, orgTypeIdProperty, parentOrgIdProperty } from './organization.model';
import { Role, roleIdProperty } from './role.model';
import { auth0UserIdProperty, emailProperty, Identity, userNameProperty } from './user.model';

/***
 * 
 * Model class for Invite
 * @file invite.model.ts
 * @description Define Inivte's table parameters.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export const inviteIdProperty = {
    type: 'string',
}

export const passwordProperty = {
    type: 'string'
}
export const allowHierarchyProperty = {
    type: 'boolean',
    default: false
}
export const inviteProperty = {
    inviteId: inviteIdProperty,
    name: userNameProperty,
    email: emailProperty,
    isActive: isActiveProperty,
    roleId: roleIdProperty,
    allowHierarchy: allowHierarchyProperty,
    parentOrgId: parentOrgIdProperty,
    orgTypeId: orgTypeIdProperty,
    createdAt: dateProperty,
    updatedAt: dateProperty
}
export const inviteIdPathProperty: any = {
    name: 'id',
    in: 'path',
    description: 'inviteId',
    schema: { type: 'string' }
}
@model({
    settings: {
        strict: true, postgresql: { schema: 'public', table: 'Invite' },
        foreignKeys: {
            fkUserTypeId: {
                name: 'fk_role_id',
                entity: 'Role',
                entityKey: 'role_id',
                foreignKey: 'role_id',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            },
            fkParentOrgId: {
                name: 'fk_parent_org_id',
                entity: 'Organization',
                entityKey: 'org_id',
                foreignKey: 'parent_org_id',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            },
            fkOrgTypeId: {
                name: 'fk_org_type_id',
                entity: 'OrganizationType',
                entityKey: 'org_type_id',
                foreignKey: 'org_type_id',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            },

        },

    }
})

export class Invite extends Entity {
    @property({
        type: 'string',
        id: true,
        postgresql: {
            columnName: 'invite_id',
        }
    })
    inviteId?: string;


    @property({
        type: 'string',
        postgresql: {
            columnName: 'name',
        }
    })
    name: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'email',
        }
    })
    email: string;
    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'parent_org_id',
        }
    })
    parentOrgId: number;

    @property({
        type: 'string',
        required: false,
        postgresql: {
            columnName: 'token',
        }
    })
    token: string;

    @belongsTo(() => Role, { name: 'role' }, { name: 'role_id' })
    roleId: number;

    @belongsTo(() => OrganizationType, { name: 'orgType' }, { name: 'org_type_id' })
    orgTypeId: number;

    @property({
        type: 'boolean',
        postgresql: {
            columnName: 'allow_hierarchy',
            default: false,
        }
    })
    allowHierarchy?: boolean
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
    constructor(data?: Partial<Invite>) {
        super(data);
    }
}

export interface InviteRelations {

}

export type InviteWithRelations = Invite & InviteRelations;
