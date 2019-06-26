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
            $array['response'] =  'delete-work-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'delete-work-success';
            $array['message'] = 'The work deleting was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function addWork($name, $eventId){
        global $db;

        $sql = "CALL addWork(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("si", $name, $eventId);
        $stmt->execute();

       if ($stmt->errno){
            $array['response'] =  'add-work-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'add-work-success';
            $array['message'] = 'The work adding was success!!';
            echo json_encode($array);
        }
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
            $array['response'] =  'set-work-table-is-active-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'set-work-table-is-active-success';
            $array['message'] = 'The work table is active setting was success!!';
            echo json_encode($array);
        }
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
            $array['response'] =  'set-worker-table-is-avaiable-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'set-worker-table-is-avaiable-success';
            $array['message'] = 'The worker table is avaiable setting was success!!';
            echo json_encode($array);
        }
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
            $array['response'] =  'set-work-status-is-valid-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'set-work-status-is-valid-success';
            $array['message'] = 'The work status is valid setting was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

?>