import React from "react";

import "./styles.css";
import { useInitFbSDK } from "./utils/fbHooks";

// You can find your Page ID
// in the "About" section of your page on Facebook.
const PAGE_ID = "100165859364792";

function App() {
  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();

  // App state
  const [fbUserAccessToken, setFbUserAccessToken] = React.useState();
  const [fbPageAccessToken, setFbPageAccessToken] = React.useState();
  const [name, setName] = React.useState();
  const [postText, setPostText] = React.useState();
  const [isPublishing, setIsPublishing] = React.useState(false);

  // Logs in a Facebook user
  const logInToFB = React.useCallback(() => {
    window.FB.login((response) => {
      setFbUserAccessToken(response.authResponse.accessToken)
    });
  }, []);


  // Logs out the current Facebook user
  const logOutOfFB = React.useCallback(() => {
    window.FB.logout(() => {
      setFbUserAccessToken(null);
      setFbPageAccessToken(null);
    });
  }, []);

  // Checks if the user is logged in to Facebook
  React.useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
      });
    }
  }, [isFbSDKInitialized]);

  // Fetches an access token for the page
  React.useEffect(() => {
    if (fbUserAccessToken) {
      window.FB.api(
        `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
        ({ access_token }) => setFbPageAccessToken(access_token)
      );
      window.FB.api(
        '/me',
        'GET',
        {"fields":"id,name"},
        function(response) {
            setName(response.name)
        }
      );
    }
  }, [fbUserAccessToken]);

  // Publishes a post on the Facebook page
  const sendPostToPage = React.useCallback(() => {
    setIsPublishing(true);

    window.FB.api(
      `/${PAGE_ID}/feed`,
      "POST",
      {
        message: postText,
        access_token: fbPageAccessToken,
      },
      () => {
        setPostText("");
        setIsPublishing(false);
      }
    );
  }, [postText, fbPageAccessToken]);

  // UI with custom styling from ./styles.css`
  return (
    <div id="app">
      <header id="app-header">
        <p id="logo-text">React Facebook Test</p>
        {fbUserAccessToken ? (
          <button onClick={logOutOfFB} className="btn confirm-btn">
            Log out
          </button>
        ) : (
          <button onClick={logInToFB} className="btn confirm-btn">
            Login with Facebook
          </button>
        )}
      </header>
      <main id="app-main">
        {fbPageAccessToken ? (
          <>
          <h2 className="placeholder-container">Welcome {name}</h2>
          <section className="app-section">
            <h3>Write something to the page</h3>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Message..."
              rows="8"
              disabled={isPublishing}
            />
            <button
              onClick={sendPostToPage}
              className="btn confirm-btn"
              disabled={!postText || isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          </section>
          <a href="https://www.facebook.com/React-test-app-100165859364792" target="_blank" rel="noreferrer" className="view-link" >View your post</a>
          </>
        ) : (
          <h2 className="placeholder-container">Welcome!</h2>
        )}
      </main>
    </div>
  );
}

export default App;