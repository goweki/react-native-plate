import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import TextInput from '../components/textBox';
import Button from '../components/button';
import { Theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { UserAuth } from '../helpers/userAuthentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/loading';

export default function LoginScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [networkError, setNetworkError] = useState(false);
    const [authenticationError, setauthenticationError] = useState(false);

    const onLoginPressed = async () => {
        setIsLoading(true)
        setNetworkError(false);
        setauthenticationError(false);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setIsLoading(false)
            return;
        }

        let userAuth = await UserAuth(email.value, password.value);

        if (userAuth === "Possible network error" || userAuth === null || userAuth === '') {
            console.log("........................................");
            console.log('Check internet connection and try again.... ');
            setNetworkError(true);
            setIsLoading(false)
            return;
        }

        if (userAuth === "Authentication Failed" || userAuth === undefined) {
            console.log(".............................................");
            //console.log('Authentication failed, check credentials.... ');
            setauthenticationError(true);
            setIsLoading(false)
            return;
        }

        try {
            await AsyncStorage.setItem('userAuth', JSON.stringify(userAuth));
        } catch (e) {
            console.log(e);
        }

        const storedToken =  JSON.parse(await AsyncStorage.getItem('userAuth')).token
        console.log('................................................');
        console.log('token stored:.................... ' + storedToken);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    const renderNetworkError = () => {
        if (networkError) {
            return (
                <Text style={{ color: 'red' }}>OOPS! Check internet connection and try again...</Text>
            );
        }
        return null;
    };

    const renderAuthenticationError = () => {
        if (authenticationError) {
            return (
                <Text style={{ color: 'red' }}>OOPS! Authentication failed. re-check credentials</Text>
            );
        }
        return null;
    };

    if (isLoading) {
        return (<Loading />)
    }

    return (
        <View style={styles.canvas}>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                //...description="error"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ''})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                autoCapitalize="none"
                //...description="error"
            />
            {renderNetworkError()}
            {renderAuthenticationError()}
            <Button
                mode="contained"
                onPress={onLoginPressed}
            >
                Log In
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    canvas: {
        padding: 42,
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: Theme.colors.primaryFade,
    },
});
