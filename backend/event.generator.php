<?php 
    function getWorks($id){
        global $db;

        $sql = "CALL getWorks(?);";
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

    function deleteWork($id){
        global $db;

        $sql = "CALL deleteWork(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A poszt törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function addWork($name, $eventId){
        global $db;

        $sql = "CALL addWork(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("si", $name, $eventId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt hozzáadása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A psozt hozzáadása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function getWorkTables($id){
        global $db;

        $sql = "CALL getWorkTables(?);";
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

    function setWorkTableIsActive($day, $hour, $work){
        global $db;

        $sql = "CALL setWorkTableIsActive(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iii", $day, $hour, $work);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt tábla elem állapotának állítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A poszt tábla elem állapotának állítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function getEventLowWorkers($id){
        global $db;

        $sql = "CALL getEventLowWorkers(?);";
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

    function getWorkerTables($id, $event){
        global $db;

        $sql = "CALL getWorkerTables(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $id, $event);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setWorkerTableIsAvaiable($day, $hour, $worker, $event){
        global $db;

        $sql = "CALL setWorkerTableIsAvaiable(?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iiii", $day, $hour, $worker, $event);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A humán tábla elem állapotának állítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A humán tábla elem állapotának állítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function getWorkStatuses($worker, $event){
        global $db;

        $sql = "CALL getWorkStatuses(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $worker, $event);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setIsValidWorkStatus($worker, $work){
        global $db;

        $sql = "CALL setIsValidWorkStatus(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $work, $worker);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt stáuszának állítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A poszt stáuszának állítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

?>