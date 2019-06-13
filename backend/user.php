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
                echo '{"response" : "valid-login", "message" : "The login is success!"}';
                $_SESSION['userId'] = $row['userId'];
            }else{
                echo '{"response" : "invalid-password", "message" : "The gave password is invalid"}';
            }
        }
        else{
            echo '{"response" : "invalid-username", "message" : "The gave username is invalid!"}';
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
            echo '{"response" : "user-exist", "message" : "We have user with this username or email!"}';

        }else{
            echo '{"response" : "reg-success", "message" : "The registration was success!"}';
        }
    }

    function logout(){
        session_destroy();
            echo '{"response" : "logout-success", "message" : "The log out was success!"}';

    }

    function isAdmin(){
        global $db;

        if (isset($_SESSION['userId'])){
            $sql = "CALL isAdmin(?);";
            $stmt = $db->prepare($sql);
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

?>