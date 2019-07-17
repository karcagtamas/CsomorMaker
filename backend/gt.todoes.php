<?php 
    function getGtTodoes($gtId){
        global $db;

        $sql = "CALL getGtTodoes(?);";
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

    function addGtTodo($gtId, $text, $importance, $exp){
        global $db;

        $sql = "CALL addGtTodo(?, ?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("isis", $gtId, $text, $importance, $exp);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az teendő létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A teendő létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteGtTodo($todoId){
        global $db;

        $sql = "CALL deleteGtTodo(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az teendő törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A teendő törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateGtTodo($todoId, $text, $importance, $exp){
        global $db;

        $sql = "CALL updateGtTodo(?, ?, ?, ?);";
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
?>