<?php 
    function getGtPayouts($gtId){
        global $db;

        $sql = "CALL getGtPayouts(?);";
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

    function addGtPayout($gtId, $name, $type, $cost, $from, $to){
        global $db;

        $sql = "CALL addGtPayout(?, ?, ?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isiiss", $gtId, $name, $type, $cost, $from, $to);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az kifizetés/befizetés létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kifizetés/befizetés létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteGtPayout($payoutId){
        global $db;

        $sql = "CALL deleteGtPayout(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $payoutId);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az kifizetés/befizetés törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kifizetés/befizetés törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateGtPayout($payoutId, $name, $type, $cost, $from, $to){
        global $db;

        $sql = "CALL updateGtPayout(?, ?, ?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isiiss", $payoutId, $name, $type, $cost, $from, $to);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az kifizetés/befizetés frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kifizetés/befizetés frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }
?>