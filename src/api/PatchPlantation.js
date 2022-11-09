// API is a function used by the Screen to send
// an HTTP request then return a response.

// Import the local dependencies needed.
import useEnv from '../hooks/useEnv'
import useDevLogs from '../hooks/useDevLogs'
import usePatchRequest from '../hooks/usePatchRequest'

// Make an API by creating a function.
export default function PatchPlantation(plantationId, reqBody) {
  // Get environment variables.
  const { API_QLIFE, LOCAL_MODE } = useEnv()

  // Configure the HTTP request.
  const path = '/plantations/' + plantationId
  const url = API_QLIFE + path

  // If local mode is true
  if (LOCAL_MODE === true) {
    useDevLogs(`PATCH: ${url}`, reqBody)
  }

  // If local mode is false, send HTTP request.
  if (LOCAL_MODE === false) {
    useDevLogs(`PATCH: ${url}`, reqBody)
    return usePatchRequest(url, reqBody)
  }
}
