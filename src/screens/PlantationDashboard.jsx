// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import useRBAC from '../hooks/useRBAC'
import PlantationDashboardInfo from '../fragments/PlantationDashboardInfo'
import GetPlantationDashboardSeedlings from '../api/GetPlantationDashboardSeedlings'
import GetPlantationDashboardBeneficiaries from '../api/GetPlantationDashboardBeneficiaries'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'

// Make a Screen by creating functional component.
export default function PlantationDashboard() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.plantation_dashboard)

  // Send get request needed.
  const getSeedlingsResponse = GetPlantationDashboardSeedlings()
  const getBeneficiariesResponse = GetPlantationDashboardBeneficiaries()

  // Pass the props needed by the Fragment.
  return (
    <PlantationDashboardInfo
      seedlings={getSeedlingsResponse?.data}
      beneficiaries={getBeneficiariesResponse?.data}
    />
  )
}
