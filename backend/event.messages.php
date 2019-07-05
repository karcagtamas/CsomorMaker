<?php 
    function getEventMessages($eventId){
        global $db;

        $sql = "CALL getEventMessages(?);";
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

    function addEventMessage($eventId, $text, $sender){
        global $db;

        $sql = "CALL addEventMessage(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isi", $eventId, $text, $sender);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az üzenet hozzáadása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A üzenet hozzáadása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

?>