import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicios,
  Persona,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosPersonaController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Servicios.prototype.id,
  ): Promise<Persona> {
    return this.serviciosRepository.persona(id);
  }
}
