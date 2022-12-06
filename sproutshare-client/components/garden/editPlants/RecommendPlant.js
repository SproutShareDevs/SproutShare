import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button,TextInput,Alert } from 'react-native'
import styles from '../../../styles/styles';
import axios from "axios";
import { FlatList } from 'react-native-gesture-handler';
import PlantOption from './PlantOption';
import * as SecureStore from 'expo-secure-store';

function RecommendPlant(props){
    const [plantModal, togglePlantModal] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [userLat, setUserLat] = useState('');
    const [userLong, setUserLong] = useState('');
    const [radius, setRadius] = useState('');
    const [lightLevel, setLightLevel] = useState('');
    const [soilType, setSoilType] = useState('');
    const [hardZone, setHardZone] = useState('');
    const [user, setUser] = useState('');
    const [plants, setPlants] = useState([]);
    //const [newPlant, setNewPlant] = useState();
    const [plantList, setPlantList] = useState([]);
    const [selection, setSelection] = useState(null);
    const [plantQuantity, setQuantity] = useState(0);


    const fetchPlantsByZip = async () => {
        await axios.get(`${props.nodeServer}/userPlants/recommend/${zipCode}`).then((response) => {
            setPlants(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log('Error fetching plants: ', err);
        });
    }

    const fetchPlantsByCoord = async () => {
      await axios.get(`${props.nodeServer}/userPlants/recommend/${userLat}/${userLong}/${radius}`).then((response) => {
          setPlants(response.data);
          console.log(response.data);
      }).catch(err => {
          console.log('Error fetching plants: ', err);
      });
    }

    const fetchPlants = async () => {
      await axios.get(`${props.nodeServer}/plants/`).then((response) => {
          setPlants(response.data);
      }).catch(err => {
          console.log('Error fetching plants: ', err);
      });
    }


    const fetchBasePlant = async (plantKey) => {
      let basePlant;  
      await axios.get(`${props.nodeServer}/plants/${plantKey}`).then((response) => {
            console.log(response.data);
            basePlant = response.data;
        }).catch(err => {
            console.log('Error fetching user plant: ', err);
        });
      return basePlant;
    }

    async function makePlantListZip() {
      await fetchPlantsByZip();
      let tempArr = [];
      for (const plant of plants){
        console.log("Plant.id: ", plant.id)
        let newPlant = await fetchBasePlant(plant.id);
        console.log("newPlant: ", newPlant);
        tempArr.push(newPlant);
      }
      console.log("TempArr: ", tempArr)
      setPlantList(tempArr);
    }
    
    async function makePlantListCoords() {
      await fetchPlantsByCoord();
      let tempArr = [];
      for (const plant of plants){
        console.log("Plant.id: ", plant.id)
        let newPlant = await fetchBasePlant(plant.id);
        console.log("newPlant: ", newPlant);
        tempArr.push(newPlant);
      }
      console.log("TempArr: ", tempArr)
      setPlantList(tempArr);
    }

    async function makePlantListZone() {
      await fetchPlants();
      let tempArr = [];
      for (const plant of plants){
        if (plant.light_level == String(lightLevel) && plant.hardiness_zone == "ZONE_" + String(hardZone) && plant.soil_type == soilType){
          console.log("Plant.id: ", plant.id)
          tempArr.push(plant);
        }
      }
      console.log("TempArr: ", tempArr)
      setPlantList(tempArr);
    }

    renderItem = ({item}) => {
      return <View>
        <PlantOption plant={item} selectPlant = {props.selectPlant} />
        {(plants.find( (element) => {return true;} ).average == undefined) ? <></> : (
          <><Text style={styles.title}>Plant Rating: {plants.find( (element) => {return element.id === item.plant_key;} ).average.totalQuality}</Text>
          <Text style={styles.title}>Number of users with this plant: {plants.find( (element) => {return element.id === item.plant_key;} ).average.totalNumber}</Text></>
        )}
        
        
      </View>
    }

    return (
        <>
        <Button color='#228b22' title='Recommend Plant' onPress={() => {
          togglePlantModal(true);
          
        }}
          />
        <Modal visible={plantModal} animationType="slide">
                  <Button title='Close' onPress={()=> togglePlantModal(false)}/>
                  <Button title='Get User Attributes' onPress={ async () => {
                    let accessToken = await SecureStore.getItemAsync('AccessToken');
                    console.log("ACCESS TOKEN:    ", accessToken);
                    console.log("ROUTE:   ", `${props.nodeServer}/user/${accessToken}`)
                    await axios.get(`${props.nodeServer}/user/${accessToken}`).then((response) => {
                      setUser(response.data);
                      console.log(response.data);
                    }).catch(err => {
                      console.log('Error fetching user: ', err);
                    });
                    console.log("User: ", user, user.zip_code);
                    setZipCode(user.zip_code);
                    console.log("New zip: ", zipCode);
                    setUserLat(user.user_lat);
                    console.log("New lat: ", userLat);
                    setUserLong(user.user_long);
                    setLightLevel(props.garden.light_level);
                    switch(props.garden.soil_key){
                      case 1:
                        setSoilType("silty");
                        break;
                      case 2:
                        setSoilType("clay");
                        break;
                      case 3:
                        setSoilType("loamy");
                        break;
                      case 4:
                        setSoilType("sandy");
                        break;
                    }
                    }}/>
                  <Button title='By Zip Code' onPress={makePlantListZip}/>
                  <Button title='By Coords' onPress={makePlantListCoords}/>
                  <Button title='By Garden Attributes' onPress={makePlantListZone}/>
                  <TextInput style={styles.textInput} placeholder={ (String(zipCode) == undefined || String(zipCode) == "") ? "Enter Zipcode" : String(zipCode)} keyboardType='numeric' onChangeText={text => setZipCode(text)} value={zipCode} />
                  <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TextInput placeholder={ (String(userLat) == undefined || String(userLat) == "") ? "Enter Latitude" : String(userLat)} keyboardType='numeric' onChangeText={text => setUserLat(text)} value={userLat} style={{justifyContent: 'flex-start',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder={ (String(userLong) == undefined || String(userLong) == "") ? "Enter Longitude" : String(userLong)} keyboardType='numeric' onChangeText={text => setUserLong(text)} value={userLong} style={{justifyContent: 'flex-end',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder='Enter Radius' keyboardType='numeric' onChangeText={text => setRadius(text)} value={radius} style={{justifyContent: 'flex-end',}} />
                    </View>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TextInput placeholder='Enter light level' keyboardType='numeric' onChangeText={text => setLightLevel(text)} value={lightLevel} style={{justifyContent: 'flex-start',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder='Enter soil type' onChangeText={text => setSoilType(text)} value={soilType} style={{justifyContent: 'flex-end',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder='Enter hardiness zone' keyboardType='numeric' onChangeText={text => setHardZone(text)} value={hardZone} style={{justifyContent: 'flex-end',}} />
                    </View>
                  </View>
                  <TextInput style={styles.textInput} placeholder='Enter Quantity' keyboardType='numeric' onChangeText={text => props.selectQty(text)} value={props.plantQuantity} />
                  <Button title='Add Selection' onPress={() => props.postPlant()}/>
                  <View style={styles.listBottomMargin}>
                    <FlatList
                      data = {plantList}
                      renderItem={renderItem}
                    />
                  </View>
        </Modal>
      </>
    );
}
export default RecommendPlant;