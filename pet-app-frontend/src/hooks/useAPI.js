import { useState, useCallback } from 'react';
import axios from 'axios';

const useAPI = (baseURL) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiCall = useCallback(
        async (url, method = 'get', body = null, headers = {}) => {
            setLoading(true);
            setError(null);

            try {
                const config = {
                    method: method,
                    url: `${baseURL}${url}`,
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                    },
                    data: body,
                };

                const response = await axios(config);

                setData(response.data);
                return response.data;
            } catch (err) {
                setError(err);
                console.error("API call failed:", err);
                throw err; // Re-throw to allow component-level handling
            } finally {
                setLoading(false);
            }
        },
        [baseURL]
    );

    return { data, loading, error, apiCall };
};

export default useAPI;