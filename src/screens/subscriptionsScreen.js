import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TextInput from '../components/textBox';
import Button from '../components/button';
import Loading from '../components/loading';
import { Theme } from '../core/theme';

export default function SubscriptionsScreen({ navigation }) {
    const [isloading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(null);


    function _loading() {
        setLoading(true);
        return new Promise(resolve => {
          setTimeout(() => {
            setLoading(false);
            resolve(true);
          }, 4000);
        });
      }

    const onClick_Submit = async () => {
        await _loading();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
        }))
    }

    if (isloading) return (<Loading submitSuccess={isSubmitted} />);
    /*
    if (isSubmitted != null) {
        _status = isSubmitted;
        setIsSubmitted(null);
        return (<Loading submitSuccess={_status} />);
    }
    */
    return (
        <View style={styles.container}>
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center',
                alignContent: 'center', minHeight: 20, maxHeight: 20
            }}>
                <Text style={{ flex: 1 }}> Issue: </Text>
                <Text style={{ flex: 3 }}> Water and Sanitation </Text>
            </View>
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center',
                alignContent: 'center', minHeight: 20, maxHeight: 20
            }}>
                <Text style={{ flex: 1 }}> Location: </Text>
                <Text style={{ flex: 3 }}> Kiambu / Kasarani / Mwiki </Text>
            </View>
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center',
                alignContent: 'center', minHeight: 16, maxHeight: 16
            }}>
                <Text style={{ flex: 1 }}> GPS: </Text>
                <Text style={{ flex: 3 }}> -1.225402, 36.924970 </Text>
            </View>
            <TextInput
                label="Description"
                returnKeyType="done"
                multiline={true}
            //value={email.value}
            //onChangeText={text => setEmail({ value: text, error: '' })}
            //error={!!email.error}
            //errorText={email.error}
            //...description="error"
            />
            <Button mode="contained"
                onPress={onClick_Submit}>
                Submit
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        marginVertical: 6,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: Theme.colors.primaryAscent,
    },
    padding: {
        marginVertical: 12
    }
});