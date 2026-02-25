<?php
namespace App\DTOs;

class RegisterPayload
{
    public static function fromRequest(array $data): array
    {
        return [
            // Identidade
            'nickname' => $data['nickname'] ?? '',
            'firstName' => $data['firstName'] ?? '',
            'lastName' => $data['lastName'] ?? '',
            'email' => $data['email'] ?? '',
            'password' => $data['password'] ?? '',
            'confirmPassword' => $data['confirmPassword'] ?? '',
            'gender' => $data['gender'] ?? 'other', // male, female, other
            'birthDate' => $data['birthDate'] ?? date('Y-m-d'),

            // Configurações
            'selectedModules' => $data['selectedModules'] ?? [],
            'interests' => $data['interests'] ?? [],
            'experienceMode' => $data['experienceMode'] ?? 'SIMPLE', // SIMPLE ou ADVANCED
        ];
    }
}