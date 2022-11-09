// Internal dependencies
import React from 'react'

// External dependencies
import Chart from 'chart.js/auto'

function CropStatusPie({ total_seedlings }) {
  const ctx = React.useRef(null)

  const data = {
    labels: ['Flowering', 'Harvesting', 'Fruiting', 'Vegetative'],
    datasets: [
      {
        label: 'Status of Crops',
        data: total_seedlings,
        backgroundColor: ['#F2C94C', '#EB7257', '#F2994A', '#6FCF97'],
        hoverOffset: 4
      }
    ]
  }

  React.useEffect(() => {
    let pie = new Chart(ctx.current.getContext('2d'), {
      type: 'pie',
      data: data,
      options: { plugins: { legend: { display: false } } }
    })

    return () => {
      pie.destroy()
    }
  })

  return (
    <div>
      <canvas ref={ctx} />
    </div>
  )
}

export default CropStatusPie
