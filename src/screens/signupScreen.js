import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import TextInput from '../components/textBox';
import Button from '../components/button';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { UserReg } from '../helpers/userRegistration';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [phoneNo, setPhone] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [networkError, setNetworkError] = useState(false);
    const [authenticationError, setauthenticationError] = useState(false);

    const onSignupPressed = async () => {
        setNetworkError(false);
        setauthenticationError(false);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        let token = await UserReg(email.value, password.value);

        if (token === "Possible network error" || token === null || token === '') {
            console.log("........................................");
            console.log('Check internet connection and try again.... ');
            setNetworkError(true);
            return;
        }

        console.log('................................................');
        console.log('Signup Successful:..............................');
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

    return (
        <View style={styles.canvas}>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
                //...description="error"
            />
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
                label="Phone No"
                returnKeyType="next"
                value={phoneNo.value}
                onChangeText={text => setPhone({ value: text, error: '' })}
                error={!!phoneNo.error}
                errorText={phoneNo.error}
                //...description="error"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ''})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                //...description="error"
            />
            {renderNetworkError()}
            {renderAuthenticationError()}
            <Button
                mode="contained"
                onPress={onSignupPressed}
            >
                Sign Up
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
