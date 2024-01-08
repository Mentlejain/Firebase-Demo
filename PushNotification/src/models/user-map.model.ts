import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'usermap', // specify the table name
    },
  },
})
export class UserMap extends Entity {
  @property({
    type: 'number',
    required: true,
    id: true,
    postgresql: {columnName: 'userId'}
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
    id: true,
    postgresql: {columnName: 'orgId'}
  })
  orgId: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'role'}
  })
  role: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'isActive'}
  })
  isActive: boolean;

  constructor(data?: Partial<UserMap>) {
    super(data);
  }
}

export interface UserMapRelations {
  // add any relation methods here
}

export type UserMapWithRelations = UserMap & UserMapRelations;