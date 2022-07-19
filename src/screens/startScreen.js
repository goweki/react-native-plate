import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Header from '../components/header';
import Logo from '../components/logo';
import Button from '../components/button';
import { Theme } from '../core/theme';

export default function LoginScreen({navigation}) {
  return(
    <View style={styles.centre}>
    <Logo />
    <View style={styles.buttonContainer}>
    <Button
        style = {{
                  width: '75%',
                  margin: 32,
                  paddingVertical: 2,
                  }}
        color = {Theme.colors.primary}
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
        style = {{
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
