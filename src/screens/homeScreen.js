
import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Dropdown from '../components/dropdownBox';
import Button, { ButtonFill } from '../components/button';
import {FetchServices} from '../helpers/uiFetch';
import Loading from '../components/loading';
//import { ButtonFill } from '../components/button';
import { Theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [uiData, setUIdata] = useState();
    const [selectedService, setService] = useState();
    const [serviceDetails, setServiceDetails] = useState();

    useEffect(()=>{
        if (!uiData){
            FetchServices()
            .then(async (data) => {
                console.log("...................................................")
                console.log("Services........................" + JSON.stringify(data));
                setUIdata(data);
                await AsyncStorage.setItem('UIdata', JSON.stringify (data));
            })
        }

        if (selectedService){
                var _serviceDetails = uiData.find(det => det.id === selectedService);
                console.log("selected Service........................" + JSON.stringify(_serviceDetails ));
                setServiceDetails(_serviceDetails);
            }
    }
    ,[selectedService]);

    const renderServiceDetails = () => {
        if (serviceDetails) { return
            serviceDetails.map((item) => (
                <Text key={item.id}>{()=>item.serviceName}</Text>
                ))

                




        }
    }

    const renderSubscribeButton = () => {
        if (selectedService) {
            return (
                <View style={styles.iconRow}>
                <Button
                    style={{
                        width: '100%',
                        margin: 0,
                        marginVertical: 16,
                        //paddingVertical: 2,
                    }}
                    mode="contained"
                    onPress={() => navigation.navigate('Submit')}>
                    Subscribe
                </Button>
            </View>
            );
        }
        return null;
    }

    if (!uiData) {
        return(<Loading />)
    }

    return (
        <View style={styles.container}>
            <View>
            <Dropdown style={styles.padding}
                placeholder={serviceDetails ? serviceDetails.serviceName : "Select a service"}
                items={uiData}
                setValue={(service_) => setService(service_)}
                schema={{
                            label: 'serviceName',
                            value: 'id'
                        }}
            />
            <Text>
            {JSON.stringify(serviceDetails,["serviceName","pricing","discountPercent"],5)}
            </Text>
             </View>
            
            {renderSubscribeButton()}
           
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        marginVertical: 6,
        flex: 1,
        flexDirection: "column",
        //justifyContent: 'space-around',
        alignItems: 'center',
        //color: Theme.colors.primary,
    },
    padding: {
        marginVertical: 12
    },
    iconRow: {
        width: '100%',
        //padding:12,
        //backgroundColor:Theme.colors.primaryAscent,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});