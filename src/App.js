import './App.css';
import { useEffect } from 'react';

function App() {
  const login = async () => {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "OAuth oauth_consumer_key=\"GWwpLvoDJ7TTbRyQOtzvfygoF\",oauth_token=\"1375052412-YPyHbBelqLnrhhoiJqxwIztDzzMoTFfLIaWGd0a\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1651512120\",oauth_nonce=\"N8lwkT6c5Rl\",oauth_version=\"1.0\",oauth_signature=\"6jf72RLIp8JyBK9TakZIjPUQ%2BDo%3D\"");
    // myHeaders.append("Cookie", "guest_id=v1%3A165151133627434406; lang=en");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.twitter.com/oauth/request_token", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
  useEffect(() => {
    login()
  },[])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
