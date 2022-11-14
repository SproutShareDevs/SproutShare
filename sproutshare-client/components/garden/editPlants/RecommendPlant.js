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
    const [selection, setSelection] = useState(null);
    const [plantQuantity, setQuantity] = useState(0);


    const fetchPlants = async () => {
        await axios.get(`${props.nodeServer}/userPlants/recommend/${zipCode}`).then((response) => {
            setPlants(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log('Error fetching plants: ', err);
            if (
              err.response &&
              err.response !== undefined &&
              err.response.data &&
              err.response.data !== undefined
              ) {
              // print the exception message from axios response
              console.log(err.response.data);
            }
        });
    }


    return (
        <>
        <Button color='#228b22' title='Recommend Plant' onPress={() => {
          togglePlantModal(true);
          
        }}
          />
        <Modal visible={plantModal} animationType="slide">
                  <Button title='Close' onPress={()=> togglePlantModal(false)}/>
                  <Button title='plant' onPress={fetchPlants}/>
                  <TextInput style={styles.textInput} placeholder='Enter Zip Code' keyboardType='numeric' onChangeText={text => setZipCode(text)} value={zipCode} />
                  <View style={styles.listBottomMargin}>
                    {/*<FlatList
                      data = {plants}
                      renderItem={renderItem}
                      keyExtractor={item => item.plant_key}
                    />*/}
                    <Text>{plants}</Text>
                  </View>
        </Modal>
      </>
    );
}
export default RecommendPlant;