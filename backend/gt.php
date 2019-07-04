<?php 
    function getGts(){
        global $db;

        $sql = "CALL getGts(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $_SESSION['userId']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateGt($gt){
        global $db;

        $sql = "CALL updateGt(?, ?, ?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("iisi", $gt['id'], $gt['year'], $gt['tShirtColor'], $gt['days']);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gólyatábor frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gólyatábor frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function addGt($year){
        global $db;

        $sql = "CALL addGt(?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $year, $_SESSION['userId']);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gólyatábor létrehozása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gólyatábor létrehozása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function lockGt($gtId){
        global $db;

        $sql = "CALL lockGt(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gólyatábor zárolás/feloldása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gólyatábor zárolás/feloldása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function getEventAccessLevel($gtId){
        global $db;

        $sql = "CALL gtAccessLevel(?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $gtId, $_SESSION['userId']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $row = $result->fetch_assoc();

        echo json_encode($row['accessLevel']);
        $stmt->close();
    }

?>