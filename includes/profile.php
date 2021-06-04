<?php

    if (isset($_GET['id']) && isset($_GET['id2'])) {
        $template_vars['bottom_scripts'] = ["profile"];
        
        $user_id = $_GET['id'];
        
        // Get user information
        $params = array(":id" => $user_id);
        $user = $Db->run("SELECT id, firstname, lastname, email, phone, avatar, bio, city, country, twitter, instagram, facebook, linkedin, youtube, slug FROM user WHERE id = :id LIMIT 1", $params)->fetch();
        
        if (!empty($user)) {
            // Full name
            $user->name = $User->name($user_id);

            // Get user followers
            $params = array(":id" => $user_id);
            $followers = $Db->run("SELECT count(id) FROM user_follow WHERE followed_user_id = :id", $params)->fetchColumn();
            $user->followers = $followers;

            // Get user followed
            $followed = $User->get_user_followed($user_id);
            $user->followed = $followed;

            // Get user content count
            $params = array(":id" => $user_id);
            $content_count = $Db->run("SELECT count(id) FROM content WHERE user_id = :id", $params)->fetchColumn();
            $user->content_count = $content_count;

            // Get user content
            $params = array(":id" => $user_id);
            $user_content = $Db->run("SELECT c.id AS id, c.title, c.shortDescription, c.created, c.slug, i.url AS image FROM content c LEFT JOIN image i ON c.id = i.content_id WHERE user_id = :id", $params)->fetchAll();

            foreach ($user_content as $key => $value) {
                $content_key = $key;

                // Get sdgs for content
                $params = array(":content_id" => $value->id);
                $sdgs = $Db->run("SELECT s.id, s.number FROM content_sdg cs LEFT JOIN sdg s ON cs.sdg_id = s.id WHERE content_id = :content_id", $params)->fetchAll();
                if ($sdgs) {
                    foreach ($sdgs as $key => $value) {
                        $user_content[$content_key]->sdgs[$key] = $sdgs[$key];
                        $sdgs[$key]->title = $Sdg->get_name($value->id);
                    }
                }

                // Get likes for content
                $likes = $Db->run("SELECT count(id) FROM content_like WHERE content_id = :content_id", $params)->fetchColumn();
                $user_content[$content_key]->likes = $likes;

                // Get comments for content
                $comments = $Db->run("SELECT count(id) FROM comment WHERE content_id = :content_id", $params)->fetchColumn();
                $user_content[$content_key]->comments = $comments;

                // Get views for content
                $views = $Db->run("SELECT count(id) FROM view WHERE content_id = :content_id", $params)->fetchColumn();
                $user_content[$content_key]->views = $views;

            }
            
            $user->user_content = $user_content;

            $template_vars['user'] = $user;
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