// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import YourAccountInfo from '../fragments/YourAccountInfo'
import GetYourAccount from '../api/GetYourAccount'

// Import the external dependency needed.
import React from 'react'

// Make a Screen by creating functional component.
export default function YourAccount() {
  // Send get user request.
  const getYourAccountResponse = GetYourAccount()

  // Pass the props needed by the Fragment.
  return <YourAccountInfo account={getYourAccountResponse?.data} />
}
