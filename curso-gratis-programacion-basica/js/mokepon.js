let mascotaEnemiga = 0;
let mascotaJugador = '';
let ataqueJugador = '';
let ataqueEnemigo = '';
let ataquesJugadorRealizados = [];
let ataquesEnemigoRealizados = [];
const botonReiniciar = document.getElementById('boton-reiniciar');
const seccionAtaque = document.getElementById('seleccionar-ataque');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const seccionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
let vidasEnemigo = 3;
let vidasJugador = 3;
let resultado;
let opcionMokepones;
let opcionesAtaqueEnemigo;
let lienzo = mapa.getContext("2d")
let mokepones = [];

class Mokepon {
  constructor(nombre, imagen, vida) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.vida = vida;
    this.ataques = [];
    this.x = 20;
    this.y = 30;
    this.ancho = 80;
    this.alto = 80;
    this.imagenMokepon = new Image();
    this.imagenMokepon.src = imagen;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
}

//objetos instancias
let hipodoge = new Mokepon('hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 3);
let capipepo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 3);
let ratigueya = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3);
let langostelvis = new Mokepon('langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 3);
let pydos = new Mokepon('pydos', './assets/mokepons_mokepon_pydos_attack.png', 3);
let tucapalma = new Mokepon('tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 3);

hipodoge.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-3' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
);

capipepo.ataques.push(
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-3' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua' },
);

ratigueya.ataques.push(
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-2' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-3' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
);

langostelvis.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra' },
);

pydos.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-3' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-2' },
);

