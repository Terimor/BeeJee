<?php


class Database
{
    public function select(string $query_string, $args = null){
        return MyPDO::select($query_string, $args);
    }

    public function execute(string $query_string, $args = null){
        return MyPDO::execute($query_string, $args);
    }

    public function debug_query(string $query_string, $args = null){
        MyPDO::debug($query_string, $args);
    }
}