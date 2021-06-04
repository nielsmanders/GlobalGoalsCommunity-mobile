<?php

    session_start();

    // include classes
    include("../ggc/includes/init.inc.php");

    // Create new user
    if (isset($_POST['action']) && $_POST['action'] == "register") {        
        if ($User->create($_POST['firstname'], $_POST['lastname'], $_POST['password'], $_POST['email'], $_POST['phone'], $_POST['newsletter'])) {
            echo true;
        } else {
            echo "false";
        }
    }

    // Login user
    if (isset($_POST['action']) && $_POST['action'] == "login") {
        if ($User->authenticate($_POST['email'], $_POST['password'])) {
            echo true;
        } else {
            echo false;
        }
    }

    // Save creation
    if (isset($_POST['action']) && $_POST['action'] == "saveCreation") {
        if ($Creation->save_creation($_POST['content_id'], $_POST['user_id'])) {
            $saved_count = $Creation->get_saved($_POST['content_id']);
            echo json_encode($saved_count);
        } else {
            echo false;
        }
    }

    // Unsave creation
    if (isset($_POST['action']) && $_POST['action'] == "unsaveCreation") {
        if ($Creation->unsave_creation($_POST['content_id'], $_POST['user_id'])) {
            $saved_count = $Creation->get_saved($_POST['content_id']);
            echo json_encode($saved_count);
        } else {
            echo false;
        }
    }

    // Like creation
    if (isset($_POST['action']) && $_POST['action'] == "likeCreation") {
        if ($Creation->like_creation($_POST['content_id'], $_POST['user_id'])) {
            $like_count = $Creation->get_likes($_POST['content_id']);
            echo json_encode($like_count);
        } else {
            echo false;
        }
    }

    // Unlike creation
    if (isset($_POST['action']) && $_POST['action'] == "unlikeCreation") {
        if ($Creation->unlike_creation($_POST['content_id'], $_POST['user_id'])) {
            $like_count = $Creation->get_likes($_POST['content_id']);
            echo json_encode($like_count);
        } else {
            echo false;
        }
    }

    // Report creation
    if (isset($_POST['action']) && $_POST['action'] == "reportCreation") {
        if ($Creation->report_creation($_POST['content_id'], $_POST['user_id'])) {
            echo true;
        } else {
            echo false;
        }
    }

    // Comment on creation
    if (isset($_POST['action']) && $_POST['action'] == "comment") {
        if ($Comment->comment_creation($_POST['content_id'], $_POST['title'], $_POST['content'])) {
            echo true;
        } else {
            echo false;
        }
    }

    // Like comment
    if (isset($_POST['action']) && $_POST['action'] == "likeComment") {
        if ($Comment->like_comment($_POST['comment_id'], $_POST['user_id'])) {
            $like_count = $Comment->get_likes($_POST['comment_id']);
            echo json_encode($like_count);
        } else {
            echo false;
        }
    }

    // Unlike comment
    if (isset($_POST['action']) && $_POST['action'] == "unlikeComment") {
        if ($Comment->unlike_comment($_POST['comment_id'], $_POST['user_id'])) {
            $like_count = $Comment->get_likes($_POST['comment_id']);
            echo json_encode($like_count);
        } else {
            echo false;
        }
    }
    
    // View creation
    if (isset($_POST['action']) && $_POST['action'] == "viewCreation") {
        if ($Creation->view_creation($_POST['creation_id'])) {
            $view_count = $Creation->get_views($_POST['creation_id']);
            echo json_encode($view_count);
        } else {
            echo false;
        }
    }

    // Follow user
    if (isset($_POST['action']) && $_POST['action'] == "followUser") {
        if ($User->follow($_POST['user_id'])) {
            $follower_count = $User->get_follower_count($_POST['user_id']);
            echo json_encode($follower_count);
        } else {
            echo false;
        }
    }

    // Unfollow user
    if (isset($_POST['action']) && $_POST['action'] == "unfollowUser") {
        if ($User->unfollow($_POST['user_id'])) {
            $follower_count = $User->get_follower_count($_POST['user_id']);
            echo json_encode($follower_count);
        } else {
            echo false;
        }
    }

?>