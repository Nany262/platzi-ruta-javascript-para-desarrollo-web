let mascotaEnemiga
let mascotaJugador
let ataqueJugador = ''
let ataqueEnemigo = ''
let ataquesJugadorRealizados = []
let ataquesEnemigoRealizados = []
const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionInteraccionMascota = document.getElementById('interaccion-mascota')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const seccionVerMapa = document.getElementById('ver-mapa')
const tituloInteraccion = document.getElementById('titulo-interaccion')
const mapa = document.getElementById('mapa')
const seleccionarAtaques = document.getElementById('seleccionar-ataque')
let vidasEnemigo = 3
let vidasJugador = 3
let resultado
let opcionMokepones
let opcionesAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let mokepones = []
let colision = false

class Mokepon {
  constructor(nombre, imagen, vida, x = 492, y = 434) {
    this.nombre = nombre
    this.imagen = imagen
    this.vida = vida
    this.ataques = []
    this.ancho = 120
    this.alto = 120
    this.x = x
    this.y = y
    this.imagenMokepon = new Image()
    this.imagenMokepon.src = imagen
    this.velocidadX = 0
    this.velocidadY = 0
  }

  dibujarMokepon() {
    lienzo.drawImage(
      this.imagenMokepon,
      this.x,
      this.y,
      this.ancho,
      this.alto)
  }
}

//objetos instancias
let hipodoge = new Mokepon('hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 3)
let capipepo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 3)
let ratigueya = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3)
let langostelvis = new Mokepon('langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 3)
let pydos = new Mokepon('pydos', './assets/mokepons_mokepon_pydos_attack.png', 3)
let tucapalma = new Mokepon('tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 3)

hipodoge.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-3' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
)

capipepo.ataques.push(
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-3' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua' },
)

ratigueya.ataques.push(
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-2' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-3' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
)

langostelvis.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
)

pydos.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-3' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-2' },
)

tucapalma.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
)

let hipodogeEnemigo = new Mokepon('hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 3, aleatorio(0, 607), aleatorio(0, 520))
let capipepoEnemigo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 3, aleatorio(0, 607), aleatorio(0, 520))
let ratigueyaEnemigo = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3, aleatorio(0, 607), aleatorio(0, 520))
let langostelvisEnemigo = new Mokepon('langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 3, aleatorio(0, 607), aleatorio(0, 520))
let pydosEnemigo = new Mokepon('pydos', './assets/mokepons_mokepon_pydos_attack.png', 3, aleatorio(0, 607), aleatorio(0, 520))
let tucapalmaEnemigo = new Mokepon('tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 3, aleatorio(0, 607), aleatorio(0, 520))

hipodogeEnemigo.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-3' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
)

capipepoEnemigo.ataques.push(
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-3' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua' },
)

ratigueyaEnemigo.ataques.push(
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-2' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-3' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
)

langostelvisEnemigo.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
)

pydosEnemigo.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-3' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-2' },
)

tucapalmaEnemigo.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
)


mokepones.push(hipodoge, capipepo, ratigueya, tucapalma, pydos, langostelvis)

function seleccionarMascotaJugador() {
  let botonesMokepones = []
  let mokeponSeleccionado = false
  let spanMascotaJugador = document.getElementById('mascota-jugador')
  let seccionMascota = document.getElementById('seleccionar-mascota')

  seccionInteraccionMascota.style.display = 'flex'
  tituloInteraccion.style.display = 'flex'
  seccionMascota.style.display = 'none'
  seleccionarAtaques.style.display = 'none'
  mokepones.forEach((mokepon) => {
    botonesMokepones.push(document.getElementById(mokepon.nombre))
  })

  botonesMokepones.forEach((boton) => {
    if (boton.checked) {
      spanMascotaJugador.innerHTML = boton.id[0].toUpperCase() + boton.id.substring(1)
      mokepones.forEach((mokepon) => {
        if (mokepon.nombre === boton.id) {
          mascotaJugador = mokepon
        }
      })
      mokeponSeleccionado = true
    }
  })

  if (!mokeponSeleccionado) {
    alert('No seleccionaste ninguna mascota')
    reiniciarJuego()
  }

  iniciarMapa()
  mostrarataques(mascotaJugador.ataques)
}

