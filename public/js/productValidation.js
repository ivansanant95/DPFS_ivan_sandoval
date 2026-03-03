window.addEventListener('load', function () {
    const form = document.querySelector('form.admin-form');

    // Capturamos todos los inputs
    const name = document.getElementById('name');
    const price = document.getElementById('price');
    const description = document.getElementById('description');
    const image = document.getElementById('image');

    // Función auxiliar para mostrar un error en el DOM
    const showError = (inputElement, message) => {
        // Marcamos el borde en rojo
        inputElement.classList.add('input-error');

        // Buscamos si ya existe la calaverita de error front (para no duplicarlas)
        let errorSpan = inputElement.nextElementSibling;

        if (!errorSpan || !errorSpan.classList.contains('error-msg-front')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-msg-front');
            // Estilos CSS inyectados vía JS
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

    if (form) {
        form.addEventListener('submit', function (e) {
            let hasErrors = false;

            // 1. Validar Nombre (mínimo 5 caracteres)
            clearError(name);
            if (name.value.trim().length < 5) {
                showError(name, "El nombre del producto debe tener al menos 5 caracteres");
                hasErrors = true;
            }

            // 2. Validar Descripción (mínimo 20 caracteres)
            clearError(description);
            if (description.value.trim().length < 20) {
                showError(description, "Por favor, brinda una descripción más detallada (Mínimo 20 caracteres)");
                hasErrors = true;
            }

            // 3. Validar Precio (Debe ser numérico y mayor que cero)
            clearError(price);
            if (!price.value || isNaN(price.value) || parseFloat(price.value) <= 0) {
                showError(price, "El precio debe ser un número válido mayor a 0");
                hasErrors = true;
            }

            // 4. Validar Imagen (Debe ser JPG, PNG, GIF, WEBP)
            // Solo lo validamos si el usuario SELECCIONÓ un archivo. 
            // En la edición o creación a veces la imagen viene del servidor o se deja en blanco asumiendo la default.
            if (image && image.value) {
                clearError(image);
                const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
                const ext = image.value.substring(image.value.lastIndexOf('.')).toLowerCase();

                if (!acceptedExtensions.includes(ext)) {
                    showError(image, `Formatos permitidos en JS: ${acceptedExtensions.join(', ')}`);
                    hasErrors = true;
                }
            }

            // Si hay al menos 1 error, CANCELAMOS EL ENVÍO AL BACKEND
            if (hasErrors) {
                e.preventDefault();
            }
        });

        // ==========================================
        // BONUS UX: Feedback Interactivo al desenfocar
        // ==========================================

        name.addEventListener('blur', function () {
            if (this.value.trim().length > 0 && this.value.trim().length < 5) {
                showError(this, "Debe tener al menos 5 caracteres");
            } else {
                clearError(this);
            }
        });

        description.addEventListener('input', function () {
            // El usuario va escribiendo y se le borra el rojo apenas llegue a 20 caracteres
            if (this.value.trim().length >= 20) {
                clearError(this);
            }
        });
    }
});
