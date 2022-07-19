export async function UserReg(name, email, msisdn, credentials) {
    var myHeaders = new Headers(
      {'Content-Type': 'application/json'});
  
    var raw = JSON.stringify({
      "fullName": name,
      "email": email,
      "msisdn": msisdn,
      "credentials": credentials
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
        'https://mawingu.cbaloop.com/cba/api/v1/user/register',
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
      
      console.log("User added...........................");
      return true;

    } catch (e) {
      console.log("......................................................")
      console.log("Could not connect to server...........................");
      console.log(e);
      return "Possible network error";
    }
  }