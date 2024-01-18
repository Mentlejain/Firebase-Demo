import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Unsubscribe, UnsubscribeRelations} from '../models';

export class UnsubscribeRepository extends DefaultCrudRepository<
  Unsubscribe,
  typeof Unsubscribe.prototype.unsubscribeId,
  UnsubscribeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Unsubscribe, dataSource);
  }
}
