import React from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { ConsolePage } from "./pages/ConsolePage";
import { SignInPage } from "./pages/SignInPage";

function App() {
  const { user } = useAuthContext();

  return user ? <ConsolePage /> : <SignInPage />;
}

export default App;
