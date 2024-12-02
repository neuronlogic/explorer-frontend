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
  const [selectedValidator, setSelectedValidator] = useState(0);
  const [waitFetch, setWaitFetch] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch validators data
    axios
      .get(`${API_URL}/get-validator`)
      .then((response) => {
        setValidators(response.data);
        setWaitFetch(false);
      })
      .catch((error) => {
        dispatch(showMessage({ message: `Failed to fetch validators: ${error.message}` }));
        setWaitFetch(false);
      });
  }, [dispatch]);

  const selectValidator = (validatorId) => {
    setSelectedValidator(validatorId);
  };

  return waitFetch ? (
    <FuseSplashScreen />
  ) : (
    <ValidatorContext.Provider value={{ validators, selectedValidator, selectValidator }}>
      {children}
    </ValidatorContext.Provider>
  );
}

function useValidator() {
  const context = React.useContext(ValidatorContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { ValidatorProvider, useValidator };
