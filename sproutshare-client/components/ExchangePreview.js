import { useState } from "react";
import {StyleSheet, View, Text, Pressable, Image,Button } from 'react-native'
import styles from "../styles/styles";
import axios from "axios";


function ExchangePreview(props) {

    const [modalVisible, setModalIsVisible] = useState(false);
    const [data, setData] = useState([]);
    

    function openModal() {
        setModalIsVisible(true);
    }

    function closeModal() {
        setModalIsVisible(false);
    }
    
  async function refreshscreen ()  {
        await axios.get(`${props.nodeServer}/exchangeListings`)
        .then((response) => {
            setData(this.state.data)
         }).catch(err => {
            console.log('Error: ', err);
        });
    }
  
   

    async function  onDelete  (id)  {
        await axios.delete(`${props.nodeServer}/exchangeListings/delete/${id}`)
       .then((Response) => {
        console.log(Response);
       }).catch(err => {
        console.log('Error: ', err);
    });
        refreshscreen();
    }
  
    function handleDelete (id){
        onDelete(id);
     props.onDeleteListings();
    }
    



    return(
        <View style={styles.item}>
            <Pressable 
           android_ripple={styles.rippleEffect} onLongPress={() => {handleDelete(props.listing._id)}}
            >

            <Text style={styles.title}>User: {props.listing.user_key}</Text>
            <Text style={styles.title}>{props.listing.ex_post_title}</Text>
            <Text style={styles.title}>{props.listing.ex_post_body}</Text>
            <Text style={styles.title}>Plant: {props.listing.ex_plant}</Text>
            <Text style={styles.title}>Posted: {props.listing.ex_post_date}</Text>
            <View style={styles.buttonContainer}>
          
            </View>

            
            </Pressable>
      </View>
    );
}

export default ExchangePreview;