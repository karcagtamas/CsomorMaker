<?php 
    function getGtMembers($gtId){
        global $db;

        $sql = "CALL getGtMembers(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function getNonGtMembers($gtId){
        global $db;

        $sql = "CALL getNonGtMembers(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function addGtMember($gtId, $userId){
        global $db;

        $sql = "CALL addGtMember(?, ?, ?);";
        

        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("iii", $gtId, $userId, $role);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A tag hozzáadása a gólyatáborhoz sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A tag hozzáadása a gólyatáborhoz sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function deleteGtMember($gtId, $userId){
        global $db;

        $sql = "CALL deleteGtMember(?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $gtId, $userId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A tag törlése a gólyatáborból sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A tag törlése a gólyatáborból sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function updateGtMember($gtId, $userId, $roleId){
        global $db;

        $sql = "CALL updateGtMember(?, ?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("iii", $gtId, $userId, $roleId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A tag frissítése a gólyatáborban sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A tag frissítése a gólyatáborban sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function importGtMembers($gtId, $file, $value){
        var_dump($file);
        $path = "./teszt";
        
    }

?>