import RestController from '../../src/infra/controller/RestController'
import ExpressAdapter from '../../src/infra/http/ExpressAdapter'
import FetchAdapter from '../../src/infra/http/FetchAdapter'

import { setupServer } from 'msw/node'
import * as dotenv from 'dotenv'
import { handlers } from '../mocks/handlers'
import CleanCacheUseCase from '../../src/useCases/CleanCacheUseCase'
import WorkspaceUseCase from '../../src/useCases/WorkspaceUseCase'
import TeamMembersUseCase from '../../src/useCases/TeamMembersUseCase'
import AccountUseCase from '../../src/useCases/AccountUseCase'
import BlackListController from '../../src/infra/controller/BlackListController'
import DocumentController from '../../src/infra/controller/DocumentController'
import DomainController from '../../src/infra/controller/DomainController'
import FeatureController from '../../src/infra/controller/FeatureController'
import KeyAccountController from '../../src/infra/controller/KeyAccountController'
import MessageAutomationController from '../../src/infra/controller/MessageAutomationController'
import OutcomeReasonsController from '../../src/infra/controller/OutcomeReasonsController'
import PreNegotiationController from '../../src/infra/controller/PreNegotiationController'
import TeamMemberController from '../../src/infra/controller/TeamMemberController'
import WorkspaceController from '../../src/infra/controller/WorkspaceController'
import AccountController from '../../src/infra/controller/AccountController'
import CacheController from '../../src/infra/controller/CacheController'
import { handlersWithError } from '../mocks/errors'

dotenv.config({ path: '.env.local' })
dotenv.config()

const LOCAL_URL = 'http://localhost:3333'
const PORTAL_CONFGURATIONS_BFF = '/api/configurations-bff/v1'

dotenv.config({ path: '.env.local' })
dotenv.config()

const baseUrlWorkspaceApi = String(process.env.URL_WORKSPACES_API)
const baseUrlAccountApi = String(process.env.URL_ACCOUNT_API)
const baseUrlDisputesApi = String(process.env.URL_DISPUTES_API)
const baseUrlDocumentsApi = String(process.env.URL_DOCUMENT_API)
const baseUrlDomainApi = String(process.env.URL_DOMAIN_API)
const baseUrlUsageApi = String(process.env.URL_USAGE_API)
const baseUrlCacheApi = String(process.env.URL_CACHE_API)

const workspacesApi = new FetchAdapter(`${baseUrlWorkspaceApi}/api/workspaces`)
const accountApi = new FetchAdapter(`${baseUrlAccountApi}/api/accounts`)
const disputesApi = new FetchAdapter(`${baseUrlDisputesApi}/api/disputes`)
const documentsApi = new FetchAdapter(`${baseUrlDocumentsApi}/api/office/documents/model`)
const domainApi = new FetchAdapter(`${baseUrlDomainApi}/api/email/domain`)
const usageApi = new FetchAdapter(`${baseUrlUsageApi}/api/usage`)
const cacheApi = new FetchAdapter(`${baseUrlCacheApi}/api/autenticacao-cache-service`)

const cleanCacheUseCase = new CleanCacheUseCase(cacheApi)
const workspaceUseCase = new WorkspaceUseCase(workspacesApi)
const teamMembersUseCase = new TeamMembersUseCase(accountApi)
const accountUseCase = new AccountUseCase(accountApi)

const onUnhandledRequest = 'bypass'
const workspace = '410135f72b364af18a265072aaa7d961'
const authorization = 'Bearer autorizado'

const headers = new Headers()
headers.append('workspace', workspace)
headers.append('authorization', authorization)
headers.append('Accept', 'application/json, text/plain, */*')
headers.append('Content-Type', 'application/json;charset=UTF-8')

