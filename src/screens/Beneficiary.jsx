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
import GetFarms from '../api/GetFarms'
import GetPlantations from '../api/GetPlantations'
import Confirm from '../confirmation'
import DeleteBeneficiary from '../api/DeleteBeneficiary'
import route from '../route'
import BeneficiaryInfo from '../fragments/BeneficiaryInfo'
import policy from '../policy'

// Import the external dependencies needed.
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSnackbar } from 'react-simple-snackbar'
import { useParams } from '@reach/router'

// Make a Screen by creating functional component.
export default function Beneficiary() {
  // To implement Role-Based Access Control, if
  // the user role is not allowed to access the
  // screen or route, the user will be redirected
  // to the safe route.
  useRBAC(policy.route.beneficiary)

  // Get environment variable.
  const { LOCAL_MODE } = useEnv()

  // Configure the snackbar.
  const [successSnackbar] = useSnackbar(snackbar.success)
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Get route params and send get request needed.
  const { beneficiaryId } = useParams()
  const getBeneficiaryResponse = GetBeneficiary(beneficiaryId)
  const getFarmsResponse = GetFarms(beneficiaryId)
  const getPlantationsResponse = GetPlantations(beneficiaryId)

  // Function to delete a beneficiary.
  function deleteBeneficiary() {
    // Display confirmation box.
    confirmAlert({
      customUI: ({ onClose }) => (
        <Confirm.BeneficiaryDelete
          onClose={onClose}
          onSubmit={() => {
            onClose()
            // If local mode is true, simulate ok response.
            if (LOCAL_MODE === true) {
              successSnackbar('Beneficiary deleted')
              route.to.Beneficiaries()
            }
            // If local mode is false, handle HTTP request.
            if (LOCAL_MODE === false) {
              DeleteBeneficiary(beneficiaryId)
                .then((res) => {
                  res?.status === 401 && infoSnackbar('Unauthorized')
                })
                .then(() => {
                  successSnackbar('Beneficiary deleted')
                  route.to.Beneficiaries()
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
  return (
    <BeneficiaryInfo
      beneficiary={getBeneficiaryResponse?.data}
      farmsData={getFarmsResponse?.data}
      plantationsData={getPlantationsResponse?.data}
      onDeleteBeneficiary={deleteBeneficiary}
    />
  )
}
