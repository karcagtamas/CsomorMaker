<?php 
    function getEvents(){
        global $db;

        $sql = "CALL getUsersEvents(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i",$_SESSION['userId']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();

    }

    function newEvent($name){
        global $db;

        $sql = "CALL addEvent(?, ?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("si",$name, $_SESSION['userId']);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'add-event-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'add-event-success';
            $array['message'] = 'The event adding was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function getEvent($id){
        global $db;

        $sql = "CALL getEvent(?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
         echo json_encode($row);
        $stmt->close();

    }

    function updateEvent($event){
        global $db;

        $sql = "CALL updateEvent(?, ?, ?,?, ?, ?, ? ,?, ?, ? ,? , ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $days = $event['days'];
        $start = $event['startHour'];
        $end = $event['endHour'];
        $length = $days * 24 - $start + $end;
        $stmt->bind_param("isiiiiiiiiiiii", $event['id'], $event['name'], $event['currentPlayers'], $event['playerLimit'], $event['injured'],$event['visitors'],$event['visitorLimit'], $event['playerCost'], $event['visitorCost'], $event['playerDeposit'], $days, $start,$end, $length);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'update-event-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'update-event-success';
            $array['message'] = 'The event update was success!!';
            echo json_encode($array);
        }
        $stmt->close();


        $sql = "CALL getWorks(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i",$event);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt->close();

        while($row = $result->fetch_assoc()){
            $sql = "CALL updateWorkTables(?, ?);";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("ii",$row['id'], $event['id']);
            $stmt->execute();
            $stmt->close();
        }
    }

    function lock($id){
        global $db;

        $sql = "CALL setLockedEvent(?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'event-lock-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'event-lock-success';
            $array['message'] = 'The event lock was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function increaseVisitors($id){
        global $db;

        $sql = "CALL increaseVisitors(?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'visitor-increase-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'visitor-increase-success';
            $array['message'] = 'The visitor increase was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function decreaseVisitors($id){
        global $db;

        $sql = "CALL decreaseVisitors(?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'visitor-decrease-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'visitor-decrease-success';
            $array['message'] = 'The visitor decrease was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function increaseInjured($id){
        global $db;

        $sql = "CALL increaseInjured(?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'injured-increase-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'injured-increase-success';
            $array['message'] = 'The injured increase was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function decreaseInjured($id){
        global $db;

        $sql = "CALL decreaseInjured(?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'injured-decrease-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'injured-decrease-success';
            $array['message'] = 'The injured decrease was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

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

    function addPayOut($name, $eventId, $type, $cost){
        global $db;

        $sql = "CALL addPayOut(?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("siii", $name, $eventId, $type, $cost);
        $stmt->execute();

       if ($stmt->errno){
            $array['response'] =  'add-payout-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'add-payout-success';
            $array['message'] = 'The payout adding was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function deletePayOut($id){
        global $db;

        $sql = "CALL deletePayOut(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

       if ($stmt->errno){
            $array['response'] =  'delete-payout-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'delete-payout-success';
            $array['message'] = 'The payout deleting was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

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

    function getWorkTablesWithoutWorkerNames($id){
        global $db;

        $sql = "CALL getWorkTablesWithoutWorkerNames(?);";
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


?>