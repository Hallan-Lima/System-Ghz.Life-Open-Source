<?php
/**
 * @author HallTech AI
 */

namespace Infrastructure\Database;

use PDO;

class Connection
{
    public static function make(): PDO
    {
        $host = getenv('DB_HOST') ?: 'localhost';
        $port = getenv('DB_PORT') ?: '3306';
        $database = getenv('DB_NAME') ?: 'application';
        $user = getenv('DB_USER') ?: 'app_user';
        $password = getenv('DB_PASSWORD') ?: 'change-me';

        $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";

        return new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }
}
