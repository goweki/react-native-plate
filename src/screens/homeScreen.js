
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Dropdown from '../components/dropdownBox';
import Button, { ButtonFill } from '../components/button';
import { FetchServices } from '../helpers/uiFetch';
import {serviceSub} from '../helpers/serviceSubscription';
import Loading from '../components/loading';
//import { ButtonFill } from '../components/button';
import { Theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';

export default function Home({ navigation }) {
    const [uiData, setUIdata] = useState();
    const [selectedService, setService] = useState();
    const [serviceDetails, setServiceDetails] = useState();

    useEffect(() => {
        if (!uiData) {
            FetchServices()
                .then(async (data) => {
                    console.log("...................................................")
                    console.log("Services........................" + JSON.stringify(data));
                    setUIdata(data);
                    await AsyncStorage.setItem('UIdata', JSON.stringify(data));
                })
        }

        if (selectedService) {
            var _serviceDetails = uiData.find(det => det.id === selectedService);
            console.log(".....................................................")
            console.log("selected Service........................" + JSON.stringify(_serviceDetails));
            setServiceDetails(_serviceDetails);
        }
    }
        , [selectedService]);

    const renderServiceDetails = () => {
        if (serviceDetails) {


            return (
                <DataTable style ={styles.row}>
                    <DataTable.Row>
                        <DataTable.Cell textStyle={{fontWeight:'bold'}}>{serviceDetails.serviceName}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell textStyle={{color:Theme.colors.grayFade2}}>Price (Ksh.) </DataTable.Cell>
                        <DataTable.Cell>{serviceDetails.pricing}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell  textStyle={{color:Theme.colors.grayFade2}}>Discount (%) </DataTable.Cell>
                        <DataTable.Cell>{serviceDetails.discountPercent}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row >
                        <DataTable.Cell textStyle={{color:Theme.colors.grayFade2}}>Total </DataTable.Cell>
                        <DataTable.Cell textStyle={{fontWeight:'bold'}} >{getTotalPayable()}  shillings</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            )



        }
    }

    const renderSubscribeButton = () => {
        if (selectedService) {
            return (
                    <Button
                        style={{
                            width: '100%',
                            margin: 0,
                            marginVertical: '20%',
                            paddingVertical: 2,
                        }}
                        mode="contained"
                        onPress={async () => {
                            var res = await serviceSub(serviceDetails.serviceName, getTotalPayable())
                            console.log("RESPONSE..................." + res)
                            navigation.navigate('Subscriptions')
                            }}
                        >
                        Subscribe
                    </Button>
            );
        }
        return null;
    }

    if (!uiData) {
        return (<Loading />)
    }

    function getTotalPayable(){
        return(
            ((100 - serviceDetails.discountPercent)*serviceDetails.pricing/100)
            )
    }

    return (
        <View style={styles.container}>
            <View style={{width:'100%'}}>
                <Dropdown style={styles.padding}
                    placeholder={serviceDetails ? serviceDetails.serviceName : "Select a service"}
                    items={uiData}
                    setValue={(service_) => setService(service_)}
                    schema={{
                        label: 'serviceName',
                        value: 'id'
                    }}
                />
                <View style ={[{width:'100%'}]}>
                    {/*{JSON.stringify(serviceDetails, ["serviceName", "pricing", "discountPercent"], 5)}*/}
                    {renderServiceDetails()}
                </View>
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
    //row: {
        //width: '100%',
        //padding:12,
        //backgroundColor:Theme.colors.primaryAscent,
        //flexDirection: "column",
        //justifyContent: 'center',
        //alignItems: 'center',
    //}
});