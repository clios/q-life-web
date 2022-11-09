// This hook implements role-based access
// control, to verify and authorize roles that
// can use a screen or route.

// To import local dependency needed.
import route from '../route'

// To create the hook.
export default function useRBAC(allowedRoles = []) {
  // To get the currrent user role.
  const me = JSON.parse(localStorage.getItem('me'))
  const user_role = me?.role

  // To return a boolean if user is allowed.
  const isAllowed = allowedRoles.indexOf(user_role) > -1

  // To redirect the user if not allowed.
  if (!isAllowed) {
    route.to.YourAccount()
    location.reload()
  }
}
