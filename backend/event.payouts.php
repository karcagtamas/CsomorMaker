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
?>