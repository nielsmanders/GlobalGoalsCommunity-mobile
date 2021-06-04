<?php 

    if ($User->check()) {
        $template_vars['user_name'] = $User->name($_SESSION['user_id']);       
    } else {
        header("HTTP/1.0 404 Not Found");
        header("Location: /404/");
        exit;
    }

?>