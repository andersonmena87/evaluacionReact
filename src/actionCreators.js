import axios from 'axios';
import { AIRCRAFTS_SUCCESS, LOAD_PROGRESS, AIRCRAFTS_SEARCH } from './constants/const';

const loadProgress = () => ({
  type: LOAD_PROGRESS,
})

const loadAircrafts = () => dispacht => {
  dispacht(loadProgress());
  return axios.get("https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json")
    .then(response => {
      const aircrafts = response.data.acList.filter(arr => {
        return arr.Lat && arr.Long && arr.Id;
      });

      dispacht({
        type: AIRCRAFTS_SUCCESS,
        aircrafts: aircrafts,
      })
    });
};


const searchAircrafts = (event) => (dispacht, state) => {
  let aircrafts = [...state().aircraftsInitial];
  const valor =  event.target.value;
  dispacht({
    type: AIRCRAFTS_SEARCH,
    aircrafts: aircrafts.filter( arr => arr.Cou.includes(valor))
  });
};

export { loadAircrafts, searchAircrafts };