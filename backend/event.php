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
    }

?>