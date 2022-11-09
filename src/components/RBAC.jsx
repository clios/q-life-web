// To import external dependencies.
import React from 'react'

// To create functional component.
export default function RBAC(props) {
  // To destructure props and set default values.
  const { allowedRoles = [], children } = props

  // To get the current user role.
  const me = JSON.parse(localStorage.getItem('me'))
  const user_role = me?.role

  // To return a boolean if user is allowed.
  const isAllowed = allowedRoles.indexOf(user_role) > -1

  // To display component if allowed.
  return (
    <React.Fragment>{isAllowed ? children : <React.Fragment />}</React.Fragment>
  )
}
