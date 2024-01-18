import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, BelongsToAccessor, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Venue, VenueRelations, Organization} from '../models';
import {OrganizationRepository} from './organization.repository';

/***
 * 
 * Repository class for Venue
 * @file venue.repository.ts
 * @description Define Venue Repository class to Connect to db.
 * @author Ajay Kumawat
 * @since 24 Jun 2022
 */
export class VenueRepository extends DefaultCrudRepository<
  Venue,
  typeof Venue.prototype.venueId,
  VenueRelations
> {

  public readonly subVenues: HasManyRepositoryFactory<Venue, typeof Venue.prototype.venueId>;

  public readonly parentVenue: BelongsToAccessor<Venue, typeof Venue.prototype.venueId>;

  public readonly organization: BelongsToAccessor<Organization, typeof Venue.prototype.venueId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
    ) {
    super(Venue, dataSource);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.parentVenue = this.createBelongsToAccessorFor('parentVenue', Getter.fromValue(this),);
    this.registerInclusionResolver('parentVenue', this.parentVenue.inclusionResolver);
    this.subVenues = this.createHasManyRepositoryFactoryFor('subVenues', Getter.fromValue(this),);
    this.registerInclusionResolver('subVenues', this.subVenues.inclusionResolver);
   }
}
