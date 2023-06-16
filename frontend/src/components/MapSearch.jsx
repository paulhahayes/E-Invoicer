import React, { useEffect, useRef, useState } from 'react'
import { SiGooglemaps } from 'react-icons/si'
import PropTypes from 'prop-types'

const apiKey = 'AIzaSyC8rQZRkAGm6Jq4A-06ENeYyAOgR0ky4uw'
const mapAPIJs = 'https://maps.googleapis.com/maps/api/js'

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src,
    })
    script.addEventListener('load', () => resolve(script))
    document.head.appendChild(script)
  })
}

const MapSearch = ({ onMapChange, styles }) => {
  const searchInput = useRef(null)

  const [mapData, setMapData] = useState({
    StreetNumber: '',
    Street: '',
    Suburb: '',
    City: '',
    PostCode: '',
    State: '',
    Country: '',
  })

  const initMapScript = async () => {
    if (window.google) {
      return
    }
    const src = `${mapAPIJs}?key=${apiKey}&libraries=places&v=weekly`
    await loadAsyncScript(src)
  }
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace()
    const address = place.address_components

    let streetNumber = ''
    let street = ''
    let suburb = ''
    let city = ''
    let postCode = ''
    let state = ''
    let country = ''
    let countryCode = ''

    for (const component of address) {
      const componentType = component.types[0]

      switch (componentType) {
        case 'street_number':
          streetNumber = component.long_name
          break
        case 'route':
          street = component.long_name
          break
        case 'sublocality_level_1':
          suburb = component.long_name
          break
        case 'locality':
          city = component.long_name
          break
        case 'postal_code':
          postCode = component.long_name
          break
        case 'administrative_area_level_1':
          state = component.short_name
          break
        case 'country':
          country = component.long_name
          countryCode = component.short_name
          break
      }
    }

    setMapData({
      StreetNumber: streetNumber,
      Street: street,
      Suburb: suburb,
      City: city,
      PostCode: postCode,
      State: state,
      Country: country,
      CountryCode: countryCode,
    })
  }

  // prettier-ignore
  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(["address_components", "geometry"]);
    autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
  }
  // prettier-ignore
  useEffect(() => {
    (async () => {
      await initMapScript().then(() => initAutocomplete());
    })();
  }, []);

  useEffect(() => {
    onMapChange(mapData)
  }, [mapData])

  return (
    <div className={`${styles}`}>
      <input
        className="w-full rounded-md dark:bg-main-dark-bg bg-gray-50 dark:text-white"
        ref={searchInput}
        type="text"
        id="Address"
        name="Address"
        placeholder="Search location..."
      />
      <span>
        <SiGooglemaps />
      </span>
    </div>
  )
}

MapSearch.propTypes = {
  onMapChange: PropTypes.func.isRequired,
  styles: PropTypes.string,
}

MapSearch.defaultProps = {
  styles: '',
}

export default MapSearch
