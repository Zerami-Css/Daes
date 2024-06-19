<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../CSS/Login.css">
    <link rel="stylesheet" href="Fork-Awesome/css/fork-awesome.min.css">
    <title>Iniciar sesión</title>
</head>
<body>
 

    <div class="box">
      <!--  <hr class="border"> -->
        
      <form action="login.php" method="POST" class="form" name="login" >
      <h2>Iniciar Sesión</h2>
 
      <div class="inputBox">
             <!--   <i class="icono izquierda fa fa-user"></i>-->
                <input type="text" name="usuario"  required="required">
                <span>Usuario</span>
                <i></i>
            </div>
            
          
            <div class="inputBox">
             <!--   <i class="icono izquierda fa fa-user"></i>-->
                <input type="password" name="password"  required="required">
                <span>Contraseña</span>
                <i onclick="login.submit()"></i>
            </div>


          <!--  <div class="inputBox">
            <span>Contraseña</span>

            <input type="password" name="password"  require="required"> 
                <i  onclick="login.submit()"></i>
            </div>-->
            <input type="submit" value="Enviar" name="" >

            <?php if(!empty($errores)): ?>
                <div class="error">
                    <?php echo $errores; ?>
                </div>
            <?php endif; ?>
        
        
        <br>
        <div class="links">
            <a href="registarte.view.php">Registarte</a>
        </div>
    </div>
    </form>

</body>
</html>