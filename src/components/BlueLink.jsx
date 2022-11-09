// Internal dependencies
import './BlueLink.css'
import React from 'react'

// External dependencies
import { navigate } from '@reach/router'

function BlueLink({ children, to }) {
  // Function to navigate to terms and conditions
  function goToTermsConditions() {
    navigate(to)
  }

  return (
    <a onClick={goToTermsConditions} className="blue-link">
      {children}
    </a>
  )
}

export default BlueLink
