import React, { useState, useEffect } from 'react';
import {Text, View, Button } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import GardenPreview from './garden/GardenPreview'

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
            <View style={styles.listBottomMargin}>
              <FlatList
                data = {this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.garden_key}
              />
            </View>
          </View>
          );
    }


    componentDidMount = async() => {
      await axios.get(`${this.props.nodeServer}/gardens`).then((response) => {
        console.log(`${this.props.nodeServer}/gardens`);
          this.setState(state => {
              return {data: response.data}
          });
        }).catch(err => {
          console.log(`${this.props.nodeServer}/gardens`);
          console.log('Error: ', err);
      });
  }
    
}

export default UserGarden;