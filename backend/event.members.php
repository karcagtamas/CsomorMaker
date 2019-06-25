<?php
    function getEventMembers($event){
        global $db;

        $sql = "CALL getEventMembers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $event);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $array = [];
        while($row = $result->fetch_assoc()){
            array_push($array, $row);
        }
        echo json_encode($array);
        $stmt->close();
    }

    function addUserToEvent($user, $event){
        global $db;

        $sql = "CALL addUserToEvent(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $role = 3;
        $stmt->bind_param("iii", $user, $event, $role);
        $stmt->execute();
       if ($stmt->errno){
            $array['response'] =  'add-user-to-event-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'add-user-to-event-success';
            $array['message'] = 'The user adding to event was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function deleteUserFromEvent($user, $event){
        global $db;

        $sql = "CALL deleteUserFromEvent(?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ii", $user, $event);
        $stmt->execute();
       if ($stmt->errno){
            $array['response'] =  'delete-user-from-event-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'delete-user-from-event-success';
            $array['message'] = 'The user deleting to event was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function updateEventUser($user, $event, $role){
        global $db;

        $sql = "CALL updateUserEvenetRole(?, ?, ?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("iii", $user, $event, $role);
        $stmt->execute();
       if ($stmt->errno){
            $array['response'] =  'update-event-user-failure';
            $array['message'] = 'Something went wrong!';
            echo json_encode($array);
        }else{
             $array['response'] =  'update-event-user-success';
            $array['message'] = 'The event user updating was success!!';
            echo json_encode($array);
        }
        $stmt->close();

    }

    function getEventNonMembers($event){
          global $db;

        $sql = "CALL getNotMembers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $event);
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