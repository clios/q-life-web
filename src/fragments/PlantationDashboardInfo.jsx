// The fragment is used by only one screen.
// In the MVC framework, this will serve as
// the view.Responsible for displaying data
// in web browser and collecting data from user.

// Local dependencies
import './PlantationDashboardInfo.css'
import ScreenTitle from '../components/ScreenTitle'
import PlantationStatusCard from '../components/PlantationStatusCard'
import CropStatusCard from '../components/CropStatusCard'
import Text from '../components/Text'
import CropStatusPie from '../components/CropStatusPie'
import Breadcrumbs from '../components/Breadcrumbs'
import spring from '../spring'

// External dependencies
import React from 'react'
import { useSpring, animated } from 'react-spring'

function PlantationDashboardInfo(props) {
  // Desctructure the props
  const { beneficiaries, seedlings } = props

  // Reference, redefine the key and
  // values ​​of props in a single object
  const ref = {
    beneficiaries: {
      distributed: beneficiaries?.distributed,
      survived: beneficiaries?.survived,
      mortality: beneficiaries?.mortality,
      vegetative: beneficiaries?.vegetative,
      flowering: beneficiaries?.flowering,
      fruiting: beneficiaries?.fruiting,
      harvesting: beneficiaries?.harvesting
    },
    seedlings: {
      distributed: seedlings?.distributed,
      survived: seedlings?.survived,
      mortality: seedlings?.mortality,
      vegetative: seedlings?.vegetative,
      flowering: seedlings?.flowering,
      fruiting: seedlings?.fruiting,
      harvesting: seedlings?.harvesting
    }
  }

  // Default values, an object that will provide
  // the first content of the fragment data model
  const dv = {
    bDistributed: function () {
      return ref.beneficiaries.distributed || 0
    },
    bSurvived: function () {
      return ref.beneficiaries.survived || 0
    },
    bMortality: function () {
      return ref.beneficiaries.mortality || 0
    },
    bVegetative: function () {
      return ref.beneficiaries.vegetative || 0
    },
    bFlowering: function () {
      return ref.beneficiaries.flowering || 0
    },
    bFruiting: function () {
      return ref.beneficiaries.fruiting || 0
    },
    bHarvesting: function () {
      return ref.beneficiaries.harvesting || 0
    },
    sDistributed: function () {
      return ref.seedlings.distributed || 0
    },
    sSurvived: function () {
      return ref.seedlings.survived || 0
    },
    sMortality: function () {
      return ref.seedlings.mortality || 0
    },
    sVegetative: function () {
      return ref.seedlings.vegetative || 0
    },
    sFlowering: function () {
      return ref.seedlings.flowering || 0
    },
    sFruiting: function () {
      return ref.seedlings.fruiting || 0
    },
    sHarvesting: function () {
      return ref.seedlings.harvesting || 0
    }
  }

  // Fragment data model
  const total_beneficiaries_with_distributed = dv.bDistributed()
  const total_beneficiaries_with_survived = dv.bSurvived()
  const total_beneficiaries_with_mortality = dv.bMortality()
  const total_beneficiaries_with_vegetative = dv.bVegetative()
  const total_beneficiaries_with_flowering = dv.bFlowering()
  const total_beneficiaries_with_fruiting = dv.bFruiting()
  const total_beneficiaries_with_harvesting = dv.bHarvesting()
  const total_seedlings_distributed = dv.sDistributed()
  const total_seedlings_survived = dv.sSurvived()
  const total_seedlings_mortality = dv.sMortality()
  const total_seedlings_vegetative = dv.sVegetative()
  const total_seedlings_flowering = dv.sFlowering()
  const total_seedlings_fruiting = dv.sFruiting()
  const total_seedlings_harvesting = dv.sHarvesting()

  return (
    <animated.div style={useSpring(spring.fadeIn)}>
      <Breadcrumbs>
        <small>Plantation Dashboard</small>
      </Breadcrumbs>
      <animated.div style={useSpring(spring.fromTop)}>
        <ScreenTitle>
          <h1>Plantation Status of Quirino Province</h1>
          <p>
            Here are the aggregated plantation and crops statuses within the
            province. The information shown below is based on current records in
            the system.
          </p>
        </ScreenTitle>
      </animated.div>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <div className="plantation-status-grid">
          <PlantationStatusCard
            label="Distributed"
            seedlings={total_seedlings_distributed}>
            Number of seedlings distributed from{' '}
            {total_beneficiaries_with_distributed} beneficiaries
          </PlantationStatusCard>
          <PlantationStatusCard
            label="Survived"
            seedlings={total_seedlings_survived}>
            Number of surviving seedlings from{' '}
            {total_beneficiaries_with_survived} beneficiaries
          </PlantationStatusCard>
          <PlantationStatusCard
            label="Mortality"
            seedlings={total_seedlings_mortality}>
            Number of dead seedlings from {total_beneficiaries_with_mortality}{' '}
            beneficiaries
          </PlantationStatusCard>
        </div>
        <div className="crop-status-grid">
          <div className="crop-status-pie">
            <CropStatusPie
              total_seedlings={[
                total_seedlings_flowering,
                total_seedlings_harvesting,
                total_seedlings_fruiting,
                total_seedlings_vegetative
              ]}
            />
          </div>
          <div className="crop-status-vegetative">
            <CropStatusCard>
              <CropStatusCard.Title>
                <Text color="green">Vegetative</Text>
              </CropStatusCard.Title>
              <CropStatusCard.Description
                surviving={total_seedlings_survived}
                seedlings={total_seedlings_vegetative}>
                Seedlings from {total_beneficiaries_with_vegetative}{' '}
                beneficiaries
              </CropStatusCard.Description>
            </CropStatusCard>
          </div>
          <div className="crop-status-flowering">
            <CropStatusCard>
              <CropStatusCard.Title>
                <Text color="yellow">Flowering</Text>
              </CropStatusCard.Title>
              <CropStatusCard.Description
                surviving={total_seedlings_survived}
                seedlings={total_seedlings_flowering}>
                Seedlings from {total_beneficiaries_with_flowering}{' '}
                beneficiaries
              </CropStatusCard.Description>
            </CropStatusCard>
          </div>
          <div className="crop-status-fruiting">
            <CropStatusCard>
              <CropStatusCard.Title>
                <Text color="orange">Fruiting</Text>
              </CropStatusCard.Title>
              <CropStatusCard.Description
                surviving={total_seedlings_survived}
                seedlings={total_seedlings_fruiting}>
                Seedlings from {total_beneficiaries_with_fruiting} beneficiaries
              </CropStatusCard.Description>
            </CropStatusCard>
          </div>
          <div className="crop-status-harvesting">
            <CropStatusCard>
              <CropStatusCard.Title>
                <Text color="red-orange">Harvesting</Text>
              </CropStatusCard.Title>
              <CropStatusCard.Description
                surviving={total_seedlings_survived}
                seedlings={total_seedlings_harvesting}>
                Seedlings from {total_beneficiaries_with_harvesting}{' '}
                beneficiaries
              </CropStatusCard.Description>
            </CropStatusCard>
          </div>
        </div>
      </animated.div>
    </animated.div>
  )
}

export default PlantationDashboardInfo
