import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = {
      name: 'db',
      connector: 'postgresql',
      url: '',
      host: "127.0.0.1",
      port: 5432,
      user: 'postgres',
      password: 'admin',
      database: 'test'
    },
  ) {
    super(dsConfig);
  }
}
