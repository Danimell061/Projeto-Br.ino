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

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            nomeCompleto: form.nomeCompleto.value,
            email: form.email.value,
            telefone: form.telefone.value,
            mensagem: form.mensagem.value
        };

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                try {
                    const resposta = JSON.parse(xhr.response);
                    const status = xhr.status;
                    const exito = status >= 200 && status < 300;
                    const mensagem = resposta.message || resposta[Object.keys(resposta)[0]];

                    if (exito) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: mensagem,
                            icon: 'success',
                            confirmButtonText: 'Continuar',
                        });
                        limparFormulario(form);
                    } else {
                        Swal.fire({
                            title: 'ERRO!',
                            text: mensagem,
                            icon: 'error',
                            confirmButtonText: 'Continuar',
                        });
                    }
                } catch (e) {
                    console.error('Erro ao processar resposta:', e);
                }
            }
        };

        xhr.open("POST", "/contato");
        xhr.setRequestHeader("Content-Type", "application/json");

        try {
            xhr.send(JSON.stringify(data));
        } catch (e) {
            console.error('Erro ao enviar dados:', e);
        }
    });
}

function limparFormulario(form) {
    // Limpa inputs e textareas
    const campos = form.querySelectorAll('input:not([type="submit"]), textarea');
    campos.forEach(campo => {
        campo.value = '';
    });
}

// Função para scroll suave
function scrollParaContato(event) {
    event.preventDefault();
    const secao = document.getElementById('areaFormContato');
    if (secao) {
        secao.scrollIntoView({ behavior: 'smooth' });
    }
}

// Adiciona listeners para botões de contato
document.addEventListener('DOMContentLoaded', () => {
    const botoesContato = document.querySelectorAll('a[href="#areaFormContato"]');
    botoesContato.forEach(botao => {
        botao.addEventListener('click', scrollParaContato);
    });
});