const currentUrl = window.location.href;
const url = new URL(currentUrl);
const queryParams = url.searchParams;
const idPelicula = queryParams.get('id')

const capitalizeFunction = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

const insertarElementos = (movie) => {
document.getElementById("title").textContent = movie.titulo
document.getElementById("synopsis").textContent = movie.sinopsis
document.getElementById("category").textContent = `Categoría: ${capitalizeFunction(movie.categoria)}`
document.getElementById("duration").textContent = `Duración: ${movie.duracion}`
document.getElementById("rating").textContent = `Clasificación por edad: ${movie.clasificacion_por_edad}`
document.getElementById("cast").textContent = `Elenco: ${movie.elenco.join( ", ")}`
document.getElementById("director").textContent = `Director: ${movie.director}`
document.getElementById("year").textContent = `Año de lanzamiento: ${movie.año_de_lanzamiento}`
document.getElementById("poster").src = movie.portada
document.getElementById("trailer").src = movie.trailer

traerPeliculasRecomendadas(movie.categoria);
}

const traerPeliculasRecomendadas = async (categoria) => {
  const url = `http://localhost:3000/movies/category/${categoria}`;
  const response = await fetch(url);
  const movies = await response.json();
  console.log('Películas recomendadas:', movies);
  mostrarPeliculasRecomendadas(movies);
};

const mostrarPeliculasRecomendadas = (movies) => {
  const recommendedMoviesList = document.querySelector('.movie-list');
  recommendedMoviesList.innerHTML = ''; 

  movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item';
      movieItem.innerHTML = `
          <img src="${movie.portada}" alt="Portada de la película recomendada">
          <p>${movie.titulo}</p>
          <p>${movie.sinopsis}</p>
      `;
      movieItem.addEventListener('click', () => {
          window.location.href = `detalles.html?id=${movie._id}`; 
      });
      recommendedMoviesList.appendChild(movieItem);
  });
};

const obtenerDatos = async () => { 
  // const url = "http://localhost:3000/movies/66a16a66f8d3ab06537c865d"
  const url = `http://localhost:3000/movies/${idPelicula}`
  const response = await fetch(url)
  const movie = await response.json()
  console.log(movie)
  insertarElementos(movie)
};

obtenerDatos();

