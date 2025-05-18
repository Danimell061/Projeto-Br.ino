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
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {
                nomeCompleto: form.nomeCompleto.value,
                email: form.email.value,
                telefone: form.telefone.value,
                mensagem: form.mensagem.value
            };
            fetch('/contato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert('Mensagem enviada com sucesso!');
                    form.reset();
                } else {
                    alert('Erro ao enviar mensagem.');
                }
            })
            .catch(() => {
                alert('Erro ao enviar mensagem.');
            });
        });
    }
});