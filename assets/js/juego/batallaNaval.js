//                                   )___(
//                            _______/__/_
//                   ___     /===========|   ___
//  ____       __   [\\\]___/____________|__[///]   __
//  \   \_____[\\]__/___________________________\__[//]___
//   \                                                    |
//    \               B A T A L L A  N A V A L           /
//     \________________________________________________/
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                  García Nahuelanca Aín Lautaro
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Jugadores
const dimensionTablero = 16;
var jugador1;
var jugador2 = new Jugador("pc", new Tablero(dimensionTablero));

// Partida
var partidaIniciada = false;
var tiempoInicioPartida;
var tiempoFinPartida;
var duracionPartida;

// Sonidos
var soundAcierto = new Howl({
  src: ["./assets/sounds/acierto.mp3"],
  volume: 0.6,
});

var soundAgua = new Howl({
  src: ["./assets/sounds/agua.mp3"],
  volume: 0.6,
});

// colores embarcaciones
const bgDanger = "bg-danger";
const bgInfo = "bg-info";
const bgSuccess = "bg-success";

// acorazado
var acorazadoColor = bgDanger;
const cantMinAcorazados = 1;
const cantMaxAcorazados = 3;

// destructror
var destructorColor = bgSuccess;
const cantMinDestructores = 2;
const cantMaxDestructores = 4;

// submarino
var submarinoColor = bgInfo;
const cantMinSubmarinos = 3;
const cantMaxSubmarinos = 5;

var embarcaciones = {
  "acorazado-vertical": new Embarcacion(
    "acorazado",
    "vertical",
    3,
    acorazadoColor
  ),
  "acorazado-horizontal": new Embarcacion(
    "acorazado",
    "horizontal",
    3,
    acorazadoColor
  ),
  "destructor-vertical": new Embarcacion(
    "destructor",
    "vertical",
    2,
    destructorColor
  ),
  "destructor-horizontal": new Embarcacion(
    "destructor",
    "horizontal",
    2,
    destructorColor
  ),
  submarino: new Embarcacion("submarino", "punto", 1, submarinoColor),
};

// --------------------------------------------------INCIO DE FUNCIONES-------------------------------------------------- //

// funcion que imprime los tableros de los jugadores en pantalla
function mostrarTablero() {
  jugador1 = new Jugador(
    document.getElementById("name").value,
    new Tablero(dimensionTablero)
  );

  jugador1.mostrarTablero();
  jugador2.mostrarTablero();

  // Cargo la cantidad de embarcaciones disponibles
  setearEmbarcacionesDisponibles();
}

// funcion utilizada para setear la cantidad disponibles de embarcaciones
function setearEmbarcacionesDisponibles() {
  document.getElementById("cant-acorazado").value = cantMaxAcorazados;
  document.getElementById("cant-destructor").value = cantMaxDestructores;
  document.getElementById("cant-submarino").value = cantMaxSubmarinos;
}

// funcion para seleccionar las embarcaciones
function seleccionarEmbarcacion(value) {
  jugador1.seleccionarEmbarcacion(embarcaciones[value]);
  // bloquea la orientacion de la embarcacion no seleccionada
  bloquearEmbarcacion(value);

  $("#btn-personalizacion").addClass("disabled");
}

// funcion que va reduciendo la cantidad de embarcaciones disponibles segun se van utilizando
function reducirEmbarcacionDisponible(tipoEmbarcacion) {
  document.getElementById("cant-" + tipoEmbarcacion).value--;
}

// funcion utilizada para bloquear la embarcacion con la orientacion no seleccionada
function bloquearEmbarcacion(embarcacionSeleccionada) {
  var confirmar;
  var mensaje = "Solo podra elegir una orientacion para esta embarcacion\n¿Desea continuar?";

  switch (embarcacionSeleccionada) {
    case "acorazado-vertical":
      if (!document.querySelector("#acorazado-horizontal.disabled")) {
        confirmar = confirm(mensaje);
        if (confirmar) {
          $("#acorazado-horizontal").addClass("disabled");
        }
      }
      break;
    case "acorazado-horizontal":
      if (!document.querySelector("#acorazado-vertical.disabled")) {
        confirmar = confirm(mensaje);
        if (confirmar) {
          $("#acorazado-vertical").addClass("disabled");
        }
      }
      break;
    case "destructor-vertical":
      if (!document.querySelector("#destructor-horizontal.disabled")) {
        confirmar = confirm(mensaje);
        if (confirmar) {
          $("#destructor-horizontal").addClass("disabled");
        }
      }
      break;
    case "destructor-horizontal":
      if (!document.querySelector("#destructor-vertical.disabled")) {
        confirmar = confirm(mensaje);
        if (confirmar) {
          $("#destructor-vertical").addClass("disabled");
        }
      }
      break;
    default:
      break;
  }
}

