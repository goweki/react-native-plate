import AsyncStorage from '@react-native-async-storage/async-storage';

export async function FetchServices() {
  const storedToken = await AsyncStorage.getItem('token');
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

  await fetch(
      'https://mawingu.cbaloop.com/cba/api/v1/service/getServices',
      requestOptions,
  )
  .then(async (data) => {
    console.log('Fetch status:..................... ' + data.status);
    const res = await data.json()
    uiData = res.data;
    })
    return uiData;
}