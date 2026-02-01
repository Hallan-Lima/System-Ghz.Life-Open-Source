import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked, cilUser } from '@coreui/icons'
import { useLogin } from './useLogin'
import AppToast from '../../../components/AppToast'

const Login = () => {
  const {
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
  } = useLogin()
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <p className="h4">Sintonize sua melhor versão</p>
                    <p className="text-body-secondary">Pronto para continuar sua evolução hoje?</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="E-mail"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        invalid={emailError}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                        title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        <CIcon icon={showPassword ? cilLockUnlocked : cilLockLocked} />
                      </CInputGroupText>

                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Continuar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Precisa de ajuda?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Criar conta</h2>
                    <p>
                      Conectando tecnologia e bem-estar.
                      Transforme dados em qualidade de vida com a Ghz.Life.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Não tem conta? Comece sua jornada gratuitamente
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <AppToast toaster={toaster} toast={toast} />
    </div>
  )
}

export default Login
