const obtenerPortadas = async () => {
  const response = await fetch('http://localhost:3000/movies')
  const data = await response.json()
  let sliderInner = document.querySelector('.slider-inner')

  // sliderInner.innerHTML = ''
  data.forEach((elemento) => {
    sliderInner.innerHTML += `
      <img src="${elemento.portada}" alt="Portada de ${elemento.titulo}">
    `
    console.log(elemento.titulo)
  })

  generarSlider(sliderInner)
}

//Con esto buscamos todas las imagenes dentro de sliderInner
const generarSlider = (sliderInner) => {
  let images = sliderInner.querySelectorAll('img')
  let index = 0
  
  setInterval(function () {
    let percentage = index * -56
    sliderInner.style.transform = 'translateX(' + percentage + '%)'
    index++
    if (index >= images.length) {
      index = 0
    }
  }, 2000)
}

obtenerPortadas()