// src/components/AppToast.js
import React from 'react'
import { CToaster, CToast, CToastBody } from '@coreui/react'

export const createToast = (mensagem, color = 'danger') => {
  return (
    <CToast autohide={true} visible={true} color={color} className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>{mensagem}</CToastBody>
      </div>
    </CToast>
  )
}

const AppToast = ({ toaster, toast }) => {
  return (
    <CToaster 
      ref={toaster} 
      push={toast} 
      placement="top-end" 
    />
  )
}

export default AppToast