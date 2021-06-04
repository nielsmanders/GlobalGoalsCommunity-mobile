<?php

    if ($User->check()) {

        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            if ($id == 'achieved') {
                include("achievements/achieved.php");
                $template_vars['achievements_page'] = "achieved";
            } else if ($id == 'not-achieved') {
                // // include("achievements/not-achieved.php");
                // $template_vars['achievements_page'] = "not-achieved";
                header("HTTP/1.0 404 Not Found");
                header("Location: /404/");
                exit;
            } else {
                header("HTTP/1.0 404 Not Found");
                header("Location: /404/");
                exit;
            }
        } else {
            // include("achievements/achievements.php");
            $template_vars['achievements_page'] = "achievements";
        }

    } else {
        header("Location: /login/");
        exit;
    }

?>