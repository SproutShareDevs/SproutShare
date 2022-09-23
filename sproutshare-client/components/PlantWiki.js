import React, { useState, useEffect } from 'react';
import {Text, View, Button } from 'react-native';


class PlantWiki extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                    data: []
        }
    }
    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Welcome to the Plant Wiki</Text>
              <Button color="#228b22" onPress={() => this.props.navigation.navigate('UserGarden')} title='Go to Garden'/>
            </View>
        );
    }
}

export default PlantWiki;