import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Identity } from './user.model';

@model({
  settings: {
    postgresql: {
      table: 'TokenMap',
    },
  },
})
export class FcmTokenMap extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true,
    postgresql: { columnName: 'fcmToken' },
  })
  fcmToken: string;

  @property({
    type: 'string',
    required: true,
    postgresql: { columnName: 'userId' }, // Set the desired column name
  })
  userId: string;

  @property({
    type: 'date',
    required: true,
    postgresql: { columnName: 'timestamp' },
  })
  timestamp: Date;

  constructor(data?: Partial<FcmTokenMap>) {
    super(data);
  }
}

export interface FcmTokenMapRelations {
  identity: Identity; // Add this line to define the relation
}

export type TokenMapWithRelations = FcmTokenMap & FcmTokenMapRelations;
