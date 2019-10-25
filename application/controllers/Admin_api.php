<?php


class Admin_api extends Base_Controller
{
    private $task_model;
    public function __construct(){
        parent::__construct();

        if(!($_SESSION['is_login'] ?? false)){
            die(json_encode(array(
                'result' => false,
                'message' => 'Отказано в доступе'
            )));
        }

        $this->task_model = $this->load->model('Task_model');
    }

    public function editTaskText(){
        $task = $this->payload_data();
        echo json_encode($this->task_model->editTaskText($task->id, $task->text));
    }

    public function completeTask(){
        $id = $this->get('id');
        $this->task_model->completeTask($id);
        echo json_encode(array('result' => true));
    }
}