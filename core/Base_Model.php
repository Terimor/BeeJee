<?php


class Base_Model
{
    protected $load;
    protected $db;
    public function __construct(){
        $this->load = new Loader();
        $this->db = new Database();
    }

}