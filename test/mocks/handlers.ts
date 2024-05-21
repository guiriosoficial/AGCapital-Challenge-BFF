import { rest } from 'msw'
import * as dotenv from 'dotenv'
import { editTeamNameSchema } from '../../src/utils/validations/EditTeamNameSchema'
import { editTeamSchema } from '../../src/utils/validations/EditTeamSchema'

dotenv.config({ path: '.env.local' })
dotenv.config()

const baseUrlWorkspaceApi = String(process.env.URL_WORKSPACES_API) + '/api/workspaces'
const baseUrlAccountApi = String(process.env.URL_ACCOUNT_API) + '/api/accounts'
const baseUrlCacheApi = String(process.env.URL_CACHE_API) + '/api/autenticacao-cache-service'

export const handlers = [
  rest.patch(`${baseUrlWorkspaceApi}/teamName`, async (req, res, ctx) => {
    try {
      const body = await req.json()

      if (await editTeamNameSchema.isValid(body)) {
        return await res(ctx.status(204))
      } else {
        return await res(ctx.status(400), ctx.json({ message: 'Erro de validação.' }))
      }
    } catch (error: any) {
      return await res(ctx.status(500), ctx.json({ ...error }))
    }
  }),

  rest.put(`${baseUrlWorkspaceApi}/`, async (req, res, ctx) => {
    try {
      const body = await req.json()

      if (await editTeamSchema.isValid(body)) {
        return await res(ctx.status(204))
      } else {
        return await res(ctx.status(400), ctx.json({ message: 'Erro de validação.' }))
      }
    } catch (error: any) {
      console.error('Error in Mock:', error)

      return await res(ctx.status(500), ctx.json({ ...error }))
    }
  }),

  rest.get(`${baseUrlAccountApi}/workspaces/keyAccount`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json([{
      id: 2923,
      name: 'Wagner Junior',
      email: 'wagner.junior@justto.com.br'
    }]))
  }),

  rest.get(`${baseUrlAccountApi}/workspaces/110/keyAccount`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({
      workspace: { id: 110, name: 'Equipe Justto', teamName: 'Equipe JUSTTO' },
      keyAccount: { id: 2923, name: 'Wagner Junior', email: 'wagner.junior@justto.com.br' }
    }))
  }),

  rest.get(`${baseUrlAccountApi}`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(
      {
        content: [
          {
            pendingActivation: false,
            activated: true,
            pendingReset: false,
            memberId: 8580,
            personProperties: {
              NPS: 'UNKNOWN',
              MANAGEMENT: 'UNKNOWN',
              EXPIRED: 'UNKNOWN',
              MANAGER: 'UNKNOWN'
            },
            personName: 'Adriana',
            email: 'adriana.ortega@projuris.com.br',
            personId: 1699621,
            blocked: false,
            status: 'active',
            profile: 'ADMINISTRATOR',
            name: 'Adriana',
            id: 2944
          }
        ],
        empty: false,
        first: true,
        last: true,
        number: 0,
        numberOfElements: 46,
        size: 999,
        totalPages: 1,
        totalElements: 46,
        pageable: {
          pageNumber: 0,
          pageSize: 999,
          sort: {
            unsorted: false,
            sorted: true,
            empty: false
          },
          offset: 0,
          paged: true,
          unpaged: false
        },
        sort: {
          unsorted: false,
          sorted: true,
          empty: false
        }
      }
    ))
  }),

  rest.patch(`${baseUrlAccountApi}/workspaces/110/keyAccount/2923`, async (req, res, ctx) => {
    return await res(ctx.status(204))
  }),

  rest.get(`${baseUrlWorkspaceApi}/feature`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({
      content: [],
      pageable: {
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        pageNumber: 0,
        pageSize: 20,
        offset: 0,
        paged: true,
        unpaged: false
      },
      totalPages: 1,
      totalElements: 10,
      last: true,
      numberOfElements: 10,
      first: true,
      size: 20,
      number: 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      empty: false
    }))
  }),

  rest.patch(`${baseUrlWorkspaceApi}/feature/2/true`, async (req, res, ctx) => {
    return await res(ctx.status(204))
  }),

  rest.get(`${baseUrlWorkspaceApi}/members`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({
      content: [
        {
          createdBy: 'deivid2@justto.com.br',
          createdAt: '2023-12-05T12:22:51Z',
          updatedBy: null,
          updatedAt: null,
          id: 8580,
          personId: 1699621,
          profile: 'ADMINISTRATOR',
          accountId: 2944,
          accountEmail: 'adriana.ortega@projuris.com.br',
          person: {
            createdBy: 'deivid2@justto.com.br',
            createdAt: '2023-12-05T12:22:50Z',
            updatedBy: 'adriana.ortega@projuris.com.br',
            updatedAt: '2023-12-05T12:37:27Z',
            id: 1699621,
            name: 'Adriana',
            alias: null,
            type: 'NATURAL',
            documentNumber: null,
            emailIds: [
              1427923
            ],
            phoneIds: [],
            oabIds: [],
            bankAccountIds: [],
            properties: {},
            namesake: false,
            dead: false,
            online: false,
            lastAccess: null
          },
          archived: false
        }
      ],
      pageable: { sort: { sorted: false, unsorted: true, empty: true }, pageNumber: 0, pageSize: 999, offset: 0, paged: true, unpaged: false },
      totalPages: 1,
      totalElements: 46,
      last: true,
      numberOfElements: 46,
      first: true,
      size: 999,
      number: 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      empty: false
    }))
  }),

  rest.get(`${baseUrlWorkspaceApi}/feature/6/properties`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({
      featureId: 6,
      properties: [],
      workspaceId: 110
    }))
  }),

  rest.put(`${baseUrlAccountApi}/my/property`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({}))
  }),

  rest.get(`${baseUrlAccountApi}/my/property`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({}))
  }),

  rest.delete(`${baseUrlCacheApi}/v1/cache`, async (req, res, ctx) => {
    return await res(ctx.status(204))
  }),

  rest.get(`${baseUrlWorkspaceApi}/110`, async (req, res, ctx) => {
    console.log('MOCK', `${baseUrlWorkspaceApi}/110`)
    return await res(ctx.status(200), ctx.json({ blackList: [] }))
  })
]
