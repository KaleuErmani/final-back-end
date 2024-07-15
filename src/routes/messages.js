import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { validateMessage, validateUserEmail } from '../middlewares/validation'
import { users } from './users'

const router = express.Router()
const messages = []

router.post('/', validateMessage, validateUserEmail, (request, response) => {
    const { email, title, description } = request.body
    const user = users.find(user => user.email === email)

    const newMessage = {
        id: uuidv4(),
        title,
        description,
        userId: user.id
    }

    messages.push(newMessage)

    response.status(201).json({ message: 'Mensagem criada com sucesso!', newMessage })
})

router.get('/:email', (request, response) => {
    const {email} = request.params

    const user = users.find(user => user.email === email)

    if(!user) {
        return response.status(404).json({message: 'Email não encontrado, verifique ou crie uma conta'})
    }

    response.status(200).json({message: 'Seja bem-vinde!', messages})
})

router.put('/:id', (request, response) => {
    const {id} = request.params
    const {title, description} = request.body

    const message = messages.find(message => message.id === id)

    if(!message) {
        return response.status(404).json({message: 'Por favor, informe um id válido da mensagem'})
    }

    message.title = title
    message.description = description

    response.status(200).json({message: 'Mensagem atualizada com sucesso', message})
})

router.delete('/:id', (request, response) => {
    const {id} = request.params

    const messageIndex = messages.findIndex (message=> message.id === id) 
    
    if(messageIndex === -1) {
        response.status(404).json({message: 'Mensagem não encontrada, verifique o identificador em nosso banco'})
    }

    const [deletedMessage] = messages.splice(messageIndex, 1)

    response.status(200).json({message: 'Mensagem apagada com sucesso', deletedMessage})
})


export default router