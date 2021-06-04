<?php

    class Sdg {

        // Get all sdgs
        public function get_sdgs() {
            global $Db;

            $sdgs = $Db->run("SELECT id, number, title AS slug FROM sdg")->fetchAll();
            
            foreach ($sdgs as $sdg) {
                $sdg->title = $this->get_name($sdg->id);
            }

            return $sdgs;
        }

        // Get single sdg
        public function get_sdg($id) {
            global $Db;

            $params = array(":id" => $id);
            $sdg = $Db->run("SELECT id, number, title AS slug, description FROM sdg WHERE id = :id LIMIT 1", $params)->fetch();
            $sdg->title = $this->get_name($sdg->id);

            return $sdg;
        }

        // Get name
        public function get_name($id) {
            global $Db;

            $params = array(":id" => $id);
            $title = $Db->run("SELECT title FROM sdg WHERE id = :id LIMIT 1", $params)->fetchColumn();
            $title = str_replace('-', ' ', $title);

            return $title;
        }

        // Get popular sdgs
        public function get_popular($limit = 4) {
            global $Db;

            $sdgs = $Db->run("SELECT cs.sdg_id AS id, s.title AS slug FROM content_sdg cs LEFT JOIN sdg s ON cs.sdg_id = s.id GROUP BY cs.sdg_id ORDER BY count(cs.sdg_id) DESC LIMIT $limit")->fetchAll();
            foreach ($sdgs as $sdg) {
                $sdg->title = $this->get_name($sdg->id);
            }

            return $sdgs;
        }

    }

?>