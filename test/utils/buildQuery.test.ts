import buildQuery from '../../src/utils/buildQuery'

interface QueryInput {
  q: object
  command?: string
  disputesLength?: number
  noSort?: boolean
}

describe('Testa buildQuery', () => {
  it('Teste 1', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], prescriptions: [] } }
    const output = '?status=RUNNING'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 2', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], sort: ['visualized,asc', 'lastInboundInteraction.createdAt,desc', 'expirationDate,asc', 'id,desc'], size: 20, page: 1, prescriptions: [] } }
    const output = '?status=RUNNING&sort=visualized%2Casc&sort=lastInboundInteraction.createdAt%2Cdesc&sort=expirationDate%2Casc&sort=id%2Cdesc&size=20&page=1'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 3', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], prescriptions: [] } }
    const output = '?status=RUNNING'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 4', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], sort: ['visualized,asc', 'lastInboundInteraction.createdAt,desc', 'expirationDate,asc', 'id,desc'], size: 20, page: 1, prescriptions: [] } }
    const output = '?status=RUNNING&sort=visualized%2Casc&sort=lastInboundInteraction.createdAt%2Cdesc&sort=expirationDate%2Casc&sort=id%2Cdesc&size=20&page=1'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 5', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], campaigns: [], strategy: [], persons: [], dealDate: [], expirationDate: [], prescriptions: [], onlyFavorite: false, term: '', total: 0 } }
    const output = '?status=RUNNING'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 6', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], campaigns: [], strategy: [], tags: [], persons: [], dealDate: [], expirationDate: [], prescriptions: [], onlyFavorite: false, page: 1, size: 20, term: '', total: 0, sort: ['visualized,asc', 'lastInboundInteraction.createdAt,desc', 'expirationDate,asc'], useDisputeProjection: true, workspaceId: 110 }, command: 'resetPages', disputesLength: 0 }
    const output = '?status=RUNNING&page=1&size=20&sort=visualized%2Casc&sort=lastInboundInteraction.createdAt%2Cdesc&sort=expirationDate%2Casc&workspaceId=110'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 7', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: ['INTERACTION', 'NOTE', 'ACTION'], showScheduler: false } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&type=INTERACTION&type=NOTE&type=ACTION'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 8', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: ['INTERACTION', 'NOTE', 'ACTION'], showScheduler: false } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&type=INTERACTION&type=NOTE&type=ACTION'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 9', () => {
    const input: QueryInput = { q: { page: 2, size: 20, sort: ['createdAt,desc'], type: ['INTERACTION', 'NOTE', 'ACTION'], showScheduler: false } }
    const output = '?page=2&size=20&sort=createdAt%2Cdesc&type=INTERACTION&type=NOTE&type=ACTION'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 10', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: 'NOTE', showScheduler: false } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&type=NOTE'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 11', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: null, resumed: false, showScheduler: true } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&showScheduler=true'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 12', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: null, resumed: true, showScheduler: true } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&resumed=true&showScheduler=true'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 13', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: ['INTERACTION', 'NOTE', 'ACTION'], showScheduler: false } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&type=INTERACTION&type=NOTE&type=ACTION'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 14', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: ['INTERACTION', 'NOTE', 'ACTION'], showScheduler: false } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&type=INTERACTION&type=NOTE&type=ACTION'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 15', () => {
    const input: QueryInput = { q: { page: 1, size: 20, sort: ['createdAt,desc'], type: ['INTERACTION', 'NOTE', 'ACTION'], showScheduler: false } }
    const output = '?page=1&size=20&sort=createdAt%2Cdesc&type=INTERACTION&type=NOTE&type=ACTION'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 16', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], campaigns: [], strategy: [], persons: [], dealDate: [], expirationDate: [], prescriptions: [], onlyFavorite: false, term: '', total: 11 } }
    const output = '?status=RUNNING'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 17', () => {
    const input: QueryInput = { q: { status: ['RUNNING'], campaigns: [], strategy: [], tags: [], persons: [], dealDate: [], expirationDate: [], prescriptions: [], onlyFavorite: false, page: 1, size: 20, term: '', total: 11, sort: ['visualized,asc', 'lastInboundInteraction.createdAt,desc', 'expirationDate,asc'], useDisputeProjection: true, workspaceId: 110 }, command: 'resetPages', disputesLength: 11 }
    const output = '?status=RUNNING&page=1&size=20&sort=visualized%2Casc&sort=lastInboundInteraction.createdAt%2Cdesc&sort=expirationDate%2Casc&workspaceId=110'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 18', () => {
    const input: QueryInput = { q: { status: [], campaigns: [], strategy: [], persons: [], expirationDate: [], dealDate: [], prescriptions: [], onlyFavorite: false, term: '', total: 0 } }
    const output = ''

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 19', () => {
    const input: QueryInput = { q: { status: [], sort: ['id,desc'], campaigns: [], strategy: [], tags: [], persons: [], expirationDate: [], dealDate: [], prescriptions: [], onlyFavorite: false, page: 1, size: 20, term: '', total: 0, useDisputeProjection: true, workspaceId: 110 }, command: 'resetPages', disputesLength: 11 }
    const output = '?sort=id%2Cdesc&page=1&size=20&workspaceId=110'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 20', () => {
    const input: QueryInput = { q: { status: [], campaigns: [], strategy: [], persons: [], expirationDate: [], dealDate: [], prescriptions: ['FINISHED_WITH_MESSAGES'], onlyFavorite: false, term: '', total: 243 } }
    const output = '?prescriptions=FINISHED_WITH_MESSAGES'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 21', () => {
    const input: QueryInput = { q: { status: [], sort: ['id,desc'], campaigns: [], strategy: [], tags: [], persons: [], expirationDate: [], dealDate: [], prescriptions: ['FINISHED_WITH_MESSAGES'], onlyFavorite: false, page: 1, size: 20, term: '', total: 243, useDisputeProjection: true, workspaceId: 110 }, command: 'resetPages', disputesLength: 20 }
    const output = '?sort=id%2Cdesc&prescriptions=FINISHED_WITH_MESSAGES&page=1&size=20&workspaceId=110'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 22', () => {
    const input: QueryInput = { q: { status: [], campaigns: [], strategy: [], persons: [], expirationDate: [], dealDate: [], prescriptions: [], onlyFavorite: false, term: '', total: 5 } }
    const output = ''

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 23', () => {
    const input: QueryInput = { q: { status: [], sort: ['id,desc'], campaigns: [], strategy: [], tags: [], persons: [], expirationDate: [], dealDate: [], prescriptions: [], onlyFavorite: false, page: 1, size: 20, term: '', total: 5, useDisputeProjection: true, workspaceId: 110 }, command: 'resetPages', disputesLength: 5 }
    const output = '?sort=id%2Cdesc&page=1&size=20&workspaceId=110'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 24', () => {
    const input: QueryInput = { q: { status: [], sort: ['id,desc'], campaigns: [], strategy: [], tags: [], persons: [], expirationDate: [], dealDate: [], prescriptions: [], onlyPaused: true, onlyFavorite: false, page: 1, size: 20, term: '', total: 5, useDisputeProjection: true, workspaceId: 110 }, command: 'resetPages', disputesLength: 5 }
    const output = '?sort=id%2Cdesc&onlyPaused=true&page=1&size=20&workspaceId=110'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 25', () => {
    const input: QueryInput = { q: { status: [], sort: ['id,desc'], campaigns: [], strategy: [], tags: [], persons: [], expirationDate: [], dealDate: [], prescriptions: [], onlyPaused: true, onlyFavorite: false, page: 1, size: 20, term: '', total: 5, useDisputeProjection: true, workspaceId: 110 }, command: 'resetPages', disputesLength: 5, noSort: true }
    const output = '?sort=id%2Cdesc&onlyPaused=true'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 26', () => {
    const input: QueryInput = { q: { status: [], sort: ['id,desc'], campaigns: [], strategy: [], tags: [], persons: [], expirationDate: [], dealDate: [], prescriptions: [], onlyPaused: true, onlyFavorite: false, page: 1, size: 20, term: '', total: 5, useDisputeProjection: true, workspaceId: 110, textSearch: '#123456' }, command: 'resetPages', disputesLength: 5, noSort: true }
    const output = '?sort=id%2Cdesc&onlyPaused=true'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 27', () => {
    const input: QueryInput = { q: { invalidKey: false, sort: ['id,desc'] } }
    const output = '?sort=id%2Cdesc'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 28', () => {
    const input: QueryInput = { q: { anyKey: true, sort: ['id,desc'] } }
    const output = '?anyKey=true&sort=id%2Cdesc'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 29', () => {
    const input: QueryInput = { q: { page: 1, size: 20 }, command: 'update', disputesLength: 5 }
    const output = '?page=1&size=5'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })

  it('Teste 30', () => {
    const input: QueryInput = { q: { anyKey: false, sort: ['id,desc'] } }
    const output = '?sort=id%2Cdesc'

    expect(buildQuery(input.q, input.command, input.disputesLength, input.noSort)).toBe(output)
  })
})
