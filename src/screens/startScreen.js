import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/logo';
import Button from '../components/button';
import { Theme } from '../core/theme';
import { FetchServices } from '../helpers/uiFetch';
import Loading from '../components/loading';

export default function StartScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function CheckLoginStatus() {
      await FetchServices()
        .then(async (data) => {
          if (data) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }
          else { setIsLoading(false) }
        })
    }
    CheckLoginStatus();
  }
    , []);

  if (isLoading) {
    return (<Loading />)
  }


  return (
    <View style={styles.centre}>
      <Logo />
      <View style={styles.buttonContainer}>
        <Button
          style={{
            width: '75%',
            margin: 32,
            paddingVertical: 2,
          }}
          color={Theme.colors.primary}
          mode="contained"
          onPress={() => navigation.navigate('Login')}>
          Sign In
        </Button>
        <Button
          labelStyle={{
            color: Theme.colors.primary,
            fontWeight: 'normal',
            fontSize: 15,
            lineHeight: 26,
          }}
          style={{
            width: '75%',
            margin: 0,
            paddingVertical: 0,
          }}
          mode="outlined"
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Theme.colors.primary,
  },
});
