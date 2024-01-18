import {Model, property} from '@loopback/repository';
import { addressLineMaxLength, cityMaxLength, minLengthString, stateMaxLength, zipCodeMaxLength } from '../constants/string';

const addressLineProperty = {
  type:'string',
  maxLength:addressLineMaxLength,
  minLength:minLengthString,
  //pattern:"^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$"
}
const latitudeProperty = {
  type:'number',
  minimum:-90,
  maximum:90
}
const longitudeProperty = {
  type:'number',
  minimum:-180,
  maximum:180
}
export const AddressProperty = {
  addressLine:addressLineProperty,
  latitude:latitudeProperty,
  longitude:longitudeProperty
}
export const AddressSchemaRequest = {
  title:'AddressRequest',
  type: 'object',
  additionalProperties: false,
  required:['addressLine'],
  properties:AddressProperty
}

export const billingAddressSchemaRequest = {
  title:'AddressRequest',
  type: 'object',
  additionalProperties: false,
  properties:AddressProperty
}

export const AddressSchemaResponse = {
  title:'AddressResponse',
  type: 'object',
  additionalProperties: false,
  properties:AddressProperty
}

export class Address extends Model {


  @property({
    type: 'string',
    required: true,
  })
  addressLine: string;


  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  zipCode: string;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

