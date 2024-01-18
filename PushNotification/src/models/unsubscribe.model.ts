import {Entity, model, property} from '@loopback/repository';
import { emailProperty, userIdProperty } from './user.model';

export const tokenProperty = {
  type:'string',  
}

export const unsubscribeProperty = {
  email:emailProperty,
  token:tokenProperty
}

@model({
  settings: {
  postgresql: {schema: 'public', table: 'Unsubscribe'},
}})
export class Unsubscribe extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'unsubscribed_id',
    }
  })
  unsubscribeId?: number;

  @property({
    type: 'string',
    required: true,
    index: {
        unique: true,
    },
    postgresql: {
      columnName: 'email',
    }
  })
  email: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Unsubscribe>) {
    super(data);
  }
}

export interface UnsubscribeRelations {
  // describe navigational properties here
}

export type UnsubscribeWithRelations = Unsubscribe & UnsubscribeRelations;
