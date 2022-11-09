import './CropStatusCard.css'
import React from 'react'

function CropStatusCard({ children }) {
  return <div className="crop-status-card">{children}</div>
}

CropStatusCard.Title = ({ children }) => {
  return <h3 className="crop-status-card-title">{children}</h3>
}

CropStatusCard.Description = ({ children, surviving, seedlings }) => {
  let percent = (seedlings / surviving) * 100
  percent = percent.toFixed(3).toLocaleString()

  return (
    <div>
      <p className="crop-status-card-percent">
        {isNaN(percent) ? 0 : percent}%
      </p>
      <p className="crop-status-card-seedlings">
        {seedlings?.toLocaleString()}
      </p>
      <small>{children}</small>
    </div>
  )
}

export default CropStatusCard
