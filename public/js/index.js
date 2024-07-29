const contenedorPrincipal = document.getElementById('contenedor-principal')

const obtenerDatos = async () => {
  const url = 'http://localhost:3000/movies/'

  const response = await fetch(url)
  const data = await response.json()
  
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

  console.log(uniqueCategories)

  const portada = data[4].portada
  const trailer = 
  mostrarElementos(portada, trailer)
  return data
}

obtenerDatos()

const mostrarElementos = (portada, trailer) => {
  contenedorPrincipal.innerHTML = `
    <img src="${portada}" alt="" style="width: 300px;">
    <iframe width="560" height="315" src="${trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `
}