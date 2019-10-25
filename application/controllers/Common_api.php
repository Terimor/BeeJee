<?php


class Common_api extends Base_Controller
{
    private $task_model;
    public function __construct(){
        parent::__construct();

        $this->task_model = $this->load->model('Task_model');
    }

    public function getTasks(){
        $select_parameters = $this->payload_data();
        echo json_encode($this->task_model->getTasks($select_parameters->page, $select_parameters->order));
    }

    public function addTask(){
        $task = $this->payload_data();
        echo json_encode($this->task_model->addTask($task));
    }

    public function getInitInfo(){
        echo json_encode(array(
            'is_admin' => $_SESSION['is_login'] ?? false,
            'tasks_per_page' => TASKS_PER_PAGE
        ));
    }
}