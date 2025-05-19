import express from "express"
import { criarFormulario, listarFormularios } from "../controllers/formularioController.js"

const router = express.Router()

router.get('/formularios', listarFormularios)

router.post('/contato', criarFormulario)

export default router