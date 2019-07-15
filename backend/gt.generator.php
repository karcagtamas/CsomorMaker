<?php 
    function getGtWorks($gtId){
        global $db;

        $sql = "CALL getGtWorks(?);";
        

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

    function addGtWork($gtId, $name, $day, $start, $end, $workers){
        global $db;

        $sql = "CALL addGtWork(?, ?, ?, ?, ?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("isiiii", $gtId, $name, $day, $start, $end, $workers);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A poszt létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function updateGtWork($workId, $name, $day, $start, $end, $workers){
        global $db;

        $sql = "CALL updateGtWork(?, ?, ?, ?, ?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("isiiii", $workId, $name, $day, $start, $end, $workers);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A poszt frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function deleteGtWork($workId){
        global $db;

        $sql = "CALL deleteGtWork(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $workId);
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

    function getGtWorkTables($workId){
        global $db;

        $sql = "CALL getGtWorkTables(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $workId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function getGtWorkStatuses($workerId){
        global $db;

        $sql = "CALL getGtWorkStatuses(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $workerId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setGtWorkStatusIsBoss($workerId, $workId){
        global $db;

        $sql = "CALL setGtWorkStatusIsBoss(?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $workerId, $workId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt főszervjének állapotának állítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A poszt főszervjének állapotának állítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function setGtWorkStatusIsActive($workerId, $workId){
        global $db;

        $sql = "CALL setGtWorkStatusIsActive(?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $workerId, $workId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A poszt aktívitás állapotának állítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A poszt aktívitás állapotának állítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function getLowGtWorkers($gtId){
        global $db;

        $sql = "CALL getLowGtWorkers(?);";
        

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

    function getGtWorkerTables($workerId){
        global $db;

        $sql = "CALL getGtWorkerTables(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $workerId);
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