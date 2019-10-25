<?php
$loader = new Loader();

class Loader{

    public function model($name){
        if(file_exists(MODEL_PATH.$name.'.php')){
            include MODEL_PATH."$name.php";
        }else{
            die('model not found');
        }
        return new $name;
    }

    public function view($name, $args = false){
        if(file_exists(VIEW_PATH.$name.'.php')){
            if($args){
                extract($args);
            }
            require VIEW_PATH.$name.'.php';
        }else{
            die('view not found');
        }
    }

    public function config($name){
        if(file_exists(CONFIG_PATH.$name.'.php')){
            include CONFIG_PATH."$name.php";
        }else{
            die('config not found');
        }
        return new $$name();
    }

}