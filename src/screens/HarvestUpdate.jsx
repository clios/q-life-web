// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import useRBAC from '../hooks/useRBAC'
import useEnv from '../hooks/useEnv'
import snackbar from '../snackbar'
import GetBeneficiary from '../api/GetBeneficiary'
import GetFarm from '../api/GetFarm'
import Confirm from '../confirmation'
import PatchHarvest from '../api/PatchHarvest'
import route from '../route'
import HarvestUpdateForm from '../fragments/HarvestUpdateForm'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSnackbar } from 'react-simple-snackbar'
import { useParams } from '@reach/router'

// Make a Screen by creating functional component.
export default function HarvestUpdate() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.harvest_update)

  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize a loading state.
  const [loading, setLoading] = React.useState(false)

  // Get route params and send get request needed.
  const { beneficiaryId, farmId } = useParams()
  const getBeneficiaryResponse = GetBeneficiary(beneficiaryId)
  const getFarmResponse = GetFarm(farmId)

  // Function to update harvest.
  function updateHarvest(request_body) {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.HarvestUpdate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              PatchHarvest(farmId, request_body)
              successSnackbar('Harvest updated')
              route.to.Beneficiary(beneficiaryId)
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              setLoading(true)
              PatchHarvest(farmId, request_body)
                .then((res) => {
                  setLoading(false)
                  res?.status === 401 && infoSnackbar('Unauthorized')
                  return res.json()
                })
                .then((data) => {
                  if (!data?.id) {
                    let key = Object.keys(data)[0]
                    let value = Object.values(data)[0]
                    infoSnackbar(key + ' is ' + value)
                  } else {
                    successSnackbar('Harvest updated')
                    route.to.Beneficiary(beneficiaryId)
                  }
                })
                .catch(() => {
                  setLoading(false)
                  errorSnackbar('Something went wrong')
                })
            }
          }}
        />
      )
    })
  }

  // Pass the props needed by the Fragment.
  return getBeneficiaryResponse?.data && getFarmResponse?.data ? (
    <HarvestUpdateForm
      loading={loading}
      beneficiary={getBeneficiaryResponse.data}
      farm={getFarmResponse.data}
      onSubmitForm={updateHarvest}
    />
  ) : (
    <div>Loading...</div>
  )
}
