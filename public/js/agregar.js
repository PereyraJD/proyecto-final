async function submitForm(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const form = event.target;
    const action = form.getAttribute('action'); // Obtiene la URL del atributo 'action'
    const method = form.getAttribute('method'); // Obtiene el método HTTP del atributo 'method'

    // Recoge los datos del formulario
    const data = new FormData(form);
    const requestData = Object.fromEntries(data);

    if (Object.keys(requestData).length > 2) {
        alert('Registro exitoso')
    }

    try {
        // Realiza la solicitud HTTP
        const response = await fetch(action, {
            method: method,
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        document.getElementById('result').innerText = JSON.stringify(result, null, 2); // Muestra el resultado
    } catch (error) {
        document.getElementById('result').innerText = 'Error: ' + error.message; // Muestra el error
    }
}

// Añade eventos de envío a los formularios
//   document.getElementById('login-form').addEventListener('submit', submitForm);
document.getElementById('movies-form').addEventListener('submit', submitForm);