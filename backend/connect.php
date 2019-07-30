<?php 

    if ($_SERVER['SERVER_NAME'] == "localhost"){
        define('SERVER', '127.0.0.1');
        define('USER', 'root');
        define('PASS', '');
        define('DATABASE' , 'csomormaker');
    }else{
        define('SERVER', '127.0.0.1');
        define('USER', 'karcags');
        define('PASS', 'SL7INGAsq6HfYKV0');
        define('DATABASE' , 'karcags_csomormaker');
    }

    $db = new mysqli(SERVER, USER, PASS, DATABASE);

    if ($db->connect_error){
        die('Database fail');
    }

    $db->set_charset('utf8');
?>