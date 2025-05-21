import express from "express"
import { validarFormulario } from "../middlewares/validarFormulario.js"
import { criarFormulario, listarFormularios } from "../controllers/formularioController.js"

const router = express.Router()

router.get('/formularios', listarFormularios)

router.post('/contato', validarFormulario, criarFormulario)

export default router