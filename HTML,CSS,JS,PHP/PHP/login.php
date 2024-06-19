<?php 
include 'conexion.php';
session_start();
if(isset($_SESSION['usuario']))
{
	header('Location: login.php');
}
$Errores ='';
if ($_SERVER['REQUEST_METHOD']=='POST')
{
	$usuario = filter_var(strtolower($_POST['usuario']), FILTER_SANITIZE_STRING);
	$password1 = filter_var(strtolower($_POST['password']), FILTER_SANITIZE_STRING);
	$password1 = hash('sha512',$password1);

if(empty($usuario)or empty($password1))
{
	$Errores= '<li>Ingrese los doatos</li>';
}
else{
	$consulta = $conexion->prepare('SELECT * FROM usuarios WHERE Nombre = :Correo and Contrasena=:password');
	$consulta->execute(array(':Correo'=>$usuario,':password'=>$password1));
	$relsultado= $consulta->fetch();

	if ($relsultado != false)
	{
		$_SESSION['usuario']=$usuario;
		echo $usuario;
		header ('Location:https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aNdRFgSiPzcRo73CraPQi01MCqbD27Spfw&s');
	}
}
}
include 'login.view.php'
 ?>