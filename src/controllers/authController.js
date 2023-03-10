const authService = require('../services/authService')
const HttpError = require('../util/errors/httpError')

const catchBlockHandler = (error, response) => {
  if (error instanceof HttpError) {
    response.status(error.code).json({ message: error.message })
  } else {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

const createUser = async (request, response) => {
  try {
    const { email, password } = request.body
    const user = await authService.createUser(email, password)
    response.status(201).json({ message: 'Success', data: { user } })
  } catch (error) {
    catchBlockHandler(error, response)
  }
}

const login = async (request, response) => {
  try {
    const { email, password } = request.body
    const token = await authService.login(email, password)
    response.status(200).json({ message: 'Success', data: { token } })
  } catch (error) {
    catchBlockHandler(error, response)
  }
}

const validateToken = async (request, response) => {
  try {
    const { token } = request.headers
    const decoded = await authService.validateToken(token)
    response.status(200).json({ message: 'Token is valid', data: decoded })
  } catch (error) {
    catchBlockHandler(error, response)
  }
}

module.exports = { createUser, login, validateToken }
