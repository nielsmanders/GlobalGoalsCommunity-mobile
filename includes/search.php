<?php

    $template_vars['bottom_scripts'] = ["filter", "search"];

    global $Creation, $Sdg;
    
    if (isset($_GET['search'])) {
        $rawFilters = explode("+", $_GET['filter']);
        $filters = array();

        foreach ($rawFilters as $key => $value) {
            if (!empty($rawFilters[$key])) {
                array_push($filters, $rawFilters[$key]);
            }
        }

        $rawSdgs = explode("+", $_GET['sdgs']);
        $sdgs = array();

        foreach ($rawSdgs as $key => $value) {
            if (!empty($rawSdgs[$key])) {
                array_push($sdgs, $rawSdgs[$key]);
            }
        }

        $creations = $Creation->all_creations($sdgs, $_GET['search'], $_GET['sort'], $filters);
        
        $template_vars['search'] = $_GET['search'];
        $template_vars['sort'] = $_GET['sort'];
        $template_vars['filters'] = $filters;

        foreach ($sdgs as $key => $value) {
            $sdgs[$key] = array(
                "id" => $value,
                "title" => $Sdg->get_name($value)
            );
        }

        $template_vars['sdgFilters'] = $sdgs;
    } else {
        $creations = $Creation->all_creations();
    }

    $creations_count = count($creations);
    
    $template_vars['creation_count'] = $creations_count;
    $template_vars['creations'] = $creations;
    $template_vars['sdgs'] = $Sdg->get_sdgs();

?>