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
import PatchBeneficiary from '../api/PatchBeneficiary'
import route from '../route'
import BeneficiaryUpdateForm from '../fragments/BeneficiaryUpdateForm'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSnackbar } from 'react-simple-snackbar'
import { useParams } from '@reach/router'

// Make a Screen by creating functional component.
export default function BeneficiaryUpdate() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.beneficiary_update)

  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize loading state.
  const [loading, setLoading] = React.useState(false)

  // Get route params and send get request needed.
  const { beneficiaryId } = useParams()
  const getBeneficiaryResponse = GetBeneficiary(beneficiaryId)

  // Function to update beneficiary.
  function updateBeneficiary(request_body) {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.BeneficiaryUpdate
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              PatchBeneficiary(beneficiaryId, request_body)
              successSnackbar('Beneficiary updated')
              route.to.Beneficiary(beneficiaryId)
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              setLoading(true)
              PatchBeneficiary(beneficiaryId, request_body)
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
                    setLoading(false)
                    successSnackbar(`${data.name} updated`)
                    route.to.Beneficiary(beneficiaryId)
                  }
                })
                .catch(() => {
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
    <BeneficiaryUpdateForm
      loading={loading}
      beneficiary={getBeneficiaryResponse.data}
      onSubmitForm={updateBeneficiary}
    />
  ) : (
    <div>Loading</div>
  )
}
