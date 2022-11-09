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
import Confirm from '../confirmation'
import PostPlantation from '../api/PostPlantation'
import route from '../route'
import PlantationCreateForm from '../fragments/PlantationCreateForm'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { useParams } from '@reach/router'
import { confirmAlert } from 'react-confirm-alert'

// Make a Screen by creating functional component.
export default function PlantationCreate() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.plantation_create)

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

  // Function to create plantation.
  function createPlantation(request_body) {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.PlantationCreate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              PostPlantation(request_body)
              successSnackbar('Plantation created')
              route.to.Beneficiary(beneficiaryId)
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              setLoading(true)
              PostPlantation(request_body)
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
                    successSnackbar('Plantation created')
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
  return getBeneficiaryResponse?.data ? (
    <PlantationCreateForm
      loading={loading}
      beneficiary={getBeneficiaryResponse.data}
      farmId={farmId}
      onSubmitForm={createPlantation}
    />
  ) : (
    <div>Loading...</div>
  )
}