describe('Testes de integração', () => {
  let server: any
  let mockServer: any
  let logBkp: any

  beforeAll(() => {
    const httpServer = new ExpressAdapter()
    server = httpServer.listen(3333)
    logBkp = console.error

    console.error = () => ({})

    const controller = new RestController(
      httpServer,
      workspacesApi
    )
    const blackListController = new BlackListController(
      httpServer,
      workspacesApi
    )
    const documentController = new DocumentController(
      httpServer,
      workspacesApi,
      documentsApi
    )
    const domainController = new DomainController(
      httpServer,
      domainApi
    )
    const featureController = new FeatureController(
      httpServer,
      workspacesApi
    )
    const keyAccountController = new KeyAccountController(
      httpServer,
      accountApi
    )
    const messageAutomationController = new MessageAutomationController(
      httpServer,
      workspacesApi
    )
    const outcomeReasonsController = new OutcomeReasonsController(
      httpServer,
      disputesApi
    )
    const preNegotiationController = new PreNegotiationController(
      httpServer,
      disputesApi
    )
    const teamMemberController = new TeamMemberController(
      httpServer,
      workspacesApi,
      accountApi,
      disputesApi,
      teamMembersUseCase
    )
    const workspaceController = new WorkspaceController(
      httpServer,
      workspacesApi,
      usageApi,
      workspaceUseCase
    )
    const accountController = new AccountController(
      httpServer,
      accountUseCase
    )

    const cacheController = new CacheController(
      httpServer,
      cleanCacheUseCase
    )

    if (
      controller.ok &&
      blackListController.ok &&
      documentController.ok &&
      domainController.ok &&
      featureController.ok &&
      keyAccountController.ok &&
      messageAutomationController.ok &&
      outcomeReasonsController.ok &&
      preNegotiationController.ok &&
      teamMemberController.ok &&
      workspaceController.ok &&
      accountController.ok &&
      cacheController.ok
    ) {
      mockServer = setupServer(...handlers)
      mockServer.listen({ onUnhandledRequest })
    }
  })

  afterAll((done) => {
    console.error = logBkp
    mockServer.close()
    server.close(() => done())
  })

  describe('Testa erros por falta de header', () => {
    const url = `${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/api-integration/list`

    it('Deve retornar erro "Não autorizado".', async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: { workspace }
      }).then(async response => {
        return await response.text().then((text: string) => JSON.parse(text ?? '{}'))
      })

      expect(response.message).toBe('Não autorizado!')
    })

    it('Deve retornar erro "Não autorizado" com status 401.', async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: { workspace }
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(401)
    })

    it('Deve retornar erro "workspace não informada".', async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: { authorization }
      }).then(async response => (await response.text().then(text => JSON.parse(text ?? '{}'))))

      expect(response.message).toBe('Workspace não informada.')
    })

    it('Deve retornar erro "workspace não informada" com status 401.', async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: { authorization }
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(401)
    })
  })

  describe('Testa endpoint "/healthcheck"', () => {
    const url = `${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/healthcheck`

    it('Deve ter retorno com status válido', async () => {
      const response = await fetch(url, { method: 'GET' })

      expect(response.ok).toBeTruthy()
    })
  })

  describe('Testa endpoint "/workspace/edit/team-name"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/workspace/edit/team-name`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          id: 110,
          teamName: 'Equipe JUSTTO'
        })
      })

      expect(response.ok).toBeTruthy()
    })

    it('Deve ter retorno inválido.', async () => {
      const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          teamName: 'Equipe JUSTTO'
        })
      })

      expect(response.ok).toBeFalsy()
    })
  })

  describe('Testa endpoint "/workspace/edit"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/workspace/edit`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          id: 110,
          teamName: 'Equipe JUSTTO',
          name: 'Equipe Justto'
        })
      })

      expect(response.ok).toBeTruthy()
    })

    it('Deve ter retorno inválido.', async () => {
      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          teamName: 'Equipe JUSTTO'
        })
      })

      expect(response.ok).toBeFalsy()
    })
  })

  describe('Testa endpoint "/key-account/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/key-account/list`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeTruthy()
    })
  })

  describe('Testa endpoint "/key-account"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/key-account`)
    url.searchParams.append('workspaceId', '110')

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeTruthy()
    })
  })

  describe('Testa endpoint "/key-account/edit"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/key-account/edit`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PATCH',
        body: JSON.stringify({
          workspaceId: 110,
          keyAccountId: 2923
        })
      })

      expect(response.ok).toBeTruthy()
    })

    it('Deve ter retorno inválido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PATCH'
      })

      expect(response.ok).toBeFalsy()
    })
  })

  describe('Testa endpoint "/feature/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/feature/list`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeTruthy()
    })
  })

  describe('Testa endpoint "/feature/edit"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/feature/edit`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PATCH',
        body: JSON.stringify({
          featureId: 2,
          isActive: 'true'
        })
      })

      expect(response.ok).toBeTruthy()
    })

    it('Deve ter retorno inválido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PATCH',
        body: JSON.stringify({
          isActive: 'true'
        })
      })

      expect(response.ok).toBeFalsy()
    })
  })

  describe('Testa endpoint "/team-member/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/team-member/list`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeTruthy()
    })
  })

  describe('Testa endpoint "/api-integration/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/api-integration/list`)
    url.searchParams.append('featureId', '6')

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeTruthy()
    })

    it('GET deve retornar erro', async () => {
      url.searchParams.delete('featureId')
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
    })
  })

  describe('Testa endpoint "/edit/properties"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/account/edit/properties`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PUT',
        body: JSON.stringify({})
      })

      console.log(await response.json())

      expect(response.ok).toBeTruthy()
    })
  })

  describe('Testa endpoint "/cache"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/cache`)

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'DELETE'
      })

      console.log(await response.json())

      expect(response.ok).toBeTruthy()
    })
  })

  describe('Testa endpoint "/black-list/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/black-list/list`)
    url.searchParams.append('workspaceId', '110')

    it('Deve ter retorno válido.', async () => {
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeTruthy()
    })
  })
})

