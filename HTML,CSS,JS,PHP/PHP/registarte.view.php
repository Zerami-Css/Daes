<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="../CSS/Registarte.css">
<link rel="stylesheet" href="Fork-Awesome/css/fork-awesome.min.css">
    <title>Regístrate</title>
</head>
<body>
    <div class="box">
      
        <form action="registarte.php" method="POST" class="form" name="login">
        <h2 class="titulo">Regístrate</h2>


        <div class="inputBox">
               
        <input type="text" name="usuario"  required="required">
                <span>Usuario</span>
                <i></i>
            </div>
            
            
            <br>
            <div class="inputBox">
                
                <input type="password" name="password" required="required">
                <span>Contraseña</span>
                <i></i>
            </div>
            
            <br>
            <div class="inputBox">
                <input type="password" name="password2" required="required"> 
                <span>Confirmar contraseña</span>
                <i onclick="login.submit()"></i>
       
       
               
      
            </div>
            <input type="submit" name="" value="Enviar">
            <?php if(!empty($errores)): ?>
                <div class="error">
                    <?php echo $errores; ?>
                </div>
            <?php endif; ?>
        <br>
        
     <div class="links">
        <a href="login.php">Ya tienes cuenta?</a>
     </div>
    </div>
    </form>
</body>
</html>