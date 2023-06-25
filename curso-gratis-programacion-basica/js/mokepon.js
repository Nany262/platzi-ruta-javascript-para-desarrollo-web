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
let mokeponesEnemigos = []
let colision = false
let jugadorId = null

class Mokepon {
  constructor(nombre, imagen, vida, id = null) {
    this.nombre = nombre
    this.imagen = imagen
    this.vida = vida
    this.ataques = []
    this.ancho = 120
    this.alto = 120
    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.width - this.alto)
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
  //Objetos literales - Objetos que declaran sus propiedades de manera explícita
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
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
)

pydos.ataques.push(
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-3' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-2' },
)

// Otras formas de asignar la lista al push*--------------

const TucapalmaAtaques = [
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
]

tucapalma.ataques.push(...TucapalmaAtaques) // Los 3 puntos envian los valores y no la lista
//----------------------------------------------------------- 
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

  seleccionarMokepon(mascotaJugador)
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
  enviarPosicion(mascotaJugador)
  mokeponesEnemigos.forEach(function (mokepon){
    mokepon.dibujarMokepon()
  })

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

function unirseAlJuego() {
  fetch(`http://localhost:8080/unirse`).then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta)
        jugadorId = respuesta
      })
    }
  })
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mokepon: mascotaJugador.nombre })
    }
  )
}

function enviarPosicion(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        x: mascotaJugador.x,
        y: mascotaJugador.y
      })
    }
  ).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) { //Extrae la respuesta 
        mokeponesEnemigos = enemigos.map(function (enemigo) {
          let mokeponEnemigo = null
          const mokeponEnemigoNombre = enemigo.mokepon.nombre || ""
          switch (mokeponEnemigoNombre) {
            case 'hipodoge':
              mokeponEnemigo = new Mokepon('hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 3)
              break;
            case 'capipepo':
              mokeponEnemigo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 3)
              break;
            case 'ratigueya':
              mokeponEnemigo = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3)
              break;
            case 'langostelvis':
              mokeponEnemigo = new Mokepon('langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 3)
              break;
            case 'pydos':
              mokeponEnemigo = new Mokepon('pydos', './assets/mokepons_mokepon_pydos_attack.png', 3)
              break;
            case 'tucapalma':
              mokeponEnemigo = new Mokepon('tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 3)
              break;
          }

          mokeponEnemigo.x = enemigo.x
          mokeponEnemigo.y = enemigo.y
          return mokeponEnemigo
        })
      })
    }
  })
}