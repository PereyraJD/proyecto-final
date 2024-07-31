const obtenerPortadas = async () => {
  const response = await fetch('http://localhost:3000/movies')
  const data = await response.json()

  let sliderInner = document.querySelector('.slider-inner')

  sliderInner.innerHTML = ''
  data.forEach((elemento) => {
    sliderInner.innerHTML += `
      <img src="${elemento.portada}" alt="Portada de ${elemento.titulo}">
    `
  })

  sliderInner.style.width = `${data.length * 100}%`

  generarSlider(sliderInner, data.length)
}

//Con esto buscamos todas las imagenes dentro de sliderInner
const generarSlider = (sliderInner, numImages) => {
  // let images = sliderInner.querySelectorAll('img')
  let index = 0
  
  setInterval(function () {
    let percentage = (index * -100) / numImages
    sliderInner.style.transform = 'translateX(' + percentage + '%)'
    console.log(index)
    index++
    if (index >= numImages) {
      index = 0
    }
  }, 2000)
}

obtenerPortadas()