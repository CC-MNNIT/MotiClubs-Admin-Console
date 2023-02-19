import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utility/constants";
import { useAuthContext } from "./useAuthContext";

export const useDelete = () => {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setdeleteError] = useState(null);
  const { user } = useAuthContext();

  const _delete = async (endpoint) => {
    setDeleting(true);
    setdeleteError(null);
    try {
      const response = await axios.delete(BASE_URL + endpoint, {
        headers: {
          Authorization: user.token,
        },
      });
      if (response.status === 200) return true;
      else throw new Error("Some error occurred!");
    } catch (error) {
      setdeleteError(error);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, deleteError, _delete };
};
