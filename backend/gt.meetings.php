<?php 
    function getGtMeetings($gtId){
        global $db;

        $sql = "CALL getGtMeetings(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }

        $stmt->close();

        for ($i = 0; $i < count($array); $i++) {
            $sql = "CALL getGtMeetingMembers(?);";
        
            $stmt = $db->prepare($sql);
            $stmt->bind_param("i", $array[$i]['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $members = [];
            while($row = $result->fetch_assoc()){
                array_push($members, $row);
            }
            $stmt->close();
            $array[$i]['members'] = $members;
        }

        echo json_encode($array);
    }

    function addGtMeeting($date, $userId, $gt){
        global $db;

        $sql = "CALL addGtMeeting(?, ?, ?);";
        

        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("sii", $date, $userId, $gt);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gyűlés hozzáadása a gólyatáborhoz sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gyűlés hozzáadása a gólyatáborhoz sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function updateGtMeeting($id, $date){
        global $db;

        $sql = "CALL updateGtMeeting(?, ?);";
        

        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("is", $id, $date);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gyűlés frissítése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gyűlés frissítése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function updateGtMeeting($id){
        global $db;

        $sql = "CALL updateGtMeeting(?);";
        

        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gyűlés törlése sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gyűlés törlése sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

    function getGtMeetingMembers($meeting){
        global $db;

        $sql = "CALL getGtMeetingMembers(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $meeting);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setGtMeetingMemberThereStatus($meeting, $user){
        global $db;

        $sql = "CALL setGtMeetingMemberThereStatus(?, ?);";
        

        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("ii", $meeting, $user);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'A gyűlés személyének jelenléti státuszának állítása sikertelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'A gyűlés személyének jelenléti státuszának állítása sikeres!';
        }
        echo json_encode($array);
        $stmt->close();

    }

?>