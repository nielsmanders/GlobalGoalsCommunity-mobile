<?php

    // Set timezone
    date_default_timezone_set('Europe/Amsterdam');

    if (isset($_SERVER["REMOTE_ADDR"]) && $_SERVER["REMOTE_ADDR"] == "127.0.0.1") {
        error_reporting(E_ALL);
        ini_set('display_errors', 'On');

        // Set to false for twig debug extension
        define('TWIG_DEBUG', true);

        // Localhost url
        define('BASE_URL', 'http://local.globalgoalscommunity.eu/');

        // Set to false if using a live database
        $local_db = false;
    } else {
        // Set to false for twig debug extension
        define('TWIG_DEBUG', false);

        // Localhost url
        define('BASE_URL', 'https://ecologicals.globalgoalscommunity.eu/');

        // Set to false if using a live database
        $local_db = false;
    }

    // Local MySQL or Live MySQL
    if ($local_db) {
        define('DB_HOST', 'localhost');
        define('DB_DATABASE', 'globalgoalscommunity');
        define('DB_USERNAME', 'root');
        define('DB_PASSWORD', '');
    } else {
        define('DB_HOST', 's190.webhostingserver.nl');
        define('DB_DATABASE', 'deb128622n2_ecologicals');
        define('DB_USERNAME', 'deb128622n2_ecologicals');
        define('DB_PASSWORD', 'ISRfWClJe');
    }

    // CSS & JS Version
    define('CSS_VERSION', time());
    define('JS_VERSION', time());

    // Website configuration
    define('SITE_TITLE', 'Global Goals Community');

?>