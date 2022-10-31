import React, { useState, useEffect } from 'react';
import {Text, View, Button } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import GardenPreview from './garden/GardenPreview'
import WeatherView from './garden/weather/WeatherView';
import AddGarden from './garden/AddGarden';

import * as SecureStore from 'expo-secure-store';


class UserGarden extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          connected: false,
          data : []
        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    renderItem = ({ item }) => {
        return (
          <GardenPreview nodeServer ={this.props.nodeServer} garden = {item}/>
        );
    }

    render() {
        return (
          <View style={styles.container}>
            <WeatherView style={{flex: 2}} nodeServer ={this.props.nodeServer}/>
            <View style={{flex: 4}}>
              <AddGarden nodeServer={this.props.nodeServer}/>
              <View style={styles.listBottomMargin} >
                <FlatList
                  data = {this.state.data}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.garden_key}
                />
              </View>
            </View>
          </View>
          );
    }


    componentDidMount = async() => {
      // if current user is admin, display all gardens
      if(this.props.userType == 'Admin') {
        await axios.get(`${this.props.nodeServer}/gardens`).then((response) => {
          this.setState(state => {
              return {data: response.data}
          });
        }).catch(err => {
          console.log(`${this.props.nodeServer}/gardens`);
          console.log('Error: Could not retrieve gardens', err);
        });
      // else, normal user view
      } else {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.get(`${this.props.nodeServer}/gardens/getByToken/${accessToken}`).then((response) => {
            this.setState(state => {
                return {data: response.data}
            });
          }).catch(err => {
            console.log(`${this.props.nodeServer}/gardens/getByToken/${accessToken}`);
            console.log('Error: Could not retrieve gardens', err);
        });
      }
    }
    
}

export default UserGarden;