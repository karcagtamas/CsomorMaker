<?php
    $db->set_charset('utf8');

    function getEventMembers($event){
        global $db;

        $sql = "CALL getEventMembers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $event);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array, JSON_UNESCAPED_UNICODE );
        $stmt->close();
    }

    function addUserToEvent($user, $event){
        global $db;

        $sql = "CALL addUserToEvent(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("iii", $user, $event, $role);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A felhasználó hozzáadása az eseményhez sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A felhasználó hozzáadása az eseményhez sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function deleteUserFromEvent($user, $event){
        global $db;

        $sql = "CALL deleteUserFromEvent(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $user, $event);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A felhasnáló törlése az eseményből sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A felhasnáló törlése az eseményből sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function updateEventUser($user, $event, $role){
        global $db;

        $sql = "CALL updateUserEvenetRole(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iii", $user, $event, $role);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az esemény tagjának adatainak frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az esemény tagjának adatainak frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function getEventNonMembers($event){
          global $db;

        $sql = "CALL getNotMembers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $event);
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