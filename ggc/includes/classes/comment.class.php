<?php

    class Comment {

        // Get comments
        public function get_creation_comments($id) {
            global $Db, $User;

            $comments = array();
            $params = array(":content_id" => $id);

            $hot_comment = $Db->run("SELECT c.id, c.title, c.content, c.date, count(cl.id) AS likes, u.id AS user_id FROM comment c LEFT JOIN comment_like cl ON c.id = cl.comment_id LEFT JOIN user u ON c.user_id = u.id WHERE content_id = :content_id GROUP BY c.id ORDER BY likes DESC LIMIT 1", $params)->fetch();
            if ($hot_comment && $hot_comment->likes > 0) {
                $hot_comment->name = $User->name($hot_comment->user_id);
                array_push($comments, $hot_comment);
            }
            
            $all_comments = $Db->run("SELECT c.id, c.title, c.content, c.date, count(cl.id) AS likes, u.id AS user_id FROM comment c LEFT JOIN comment_like cl ON c.id = cl.comment_id LEFT JOIN user u ON c.user_id = u.id WHERE content_id = :content_id GROUP BY c.id ORDER BY date DESC", $params)->fetchAll();
            foreach ($all_comments as $key => $value) {
                if ($hot_comment->likes > 0) {
                    if ($value->id !== $hot_comment->id) {
                        $all_comments[$key]->name = $User->name($value->user_id);
                        array_push($comments, $all_comments[$key]);
                    }
                } else {
                    $all_comments[$key]->name = $User->name($value->user_id);
                    array_push($comments, $all_comments[$key]);
                }
            }

            foreach($comments as $key => $value) {
                $comments[$key]->liked = $this->get_user_liked($value->id);
            }

            return $comments;
        }

        // Comment creation
        public function comment_creation($id, $title, $content) {
            global $Db;

            $params = array(
                ":title" => $title,
                ":content" => $content,
                ":user_id" => $_SESSION['user_id'],
                ":content_id" => $id  
            );
            if ($Db->run("INSERT INTO comment (`title`, `content`, `user_id`, `content_id`) VALUES (:title, :content, :user_id, :content_id)", $params)) {
                return true;
            }
        }
        
        // Get total comment likes
        public function get_likes($id) {
            global $Db;

            $params = array(":comment_id" => $id);
            $like_count = $Db->run("SELECT count(id) FROM comment_like WHERE comment_id = :comment_id", $params)->fetchColumn();
            
            return $like_count;
        }

        // Get if comment is liked by user
        public function get_user_liked($id) {
            global $Db;

            if (isset($_SESSION['user_id'])) {
                $params = array(
                    ":user_id" => $_SESSION['user_id'],
                    ":comment_id" => $id  
                );
                $liked = $Db->run("SELECT id FROM comment_like WHERE user_id = :user_id AND comment_id = :comment_id LIMIT 1", $params)->fetchColumn();
                
                return $liked;
            }
        }

        // Like comment
        public function like_comment($id, $user_id) {
            global $Db;

            $params = array(
                ":user_id" => $user_id,
                ":comment_id" => $id  
            );
            if ($Db->run("INSERT INTO comment_like (`user_id`, `comment_id`) VALUES (:user_id, :comment_id)", $params)) {
                return true;
            }
        }

        // Unlike creation
        public function unlike_comment($id, $user_id) {
            global $Db;

            $params = array(
                ":user_id" => $user_id,
                ":comment_id" => $id  
            );
            if ($Db->run("DELETE FROM comment_like WHERE user_id = :user_id AND comment_id = :comment_id", $params)) {
                return true;
            }
        }

    }

?>