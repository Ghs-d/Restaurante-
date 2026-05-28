// Seleção dos elementos do formulário
const formPedido = document.getElementById('form-pedido');
const radioAgenda = document.getElementById('agenda');
const radioDeli = document.getElementById('deli');

// Seleção dos elementos da animação
const modal = document.getElementById('modal-pagamento');
const loader = document.getElementById('loader');
const sucessoIcon = document.getElementById('sucesso');
const modalTexto = document.getElementById('modal-texto');

// Seleção dos campos delivery e agendamento 
const inputsDelivery = document.querySelectorAll('.req-delivery');
const inputAgendamento = document.querySelector('.req-agendamento');


//  Validação das Abas

function atualizarValidacao() {
    if (radioAgenda.checked) {

        inputsDelivery.forEach(input => input.removeAttribute('required'));
        if (inputAgendamento) inputAgendamento.setAttribute('required', 'true');
    } else {

        if (inputAgendamento) inputAgendamento.removeAttribute('required');
        inputsDelivery.forEach(input => input.setAttribute('required', 'true'));
    }
}

//
radioAgenda.addEventListener('change', atualizarValidacao);
radioDeli.addEventListener('change', atualizarValidacao);


atualizarValidacao();


formPedido.addEventListener('submit', function (e) {
    e.preventDefault();


    modal.style.display = 'flex';
    loader.style.display = 'block';
    sucessoIcon.style.display = 'none';
    modalTexto.textContent = 'Processando sua solicitação...';
    modalTexto.style.color = '#3E2312';

    // Tempo de processamento 
    setTimeout(() => {

        loader.style.display = 'none';
        sucessoIcon.style.display = 'block';
        modalTexto.style.color = '#25D366';


        if (radioAgenda.checked) {
            modalTexto.textContent = 'Agendamento Confirmado! Te esperamos com aquele axé!';
        } else {
            modalTexto.textContent = 'Pedido Confirmado! Oxe, rapidinho chega aí!';
        }


        setTimeout(() => {
            modal.style.display = 'none';
            formPedido.reset();
            atualizarValidacao();
        }, 3000);

    }, 2500);
});




//  Puxa automaticamente as informações do perfil salvas no localStorage

function puxarDadosDoPerfil() {
   
    const nomeSalvo = localStorage.getItem("perfil_nome");
    const telefoneSalvo = localStorage.getItem("perfil_telefone");

    
    const inputNomeAgenda = document.getElementById("agenda-nome");
    const inputTelefoneAgenda = document.getElementById("agenda-telefone");

   
    if (nomeSalvo && inputNomeAgenda) {
        inputNomeAgenda.value = nomeSalvo;
    }

  
    if (telefoneSalvo && inputTelefoneAgenda) {
        inputTelefoneAgenda.value = telefoneSalvo;
    }
}


window.addEventListener("DOMContentLoaded", puxarDadosDoPerfil);