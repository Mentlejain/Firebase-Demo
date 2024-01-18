import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Organization, OrganizationRelations, OrganizationType} from '../models';
import {OrganizationTypeRepository} from '../repositories';
/***
 * 
 * Repository class for Organization
 * @file organization.repository.ts
 * @description Define Organization Repository class to Connect to db.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export class OrganizationRepository extends DefaultCrudRepository<
  Organization,
  typeof Organization.prototype.orgId,
  OrganizationRelations
> {

  public readonly orgtype: BelongsToAccessor<OrganizationType, typeof Organization.prototype.orgId>;

  public readonly parentOrg: BelongsToAccessor<Organization, typeof Organization.prototype.orgId>;

  public readonly organizations: HasManyRepositoryFactory<Organization, typeof Organization.prototype.orgId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('OrganizationTypeRepository')
    organizationTypeRepositoryGetter: Getter<OrganizationTypeRepository>, 
  ) {
    super(Organization, dataSource);
    this.organizations = this.createHasManyRepositoryFactoryFor('subOrganizations', Getter.fromValue(this),);
    this.registerInclusionResolver('subOrganizations', this.organizations.inclusionResolver);
    this.orgtype = this.createBelongsToAccessorFor('orgtype', organizationTypeRepositoryGetter,);
    this.registerInclusionResolver('orgtype', this.orgtype.inclusionResolver);
    this.parentOrg = this.createBelongsToAccessorFor('parentOrg', Getter.fromValue(this),);
    this.registerInclusionResolver('parentOrg', this.parentOrg.inclusionResolver);
  }
}

