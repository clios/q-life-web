// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import useRBAC from '../hooks/useRBAC'
import useEnv from '../hooks/useEnv'
import snackbar from '../snackbar'
import GetUser from '../api/GetUser'
import Confirm from '../confirmation'
import PostDeactivateUser from '../api/PostDeactivateUser'
import PostActivateUser from '../api/PostActivateUser'
import route from '../route'
import UserInfo from '../fragments/UserInfo'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSnackbar } from 'react-simple-snackbar'
import { useParams } from '@reach/router'

// Make a Screen by creating functional component.
export default function User() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.user)

  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Get route params and send get request needed.
  const { userId } = useParams()
  const getUserResponse = GetUser(userId)

  // Function to deactivate a user account.
  function deactivateUser() {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.UserDeactivate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              successSnackbar(getUserResponse?.data?.name + ' deactivated')
              route.to.Users()
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              PostDeactivateUser(userId)
                .then((res) => {
                  res?.status === 401 && infoSnackbar('Unauthorized')
                })
                .then(() => {
                  successSnackbar(getUserResponse?.data?.name + ' deactivated')
                  route.to.Users()
                })
                .catch(() => {
                  errorSnackbar('Something went wrong')
                })
            }
          }}
        />
      )
    })
  }

  // Function to reactivate a user account.
  function reactivateUser() {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.UserReactivate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              successSnackbar(getUserResponse?.data?.name + ' reactivated')
              route.to.Users()
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              PostActivateUser(userId)
                .then((res) => {
                  res?.status === 401 && infoSnackbar('Unauthorized')
                })
                .then(() => {
                  successSnackbar(getUserResponse?.data?.name + ' reactivated')
                  route.to.Users()
                })
                .catch(() => {
                  errorSnackbar('Something went wrong')
                })
            }
          }}
        />
      )
    })
  }

  // Pass the props needed by the Fragment.
  return (
    <UserInfo
      user={getUserResponse?.data}
      onDeactivateUser={deactivateUser}
      onReactivateUser={reactivateUser}
    />
  )
}
