import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button,TextInput,Alert } from 'react-native'
import styles from '../../../styles/styles';
import axios from "axios";
import { FlatList } from 'react-native-gesture-handler';
import PlantOption from './PlantOption';

function RecommendPlant(props){
    const [plantModal, togglePlantModal] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [userLat, setUserLat] = useState('');
    const [userLong, setUserLong] = useState('');
    const [radius, setRadius] = useState('');
    const [lightLevel, setLightLevel] = useState('');
    const [soilType, setSoilType] = useState('');
    const [hardZone, setHardZone] = useState('');
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
        newPlant = await fetchBasePlant(plant.id);
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
        newPlant = await fetchBasePlant(plant.id);
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
      return <PlantOption plant={item} selectPlant = {props.selectPlant} />
    }

    return (
        <>
        <Button color='#228b22' title='Recommend Plant' onPress={() => {
          togglePlantModal(true);
          
        }}
          />
        <Modal visible={plantModal} animationType="slide">
                  <Button title='Close' onPress={()=> togglePlantModal(false)}/>
                  <Button title='By Zip Code' onPress={makePlantListZip}/>
                  <Button title='By Coords' onPress={makePlantListCoords}/>
                  <Button title='By Garden Attributes' onPress={makePlantListZone}/>
                  <TextInput style={styles.textInput} placeholder='Enter Zip Code' keyboardType='numeric' onChangeText={text => setZipCode(text)} value={zipCode} />
                  <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TextInput placeholder='Enter Latitude' keyboardType='numeric' onChangeText={text => setUserLat(text)} value={userLat} style={{justifyContent: 'flex-start',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder='Enter Longitude' keyboardType='numeric' onChangeText={text => setUserLong(text)} value={userLong} style={{justifyContent: 'flex-end',}} />
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
                        <TextInput placeholder='Enter soil type' keyboardType='numeric' onChangeText={text => setSoilType(text)} value={soilType} style={{justifyContent: 'flex-end',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder='Enter hardiness zone' keyboardType='numeric' onChangeText={text => setHardZone(text)} value={hardZone} style={{justifyContent: 'flex-end',}} />
                    </View>
                  </View>
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