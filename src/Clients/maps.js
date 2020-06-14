import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export const getPlacesNearby = (lat, lng, type, radius = 2000) =>
  client.placesNearby({
    params: {
      key: process.env.GOOGLE_PLACES_API,
      location: { lat, lng },
      radius,
      type,
    },
  })
