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

    $isLoggedIn = isset($_SESSION['userId']);
    require 'connect.php';
    $_POST = json_decode(file_get_contents('php://input'), true);
        
    $url = explode("/", $_SERVER['REQUEST_URI']);

    if ($url[1] != 'api'){
        echo '{"response" : "bad-request", "message" : "Bad request url!"}';
    }
    else{
        $group = $url[2];
        $event = $url[3];
        switch ($group) {
            case 'user':
                require 'user.php';
                switch ($event) {
                case 'login':
                    login($_POST['username'], $_POST['password']);
                    break;

                case 'reg':
                    registration($_POST['username'], $_POST['email'], $_POST['password']);
                    break;

                case 'logout':
                    logout();
                    break;
                
                case 'isloggedin':
                    echo $isLoggedIn;
                    break;

                case 'isadmin':
                    isAdmin();
                    break;
                
                default:
                    echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                    break;
                }
                break;

            case 'event':
                require 'event.php';
                switch ($event) {
                    case 'get':
                        getEvents();
                        break;

                    case 'add':
                        newEvent($_POST['name']);
                        break;

                    case 'get-one':
                        getEvent($_POST['id']);
                        break;

                    case 'update':
                        updateEvent($_POST['event']);
                        break;

                    case 'lock':
                        lock($_POST['id']);
                        break;

                    case 'inc-visitors':
                        increaseVisitors($_POST['id']);
                        break;

                    case 'dec-visitors':
                        decreaseVisitors($_POST['id']);
                        break;

                    case 'inc-injured':
                        increaseInjured($_POST['id']);
                        break;

                    case 'dec-injured':
                        decreaseInjured($_POST['id']);
                        break;

                    case 'get-payouts':
                        getPayOuts($_POST['id']);
                        break;

                    case 'get-payouttypes':
                        getPayOutTypes();
                        break;

                    case 'add-payout':
                        addPayOut($_POST['name'], $_POST['eventId'], $_POST['type'], $_POST['cost']);
                        break;
                    
                    case 'delete-payout':
                        deletePayOut($_POST['id']);
                        break;

                    case 'get-works':
                        getWorks($_POST['id']);
                        break;

                    case 'delete-work':
                        deleteWork($_POST['id']);
                        break;

                    case 'add-work':
                        addWork($_POST['name'], $_POST['eventId']);
                        break;

                    case 'get-work-tables':
                        getWorkTablesWithoutWorkerNames($_POST['id']);
                        break;

                    case 'set-work-table-active':
                        setWorkTableIsActive($_POST['day'], $_POST['hour'], $_POST['work']);
                        break;
                    
                    case 'get-low-workers':
                        getEventLowWorkers($_POST['id']);
                        break;

                    case 'get-worker-tables':
                        getWorkerTablesWithoutWorkNames($_POST['id'], $_POST['event']);
                        break;

                    case 'set-worker-table-avaiable':
                        setWorkerTableIsAvaiable($_POST['day'], $_POST['hour'], $_POST['worker'], $_POST['event']);
                        break;
                        
                    default:
                        echo '{"response" : "bad-event", "message" : "Bad request event!"}';
                        break;
                }
                break;
                
            default:
                echo '{"response" : "bad-request", "message" : "Bad request url!"}';
                break;
        }
    }
    
?>