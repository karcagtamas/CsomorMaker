<?php 
    $db->set_charset('utf8');
    function getEventForGen($eventId){
        global $db;
        $sql = "CALL getEvent(?)";
        $stmt = $db->prepare($sql); 
        $stmt->bind_param("i",$eventId);
        $stmt->execute();
        $result = $stmt->get_result();
        $event = $result->fetch_assoc();
        $stmt->close();
        return $event;
    }

    function getWorkersForGen($eventId){
        global $db;
        $sql = "CALL getEventLowWorkers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i",$eventId);
        $stmt->execute();
        $result = $stmt->get_result();
        $workers = [];
        while($row = $result->fetch_assoc()){
            array_push($workers, $row);
        }
        $stmt->close();

        for ($i=0; $i < count($workers); $i++) { 
            $sql = "CALL getWorkerTablesWithoutWorkNames(?, ?);";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("ii",$workers[$i]['id'], $eventId);
            $stmt->execute();
            $result = $stmt->get_result();
            $tables = [];
            while($row = $result->fetch_assoc()){
                array_push($tables, $row);
            }
            $stmt->close();
            $workers[$i]['tables'] = $tables;

            $sql = "CALL getWorkStatuses(?, ?);";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("ii",$workers[$i]['id'], $eventId);
            $stmt->execute();
            $result = $stmt->get_result();
            $statuses = [];
            while($row = $result->fetch_assoc()){
                array_push($statuses, $row);
            }
            $stmt->close();
            $workers[$i]['statuses'] = $statuses;
        }

        return $workers;
    }

    function getWorksForGen($eventId){
        global $db;
        $sql = "CALL getWorks(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i",$eventId);
        $stmt->execute();
        $result = $stmt->get_result();
        $works = [];
        while($row = $result->fetch_assoc()){
            array_push($works, $row);
        }
        $stmt->close();

         for ($i=0; $i < count($works); $i++) { 
            $sql = "CALL getWorkTablesWithoutWorkerNames(?);";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("i",$works[$i]['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $tables = [];
            while($row = $result->fetch_assoc()){
                array_push($tables, $row);
            }
            $stmt->close();
            $works[$i]['tables'] = $tables;
        }
        
        return $works;
    }

    function checkInput($event, $workers, $works){
        $res = [];
        if (isLocked($event)){
            $res['response'] = 'fail';
            $res['message']= 'Event is locked!';
            echo json_encode($res);
            return false;
        }

        if (checkEmptyPersons($workers)){
            $res['response'] = 'fail';
            $res['message']= 'There are some people who has zero avaiable hours!';
            echo json_encode($res);
            return false;
        }

        if (checkEmptyWorkPersons($workers)){
            $res['response'] = 'fail';
            $res['message']= 'There are some people who has zero valid works!';
            echo json_encode($res);
            return false;
        }

        if (checkEmptyWorks($works)){
            $res['response'] = 'fail';
            $res['message']= 'There are some work who has zero active hours!';
            echo json_encode($res);
            return false;
        }

        if (checkHours($event, $works, $workers)){
            $res['response'] = 'fail';
            $res['message']= 'In some hour, we have fewer workers than works!';
            echo json_encode($res);
            return false;
        }

        if (checkSum($event, $works, $workers)){
            $res['response'] = 'fail';
            $res['message']= 'We have too few workers!';
            echo json_encode($res);
            return false;
        }

        return true;
    }

    function isLocked($event){
        if ($event['isLocked']){
            return true;
        }
        else{
            return false;
        }
    }

    function checkEmptyPersons($workers){
        foreach ($workers as $worker) {
           $count = getCountOfWorkerAvaiableHours($worker);
           if ($count == 0){
               return true;
           }
        }
        return false;
    }

    function checkEmptyWorks($works){
        foreach ($works as $work) {
           $count = getCountOfWorkActiveHours($work);
           if ($count == 0){
               return true;
           }
        }
        return false;
    }


    function checkEmptyWorkPersons($workers){
        foreach ($workers as $worker) {
           $f = true;
           foreach ($worker['statuses'] as $status) {
               if ($status['isValid']){
                   $f = false;
               }
           }
           if ($f){
               return true;
           }
        }
        return false;
    }

    function checkHours($event, $works, $workers){
        for ($i=0; $i < $event['length']; $i++) {
            $activeWorks = 0;
            $avaiableWorkers = 0;

            foreach ($workers as $worker) {
                if ($worker['tables'][$i]['isAvaiable']){
                    $avaiableWorkers++;
                }
            }

            foreach ($works as $work) {
                if ($work['tables'][$i]['isActive']){
                    $activeWorks++;
                }
            }

            // TODO : BLOCKED WORKS

            if ($activeWorks > $avaiableWorkers){
                return true;
            }
        }
        return false;
    }

    function checkSum($event, $works, $workers){
        $sumOfWorks = 0;
        $sumOfWorkers = 0;

        foreach ($workers as $worker) {
            $sumOfWorkers += getCountOfWorkerAvaiableHours($worker);
        }

        foreach ($works as $work) {
            $sumOfWorks += getCountOfWorkActiveHours($work);
        }

        if ($sumOfWorks > $sumOfWorkers * 3 / 4){
            return true;
        }
        return false;
    }

    function getCountOfWorkerAvaiableHours($worker){
        $count = 0;
        foreach ($worker['tables'] as $table) {
            if ($table['isAvaiable']){
                $count++;
            }
        }
        return $count;
    }

    function getCountOfWorkActiveHours($work){
        $count = 0;

        foreach ($work['tables'] as $table) {
            if ($table['isActive']){
                $count++;
            }
        }
        return $count;
    }

    function workerIsValid($worker, $id, $work = NULL){
        if ($worker['workerHours'] == 0){
            return false;
        }

        if (!$worker['tables'][$id]['isAvaiable']){
            return false;
        }

        if ($worker['tables'][$id]['workId'] != NULL){
            return false;
        }

        if ($work){
            $f = false;
            foreach ($worker['statuses'] as $status) {
                if ($status['workId'] == $work['id'] && !$status['isValid']){
                    return false;
                }
            }
        }

        if (checkPast($worker, $id)){
            return false;
        }

        return true;
    }

    function checkPast($worker, $id){
        if ($id < 3){
            return false;
        }
        if ($worker['tables'][$id - 1]['workId'] && $worker['tables'][$id - 2]['workId'] && $worker['tables'][$id - 3]['workId']){
            return true;
        }
        return false;
    }

    function setWorks($event, $workers, $works){
        for ($i=0; $i < count($works); $i++) { 
            for ($j=0; $j < count($works[$i]['tables']); $j++) { 
               $works[$i]['tables'][$j]['worker'] = null;
               $works[$i]['tables'][$j]['workerId'] = null;
            }
        }
        return $works;
    }

    function setWorkers($event, $workers, $works){
        for ($i=0; $i < count($workers); $i++) { 
            $workers[$i]['workerHours'] = 0;
            for ($j=0; $j < count($workers[$i]['tables']); $j++) { 
               $workers[$i]['tables'][$j]['work'] = null;
               $workers[$i]['tables'][$j]['workId'] = null;
            }
        }
        $hours = 0;
        foreach ($works as $work) {
            $hours += getCountOfWorkActiveHours($work);
        }
        $index = 0;
        do {
            if ($workers[$index]['workerHours'] < getCountOfWorkerAvaiableHours($workers[$index])){
                $workers[$index]['workerHours']++;
                $hours--;
            }
            $index++;
            if ($index == count($workers)){
                $index = 0;
            }
        } while ($hours > 0);

        return $workers;
    }

    function save($event, $works, $workers){
        global $db;

        foreach ($workers as $worker) {
            foreach ($worker['tables'] as $table) {
                $sql = "CALL updateWorkerTable(?, ?, ?, ?, ?);";
                $stmt = $db->prepare($sql);
                $stmt->bind_param("iiiii", $worker['id'], $event['id'], $table['day'], $table['hour'], $table['workId']);
                $stmt->execute();
                $stmt->close();
            }
        }

        foreach ($works as $work) {
            foreach ($work['tables'] as $table) {
                $sql = "CALL updateWorkTable(?, ?, ?, ?);";
                $stmt = $db->prepare($sql);
                $stmt->bind_param("iiii", $work['id'], $table['day'], $table['hour'], $table['workerId']);
                $stmt->execute();
                $stmt->close();
            }
        }

        $sql = "CALL setReadyEvent(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $event['id']);
        $stmt->execute();
        $stmt->close();
    }

?>