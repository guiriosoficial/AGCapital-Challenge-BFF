class GatewayError extends Error {
  code: number

  constructor ({
    message = 'Internal Server Error',
    status = 500
  }) {
    super(message)
    this.code = status
  }
}

export default GatewayError
