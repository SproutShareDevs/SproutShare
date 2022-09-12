import React, { useState, useEffect } from 'react';
import {Text, View, Button } from 'react-native';


class Exchange extends React.Component {
    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Welcome to the Exchange</Text>
              <Button color="#228b22" onPress={() => this.props.navigation.navigate('UserGarden')} title='Go to Garden'/>
            </View>
        );
    }
}

export default Exchange;