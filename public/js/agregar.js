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
        contador.innerText = `Peliculas registradas (${movies.length})`
        tableBody.innerHTML = ''; // Limpia la tabla antes de agregar nuevas filas

        movies.forEach(movie => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = movie._id;
            idCell.style.display = 'none'
            row.appendChild(idCell);

            const portadaCell = document.createElement('td');
            portadaCell.innerHTML = `<img class="tabla-portadas" src="${movie.portada}">`;
            row.appendChild(portadaCell);

            const tituloCell = document.createElement('td');
            tituloCell.textContent = letrasMayusculas(movie.titulo);
            row.appendChild(tituloCell);


            const categoriaCell = document.createElement('td');
            categoriaCell.textContent = letrasMayusculas(movie.categoria)
            row.appendChild(categoriaCell);

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
            editLink.href = '#movies-form'; // Puedes cambiar esto a la URL correspondiente si es necesario
            editLink.className = 'btn btn-edit';
            editLink.onclick = () => {
                editarMovie(movie)
            }; // Asume que cada movie tiene un _id único
            actionsCell.appendChild(editLink);
            // Crear botón de eliminar
            const deleteLink = document.createElement('a');
            deleteLink.textContent = 'Eliminar';
            deleteLink.href = 'http://localhost:3000/'; // Puedes cambiar esto a la URL correspondiente si es necesario
            deleteLink.className = 'btn btn-delete';
            deleteLink.onclick = (e) => {
                e.preventDefault()
                deleteMovie(movie._id)
            }

            actionsCell.appendChild(deleteLink);

            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        })
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

const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`

    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        await fetch(url, options)
        window.location.reload();

    }
    catch (error) {
        console.log(error)
    }
}



const editarMovie = async (movie) => {
    const categoria = document.getElementById('categoria')
    const titulo = document.getElementById('titulo')
    const sinopsis = document.getElementById('sinopsis')
    const duracion = document.getElementById('duracion')
    const clasificacion_por_edad = document.getElementById('clasificacion_por_edad')
    const elenco = document.getElementById('elenco')
    const director = document.getElementById('director')
    const año_de_lanzamiento = document.getElementById('año_de_lanzamiento')
    const trailer = document.getElementById('trailer')
    const portada = document.getElementById('portada')
    const banner = document.getElementById('banner')

    categoria.value = movie.categoria
    titulo.value = movie.titulo
    sinopsis.value = movie.sinopsis
    console.log(movie)
    duracion.value = movie.duracion
    clasificacion_por_edad.value = movie.clasificacion_por_edad
    elenco.value = movie.elenco
    director.value = movie.director
    año_de_lanzamiento.value = movie.año_de_lanzamiento
    trailer.value = movie.trailer
    portada.value = movie.portada
    banner.value = movie.banner

    console.log('klk franci \n' + movie._id)
}