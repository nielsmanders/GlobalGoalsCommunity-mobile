<?php

    if (isset($_GET['id'])) {
        global $Creation, $Sdg;

        $template_vars['bottom_scripts'] = ["filter", "sdg"];

        $sdg_id = $_GET['id'];
        $sdg = $Sdg->get_sdg($sdg_id);
        
        if ($sdg) {
            if (isset($_GET['search'])) {
                $rawFilters = explode("+", $_GET['filter']);
                $filters = array();

                foreach ($rawFilters as $key => $value) {
                    if (!empty($rawFilters[$key])) {
                        array_push($filters, $rawFilters[$key]);
                    }
                }

                $creations = $Creation->all_creations(array($sdg_id), $_GET['search'], $_GET['sort'], $filters);
                
                $template_vars['search'] = $_GET['search'];
                $template_vars['sort'] = $_GET['sort'];
                $template_vars['filters'] = $filters;
            } else {
                $creations = $Creation->all_creations(array($sdg_id));
            }

            $creations_count = count($creations);
            
            $template_vars['sdg'] = $sdg;
            $template_vars['creation_count'] = $creations_count;
            $template_vars['creations'] = $creations;
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