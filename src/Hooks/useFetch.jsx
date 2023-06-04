import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, option) => {
    let resp;
    let json;
    try {
      setError(false);
      setLoading(true);

      resp = await fetch(url, option);
      json = await resp.json();

      if (!resp.ok) throw new Error(json.message);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { resp, json };
    }
  }, []);

  return { data, loading, error, request };
};

export default useFetch;
