document.addEventListener('DOMContentLoaded', () => {
    fetch('/random-movie')
        .then(response => response.json())
        .then(movie => {
            // Actualiza detalles de la película
            document.getElementById('title').textContent = movie.titulo;
            document.getElementById('synopsis').textContent = movie.sinopsis;
            document.getElementById('genre').textContent = `Género: ${movie.genero}`;
            document.getElementById('duration').textContent = `Duración: ${movie.duracion}`;
            document.getElementById('rating').textContent = `Clasificación por edad: ${movie.clasificacion_por_edad}`;
            document.getElementById('cast').textContent = `Elenco: ${movie.elenco.join(', ')}`;
            document.getElementById('director').textContent = `Director: ${movie.director}`;
            document.getElementById('year').textContent = `Año de lanzamiento: ${movie.año_de_lanzamiento}`;
            document.getElementById('poster').src = movie.portada;
            document.getElementById('trailer').href = movie.trailer;

            // Actualiza el contenedor del tráiler
            const trailerContainer = document.getElementById('trailer-container');
            const trailerVideo = document.getElementById('trailer-video');
            const youtubeLink = document.getElementById('youtube-link');

            if (movie.trailer) {
                trailerVideo.src = movie.trailer.replace('watch?v=', 'embed/');
                youtubeLink.href = movie.trailer;
            } else {
                trailerContainer.innerHTML = '<p>Tráiler no disponible</p>';
                youtubeLink.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching movie data:', error));
});

