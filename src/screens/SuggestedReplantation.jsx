// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import useRBAC from '../hooks/useRBAC'
import SuggestedReplantationTable from '../fragments/SuggestedReplantationTable'
import GetBeneficiaries from '../api/GetBeneficiaries'
import policy from '../policy'

// Import the external dependency needed.
import React from 'react'

// Make a Screen by creating functional component.
export default function SuggestedReplantation() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.suggested_replantation)

  // Declare default values for query params.
  const dv = {
    limit: 30,
    page: 1,
    replantation: true,
    sortBy: 'updated_at',
    direction: 'desc'
  }

  // Initialize states for query params using
  // declared default values.
  const [limit, setLimit] = React.useState(dv.limit)
  const [page, setPage] = React.useState(dv.page)
  const [replantation, setReplantation] = React.useState(dv.replantation)
  const [sortBy, setSortBy] = React.useState(dv.sortBy)
  const [direction, setDirection] = React.useState(dv.direction)

  // Create a function that returns a string for
  // the query params of the API request.
  function makeQueryParams() {
    // Create an object for query params.
    let qp = {
      limit: `limit=${limit}`,
      page: `page=${page}`,
      replantation: `replantation=${replantation}`,
      orders: `orders=${sortBy}:${direction}`
    }

    // Filter out empty query params.
    if (qp.limit === 'limit=') delete qp.limit
    if (qp.page === 'page=') delete qp.page
    if (qp.orders === 'orders=:') delete qp.orders

    // Return a string for request query params.
    return Object.values(qp).join('&')
  }

  // Send get request with query params.
  const queryParams = makeQueryParams()
  const getBeneficiariesResponse = GetBeneficiaries(queryParams)

  // Function for new API request that needs an
  // update of query params.
  function updateQueryParams(queryParams) {
    setLimit(queryParams.limit)
    setPage(queryParams.page)
    setSortBy(queryParams.sortBy)
    setDirection(queryParams.direction)
  }

  // Pass the props needed by the Fragment.
  return (
    <SuggestedReplantationTable
      beneficiariesData={getBeneficiariesResponse?.data}
      queryParams={dv}
      onNewQueryParams={updateQueryParams}
    />
  )
}
