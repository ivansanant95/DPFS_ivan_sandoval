window.addEventListener('load', function () {
    const form = document.querySelector('form');
    // Captura de inputs
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Función auxiliar para mostrar un error en el DOM
    const showError = (inputElement, message) => {
        // Marcamos el borde en rojo
        inputElement.classList.add('input-error');

        // Buscamos si ya existe la calaverita de error front (para no duplicarlas)
        let errorSpan = inputElement.nextElementSibling;

        if (!errorSpan || !errorSpan.classList.contains('error-msg-front')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-msg-front');
            errorSpan.style.color = '#e74c3c';
            errorSpan.style.fontSize = '0.85rem';
            errorSpan.style.marginTop = '5px';
            errorSpan.style.display = 'block';

            // Lo insertamos debajo del input
            inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
        }
        errorSpan.innerText = message;
    };

    const clearError = (inputElement) => {
        inputElement.classList.remove('input-error');
        let errorSpan = inputElement.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-msg-front')) {
            errorSpan.remove();
        }
    };

    // Al darle al Botón Submit
    form.addEventListener('submit', function (e) {
        let hasErrors = false;

        // 1. Validar Email
        clearError(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value || !emailRegex.test(email.value)) {
            showError(email, "Por favor, ingresa un formato de correo válido");
            hasErrors = true;
        }

        // 2. Validar Contraseña (Min. 8)
        clearError(password);
        if (!password.value) {
            showError(password, "La contraseña es un campo obligatorio");
            hasErrors = true;
        }

        // Si hay al menos 1 error, CANCELAMOS EL ENVÍO
        if (hasErrors) {
            e.preventDefault();
        }
    });

    // Validacion Tipo "Feedback Inmediato" (blur = al perder el foco)
    email.addEventListener('blur', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            showError(email, "Hey! Parece que falta el arroba o dominio.");
        } else {
            clearError(email);
        }
    });
});
