<?php   

    if (isset($_POST['action']) && $_POST['action'] == "add-content") {
        $formData = $_POST;
        $formData += $_FILES;

        if (empty($formData['header-image']['name'])) {
            $formData['header-image'] = NULL;
        }

        if (isset($formData['video'])) {
            $return = $Creation->new($formData['title'], $formData['shortDescription'], $formData['content'], $formData['video'], $formData['type'], $formData['sdgs'], $formData['header-image']);
        } else {
            $return = $Creation->new($formData['title'], $formData['shortDescription'], $formData['content'], NULL, $formData['type'], $formData['sdgs'], $formData['header-image']);
        }

        if ($return != 1) {
            // print_r($return);
            $template_vars['error'] = $return;
            $template_vars['formData'] = $formData;
        } else {
            switch ($formData['type']) {
                case 1:
                    header("Location: /add-content/how-to/");
                    break;
                case 2:
                    header("Location: /add-content/article/");
                    break;
                case 3:
                    header("Location: /add-content/video/");
                    break;
                case 4:
                    header("Location: /add-content/podcast/");
                    break;
                default:
                    header("Location: /add-content/");
                    break;
            }
        }
    }

    if ($User->check()) {

        if (isset($_GET['id'])) {

            $template_vars['bottom_scripts'] = ["add-content"];

            $types = $Creation->get_types();
            
            if (in_array($_GET['id'], $types)) {
                $template_vars['add_content_page'] = $_GET['id'];

                // Get sdgs
                $sdgs = $Sdg->get_sdgs();
                $template_vars['sdgs'] = $sdgs;
            } else {
                header("HTTP/1.0 404 Not Found");
                header("Location: /404/");
                exit;
            }
            
        } else {
            header("Location: /add-content/article/");
            exit;
        }

    } else {
        header("Location: /login/");
        exit;
    }

?>