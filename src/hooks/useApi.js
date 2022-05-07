import React from 'react'
import Api from '../utils/copyApi'
import { useLocalStorage } from './useLocalStorage';

export const useApi = () => {
    const { readLS } = useLocalStorage();
    
    const config = {
        url: 'https://api.react-learning.ru',
        token: readLS('token'),
    };
  return  new Api(config)
  
}
