import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Forgot, ForgotRelations} from '../models';

export class ForgotRepository extends DefaultCrudRepository<
Forgot,
  typeof Forgot.prototype.forgotId,
  ForgotRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Forgot, dataSource);
  }
}
