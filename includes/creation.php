<?php

    // If there is no id or name show 404
    if (isset($_GET['id']) && isset($_GET['id2'])) {
        global $Creation, $Sdg;

        $template_vars['bottom_scripts'] = ["creation"];

        $creation_id = $_GET['id'];
        $creation = $Creation->full_creation($creation_id);
        $recent_creations = $Creation->recent_creations();
        $popular_sdgs = $Sdg->get_popular();
        
        if ($creation) {
            $template_vars['creation'] = $creation;
            $template_vars['recent_creations'] = $recent_creations;
            $template_vars['popular_sdgs'] = $popular_sdgs;
        } else {
            header("HTTP/1.0 404 Not Found");
            header("Location: /404/");
            exit;
        }

    } else {
        header("HTTP/1.0 404 Not Found");
        header("Location: /404/");
        exit;
    }

?>