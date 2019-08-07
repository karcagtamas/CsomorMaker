<?php 
    function getGtClasses($gtId){
        global $db;

        $sql = "CALL getGtClasses(?);";
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

    function addGtClass($gtId, $name){
        global $db;

        $sql = "CALL addGtClass(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("is", $gtId, $name);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az osztály létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az osztály létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteGtClass($classId){
        global $db;

        $sql = "CALL deleteGtClass(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $classId);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az osztály törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az osztály törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateGtClass($classId, $name, $tShirtColor, $master){
        global $db;

        $sql = "CALL updateGtClass(?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isss", $classId, $name, $tShirtColor, $master);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az osztály frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az osztály frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function getGtClassMembers($classId){
        global $db;

        $sql = "CALL getGtClassMembers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $classId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function addGtClassMember($classId, $name, $description, $allergy, $tShirtSize){
        global $db;

        $sql = "CALL addGtClassMember(?, ?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("issss", $classId, $name, $description, $allergy, $tShirtSize);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az osztály tag létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az osztály tag létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteGtClassMember($memberId){
        global $db;

        $sql = "CALL deleteGtClassMember(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $memberId);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az osztály tag törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az osztály tag törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateGtClassMember($memberId, $name, $description, $allergy, $tShirtSize){
        global $db;

        $sql = "CALL updateGtClassMember(?, ?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("issss", $memberId, $name, $description, $allergy, $tShirtSize);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az osztály tag frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az osztály tag frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setGtClassMemberPaidStatus($memberId){
        global $db;

        $sql = "CALL setGtClassMemberPaidStatus(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $memberId);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az osztály tag fizetési állapotának frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az osztály tag fizetési állapotának frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }
?>