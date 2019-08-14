<?php 
    function getGtQuestions($gtId){
        global $db;

        $sql = "CALL getGtQuestions(?);";
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

    function addGtQuestion($gtId, $creater, $question){
        global $db;

        $sql = "CALL addGtQuestion(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iis", $gtId, $creater, $question);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A kérdés létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kérdés létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateGtQuestion($id, $updater, $question){
        global $db;

        $sql = "CALL updateGtQuestion(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iis", $id, $updater, $question);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A kérdés frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kérdés frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteGtQuestion($id){
        global $db;

        $sql = "CALL deleteGtQuestion(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A kérdés törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A kérdés törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function getGtAnswers($questionId){
        global $db;

        $sql = "CALL getGtAnswers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $questionId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function addGtAnswer($question, $answer, $creater){
        global $db;

        $sql = "CALL addGtAnswer(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iss", $question, $answer, $creater);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A válasz elküldése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A válasz elküldése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

?>