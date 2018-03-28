import axios from 'axios';
import { AIRCRAFTS_SUCCESS } from './constants/const'; 

const loadAircrafts = () => {
  return dispacht => {
    return axios.get("https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json")
    .then(response => {
      dispacht({
        type: AIRCRAFTS_SUCCESS,
        aircrafts: response.data.acList
      })
    });
  };
}

export {loadAircrafts};