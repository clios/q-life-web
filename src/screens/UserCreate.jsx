// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import useRBAC from '../hooks/useRBAC'
import useEnv from '../hooks/useEnv'
import snackbar from '../snackbar'
import Confirm from '../confirmation'
import PostUser from '../api/PostUser'
import route from '../route'
import UserCreateForm from '../fragments/UserCreateForm'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { confirmAlert } from 'react-confirm-alert'

// Make a Screen by creating functional component.
export default function UserCreate() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.user_create)

  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize a loading state.
  const [loading, setLoading] = React.useState(false)

  // Function to create a user account.
  function createUser(request_body) {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.UserCreate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              PostUser(request_body)
              successSnackbar('User created')
              route.to.User(1)
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              setLoading(true)
              PostUser(request_body)
                .then((res) => {
                  setLoading(false)
                  res?.status === 401 && infoSnackbar('Unauthorized')
                  return res.json()
                })
                .then((data) => {
                  if (!data?.id) {
                    let key = Object.keys(data)[0]
                    let value = Object.values(data)[0]
                    infoSnackbar(key + ' is ' + value)
                  } else {
                    successSnackbar(`${data.name} created`)
                    route.to.User(data.id)
                  }
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

  // Pass the props needed by the Fragment.
  return <UserCreateForm loading={loading} onSubmitForm={createUser} />
}
