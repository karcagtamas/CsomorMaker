<?php 
    function getGtForGen($gtId){
        global $db;
        $sql = "CALL getGt(?)";
        $stmt = $db->prepare($sql); 
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        $result = $stmt->get_result();
        $gt = $result->fetch_assoc();
        $stmt->close();
        return $gt;
    }

    function getGtWorkersForGen($gtId){
        global $db;
        $sql = "CALL getLowGtWorkers(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        $result = $stmt->get_result();
        $workers = [];
        while($row = $result->fetch_assoc()){
            array_push($workers, $row);
        }
        $stmt->close();

        for ($i=0; $i < count($workers); $i++) { 
            $sql = "CALL getGtWorkerTables(?, ?);";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("ii", $workers[$i]['id'], $gtId);
            $stmt->execute();
            $result = $stmt->get_result();
            $tables = [];
            while($row = $result->fetch_assoc()){
                array_push($tables, $row);
            }
            $stmt->close();
            $workers[$i]['tables'] = $tables;

            $sql = "CALL getGtWorkStatuses(?, ?);";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("ii", $workers[$i]['id'], $gtId);
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

    function getGtWorksForGen($gtId){
        global $db;
        $sql = "CALL getGtWorks(?);";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        $result = $stmt->get_result();
        $works = [];
        while($row = $result->fetch_assoc()){
            array_push($works, $row);
        }
        $stmt->close();
    
        return $works;
    }

    function setWorks($gt, $works, $workers){
        for ($i=0; $i < count($works); $i++) { 
            $works[$i]['workers'] = [];
        }
        return $works;
    }

    function setWorkers($gt, $works, $workers){
        for ($i=0; $i < count($workers); $i++) { 
            $workers[$i]['countOfBigWorks'] = 1;
            $workers[$i]['countOfSmallWorks'] = 1;
            for ($j=0; $j < count($workers[$i]['tables']); $j++) { 
                $workers[$i]['tables'][$j]['work'] = null;
                $workers[$i]['tables'][$j]['workId'] = null;
            }
        }
        $countOfBigs = getCountOfBigWorks($works);
        $index = 0;
        for ($i=0; $i < $countOfBigs; $i++) { 
            $workers[$index]['countOfBigWorks']++;
            $index++;
            if($index == count($workers)){
                $index = 0;
            }
        }
        $countOfSmalls = getCountOfSmallWorks($works);
        $index = count($workers) - 1;
        for ($i=0; $i < $countOfSmalls; $i++) { 
            $workers[$index]['countOfSmallWorks']++;
            $index--;
            if ($index == -1){
                $index = count($workers) - 1;
            }
        }
        return $workers;
    }

    function getCountOfBigWorks($works){
        $count = 0;
        foreach ($works as $work) {
            $hour = $work['endHour'] - $work['startHour'];
            if ($hour > 6){
                $count += $work['workerCount'];
            }
        }
        return $count;
    }

    function getCountOfSmallWorks($works){
        $count = 0;
        foreach ($works as $work) {
            $hour = $work['endHour'] - $work['startHour'];
            if ($hour <= 6){
                $count += $work['workerCount'];
            }
        }
        return $count;
    }

    function isValidWorkerIndex($index, $work, $workers){
        $worker = $workers[$index];
        if (in_array($worker['id'], $work['workers'])){
            return true;
        }
        if ($work['workerCount'] > 6){
            if ($worker['countOfBigWorks'] == 0){
                return true;
            }
        }else{
            if ($worker['countOfSmallWorks'] == 0){
                return true;
            }
        }
        for ($i=0; $i < count($worker['statuses']); $i++) { 
            if ($worker['statuses'][$i]['workId'] == $work['id']){
                if (!$worker['statuses'][$i]['isActive']){
                    return true;
                }
            }
        }
        return false;
    }

    function checkGen($gt, $works, $workers){
        if (isLocked($gt)){
            $res['response'] = 'fail';
            $res['message']= 'A gólyatábor zárolva van!';
            echo json_encode($res);
            return false;
        }
        if (!checkWorkNeeded($gt, $works, $workers)){
            $res['response'] = 'fail';
            $res['message']= 'Valamely poszthoz nincs elég humánunk!';
            echo json_encode($res);
            return false;
        }
        if (!checkOverlaps($gt, $works, $workers)){
            $res['response'] = 'fail';
            $res['message']= 'Vannak egymás metsző események. amik kizárják egymást!';
            echo json_encode($res);
            return false;
        }
        return true;
    }

    function isLocked($gt){
        if ($gt['isLocked']){
            return true;
        }
        return false;
    }

    function checkWorkNeeded($gt, $works, $workers){
        foreach ($works as $work) {
            $countOfWorkers = getCountOfWorkers($work, $workers);
            if ($work['workerCount'] > $countOfWorkers){
                return false;
            }
        }
        return true;
    }

    function getCountOfWorkers($work, $workers){
        $count = 0;
        foreach ($workers as $worker) {
            foreach ($worker['statuses'] as $status) {
                if ($status['workId'] == $work['id'] && $status['isActive']){
                    $count++;
                }
            }
        }
        return $count;
    }

    function checkOverlaps($gt, $works, $workers){   
        for ($i=0; $i < count($works); $i++) { 
            for ($j=$i + 1; $j < count($works); $j++) { 
                $work1 = $works[$i];
                $work2 = $works[$j];
                // Check
                if (isOverlap($work1, $work2)){
                    $work1Available = getCountOfWorkers($work1, $workers);
                    $work2Available = getCountOfWorkers($work2, $workers);
                    $available = $work1Available > $work2Available ? $work1Available : $work2Available;
                    if ($available < $work1['workerCount'] + $work2['workerCount']){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function isOverlap($work1, $work2){
        if ($work1['day'] != $work2['day']){
            return false;
        }else{
            if ($work1['startHour'] <= $work2['startHour'] && $work2['startHour'] <= $work1['endHour']){
                return true;
            }
            if ($work1['startHour'] <= $work2['endHour'] && $work2['endHour'] <= $work1['endHour']){
                return true;
            }
            return false;
        }
    }

    function save($gt, $works, $workers){
        var_dump($workers);
    }

?>