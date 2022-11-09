// The API can be used by multiple screens.
// In the MVC framework, this will serve as
// the model.Responsible for sending a request
// to the server and receiving a response from the server.

// Local dependencies
import useEnv from '../hooks/useEnv'
import useDevLogs from '../hooks/useDevLogs'
import usePostRequest from '../hooks/usePostRequest'

function PostHarvest(reqBody) {
  // Environment variables
  const { DEVELOP_MODE, LOCAL_MODE, API_QLIFE } = useEnv()

  // API request path
  const pathRequest = '/farms'

  // Development logs
  if (DEVELOP_MODE) {
    let url = `POST: ${API_QLIFE}${pathRequest}`
    useDevLogs(url, reqBody)
  }

  // Stop here if local mode is true
  if (LOCAL_MODE) return

  // Send API request
  let url = API_QLIFE + pathRequest
  const response = usePostRequest(url, reqBody)
}

export default PostHarvest
