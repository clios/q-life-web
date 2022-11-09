import './PlantationStatusCard.css'
import React from 'react'

function PlantationStatusCard({ children, label, seedlings }) {
  return (
    <div className="plantation-status-card">
      <h3 className="plantation-status-card-label">{label}</h3>
      <p>{seedlings?.toLocaleString()}</p>
      <small className="plantation-status-card-unit">Seedlings</small>
      <small>{children}</small>
    </div>
  )
}

export default PlantationStatusCard
