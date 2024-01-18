import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Identity, IdentityRelations, Role, Organization, Invite, InviteRelations, OrganizationType} from '../models';
import {RoleRepository} from './role.repository';
import {OrganizationRepository} from './organization.repository';
import { OrganizationTypeRepository } from './organization-type.repository';
/***
 * 
 * Repository class for Invite
 * @file invite.repository.ts
 * @description Define Invite Repository class to Connect to db.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export class InviteRepository extends DefaultCrudRepository<
Invite,
  typeof Invite.prototype.inviteId,
  InviteRelations
> {

  public readonly role: BelongsToAccessor<Role, typeof Invite.prototype.inviteId>;

  public readonly orgType: BelongsToAccessor<OrganizationType, typeof Invite.prototype.inviteId>;
  public readonly organization: BelongsToAccessor<Organization, typeof Invite.prototype.inviteId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('RoleRepository') protected userTypeRepositoryGetter: Getter<RoleRepository>, 
    @repository.getter('OrganizationTypeRepository') protected organizationTypeRepositoryGetter: Getter<OrganizationTypeRepository>,
  
    ) {
    super(Invite, dataSource);
    this.orgType = this.createBelongsToAccessorFor('orgType', organizationTypeRepositoryGetter,);
    this.registerInclusionResolver('orgType', this.orgType.inclusionResolver);
    this.role = this.createBelongsToAccessorFor('role', userTypeRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
