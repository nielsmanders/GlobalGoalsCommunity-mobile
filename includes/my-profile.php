<?php 

    if ($User->check()) {
        
        if (isset($_GET['id'])) {
            include("profile/edit-profile.php");
            $template_vars['profile_page'] = "edit";
        } else {
            include("profile/my-profile.php");
            $template_vars['profile_page'] = "my-profile";
        }
       
    } else {
        header("HTTP/1.0 404 Not Found");
        header("Location: /404/");
        exit;
    }

?>