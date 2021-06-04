<?php

    class Creation {

        // Get full creation for creation page
        public function full_creation($id) {
            global $User;
            
            $creation = $this->get_creation($id);
            $creation->like_count = $this->get_likes($id);
            $creation->comment_count = $this->get_comment_count($id);
            $creation->comments = $this->get_comments($id);
            $creation->view_count = $this->get_views($id);
            $creation->saved_count = $this->get_saved($id);
            $creation->creator = $this->get_creator($creation->user_id);
            $creation->creator_slug = $User->slug($creation->user_id);
            $creation->creator_creation = $User->get_creation_count($creation->user_id);
            $creation->saved = $this->get_user_saved($id);
            $creation->liked = $this->get_user_liked($id);
            $creation->reported = $this->get_user_reported($id);
            $creation->sdgs = $this->get_sdgs($id);

            return $creation;
        }

        // Get all creations with or without filters
        public function all_creations($sdgs = array(), $search = NULL, $sort = 'recent', $filters = array()) {
            global $Db;

            // Standard query
            $query = "SELECT c.id, c.title, c.shortDescription, c.slug, c.created, c.user_id, i.url AS image, count(v.id) AS view_count, count(cl.id) AS like_count, count(cm.id) AS comment_count FROM content_sdg cs LEFT JOIN content c ON cs.content_id = c.id LEFT JOIN image i ON c.id = i.content_id LEFT JOIN view v ON c.id = v.content_id LEFT JOIN content_like cl ON c.id = cl.content_id LEFT JOIN comment cm ON c.id = cm.content_id ";

            // Add search to query
            if (!empty($search)) {
                if (!strpos($query, "WHERE")) {
                    $query .= "WHERE c.title LIKE '%" . $search . "%' ";
                } else {
                    $query .= "AND c.title LIKE '%" . $search . "%' ";
                }
            }

            // Add sdg id filter to query
            if ($sdgs) {
                if (count($sdgs) > 1) {
                    $i = 0;

                    foreach ($sdgs as $sdg) {
                        if (!strpos($query, "WHERE")) {
                            $query .= "WHERE ";

                            if ($i != 0) {
                                $query .= "OR ";
                            }
                        } else {
                            if ($i == 0) {
                                $query .= "AND ";
                            } else {
                                $query .= "OR ";
                            }
                        }

                        $query .= "cs.sdg_id = " . $sdg . " ";
                    }
                } else {
                    if (!strpos($query, "WHERE")) {
                        $query .= "WHERE cs.sdg_id = " . $sdgs[0] . " ";
                    } else {
                        $query .= "AND cs.sdg_id = " . $sdgs[0] . " ";
                    }
                }
            }

            // Add filters to query
            if ($filters) {

                if (count($filters) > 1) {
                    $i = 0;

                    foreach ($filters as $filter) {
                        if (!strpos($query, "WHERE")) {
                            $query .= "WHERE ";

                            if ($i != 0) {
                                $query .= "OR ";
                            }
                        } else {
                            if ($i == 0) {
                                $query .= "AND ";
                            } else {
                                $query .= "OR ";
                            }
                        }

                        switch($filter) {
                            case "how-to":
                                $query .= "type_id = 1 ";
                                break;
                            case "artikelen":
                                $query .= "type_id = 2 ";
                                break;
                            case "videos":
                                $query .= "type_id = 3 ";
                                break;
                            case "podcasts":
                                $query .= "type_id = 4 ";
                                break;
                        }
                        $i++;
                    }
                } else {
                    if (!strpos($query, "WHERE")) {
                        $query .= "WHERE ";
                    } else {
                        $query .= "AND ";
                    }

                    switch($filters[0]) {
                        case "how-to":
                            $query .= "type_id = 1 ";
                            break;
                        case "artikelen":
                            $query .= "type_id = 2 ";
                            break;
                        case "videos":
                            $query .= "type_id = 3 ";
                            break;
                        case "podcasts":
                            $query .= "type_id = 4 ";
                            break;
                    }
                }
            }

            $query .= "GROUP BY c.id ORDER BY ";

            // Add sort to query
            if ($sort == "likes") {
                $query .= "count(cl.id) DESC";
            } else if ($sort == "comments") {
                $query .= "count(cm.id) DESC";
            } else if ($sort == "popular") {
                $query .= "count(v.id) DESC";
            } else {
                $query .= "c.created DESC";
            }

            $creations = $Db->run($query)->fetchAll();
            
            foreach ($creations as $key => $value) {
                $creations[$key]->creator = $this->get_creator($value->user_id);
                $creations[$key]->sdgs = $this->get_sdgs($value->id);
            }

            return $creations;

            // return $query;
        }

        // Get recent creations
        public function recent_creations($limit = 4) {
            global $Db;

            $creations = $Db->run("SELECT c.id, title, shortDescription, created, slug, user_id, i.url AS image FROM content c LEFT JOIN image i ON c.id = i.content_id ORDER BY created DESC LIMIT $limit")->fetchAll();
        
            if ($creations) {
                return $creations;
            } else {
                return false;
            }
        }

        // Get featured creations
        public function featured_creations($limit = 6) {
            global $Db;

            $creations = $Db->run("SELECT c.id, title, shortDescription, created, slug, user_id, i.url AS image FROM content c LEFT JOIN image i ON c.id = i.content_id WHERE featured ORDER BY featured ASC LIMIT $limit")->fetchAll();
        
            if ($creations) {
                return $creations;
            } else {
                return false;
            }
        }

        // Get popular creations
        public function popular_creations($limit = 5) {
            global $Db;

            $creations = $Db->run("SELECT c.id, title, shortDescription, created, slug, c.user_id, i.url AS image FROM content c LEFT JOIN image i ON c.id = i.content_id LEFT JOIN view v ON c.id = v.content_id GROUP BY c.id ORDER BY count(v.id) DESC LIMIT $limit")->fetchAll();
        
            if ($creations) {
                return $creations;
            } else {
                return false;
            }
        }

        // Get creation information
        public function get_creation($id) {
            global $Db;

            $params = array(":id" => $id);
            $creation = $Db->run("SELECT c.id, title, shortDescription, content, slug, created, type_id, user_id, v.url AS video, i.url AS image FROM content c LEFT JOIN video v ON c.id = v.content_id LEFT JOIN image i ON c.id = i.content_id WHERE c.id = :id LIMIT 1", $params)->fetch();
        
            if ($creation) {
                return $creation;
            } else {
                return false;
            }
        }

        // Get creation creator
        public function get_creator($id) {
            global $User;

            $creator = $User->name($id);

            return $creator;
        }

        // Get creation sdgs
        public function get_sdgs($id) {
            global $Db, $Sdg;

            $params = array(":content_id" => $id);
            $sdgs = $Db->run("SELECT s.id, s.number, s.title FROM content_sdg cs LEFT JOIN sdg s ON cs.sdg_id = s.id WHERE content_id = :content_id", $params)->fetchAll();
            if ($sdgs) {
                foreach ($sdgs as $key => $value) {
                    $sdgs[$key]->slug = $sdgs[$key]->title;
                    $sdgs[$key]->title = $Sdg->get_name($value->id);
                }
            }

            return $sdgs;
        }

        // Get total creation likes
        public function get_likes($id) {
            global $Db;

            $params = array(":content_id" => $id);
            $like_count = $Db->run("SELECT count(id) FROM content_like WHERE content_id = :content_id", $params)->fetchColumn();
            
            return $like_count;
        }

        // Get total creation comments
        public function get_comment_count($id) {
            global $Db;

            $params = array(":content_id" => $id);
            $comment_count = $Db->run("SELECT count(id) FROM comment WHERE content_id = :content_id", $params)->fetchColumn();
            
            return $comment_count;
        }

        // Get total creation views
        public function get_views($id) {
            global $Db;

            $params = array(":content_id" => $id);
            $view_count = $Db->run("SELECT count(id) FROM view WHERE content_id = :content_id", $params)->fetchColumn();
            
            return $view_count;
        }

        // Get total creation saved
        public function get_saved($id) {
            global $Db;

            $params = array(":content_id" => $id);
            $saved_count = $Db->run("SELECT count(id) FROM content_save WHERE content_id = :content_id", $params)->fetchColumn();
            
            return $saved_count;
        }

        // Get if content is saved by user
        public function get_user_saved($id) {
            global $Db;

            if (isset($_SESSION['user_id'])) {
                $params = array(
                    ":user_id" => $_SESSION['user_id'],
                    ":content_id" => $id  
                );
                $saved = $Db->run("SELECT id FROM content_save WHERE user_id = :user_id AND content_id = :content_id LIMIT 1", $params)->fetchColumn();
                
                return $saved;
            }
        }

        // Get if content is liked by user
        public function get_user_liked($id) {
            global $Db;

            if (isset($_SESSION['user_id'])) {
                $params = array(
                    ":user_id" => $_SESSION['user_id'],
                    ":content_id" => $id  
                );
                $saved = $Db->run("SELECT id FROM content_like WHERE user_id = :user_id AND content_id = :content_id LIMIT 1", $params)->fetchColumn();
                
                return $saved;
            }
        }

        // Get if content is reported by user
        public function get_user_reported($id) {
            global $Db;

            if (isset($_SESSION['user_id'])) {
                $params = array(
                    ":user_id" => $_SESSION['user_id'],
                    ":content_id" => $id  
                );
                $saved = $Db->run("SELECT id FROM report WHERE user_id = :user_id AND content_id = :content_id LIMIT 1", $params)->fetchColumn();
                
                return $saved;
            }
        }

        // Get creation comments
        public function get_comments($id) {
            global $Db, $Comment;

            $comments = $Comment->get_creation_comments($id);

            return $comments;
        }

        // Save creation
        public function save_creation($id, $user_id) {
            global $Db;

            $params = array(
                ":user_id" => $user_id,
                ":content_id" => $id  
            );
            if ($Db->run("INSERT INTO content_save (`user_id`, `content_id`) VALUES (:user_id, :content_id)", $params)) {
                return true;
            }
        }

        // Unsave creation
        public function unsave_creation($id, $user_id) {
            global $Db;

            $params = array(
                ":user_id" => $user_id,
                ":content_id" => $id  
            );
            if ($Db->run("DELETE FROM content_save WHERE user_id = :user_id AND content_id = :content_id", $params)) {
                return true;
            }
        }

        // Like creation
        public function like_creation($id, $user_id) {
            global $Db;

            $params = array(
                ":user_id" => $user_id,
                ":content_id" => $id  
            );
            if ($Db->run("INSERT INTO content_like (`user_id`, `content_id`) VALUES (:user_id, :content_id)", $params)) {
                return true;
            }
        }

        // Unlike creation
        public function unlike_creation($id, $user_id) {
            global $Db;

            $params = array(
                ":user_id" => $user_id,
                ":content_id" => $id  
            );
            if ($Db->run("DELETE FROM content_like WHERE user_id = :user_id AND content_id = :content_id", $params)) {
                return true;
            }
        }

        // Report creation
        public function report_creation($id, $user_id) {
            global $Db;

            $params = array(
                ":user_id" => $user_id,
                ":content_id" => $id  
            );
            if ($Db->run("INSERT INTO report (`user_id`, `content_id`) VALUES (:user_id, :content_id)", $params)) {
                return true;
            }
        }

        // View creation
        public function view_creation($id) {
            global $Db, $User;

            if ($User->check()) {
                $params = array(
                    ":user_id" => $_SESSION['user_id'],
                    ":content_id" => $id  
                );
            } else {
                $params = array(
                    ":user_id" => 0,
                    ":content_id" => $id  
                );
            }
            if ($Db->run("INSERT INTO view (`user_id`, `content_id`) VALUES (:user_id, :content_id)", $params)) {
                return true;
            }
        }

        // Get creation types
        public function get_types() {
            global $Db;

            $typesO = $Db->run("SELECT type FROM type")->fetchAll();
            $types = array();
            
            foreach ($typesO as $key => $value) {
                array_push($types, $value->type);
            }

            return $types;
        }

        // New creation
        public function new($title, $shortDescription = NULL, $content, $video = NULL, $type, $sdgs, $image = NULL) {
            global $Db;

            $params = array(
                ":title" => $title,
                ":shortDescription" => $shortDescription,
                ":content" => $content,
                ":slug" => str_replace(' ', '-', trim($title)),
                ":type" => $type,
                ":user_id" => $_SESSION['user_id']
            );

            if ($Db->run("INSERT INTO content (`title`, `shortDescription`, `content`, `slug`, `type_id`, `user_id`) VALUES (:title, :shortDescription, :content, :slug, :type, :user_id)", $params)) {
                $creation_id = $Db->lastInsertId();
            }

            // If video is attached
            if ($video && ($type == 3 || $type == 4)) {
                if ($type == 3) {
                    $allowTypes = array("mp4", "wma");
                } else if ($type == 4) {
                    $allowTypes = array("mp3", "ogg");
                }

                $targetDir = "videos/content/";
                $targetFileType = strtolower(pathinfo($video['name'], PATHINFO_EXTENSION));
                $targetFile = $targetDir . $creation_id . "." . $targetFileType;

                if (in_array($targetFileType, $allowTypes)) {
                    $params = array(
                        ":url" => "/" . $targetFile,
                        ":creation_id" => $creation_id
                    );

                    if ($Db->run("INSERT INTO video (`url`, `content_id`) VALUES (:url, :creation_id)", $params)) {
                        move_uploaded_file($video['tmp_name'], $targetFile);
                    }
                } else {
                    $params = array(":creation_id" => $creation_id);
                    $Db->run("DELETE FROM content WHERE id = :creation_id", $params);

                    return "video";
                    exit;
                }
            }

            if ($image) {
                $allowTypes = array("jpg", "jpeg", "png");
                $targetDir = "images/content/";
                $targetFileType = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));
                $targetFile = $targetDir . $creation_id . "." . $targetFileType;
                
                if (in_array($targetFileType, $allowTypes)) {
                    $params = array(
                        ":url" => "/" . $targetFile,
                        ":creation_id" => $creation_id
                    );

                    if ($Db->run("INSERT INTO image (`url`, `content_id`) VALUES (:url, :creation_id)", $params)) {
                        move_uploaded_file($image['tmp_name'], $targetFile);
                    }
                } else {
                    $params = array(":creation_id" => $creation_id);
                    $Db->run("DELETE FROM content WHERE id = :creation_id", $params);

                    return "image";
                    exit;
                }
            }

            foreach ($sdgs as $key => $value) {
                $params = array(
                    ":creation_id" => $creation_id,
                    ":sdg_id" => $value
                );
                $Db->run("INSERT INTO content_sdg (`content_id`, `sdg_id`) VALUES (:creation_id, :sdg_id)", $params);
            }

            return true;
        }
    }

?>