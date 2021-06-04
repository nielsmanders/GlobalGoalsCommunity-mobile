<?php

    if (isset($_POST['action']) && $_POST['action'] == "edit-user") {
        $formData = $_POST;
        $formData += $_FILES;

        if (empty($formData['avatar']['name'])) {
            $formData['avatar'] = NULL;
        }

        $return = $User->update($formData['id'], $formData['firstname'], $formData['lastname'], $formData['email'], $formData['phone'], $formData['date_of_birth'], $formData['avatar'], $formData['bio'], $formData['city'], $formData['country'], $formData['twitter'], $formData['instagram'], $formData['facebook'], $formData['linkedin'], $formData['youtube']);
        
        if ($return != 1) {
            $template_vars['error'] = $return;
            $template_vars['formData'] = $formData;
        } else {
            header("Location: /my-profile/");
        }
    }

    $template_vars['bottom_scripts'] = ["edit-profile-page"];

    $user = $User->get_user_information();
    $template_vars['user'] = $user;

?>