function dibujarCanvas() {
  let fondoMapa = new Image()
  fondoMapa.src = './assets/mokemap.webp'
  mapa.width = 820
  mapa.height = 740
  mascotaJugador.x = mascotaJugador.x + mascotaJugador.velocidadX
  mascotaJugador.y = mascotaJugador.y + mascotaJugador.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    fondoMapa,
    0,
    0,
    mapa.width,
    mapa.height
  )
  mascotaJugador.dibujarMokepon()
  hipodogeEnemigo.dibujarMokepon()
  capipepoEnemigo.dibujarMokepon()
  ratigueyaEnemigo.dibujarMokepon()
  langostelvisEnemigo.dibujarMokepon()
  pydosEnemigo.dibujarMokepon()
  tucapalmaEnemigo.dibujarMokepon()

  if (mascotaJugador.velocidadX != 0 || mascotaJugador.velocidadY != 0) {
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
    revisarColision(langostelvisEnemigo)
    revisarColision(pydosEnemigo)
    revisarColision(tucapalmaEnemigo)
  }
}

function moverMokepon(direccion) {
  if (direccion === 'derecha') {
    mascotaJugador.velocidadX = 5
  } else if (direccion === 'izquierda') {
    mascotaJugador.velocidadX = - 5
  } else if (direccion === 'arriba') {
    mascotaJugador.velocidadY = - 5
  } else if (direccion === 'abajo') {
    mascotaJugador.velocidadY = 5
  }
}

function detenerMovimiento() {
  mascotaJugador.velocidadX = 0
  mascotaJugador.velocidadY = 0
}

function iniciarMovimiento(event) {
  switch (event.key) {
    case 'ArrowUp':
      moverMokepon('arriba')
      break
    case 'ArrowDown':
      moverMokepon('abajo')
      break
    case 'ArrowLeft':
      moverMokepon('izquierda')
      break
    case 'ArrowRight':
      moverMokepon('derecha')
      break
  }
}

function mostrarataques(ataques) {
  let contenedorAtaques = document.getElementById('lista-ataques')
  ataques.forEach((ataque) => {
    botonAtaque = `<button id="${ataque.idBoton}" class="botones botones-ataque">${ataque.nombre} ${ataque.emoji}</button>`
    contenedorAtaques.innerHTML += botonAtaque
  })
}

function secuenciaAtaques() {
  let botonesAtaque = document.querySelectorAll('.botones-ataque')
  botonesAtaque.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === 'FUEGO 🔥') {
        ataqueJugador = 'FUEGO'
        ataquesJugadorRealizados.push(ataqueJugador)
        combate()
        boton.style.display = 'none'
      } else if (e.target.textContent === 'AGUA 💧') {
        ataqueJugador = 'AGUA'
        ataquesJugadorRealizados.push(ataqueJugador)
        combate()
        boton.style.display = 'none'
      } else {
        ataqueJugador = 'TIERRA'
        ataquesJugadorRealizados.push(ataqueJugador)
        combate()
        boton.style.display = 'none'
      }
    })
  })

}

function seleccionarMascotaEnemigo(enemigo) {
  let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
  mascotaEnemiga = enemigo
  spanMascotaEnemigo.innerHTML = mascotaEnemiga.nombre[0].toUpperCase() + mascotaEnemiga.nombre.substring(1)
  opcionesAtaqueEnemigo = mascotaEnemiga.ataques
  secuenciaAtaques()
}

