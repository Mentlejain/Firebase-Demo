import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Role, RoleRelations} from '../models';
/***
 * 
 * Repository class for Role
 * @file user-type.repository.ts
 * @description Define Role Repository class to Connect to db.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.roleId,
  RoleRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Role, dataSource);
  }
}
