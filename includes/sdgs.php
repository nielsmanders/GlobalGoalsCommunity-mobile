<?php

    if (isset($_GET['id'])) {
        include("sdgs/sdg.php");
        $template_vars['sdg_page'] = "sdg";
    } else {
        include("sdgs/sdgs.php");
        $template_vars['sdg_page'] = "sdgs";
    }

?>