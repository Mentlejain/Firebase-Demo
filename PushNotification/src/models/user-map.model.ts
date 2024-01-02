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
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
  })
  orgId: number;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'boolean',
    required: true,
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