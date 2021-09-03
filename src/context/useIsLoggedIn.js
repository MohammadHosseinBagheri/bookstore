/* eslint-disable react/react-in-jsx-scope */
import React, {createContext, useContext, useEffect, useState} from 'react';
import {getData} from '../helper/common';

export const IsAuthState = createContext();
export const IsAuthDsipatch = createContext();

const IsAuthProvider = ({children}) => {
  const [state, dispatch] = useState();
  useEffect(() => {
    const getJwtData = async () => {
      dispatch(await getData('jwt'));
    };
    getJwtData();
  }, []);
  return (
    <IsAuthState.Provider value={state}>
      <IsAuthDsipatch.Provider value={dispatch}>
        {children}
      </IsAuthDsipatch.Provider>
    </IsAuthState.Provider>
  );
};

export default IsAuthProvider;

export const useIsAuthState = () => useContext(IsAuthState);
export const useIsAuthDispatch = () => {
  const dispatch = useContext(IsAuthDsipatch);
  const setState = jwt => {
    dispatch(jwt);
  };
  return setState;
};
