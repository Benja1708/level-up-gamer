// Validaciones para el formulario de registro
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        // Validación en tiempo real
        const inputs = registrationForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });

        // Validación al enviar el formulario
        registrationForm.addEventListener('submit', handleFormSubmit);
    }
});

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'nombre':
            if (!value) {
                errorMessage = 'El nombre es obligatorio.';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'El nombre debe tener al menos 2 caracteres.';
                isValid = false;
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                errorMessage = 'El nombre solo puede contener letras y espacios.';
                isValid = false;
            }
            break;

        case 'email':
            if (!value) {
                errorMessage = 'El correo electrónico es obligatorio.';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Por favor, ingresa un correo electrónico válido.';
                isValid = false;
            } else {
                // Verificar si es correo Duoc para mostrar beneficio
                if (isDuocEmail(value)) {
                    showSuccess('email', '¡Genial! Tienes derecho al 20% de descuento de por vida.');
                }
            }
            break;

        case 'edad':
            const edad = parseInt(value);
            if (!value) {
                errorMessage = 'La edad es obligatoria.';
                isValid = false;
            } else if (isNaN(edad) || edad < 18) {
                errorMessage = 'Debes ser mayor de 18 años para registrarte.';
                isValid = false;
            } else if (edad > 120) {
                errorMessage = 'Por favor, ingresa una edad válida.';
                isValid = false;
            }
            break;

        case 'telefono':
            if (value && !isValidPhone(value)) {
                errorMessage = 'Por favor, ingresa un número de teléfono válido (ej: +56 9 1234 5678).';
                isValid = false;
            }
            break;

        case 'password':
            if (!value) {
                errorMessage = 'La contraseña es obligatoria.';
                isValid = false;
            } else if (value.length < 8) {
                errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
                isValid = false;
            } else if (!hasStrongPassword(value)) {
                errorMessage = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número.';
                isValid = false;
            }
            break;

        case 'confirm-password':
            const password = document.getElementById('password').value;
            if (!value) {
                errorMessage = 'Debes confirmar tu contraseña.';
                isValid = false;
            } else if (value !== password) {
                errorMessage = 'Las contraseñas no coinciden.';
                isValid = false;
            }
            break;

        case 'codigo-referido':
            if (value && !isValidReferralCode(value)) {
                errorMessage = 'El código de referido no es válido.';
                isValid = false;
            } else if (value && isValidReferralCode(value)) {
                showSuccess('referido', '¡Código válido! Ganarás puntos LevelUp adicionales.');
            }
            break;

        case 'acepta-terminos':
            if (!field.checked) {
                errorMessage = 'Debes aceptar los términos y condiciones.';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        showError(fieldName, errorMessage);
    } else {
        clearError(field);
    }

    return isValid;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    let isFormValid = true;

    // Validar todos los campos
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    // Validar checkbox de términos
    const terminosCheckbox = document.getElementById('acepta-terminos');
    if (!validateField(terminosCheckbox)) {
        isFormValid = false;
    }

    if (isFormValid) {
        // Simular registro exitoso
        showRegistrationSuccess(formData);
    } else {
        // Mostrar mensaje de error general
        alert('Por favor, corrige los errores en el formulario antes de continuar.');
    }
}

function showRegistrationSuccess(formData) {
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const codigoReferido = formData.get('codigo-referido');
    
    let mensaje = `¡Bienvenido a Level-Up Gamer, ${nombre}!\\n\\n`;
    mensaje += `Tu cuenta ha sido creada exitosamente.\\n`;
    mensaje += `Correo: ${email}\\n`;
    
    if (isDuocEmail(email)) {
        mensaje += `\\n🎉 ¡Felicidades! Tienes un descuento del 20% de por vida por ser estudiante Duoc.`;
    }
    
    if (codigoReferido) {
        mensaje += `\\n🎮 Has ganado 100 puntos LevelUp por usar un código de referido.`;
    }
    
    mensaje += `\\n\\nPuedes iniciar sesión ahora y comenzar a explorar nuestro catálogo.`;
    
    alert(mensaje);
    
    // Simular redirección a login
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function showSuccess(fieldName, message) {
    const successElement = document.getElementById(`${fieldName}-success`);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
}

function clearError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    const successElement = document.getElementById(`${fieldName}-success`);
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    // No limpiar mensajes de éxito automáticamente para email y referido
    if (successElement && fieldName !== 'email' && fieldName !== 'codigo-referido') {
        successElement.style.display = 'none';
    }
}

// Funciones de validación auxiliares
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isDuocEmail(email) {
    return email.toLowerCase().includes('@duoc.cl');
}

function isValidPhone(phone) {
    // Acepta formatos como +56 9 1234 5678, 56912345678, 912345678
    const phoneRegex = /^(\+?56\s?)?[9]\s?\d{4}\s?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function hasStrongPassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return hasUpperCase && hasLowerCase && hasNumbers;
}

function isValidReferralCode(code) {
    // Simular validación de código de referido (formato: LUG + 6 dígitos)
    const codeRegex = /^LUG\d{6}$/i;
    return codeRegex.test(code);
}

