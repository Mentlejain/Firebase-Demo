import {Entity, model, property} from '@loopback/repository';
import { emailProperty } from './user.model';


@model({
  settings: {
  postgresql: {schema: 'public', table: 'Forgot'},
}})
export class Forgot extends Entity {
    @property({
        type: 'string',
        id: true,
        defaultFn: 'uuid',
        postgresql: {
          columnName: 'forgot_id',
        }
      })
  
  forgotId?: string;

  @property({
    type: 'string',
    required: true,
    index: {
        unique: true,
    },
    postgresql: {
      columnName: 'identity_id',
    }
  })
  identityId: string
  @property({
    type: 'number',
    postgresql: {
      columnName: 'count',
    }
  }) 
  count?: number
  @property({
    type: 'number',
    postgresql: {
      columnName: 'expired_at',
    }
  }) 
  expiredAt?: number
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Forgot>) {
    super(data);
  }
}

export interface ForgotRelations {
  // describe navigational properties here
}

export type ForgotWithRelations = Forgot & ForgotRelations;
