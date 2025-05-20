const validarFormulario = (req, res, next) => {
    const regexNome = /^[A-Za-zÀ-ÿ\s]+$/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}[-\s]?\d{4}$/

    try {
        const nomeCompleto = req.body.nomeCompleto
        const email = req.body.email
        const telefone = req.body.telefone
        const mensagem = req.body.mensagem

        if((nomeCompleto == "" || nomeCompleto == undefined) || (email == "" || email == undefined) || (telefone == "" || telefone == undefined) || (mensagem == "" || mensagem == undefined)){
            return res.status(400).json({ message: 'Preencha / envie todos os campos!' })
        }

        const testeNome = regexNome.test(nomeCompleto)
        const testeEmail = regexEmail.test(email)
        const testeTelefone = regexTelefone.test(telefone)
        
        if (!testeNome){
            return res.status(400).json({ message: 'Nome inválido!' });
        }

        if (!testeEmail){
            return res.status(400).json({ message: 'Email inválido!' });
        }
            
        if (!testeTelefone){
            return res.status(400).json({ message: 'Telefone inválido!' });
        }
            
    }catch(erro){
        console.log(erro)
        return res.status(400).json({ message: 'Erro ao enviar o formulario' })
    }
    
    next()
}

export { validarFormulario }
