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

        $sql = "SELECT length FROM events WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i",$event['id']);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        $oldLength = $row['length'];
        $stmt->close();
        
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

        if ($oldLength != $length){
            $sql = "CALL setUnReadyEvent(?)";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("i",$event['id']);
            $stmt->execute();
            $stmt->close();
        }
        


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

        $sql = "CALL getEventMembers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i",$event);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt->close();

        while($row = $result->fetch_assoc()){
            $sql = "CALL updateWorkerTables(?, ?);";
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

    function getWorkerTablesWithoutWorkNames($id, $event){
        global $db;

        $sql = "CALL getWorkerTablesWithoutWorkNames(?, ?);";
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
        echo json_encode($array);
        $stmt->close();
    }

    function getEventRoles(){
        global $db;

        $sql = "CALL getEventRoles();";
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

    function addUserToEvent($user, $event){
        global $db;

        $sql = "CALL addUserToEvent(?, ?);";
        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("iii", $user, $event, $role);
        $stmt->execute();
       if ($stmt->errno){
            $array['response'] =  'add-user-to-event-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'add-user-to-event-success';
            $array['message'] = 'The user adding to event was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function deleteUserFromEvent($user, $event){
        global $db;

        $sql = "CALL deleteUserFromEvent(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $user, $event);
        $stmt->execute();
       if ($stmt->errno){
            $array['response'] =  'delete-user-from-event-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'delete-user-from-event-success';
            $array['message'] = 'The user deleting to event was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function updateEventUser($user, $event, $role){
        global $db;

        $sql = "CALL updateUserEvenetRole(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iii", $user, $event, $role);
        $stmt->execute();
       if ($stmt->errno){
            $array['response'] =  'update-event-user-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'update-event-user-success';
            $array['message'] = 'The event user updating was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function generate($eventId){
        global $db;
        require 'generator.php';

        
        // Get Event
        $event = getEventForGen($eventId);

        // Get Users
        $workers = getWorkersForGen($eventId);

        // Get Works
        $works = getWorksForGen($eventId);

        $workers = setWorkers($event, $workers, $works);

        $works = setWorks($event, $workers, $works);
        

        if (checkInput($event, $workers, $works)){
            $stop = true; // Leállító segéd változó
            $limit = 500; // Ciklus periódus limit
            $index = 0;
            
            // Órák
            for ($i=0; $i < $event['length'] && $stop; $i++) { 
                // $tableId

                // Posztok
                for ($j=0; $j < count($works) && $stop; $j++) { 
                    // Ha aktív az adott poszt, az adott órába
                    if ($works[$j]['tables'][$i]['isActive']){
                        $worker;
                        $count = 0; // Segéd változó
                        do {
                            // Random humán
                            $index = rand(0, count($workers) - 1);
                            $worker = $workers[$index];
                            $count++;
                            
                            // Csere ha a próbálkozások száma nagyobb mint 100
                            if ($count >= 100){
                                $newIndex = rand(0, count($workers) - 1);
                                $newWorker = $workers[$newIndex];
                                $param = rand(0, $i - 1);

                                $addedWorkId = $newWorker['tables'][$param]['workId'];
                                $addedWork = null;
                                if ($addedWorkId != null){
                                    $addedWork = $works[array_search($addedWorkId, array_column($works, 'id'))];
                                }

                                if ($newWorker['tables'][$i]['isAvaiable'] && 
                                $newWorker['tables'][$i]['workId'] == null &&
                                workerIsValid($worker, $param, $addedWork) && $i != $param){
                                    if ($addedWork != null){
                                        $workers[$index]['workerHours']--;
                                        $workers[$index]['tables'][$param]['workId'] = $addedWork['id'];
                                        $workers[$index]['tables'][$param]['work'] = $addedWork['name'];
                                        $workers[$newIndex]['workerHours']++;
                                        $workers[$newIndex]['tables'][$param]['workId'] = null;
                                        $workers[$newIndex]['tables'][$param]['work'] = null;
                                        $works[array_search($addedWorkId, array_column($works, 'id'))]['tables'][$param]['worker'] = $worker['name'];
                                        $works[array_search($addedWorkId, array_column($works, 'id'))]['tables'][$param]['workerId'] = $worker['id'];
                                    }

                                    $worker = $newWorker;

                                }

                            }
                        } while (!workerIsValid($worker, $i, $works[$j]) && $count < $limit);

                        if ($count < $limit){
                            $works[$j]['tables'][$i]['workerId'] = $worker['id'];
                            $works[$j]['tables'][$i]['worker'] = $worker['name'];
                            $workers[$index]['tables'][$i]['workId'] = $works[$j]['id'];
                            $workers[$index]['tables'][$i]['work'] = $works[$j]['name'];
                            $workers[$index]['workerHours']--;
                        }else{
                            $stop = false;
                        }
                    }
                }
            }

            if (!$stop){
                 $res['response'] = 'gen-fail';
                $res['message']= 'The generate was unsuccess! Sorry :/';
                echo json_encode($res);
            }
            else{
                save($event, $works, $workers);
                $res['response'] = 'gen-success';
                $res['message']= 'Yee!';
                echo json_encode($res);
            }
        }
    }
?>