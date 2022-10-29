import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_API_KEY
);

async function signInWithSpotify(e) {
  e.preventDefault();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "spotify",
    options: {
      scopes: "user-top-read",
      redirectTo: "/",
    },
  });
}

export default function Login() {
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: "100vh" }}
    >
      <button
        className='btn btn-success btn-lg'
        // href={AUTH_URL}
        onClick={(e) => {
          signInWithSpotify(e);
        }}
      >
        Login With Spotify
      </button>
      {/* <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme='light'
        providers={["spotify"]}
      /> */}
    </Container>
  );
}
