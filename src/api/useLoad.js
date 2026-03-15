import { useState, useEffect } from "react";
import API from "./API";

const useLoad = (loadEndpoint) => {
  //State
  const [records, setRecords] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  const loadRecords = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setRecords(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    loadRecords(loadEndpoint);
  }, [loadEndpoint]);

  //Return
  return [records, loadingMessage, loadRecords];
};

export default useLoad;
