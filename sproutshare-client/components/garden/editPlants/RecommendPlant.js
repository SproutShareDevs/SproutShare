import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button,TextInput,Alert } from 'react-native'
import styles from '../../../styles/styles';
import axios from "axios";
import { FlatList } from 'react-native-gesture-handler';
import PlantOption from './PlantOption';

function RecommendPlant(props){
    const [plantModal, togglePlantModal] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [plants, setPlants] = useState([]);
    //const [newPlant, setNewPlant] = useState();
    const [plantList, setPlantList] = useState([]);
    const [selection, setSelection] = useState(null);
    const [plantQuantity, setQuantity] = useState(0);


    const fetchPlants = async () => {
        await axios.get(`${props.nodeServer}/userPlants/recommend/${zipCode}`).then((response) => {
            setPlants(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log('Error fetching plants: ', err);
        });
    }

    const fetchBasePlant = async (plantKey) => {
        await axios.get(`${props.nodeServer}/plants/${plantKey}`).then((response) => {
            console.log(response.data);
            return(response.data);
        }).catch(err => {
            console.log('Error fetching user plant: ', err);
        });
    }

    const makePlantList = async () => {
      await fetchPlants();
      tempArr = [];
      for (const plant of plants){
        console.log("Plant.id: ", plant.id)
        newPlant = await fetchBasePlant(plant.id);
        console.log("newPlant: ", newPlant);
        tempArr.push(newPlant);
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
                  <Button title='plant' onPress={makePlantList}/>
                  <TextInput style={styles.textInput} placeholder='Enter Zip Code' keyboardType='numeric' onChangeText={text => setZipCode(text)} value={zipCode} />
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