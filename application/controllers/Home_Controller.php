<?php


class Home_Controller extends Base_Controller
{
    public function index(){
        $data['login'] = $_SESSION['is_login'] ?? false;
        $this->load->view('home', $data);
    }

    public function login(){
        $data = $this->payload_data();
        $model = $this->load->model('Login_model');
        $result = $model->login($data->login, $data->password);
        echo json_encode($result);
    }

    public function logout(){
        session_destroy();
        $this->redirect('/');
    }
}