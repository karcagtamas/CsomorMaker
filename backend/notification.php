<?php 
    function getNotifications(){
        global $db;

        $sql = "CALL getNotifications(?);";
        

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
?>