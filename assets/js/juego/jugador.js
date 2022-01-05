class Jugador {
  constructor(nombre, tablero) {
    this.nombre = nombre; // representa al nombre del jugador
    this.tablero = tablero; // representa al tablero del jugador
    this.embarqueSeleccionado; // representa el embarque que el jugador tiene seleccionado
    this.embarques = Array(); // representa el conjunto de embarques que tiene el jugador en el tablero
  }

  mostrarTablero = function () {
    this.tablero.mostrarTablero(this.nombre);
  };

  imprimirEmbarques = function () {
    this.embarques.forEach((embarque) => {
      console.log(embarque);
    });
  };

  // el jugador selecciona una embarcacion
  seleccionarEmbarcacion = function (embarqueSeleccionado) {
    this.embarqueSeleccionado = new Embarcacion();
    this.embarqueSeleccionado.tipo = embarqueSeleccionado.tipo;
    this.embarqueSeleccionado.orientacion = embarqueSeleccionado.orientacion;
    this.embarqueSeleccionado.size = embarqueSeleccionado.size;
    this.embarqueSeleccionado.bgColor = embarqueSeleccionado.bgColor;
  };

  atacar = function (jugadorAtacado, x, y) {
    var embarqueAtacado = jugadorAtacado.tablero.tablero[x][y];

    if (partidaIniciada == true) {  // verifico que la partida haya sido iniciada
      if ((embarqueAtacado != null) & (embarqueAtacado != "agua") & (embarqueAtacado != "acierto")) { // se ataca a un barco que no ha sido atacado
        if (jugadorAtacado.nombre == "pc") { // la pc es atacada
          document.getElementById(x + ";" + y + ":pc").setAttribute("class", "bg-warning");
          document.getElementById(x + ";" + y + ":pc").removeAttribute("onclick");

          soundAcierto.play();  // reproduzco sonido de acierto

          verificarTablero(jugadorAtacado.tablero.tablero); // verifico si el tablero contiene embarcaciones o no

        } else {  // el jugador 1 es atacado
          document.getElementById(x + ";" + y + ":" + jugadorAtacado.nombre).setAttribute("class", "bg-warning");

          soundAcierto.play();  // reproduzco sonido de acierto
          verificarTablero(jugadorAtacado.tablero.tablero); // verifico si el tablero contiene embarcaciones o no

          // PROBLEMA EN LA RECURSION (POSIBLE CASO BASE)
          // if (embarqueAtacado.orientacion == "horizontal") {
          //   do {
          //     y = y + (-1 + Math.round(Math.random() * 2));
          //   } while ((y == 0) || (y == 16));
          // }

          // if (embarqueAtacado.orientacion == "vertical") {
          //   do {
          //     x = x + (-1 + Math.round(Math.random() * 2));
          //   } while ((x == 0) || (x == 16));
          // }

          // if (jugadorAtacado.tablero.tablero[x][y] == "agua" || jugadorAtacado.tablero.tablero[x][y] == "acierto") {
            this.atacar(jugadorAtacado, Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
          // } else {
          //   this.atacar(jugadorAtacado, x, y);  // la pc realiza un ataque a una posicion aledaña
          // }

          // this.atacar(jugadorAtacado, Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
        }

        jugadorAtacado.tablero.tablero[x][y] = "acierto"; // Se marca un acierto en tablero

      } else {  // el ataque pudo haber sido en un barco ya atacado o en el agua

        if (embarqueAtacado == "acierto") { // si el disparo se realiza sobre una zona ya marcada como "acierto" la pc vuelve a atacar
          this.atacar(jugadorAtacado, Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
        } else if (embarqueAtacado == "agua") { // si el disparo se realiza sobre una zona ya marcada como "agua" la pc vuelve a atacar
          this.atacar(jugadorAtacado, Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);

        } else {  // el disparo cayo en el agua, no marcada con anterioridad
          if (jugadorAtacado.nombre == "pc") {  // se pinta en la tabla del pc

            document.getElementById(x + ";" + y + ":pc").setAttribute("class", "bg-dark");
            document.getElementById(x + ";" + y + ":pc").removeAttribute("onclick");
            soundAgua.play(); // se reproduce el sonido del agua

          } else {  // se pinta la tabla del jugador

            document.getElementById(x + ";" + y + ":" + jugadorAtacado.nombre).setAttribute("class", "bg-dark");
            soundAgua.play(); // se reproduce el sonido del agua

          }

          jugadorAtacado.tablero.tablero[x][y] = "agua";  // se marca en la matriz del jugador correspondiente que cayo en agua
          toggleTurno();  // se cambia el turno
        }
      }
    }
  };

  // el jugador quiere poner una embarcacion determinada en su tablero
  insertarEmbarcacion = function (x, y) {
    var celda;

    // implica que el jugador no selecciono ninguna embarcacion
    if (this.embarqueSeleccionado == null) {
      // la alerta se debe de mostrar solo si el que esta "seleccionado", los embarques es el usuario
      // y la partida no haya iniciado
      if ((this.nombre != "pc") & (partidaIniciada != true)) {
        alert("Debe seleccionar una embarcacion");
      }
    } else {
      if (this.embarqueSeleccionado.orientacion == "horizontal") {
        // Verifico que la embarcacion "entre" en el espacio disponible del tablero
        if (y + this.embarqueSeleccionado.size <= this.tablero.tablero.length) {
          // Verifico disponibilidad de la embarcacion
          if (this.verificarDisponibilidadEmbarcacion()) {
            // Verifico que la posicion este libre
            if (this.posicionLibre(x, y)) {
              for (var yAux = 0; yAux < this.embarqueSeleccionado.size; yAux++) {
                // MUESTRA LAS EMBARCACIONES DE LA PC
                // celda = document.getElementById(x + ";" + y + ":" + this.nombre);
                // celda.setAttribute('class', this.embarqueSeleccionado.bgColor);

                if (this.nombre != "pc") {
                  celda = document.getElementById(x + ";" + y + ":" + this.nombre);
                  celda.setAttribute("class", this.embarqueSeleccionado.bgColor); // pinto el barco en la tabla
                } else {
                  celda = document.getElementById(x + ";" + y + ":pc");
                }

                this.tablero.tablero[x][y] = this.embarqueSeleccionado; // inserto embarcacion en la matriz "tablero"
                y++;
              }

              // reducimos la cantidad disponible a seleccionar, si el tablero utilizado es el del usuario
              if (this.nombre != "pc") {
                // funcion para reducir embarcacion
                reducirEmbarcacionDisponible(this.embarqueSeleccionado.tipo);

                // insertamos el embarque utilizado en el "historial" de embarques
                this.embarques.push(this.embarqueSeleccionado);
              }
            } else {
              // si la posicion no esta libre y el tablero utilizado es el de la pc
              // tratamos de insertar la embarcacion en otra posicion aleatoria
              if (this.nombre == "pc") {
                this.insertarEmbarcacion(Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
              }
            }
          }
        } else {
          // si el embarque no entra en la posicion seleccionada y la tabla utilizada es la del usuario se lo alerta
          // si el tablero es el de la pc, se inserta la embarcacion en otra posicion aleatoria
          if (this.nombre != "pc") {
            alert(this.embarqueSeleccionado.tipo + " no entra");
          } else {
            this.insertarEmbarcacion(Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
          }
        }
      }

      if (this.embarqueSeleccionado.orientacion == "vertical") {
        // Verifico que la embarcacion "entre" en el espacio disponible del tablero
        if (x + this.embarqueSeleccionado.size <= this.tablero.tablero.length) {
          // Verifico disponibilidad de la embarcacion
          if (this.verificarDisponibilidadEmbarcacion()) {
            // Verifico que la posicion este libre
            if (this.posicionLibre(x, y)) {
              for (var xAux = 0; xAux < this.embarqueSeleccionado.size; xAux++) {

                // MUESTRA LAS EMBARCACIONES DE LA PC
                // celda = document.getElementById(x + ";" + y + ":" + this.nombre);
                // celda.setAttribute('class', this.embarqueSeleccionado.bgColor);

                if (this.nombre != "pc") {
                  celda = document.getElementById(x + ";" + y + ":" + this.nombre);
                  celda.setAttribute("class", this.embarqueSeleccionado.bgColor); // pinto el barco en la tabla
                }

                this.tablero.tablero[x][y] = this.embarqueSeleccionado; // inserto embarcacion en la matriz "tablero"
                x++;
              }

              if (this.nombre != "pc") {
                reducirEmbarcacionDisponible(this.embarqueSeleccionado.tipo);

                this.embarques.push(this.embarqueSeleccionado); // insertamos el embarque utilizado en el "historial" de embarques
              }
            } else {
              if (this.nombre == "pc") {
                this.insertarEmbarcacion(Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
              }
            }
          }
        } else {
          if (this.nombre != "pc") {
            alert(this.embarqueSeleccionado.tipo + " no entra");
          } else {
            this.insertarEmbarcacion(Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
          }
        }
      }

      if (this.embarqueSeleccionado.orientacion === "punto") {
        // Verifico disponibilidad de la embarcacion
        if (this.verificarDisponibilidadEmbarcacion()) {
          // Verifico que la posicion este libre
          if (this.posicionLibre(x, y)) {

            // MUESTRA LAS EMBARCACIONES DE LA PC
            // celda = document.getElementById(x + ";" + y + ":" + this.nombre);
            // celda.setAttribute('class', this.embarqueSeleccionado.bgColor);

            if (this.nombre != "pc") {
              celda = document.getElementById(x + ";" + y + ":" + this.nombre);
              // pinto el barco en la tabla
              celda.setAttribute("class", this.embarqueSeleccionado.bgColor);
            } else {
              celda = document.getElementById(x + ";" + y + ":pc");
            }

            // inserto embarcacion en la matriz "tablero"
            this.tablero.tablero[x][y] = this.embarqueSeleccionado;

            if (this.nombre != "pc") {
              reducirEmbarcacionDisponible(this.embarqueSeleccionado.tipo);
              // insertamos el this.embarqueSeleccionado utilizado en el "historial" de this.embarqueSeleccionados
              this.embarques.push(this.embarqueSeleccionado);
            }
          } else {
            if (this.nombre == "pc") {
              this.insertarEmbarcacion(Math.floor(Math.random() * 15) + 1, Math.floor(Math.random() * 15) + 1);
            }
          }
        }
      }
    }

    //console.log(this.tablero.tablero);

  };

  // el jugador ve si la posicion donde quiere poner la embarcacion esta libre y si entra
  posicionLibre = function (x, y) {
    var tablero = this.tablero.tablero;

    if (this.embarqueSeleccionado.orientacion == "horizontal") {
      // Condicion embarques Horizontales
      if (y + this.embarqueSeleccionado.size <= tablero.length) {
        if (this.embarqueSeleccionado.size == 2) {
          if (tablero[x][y] == null && tablero[x][y + 1] == null) {
            return true;
          } else {
            if (this.nombre != "pc") {
              alert(this.embarqueSeleccionado.tipo + " no entra");
            }
            return false;
          }
        } else if (this.embarqueSeleccionado.size == 3) {
          if (tablero[x][y] == null && tablero[x][y + 1] == null && tablero[x][y + 2] == null) {
            return true;
          } else {
            if (this.nombre != "pc") {
              alert(this.embarqueSeleccionado.tipo + " no entra");
            }
            return false;
          }
        }
      }
    } else if (this.embarqueSeleccionado.orientacion == "vertical") {
      // Condicion embarques verticales
      if (x + this.embarqueSeleccionado.size <= tablero.length) {
        if (this.embarqueSeleccionado.size == 2) {
          if (tablero[x][y] == null && tablero[x + 1][y] == null) {
            return true;
          } else {
            if (this.nombre != "pc") {
              alert(this.embarqueSeleccionado.tipo + " no entra");
            }
            return false;
          }
        } else if (this.embarqueSeleccionado.size == 3) {
          if (tablero[x][y] == null && tablero[x + 1][y] == null && tablero[x + 2][y] == null) {
            return true;
          } else {
            if (this.nombre != "pc") {
              alert(this.embarqueSeleccionado.tipo + " no entra");
            }
            return false;
          }
        }
      }
    } else {
      // Embarcaciones de 1 unidad
      if (tablero[x][y] == null) {
        return true;
      } else {
        if (this.nombre != "pc") {
          alert(this.embarqueSeleccionado.tipo + " no entra");
        }
        return false;
      }
    }
  };

  // el jugador ve si tiene una cantidad disponible de la embarcacion que quiere poner
  verificarDisponibilidadEmbarcacion = function () {
    if (this.nombre != "pc") {
      if (document.getElementById("cant-" + this.embarqueSeleccionado.tipo).value > 0) {
        return true;
      } else {
        alert("No hay " + this.embarqueSeleccionado.tipo + " disponible");
        return false;
      }
    } else {
      return true;
    }
  };
}
