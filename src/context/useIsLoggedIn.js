/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import React, {createContext, useContext, useEffect, useState} from 'react';
import {getData} from '../helper/common';
import {useGetUserInfo} from '../react-query/useGetUserInfo';

export const IsAuthState = createContext();
export const IsAuthDsipatch = createContext();

const IsAuthProvider = ({children}) => {
  const [state, dispatch] = useState();
  const {isSuccess,isLoading} = useGetUserInfo();
  useEffect(() => {
    const getJwtData = async () => {
      if (isSuccess) {
        dispatch(await getData('jwt'));
      }
    };
    getJwtData()
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
