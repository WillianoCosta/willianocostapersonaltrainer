/* ======== MENU HAMBÚRGUER (MOBILE) ======== */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

/* ======== ATUALIZAR ANO DO COPYRIGHT ======== */
document.getElementById("current-year").textContent = new Date().getFullYear();


/* ======== PROCESSAMENTO DO FORMULÁRIO DE CONTATO (COM GOOGLE APPS SCRIPT) ======== */
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitButton = document.getElementById('submit-button');

//
// IMPORTANTE: Substitua esta URL pela URL do seu Web App do Google Apps Script
//
const SCRIPT_URL = 'COLE_A_URL_DO_SEU_APPS_SCRIPT_AQUI';
//
//

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Desabilita o botão para evitar envios duplos
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    fetch(SCRIPT_URL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            formStatus.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
            formStatus.style.color = 'var(--primary-color)';
            form.reset();
        } else {
            throw new Error(data.message || 'Ocorreu um erro.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        formStatus.textContent = 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
        formStatus.style.color = '#ff4d4d';
    })
    .finally(() => {
        // Reabilita o botão após 5 segundos
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensagem';
            formStatus.textContent = '';
        }, 5000);
    });
});