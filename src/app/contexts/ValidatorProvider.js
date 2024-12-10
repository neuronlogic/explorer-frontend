import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { API_URL } from 'app/configs/envConfig';

const ValidatorContext = React.createContext();

function ValidatorProvider({ children }) {
  const [validators, setValidators] = useState([]);
  const [selectedValidator, setSelectedValidator] = useState(() =>
    parseInt(localStorage.getItem('validatorId'), 10) || 0
  );
  const [waitFetch, setWaitFetch] = useState(true);
  const dispatch = useDispatch();
  const [dataset, setDataset] = useState(() => localStorage.getItem('dataset') || 'current');

  useEffect(() => {
    setWaitFetch(true);
    axios
      .get(`${API_URL}/get-validator?status=${dataset}`)
      .then((response) => {
        setValidators(response.data);
        setWaitFetch(false);
      })
      .catch((error) => {
        dispatch(showMessage({ message: `Failed to fetch validators: ${error.message}` }));
        setWaitFetch(false);
      });
  }, [dispatch, dataset]);

  const selectValidator = (validatorId) => {
    localStorage.setItem('validatorId', validatorId);
    setSelectedValidator(validatorId);
  };

  const selectDataset = (payload) => {
    localStorage.setItem('dataset', payload);
    setDataset(payload);
  };

  return waitFetch ? (
    <FuseSplashScreen />
  ) : (
    <ValidatorContext.Provider value={{ validators, selectedValidator, dataset, selectValidator, selectDataset }}>
      {children}
    </ValidatorContext.Provider>
  );
}

function useValidator() {
  const context = React.useContext(ValidatorContext);
  if (context === undefined) {
    throw new Error('Must be used within an AuthProvider');
  }
  return context;
}

export { ValidatorProvider, useValidator };
