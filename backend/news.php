<?php 
    function getNews(){
        global $db;

        $sql = "CALL getNews();";
        

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

    function updateNews($id, $text){
        global $db;

        $sql = "CALL updateNews(?, ?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("isi", $id, $text, $_SESSION['userId']);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A hír frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A hír frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function addNews($text){
        global $db;

        $sql = "CALL addNews(?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("si", $text, $_SESSION['userId']);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A hír létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A hír létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteNews($id){
        global $db;

        $sql = "CALL deleteNews(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A hír törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A hír törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

?>