function iniciarJuego() {
  if (verificarRequisitosInicio()) {
    alert("¡Que comience el juego!");

    tiempoInicioPartida = new Date(); // almaceno la hora de inicio del juego

    $("#btn-iniciarPartida").addClass("disabled"); // deshabilito botones

    $("#btn-abandonar").removeClass("disabled"); // habilito boton abandonar partida

    $("#dialogoTurno").removeClass("d-none"); // muestro el dialogo de turno

    partidaIniciada = true; // ponemos en "on" el flag que indica que la partida esta iniciada

    cargarEmbarcacionesPC(); // se cargan las embarcaciones en el tablero de la pc

    // bloqueo los botones donde se seleccionan mas barcos para que no se puedan agregar durante la partida
    $(".btn-seleccion-embarcacion").addClass("disabled");

    // eliminamos el onclick de la tabla de juego
    for (let i = 0; i < dimensionTablero; i++) {
      for (let j = 0; j < dimensionTablero; j++) {
        document
          .getElementById(i + ";" + j + ":" + jugador1.nombre)
          .removeAttribute("onclick");
      }
    }
  } else {
    alert(
      "No cumple los requisitos min para iniciar la partida\n\nRequisitos Minimos:\n1 Acorazado\n2 Destructores\n3 Submarinos"
    );
  }
}

// funcion que verifica que se cumplen los requisitos minima para iniciar la partida
function verificarRequisitosInicio() {
  cantAcorazadosUtilizados = cantMaxAcorazados - document.getElementById("cant-acorazado").value;
  cantDestructoresUtilizados = cantMaxDestructores - document.getElementById("cant-destructor").value;
  cantSubmarinosUtilizados = cantMaxSubmarinos - document.getElementById("cant-submarino").value;

  if ((cantAcorazadosUtilizados >= cantMinAcorazados) &
    (cantDestructoresUtilizados >= cantMinDestructores) &
    (cantSubmarinosUtilizados >= cantMinSubmarinos)) {
    return true;
  } else {
    return false;
  }
}

// funcion para abandonar la partida
function abandonarJuego() {
  abandonar = confirm(
    "Si abandona la partida se dara como perdida\n¿Desea continuar?"
  );
  if (abandonar) {
    finalizarPartida(false);
  }
}

// funcion para cargar las embarcaciones de la pc
function cargarEmbarcacionesPC() {
  var x, y;

  // num aleatorio entre 1 y 15 "Math.floor(Math.random() * 15) + 1"
  // se utilizara para insertar cada elemento en una posicion aleatoria en la matriz de la pc

  jugador1.embarques.forEach((embarque) => {
    x = Math.floor(Math.random() * 15) + 1;
    y = Math.floor(Math.random() * 15) + 1;

    // se crea una nueva entidad con los valores indicados
    jugador2.seleccionarEmbarcacion(embarque);

    // se inserta la embarcacion en el tablero de la pc
    jugador2.insertarEmbarcacion(x, y);
  });
}

