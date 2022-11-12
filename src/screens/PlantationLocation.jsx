// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.

import GetPlantationLocation from '../api/GetPlantationLocation'
import PlantationLocationInfo from '../fragments/PlantationLocationInfo'
import React from 'react'
import policy from '../policy'
import useRBAC from '../hooks/useRBAC'

// Import the external dependency needed.

function PlantationLocation() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.plantation_location)

  // Default values for query params
  const dv = {
    municipal: '',
    barangay: ''
  }

  // Initialize states for query params using
  // declared default values.
  const [limit, setLimit] = React.useState(dv.limit)
  const [page, setPage] = React.useState(dv.page)
  const [municipal, setMunicipal] = React.useState(dv.municipal)
  const [barangay, setBarangay] = React.useState(dv.barangay)

  // Create a function that returns a string for
  // the query params of the API request.
  function makeQueryParams() {
    // Create an object for query params.
    let qp = {
      municipal: `municipal=${municipal}`,
      barangay: `barangay=${barangay}`
    }

    // Filter out empty query params.
    if (qp.municipal === 'municipal=') delete qp.municipal
    if (qp.barangay === 'barangay=') delete qp.barangay

    // Return a string for request query params.
    return Object.values(qp).join('&')
  }

  // Send get request with query params.
  const queryParams = makeQueryParams()
  const getPlantationLocationResponse = GetPlantationLocation(queryParams)

  // Function for new API request that needs an
  // update of query params.
  function updateQueryParams(queryParams) {
    setMunicipal(queryParams.municipal)
    setBarangay(queryParams.barangay)
  }

  // Pass the props needed by the Fragment.
  return <PlantationLocationInfo plantationsData={getPlantationLocationResponse?.data} queryParams={dv} onNewQueryParams={updateQueryParams} />
}

export default PlantationLocation
