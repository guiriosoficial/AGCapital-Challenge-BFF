import buildHeaders from '../../utils/buildHeaders'
import buildQuery from '../../utils/buildQuery'

class RequestInput {
  constructor (
    readonly body: object | undefined,
    readonly query: object | undefined,
    readonly headers: object | undefined
  ) {}

  get getBody (): object {
    return this.body ?? {}
  }

  get getQuery (): string {
    return buildQuery(this.query ?? {})
  }

  get getHeaders (): object {
    return Object
      .entries(buildHeaders(this.headers ?? {}))
      .reduce((headers: object, [key, value]) => ({ ...headers, [key]: value }), {})
  }
}

export default RequestInput
