<?php

    class User {

        // Check if user is logged in
        public function check() {
            if (isset($_SESSION['user_id'])) {
                return true;
            } else {
                return false;
            }
        }

        // Get user firstname from id
        public function firstname($user_id) {
            global $Db;

            $params = array(":user_id" => $user_id);
            $user = $Db->run("SELECT firstname FROM user WHERE id = :user_id LIMIT 1", $params)->fetchColumn();

            if ($user) {
                return $user;
            } else {
                return "Unknown";
            }
        }

        // Get user name from id
        public function name($user_id) {
            global $Db;

            $params = array(":user_id" => $user_id);
            $user = $Db->run("SELECT firstname, lastname FROM user WHERE id = :user_id LIMIT 1", $params)->fetch();

            if ($user) {
                return $user->firstname . " " . $user->lastname;
            } else {
                return "Unknown";
            }
        }

        // Get user slug from id
        public function slug($user_id) {
            global $Db;

            $params = array(":user_id" => $user_id);
            $slug = $Db->run("SELECT slug FROM user WHERE id = :user_id LIMIT 1", $params)->fetchColumn();

            return $slug;
        }
        
        // Get user avatar from id
        public function avatar($user_id) {
            global $Db;

            $params = array(":user_id" => $user_id);
            $avatar = $Db->run("SELECT avatar FROM user WHERE id = :user_id LIMIT 1", $params)->fetchColumn();

            return $avatar;
        }

        // Check if user is admin from id
        public function admin($user_id) {
            global $Db;

            $params = array(":user_id" => $user_id);
            $admin = $Db->run("SELECT admin FROM user WHERE id = :user_id LIMIT 1", $params)->fetchColumn();

            if ($admin) {
                return true;
            }
        }

        // Authenticate user
        public function authenticate($email, $password) {
            global $Db;

            $params = array(":email" => $email);
            $user = $Db->run("SELECT id, password FROM user WHERE email = :email LIMIT 1", $params)->fetch();

            if (!empty($user)) {
                if (password_verify($password, $user->password)) {
                    $_SESSION['user_id'] = $user->id;
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        // Create new user
        public function create($firstname, $lastname, $password, $email, $phone, $newsletter) {
            global $Db;

            $params = array(":email" => $email);
            $user = $Db->run("SELECT email FROM user WHERE email = :email", $params)->fetchColumn();

            if ($user) {
                return false;
            } else {
                $password = password_hash($password, PASSWORD_DEFAULT);
                
                $params = array(
                    ":firstname" => $firstname,
                    ":lastname" => $lastname,
                    ":password" => $password,
                    ":email" => $email,
                    ":phone" => $phone,
                    ":slug" => str_replace(' ', '-', trim($firstname) . " " . trim($lastname)),
                    ":newsletter" => $newsletter
                );
                $Db->run("INSERT INTO user (`firstname`, `lastname`, `password`, `email`, `phone`, `slug`, `newsletter`) VALUES (:firstname, :lastname, :password, :email, :phone, :slug, :newsletter)", $params);
                
                return true;
            }
        }
        
        // Get user information 
        public function get_user_information() {
            global $Db;

            if ($this->check()) {
                $params = array(":id" => $_SESSION['user_id']);
                $user = $Db->run("SELECT id, firstname, lastname, email, phone, date_of_birth, avatar, bio, city, country, twitter, instagram, facebook, linkedin, youtube FROM user WHERE id = :id LIMIT 1", $params)->fetch();
                $user->name = $this->name($user->id);
                $user->follower_count = $this->get_follower_count($user->id);
                $user->followers = $this->get_followers($user->id);

                return $user;
            } else {
                return false; 
            }
        }

        //Update user information 
        public function update($id, $firstname, $lastname, $email, $phone, $date_of_birth, $avatar, $bio, $city, $country, $twitter, $instagram, $facebook, $linkedin, $youtube) {
            global $Db;

            $params = array(
                ":id"               => $id,
                ":firstname"        => $firstname,
                ":lastname"         => $lastname,
                ":email"            => $email,
                ":phone"            => $phone,
                ":date_of_birth"    => $date_of_birth,
                ":bio"              => $bio,
                ":city"             => $city,
                ":country"          => $country,
                ":twitter"          => $twitter,
                ":instagram"        => $instagram,
                ":facebook"         => $facebook,
                ":linkedin"         => $linkedin,
                ":youtube"          => $youtube
            );

            if ($avatar) {
                $allowTypes = array("jpg", "jpeg", "png");
                $targetDir = "images/profile/";
                $targetFileType = strtolower(pathinfo($avatar['name'], PATHINFO_EXTENSION));
                $targetFile = $targetDir . $id . "." . $targetFileType;

                foreach ($allowTypes as $allowType) {
                    $file = $targetDir . $id . "." . $allowType;
                    if (file_exists($file)) {
                        unlink($file);
                    }
                }
                
                if (in_array($targetFileType, $allowTypes)) {
                    move_uploaded_file($avatar['tmp_name'], $targetFile);
                    $avatar = "/" . $targetFile;
                } else {
                    return "image";
                    exit;
                }

                $params[":avatar"] = $avatar;
                $query = "UPDATE user SET firstname = :firstname, lastname = :lastname, email = :email, phone = :phone, date_of_birth = :date_of_birth, avatar = :avatar, bio = :bio, city = :city, country = :country, twitter = :twitter, instagram = :instagram, facebook = :facebook, linkedin = :linkedin, youtube = :youtube WHERE id = :id";
            } else {
                $query = "UPDATE user SET firstname = :firstname, lastname = :lastname, email = :email, phone = :phone, date_of_birth = :date_of_birth, bio = :bio, city = :city, country = :country, twitter = :twitter, instagram = :instagram, facebook = :facebook, linkedin = :linkedin, youtube = :youtube WHERE id = :id";
            }
            
            if ($Db->run($query, $params)) {
                return true; 
            } else {
                return false; 
            }
        }

        // Get follower count 
        public function get_follower_count($id) {
            global $Db;

            $params = array(":id" => $id);
            $follower_count = $Db->run("SELECT count(followed_user_id) FROM user_follow WHERE followed_user_id = :id", $params)->fetchColumn();
            return $follower_count; 
        }

        // Get followers 
        public function get_followers($id) {
            global $Db;

            $params = array(":id" => $id);
            $followers = $Db->run("SELECT uf.user_id, u.avatar FROM user_follow uf LEFT JOIN user u ON uf.user_id = u.id WHERE uf.followed_user_id = :id", $params)->fetchAll();

            foreach ($followers as $key => $value) {
                $followers[$key]->name = $this->name($value->user_id);
                $followers[$key]->follower_count = $this->get_follower_count($value->user_id);
            }
            return $followers; 
        }

        // Get if user is followed by user
        public function get_user_followed($id) {
            global $Db;

            if (isset($_SESSION['user_id'])) {
                $params = array(
                    ":user_id" => $_SESSION['user_id'],
                    ":followed_user_id" => $id  
                );
                $followed = $Db->run("SELECT id FROM user_follow WHERE user_id = :user_id AND followed_user_id = :followed_user_id LIMIT 1", $params)->fetchColumn();
                
                return $followed;
            }
        }

        // Get creation count
        public function get_creation_count($id) {
            global $Db;

            $params = array(":id" => $id);
            $creation_count = $Db->run("SELECT count(id) FROM content WHERE user_id = :id", $params)->fetchColumn();

            return $creation_count;
        }

        // Follow user
        public function follow($id) {
            global $Db;

            $params = array(
                ":user_id" => $_SESSION['user_id'],
                ":followed_user_id" => $id
            );
            $Db->run("INSERT INTO user_follow (`user_id`, `followed_user_id`) VALUES (:user_id, :followed_user_id)", $params);
        
            return true;
        }

        // Unfollow user
        public function unfollow($id) {
            global $Db;

            $params = array(
                ":user_id" => $_SESSION['user_id'],
                ":followed_user_id" => $id
            );
            $Db->run("DELETE FROM user_follow WHERE user_id = :user_id AND followed_user_id = :followed_user_id", $params);
        
            return true;
        }
        
    }

?>