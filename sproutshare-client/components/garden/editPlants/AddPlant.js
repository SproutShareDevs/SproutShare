import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button,TextInput,Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../../styles/styles';
import axios from 'axios';
import PlantOption from './PlantOption';
import RecommendPlant from './RecommendPlant';

function AddPlant(props) {
    const [plantModal, togglePlantModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [plants, setPlants] = useState([]);
    const [selection, setSelection] = useState(null);
    const [plantQuantity, setQuantity] = useState(0);

    useEffect (() => {
      const fetchPlants = async () => {
        await axios.get(`${props.nodeServer}/plants`).then((response) => {
            setPlants(response.data);
        }).catch(err => {
            console.log('Error fetching plants: ', err);
        });
    }

    fetchPlants();
    },[]);


    async function postPlant () {
    if(selection != null) {
      await axios.post(`${props.nodeServer}/userPlants/store`, {
        user_key: props.garden.user_key,
        plant_key: selection.plant_key, 
        garden_key: props.garden.garden_key, 
        plant_qty: plantQuantity
      }).then((response) => {
          props.onNewPlant();
          togglePlantModal(false);
      }).catch(err => {
          console.log('Error storing plant: ', err);
      });
    } else {
      Alert.alert(
        "No plant selected",
        "Please select a plant to add"
      )
    }
  };

  renderItem = ({item}) => {
      return <PlantOption plant={item} selectPlant = {selectPlant} />
  }

  const selectPlant = (plant) => {
      console.log('plant selected:' + plant.common_name);
      setSelection(plant);
  }

    return (
        <>
        <Button color='#228b22' title='Add Plant' onPress={() => {
          togglePlantModal(true);
          
        }}
          />
        <Modal visible={plantModal} animationType="slide">
                  <Button title='Close' onPress={()=> togglePlantModal(false)}/>
                  <Button title='Add Selection' onPress={() => postPlant()}/>
                  <RecommendPlant nodeServer={props.nodeServer} selectPlant = {selectPlant} postPlant = {postPlant} ></RecommendPlant>
                  <TextInput style={styles.textInput} placeholder='Enter Quantity' keyboardType='numeric' onChangeText={text => setQuantity(text)} value={plantQuantity} />
                  <View style={styles.listBottomMargin}>
                    <FlatList
                      data = {plants}
                      renderItem={renderItem}
                      keyExtractor={item => item.plant_key}
                    />
                  </View>
        </Modal>
      </>
    );
}
export default AddPlant;