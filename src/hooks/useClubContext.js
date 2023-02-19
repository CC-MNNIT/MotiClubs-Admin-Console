import { useContext } from "react";
import { ClubContext } from "../context/ClubContext";

export const useClubContext = () => {
  const context = useContext(ClubContext);

  if (!context)
    throw new Error(
      "useClubContext must be used inside an ClubContextProvider"
    );

  return context;
};
