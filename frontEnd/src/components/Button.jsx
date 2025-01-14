import React from 'react'

/* eslint-disable react/prop-types */

function Button({ children, onClick, type = 'button', className = '' }) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
