<?php

namespace Projeto\Models;

use PDO;
use PDOException;

class Database
{
    private $pdo;

    public function __construct(
        $host = 'localhost',
        $dbname = 'application',
        $user = 'root',
        $pass = '',
        $port = 3307
    ) {
        $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
        try {
            $this->pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $e) {
            throw new \Exception("Erro de conexão: " . $e->getMessage());
        }
    }

    public function query($sql, $params = [])
    {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public function fetchAll($sql, $params = [])
    {
        return $this->query($sql, $params)->fetchAll();
    }

    public function fetch($sql, $params = [])
    {
        return $this->query($sql, $params)->fetch();
    }
}