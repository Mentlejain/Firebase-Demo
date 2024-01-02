import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { UserMap, UserMapRelations } from '../models';
import { DbDataSource } from '../datasources'; // Import your datasource
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  UserMap,
  typeof UserMap.prototype.userId,
  UserMapRelations
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(UserMap, dataSource);
  }
}