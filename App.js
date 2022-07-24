import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, BackHandler, StyleSheet, StatusBar, SafeAreaView, View, Text } from 'react-native';
import StartScreen from './src/screens/startScreen';
import LoginScreen from './src/screens/loginScreen';
import SignupScreen from './src/screens/signupScreen';
import HomeScreen from './src/screens/homeScreen';
import SubscriptionsScreen from './src/screens/subscriptionsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon as IconA  from 'react-native-vector-icons/AntDesign';
import { Theme } from './src/core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const backIcon = <Icon name="arrow-left" size={30} color={Theme.colors.clearWhite} />;
const Stack = createStackNavigator();

/*async function exit() {
  await AsyncStorage.removeItem('token');
  BackHandler.exitApp();
  return false;
}*/

export default function App() {
  return (
    <SafeAreaView style={styles.viewArea}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen"
          screenOptions={{
            headerStyle: {backgroundColor: Theme.colors.primary},
            headerTitleStyle: {
                fontWeight: '300',
                color: Theme.colors.secondaryFade,
                fontSize: 20,
                //flex:1,
                //textAlign:"center"
            },
            headerTintColor: '#ffffff'
          }}
          >
        <Stack.Screen name="Welcome" component={StartScreen}
            options={ {headerShown: false} } 
          />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options= {
        ({ navigation }) => ({
          headerRight: ()=>(
            <Icon.Button
              name="close"
              color={Theme.colors.clearWhite}
              onPress={async ()=>{ Alert.alert(
                  "",
                  "Do you wish to sign out?",
                  [ { text: "Cancel"},
                    {},
                    {text: 'Logout', onPress: async () => {
                      await AsyncStorage.removeItem('userAuth');
                      await navigation.reset({
                          index: 0,
                          routes: [{ name: 'Welcome' }],
                      });
                      //BackHandler.exitApp()
                      }
                    },
                  ],
                  {cancelable: true}
              )
              }}
            />
          )
          })} 
          />
        <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewArea:{
    maxHeight: 2560,
    maxWidth: 1440,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
    //backgroundColor: '#A6A9BC',
    //backgroundColor: Theme.colors.primary,  
}
});
