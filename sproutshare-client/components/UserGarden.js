import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Button, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import GardenPreview from './garden/GardenPreview'
import WeatherView from './garden/weather/WeatherView';
import AddGarden from './garden/AddGarden';
import WateringList from './garden/WateringList'
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';


class UserGarden extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      gardenViewModal: false,
      data: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.toggleGardenViewModal = this.toggleGardenViewModal.bind(this);

  }

  renderItem = ({ item }) => {
    return (
      <GardenPreview nodeServer={this.props.nodeServer} garden={item} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
          <Image source={require("./../assets/MyGardens.png")} style={styles.tinyImage} />
          <WeatherView style={styles.weatherPic} nodeServer={this.props.nodeServer} />
          <View style={{ flex: 4 }}>
            { /*
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={async () => {
                  let accessToken = await SecureStore.getItemAsync('AccessToken');
                  axios.get(`${this.props.nodeServer}/notifications/user/${accessToken}`).then((response) => {
                    Alert.alert(
                      "Eventual Notification",
                      response.data.message,
                      [
                        {
                          text: "Confirm"
                        }
                      ]
                    );
                    console.log(response.data);
                  }).catch(err => {
                    console.log(`${this.props.nodeServer}/notifications/user/${accessToken}`);
                    console.log('Error: Could not retrieve notifications', err);
                  });
                }}
                style={styles.myGardenButtonsFullWidth}>
                <Text style={styles.gardenButtonText}>Check for Watering (Temp)</Text>
              </TouchableOpacity>
            </View>
            */}
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => this.toggleGardenViewModal(true)}
                style={styles.myGardenButtonsFullWidth}>
                <Text style={styles.gardenButtonText}>View All Gardens</Text>
              </TouchableOpacity>
            </View>
            <WateringList nodeServer={this.props.nodeServer}/>
            <Modal visible={this.state.gardenViewModal} animationType="slide">
              <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.toggleGardenViewModal(false)}
                    style={styles.myGardenButtons}>
                    <Text style={styles.gardenButtonText}>Close</Text>
                  </TouchableOpacity>
                  <AddGarden nodeServer={this.props.nodeServer} />
                </View>
                <View style={styles.listBottomMargin} >


                  <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.garden_key}

                  />

                </View>
              </ImageBackground>
            </Modal>

          </View>
        </ImageBackground>
      </View>
    );
  }

  toggleGardenViewModal = (bool) => {
    this.setState(state => {
      return { gardenViewModal: bool }
    });
  }

  componentDidMount = async () => {
    // if current user is admin, display all gardens
    if (this.props.userType == 'Admin') {
      await axios.get(`${this.props.nodeServer}/gardens`).then((response) => {
        this.setState(state => {
          return { data: response.data }
        });
      }).catch(err => {
        console.log(`${this.props.nodeServer}/gardens`);
        console.log('Error: Could not retrieve gardens', err);
      });
      // else, normal user view
    } else {
      let accessToken = await SecureStore.getItemAsync('AccessToken');
      console.log(accessToken);

      await axios.get(`${this.props.nodeServer}/gardens/getByToken/${accessToken}`).then((response) => {
        this.setState(state => {
          return { data: response.data }
        });
      }).catch(err => {
        console.log(`${this.props.nodeServer}/gardens/getByToken/${accessToken}`);
        console.log('Error: Could not retrieve gardens', err);
      });

      //put notification call here
      await axios.get(`${this.props.nodeServer}/notifications/user/${accessToken}`).then((response) => {
        let notification = response.data;
        console.log(response.data);
        //if (notification.sendNotification === true) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Water Alert!",
              body: notification.notificationMessage,
            },
            trigger: { seconds: 5 },
          });
      //}
    }).catch(err => {
        console.log(`${this.props.nodeServer}/notifications/user/${accessToken}`);
        console.log('Error: Could not calculate notification', err);
    });
    }
  }

}

export default UserGarden;