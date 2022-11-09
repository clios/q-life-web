// This hook is to make it easier to
// send an API request using the DELETE method

export async function useDeleteRequest(url) {
  // Send and wait for response
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })

  // Return the API response
  return response
}

export default useDeleteRequest
