import './Text.css'
import React from 'react'

function Text({ children, color }) {
  return <span className={color}>{children}</span>
}

export default Text
