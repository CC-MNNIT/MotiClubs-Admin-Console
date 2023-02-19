import { useReducer, createContext } from "react";

export const ClubContext = createContext();

const clubReducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return { club: action.payload };
    default:
      return null;
  }
};

export const ClubContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clubReducer, {
    club: null,
  });
  return (
    <ClubContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClubContext.Provider>
  );
};
