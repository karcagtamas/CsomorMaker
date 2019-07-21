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

    function gtAccessLevel($gtId){
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

    function countOfAllPaid($gtId){
        global $db;

        $sql = "CALL countOfAllPaid(?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $gtId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $row = $result->fetch_assoc();

        echo json_encode($row);
        $stmt->close();
    }

    function setGtReadyStatus($gtId, $value){
        global $db;

        $sql = "CALL setGtReadyStatus(?, ?);";
        

        $stmt = $db->prepare($sql);
        $stmt->bind_param("is", $gtId, $value);
        $stmt->execute();
        $stmt->close();
    }

    function generate($gtId){
        global $db;
        require 'generator.gt.php';

        $gt = getGtForGen($gtId);

        $workers = getGtWorkersForGen($gtId);

        $works = getGtWorksForGen($gtId);

        if (checkGen($gt, $works, $workers)){
            $workers = setWorkers($gt, $works, $workers);
            
            $works = setWorks($gt, $works, $workers);

            for ($i=0; $i < count($works); $i++) { 
                $work = $works[$i];
                $count = 0;
                $tries = 0;
                do {
                    $index;
                    do {
                        $index = rand(0, count($workers) - 1);
                        $tries++;
                    } while (isValidWorkerIndex($index, $work, $workers) && $tries < 1000);
                    $worker = $workers[$index];

                    if ($tries < 1000){
                        array_push($works[$i]['workers'], $worker['id']);
                        $count++;
                        if ($work['workerCount'] > 6){
                            $workers[$index]['countOfBigWorks']--;
                        }else{
                            $workers[$index]['countOfSmallWorks']--;
                        }
                        
                        for ($k=0; $k < count($workers[$index]['tables']); $k++) {
                            $table = $workers[$index]['tables'][$k];
                            if ($table['day'] == $work['day'] && $table['hour'] >= $work['startHour'] && $table['hour'] <= $work['endHour']){
                                $workers[$index]['tables'][$k]['workId'] = $work['id'];
                                $workers[$index]['tables'][$k]['work'] = $work['name'];
                            }
                        }   
                    }
                    
                    // $tries++;
                } while ($count < $work['workerCount'] && $tries < 1000);
            }
            if ($tries < 1000){
                // TODO SAVE
                save($gt, $works, $workers);
                $res['response'] = 'success';
                $res['message']= 'A generálás sikeres volt! Yee!';
            }else{
                $res['response'] = 'fail';
                $res['message']= 'A generálás sikertelen volt! Sorry :/';
            }
            echo json_encode($res);
        }
    }

?>