<?php 
    $from = "csomormaker@karcags.hu";
    $pass = "Abc123456";
    ini_set('SMTP','mail.ininet.hu');
    ini_set('smtp_port', 587);
    ini_set('username', $from);
    ini_set('auth_username', $from);
    ini_set('password', $pass);
    ini_set('auth_password', $pass);
    ini_set('sendmail_from', $from);
    $headers = 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= "From: $from"; 

    

    function sendRegistrationEmail($to){
        $subject = "Sikeres regisztráció";

        $message = "<html><body>";
        $message .= "<div style='margin: 10px; padding: 4px; border: 1px solid black; border-radius: 10px;'>";
        $message .= "<h1 style='text-align: center; background-color: #683ab7; color: white; padding: 10px; border-radius: 10px;'>Karcags.hu</h1>";
        $message .= "<h4 style='text-align: justify;'>Üdvözlünk a csömörmaker weboldalán! Jó szórakozást! :D</h4>";
        $message .= "</div>";
        $message .= "</body></html>";

        @mail($to, $subject, $message, $headers, "-f " . $from);
    }

    function sendNewPassword($to, $pass){
        $subject = "Jelszó visszaállítás";

        $message = "<html><body>";
        $message .= "<div style='margin: 10px; padding: 4px; border: 1px solid black; border-radius: 10px;'>";
        $message .= "<h1 style='text-align: center; background-color: #683ab7; color: white; padding: 10px; border-radius: 10px;'>Karcags.hu</h1>";
        $message .= "<h4 style='text-align: justify;'>A jelszó változatás sikeres! Az új jelszava: $pass</h4>";
        $message .= "</div>";
        $message .= "</body></html>";
        
        @mail($to, $subject, $message, $headers, "-f " . $from);
    }
?>