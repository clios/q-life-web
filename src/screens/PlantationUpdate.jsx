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
import GetPlantation from '../api/GetPlantation'
import Confirm from '../confirmation'
import PatchPlantation from '../api/PatchPlantation'
import route from '../route'
import PlantationUpdateForm from '../fragments/PlantationUpdateForm'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSnackbar } from 'react-simple-snackbar'
import { useParams } from '@reach/router'

// Make a Screen by creating functional component.
export default function PlantationUpdate() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.plantation_update)

  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize a loading state.
  const [loading, setLoading] = React.useState(false)

  // Get route params and send get request needed.
  const { beneficiaryId, plantationId } = useParams()
  const getBeneficiaryResponse = GetBeneficiary(beneficiaryId)
  const getPlantationResponse = GetPlantation(plantationId)

  // Function to update plantation.
  function updatePlantation(request_body) {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.PlantationUpdate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              PatchPlantation(plantationId, request_body)
              successSnackbar('Plantation updated')
              route.to.Beneficiary(beneficiaryId)
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              setLoading(true)
              PatchPlantation(plantationId, request_body)
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
                    successSnackbar('Plantation updated')
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
  return getBeneficiaryResponse?.data && getPlantationResponse?.data ? (
    <PlantationUpdateForm
      loading={loading}
      beneficiary={getBeneficiaryResponse.data}
      plantation={getPlantationResponse.data}
      onSubmitForm={updatePlantation}
    />
  ) : (
    <div>Loading...</div>
  )
}
