// Main JavaScript file for Level-Up Gamer

document.addEventListener('DOMContentLoaded', () => {
    console.log('Level-Up Gamer website loaded!');


    const registrationForm = document.querySelector('#registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const ageInput = registrationForm.querySelector('#age');
            if (ageInput && parseInt(ageInput.value) < 18) {
                alert('Debes ser mayor de 18 años para registrarte.');
            } else {
                alert('Registro exitoso!');
                registrationForm.submit();
            }
        });
    }
});


