class Tablero {
  constructor(dimension) {
    this.tablero = new Array(dimension);

    // hago tanta filas como dimension haya sido indicada (matriz cuadrada)
    for (let i = 0; i < this.tablero.length; i++) {
      this.tablero[i] = new Array(dimension);
    }
  }

  imprimirTablero = function () {
    console.log(this.tablero);
  };

  mostrarTablero = function (nombreJugador) {
    // Verifico a quien pertenece el tablero
    if (nombreJugador != "pc") {
      var table = document.getElementById("table-player");
    } else {
      var table = document.getElementById("table-pc");
    }

    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    for (let x = 0; x < this.tablero.length; x++) {
      var tr = document.createElement("tr");
      table.appendChild(tr);
      for (let y = 0; y < this.tablero.length; y++) {
        var td = document.createElement("td");
        tr.appendChild(td);
        if (x == 0 && y > 0) {
          td.appendChild(document.createTextNode(y));
        }
        if (y == 0 && x > 0) {
          td.appendChild(document.createTextNode(x));
        }
        td.id = x + ";" + y + ":" + nombreJugador;
        if (nombreJugador != "pc") {
          if ((y != 0) & (x !== 0)) {
            td.setAttribute(
              "onClick",
              "jugador1.insertarEmbarcacion(" + x + "," + y + ")"
            );
          }
        } else {
          if ((y != 0) & (x !== 0)) {
            td.setAttribute(
              "onClick",
              "jugador1.atacar(jugador2," + x + "," + y + ")"
            );
          }
        }
        td.setAttribute(
          "class",
          "td-tablero-juego"
        );
      }
    }
  };
}
