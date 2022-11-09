// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import './SignIn.css'
import useEnv from '../hooks/useEnv'
import snackbar from '../snackbar'
import GetYourAccount from '../api/GetYourAccount'
import PostSignIn from '../api/PostSignIn'
import route from '../route'
import SignInForm from '../fragments/SignInForm'

// Import the external dependencies needed.
import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { Loader } from 'shirakami-ui'

// Make a Screen by creating functional component.
export default function SignIn() {
  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize a state for loading.
  const [loading, setLoading] = React.useState(false)

  // Check if account is authenticated already by
  // sending get request of your account and
  // verifying if the local storage has token.
  const getYourAccountRespose = GetYourAccount()
  const token = localStorage.getItem('token')
  React.useEffect(() => {
    if (token && getYourAccountRespose?.data) route.to.PlantationDashboard()
  }, [getYourAccountRespose])

  // Function to sign in a user account.
  function signIn(request_body) {
    // If local mode is true, simulate ok response.
    if (LOCAL_MODE === true) {
      localStorage.setItem('me', '{"name":"Local Mode", "role":"admin"}')
      localStorage.setItem('token', 'LocalToken')
      route.to.PlantationDashboard(true)
      return
    }
    // If local mode is false, handle HTTP request.
    if (LOCAL_MODE === false) {
      setLoading(true)
      PostSignIn(request_body)
        .then((res) => {
          setLoading(false)
          res?.status === 401 && infoSnackbar('Email and password mismatch')
          res?.status === 403 && infoSnackbar('Your account is inactive')
          if (res?.status === 201) {
            localStorage.setItem('token', res.headers.get('Token'))
          }
          return res.json()
        })
        .then((data) => {
          if (data?.name) {
            localStorage.setItem('me', JSON.stringify(data))
            successSnackbar(`Hello ${data.name}!`)
            route.to.PlantationDashboard(true)
          }
        })
        .catch(() => {
          setLoading(false)
          errorSnackbar('Something went wrong')
        })
    }
  }

  // Pass the props needed by the Fragment.
  return (
    <React.Fragment>
      {loading && <Loader />}
      {getYourAccountRespose?.error?.status === 403 ? (
        <SignInForm onSubmitForm={signIn} loading={loading} />
      ) : (
        <React.Fragment>
          {!LOCAL_MODE ? <Loader /> : <SignInForm onSubmitForm={signIn} />}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
