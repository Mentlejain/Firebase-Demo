import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { TokenMap, TokenMapRelations } from '../models';
import { DbDataSource } from '../datasources'; // Import your datasource
import { inject } from '@loopback/core';

export class FcmTokenRepository extends DefaultCrudRepository<
  TokenMap,
  typeof TokenMap.prototype.fcmToken,
  TokenMapRelations
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TokenMap, dataSource);
  }
}