// script.js

// Função para checar se o formulário está correto
function checkForm() {
    // Pegando os valores dos campos do formulário
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var valid = true;
    var msg = '';

    // Checar se o nome não está vazio
    if (name.trim() === '') {
        msg += 'Nome é necessário.\n';
        valid = false;
    }

    // Checar se o email é válido
    if (!checkEmail(email)) {
        msg += 'Email não é válido.\n';
        valid = false;
    }

    // Checar se o telefone é válido, se foi preenchido
    if (phone && !checkPhone(phone)) {
        msg += 'Telefone não é válido.\n';
        valid = false;
    }

    // Mostrar mensagem de erro se houver
    if (!valid) {
        alert(msg);
    }

    return valid;
}

// Função para verificar o email
function checkEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para verificar o telefone
function checkPhone(phone) {
    var re = /^\d{10,15}$/; // Pode ajustar conforme necessário
    return re.test(phone);
}

// Função para validar o formulário de reserva
function validarFormulario() {
    // Obtém os valores dos campos
    let checkIn = document.getElementById("checkin").value;
    let checkOut = document.getElementById("checkout").value;
    let adultos = parseInt(document.getElementById("adults").value, 10);
    let criancas = parseInt(document.getElementById("children").value, 10);

    // Verifica se os campos estão preenchidos
    if (!checkIn) {
        alert("A data de check-in é obrigatória.");
        return false;
    }
    if (!checkOut) {
        alert("A data de check-out é obrigatória.");
        return false;
    }

    // Verifica se a data de check-out é posterior à data de check-in
    if (new Date(checkIn) >= new Date(checkOut)) {
        alert("A data de check-out deve ser posterior à data de check-in.");
        return false;
    }

    // Verifica se o número de adultos e crianças são válidos
    if (isNaN(adultos) || adultos <= 0) {
        alert("O número de adultos deve ser maior que 0.");
        return false;
    }
   
    // Se todas as validações passarem
    alert("Reserva feita com sucesso!");
    return true;
}

// Configurar o formulário quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        if (!checkForm()) {
            event.preventDefault(); // Impede o envio do formulário se não estiver certo
        }
    });

    // Mostrar ou esconder o formulário de concurso
    var openFormBtn = document.getElementById("openForm");
    var closeFormBtn = document.getElementById("closeForm");
    var formContest = document.getElementById("contestForm");

    openFormBtn.addEventListener("click", function() {
        formContest.classList.remove("hidden-form");
    });

    closeFormBtn.addEventListener("click", function() {
        formContest.classList.add("hidden-form");
    });

    // Adiciona o evento de validação ao botão de reserva
    var reservaBtn = document.querySelector(".booking-form button");
    reservaBtn.addEventListener("click", function(event) {
        if (!validarFormulario()) {
            event.preventDefault(); // Impede o envio do formulário se não estiver certo
        }
    });
});
