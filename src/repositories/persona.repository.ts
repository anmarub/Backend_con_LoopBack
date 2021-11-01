import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnectiondbDataSource} from '../datasources';
import {Persona, PersonaRelations, Servicios} from '../models';
import {ServiciosRepository} from './servicios.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicios, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.connectiondb') dataSource: ConnectiondbDataSource, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>,
  ) {
    super(Persona, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', serviciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
