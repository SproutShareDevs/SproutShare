import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Button, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import GardenPreview from './garden/GardenPreview'
import WeatherView from './garden/weather/WeatherView';
import AddGarden from './garden/AddGarden';
import WateringList from './garden/WateringList'
import SimulateTime from './garden/SimulateTime';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';


class UserGarden extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      gardenViewModal: false,
      historyViewModal: false,
      gardens: [],
      history: [],
      updated: 0
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.toggleGardenViewModal = this.toggleGardenViewModal.bind(this);
    this.toggleHistoryViewModal = this.toggleHistoryViewModal.bind(this);
    this.archiveGarden = this.archiveGarden.bind(this);
    this.rerender = this.rerender.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
  }

  renderCurrentGardenItem = ({ item }) => {
    return (
      <GardenPreview nodeServer={this.props.nodeServer} garden={item} archiveGarden={this.archiveGarden} updated = {this.state.updated}/>
    );
  }

  renderArchivedGardenItem = ({ item }) => {
    return (
      <GardenPreview nodeServer={this.props.nodeServer} garden={item} archiveGarden={this.archiveGarden}  updated = {this.state.updated}/>
    );
  }

  archiveGarden = async (gardenKey) => {
    console.log('archiving garden');
    await axios.put(`${this.props.nodeServer}/gardens/archive/${gardenKey}`).then((response) => {
      this.rerender();
    }).catch(err => {
      console.log('could not archive garden', err);
    });
  }

  rerender = async () => {
    // if current user is admin, display all gardens
    if (this.props.userType == 'Admin') {
      await axios.get(`${this.props.nodeServer}/gardens`).then((response) => {
        this.setState(state => {
          return { gardens: response.data }
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
          return { gardens: response.data }
        });
      }).catch(err => {
        console.log(`${this.props.nodeServer}/gardens/getByToken/${accessToken}`);
        console.log('Error: Could not retrieve gardens', err);
      });

      await axios.get(`${this.props.nodeServer}/gardens/getHistoryByToken/${accessToken}`).then((response) => {
        this.setState(state => {
          return { history: response.data }
        });
      }).catch(err => {
        console.log(`${this.props.nodeServer}/gardens/getHistoryByToken/${accessToken}`);
        console.log('Error: Could not retrieve history', err);
      });
    }
    // this allows for the parent state to be passed down to child elements to rerender (used to rerender watering checklist)
    this.setState(state => {
      return { updated: this.state.updated + 1 }
    })
  }

  async getNotifications() {
    let accessToken = await SecureStore.getItemAsync('AccessToken');
    await axios.get(`${this.props.nodeServer}/notifications/user/${accessToken}`).then((response) => {
      let notification = response.data;
      console.log(response.data);
      if (notification.sendNotification === true) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Water Alert!",
            body: notification.notificationMessage,
          },
          trigger: { seconds: 5 },
        });
      }
    }).catch(err => {
      console.log(`${this.props.nodeServer}/notifications/user/${accessToken}`);
      console.log('Error: Could not calculate notification', err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
          <Image source={require("./../assets/MyGardens.png")} style={styles.tinyImage} />
          <WeatherView style={styles.weatherPic} nodeServer={this.props.nodeServer} />
          <View style={{ flex: 4 }}>
      
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => this.toggleGardenViewModal(true)}
                style={styles.myGardenButtonsFullWidth}>
                <Text style={styles.gardenButtonText}>View All Gardens</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => this.toggleHistoryViewModal(true)}
                style={styles.myGardenButtonsFullWidth}>
                <Text style={styles.gardenButtonText}>View Garden History</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <SimulateTime repushNotifications={this.getNotifications} rerenderGarden={this.rerender} nodeServer={this.props.nodeServer} />
            </View>

            <WateringList update={this.state.updated} nodeServer={this.props.nodeServer} />


            <Modal visible={this.state.historyViewModal} animationType="slide">
              <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.toggleHistoryViewModal(false)}
                    style={styles.myGardenButtons}>
                    <Text style={styles.gardenButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.listBottomMargin} >

                  <FlatList
                    data={this.state.history}
                    renderItem={this.renderArchivedGardenItem}
                    keyExtractor={item => item.garden_key}
                  />

                </View>
              </ImageBackground>
            </Modal>

            <Modal visible={this.state.gardenViewModal} animationType="slide">
              <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.toggleGardenViewModal(false)}
                    style={styles.myGardenButtons}>
                    <Text style={styles.gardenButtonText}>Close</Text>
                  </TouchableOpacity>
                  <AddGarden rerenderGarden={this.rerender} nodeServer={this.props.nodeServer} />
                </View>
                <View style={styles.listBottomMargin} >


                  <FlatList
                    data={this.state.gardens}
                    renderItem={this.renderCurrentGardenItem}
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

  toggleHistoryViewModal = (bool) => {
    this.setState(state => {
      return { historyViewModal: bool }
    });
  }

  componentDidMount = async () => {
    // if current user is admin, display all gardens
    if (this.props.userType == 'Admin') {
      await axios.get(`${this.props.nodeServer}/gardens`).then((response) => {
        this.setState(state => {
          return { gardens: response.data }
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
          return { gardens: response.data }
        });
      }).catch(err => {
        console.log(`${this.props.nodeServer}/gardens/getByToken/${accessToken}`);
        console.log('Error: Could not retrieve gardens', err);
      });

      await axios.get(`${this.props.nodeServer}/gardens/getHistoryByToken/${accessToken}`).then((response) => {
        this.setState(state => {
          return { history: response.data }
        });
      }).catch(err => {
        console.log(`${this.props.nodeServer}/gardens/getHistoryByToken/${accessToken}`);
        console.log('Error: Could not retrieve history', err);
      });
    }
    //put notification call here for testing
    //this.getNotifications();

  }

}

export default UserGarden;