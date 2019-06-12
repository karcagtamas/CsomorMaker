<?php 
    define('SERVER', 'localhost');
    define('USER', 'root');
    define('PASS', '');
    define('DATABASE' , 'csomormaker');

    $db = new mysqli(SERVER, USER, PASS, DATABASE);

    if ($db->connect_error){
        die('Database fail');
    }
?>