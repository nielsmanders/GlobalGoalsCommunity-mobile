<?php

    class Database {

        protected static $instance;
        private $db;

        private $host = DB_HOST;
        private $database = DB_DATABASE;
        private $username = DB_USERNAME;
        private $password = DB_PASSWORD;

        protected function __construct() {
            try {
                $this->db = new PDO('mysql:host='. $this->host .';dbname='.$this->database, $this->username, $this->password);
                $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
                $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOExeption $e) {
                echo $e->getMessage();
                die();
            }
        }

        public static function instance() {
            if (self::$instance === null)
            {
                self::$instance = new self;
            }
            return self::$instance;
        }

        public function query($query) {
            return $this->db->query($query);
        }

        public function run($query, $args = []) {
            if (!$args) {
                return $this->query($query);
            }

            $stmt = $this->db->prepare($query);
            $stmt->execute($args);

            return $stmt;
        }

        public function lastInsertId() {
            return $this->db->lastInsertId();
        }

    }

?>