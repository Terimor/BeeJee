<?php


class Base_Controller
{
    public function __construct(){
        $this->load = new Loader();
    }

    public function post($key){
        return $_POST[$key] ?? null;
    }

    public function get($key){
        return $_GET[$key] ?? null;
    }

    public function payload_data(){
        return json_decode(file_get_contents("php://input"));
    }

    public function redirect($uri){
        header('Location: '.$uri);
    }
}