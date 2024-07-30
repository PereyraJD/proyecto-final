const contenedorPrincipal = document.getElementById('contenedor-principal')

const obtenerDatos = async () => {
  const url = 'http://localhost:3000/movies/'

  const response = await fetch(url)
  const data = await response.json()

  data.forEach((elemento) => {
    generarRecomendaciones(elemento)
    console.log(elemento.titulo)
  })
  // const portada = data[10].portada
  // const titulo = data[10].titulo
  // mostrarElementos(portada, titulo)

  return data
}
obtenerDatos()

const recomendacionesTarjetas = document.getElementById('recomendaciones-tarjetas')
const generarRecomendaciones = (pelicula) => {
  recomendacionesTarjetas.innerHTML += `
    <div class="recomendaciones-peliculas">
      <img src="${pelicula.portada}" alt="">
      <div class="recomendaciones-detalles">
        <p class="pelicula-titulo">${pelicula.titulo}</p>
        <p>${pelicula.duracion}</p>
      </div>
    </div>
  `
}

const capturarCategorias = (data) => {
  let categorias = []
  data.forEach((element, index) => {
    categorias.push(element.categoria)
  })

  const uniqueCategories = categorias.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      accumulator.push(currentValue)
    }
    return accumulator
  }, [])
  return uniqueCategories
}

const mostrarElementos = (portada, trailer) => {
  contenedorPrincipal.innerHTML = `
    <img src="${portada}" alt="" style="width: 300px;">
    <div id="player">
      <iframe width="560" height="315" src="${trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  `
}