<?php

    if (isset($_GET["p"])) {
        $p = $_GET["p"];
    } else {
        $p = "home";
    }

    if ($p != "404" && file_exists("templates/" . $p . ".twig")) {
        $page = "includes/" . $p . ".php";
        $template_file = $p . ".twig";
    } elseif (!$p) {
        $page = "includes/home.php";
        $pageclass = "home";
        $template_file = "home.twig";
    } else {
        header("HTTP/1.0 404 Not Found");
        $p = "404";
        $page = "includes/404.php";
        $pageclass = "page not_found";
        $template_file = "404.twig";
    }

    // Load Twig
    require_once 'vendor/autoload.php';
    $loader = new \Twig\Loader\FilesystemLoader('templates');

    $twig = new \Twig\Environment($loader, array(
        'cache' => 'cache/twig',
        'auto_reload' => true,
        'debug' => ((defined('TWIG_DEBUG') && TWIG_DEBUG == true) ? true : false)
    ));

    // Add debug extension if debug is true
    if (defined('TWIG_DEBUG') && TWIG_DEBUG == true) {
        $twig->addExtension(new \Twig\Extension\DebugExtension());
    }

    // Default template vars
    include("includes/index.inc.php");

    // Load template vars for current page
    if (isset($page) && file_exists($page)) {
        include($page);
    }
    
    // Render page
    echo $twig->render('index.twig', $template_vars);
?>