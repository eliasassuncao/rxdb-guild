import { createUUID, createDateTime } from '@bildvitta/vuex-offline'

export default {
  name: 'users',

  fields: {
    company: {
      name: 'company',
      label: 'Empresa',
      type: 'select',
      options: [
        {
          label: 'Empresa 1',
          value: 'empresa-1'
        },
        {
          label: 'Empresa 2',
          value: 'empresa-2'
        },
        {
          label: 'Empresa 3',
          value: 'empresa-3'
        }
      ]
    },

    name: {
      name: 'name',
      label: 'Nome',
      type: 'string'
    }
  },

  schema: {
    title: 'User schema',
    version: 0,
    type: 'object',
    primaryKey: 'uuid',
    properties: {
      uuid: {
        type: 'string'
      },

      company: {
        type: 'string'
      },

      name: {
        type: 'string'
      },

      createdAt: {
        type: 'string',
        format: 'date-time'
      },

      updatedAt: {
        type: 'string',
        format: 'date-time'
      }

    },

    required: [
      'company',
      'name'
    ],

    indexes: ['createdAt']
  },

  sort: { createdAt: 'asc' },

  defaults: {
    uuid: createUUID,
    updatedAt: createDateTime,
    createdAt: createDateTime
  },

  updateDefaults: {
    updatedAt: createDateTime
  }
}
