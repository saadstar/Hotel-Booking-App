import React, { useEffect, useState } from 'react'
import axios from "axios";
export const useFetch = (url) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error, setError] = useState(false);
    const fetchData =async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [url]);
    const reFetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    return {data,loading,error,reFetch}
}
