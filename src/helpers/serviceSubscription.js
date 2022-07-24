import AsyncStorage from '@react-native-async-storage/async-storage';

export async function serviceSub(serviceName,amountPaid) {

  try {
    var storedToken = JSON.parse(await AsyncStorage.getItem('userAuth')).token;
    var usrEmail = JSON.parse(await AsyncStorage.getItem('userAuth')).email;
    
  }
  catch (err) {
    console.log('..................................................');
    console.log('invalid token:.......................... ' + err);
    return null;
  }



  var myHeaders = new Headers(
    { 'Authorization': 'Bearer ' + storedToken,
    'Content-Type': 'application/json' }
    );

  var raw = JSON.stringify({
    "subscriberEmail": usrEmail,
    "serviceName": serviceName,
    "amountPaid": amountPaid
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  console.log('......................................................');
  console.log('SENDING: New service Subscription:.......... ' + raw);
  
  try {
    const fetchResponse = await fetch(
      'https://mawingu.cbaloop.com/cba/api/v1/subscription/subscribe',
      requestOptions,
    );

    if (!fetchResponse) {
      console.log('No response from server.......');
      return "No Response";
    }
    if (fetchResponse.status != 200) {
      console.log('.......................................');
      //return ("Response Status: "+ fetchResponse.status +" Data: "+ JSON.stringify(fetchResponse.json()));
      return ("Response Status: "+ fetchResponse.status +" Data: "+ JSON.stringify(await fetchResponse.json()));
    }

    console.log("....................................................................");
    return (serviceName + " Service subscribed by " + usrEmail);

  } catch (e) {
    console.log("......................................................")
    console.log("Could not connect to server...........................");
    console.log(e);
    return "Possible network error";
  }
}