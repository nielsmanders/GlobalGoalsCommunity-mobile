<?php 

    header("Content-type: text/html; charset=UTF-8");
    header("X-XSS-Protection: 0"); // fix for chrome bugs

    // Start session
    session_start();

    // Configuration & classes
    include("ggc/includes/init.inc.php");

    // Handle templates
    include("./template_handling.inc.php");
    
?>