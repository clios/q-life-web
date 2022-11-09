// Sign out button in the navigation
// that requires confirmation from the user

// Import the local dependencies needed.
import './SignOut.css'
import useEnv from '../hooks/useEnv'
import snackbar from '../snackbar'
import Confirm from '../confirmation'
import PostSignOut from '../api/PostSignOut'
import route from '../route'

// Import the external dependencies needed.
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSnackbar } from 'react-simple-snackbar'
import { Loader } from 'shirakami-ui'

// Make a sign out button by creating a functional component.
export default function SignOut() {
  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize a state for loading.
  const [loading, setLoading] = React.useState(false)

  // Function to sign out a user account.
  function signOut() {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.SignOut
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              PostSignOut()
              successSnackbar('You just signed out')
              localStorage.removeItem('token')
              localStorage.removeItem('me')
              route.to.SignIn()
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              setLoading(true)
              PostSignOut()
                .then(() => {
                  setLoading(false)
                  successSnackbar('You just signed out')
                  localStorage.removeItem('token')
                  localStorage.removeItem('me')
                  route.to.SignIn()
                })
                .catch(() => {
                  setLoading(false)
                  errorSnackbar('Something went wrong')
                })
            }
          }}
        />
      )
    })
  }

  // Return components to be rendered.
  return (
    <React.Fragment>
      {loading && <Loader />}
      <a onClick={signOut} className="sign-out-button">
        Sign Out
      </a>
    </React.Fragment>
  )
}
