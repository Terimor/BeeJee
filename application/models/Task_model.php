<?php


class Task_model extends Base_Model
{
    public function getTasks($page, $order){
        $start = (int)(($page - 1) * TASKS_PER_PAGE);
        $tasks_per_page = TASKS_PER_PAGE;
        $order_by = $order->order_by;
        $direction = $order->direction;

        //sql injections protect for sort
        if(in_array($direction, ['ASC','DESC'])
        && in_array($order_by, ['id','user_name','user_email','status'])){
            $result['tasks'] = $this->db->select("SELECT * FROM tasks ORDER BY $order_by $direction LIMIT $start, $tasks_per_page");
        }else{
            die('Неверный тип сортировки.');
        }

        $result['total_amount'] = $this->db->select('SELECT COUNT(*) as count FROM tasks')[0]['count'];

        return $result;
    }

    public function addTask($task){
        $result = array(
            'result' => true,
            'message' => ''
        );


        if(strlen($task->text)){
            if(strlen($task->user_name)){
                if(filter_var($task->user_email,FILTER_VALIDATE_EMAIL)){
                    $this->db->execute('INSERT INTO tasks(user_name, user_email, text) 
                        VALUES(:user_name, :user_email, :text)',array(
                        'user_name' => $task->user_name,
                        'user_email' => $task->user_email,
                        'text' => $task->text,
                    ));
                }else{
                    $result['result'] = false;
                    $result['message'] .= 'Неверная почта. ';
                }
            }else{
                $result['result'] = false;
                $result['message'] .= 'Имя не может быть пустым. ';
            }
        }else{
            $result['result'] = false;
            $result['message'] .= 'Текст задачи не может быть пустым. ';
        }

        return $result;
    }

    public function editTaskText($id, $text){
        $result = array(
            'result' => true,
            'message' => ''
        );
        if(strlen($text)){
            $this->db->execute('UPDATE tasks SET text = :text, is_edited = "1" WHERE id = :id ', array(
                'id' => $id,
                'text' => $text
            ));
        }else{
            $result['result'] = false;
            $result['message'] .= 'Текст задачин не может быть пустым. ';
        }

        return $result;
    }

    public function completeTask($id){
        $this->db->execute('UPDATE tasks SET status = "1" WHERE id = :id', array('id' => $id));
    }
}