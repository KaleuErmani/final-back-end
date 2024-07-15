import { users } from '../routes/users'

export function validateUserRegistration(request, response, next) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
        return response.status(400).json({ message: 'O preenchimento dos campos é obrigatório.' })
    }

    next()
}

export function validateUserLogin(request, response, next) {
    const { email, password } = request.body

    if (!email) {
        return response.status(400).json({ message: 'Insira um e-mail válido.' })
    } else if (!password) {
        return response.status(400).json({ message: 'Insira uma senha válida.' })
    }

    next()
}

export function validateMessage(request, response, next) {
    const { title, description } = request.body

    if (!title) {
        return response.status(400).json({ message: 'Insira um título válido.' })
    } else if (!description) {
        return response.status(400).json({ message: 'Insira uma descrição válida.' })
    }

    next()
}

export function validateUserEmail(request, response, next) {
    const { email } = request.body
    const user = users.find(user => user.email === email)

    if (!user) {
        return response.status(404).json({ message: 'Email não encontrado, verifique ou crie uma conta' })
    }

    next()
}