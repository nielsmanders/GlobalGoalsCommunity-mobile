<?php

    // Database class
    require_once("classes/database.class.php");
    $Db = Database::instance();

    // User class
    require_once("classes/user.class.php");
    $User = new User();

    // Sdg class
    require_once("classes/sdg.class.php");
    $Sdg = new Sdg();

    // Creation class
    require_once("classes/comment.class.php");
    $Comment = new Comment();

    // Creation class
    require_once("classes/creation.class.php");
    $Creation = new Creation();

?>