// Funcion para el cambio de turno
async function toggleTurno() {
  // por defecto empieza el usuario
  // por lo que el primer acceso a la funcion realiza el cambio de turno del usuario a la pc
  if (document.getElementById("turnoDe").value == jugador1.nombre) {
    document.getElementById("turnoDe").value = "pc";
    await sleep(700);

    // se realiza el ataque al tablero del jugador en coord aleatorias
    jugador2.atacar(
      jugador1,
      Math.floor(Math.random() * 15) + 1,
      Math.floor(Math.random() * 15) + 1
    );
  } else {
    // si el turno lo tenia la pc se vuelve al usuario
    document.getElementById("turnoDe").value = jugador1.nombre;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// funcion para verificar si el tablero esta vacio
function verificarTablero(tablero) {

  var cantEspaciosVacios = 0; // acumulador

  var tableroVacio = dimensionTablero * dimensionTablero - 1; // valor total del tablero

  var partidaGanada; // flag que indica si la partida se gano o no

  for (let i = 0; i < dimensionTablero; i++) {
    for (let j = 0; j < dimensionTablero; j++) {
      if ((tablero[i][j] == null) || (tablero[i][j] == "acierto") || (tablero[i][j] == "agua")) {
        cantEspaciosVacios++;
      }
    }
  }

  // si la cantidad de espacios vacios es igual a la dimencion total del tablero
  // significa que ya no hay embarcaciones en el tablero indicado
  if (cantEspaciosVacios == tableroVacio) {
    // si dicho tablero es el de la pc, indica que el jugador gano la partida
    if (tablero == jugador1.tablero.tablero) {
      // si dicho tablero es el del jugador, indica que la pc gano la partida
      partidaGanada = false;
      finalizarPartida(partidaGanada);
    } else {
      partidaGanada = true;
      finalizarPartida(partidaGanada);
    }
  }
}

// funcion que finaliza la partida
function finalizarPartida(partidaGanada) {
  var titulo = document.getElementById("tituloModalFinJuego");

  if (partidaGanada) {
    // almaceno la hora de fin del juego
    tiempoFinPartida = new Date();
    duracionPartida =
      (tiempoFinPartida.getHours() - tiempoInicioPartida.getHours()) +
      ":" +
      (tiempoFinPartida.getUTCMinutes() - tiempoInicioPartida.getUTCMinutes()) +
      ":" +
      (tiempoFinPartida.getUTCSeconds() - tiempoInicioPartida.getUTCSeconds());

    titulo.innerHTML = "¡Felicidades Ganaste!";
    subirPartida();
  } else {
    titulo.innerHTML = "¡Ohh Perdiste!";
  }

  obtenerRecords();
  $("#finalizarPartida").modal("show"); // abre el modal
}

// funcion para personalizar las embarcaciones
function personalizarEmbarcaciones() {
  var acorazadoColor = document.getElementsByName("acorazado-color");
  var acorazadoVertical = document.getElementById("acorazado-vertical");
  var acorazadoHorizontal = document.getElementById("acorazado-horizontal");

  var destructorColor = document.getElementsByName("destructor-color");
  var destructorVertical = document.getElementById("destructor-vertical");
  var destructorHorizontal = document.getElementById("destructor-horizontal");

  var submarinoColor = document.getElementsByName("submarino-color");
  var submarino = document.getElementById("submarino");

  // color acorazados
  acorazadoVertical.classList.remove("btn-danger", "btn-success", "btn-info");
  acorazadoHorizontal.classList.remove("btn-danger", "btn-success", "btn-info");
  for (var i = 0; i < acorazadoColor.length; i++) {
    if (acorazadoColor[i].checked) {
      acorazadoVertical.classList.add("btn-" + acorazadoColor[i].value);
      acorazadoHorizontal.classList.add("btn-" + acorazadoColor[i].value);
      embarcaciones["acorazado-vertical"].bgColor =
        "bg-" + acorazadoColor[i].value;
      embarcaciones["acorazado-horizontal"].bgColor =
        "bg-" + acorazadoColor[i].value;
    }
  }

  // color destructores
  destructorVertical.classList.remove("btn-danger", "btn-success", "btn-info");
  destructorHorizontal.classList.remove(
    "btn-danger",
    "btn-success",
    "btn-info"
  );
  for (var i = 0; i < destructorColor.length; i++) {
    if (destructorColor[i].checked) {
      destructorVertical.classList.add("btn-" + destructorColor[i].value);
      destructorHorizontal.classList.add("btn-" + destructorColor[i].value);

      embarcaciones["destructor-horizontal"].bgColor = "bg-" + submarinoColor[i].value;
      embarcaciones["destructor-vertical"].bgColor = "bg-" + destructorColor[i].value;
    }
  }

  // color submarino
  submarino.classList.remove("btn-danger", "btn-success", "btn-info");
  for (var i = 0; i < submarinoColor.length; i++) {
    if (submarinoColor[i].checked) {
      submarino.classList.add("btn-" + submarinoColor[i].value);
      embarcaciones["submarino"].bgColor = "bg-" + submarinoColor[i].value;
    }
  }
}

// BASE DE DATOS

// funcion XHR
function ObtenerXHR() {
  req = false;
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else {
    if (window.ActiveXObject) {
      req = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return req;
}

// funcion encargada de subir la partida
function subirPartida() {
  var peticion = ObtenerXHR();

  peticion.open(
    "POST",
    "./assets/php/api.php?opcion=1&nombreJugador=" + jugador1.nombre + "&tiempoPartida=" + duracionPartida, "true"
  );
  peticion.send(null);
}

// funcion encargada de obtener el historial del jugador
function obtenerHistorialjugador() {
  var peticion = ObtenerXHR();

  peticion.open(
    "GET",
    "./assets/php/api.php?opcion=2&nombreJugador=" + jugador1.nombre,
    "true"
  );
  peticion.onreadystatechange = cargarHistorial;
  peticion.send(null);

  function cargarHistorial() {
    var historialJugador = document.getElementById("historialJugador");
    if (peticion.readyState == 4) {
      if (peticion.status == 200) {
        //Se proceso la peticion
        obj = JSON.parse(peticion.responseText); //.responseText;

        // campos
        partidas = "";

        for (var i = 0; i < obj.length; i++) {
          var date = new Date(obj[i].fechaPartida);
          partidas +=
            "<tr>" +
            "<td>" + obj[i].tiempoPartida + "</td>" +
            "<td>" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "</td>" +
            "</tr>";
        }
        historialJugador.innerHTML = partidas;
      }
    }
  }
}

// funcion encargada de obtener todos los records
function obtenerRecords() {
  var peticion = ObtenerXHR();

  peticion.open("GET", "./assets/php/api.php?opcion=3", "true");
  peticion.onreadystatechange = cargarRecords;
  peticion.send(null);

  function cargarRecords() {
    var ranking = document.getElementById("ranking");

    if (peticion.readyState == 4) {
      if (peticion.status == 200) {
        //Se proceso la peticion
        obj = JSON.parse(peticion.responseText); //.responseText;

        // campos
        partidas = "";

        for (var i = 0; i < obj.length; i++) {
          var date = new Date(obj[i].fechaPartida);
          partidas +=
            "<tr>" +
            "<td>" + obj[i].nombreJugador + "</td>" +
            "<td>" + obj[i].tiempoPartida + "</td>" +
            "<td>" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</td>" +
            "</tr>";
        }
        ranking.innerHTML = partidas;
      }
    }
  }
}