// Carrossel
let index = 0;
const carousel = document.getElementById("animacao");
const slides = document.querySelectorAll(".slide");
function moveSlide(direction) {
    index += direction;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    carousel.style.transform = `translateX(${-index * 100}%)`;
}

// Formulário

const form = document.getElementById('formContato');

form.addEventListener('submit', (event)=>{
    event.preventDefault()

    // Informações
    const data = {
        nomeCompleto: form.nomeCompleto.value,
        email: form.email.value,
        telefone: form.telefone.value,
        mensagem: form.mensagem.value
    }

    // Cria o xhr
    const xhr = new XMLHttpRequest()

    // Coloca um evendo que ativa quando ele mudar de status para "Enviado"
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            
            let resposta = xhr.response // A resposta
            let status = xhr.status.toString() // Status HTTP da resposta
            let exito = status.charAt(0) == 4 || status.charAt(0) == 5 ? false : true // Define se a operação foi concluida com exito ou não
            resposta = JSON.parse(resposta) // Resposta transformada em JSON
            let mensagem = resposta[Object.keys(resposta)[0]] // O primeiro item do objeto resposta (geralmente a mensagem)

            if(exito){
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Dados enviados com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Continuar',
                })
                limparFormulario(form)
            }else{
                Swal.fire({
                    title: 'ERRO!',
                    text: mensagem,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                })
            }

            // Printa a resposta do backend
            console.log(resposta)
            
        }
    }

    // Abre o xhr com o metodo POST
    xhr.open("POST", "/contato")

    // Seta o Header "Content-Type" como json
    xhr.setRequestHeader("Content-Type", "application/json")

    // Manda as informações
    try{
        xhr.send(JSON.stringify(data))
    }catch(e){
        console.log('ERRO! ' + e)
    }

})

function limparFormulario(form){
    const elementos = form.children

    for(let elemento of elementos){
        if(elemento.type !== 'submit'){
            elemento.value = ""
        }
    }
}

function scrollBotao(botao, secao){
    botao.addEventListener('click', (event)=>{
        event.preventDefault()
        document.getElementById(secao).scrollIntoView({
            behavior: 'smooth'
        })
    })
}

scrollBotao(document.getElementById('submit'), 'areaFormContato')
scrollBotao(document.getElementById('submit3'), 'areaFormContato')
scrollBotao(document.getElementById('submitPessoas'), 'sobre')
scrollBotao(document.getElementById('submitEscolas'), 'sobre')
scrollBotao(document.getElementById('submitGoverno'), 'sobreGoverno')