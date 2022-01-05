<?php 

	$servidor = 'localhost';
	$usuario = 'root';
	$password = '';
	$db = 'batallaNaval';

	//Metodos
	$conexion = new mysqli ($servidor,$usuario,$password,$db) or die ("error al conectarse");
 
 ?>