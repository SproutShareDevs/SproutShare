import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import UserPlantPreview from './UserPlantPreview';
import axios from 'axios';


function AddPlant(props) {
    return (
        <>
        <Modal visible={props.visible} animationType="slide">
                  <Button title='Close' onPress={props.onClose}/>
        </Modal>
      </>
    );
}
export default AddPlant