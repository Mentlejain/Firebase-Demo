import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { FcmTokenMap, FcmTokenMapRelations } from '../models';
import { DbDataSource } from '../datasources'; // Import your datasource
import { inject } from '@loopback/core';

export class FcmTokenRepository extends DefaultCrudRepository<
  FcmTokenMap,
  typeof FcmTokenMap.prototype.fcmToken,
  FcmTokenMapRelations
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(FcmTokenMap, dataSource);
  }
}