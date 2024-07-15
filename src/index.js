import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users'
import messageRoutes from './routes/messages'

const port = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.status(200).send('Bem vindo à aplicação')
})

app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})