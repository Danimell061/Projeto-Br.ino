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
            let documento = xhr.response
            documento = JSON.parse(documento)

            // Printa a resposta do backend
            console.log(documento)
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
