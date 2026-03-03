window.addEventListener('load', function () {
    const form = document.querySelector('form');
    // Captura de Inputs
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const avatar = document.getElementById('avatar'); // Opcional pero si sube debe ser válido

    // Función auxiliar para mostrar un error en el DOM
    const showError = (inputElement, message) => {
        // Marcamos el borde en rojo
        inputElement.classList.add('input-error');

        // Buscamos si ya existe el mensajito de error debajo del input
        let errorSpan = inputElement.nextElementSibling;

        // Si no existe (o no tiene la clase), lo creamos dinámicamente
        if (!errorSpan || !errorSpan.classList.contains('error-msg-front')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-msg-front');
            // Le damos estilo alineado a CSS en línea (similar al backend)
            errorSpan.style.color = '#e74c3c';
            errorSpan.style.fontSize = '0.85rem';
            errorSpan.style.marginTop = '5px';
            errorSpan.style.display = 'block';

            // Lo insertamos después del input
            inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
        }
        errorSpan.innerText = message;
    };

    // Función auxiliar para LIMPIAR errores previos si el usuario corrige
    const clearError = (inputElement) => {
        inputElement.classList.remove('input-error');
        let errorSpan = inputElement.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-msg-front')) {
            errorSpan.remove();
        }
    };

    // Al darle al Botón Submit
    form.addEventListener('submit', function (e) {
        let errores = [];

        // 1. Validar Nombre
        clearError(firstName);
        if (firstName.value.trim().length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres');
            showError(firstName, "El nombre debe tener al menos 2 caracteres");
        }

        // 2. Validar Apellido
        clearError(lastName);
        if (lastName.value.trim().length < 2) {
            errores.push('El apellido debe tener al menos 2 caracteres');
            showError(lastName, "El apellido debe tener al menos 2 caracteres");
        }

        // 3. Validar Email
        clearError(email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            errores.push('El email debe ser válido');
            showError(email, "Debe ser un formato de correo válido (ej: nombre@mail.com)");
        }

        // 4. Validar Contraseña (Min. 8)
        clearError(password);
        if (password.value.length < 8) {
            errores.push('La contraseña es muy corta');
            showError(password, "La contraseña no puede tener menos de 8 caracteres");
        }

        // 5. Validar Imagen (Extensiones) => Javascript la extrae de .value
        clearError(avatar);
        if (avatar.value) {
            const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            // Obtener la extensión extrayendo lo que hay tras el último punto
            const ext = avatar.value.substring(avatar.value.lastIndexOf('.')).toLowerCase();

            if (!acceptedExtensions.includes(ext)) {
                errores.push('Extensión de imagen inválida');
                showError(avatar, `Formatos permitidos: ${acceptedExtensions.join(', ')}`);
            }
        }

        // Si hay al menos 1 error, CANCELAMOS EL ENVÍO 
        if (errores.length > 0) {
            e.preventDefault();
        }
    });
});
