import React from 'react'
import PropTypes from 'prop-types'

function Button({ children, onClick, type = 'button', className = '' }) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
}

Button.defaultProps = {
  onClick: undefined,
  type: 'button',
  className: '',
}

export default Button
