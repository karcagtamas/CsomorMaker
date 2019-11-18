<?php 
    function login($username, $password){
        global $db;


        $sql = "CALL getHash(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()){
            if (password_verify($password, $row['hash'])){
                echo '{"response" : "success", "message" : "A belépés sikeres!"}';
                $_SESSION['userId'] = $row['userId'];
                $sql = "CALL login(?);";
                $stmt->close();
                $stmt = $db->prepare($sql);
                $stmt->bind_param("i", $_SESSION['userId']);
                $stmt->execute();
                $stmt->close();
            }else{
                echo '{"response" : "fail", "message" : "A jelszó nem megfelelő!"}';
            }
        }
        else{
            echo '{"response" : "fail", "message" : "A felhasználónév nem megfelelő!"}';
        }
    }

    function registration($username, $email, $password){
        global $db;

        $sql = "CALL addUser(?, ?, ?);";

        $stmt = $db->prepare($sql);
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bind_param("sss", $username, $email, $hash);
        $stmt->execute();

        if ($stmt->errno){
            echo '{"response" : "fail", "message" : "Már létezik felhasználó ezzel az e-mail címmel vagy felhasználónévvel!"}';

        }else{
            echo '{"response" : "success", "message" : "A regisztráció sikeres!"}';
            sendRegistrationEmail($email, $username);
        }
    }

    function logout(){
        session_destroy();
        echo '{"response" : "success", "message" : "A kijelentkezés sikeres!"}';
    }

    function isAdmin(){
        global $db;

        if (isset($_SESSION['userId'])){
            $sql = "CALL isAdmin(?);";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("i", $_SESSION['userId']);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            if ($row['isAdmin']){
                echo true;
            }
            else{
                echo false;
            }

        }else{
            echo false;
        }

    }

    function getUser($userId){
        global $db;

        $sql = "CALL getUser(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        

        $row = $result->fetch_assoc();

        echo json_encode($row);
        $stmt->close();
    }

    function updateUser($userId, $name, $tShirtSize, $allergy, $class){
        global $db;

        $sql = "CALL updateUser(?, ?, ?, ?, ?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("issss", $userId, $name, $tShirtSize, $allergy, $class);
        $stmt->execute();

        if ($stmt->errno){
            echo '{"response" : "fail", "message" : "A felhasználó frissítése sikertelen!"}';

        }else{
            echo '{"response" : "success", "message" : "A felhasználó frissítése sikeres!"}';
        }
        $stmt->close();
    }

    function checkPassword($userId, $password){
        global $db;

        $sql = "CALL getHashById(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()){
            if (password_verify($password, $row['hash'])){
                echo '{"response" : "success", "message" : "A régi jelszó helyes!"}';
                
            }else{
                echo '{"response" : "fail", "message" : "A régi jelszó helytelen!"}';
            }
        }
        else{
            echo '{"response" : "fail", "message" : "A felhasználó id nem létezik!"}';
        }
        $stmt->close();
    }

    function changePassword($userId, $password){
        global $db;

        $sql = "CALL changePassword(?, ?);";

        $stmt = $db->prepare($sql);
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bind_param("is", $userId, $hash);
        $stmt->execute();

        if ($stmt->errno){
            echo '{"response" : "fail", "message" : "A felhasználó jelszó cseréje sikertelen!"}';

        }else{
            echo '{"response" : "success", "message" : "A felhasználó jelszó cseréje sikeres!"}';
        }
        $stmt->close();
    }

    function resetPassword($username, $email){
        global $db;

        $sql = "CALL isValidUsernameAndEmail(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $stmt->close();

        if ($row['isValid']){
            $newPassword = generateRandomString(8);

            $sql = "CALL changePassword(?, ?);";

            $stmt = $db->prepare($sql);
            $hash = password_hash($newPassword, PASSWORD_BCRYPT);
            $stmt->bind_param("is", $row['userId'], $hash);
            $stmt->execute();

            if ($stmt->errno){
                echo '{"response" : "fail", "message" : "Hiba a jelszó visszaállítása közben. Próbáld újra késöbb!"}';     
            }else{
                echo '{"response" : "success", "message" : "A jelszó visszaállítás sikeres! Elküldtük az e-mailt a megadott e-mail címre!"}';
                sendNewPassword($email, $newPassword);
            }
            $stmt->close();

            
        }
        else{
            echo '{"response" : "fail", "message" : "A jelszó visszaállítás sikertelen! Rossz adatokat adtál meg!"}';
            $stmt->close();
        }
        
    }

    function getAccessLevel(){
        global $db;

        $sql = "CALL getAccessLevel(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $_SESSION['userId']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $row = $result->fetch_assoc();

        echo json_encode($row['accessLevel']);
        $stmt->close();
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    function getRoles(){
        global $db;

        $sql = "CALL getRoles();";
        
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

?>