<?php 
    function getGtPresentingForUser($gtId, $user){
        global $db;

        $sql = "CALL getGtPresentingForUser(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $gtId, $user);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updatePresentingAnswer($gtId, $user1, $user2, $answer){
        global $db;

        $sql = "CALL updatePresentingAnswer(?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iiis", $gtId, $user1, $user2, $answer);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A bemutatás szövegének frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A bemutatás szövegének frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setGtPresentingLicensedStatus($gtId, $user1, $user2){
        global $db;

        $sql = "CALL setGtPresentingLicensedStatus(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iii", $gtId, $user1, $user2);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A bemutatás engedélyezési állapotának átállítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A bemutatás engedélyezési állapotának átállítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

?>