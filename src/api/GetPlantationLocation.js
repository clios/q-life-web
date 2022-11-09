// API is a function used by the Screen to send
// an HTTP request then return a response.

// Import the local dependencies needed.
import useEnv from '../hooks/useEnv'
import useDevLogs from '../hooks/useDevLogs'
import localPlantationLocation from '../locals/localPlantationLocation'
import useGetRequest from '../hooks/useGetRequest'

// Make an API by creating a function.
export default function GetPlantationLocation(queryParams) {
  // Get environment variables.
  const { API_QLIFE, LOCAL_MODE } = useEnv()

  // Configure the HTTP request.
  const path = '/plantations?' + queryParams
  const url = API_QLIFE + path

  // If local mode is true, return local data.
  if (LOCAL_MODE === true) {
    useDevLogs(`GET: ${url}`, null, localPlantationLocation)
    return { data: localPlantationLocation }
  }

  // If local mode is false, send HTTP request.
  if (LOCAL_MODE === false) {
    useDevLogs(`GET: ${url}`)
    return useGetRequest(url)
  }
}
