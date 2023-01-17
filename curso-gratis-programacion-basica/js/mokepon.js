
let mascotaEnemiga = 0
let mascotaJugador = 0
let ataqueJugador = ''
let ataqueEnemigo = ''
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionAtaque = document.getElementById('seleccionar-ataque')
let vidasEnemigo = 3
let vidasJugador = 3
let resultado
let final

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge') // id=1
    let inputCapipepo = document.getElementById('capipepo') // id=2
    let inputRatigueya = document.getElementById('ratigueya') // id=3
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    let seccionMascota = document.getElementById('seleccionar-mascota')

    seccionMascota.style.display = 'none'
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge"
        mascotaJugador = 1
        /* botonFuego.hidden = true
         botonTierra.hidden = true
         botonAgua.hidden = false*/
        seccionAtaque.style.display = 'flex'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
        mascotaJugador = 2
        /* botonFuego.hidden = true
         botonAgua.hidden = true
         botonTierra.hidden = false*/
        seccionAtaque.style.display = 'flex'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
        mascotaJugador = 3
        /* botonAgua.hidden = true
         botonTierra.hidden = true
         botonFuego.hidden = false*/
        seccionAtaque.style.display = 'flex'
    } else {
        alert("No seleccionaste ninguna mascota")
        reiniciarJuego()
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    mascotaEnemiga = aleatorio(1, 3)
    while (mascotaEnemiga === mascotaJugador) {
        mascotaEnemiga = aleatorio(1, 3)
    }
    if (mascotaEnemiga === 1) {
        spanMascotaEnemigo.innerHTML = "Hipodoge"
        ataqueEnemigo = "AGUA"
    } else if (mascotaEnemiga === 2) {
        spanMascotaEnemigo.innerHTML = "Capipepo"
        ataqueEnemigo = "TIERRA"
    } else if (mascotaEnemiga === 3) {
        spanMascotaEnemigo.innerHTML = "Ratigueya"
        ataqueEnemigo = "FUEGO"
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueFuego() {
    ataqueJugador = "FUEGO"
    combate()
}

function ataqueAgua() {
    ataqueJugador = "AGUA"
    combate()
}

function ataqueTierra() {
    ataqueJugador = "TIERRA"
    combate()
}

function crearMensaje(resultado, final) {
    let mensajeResultado = document.getElementById('mensaje-resultado')
    let mensajeAtaqueJugador = document.getElementById('ataque-jugador')
    let mensajeAtaqueEnemigo = document.getElementById('ataque-enemigo')

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    if (final) {
        botonAgua.disabled = true
        botonFuego.disabled = true
        botonTierra.disabled = true
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

    if (vidasJugador != 0 && !final) {
        if (ataqueJugador === 'FUEGO' && ataqueEnemigo === 'TIERRA' ||
            ataqueJugador === 'AGUA' && ataqueEnemigo === 'FUEGO' ||
            ataqueJugador === 'TIERRA' && ataqueEnemigo === 'AGUA') {
            resultado = 'GANASTE 🎉'
            spanVidasEnemigo.innerHTML = --vidasEnemigo
        } if (ataqueJugador === ataqueEnemigo) {
            resultado = 'EMPATE 😒'
        } else {
            resultado = 'PERDISTE 🥲'
            spanVidasJugador.innerHTML = --vidasJugador
        }
    }
    revisarVidas()
    crearMensaje(resultado, final)
}

function revisarVidas() {
    if (vidasEnemigo <= 0) {
        resultado = 'FIN DEL JUEGO - GANASTE 🥳🎉'
        final = true
    } else if (vidasJugador <= 0) {
        resultado = 'FIN DEL JUEGO - PERDISTE ☠️⚰️'
        final = true
    }
}

function reiniciarJuego() {
    location.reload()
}


function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota')

    seccionAtaque.style.display = 'none'
    botonReiniciar.hidden = true
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

window.addEventListener('load', iniciarJuego)

/* Hipodoge -> Agua
Capipepo -> Tierra
Ratigueya -> Fuego
Langostelvis -> Agua y Fuego
Tucapalma -> Agua y Tierra*/