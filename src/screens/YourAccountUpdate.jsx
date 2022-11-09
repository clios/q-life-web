// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import useEnv from '../hooks/useEnv'
import snackbar from '../snackbar'
import GetYourAccount from '../api/GetYourAccount'
import Confirm from '../confirmation'
import PatchYourAccount from '../api/PatchYourAccount'
import route from '../route'
import YourAccountUpdateForm from '../fragments/YourAccountUpdateForm'

// Import the external dependencies needed.
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSnackbar } from 'react-simple-snackbar'

// Make a Screen by creating functional component.
export default function YourAccountUpdate() {
  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize loading state.
  const [loading, setLoading] = React.useState(false)

  // Send get your account request.
  const getYourAccountResponse = GetYourAccount()

  // Function to update your account.
  function updateYourAccount(request_body) {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.YourAccountUpdate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              PatchYourAccount(request_body)
              successSnackbar('Your account is now updated')
              route.to.YourAccount()
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              setLoading(true)
              PatchYourAccount(request_body)
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
                    successSnackbar('Your account is now updated')
                    route.to.YourAccount()
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
  return getYourAccountResponse?.data ? (
    <YourAccountUpdateForm
      loading={loading}
      account={getYourAccountResponse.data}
      onSubmitForm={updateYourAccount}
    />
  ) : (
    <div>Loading...</div>
  )
}
