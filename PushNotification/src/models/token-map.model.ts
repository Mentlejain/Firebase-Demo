import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'tokenmap',
    },
  },
})
export class TokenMap extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true,
  })
  fcmToken: string;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'timestamp',
    },
  })
  timestamp: Date;

  constructor(data?: Partial<TokenMap>) {
    super(data);
  }
}

export interface TokenMapRelations {
  // add any relation methods here
}

export type TokenMapWithRelations = TokenMap & TokenMapRelations;