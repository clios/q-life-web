import './RolesAndResponsibilities.css'
import React from 'react'

function RolesAndResponsibilities() {
  return (
    <div className="roles-responsibilities">
      <h2>User Roles and Responsibilities</h2>
      <h3>Database Controller</h3>
      <p>
        Responsible for managing end user's accounts and lead the management of
        information such as: beneficiaries, farms, plantations, pests and
        diseases, and harvests.
      </p>
      <h3>Administrative Aide</h3>
      <p>
        Responsible for assisting the Database Controller in managing
        information about: beneficiaries, farms, plantations, pests and
        diseases, and harvests. They are not authorized to manage end user's
        accounts.
      </p>
    </div>
  )
}

export default RolesAndResponsibilities
