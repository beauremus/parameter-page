import { useState, useEffect } from "react";

function useFetch(url: RequestInfo, config?: RequestInit) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const response = await fetch(url, config);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
    }, [config]);

    return [data, loading];
}

export { useFetch };