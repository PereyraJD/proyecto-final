document.addEventListener('DOMContentLoaded', () => {
  obtenerPortadas();  // Corrección: Mover las llamadas de función a 'DOMContentLoaded'
  obtenerDatos();     // Corrección: Mover las llamadas de función a 'DOMContentLoaded'
});

const contenedorPrincipal = document.getElementById('contenedor-principal')




const obtenerPortadas = async () => {
  const response = await fetch('http://localhost:3000/movies')
  const data = await response.json()
  let detallesPelicula = document.querySelector('.datos-peliculas')

  let sliderInner = document.querySelector('.slider-inner')

  data.forEach((elemento) => {
    sliderInner.innerHTML += `
      <img src="${elemento.banner}" alt="Banner de ${elemento.titulo}" data-detalles="${JSON.stringify(elemento)}">
    `
  })

  generarSlider(sliderInner, detallesPelicula, data)
}

const generarDetalles = (contenedor, pelicula) => {
  if (!pelicula) {
    contenedor.innerHTML = '<p>Detalles no disponibles</p>'
    return
  }
  contenedor.innerHTML = `
    <p><strong>Titulo:</strong> ${pelicula.titulo}</p>
    <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
    <p><strong>Categoría:</strong> ${pelicula.categoria}</p>
    <p><strong>Elenco:</strong> ${pelicula.elenco}</p>
  `
}

//Con esto buscamos todas las imagenes dentro de sliderInner
const generarSlider = (sliderInner, detallesPelicula, data) => {
  let images = sliderInner.querySelectorAll('img')
  let index = 0

  const updateDetails = (index => {
    generarDetalles(detallesPelicula, data[index]);
  })

  setInterval(function () {

    let percentage = index * -100
    sliderInner.style.transform = 'translateX(' + percentage + '%)'
    updateDetails(index)
    index++
    if (index == images.length) {
      index = 0
      return
    }
  }, 5000)
}

// obtenerPortadas()

//*-------------- Sección categorias --------------
const obtenerDatos = async () => {
  let categorias = ['crimen', 'comedia', 'accion', 'documentales', 'aventura']
  let categoriasSecciones = document.querySelector('.categorias-secciones')

  categoriasSecciones.innerHTML = ''

  for (const elemento of categorias) {
    const url = `http://localhost:3000/movies/category/${elemento}`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      generarCategorias(categoriasSecciones, elemento, data);
    } catch (error) {
      console.error('Hubo un problema con la solicitud Fetch:', error);
    }
  }
}

const generarCategorias = (contenedor, categoria, peliculas) => {
  // Construye el HTML para la categoría
  let contenido = `
    <div id="${categoria}-peliculas" class="div-categorias">
      <h2>${categoria}</h2>
      <div class="categoria-imagenes">`;

  // Agrega las imágenes al contenido HTML
  peliculas.forEach(pelicula => {
    contenido += `<a href="detalles.html?id=${pelicula._id}">
      <img src="${pelicula.portada}" alt="Portada de ${pelicula.titulo}">
      </a>`;
  });

  contenido += `
      </div>
    </div>`;

  // Asigna el HTML al contenedor
  contenedor.innerHTML += contenido;
};











const capturarCategorias = (data) => {
  let categorias = []
  data.forEach((element) => {
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

