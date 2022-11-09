// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import './PlantationLocationInfo.css'
import address from '../address.json'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'
import InformationRow from '../components/InformationRow'
import spring from '../spring'
import boundaries from '../boundaries'

// Import the external dependencies needed.
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import React from 'react'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import ReactDOMServer from 'react-dom/server'
import { useSpring, animated } from 'react-spring'
import { Button, Field, Select, Loader } from 'shirakami-ui'
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import { useMapEvent, GeoJSON, Marker } from 'react-leaflet'
import Fullscreen from 'react-leaflet-fullscreen-plugin'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { toJpeg } from 'html-to-image'

// Configure the map icon.
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon

// Make a Fragment by creating a functional component.
export default function PlantationLocationInfo(props) {
  // Desctructure all the props.
  const { plantationsData, queryParams } = props
  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    plantationsData: {
      total: plantationsData?.total,
      plantations: plantationsData?.plantations
    },
    queryParams: {
      limit: queryParams.limit,
      page: queryParams.page,
      municipal: queryParams.municipal,
      barangay: queryParams.barangay
    }
  }

  // Configure the map settings.
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false
      })
    })
    return null
  }
  const animateRef = React.useRef(true)
  const lng = 121.590668
  const lat = 16.333978
  const zoom = 9

  // Initialize the utm to latlong converter.
  var utmObj = require('utm-latlng')
  var utm = new utmObj()

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    total: function () {
      return raw.plantationsData.total || 0
    },
    plantations: function () {
      let locations = []
      raw.plantationsData.plantations?.forEach((item) => {
        const { lat, lng } = utm.convertUtmToLatLng(
          item.northing,
          item.easting,
          51,
          'N'
        )
        locations.push({ lat, lng })
      })
      return locations
    },
    regionList: function () {
      return Object.keys(address).sort()
    },
    region: function () {
      return '02'
    },
    provinceList: function () {
      return Object.keys(address[dv.region()].province_list)
    },
    province: function () {
      return 'QUIRINO'
    },
    municipalList: function () {
      let pList = address[dv.region()].province_list[dv.province()]
      let mList = pList.municipality_list
      return Object.keys(mList)
    },
    municipal: function () {
      return raw.queryParams.municipal
    },
    barangayList: function () {
      return []
    },
    barangay: function () {
      return raw.queryParams.barangay
    },
    limit: function () {
      return raw.queryParams.limit
    },
    page: function () {
      return raw.queryParams.page
    }
  }

  // Initialize the states needed to render.
  const total = dv.total()
  const plantations = dv.plantations()
  const region = dv.region()
  const province = dv.province()
  const municipalList = dv.municipalList()
  const [municipal, setMunicipal] = React.useState(dv.municipal())
  const [barangayList, setBarangayList] = React.useState(dv.barangayList())
  const [barangay, setBarangay] = React.useState(dv.barangay())
  const [limit, setLimit] = React.useState(dv.limit())
  const [page, setPage] = React.useState(dv.page())
  const [loading, setLoading] = React.useState(false)

  // Functions for receiving user data inputs
  function selectMunicipal(e) {
    setMunicipal(e.target.value)
    setBarangayList(() => {
      if (e.target.value === '') return []
      let p = address[region].province_list[province]
      return p.municipality_list[e.target.value].barangay_list
    })
    setBarangay('')
  }
  function selectBarangay(e) {
    setBarangay(e.target.value)
  }

  // Returns a single object with query params values
  function getQueryParamsValue() {
    return {
      limit: limit,
      page: page,
      municipal: municipal,
      barangay: barangay
    }
  }

  // Function to download map as JPEG
  function downloadMap() {
    setLoading(true)
    toJpeg(document.getElementById('map'), { quality: 0.95 })
      .then((dataUrl) => {
        var link = document.createElement('a')
        link.download = 'Q-LiFE Plantation Map.jpeg'
        link.href = dataUrl
        link.click()
      })
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        console.log('error')
      })
  }

  // Function to filter plantation markers
  function filterLocation() {
    let queryParams = getQueryParamsValue()
    props.onNewQueryParams(queryParams)
  }

  // Callback function for
  // pagination that skips first render
  const isFirstRun = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    let queryParams = getQueryParamsValue()
    props.onNewQueryParams(queryParams)
  }, [page])

  // Return components to be rendered.
  return (
    <React.Fragment>
      {loading && <Loader />}
      <Breadcrumbs>
        <small>Plantation Location</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Plantation Location on the Map</h1>
        <p>
          Here are the locations of the plantations. Only with easting and
          northing information can be seen here on the map. There are a total of{' '}
          {total} plantation locations from {total} beneficiaries within the
          province.
        </p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <InformationRow>
          <Field label="Municipal">
            <Select onChange={selectMunicipal} value={municipal} required>
              <Select.Option value="">All municipal</Select.Option>
              {municipalList.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Field>
          <Field label="Barangay">
            <Select onChange={selectBarangay} value={barangay} required>
              <Select.Option value="">All barangay</Select.Option>
              {barangayList.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Field>
          <Button
            onClick={() => filterLocation()}
            className="toolbar-button"
            variant="outline">
            Filter
          </Button>
          <Button
            onClick={() => downloadMap()}
            disabled={loading}
            className="toolbar-button"
            variant="outline">
            Download JPEG
          </Button>
        </InformationRow>
        <MapContainer
          id="map"
          className="map-container"
          center={[lat, lng]}
          zoom={zoom}>
          <SetViewOnClick animateRef={animateRef} />
          <Fullscreen />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Stadia.AlidadeSmoothDark">
              <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Esri.WorldImagery">
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}g"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="Plantation Locations" checked>
              {plantations.length >= 1 && (
                <MarkerClusterGroup>
                  {plantations.map((plantation, index) => (
                    <Marker
                      key={index}
                      position={[plantation.lat, plantation.lng]}
                    />
                  ))}
                </MarkerClusterGroup>
              )}
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Barangay Boundaries" checked>
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
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </animated.div>
    </React.Fragment>
  )
}
