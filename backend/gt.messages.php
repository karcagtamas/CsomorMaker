<?php 
    function getGtMessages($gtId){
        global $db;

        $sql = "CALL getGtMessages(?);";
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

    function addGtMessage($gtId, $message){
        global $db;

        $sql = "CALL addGtMessage(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iis", $gtId, $_SESSION['userId'], $message);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A üzenet küldése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A üzenet küldése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

?>