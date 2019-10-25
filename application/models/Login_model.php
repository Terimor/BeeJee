<?php


class Login_model
{
    public function login($login, $password){
        $result = array(
            'result' => false
        );
        if($login === 'admin' && $password === '123'){
            $_SESSION['is_login'] = true;
            $result['result'] = true;
        }else{
            $result['message'] = 'Неверный логин или пароль!';
        }

        return $result;
    }
}