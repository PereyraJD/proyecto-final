const insertarElementos = (movie) => {

document.getElementById("title").textContent = movie.titulo;
document.getElementById("synopsis").textContent = movie.sinopsis;
document.getElementById("genre").textContent = `Género: ${movie.genero}`;
document.getElementById("duration").textContent = `Duración: ${movie.duracion}`;
document.getElementById(
  "rating"
).textContent = `Clasificación por edad: ${movie.clasificacion_por_edad}`;
document.getElementById("cast").textContent = `Elenco: ${movie.elenco.join(
  ", "
)}`;
document.getElementById("director").textContent = `Director: ${movie.director}`;
document.getElementById(
  "year"
).textContent = `Año de lanzamiento: ${movie.año_de_lanzamiento}`;
document.getElementById("poster").src = movie.portada;
document.getElementById("trailer").href = movie.trailer;
}

let trailer = ''

const obtenerDatos = async () => { 
  const url = "http://localhost:3000/movies/66a16a66f8d3ab06537c865d";
  const response = await fetch(url);
  const movie = await response.json();
  console.log(movie);
  insertarElementos(movie)
  trailer = await movie.trailer
};

obtenerDatos();
console.log(trailer);

