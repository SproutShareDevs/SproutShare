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
    
   

    async function  onDelete  (id)  {
        await axios.delete(`${props.nodeServer}/exchangeListings/delete/${id}`)
       .then((Response) => {
        console.log(Response);
       }).catch(err => {
        console.log('Error: ', err);
    });
    props.onExchangePreview();
    }
  


    return(
        <View style={styles.itemExchange}>
            <Pressable 
           android_ripple={styles.rippleEffect} onLongPress={() => {onDelete(props.listing._id)}}
            >   
                <Text style={styles.exDate}>Posted: {props.listing.ex_post_date}</Text>
                <Text style={styles.exPlant}>Plant: {props.listing.ex_plant}</Text>
                <View style = {{flexDirection: 'row', marginTop:10}}>
                <Image source={require("./../assets/pfp.png")} style={styles.pfpImage}></Image>
                    
                    <Text style={styles.exUser}>User: {props.listing.user_key}</Text>
                    <Image source = {require("./../assets/veggie.png")} style={styles.veggieImage}></Image>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                    <Text style={styles.exTitle}>{props.listing.ex_post_title}</Text>
                    <Text style={styles.exBody}>{props.listing.ex_post_body}</Text>
                   
            </View>

            
            </Pressable>
      </View>
    );
}

export default ExchangePreview;