export async function UserAuth(username, password) {
    var myHeaders = new Headers(
      {'Content-Type': 'application/json'});
  
    var raw = JSON.stringify({
      "email": username,
      "password": password
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log('......................................................');
    console.log('New login attempt:.......... ' + username);
    try {
      const fetchResponse = await fetch(
        'https://mawingu.cbaloop.com/cba/api/v1/access/login',
        requestOptions,
      );

      console.log("Server response.........." + fetchResponse.status);


      if (!fetchResponse) {
        console.log('No response from server.......');
        return "No Response";
      }
      if (fetchResponse.status != 200) {
        console.log('Authentication failed, double-check credentials...........');
        return "Authentication Failed"; }
      
      const res = await fetchResponse.json();
      const _user = res.data;
      if (_user) {
        console.log("token..........................." + _user.token);
        return _user;}
    } catch (e) {
      console.log("......................................................")
      console.log("Could not connect to server...........................");
      console.log(e);
      return "Possible network error";
    }
  }