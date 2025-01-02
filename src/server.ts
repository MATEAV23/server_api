import colors from 'colors'
import express from 'express'
import router from './router'
import db from './config/db'

// Conectar Base de datos

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.blue.bold('Conexion exitosa a la base de datos') )
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la Base de Datos'))
    }
}

connectDB()

//instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde Api'})
})



export default server