function seleccionarAtaqueEnemigo() {
  let pos = aleatorio(0, opcionesAtaqueEnemigo.length - 1)
  ataqueEnemigo = opcionesAtaqueEnemigo[pos].nombre
  ataquesEnemigoRealizados.push(ataqueEnemigo.nombre)
  opcionesAtaqueEnemigo.splice(pos, 1)
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function crearMensaje(resultado) {
  let mensajeResultado = document.getElementById('mensaje-resultado')
  let mensajeAtaqueJugador = document.getElementById('ataque-jugador')
  let mensajeAtaqueEnemigo = document.getElementById('ataque-enemigo')

  let nuevoAtaqueJugador = document.createElement('p')
  let nuevoAtaqueEnemigo = document.createElement('p')
  if (ataquesJugadorRealizados.length === 5) {
    mensajeResultado.innerHTML = resultado
    botonReiniciar.hidden = false
  } else {
    mensajeResultado.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
  }
  mensajeAtaqueJugador.appendChild(nuevoAtaqueJugador)
  mensajeAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function combate() {
  let spanVidasJugador = document.getElementById('vidas-jugador')
  let spanVidasEnemigo = document.getElementById('vidas-enemigo')

  seleccionarAtaqueEnemigo()
  if (vidasJugador != 0 && ataquesJugadorRealizados.length != 5) {
    if (
      (ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA') ||
      (ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO') ||
      (ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA')
    ) {
      resultado = 'GANASTE 🎉'
      spanVidasEnemigo.innerHTML = --vidasEnemigo
    } else if (ataqueJugador === ataqueEnemigo) {
      resultado = 'EMPATE 😒'
    } else {
      resultado = 'PERDISTE 🥲'
      spanVidasJugador.innerHTML = --vidasJugador
    }
  }
  revisarVidas()
  crearMensaje(resultado)
}

function revisarVidas() {
  if (vidasEnemigo <= 0) {
    resultado = 'FIN DEL JUEGO - GANASTE 🥳🎉'
  } else if (vidasJugador <= 0) {
    resultado = 'FIN DEL JUEGO - PERDISTE ☠️⚰️'
  }
}

function reiniciarJuego() {
  location.reload()
}

function iniciarJuego() {
  let botonMascotaJugador = document.getElementById('boton-mascota')
  mokepones.forEach((mokepon) => {
    //template literario
    opcionMokepones = `
      <input type='radio' name='mascota' id='${mokepon.nombre}' />
      <label for='${mokepon.nombre}' class='tarjeta-mokepon'>
          <div class='circulo-mokepon'>
              <img src='${mokepon.imagen}' alt='${mokepon.nombre}' />
          </div>
          <p> ${mokepon.nombre[0].toUpperCase()}${mokepon.nombre.substring(1)}</p>
      </label>`
    contenedorTarjetas.innerHTML += opcionMokepones
  })
  seccionInteraccionMascota.style.display = 'none'
  tituloInteraccion.style.display = 'none'
  botonReiniciar.hidden = true
  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
  botonReiniciar.addEventListener('click', reiniciarJuego)
  unirseAlJuego()
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta)
      })
    }
  })
}

function iniciarMapa() {
  intervalo = setInterval(dibujarCanvas, 50)
  window.addEventListener('keydown', iniciarMovimiento)
  window.addEventListener('keyup', detenerMovimiento)
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x

  const arribaMascota = mascotaJugador.y
  const abajoMascota = mascotaJugador.y + mascotaJugador.alto
  const derechaMascota = mascotaJugador.x + mascotaJugador.ancho
  const izquierdaMascota = mascotaJugador.x

  if (!colision) {
    if (abajoMascota < arribaEnemigo ||
      arribaMascota > abajoEnemigo ||
      derechaMascota < izquierdaEnemigo ||
      izquierdaMascota > derechaEnemigo
    ) {
      return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    seleccionarAtaques.style.display = 'flex'
    seleccionarMascotaEnemigo(enemigo)
    alert(`Te has encontrado con ${enemigo.nombre}`)
    colision = true
  }

}

window.addEventListener('load', iniciarJuego)

/* Hipodoge -> Agua
Capipepo -> Tierra
Ratigueya -> Fuego
Langostelvis -> Agua y Fuego
Tucapalma -> Agua y Tierra*/
