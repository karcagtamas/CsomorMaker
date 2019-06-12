<?php 
    session_start();

    header("Access-Control-Allow-Origin: http://localhost:4200", false);
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