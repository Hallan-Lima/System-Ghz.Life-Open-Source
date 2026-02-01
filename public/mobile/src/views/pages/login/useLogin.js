// src/views/pages/login/useLogin.js
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createToast } from '../../../components/AppToast'

export const useLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false) // Controla a visibilidade da senha
    const [emailError, setEmailError] = useState(false)     // Controla a borda vermelha do email
    const navigate = useNavigate()
    const [toast, addToast] = useState(0)
    const toaster = useRef()

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setEmailError(true)
            addToast(createToast('Por favor, insira um e-mail válido.'))
            return
        }
        try {
            if (!email || !password) {
                addToast(createToast('Preencha todos os campos!'))
                return
            }
    
            const loginSucesso = true
    
            if (loginSucesso) {
                navigate('/dashboard')
            }
            
        } catch (error) {
            addToast(createToast('Erro ao fazer login!'))
        }
    }

    // Função auxiliar para validar email
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Atualiza o email e já limpa o erro se o usuário começar a corrigir
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (emailError) setEmailError(false)
    }

    return {
        email,
        handleEmailChange,
        password,
        setPassword,
        handleLogin,
        toast,
        toaster,
        showPassword,
        setShowPassword,
        emailError
    }
}