tucapalma.ataques.push(
  //objetos literarios
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-1' },
  { nombre: 'AGUA', emoji: '💧', idBoton: 'boton-agua-2' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
  { nombre: 'FUEGO', emoji: '🔥', idBoton: 'boton-fuego' },
  { nombre: 'TIERRA', emoji: '🌱', idBoton: 'boton-tierra-1' },
);

mokepones.push(hipodoge, capipepo, ratigueya, tucapalma, pydos, langostelvis);

function seleccionarMascotaJugador() {
  let botonesMokepones = [];
  let mokeponSeleccionado = false;
  let spanMascotaJugador = document.getElementById('mascota-jugador');
  let seccionMascota = document.getElementById('seleccionar-mascota');

  seccionAtaque.style.display = 'flex';
  seccionVerMapa.style.display = 'flex';
  seccionMascota.style.display = 'none';
  mokepones.forEach((mokepon) => {
    botonesMokepones.push(document.getElementById(mokepon.nombre))
  })

  botonesMokepones.forEach((boton) => {
    if (boton.checked) {
      spanMascotaJugador.innerHTML = boton.id[0].toUpperCase() + boton.id.substring(1);
      mascotaJugador = boton.id;
      mokeponSeleccionado = true;
    }
  })

  if (!mokeponSeleccionado) {
    alert('No seleccionaste ninguna mascota');
    reiniciarJuego();
  }
  intervalo = setInterval(dibujarMokepon, 50)
  mostrarataques(extraerAtaques(mascotaJugador))
  seleccionarMascotaEnemigo();
}

function dibujarMokepon() {
  mokepones.forEach((mokepon) => {
    if (mokepon.nombre === mascotaJugador) {
      mokepon.x = mokepon.x + mokepon.velocidadX;
      mokepon.y = mokepon.y + mokepon.velocidadY;
      lienzo.clearRect(0, 0, mapa.width, mapa.height);
      lienzo.drawImage(
        mokepon.imagenMokepon,
        mokepon.x,
        mokepon.y,
        mokepon.ancho,
        mokepon.alto);
    }
  })
}

function moverMokepon(direccion) {
  mokepones.forEach((mokepon) => {
    if (mokepon.nombre === mascotaJugador) {
      if (direccion === 'derecha') {
        mokepon.velocidadX = 5;
      } else if (direccion === 'izquierda') {
        mokepon.velocidadX = - 5;
      } else if (direccion === 'arriba') {
        mokepon.velocidadY = - 5;
      } else if (direccion === 'abajo') {
        mokepon.velocidadY = 5;
      }
    }
  })
}

function detenerMovimiento() {
  mokepones.forEach((mokepon) => {
    if (mokepon.nombre === mascotaJugador) {
      mokepon.velocidadX = 0;
      mokepon.velocidadY = 0;
    }
  })
}

function extraerAtaques(mascota) {
  let ataques;
  mokepones.forEach((mokepon) => {
    if (mokepon.nombre === mascota) {
      ataques = mokepon.ataques
    }
  })
  return ataques
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

function seleccionarMascotaEnemigo() {
  let spanMascotaEnemigo = document.getElementById('mascota-enemigo');
  mascotaEnemiga = aleatorio(0, mokepones.length - 1);
  spanMascotaEnemigo.innerHTML = mokepones[mascotaEnemiga].nombre[0].toUpperCase() + mokepones[mascotaEnemiga].nombre.substring(1);
  opcionesAtaqueEnemigo = extraerAtaques(mokepones[mascotaEnemiga].nombre);
  secuenciaAtaques()
}

function seleccionarAtaqueEnemigo() {
  let pos = aleatorio(0, opcionesAtaqueEnemigo.length - 1)
  ataqueEnemigo = opcionesAtaqueEnemigo[pos].nombre
  ataquesEnemigoRealizados.push(ataqueEnemigo);
  opcionesAtaqueEnemigo.splice(pos, 1)
  console.log("ataques enemigo", opcionesAtaqueEnemigo)

}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function crearMensaje(resultado) {
  let mensajeResultado = document.getElementById('mensaje-resultado');
  let mensajeAtaqueJugador = document.getElementById('ataque-jugador');
  let mensajeAtaqueEnemigo = document.getElementById('ataque-enemigo');

  let nuevoAtaqueJugador = document.createElement('p');
  let nuevoAtaqueEnemigo = document.createElement('p');
  if (ataquesJugadorRealizados.length === 5) {
    mensajeResultado.innerHTML = resultado;
    botonReiniciar.hidden = false;
  } else {
    mensajeResultado.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;
  }
  mensajeAtaqueJugador.appendChild(nuevoAtaqueJugador);
  mensajeAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function combate() {
  let spanVidasJugador = document.getElementById('vidas-jugador');
  let spanVidasEnemigo = document.getElementById('vidas-enemigo');

  seleccionarAtaqueEnemigo();
  if (vidasJugador != 0 && ataquesJugadorRealizados.length != 5) {
    if (
      (ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA') ||
      (ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO') ||
      (ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA')
    ) {
      resultado = 'GANASTE 🎉';
      spanVidasEnemigo.innerHTML = --vidasEnemigo;
    } else if (ataqueJugador === ataqueEnemigo) {
      resultado = 'EMPATE 😒';
    } else {
      resultado = 'PERDISTE 🥲';
      spanVidasJugador.innerHTML = --vidasJugador;
    }
  }
  revisarVidas();
  crearMensaje(resultado);
}

function revisarVidas() {
  if (vidasEnemigo <= 0) {
    resultado = 'FIN DEL JUEGO - GANASTE 🥳🎉';
  } else if (vidasJugador <= 0) {
    resultado = 'FIN DEL JUEGO - PERDISTE ☠️⚰️';
  }
}

function reiniciarJuego() {
  location.reload();
}

function iniciarJuego() {
  let botonMascotaJugador = document.getElementById('boton-mascota');
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
  seccionAtaque.style.display = 'none';
  seccionVerMapa.style.display = 'none';
  botonReiniciar.hidden = true;
  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', reiniciarJuego);
}

window.addEventListener('load', iniciarJuego);

/* Hipodoge -> Agua
Capipepo -> Tierra
Ratigueya -> Fuego
Langostelvis -> Agua y Fuego
Tucapalma -> Agua y Tierra*/
