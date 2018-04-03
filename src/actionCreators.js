import axios from 'axios';
import * as consts from './constants/const';

const loadProgress = () => ({
  type: consts.LOAD_PROGRESS,
})

const loadAircrafts = () => (dispacht, state) => {
  dispacht(loadProgress());
  return axios.get("https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json")
    .then(response => {
      const aircrafts = response.data.acList.filter(arr => {
        return arr.Lat && arr.Long && arr.Id;
      });

      dispacht({
        type: consts.AIRCRAFTS_SUCCESS,
        aircrafts: [...aircrafts].slice(0, state().limit),
        aircraftsInitial: [...aircrafts]
      })
    });
};


const searchAircrafts = (event) => (dispacht, state) => {
  let aircrafts = [...state().aircraftsInitial];
  const valor = event.target.value;
  dispacht({
    type: consts.AIRCRAFTS_SEARCH,
    aircrafts: aircrafts.filter(arr => arr.Cou.includes(valor))
  });
};

const limitAircrafts = event => (dispacht, state) => {
  let aircrafts = [...state().aircraftsInitial];
  const valor = event.target.value;
  dispacht({
    type: consts.AIRCRAFTS_LIMIT,
    aircrafts: aircrafts.slice(0, valor)
  });
};

let setIntervalFunction;

const reloadAircrafts = cheked => dispacht => {
  clearInterval(setIntervalFunction);
  if(cheked){
    setIntervalFunction = setInterval(() => dispacht(loadAircrafts()), 5000);
  }
}

export { loadAircrafts, searchAircrafts, limitAircrafts, reloadAircrafts };