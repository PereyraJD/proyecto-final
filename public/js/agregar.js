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
async function fetchmovies() {
    try {
        const response = await fetch('http://localhost:3000/movies/');
        const movies = await response.json();

        const tableBody = document.querySelector('#tabla #datos');
        const contador = document.querySelector('#contador');
        contador.innerText= `Peliculas registradas (${movies.length})`
        tableBody.innerHTML = ''; // Limpia la tabla antes de agregar nuevas filas

        movies.forEach(movie => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = movie._id;
            idCell.style.display = 'none'
            row.appendChild(idCell);


            const tituloCell = document.createElement('td');
            tituloCell.textContent = letrasMayusculas(movie.titulo);
            row.appendChild(tituloCell);

            
            const generoCell = document.createElement('td');
            generoCell.textContent = letrasMayusculas(movie.categoria)
            row.appendChild(generoCell);

            const añoCell = document.createElement('td');
            añoCell.textContent = movie.año_de_lanzamiento;
            row.appendChild(añoCell);

            const calificacionPorEdadCell = document.createElement('td');
            calificacionPorEdadCell.textContent = movie.clasificacion_por_edad;
            row.appendChild(calificacionPorEdadCell);


            // Celda para los botones
            const actionsCell = document.createElement('td');

            // Crear botón de editar
            const editLink = document.createElement('a');
            editLink.textContent = 'Editar';
            editLink.href = '#'; // Puedes cambiar esto a la URL correspondiente si es necesario
            editLink.className = 'btn btn-edit';
            editLink.onclick = () => editmovie(movie._id); // Asume que cada movie tiene un _id único
            actionsCell.appendChild(editLink);
            // Crear botón de eliminar
            const deleteLink = document.createElement('a');
            deleteLink.textContent = 'Eliminar';
            deleteLink.href = '#'; // Puedes cambiar esto a la URL correspondiente si es necesario
            deleteLink.className = 'btn btn-delete';
            deleteLink.onclick = () => deletemovie(movie._id);
            actionsCell.appendChild(deleteLink);

            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}
function letrasMayusculas(string) {
    return string.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }


window.onload = fetchmovies;
document.getElementById('movies-form').addEventListener('submit', submitForm);