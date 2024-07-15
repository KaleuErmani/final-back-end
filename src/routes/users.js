import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { validateUserRegistration, validateUserLogin } from '../middlewares/validation'

const router = express.Router()
export const users = []

router.post('/signup', validateUserRegistration, async (request, response) => {
    const { name, email, password } = request.body

    const emailAlreadyRegistered = users.find(user => user.email === email)

    if (emailAlreadyRegistered) {
        return response.status(400).json({ message: 'E-mail já cadastrado.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    }

    users.push(newUser)

    response.status(201).json({ message: `Seja bem-vindo, ${name}! Pessoa usuária registrada com sucesso!`, user: newUser })
})

router.post('/login', validateUserLogin, async (request, response) => {
    const { email, password } = request.body

    const user = users.find(user => user.email === email)

    if (!user) {
        return response.status(404).json({ message: 'E-mail não encontrado no sistema, verifique ou crie uma conta' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return response.status(400).json({ message: 'Credenciais inválidas.' })
    }

    response.status(200).json({ message: 'Login feito com sucesso.', userId: user.id })
})

export default router


  