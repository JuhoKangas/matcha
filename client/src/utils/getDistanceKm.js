import { getDistance } from 'geolib'

// getDistance() has 1m accuracy, unless specified otherwise. Returns in meters

export const getDistanceKm = (lat, long, lat2, long2) => {
  const distance = (
    getDistance(
      {
        latitude: lat,
        longitude: long,
      },
      { latitude: lat2, longitude: long2 }
    ) / 1000
  ).toFixed(0)
  return distance
}
