<?php 
     function getPayOuts($id){
        global $db;

        $sql = "CALL getPayOuts(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();

    }

    function getPayOutTypes(){
        global $db;

        $sql = "CALL getPayOutTypes();";
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

    function addPayOut($name, $eventId, $type, $cost, $source, $destination){
        global $db;

        $sql = "CALL addPayOut(?, ?, ?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("siiiss", $name, $eventId, $type, $cost, $source, $destination);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A kifizetés/befizetés hozzáadása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kifizetés/befizetés hozzáadása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function updatePayOut($id, $name, $type, $cost, $source, $destination){
        global $db;

        $sql = "CALL updatePayOut(?, ?, ?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isiiss", $id, $name, $type, $cost, $source, $destination);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A kifizetés/befizetés hozzáadása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kifizetés/befizetés hozzáadása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function deletePayOut($id){
        global $db;

        $sql = "CALL deletePayOut(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A kifizetés/befizetés törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kifizetés/befizetés törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }
?>