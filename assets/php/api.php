<?php
//Uso un header para tener permiso a acceder a los archivos
header("Access-Control-Allow-Origin: *");

//conexión a la base de datos
include_once("config.php");

//Obtengo la opción que elegí cuando hago el llamado
if (isset($_GET["opcion"]) && $_GET["opcion"] != "") {
    $opcion = $_GET["opcion"];
} else {
    $opcion = 0;
    $sql = NULL;
}

//Realizo un switch, ya que como en mi caso necesitare varias opciones de búsqueda; esto, depende de la variable opción
switch ($opcion) {

    case 1: // Subir Partida
        if (isset($_GET["nombreJugador"]) & isset($_GET["tiempoPartida"])) {
            $sql = "INSERT INTO historial (nombreJugador, tiempoPartida) VALUES ('" . $_GET["nombreJugador"] . "','" . $_GET["tiempoPartida"] . "') ";
        } else {
            $sql = NULL;
        }
        break;

    case 2: // Obtener el historial de partida del jugador
        if (isset($_GET["nombreJugador"])) {
            $sql = "SELECT * FROM historial WHERE nombreJugador = '" . $_GET['nombreJugador'] . "' ORDER BY tiempoPartida";
        } else {
            $sql = NULL;
        }
        break;

    case 3: // Obtener historial de las mejores 5 partidas
        $sql =  "SELECT * FROM historial ORDER BY tiempoPartida ASC LIMIT 5";
        break;

    default:
        $sql = NULL;
        break;
}

if ($sql) {
    $result = $conexion->query($sql);

    if ($opcion != 1) { // al ser una peticion de "INTO" no nos interesa el retorno de un json
        $array = array();
        if ($result) {
            while ($partida = mysqli_fetch_assoc($result)) {
                array_push($array, $partida);
            }
            $res = json_encode($array, JSON_PRETTY_PRINT);
        } else {
            $res = null;
            echo "Error de acceso a la API " . mysqli_error($conexion);
        }

        echo $res;
    }

    $conexion->close();
} else {
    echo "Error de acceso a la API " . mysqli_error($conexion);
}
