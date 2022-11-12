import { useState } from "react";
import {StyleSheet, View, Text, Pressable, Image,Button } from 'react-native'
import styles from "../styles/styles";
import axios from "axios";
import ExchangePreview from './ExchangePreview';


function ExchangePreview(props) {
    const [modalVisible, setModalIsVisible] = useState(false);

    function openModal() {
        setModalIsVisible(true);
    }

    function closeModal() {
        setModalIsVisible(false);
    }



    return(
        <View style={styles.item}>
            <Pressable 
            onPress={() => {console.log("Post pressed");}}
            >

            <Text style={styles.title}>User: {props.listing.user_key}</Text>
            <Text style={styles.title}>{props.listing.ex_post_title}</Text>
            <Text style={styles.title}>{props.listing.ex_post_body}</Text>
            <Text style={styles.title}>Plant: {props.listing.ex_plant}</Text>
            <Text style={styles.title}>Posted: {props.listing.ex_post_date}</Text>
            
            </Pressable>
      </View>
    );
}

export default ExchangePreview;