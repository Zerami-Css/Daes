<?php

try {  
	$conexion = new PDO('mysql: host=localhost; dbname=acceco', 'root','');
}
catch (PDOException $e) { 
	'Error: '.$e->getMessage();

}
?>