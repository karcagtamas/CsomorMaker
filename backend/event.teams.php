<?php 
    function getEventTeams($eventId){
        global $db;

        $sql = "CALL getEventTeams(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $eventId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteEventTeam($teamId){
        global $db;

        $sql = "CALL deleteEventTeam(?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $teamId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az csapat hozzáadása az eseményhez sikeretelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az csapat sikeresen hozzáadva az eseményhez!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function updateEventTeam($teamId, $name){
        global $db;

        $sql = "CALL updateEventTeam(?, ?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("is", $teamId, $name);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az csapat frissítése sikeretelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az csapat sikeresen frissítve!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function getEventTeamMembers($teamId){
        global $db;

        $sql = "CALL getEventTeamMembers(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $teamId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function deleteEventTeamMember($teamMemberId){
        global $db;

        $sql = "CALL deleteEventTeamMember(?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $teamMemberId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az csapat tag törlése sikeretelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az csapat tag sikeresen törölve!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setEventTeamMemberDeposit($teamMemberId){
        global $db;

        $sql = "CALL setTeamMemberDepositStatus(?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $teamMemberId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az csapat tag előleg státuszának átátllítása sikeretelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az csapat tag előleg státusza sikeresen átállítva!';
        }
        echo json_encode($array);
        $stmt->close();
    }

    function setEventTeamMemberCost($teamMemberId){
        global $db;

        $sql = "CALL setTeamMemberCostStatus(?);";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $teamMemberId);
        $stmt->execute();

        if ($stmt->errno){
            $array['response'] =  'fail';
            $array['message'] = 'Az csapat tag fizetési státuszának átátllítása sikeretelen!';
        }else{
            $array['response'] =  'success';
            $array['message'] = 'Az csapat tag fizetési státusza sikeresen átállítva!';
        }
        echo json_encode($array);
        $stmt->close();
    }

?>