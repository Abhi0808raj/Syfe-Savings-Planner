import React, { useEffect, useState, useCallback } from 'react'

const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/USD';

export const useExchangeRate = () => {
    const [exchangeRate,setExchangeRate]= useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [lastUpdated,setLastUpdated]=useState(null);

    const fetchExchangeRate=useCallback(async(forceRefresh=false)=>{
        setLoading(true);
        setError(null);

        try{
            const response=await fetch(EXCHANGE_RATE_API);
            if(!response.ok) throw new Error('Failed to fetch exchange rate');
            const data=await response.json();
            const rate=data.rates?.INR;

            if(!rate) throw new Error('INR rate not found');

            setExchangeRate(rate);
            setLastUpdated(Date.now());
            setLoading(false);
            return rate;
        } catch(error){
            console.error(error);
            const defaultRate=90;
            setExchangeRate(defaultRate);
            setLastUpdated(Date.now());
            setLoading(false);
            setError('Failed to fetch exchange rate, using default rate');
            return defaultRate;
        }
    }, []);
    useEffect(() => {
        fetchExchangeRate();
    }, [fetchExchangeRate]);

    return { exchangeRate, loading, error, lastUpdated, fetchExchangeRate };
};
