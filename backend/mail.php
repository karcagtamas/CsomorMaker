<?php 
    $from = "csomormaker@karcags.hu";
    $gto = "karcagtamas@outlook.com";
    $pass = "Abc123456";
    ini_set('SMTP','mail.ininet.hu');
    ini_set('smtp_port', 587);
    ini_set('username', $from);
    ini_set('auth_username', $from);
    ini_set('password', $pass);
    ini_set('auth_password', $pass);
    ini_set('sendmail_from', $from);
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset: utf8\r\n";
    $headers .= "From: CsomorMaker < ".$from." >\r\n";
    $headers .= "Reply-To: ".$from."\r\n";

/*     $headers = array(
        'From' => $from,
        'Reply-To' => $from
    ); */

    

    function sendRegistrationEmail($to, $user){
        global $headers;
        global $from;
        global $gto;
        $subject = "Sikeres regisztráció";

        $message = "<html lang='hu'><body>";
        $message .= "<div style='margin: 10px; padding: 10px; border: 1px solid black; border-radius: 10px;'>";
        $message .= "<h1 style='text-align: center; background-color: #683ab7; color: white !important; padding: 10px; border-radius: 10px;'>CsömörMaker</h1>";
        $message .= "<h4 style='text-align: justify; margin-right: 10px; margin-left: 10px;'>Üdvözlünk a csömörmaker weboldalán! Jó szórakozást! :D</h4>";
        $message .= "</div>";
        $message .= "</body></html>";

        $gmessage = "<html lang='hu'><body>";
        $gmessage .= "<div style='margin: 10px; padding: 10px; border: 1px solid black; border-radius: 10px;'>";
        $gmessage .= "<h1 style='text-align: center; background-color: #683ab7; color: white !important; padding: 10px; border-radius: 10px;'>CsömörMaker</h1>";
        $gmessage .= "<h4 style='text-align: justify; margin-right: 10px; margin-left: 10px;'>".$user." felhasználó ma sikeresen regisztrált!</h4>";
        $gmessage .= "</div>";
        $gmessage .= "</body></html>";

        @mail($to, $subject, $message, $headers);
        @mail($gto, "Új regisztráció", $gmessage, $headers);
    }

    function sendNewPassword($to, $pass){
        global $headers;
        global $from;
        $subject = "Jelszó visszaállítás";

        $message = "<html lang='hu'><body>";
        $message .= "<div style='margin: 10px; padding: 10px; border: 1px solid black; border-radius: 10px;'>";
        $message .= "<h1 style='text-align: center; background-color: #683ab7; color: white !important; padding: 10px; border-radius: 10px;'>CsömörMaker</h1>";
        $message .= "<h4 style='text-align: justify; margin-right: 10px; margin-left: 10px;'>A jelszó változatás sikeres! Az új jelszava: ".$pass."</h4>";
        $message .= "</div>";
        $message .= "</body></html>";
        
        @mail($to, $subject, $message, $headers);
    }
?>