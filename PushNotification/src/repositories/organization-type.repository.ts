import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {OrganizationType, OrganizationTypeRelations, Role} from '../models';
import {RoleRepository} from './role.repository';

/***
 * 
 * Repository class for OrganizationType
 * @file organization-type.repository.ts
 * @description Define OrganizationType Repository class to Connect to db.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export class OrganizationTypeRepository extends DefaultCrudRepository<
  OrganizationType,
  typeof OrganizationType.prototype.orgTypeId,
  OrganizationTypeRelations
> {

  public readonly roles: HasManyRepositoryFactory<Role, typeof OrganizationType.prototype.orgTypeId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {

    super(OrganizationType, dataSource);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', roleRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
