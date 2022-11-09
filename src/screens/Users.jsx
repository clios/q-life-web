// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import useRBAC from '../hooks/useRBAC'
import UsersTable from '../fragments/UsersTable'
import GetUsers from '../api/GetUsers'
import policy from '../policy'

// Import the external dependency needed.
import React from 'react'

// Make a Screen by creating functional component.
export default function Users() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.users)

  // Declare default values for query params.
  const dv = { limit: 30, page: 1 }

  // Initialize states for query params using
  // declared default values.
  const [limit, setLimit] = React.useState(dv.limit)
  const [page, setPage] = React.useState(dv.page)

  // Create a function that returns a string for
  // the query params of the API request.
  function makeQueryParams() {
    // Create an object for query params.
    let qp = { limit: `limit=${limit}`, page: `page=${page}` }

    // Filter out empty query params.
    if (qp.limit === 'limit=') delete qp.limit
    if (qp.page === 'page=') delete qp.page

    // Return a string for request query params.
    return Object.values(qp).join('&')
  }

  // Send get request with query params.
  const queryParams = makeQueryParams()
  const getUsersResponse = GetUsers(queryParams)

  // Function for new API request that needs an
  // update of query params.
  function updateQueryParams(queryParams) {
    setLimit(queryParams.limit)
    setPage(queryParams.page)
  }

  // Pass the props needed by the Fragment.
  return (
    <UsersTable
      usersData={getUsersResponse?.data}
      queryParams={dv}
      onNewQueryParams={updateQueryParams}
    />
  )
}
