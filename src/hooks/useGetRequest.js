// This hook is to make it easier to
// send an API request using the GET method

// External dependencies
import useSWR from 'swr'
import { useSnackbar } from 'react-simple-snackbar'

// Async function to send a GET API request
const fetcher = async (path) => {
  // Send and wait for response
  const res = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })

  // Throw error if something wrong happens
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  // Make the response as json and return
  return res.json()
}

// The main function in using this hook
function useGetRequest(path) {
  // Snackbar configuration
  const [openSnackbar] = useSnackbar({
    position: 'bottom-right',
    style: { backgroundColor: '#600' }
  })

  // Use the external dependency
  // SWR to send the get request
  const response = useSWR(path, fetcher, {
    // Callback function when a request returns an error
    onErrorRetry: (error, key) => {
      // Never retry on this status
      if (error.status === 404) return
      if (error.status === 403) return
      if (error.status === 402) return
      if (error.status === 401) return

      // Never retry for a specific key
      if (key === '/me') return
    },

    // Timeout to trigger the onLoadingSlow event
    loadingTimeout: 3000,

    // Callback function when a request reaches (see loadingTimeout)
    onLoadingSlow: (key) => {
      openSnackbar('Seems like your internet is too slow')
    }
  })

  // Return the response of SWR API request
  return response
}

export default useGetRequest
