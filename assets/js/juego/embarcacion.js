class Embarcacion {
  constructor(tipo, orientacion, size, color) {
    this.tipo = tipo;
    this.orientacion = orientacion;
    this.size = size;
    this.bgColor = color;
  }

  mostrarDatos = function () {
    console.log("Embarcacion insertada: ", this.tipo);
    console.log("Orientacion de la embarcacion: ", this.orientacion);
    console.log("Size de la embarcacion: ", this.size);
  };
}
