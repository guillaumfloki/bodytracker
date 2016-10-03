<?php
define("SERVER","local");
switch(SERVER){
	case "prod":
	$server = "guillaumyfloki.mysql.db";
	$database = "guillaumyfloki";
	$user = "guillaumyfloki";
	$password = "Guillaume1";
	break;
	case "local":
	$server = "localhost";
	$database = "body_tracking";
	$user = "root";
	$password = "";
	break;
}
$mysqli = @new Mysqli($server, $user, $password, $database);
if($mysqli->connect_error){
	die('Erreur de connexion : '.$mysqli->connect_error);
}
?>