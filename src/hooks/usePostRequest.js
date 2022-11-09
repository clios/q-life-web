// This hook is to make it easier to
// send an API request using the POST method

export async function usePostRequest(url, data = {}) {
  // Send and wait for response
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })

  // Return the API response
  return response
}

export default usePostRequest
