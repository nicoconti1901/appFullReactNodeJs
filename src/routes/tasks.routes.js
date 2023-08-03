import {Router} from 'express'

const router = Router()

router.get('/tasks', (req, res) => res.send('Obteniendo tareas'))

router.get('/tasks/:id', (req, res) => res.send('Obteniendo tarea unica'))

router.post('/tasks', (req, res) => res.send('Creando tarea'))

router.put('/tasks/:id', (req, res) => res.send('Editando tareas'))

router.delete('/tasks/:id', (req, res) => res.send('Borrando tarea'))


export default router