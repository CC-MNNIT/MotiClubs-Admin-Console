import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utility/constants";
import { useAuthContext } from "./useAuthContext";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const fetch = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(BASE_URL + endpoint, {
        headers: {
          Authorization: user.token,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Could not fetch results!");
      }
    } catch (error) {
      setError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetch };
};
