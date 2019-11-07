<?php 
    function getAllUser(){
        global $db;

        $sql = "CALL getUsers();";
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

    function getAllEvent(){
        global $db;

        $sql = "CALL getAllEvent();";
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

    function getAllGt(){
        global $db;
        $sql = "CALL getAllGt();";
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

    function updateUserRole($user, $role){
        global $db;

        $sql = "CALL updateUserRole(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $user, $role);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A felhasználó frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A felhasználó frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function blockUser($user, $status){
        global $db;

        $sql = "CALL blockUser(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $user, $status);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A felhasználó tiltása/engedélyezése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A felhasználó tiltása/engedélyezése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }


    function updateEventArchiveStatus($event, $status){
        global $db;

        $sql = "CALL updateEventArchiveStatus(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $event, $status);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az esemény státuszának átállítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az esemény státuszának átállítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateGtArchiveStatus($gt, $status){
        global $db;

        $sql = "CALL updateGtArchiveStatus(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $gt, $status);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gólyatábor státuszának átállítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gólyatábor státuszának átállítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    

?>