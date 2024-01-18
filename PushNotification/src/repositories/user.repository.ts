import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Identity, IdentityRelations, Role, Organization} from '../models';
import {RoleRepository} from './role.repository';
import {OrganizationRepository} from './organization.repository';
/***
 * 
 * Repository class for Identity
 * @file user.repository.ts
 * @description Define Identity Repository class to Connect to db.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export class UserRepository extends DefaultCrudRepository<
Identity,
  typeof Identity.prototype.identityId,
  IdentityRelations
> {

    public readonly organization: BelongsToAccessor<Organization, typeof Identity.prototype.identityId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
  ) {
    super(Identity, dataSource);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
     }
}