describe('Testa tratamento de erros das endpoints', () => {
  let server: any
  let mockServer: any
  let logBkp: any

  afterAll(() => mockServer.close())

  beforeAll(() => {
    const httpServer = new ExpressAdapter()
    server = httpServer.listen(3333)
    logBkp = console.error

    console.error = () => ({})

    const controller = new RestController(
      httpServer,
      workspacesApi
    )
    const blackListController = new BlackListController(
      httpServer,
      workspacesApi
    )
    const documentController = new DocumentController(
      httpServer,
      workspacesApi,
      documentsApi
    )
    const domainController = new DomainController(
      httpServer,
      domainApi
    )
    const featureController = new FeatureController(
      httpServer,
      workspacesApi
    )
    const keyAccountController = new KeyAccountController(
      httpServer,
      accountApi
    )
    const messageAutomationController = new MessageAutomationController(
      httpServer,
      workspacesApi
    )
    const outcomeReasonsController = new OutcomeReasonsController(
      httpServer,
      disputesApi
    )
    const preNegotiationController = new PreNegotiationController(
      httpServer,
      disputesApi
    )
    const teamMemberController = new TeamMemberController(
      httpServer,
      workspacesApi,
      accountApi,
      disputesApi,
      teamMembersUseCase
    )
    const workspaceController = new WorkspaceController(
      httpServer,
      workspacesApi,
      usageApi,
      workspaceUseCase
    )
    const accountController = new AccountController(
      httpServer,
      accountUseCase
    )

    const cacheController = new CacheController(
      httpServer,
      cleanCacheUseCase
    )

    if (
      controller.ok &&
      blackListController.ok &&
      documentController.ok &&
      domainController.ok &&
      featureController.ok &&
      keyAccountController.ok &&
      messageAutomationController.ok &&
      outcomeReasonsController.ok &&
      preNegotiationController.ok &&
      teamMemberController.ok &&
      workspaceController.ok &&
      accountController.ok &&
      cacheController.ok
    ) {
      mockServer = setupServer(...handlersWithError)
      mockServer.listen({ onUnhandledRequest })
    }
  })

  afterAll((done) => {
    console.error = logBkp
    mockServer.close()
    server.close(() => done())
  })

  describe('Testa endpoint "/workspace/edit/team-name"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/workspace/edit/team-name`)

    it('PATCH deve retornar erro', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PATCH',
        body: JSON.stringify({
          teamName: 'Equipe JUSTTO',
          id: 110
        })
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/workspace/edit"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/workspace/edit`)

    it('PUT deve retornar erro', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PUT',
        body: JSON.stringify({
          teamName: 'Equipe JUSTTO',
          id: 110
        })
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/key-account/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/key-account/list`)

    it('GET deve retornar erro', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'GET'
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/key-account"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/key-account`)
    url.searchParams.append('workspaceId', '110')

    it('GET deve retornar erro', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'GET'
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/key-account/edit"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/key-account/edit`)

    it('PATCH deve retornar erro', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PATCH',
        body: JSON.stringify({
          workspaceId: 110,
          keyAccountId: 2923
        })
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/feature/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/feature/list`)

    it('GET deve retornar erro', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'GET'
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/feature/edit"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/feature/edit`)

    it('PATCH deve retornar erro', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PATCH',
        body: JSON.stringify({
          featureId: 2,
          isActive: 'true'
        })
      })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/api-integration/list"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/api-integration/list`)
    url.searchParams.append('featureId', '6')

    it('GET deve retornar erro', async () => {
      const response = await fetch(url.toString(), { headers })

      expect(response.ok).toBeFalsy()
      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ message: 'Internal Server Error' })
    })
  })

  describe('Testa endpoint "/edit/properties"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/account/edit/properties`)

    it('Deve ter retorno inválido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'PUT',
        body: JSON.stringify({})
      })

      expect(response.ok).toBeFalsy()
    })
  })

  describe('Testa endpoint "/cache"', () => {
    const url = new URL(`${LOCAL_URL}${PORTAL_CONFGURATIONS_BFF}/cache`)

    it('Deve ter retorno inválido.', async () => {
      const response = await fetch(url.toString(), {
        headers,
        method: 'DELETE'
      })

      console.log(await response.json())

      expect(response.ok).toBeFalsy()
    })
  })
})
