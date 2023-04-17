import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_KEY
);

function App() {
  const [accessToken, setAccessToken] = useState("");
  let token = sessionStorage.getItem("token");

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      return <Dashboard code={token} />;
    }
    async function getSessionData() {
      await supabase.auth.getSession().then((value) => {
        if (value.data?.session) {
          // console.log(value.data.session);
          sessionStorage.setItem("token", value.data.session.provider_token);
          sessionStorage.setItem("email", value.data.session.user.email);
          token = sessionStorage.getItem("token");
          setAccessToken(token);
        }
      });
    }
    if (token === null) {
      supabase.auth.signOut();
      setAccessToken("");
      getSessionData();
    }
    // window.location.reload();
  }, [accessToken]);

  // console.log(token);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            token ? <Dashboard code={token} page={"tracks"} /> : <Login />
          }
        />
        <Route
          path='/artists'
          element={
            token ? <Dashboard code={token} page={"artists"} /> : <Login />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
