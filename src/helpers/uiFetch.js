import AsyncStorage from '@react-native-async-storage/async-storage';

export async function FetchServices() {
  try{
  var storedToken =  JSON.parse(await AsyncStorage.getItem('userAuth')).token;}
  catch (err){
    console.log('..................................................');
    console.log('Autologin Failed:.......................... ' + err);
    return null;
  }
  var requestOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + storedToken
    },
    redirect: 'follow',
  };

  console.log('..................................................');
  console.log('New request to fetch UI data:..................... ');

  var uiData = []
  try {
    await fetch(
      'https://mawingu.cbaloop.com/cba/api/v1/service/getServices',
      requestOptions,
    )
      .then(async (data) => {
        console.log('Fetch status:..................... ' + data.status);
        const res = await data.json()
        uiData = res.data;
      })
    
  }
  catch (err) {
    console.log('..................................................');
    console.log('Autologin failed:................................ ');
  }
  return uiData;
}