// Funcionalidad de login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Validación en tiempo real
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateLoginField(input));
            input.addEventListener('input', () => clearLoginError(input));
        });
    }
});

function validateLoginField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'email':
            if (!value) {
                errorMessage = 'El correo electrónico es obligatorio.';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Por favor, ingresa un correo electrónico válido.';
                isValid = false;
            }
            break;

        case 'password':
            if (!value) {
                errorMessage = 'La contraseña es obligatoria.';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        showLoginError(fieldName, errorMessage);
    } else {
        clearLoginError(field);
    }

    return isValid;
}

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('remember-me');
    
    let isFormValid = true;

    // Validar campos
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        if (!validateLoginField(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // Simular autenticación
        if (authenticateUser(email, password)) {
            // Guardar sesión
            const userData = {
                email: email,
                isLoggedIn: true,
                isDuocStudent: isDuocEmail(email),
                loginTime: new Date().toISOString()
            };
            
            if (rememberMe) {
                localStorage.setItem('levelUpGamerUser', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('levelUpGamerUser', JSON.stringify(userData));
            }
            
            // Mostrar mensaje de éxito
            alert(`¡Bienvenido de vuelta!\\n\\nHas iniciado sesión exitosamente.${userData.isDuocStudent ? '\\n\\n🎓 Recuerda que tienes un 20% de descuento en todos los productos.' : ''}`);
            
            // Redireccionar al perfil o página principal
            setTimeout(() => {
                window.location.href = 'perfil.html';
            }, 1500);
        } else {
            showLoginError('password', 'Credenciales incorrectas. Verifica tu email y contraseña.');
        }
    }
}

function authenticateUser(email, password) {
    // Simular base de datos de usuarios
    const validUsers = [
        { email: 'usuario@ejemplo.com', password: 'Usuario123' },
        { email: 'estudiante@duoc.cl', password: 'Duoc123' },
        { email: 'admin@levelupgamer.cl', password: 'Admin123' },
        { email: 'gamer@gmail.com', password: 'Gamer123' }
    ];
    
    return validUsers.some(user => user.email === email && user.password === password);
}

function fillDemoAccount(email, password) {
    document.getElementById('email-login').value = email;
    document.getElementById('password-login').value = password;
    
    // Limpiar errores
    clearAllLoginErrors();
    
    // Mostrar mensaje informativo
    alert('Cuenta de demostración cargada. Puedes hacer clic en "Iniciar Sesión" para continuar.');
}

function showForgotPassword() {
    const email = prompt('Ingresa tu correo electrónico para recuperar tu contraseña:');
    
    if (email) {
        if (isValidEmail(email)) {
            alert(`Se ha enviado un enlace de recuperación a ${email}.\\n\\nRevisa tu bandeja de entrada y sigue las instrucciones.\\n\\n(Esta es una simulación - en una aplicación real se enviaría un email real)`);
        } else {
            alert('Por favor, ingresa un correo electrónico válido.');
        }
    }
}

function showLoginError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearLoginError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function clearAllLoginErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Función auxiliar para validar email (reutilizada)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isDuocEmail(email) {
    return email.toLowerCase().includes('@duoc.cl');
}

