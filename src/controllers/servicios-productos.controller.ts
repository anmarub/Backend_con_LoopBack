import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Servicios,
  Productos,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosProductosController {
  constructor(
    @repository(ServiciosRepository) protected serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Servicios has one Productos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Productos),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos> {
    return this.serviciosRepository.productos(id).get(filter);
  }

  @post('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Servicios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInServicios',
            exclude: ['id'],
            optional: ['serviciosId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.serviciosRepository.productos(id).create(productos);
  }

  @patch('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Servicios.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.serviciosRepository.productos(id).patch(productos, where);
  }

  @del('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Servicios.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.serviciosRepository.productos(id).delete(where);
  }
}
