<?php 
     function getEventTodoes($eventId){
        global $db;

        $sql = "CALL getEventTodoes(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $eventId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateEventTodo($todoId, $text, $importance,$exp){
        global $db;

        $sql = "CALL updateEventTodo(?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isis", $todoId, $text, $importance, $exp);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az teendő frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A teendő frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }


    function addEventTodo($eventId, $text, $importance,$exp){
        global $db;

        $sql = "CALL addEventTodo(?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isis", $eventId, $text, $importance, $exp);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az teendő hozzáadása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A teendő hozzáadása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setSolvedEventTodo($todoId){
        global $db;

        $sql = "CALL setSolvedEventTodo(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $todoId);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az teendő megoldottá állítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A teendő megoldottá állítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

?>