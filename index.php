<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Batalla Naval</title>

    <!-- Bootstrap Styles -->
    <link rel="stylesheet" href="./assets/css/bootstrap.min.css">

    <!-- Styles -->
    <link rel="stylesheet" href="./assets/css/styles.css">

    <!-- Boostrap JS-->
    <script src="./assets/js/bootstrap.min.js"></script>
    <script src="./assets/js/jquery-3.6.0.min.js"></script>

    <!-- Script que permite la utilizacion de sonido -->
    <script src="./assets/js/howler.min.js"></script>

    <!-- Script juego -->
    <script src="./assets/js/juego/embarcacion.js"></script>
    <script src="./assets/js/juego/tablero.js"></script>
    <script src="./assets/js/juego/jugador.js"></script>
    <script src="./assets/js/juego/batallaNaval.js"></script>

    <?php
    if (isset($_POST['nombre'])) {
        $_SESSION['usuario'] = $_POST['nombre'];
        echo "<script>            $(function() {
            obtenerHistorialUsuario();
        });</script>";
    } else {
    ?>
        <script>
            $(function() {
                showModalNombre();
            });
        </script>
    <?php } ?>
</head>

<body onload="mostrarTablero();">

    <section class="capa"></section>

    <header class="text-center pt-5">
        <h1>BATALLA NAVAL</h1>
    </header>

    <section class="game row container-fluid">

        <section class="menu container mx-auto col-xl-2 col-lg-12 col-md-12 p-3 mt-4">
            <h4 class="col-12">Menu Juego</h4>
            <button class="btn btn-menu btn-warning my-3" id="btn-iniciarPartida" onclick="iniciarJuego()">INICIAR BATALLA</button><br>
            <button class="btn btn-menu btn-warning my-3 disabled" id="btn-abandonar" onclick="abandonarJuego()">ABANDONAR</button><br>
            <button class="btn btn-menu btn-warning my-3" id="btn-personalizacion" data-bs-toggle="modal" data-bs-target="#configuraciones">PERSONALIZACION</button>
        </section>

        <section class="tables container mx-auto col-8 row">

            <span id="dialogoTurno" class="d-none">Turno de: <input class="input-nombre border-0" type="text" id="turnoDe" value="<?php if (isset($_SESSION['usuario'])) {
                                                                                                                                        echo $_SESSION['usuario'];
                                                                                                                                    } ?>" readonly="readonly"></span>

            <div class="col-xl-6 col-lg-6 col-md-12 mx-auto p-3">
                <h4 class="text-center mb-2"><input class="input-nombre text-center" type="text" id="name" value="<?php if (isset($_SESSION['usuario'])) {
                                                                                                                        echo $_SESSION['usuario'];
                                                                                                                    } ?>" readonly="readonly"></h4>
                <table class="mt-2 mx-auto tablero-juego" id="table-player">

                </table>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 mx-auto p-3">
                <h4 class="text-center mb-2">PC</h4>
                <table class="mt-2 mx-auto tablero-juego" id="table-pc"></table>
            </div>

            <div id="seleccion-embarques-batalla" class="container mr-auto col-12 p-3 row">
                <div class="col-xl-3 col-md-4 my-3 mr-auto">
                    <h5 class="cant-embarcaciones">Acorazados: <input class="mx-2" id="cant-acorazado" readonly="readonly"></h5>
                    <button class="btn btn-danger btn-seleccion-embarcacion p-0" id="acorazado-vertical" value="acorazado-vertical" onclick="seleccionarEmbarcacion(value)">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </button>
                    <button class="btn btn-danger btn-seleccion-embarcacion p-0" id="acorazado-horizontal" value="acorazado-horizontal" onclick="seleccionarEmbarcacion(value)">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </button>
                </div>
                <div class="col-xl-3 col-md-4 my-3 mr-auto">
                    <h5 class="cant-embarcaciones">Destructores: <input class="mx-2" id="cant-destructor" readonly="readonly"></h5>
                    <button class="btn btn-success btn-seleccion-embarcacion p-0" id="destructor-vertical" value="destructor-vertical" onclick="seleccionarEmbarcacion(value)">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </button>
                    <button class="btn btn-success btn-seleccion-embarcacion p-0" id="destructor-horizontal" value="destructor-horizontal" onclick="seleccionarEmbarcacion(value)">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </button>
                </div>
                <div class="col-xl-3 col-md-4 my-3 mr-auto">
                    <h5 class="cant-embarcaciones">Submarinos: <input class="mx-2" id="cant-submarino" readonly="readonly"></h5>
                    <button class="btn btn-info btn-seleccion-embarcacion p-0" id="submarino" value="submarino" onclick="seleccionarEmbarcacion(value)">
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </button>
                </div>
            </div>
        </section>

        <section class="historial container mx-auto col-2 p-3 mt-4">
            <h4 class="text-center mb-2">Tu Historial</h4>
            <table>
                <thead>
                    <tr>
                        <th>Duracion</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody id="historialJugador">
                </tbody>
            </table>
        </section>

    </section>

    <!-- Modal Ingresar Nombre  -->
    <div class="modal fade" id="ingresarNombre" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mx-auto" id="exampleModalLabel">Bienvenido a la Batalla Naval</h5>
                </div>
                <div class="modal-body">
                    <form action="./" method="POST">
                        <label for="nombre">Nombre de Usuario</label>
                        <br>
                        <input type="text" name="nombre" id="nombre" required>
                        <br>
                        <hr>
                        <input type="submit" class="btn btn-primary float-end" value="Jugar">
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Personalizaciones -->
    <div class="modal fade" id="configuraciones" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Seleccionar Color Embarcaciones</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">Acorazados</div>
                        <div class="col-6">
                            <label>
                                <input type="radio" name="acorazado-color" value="info"> Azul
                            </label>
                            <label>
                                <input type="radio" name="acorazado-color" value="success"> Verde
                            </label>
                            <label>
                                <input type="radio" name="acorazado-color" value="danger" checked> Rojo
                            </label>
                        </div>
                        <div class="col-6">Destructores</div>
                        <div class="col-6">
                            <label>
                                <input type="radio" name="destructor-color" value="info"> Azul
                            </label>
                            <label>
                                <input type="radio" name="destructor-color" value="success" checked> Verde
                            </label>
                            <label>
                                <input type="radio" name="destructor-color" value="danger"> Rojo
                            </label>
                        </div>
                        <div class="col-6">Submarinos</div>
                        <div class="col-6">
                            <label>
                                <input type="radio" name="submarino-color" value="info" checked> Azul
                            </label>
                            <label>
                                <input type="radio" name="submarino-color" value="success"> Verde
                            </label>
                            <label>
                                <input type="radio" name="submarino-color" value="danger"> Rojo
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="personalizarEmbarcaciones()">Aplicar cambios</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Fin Juego -->
    <div class="modal fade" id="finalizarPartida" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mx-auto" id="tituloModalFinJuego"></h5>
                </div>
                <div class="modal-body">
                    <h5 class="modal-title text-center mb-3">Top 5 Mejores Partidas</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre Jugador</th>
                                <th>Duración</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody id="ranking">
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <form action="./assets/php/cerrarSesion.php" method="POST">
                        <input type="submit" class="btn btn-primary" value="Jugar de nuevo">
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showModalNombre() {
            $('#ingresarNombre').modal('show');
        }

        function obtenerHistorialUsuario() {
            obtenerHistorialjugador();
        }
    </script>
</body>

</html>