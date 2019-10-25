<?php

define('ENVIRONMENT', 'PRODUCTION');

session_start();
include_once 'application/configs/Config.php';
include_once 'application/configs/Task_config.php';
include_once 'core/Loader.php';
include_once 'core/Base_Controller.php';
include_once 'core/Base_Model.php';
include_once 'core/MyPDO.php';
include_once 'core/Database.php';

$controller = $_GET['controller'] ?? $default_controller;
$method = $_GET['action'] ?? 'index';

if(file_exists(CONTROLLER_PATH.$controller.'.php')){
    include CONTROLLER_PATH."$controller.php";
    $controller = new $controller();
    if(method_exists($controller, $method)){
        $controller->$method();
    }else{
        die('Action not found');
    }
}else{
    die('Controller not found');
}
