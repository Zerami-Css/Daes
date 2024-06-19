<?php
include 'conexion.php';
session_start();
if (isset($_SESSION['usuario'])) {
 	header('Location:login.php');
 } 
 if ($_SERVER['REQUEST_METHOD']=='POST') 
 {
 	$Usuario = filter_var(strtolower($_POST['usuario']),FILTER_SANITIZE_STRING);
 	$Contrasenha1 = filter_var(strtolower($_POST['password']),FILTER_SANITIZE_STRING);
 	$Contrasenha2 = filter_var(strtolower($_POST['password2']),FILTER_SANITIZE_STRING);
 		
 	$Errores='';
 	if (empty($Usuario) or empty($Contrasenha1) or empty($Contrasenha2)) 
 	{
 		$Errores.='Ingrese todos los datos';
 	}
 	else 
 	{
 		$Consulta_Usuario=$conexion->prepare('SELECT Nombre FROM usuarios WHERE Nombre=:Correo LIMIT 1');
 		$Consulta_Usuario->execute(array(':Correo'=>$Usuario));
 		$Resultado=$Consulta_Usuario->fetch();
 		if ($Resultado !=false) 
 		{
 			$Errores.='<li>Usuario</li>';
 			
 		}
 		$Contrasenha1=hash('sha512', $Contrasenha1);
 		$Contrasenha2=hash('sha512', $Contrasenha2);

 		if ($Contrasenha1!= $Contrasenha2) 
 		{
 			$Errores.='<li>Contraseñas diferentes.Volver a teclearlas</li>';
 			
 		}
 		if ($Errores=='') 
 		{
 			try 
 			{
 				$Insertar=$conexion->prepare('INSERT INTO usuarios(Nombre,Contrasena)VALUES (:Correo,:Password)');
 				$Insertar->execute(array(':Correo'=>$Usuario,':Password'=>$Contrasenha1));
 				header('Location:login.view.php');
 			} 
 			catch (PDOException $e) 
 			{
 				echo "Error: ".$e->getMessage();
 			}
 		}
 	}
 }
 include 'registarte.view.php';
 ?>