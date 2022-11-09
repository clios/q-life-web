// API is a function used by the Screen to send
// an HTTP request then return a response.

// Import the local dependencies needed.
import useEnv from '../hooks/useEnv'
import useDevLogs from '../hooks/useDevLogs'
import useDeleteRequest from '../hooks/useDeleteRequest'

// Make an API by creating a function.
export default function DeleteBeneficiary(beneficiaryId) {
  // Get environment variables.
  const { API_QLIFE, LOCAL_MODE } = useEnv()

  // Configure the HTTP request.
  const path = '/beneficiaries/' + beneficiaryId
  const url = API_QLIFE + path

  // If local mode is true, return local data.
  if (LOCAL_MODE === true) {
    useDevLogs(`DELETE: ${url}`)
    return { data: localUser }
  }

  // If local mode is false, send HTTP request.
  if (LOCAL_MODE === false) {
    useDevLogs(`DELETE: ${url}`)
    return useDeleteRequest(url)
  }
}
