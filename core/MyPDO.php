<?php

class MyPDO
{
    protected static $instance = null;

    private function __construct()
    {
    }

    private function __clone()
    {
    }

    public static function newInstance()
    {
        if (self::$instance === null) {
            try {
                $opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);
                self::$instance = new PDO('mysql:host=localhost;dbname=beejeedb;charset=utf8', 'root', '', $opt);
            } catch (PDOException $e) {
                print("Error! " . $e->getMessage() . "<br>");
                die();
            }
        }
        return self::$instance;
    }

    public static function select($sql_request, $args = null)
    {
        self::newInstance();
        $stm = self::$instance->prepare($sql_request);
        $stm->execute($args);
        return $stm->fetchAll();
    }

    public static function execute($sql_request, $args = null)
    {
        self::newInstance();
        self::$instance->prepare($sql_request);
        $stm = self::$instance->prepare($sql_request);
        return $stm->execute($args);
    }

    public static function debug($sql_request, $args = null)
    {
        self::newInstance();
        $stm = self::$instance->prepare($sql_request);
        $stm->execute($args);
        $stm->debugDumpParams();
    }

    public static function last_insert_id()
    {
        return self::$instance->lastInsertId();
    }
}
