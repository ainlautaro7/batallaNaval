BATALLA NAVAL

Para el desarrollo de la aplicación web, se utilizaron lenguajes de programación como JavaScript y PHP, y CSS y para el dar estética al juego. Se utilizaron a su vez Frameworks tales como Bootstrap 5 y Howler.js.
Consideraciones generales del juego:

•	El tablero tiene una dimensión de 15 filas por 15 columnas.
Se creo una clase tablero que contiene una matriz de 16 x 16, esta “dimensión” también es utilizada para generar la tabla mostrada en pantalla.

•	El juego utiliza 3 tipos de embarcaciones: Acorazados, Destructores y Submarinos. Los acorazados ocupan 3 lugares (celdas) en el tablero, los destructores 2 y los submarinos 1 solo.
Se incorporan 3 botones en el cual su contenido este compuesto por una tabla para poder demostrar al usuario las dimensiones de cada embarcación, el cual el usuario puede presionar para seleccionar la embarcación que desea utilizar.

•	Para jugar, el usuario deberá configurar su flota y para ello debe ingresar los siguientes datos:
  o	Cantidad de acorazados: puede ser de 1 a 3 (por defecto 1)
  o	Cantidad de destructores: puede ser de 2 a 4 (por defecto 2)
  o	Cantidad de submarinos: puede ser de 3 a 5 (por defecto 4)
Se muestra en pantalla la cantidad máxima disponible para cada embarcación, la cual va disminuyendo según se incorporen en el tablero, el usuario tiene la posibilidad de poner el mínimo o máximo indicado para cada embarcación.

•	Por cada tipo de embarcación, el usuario debe indicar la orientación que tendrá en el tablero, que puede ser horizontal (por defecto) o vertical. Cada orientación se aplica a todas las embarcaciones de un determinado tipo, es decir que, dentro de un tipo determinado, no puede haber algunas embarcaciones dispuestas de manera horizontal y otras ubicadas de manera vertical.

Al seleccionar alguna embarcación con una dimensión mayor a 1 se le indica al usuario que, solo podrá seleccionar un tipo de orientación de la determinada embarcación seleccionada, y se le pedirá que confirme la selección. Cuando la selección sea confirmada se bloquea la orientación no presionada, por lo que el usuario no podrá seleccionarla.

•	Cada tipo de embarcación se identifica con un color que selecciona el usuario. Los colores posibles son: rojo, verde y/o azul. Por defecto, los acorazados se muestran con color rojo, los destructores con color verde y los submarinos con color azul. 

Cada embarcación inicia con sus colores predeterminados y se agregó un botón de “Personalización” donde el usuario tiene la posibilidad de elegir que color le desea indicar a la embarcación.

•	Antes de posicionar cualquier embarcación, deberá cerciorarse que las celdas que ocupará no se encuentren ocupadas por otra embarcación.

Si el usuario desea poner una embarcación encima de otra, o trata de ingresarla en un lugar donde no cabe se le indica al usuario con una alerta seguida del mensaje “(tipo embarcación) no entra”.
