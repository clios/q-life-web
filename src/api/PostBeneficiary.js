// API is a function used by the Screen to send
// an HTTP request then return a response.

// Import the local dependencies needed.
import useEnv from '../hooks/useEnv'
import useDevLogs from '../hooks/useDevLogs'
import usePostRequest from '../hooks/usePostRequest'

// Make an API by creating a function.
export default function PostBeneficiary(reqBody) {
  // Get environment variables.
  const { LOCAL_MODE, API_QLIFE } = useEnv()

  // Configure the HTTP request.
  const path = '/beneficiaries'
  const url = API_QLIFE + path

  // If local mode is true
  if (LOCAL_MODE === true) {
    useDevLogs(`POST: ${url}`, reqBody)
  }

  // If local mode is false, send HTTP request.
  if (LOCAL_MODE === false) {
    useDevLogs(`POST: ${url}`, reqBody)
    return usePostRequest(url, reqBody)
  }
}
