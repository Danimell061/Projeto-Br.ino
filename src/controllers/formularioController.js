import Formulario from "../models/formularioModel.js";

const listarFormularios = async (req, res)=>{
    try{
        const formularios = await Formulario.find({})
        res.status(200).json(formularios)
    }catch(error){
        res.status(500).json({ 
            message: "Erro ao buscar formularios!",
            error: error
        })
    }
}

const criarFormulario = async (req, res)=>{
    try{
        const novoFormulario = await Formulario.create(req.body)

        res.status(201).json({ 
            message: "Mensagem enviada com sucesso!",
            formulario: novoFormulario
        })
    }catch(error){
        res.status(500).json({ 
            message: "Erro ao salvar no MongoDB!",
            error: error
        })
    }
}

export { listarFormularios , criarFormulario }