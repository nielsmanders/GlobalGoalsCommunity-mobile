<?php

    $user = $User->get_user_information();

    if ($user) {
        $template_vars['user'] = $user;
    }

?>