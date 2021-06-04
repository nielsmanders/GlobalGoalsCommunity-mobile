<?php

    // Dutch locale
    setlocale(LC_TIME, 'NL_nl');

    // Page variables
    $template_vars["SITE_TITLE"] = SITE_TITLE;
    $template_vars["SITE_URL"] = BASE_URL;
    $template_vars["CSS_VERSION"] = CSS_VERSION;
    $template_vars["JS_VERSION"] = JS_VERSION;

    // Other variables
    $template_vars["current_year"] = date("Y");

    // Body class
    $body_class = $p;
    if (isset($pageclass)) {
        $body_class .= " ".$pageclass;
    }
    $template_vars["body_class"] = $body_class;

    // Page
    $template_vars["template_file"] = $template_file;
    $template_vars["p"] = $p;

    if (isset($_GET['id'])) {
        $template_vars["id"] = $_GET['id'];
    } 

    if (isset($_GET['id2'])) {
        $template_vars["id2"] = $_GET['id2'];
    } 

    // Pageheader
    $params = array(":page" => $p);
    $pageheader = $Db->run("SELECT title, description FROM pageheader WHERE page = :page LIMIT 1", $params)->fetch(); 
    $template_vars["pageheader"] = $pageheader;

    // Check if user is logged in
    if ($User->check()) {
        $template_vars['user_id'] = $_SESSION['user_id'];
        $template_vars['user_firstname'] = $User->firstname($_SESSION['user_id']);
        $template_vars['user_name'] = $User->name($_SESSION['user_id']);
        $template_vars['user_avatar'] = $User->avatar($_SESSION['user_id']);
        $template_vars['user_slug'] = $User->slug($_SESSION['user_id']);
    }

?>