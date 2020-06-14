import 'dotenv/config'

import { concat } from 'ramda'
import cors from 'cors'
import express from 'express'
import { getPlacesNearby } from './Clients/maps.js'

const app = express()
app.use(cors())
app.disable('x-powered-by')


app.get('/', (req, res) => {
  try {
    const {lat, lng, radius} = req.query
    const getGasStations = getPlacesNearby(lat, lng, 'gas_station', radius).catch((e) => console.log(e))
    const getHospitals = getPlacesNearby(lat, lng, 'hospital', radius).catch((e) =>
    console.log(e)
    )
    
    Promise.all([getGasStations, getHospitals]).then((responses) => res.send(responses.reduce((acc, { data }) => concat(acc, data.results), [])))
    .catch(() => res.send(Error('internal server error')))
  }
  catch {
    res.send(Error('internal server error'))
  }
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
