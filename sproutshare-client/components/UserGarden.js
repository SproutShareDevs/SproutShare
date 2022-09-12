import React, { useState, useEffect } from 'react';
import {Text, View, Button } from 'react-native';
import axios from 'axios';

// Everytime a new localtunnel session is started, this link MUST be changed to match where the https server is located
const baseUrl = 'https://big-spiders-lay-68-0-34-101.loca.lt';

class UserGarden extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          buttonPressed: false,
          connected: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>User Garden</Text>
              <Button color="#228b22" onPress={this.handlePress} title='Press Me'/>
                {this.state.buttonPressed &&
                    <Text>Wow, look you changed the local state with that button press!</Text>
                }
                {this.state.connected && 
                    <Text>Connected to {this.props.nodeServer}</Text>
                }
            </View>
          );
    }

    handlePress = () => {
        this.setState(state => {
            return {buttonPressed: true};
        });
    }

    componentDidMount = async () => {
        console.log(this.props.nodeServer);
        await axios.get(`${this.props.nodeServer}`).then((response) => {
          if(response.status == 200) {
            console.log("Server response: " + response.data.message);
            this.setState(state => {
              return {connected: true};
            });
          }
        }).catch(err => {
          console.log('Error: ', err);
      });
    }
    
}

export default UserGarden;