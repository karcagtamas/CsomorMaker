<?php 
    session_start();

    if ($_SERVER['SERVER_NAME'] == "localhost"){
        header("Access-Control-Allow-Origin: http://localhost:4200", false);
    }
    else{
        header("Access-Control-Allow-Origin: http://csomormaker.karcags.hu", false);
    }
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/json');
    header('Access-Control-Allow-Credentials: true');

    if ($_SERVER['REQUEST_METHOD'] == "OPTIONS"){
        die();
    }

    $isLoggedIn = isset($_SESSION['userId']);
    require 'connect.php';
    $_POST = json_decode(file_get_contents('php://input'), true);
        
    $url = explode("/", $_SERVER['REQUEST_URI']);

    if ($url[1] != 'api'){
        echo '{"response" : "bad-request", "message" : "Bad request url!"}';
    }
    else{
        if ($isLoggedIn){
            $group = $url[2];
            switch ($group) {
                case 'user':
                    $event = $url[3];
                    require 'user.php';
                    switch ($event) {
                        case 'logout':
                            logout();
                            break;
                        
                        case 'isloggedin':
                            echo $isLoggedIn;
                            break;

                        case 'isadmin':
                            isAdmin();
                            break;

                        case 'get-id':
                            echo $_SESSION['userId'];
                            break;
                        
                        default:
                            echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                            break;
                    }
                    break;

                case 'event':
                    $subgroup = $url[3];
                    require 'event.php';
                    switch ($subgroup) {
                        case 'get':
                            getEvents();
                            break;

                        case 'add':
                            newEvent($_POST['name']);
                            break;

                        case 'get-one':
                            getEvent($url[4]);
                            break;

                        case 'update':
                            updateEvent($_POST['event']);
                            break;

                        case 'lock':
                            lock(intval($url[4]));
                            break;
                        
                        case 'visitors':
                            $event = $url[4];
                            switch ($event) {
                                case 'inc':
                                    increaseVisitors($url[5]);
                                    break;

                                case 'dec':
                                    decreaseVisitors($url[5]);
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'injured':
                            $event = $url[4];
                            switch ($event) {
                                case 'inc':
                                    increaseInjured($url[5]);
                                    break;

                                case 'dec':
                                    decreaseInjured($url[5]);
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;
                        
                        case 'works':
                            $event = $url[4];
                            require 'event.generator.php';
                            switch ($event) {
                                case 'get':
                                    getWorks($url[5]);
                                    break;
                                
                                case 'delete':
                                    deleteWork($url[5]);
                                    break;

                                case 'add':
                                    addWork($_POST['name'], $_POST['eventId']);
                                    break;

                                case 'tables':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getWorkTables($url[6]);
                                            break;
                                        
                                        case 'set':
                                            setWorkTableIsActive($_POST['day'], $_POST['hour'], $_POST['work']);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;

                                case 'statuses':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getWorkStatuses($url[7], $url[6]);
                                            break;

                                        case 'set':
                                            setIsValidWorkStatus($_POST['worker'], $_POST['work']);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'workers':
                            $event = $url[4];
                            require 'event.generator.php';
                            switch ($event) {
                                case 'get':
                                    getEventLowWorkers($url[5]);
                                    break;

                                case 'tables':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getWorkerTables($url[6], $url[7]);
                                            break;

                                        case 'set':
                                            setWorkerTableIsAvaiable($_POST['day'], $_POST['hour'], $_POST['worker'], $_POST['event']);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;
                        
                        case 'generate':
                            generate($url[4]);
                            break;

                        case 'payouts':
                            $event = $url[4];
                            require 'event.payouts.php';
                            switch ($event) {
                                case 'get':
                                    getPayOuts($url[5]);
                                    break;

                                case 'add':
                                    addPayOut($_POST['name'], $_POST['eventId'], $_POST['type'], $_POST['cost']);
                                    break;

                                case 'delete':
                                    deletePayOut($url[5]);
                                    break;

                                case 'types':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getPayOutTypes();
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;
                            
                        case 'members':
                            $event = $url[4];
                            require 'event.members.php';
                            switch ($event) {
                                case 'get':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'all':
                                            getEventMembers($url[6]);
                                            break;

                                        case 'none':
                                            getEventNonMembers($url[6]);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;

                                case 'add':
                                    addUserToEvent($_POST['user'], $_POST['event']);
                                    break;

                                case 'delete':
                                    deleteUserFromEvent($_POST['user'], $_POST['event']);
                                    break;

                                case 'update':
                                    updateEventUser($_POST['user'], $_POST['event'],$_POST['role']);
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'roles':
                            $event = $url[4];
                            switch ($event) {
                                case 'get':
                                    getEventRoles();
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'accesslevel':
                            getEventAccessLevel($url[4]);
                            break;

                        case 'disable':
                            disableEvent($url[4]);
                            break;

                        case 'costs':
                            countOfAllCost($url[4]);
                            break;

                        case 'todoes':
                            $event = $url[4];
                            require 'event.todoes.php';
                            switch ($event) {
                                case 'get':
                                    getEventTodoes($url[5]);
                                    break;

                                case 'update':
                                    updateEventTodo($_POST['todo'], $_POST['text'], $_POST['importance'], $_POST['expiration']);
                                    break;

                                case 'set':
                                    setSolvedEventTodo($url[5]);
                                    break;

                                case 'add':
                                    addEventTodo($_POST['event'], $_POST['text'], $_POST['importance'], $_POST['expiration']);
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'messages':
                            $event = $url[4];
                            require 'event.messages.php';
                            switch ($event) {
                                case 'get':
                                    getEventMessages($url[5]);
                                    break;

                                case 'add':
                                    addEventMessage($_POST['event'], $_POST['text'], $_SESSION['userId']);
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;
                        
                        case 'teams':
                            $event = $url[4];
                            require 'event.teams.php';
                            switch ($event) {
                                case 'get':
                                    getEventTeams($url[5]);                               
                                    break;
                                
                                case 'delete':
                                    deleteEventTeam($url[5]);
                                    break;

                                case 'update':
                                    updateEventTeam($_POST['team'], $_POST['name']);
                                    break;

                                case 'add':
                                    addEventTeam($_POST['event'], $_POST['name']);
                                    break;

                                case 'status':
                                    countOfCostAndDeposit($url[5]);
                                    break;

                                case 'members':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getEventTeamMembers($url[6]);
                                            break;

                                        case 'delete':
                                            deleteEventTeamMember($url[6]);
                                            break;

                                        case 'add':
                                            addEventTeamMember($_POST['team'], $_POST['name']);
                                            break;
                                        
                                        case 'deposit':
                                            setEventTeamMemberDeposit($url[6]);
                                            break;

                                        case 'cost':
                                            setEventTeamMemberCost($url[6]);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;
                            
                        default:
                            echo '{"response" : "bad-subgroup", "message" : "Bad request subgroup!"}';
                            break;
                    }
                    break;
                
                case 'gt':
                    $subgroup = $url[3];
                    require 'gt.php';
                    switch ($subgroup) {
                        case 'get':
                            getGts();
                            break;

                        case 'update':
                            updateGt($_POST['gt']);
                            break;

                        case 'add':
                            addGt($_POST['year']);
                            break;

                        case 'lock':
                            lockGt($url[4]);
                            break;

                        case 'accesslevel':
                            gtAccessLevel($url[4]);
                            break;

                        case 'generate':
                            generate($url[4]);
                            break;

                        case 'members':
                            $event = $url[4];
                            require 'gt.members.php';
                            switch ($event) {
                                case 'get':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'all':
                                            getGtMembers($url[6]);
                                            break;

                                        case 'none':
                                            getNonGtMembers($url[6]);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;

                                case 'add':
                                    addGtMember($_POST['gt'], $_POST['user']);
                                    break;

                                case 'delete':
                                    deleteGtMember($_POST['gt'], $_POST['user']);
                                    break;

                                case 'update':
                                    updateGtMember($_POST['gt'], $_POST['user'], $_POST['role']);
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'classes':
                            $event = $url[4];
                            switch ($event) {
                                case 'get':
                                    break;

                                case 'add':
                                    break;

                                case 'update':
                                    break;

                                case 'delete':
                                    break;

                                case 'members':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':

                                            break;

                                        case 'add':
                                            break;

                                        case 'delete':
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;

                                case 'bosses':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            
                                            break;

                                        case 'add':

                                            break;

                                        case 'delete':
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'works':
                            $event = $url[4];
                            require 'gt.generator.php';
                            switch ($event) {
                                case 'get':
                                    getGtWorks($url[5]);
                                    break;

                                case 'add':
                                    addGtWork($_POST['gt'], $_POST['name'], $_POST['day'], $_POST['start'], $_POST['end'], $_POST['workers']);
                                    break;

                                case 'update':
                                    updateGtWork($_POST['work'], $_POST['name'], $_POST['day'], $_POST['start'], $_POST['end'], $_POST['workers']);
                                    break;

                                case 'delete':
                                    deleteGtWork($url[5]);
                                    break;

                                case 'tables':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getGtWorkTables($url[6]);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;

                                case 'statuses':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getGtWorkStatuses($url[6], $url[7]);
                                            break;

                                        case 'set':
                                            $subsubevent = $url[6];
                                            switch ($subsubevent) {
                                                case 'boss':
                                                    setGtWorkStatusIsBoss($url[7], $url[8]);
                                                    break;

                                                case 'active':
                                                    setGtWorkStatusIsActive($url[7], $url[8]);
                                                    break;
                                                
                                                default:
                                                    echo '{"response" : "bad-subsubevent", "message" : "Bad request subsubevent!"}';
                                                    break;
                                            }
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;

                        case 'workers':
                            $event = $url[4];
                            require 'gt.generator.php';
                            switch ($event) {
                                case 'get':
                                    getLowGtWorkers($url[5]);
                                    break;

                                case 'tables':
                                    $subevent = $url[5];
                                    switch ($subevent) {
                                        case 'get':
                                            getGtWorkerTables($url[6]);
                                            break;
                                        
                                        default:
                                            echo '{"response" : "bad-subevent", "message" : "Bad request subevent!"}';
                                            break;
                                    }
                                    break;
                                
                                default:
                                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                                    break;
                            }
                            break;
                        
                        default:
                            echo '{"response" : "bad-subgroup", "message" : "Bad request subgroup!"}';
                            break;
                    }
                    break;
                    
                default:
                    echo '{"response" : "bad-request", "message" : "Bad request url!"}';
                    break;
                }
        }else{
            $group = $url[2];
            switch ($group) {
                case 'user':
                    $event = $url[3];
                    require 'user.php';
                    switch ($event) {
                        case 'login':
                            login($_POST['username'], $_POST['password']);
                            break;

                        case 'reg':
                            registration($_POST['username'], $_POST['email'], $_POST['password']);
                            break;

                        case 'isloggedin':
                            echo $isLoggedIn;
                            break;
                        
                        default:
                            echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                            break;
                    }
                    break;
                
                default:
                    echo '{"response" : "bad-group", "message" : "Bad request group!"}';
                    break;
            }
        }
    }
    
?>