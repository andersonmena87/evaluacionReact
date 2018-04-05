import axios from 'axios';
import * as consts from './constants/const';

const loadProgress = () => ({
  type: consts.LOAD_PROGRESS,
})

const loadAircrafts = () => (dispacht, state) => {
  dispacht(loadProgress());
  return axios.get("https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json")
    .then(response => {
      let aircrafts = response.data.acList.filter(arr => {
        return arr.Lat && arr.Long && arr.Id;
      });

      const aircraftsInitial = [...aircrafts];

      aircrafts = aircrafts.filter(arr => arr.Cou.includes(state().country))

      dispacht({
        type: consts.AIRCRAFTS_SUCCESS,
        aircrafts: [...aircrafts].slice(0, state().limit),
        aircraftsInitial: aircraftsInitial
      })
    });
};


const searchAircrafts = event => (dispacht, state) => {
  let aircrafts = [...state().aircraftsInitial];
  const valor = event.target.value;
  aircrafts = aircrafts.filter(arr => arr.Cou.includes(valor)).slice(0, state().limit);

  dispacht({
    type: consts.AIRCRAFTS_SEARCH,
    aircrafts: aircrafts,
    country: valor
  });
};

const limitAircrafts = event => (dispacht, state) => {
  let aircrafts = [...state().aircraftsInitial];
  const valor = event.target.value;
  aircrafts = aircrafts.filter(arr => arr.Cou.includes(state().country)).slice(0, valor);

  dispacht({
    type: consts.AIRCRAFTS_LIMIT,
    aircrafts: aircrafts,
    limit: valor
  });
};

let setIntervalFunction;

const reloadAircrafts = cheked => dispacht => {
  clearInterval(setIntervalFunction);
  if(cheked){
    setIntervalFunction = setInterval(() => dispacht(loadAircrafts()), 20000);
  }
}

export { loadAircrafts, searchAircrafts, limitAircrafts, reloadAircrafts };