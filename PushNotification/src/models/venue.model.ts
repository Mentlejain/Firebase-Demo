import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import { getJsonSchema, SchemaObject } from '@loopback/rest';
import { dateMaxLength, floorPlanMaxLength, maxLength, minLengthString, tipVenueIdMaxLength, venueNameMaxLength } from '../constants/string';
import {AddressSchemaRequest, AddressSchemaResponse} from './address.model';
import {dateProperty, isActiveProperty, leafNodeProperty, levelProperty, Organization, orgIdProperty} from './organization.model';

/***
 * 
 * Model class for Venue
 * @file venue.model.ts
 * @description Define Venue's parameters.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */

export const venueIdProperty = {
   type:'integer'
}
export const parentVenueIdProperty = {
  type: 'integer',
  minimum:0,
  description:'0 will be treated as no parent venue'
}
export const tipVenueIdProperty = {
  type: 'string',
  maxLength: tipVenueIdMaxLength
}
export const venueNameProperty = {
  type: 'string',
  maxLength: venueNameMaxLength,
  minLength:minLengthString,
//  pattern: "^[a-zA-Z]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$"//'^[A-Za-z0-9]+$'
}

// export const floorPlanProperty = {
//   type: 'string',
//   maxLength: floorPlanMaxLength,
//   pattern:"^\\w+\\.(jpg|png|gif)$"//"[a-zA-Z_]*\\.[A-Za-z]{3}$"//"^[A-Za-z0-9]+\\.[A-Za-z]{3}$"
// }

export const radiusLocationProperty = {
  type:"string"
}

export const venueTypeProperty = {
  type: "integer",
  enum: [1,2,3,4]
}

export const venueProperty = {
  venueId:venueIdProperty,
  orgId:orgIdProperty,
  parentVenueId:parentVenueIdProperty,
  tipVenueId:tipVenueIdProperty,
  venueName:venueNameProperty,
  state: {
    type: "number",
    enum: [1,2,3,4,5,6,7,8,9,10],
},
  //floorPlan:floorPlanProperty,
  isActive:isActiveProperty,
  createdAt:dateProperty,
  updatedAt:dateProperty,
  level:levelProperty,
  leafNode:leafNodeProperty,
  radiusLocation: radiusLocationProperty,
  venueType: venueTypeProperty,
  reason: radiusLocationProperty,

  recipients: radiusLocationProperty,
  alarmNotifications: {
    type: 'boolean',
    default: false,
  }
}
export const venueInfraCountProperty = {
    venueId: venueIdProperty,
    infrastructureCount:{
        type: 'integer',
        minimum:0
    },
    switchCount:{
        type: 'integer',
        minimum:0
    }
}
export const venueReponseProperty = {
  ...venueProperty,
  venueAddress:AddressSchemaResponse as SchemaObject,
  shippingAddress:AddressSchemaResponse as SchemaObject
}
export const venueRequestProperty = {
  ...venueProperty,
  venueAddress:AddressSchemaRequest as SchemaObject,
  shippingAddress:AddressSchemaRequest as SchemaObject
}
export const venueIdPathProperty: any ={
  name: 'id',
  in: 'path',
  description:'venueId',
  schema:{type:'integer'}
}

export const orgIdQueryProperty:any = {
  name: 'orgId',
  in: 'query',
  required:true,
  description: 'Get venues based on orgId', 
  schema: { type: 'integer', minimum:1},
} 
export const orderByProperty: any = {
    name: 'orderBy',
    in: 'query',
    description: 'Sort data by venueId, venueName infrastructureCount, createdAt, updatedAt',
    schema: {
      type: 'string',
      default: 'venueId',
      maxLength: 100,
      enum: ['venueId', 'venueName', 'infrastructureCount','createdAt','updatedAt']
    }
  }

@model({
  settings: {
    postgresql: {schema: 'public', table: 'Venue'},
    foreignKeys: {
      fkVenueId: {
        name: 'fk_venue_id',
        entity: 'Venue',
        entityKey: 'venue_id',
        foreignKey: 'parent_venue_id',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
      fkVenueOrgId: {
        name: 'fk_venue_org_id',
        entity: 'Organization',
        entityKey: 'org_id',
        foreignKey: 'org_id',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
    },
  }
})
export class Venue extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'venue_id',
    }
  })
  venueId?: number;
  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'tip_venue_id',
    }
  })
  tipVenueId: string;
  @property({
    type: 'boolean',
    default: true,
    postgresql: {
      columnName: 'leaf_node',
    }
  })
  leafNode: boolean;
  @property({
    type: 'number',
    default: 1,
    postgresql: {
      columnName: 'level',
    }
  })
  level: number;
  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'name',
    }
  })
  venueName: string;
  
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
    type: 'boolean',
    default: false,
    postgresql: {
      columnName: 'default_venue',
      default: false,
    }
  })
  defaultVenue?: boolean;

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

  @property({
    type: 'object',
    required: true,
    postgresql: {
      columnName: 'venue_address',
      dataType: 'json'
    }
  })
  venueAddress: object;
  @property({
    type: 'object',
    required: false,
    postgresql: {
      columnName: 'shipping_address',
      dataType: 'json'
    }
  })
  shippingAddress: object;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'radius_location',
    }
  })
  radiusLocation: string;

  @property({
    type: 'number',
    default: 0,
    postgresql: {
      columnName: 'infrastructure_count',
    }
  })
  infrastructureCount: number;
  @property({
    type: 'number',
    default: 0,
    postgresql: {
      columnName: 'switch_count',
    }
  })
  switchCount: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'venue_type',
      nullable: 'YES'
    }
  })
  venueType: number;

  @property({
    type: 'number',
    default: 8,
    postgresql: {
      columnName: 'state',
      nullable: 'YES'
    }
  })
  state: number;
  
  @property({
    type: 'string',
    postgresql: {
      columnName: 'reason',
      nullable: 'YES',
    }
  })
  reason: string;

  @property({
    type: 'boolean',
    default: false,
    postgresql: {
      columnName: 'alarm_notifications',
      default: false,
    }
  })
  alarmNotifications: boolean;
  @property({
    type: 'string',
    postgresql: {
      columnName: 'recipients',
      nullable: 'YES',
    }
  })
  recipients: string;

  @hasMany(() => Venue, {keyTo: 'parentVenueId'})
  subVenues: Venue[];

  @belongsTo(() => Venue, {name: 'parentVenue'}, {name: 'parent_venue_id'})
  parentVenueId: number;

  @belongsTo(() => Organization, {name: 'organization'},{name:'org_id'})
  orgId: number;

  constructor(data?: Partial<Venue>) {
    super(data);
  }
}

export interface VenueRelations {
  subVenues?: Venue[],
  parentVenue?: Venue
  // describe navigational properties here
  
}

export type VenueWithRelations = Venue & VenueRelations;
