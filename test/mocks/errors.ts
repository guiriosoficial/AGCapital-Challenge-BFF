import { rest } from 'msw'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const baseUrlWorkspaceApi = String(process.env.URL_WORKSPACES_API) + '/api/workspaces'
const baseUrlAccountApi = String(process.env.URL_ACCOUNT_API) + '/api/accounts'
const baseUrlCacheApi = String(process.env.URL_CACHE_API) + '/api/autenticacao-cache-service'

const apis = [{
  url: `${baseUrlWorkspaceApi}/teamName`,
  method: rest.patch
}, {
  url: `${baseUrlWorkspaceApi}/`,
  method: rest.patch
}, {
  url: `${baseUrlWorkspaceApi}/`,
  method: rest.put
}, {
  url: `${baseUrlAccountApi}/workspaces/keyAccount`,
  method: rest.get
}, {
  url: `${baseUrlAccountApi}`,
  method: rest.get
}, {
  url: `${baseUrlAccountApi}/workspaces/110/keyAccount`,
  method: rest.get
}, {
  url: `${baseUrlAccountApi}/workspaces/110/keyAccount/2923`,
  method: rest.patch
}, {
  url: `${baseUrlWorkspaceApi}/feature`,
  method: rest.get
}, {
  url: `${baseUrlWorkspaceApi}/feature/2/true`,
  method: rest.patch
}, {
  url: `${baseUrlWorkspaceApi}/feature/6/properties`,
  method: rest.get
}, {
  url: `${baseUrlAccountApi}/my/property`,
  method: rest.put
}, {
  url: `${baseUrlAccountApi}/my/property`,
  method: rest.get
}, {
  url: `${baseUrlCacheApi}/v1/cache`,
  method: rest.get
}]

export const handlersWithError = apis.map(({ url, method }) => method(url, async (req, res, ctx) => {
  return await res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))
}))
