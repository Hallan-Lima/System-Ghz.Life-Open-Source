<?php
namespace App\DTOs;

class LoginPayload 
{
    public static function fromRequest(array $data): array
    {
        return [
            'email'    => $data['email'] ?? '',
            'password' => $data['password'] ?? ''
        ];
    }
}