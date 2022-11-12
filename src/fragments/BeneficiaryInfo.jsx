// Fragment is a functional component used for
// all application User Interface logic.

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

import { Button, Field, Loader } from 'shirakami-ui'
import { GeoJSON, Marker, useMapEvent } from 'react-leaflet'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import { animated, useSpring } from 'react-spring'

import Breadcrumbs from '../components/Breadcrumbs'
import Fullscreen from 'react-leaflet-fullscreen-plugin'
import InformationRow from '../components/InformationRow'
import L from 'leaflet'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ScreenTitle from '../components/ScreenTitle'
import TitleWithIcon from '../components/TitleWithIcon'
import boundaries from '../boundaries'
import dayjs from 'dayjs'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import route from '../route'
import spring from '../spring'

// Configure the map icon.
let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [16, 30],
  iconAnchor: [12, 25]
  // shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon

// Make a Fragment by creating a functional component.
export default function BeneficiaryInfo(props) {
  // Destructure all the props.
  const { beneficiary, farmsData, plantationsData } = props

  // Configure the map settings.
  const [zoom, setZoom] = React.useState(13)

  // Initialize the utm to latlong converter.
  var utmObj = require('utm-latlng')
  var utm = new utmObj()

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    beneficiary: {
      id: beneficiary?.id,
      name: beneficiary?.name,
      birthday: beneficiary?.birthday,
      sex: beneficiary?.sex,
      civil_status: beneficiary?.civil_status,
      region: beneficiary?.region,
      province: beneficiary?.province,
      municipal: beneficiary?.municipal,
      barangay: beneficiary?.barangay,
      created_at: beneficiary?.created_at,
      updated_at: beneficiary?.updated_at,
      last_updated_by: beneficiary?.last_updated_by
    },
    farmsData: {
      total: farmsData?.total,
      farms: farmsData?.farms
    },
    plantationsData: {
      total: plantationsData?.total,
      plantations: plantationsData?.plantations
    }
  }

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    beneficiaryId() {
      return raw.beneficiary.id || 1
    },
    farmId() {
      if (!raw.farmsData.farms) return 1
      return raw.farmsData.farms[0]?.id
    },
    plantationId() {
      if (!raw.plantationsData.plantations) return 1
      return raw.plantationsData.plantations[0]?.id
    },
    updatedAt: function () {
      return dayjs(raw.beneficiary.updated_at).format('MMMM DD, YYYY hh:mm A')
    },
    lastUpdatedBy: function () {
      return raw.beneficiary.last_updated_by?.toUpperCase() || 'N/A'
    },
    name: function () {
      return raw.beneficiary.name?.toUpperCase() || 'N/A'
    },
    beneficiaryAddress: function () {
      let a = [raw.beneficiary.barangay, raw.beneficiary.municipal, raw.beneficiary.province, raw.beneficiary.region]
      return a.filter(Boolean).join(', ')?.toUpperCase() || 'N/A'
    },
    birthday: function () {
      if (!raw.beneficiary.birthday) return 'N/A'
      return dayjs(raw.beneficiary.birthday).format('MMMM DD, YYYY')
    },
    civilStatus: function () {
      return raw.beneficiary.civil_status?.toUpperCase() || 'N/A'
    },
    farmAddress: function () {
      if (!raw.farmsData.farms) return 'N/A'
      let a = [raw.farmsData.farms[0]?.barangay, raw.farmsData.farms[0]?.municipal, raw.farmsData.farms[0]?.province, raw.farmsData.farms[0]?.region]
      return a.filter(Boolean).join(', ')?.toUpperCase()
    },
    coffeeVariety: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.variety?.toUpperCase()
    },
    area: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.area
    },
    distributed: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.seedlings_distributed
    },
    survived: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.seedlings_survived
    },
    mortality: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.seedlings_mortality
    },
    vegetative: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.seedlings_vegetative
    },
    flowering: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.seedlings_flowering
    },
    fruiting: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.seedlings_fruiting
    },
    harvesting: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.seedlings_harvesting
    },
    northing: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.northing
    },
    easting: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.easting
    },
    latitude: function () {
      if (!raw.plantationsData.plantations) return 0
      const { lat } = utm.convertUtmToLatLng(raw.plantationsData.plantations[0]?.northing, raw.plantationsData.plantations[0]?.easting, 51, 'N')
      return lat
    },
    longitude: function () {
      if (!raw.plantationsData.plantations) return 0
      const { lng } = utm.convertUtmToLatLng(raw.plantationsData.plantations[0]?.northing, raw.plantationsData.plantations[0]?.easting, 51, 'N')
      return lng
    },
    fresh: function () {
      if (!raw.farmsData.farms) return 'N/A'
      return raw.farmsData.farms[0]?.harvests_fresh
    },
    dry: function () {
      if (!raw.farmsData.farms) return 'N/A'
      return raw.farmsData.farms[0]?.harvests_dry
    },
    gcb: function () {
      if (!raw.farmsData.farms) return 'N/A'
      return raw.farmsData.farms[0]?.harvests_gcb
    },
    ants: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.pests_ant
    },
    aphids: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.pests_aphid
    },
    stemBorers: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.pests_stemborer
    },
    others: function () {
      if (!raw.plantationsData.plantations) return 'N/A'
      return raw.plantationsData.plantations[0]?.pests_others
    }
  }

  // Initialize the states needed to render.
  const updatedAt = dv.updatedAt()
  const lastUpdatedBy = dv.lastUpdatedBy()
  const beneficiaryId = dv.beneficiaryId()
  const farmId = dv.farmId()
  const plantationId = dv.plantationId()
  const name = dv.name()
  const beneficiaryAddress = dv.beneficiaryAddress()
  const birthday = dv.birthday()
  const civilStatus = dv.civilStatus()
  const farmAddress = dv.farmAddress()
  const coffeeVariety = dv.coffeeVariety()
  const area = dv.area()
  const distributed = dv.distributed()
  const survived = dv.survived()
  const mortality = dv.mortality()
  const vegetative = dv.vegetative()
  const flowering = dv.flowering()
  const fruiting = dv.fruiting()
  const harvesting = dv.harvesting()
  const northing = dv.northing()
  const easting = dv.easting()
  const [latitude, setLatitude] = React.useState(dv.latitude())
  const [longitude, setLongitude] = React.useState(dv.longitude())
  const fresh = dv.fresh()
  const dry = dv.dry()
  const gcb = dv.gcb()
  const ants = dv.ants()
  const aphids = dv.aphids()
  const stemBorers = dv.stemBorers()
  const others = dv.others()

  // Send delete beneficiary event to screen.
  function deleteBeneficiary() {
    props.onDeleteBeneficiary()
  }

  React.useState(() => {}, [])
  const { lat, lng } = utm.convertUtmToLatLng(northing, easting, 51, 'Q')

  // Return components to be rendered.
  return (
    <div>
      {beneficiary == undefined && <Loader />}
      {farmsData == undefined && <Loader />}
      {plantationsData == undefined && <Loader />}
      <Breadcrumbs>
        <small onClick={() => route.to.Beneficiaries()}>Registered Beneficiaries</small>
        <small>{name}</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>{name}</h1>
        <p>Updated By: {lastUpdatedBy}</p>
        <p>Updated At: {updatedAt}</p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <TitleWithIcon>
          <h2>1. Personal Information</h2>
          <Button onClick={() => route.to.BeneficiaryUpdate(beneficiaryId)} variant="icon" icon="edit" />
        </TitleWithIcon>
        <InformationRow>
          <Field label="Name">{name}</Field>
          <Field label="Address">{beneficiaryAddress}</Field>
          <Field label="Birthday">{birthday}</Field>
          <Field label="Civil Status">{civilStatus}</Field>
        </InformationRow>
        <TitleWithIcon>
          <h2>2. Farm Information</h2>
          {!farmAddress ? (
            <Button onClick={() => route.to.FarmCreate(beneficiaryId)} variant="icon" icon="plus" />
          ) : (
            <Button onClick={() => route.to.FarmUpdate(beneficiaryId, farmId)} variant="icon" icon="edit" />
          )}
        </TitleWithIcon>
        <InformationRow>{<Field label="Address">{farmAddress || 'N/A'}</Field>}</InformationRow>
        <TitleWithIcon>
          <h2>3. Plantation Information</h2>
          {farmAddress && !coffeeVariety && <Button onClick={() => route.to.PlantationCreate(beneficiaryId, farmId)} variant="icon" icon="plus" />}
          {farmAddress && coffeeVariety && (
            <Button onClick={() => route.to.PlantationUpdate(beneficiaryId, farmId, plantationId)} variant="icon" icon="edit" />
          )}
        </TitleWithIcon>
        {farmAddress ? (
          <React.Fragment>
            <InformationRow>
              <Field label="Coffee Variety">{coffeeVariety || 'N/A'}</Field>
              <Field label="Area (hectare)">{area || 'N/A'}</Field>
              <Field label="Distributed">{distributed || 'N/A'}</Field>
              <Field label="Survived">{survived || 'N/A'}</Field>
              <Field label="Mortality">{mortality || 'N/A'}</Field>
            </InformationRow>
            <InformationRow>
              <Field label="Vegetative">{vegetative || 'N/A'}</Field>
              <Field label="Flowering">{flowering || 'N/A'}</Field>
              <Field label="Fruiting">{fruiting || 'N/A'}</Field>
              <Field label="Harvesting">{harvesting || 'N/A'}</Field>
            </InformationRow>
            <InformationRow>
              <Field label="Northing">{easting || 'N/A'}</Field>
              <Field label="Easting">{northing || 'N/A'}</Field>
            </InformationRow>
            {console.log(lat)}
            {lat ? (
              <MapContainer id="map" className="map-container-plantation" center={[lat, lng]} zoom={zoom}>
                <Fullscreen />
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                  data={boundaries}
                  style={{
                    fillOpacity: 0.1,
                    weight: 1,
                    color: '#eb8934'
                  }}
                  onEachFeature={(feature, layer) => {
                    const popupContent = ReactDOMServer.renderToString(
                      <p>
                        {feature.properties.BRGY}, {feature.properties.MUN}
                      </p>
                    )
                    layer.bindPopup(popupContent)
                  }}></GeoJSON>
                <Marker position={[lat, lng]} />
              </MapContainer>
            ) : (
              <InformationRow>
                <p className="text-red">No Location Found</p>
              </InformationRow>
            )}
          </React.Fragment>
        ) : (
          <InformationRow>
            <Field>Please add farm address first</Field>
          </InformationRow>
        )}

        <TitleWithIcon>
          <h2>4. Harvest Information</h2>
          {farmAddress && <Button onClick={() => route.to.HarvestUpdate(beneficiaryId, farmId)} variant="icon" icon="edit" />}
        </TitleWithIcon>
        {farmAddress ? (
          <InformationRow>
            <Field label="Fresh (kilo)">{fresh || 'N/A'}</Field>
            <Field label="Dry (kilo)">{dry || 'N/A'}</Field>
            <Field label="GCB (kilo)">{gcb || 'N/A'}</Field>
          </InformationRow>
        ) : (
          <InformationRow>
            <Field>Please add farm address first...</Field>
          </InformationRow>
        )}
        <TitleWithIcon>
          <h2>5. Pest and Disease Information</h2>
          {farmAddress && <Button onClick={() => route.to.PestDiseaseUpdate(beneficiaryId, farmId, plantationId)} variant="icon" icon="edit" />}
        </TitleWithIcon>
        <InformationRow>
          {farmAddress ? (
            <React.Fragment>
              <Field label="Ants">{ants || '0'}%</Field>
              <Field label="Aphids">{aphids || '0'}%</Field>
              <Field label="Stem Borers">{stemBorers || '0'}%</Field>
              <Field label="Others">{others || '0'}%</Field>
            </React.Fragment>
          ) : (
            <InformationRow>
              <Field>Please add farm address first...</Field>
            </InformationRow>
          )}
        </InformationRow>
        <TitleWithIcon />
        <Button onClick={deleteBeneficiary} variant="outline">
          Delete beneficiary
        </Button>
      </animated.div>
    </div>
  )
}
