import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {ConnectiondbDataSource} from '../datasources';
import {Servicios, ServiciosRelations, Persona, Productos} from '../models';
import {PersonaRepository} from './persona.repository';
import {ProductosRepository} from './productos.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.id,
  ServiciosRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Servicios.prototype.id>;

  public readonly productos: HasOneRepositoryFactory<Productos, typeof Servicios.prototype.id>;

  constructor(
    @inject('datasources.connectiondb') dataSource: ConnectiondbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Servicios, dataSource);
    this.productos = this.createHasOneRepositoryFactoryFor('productos', productosRepositoryGetter);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
