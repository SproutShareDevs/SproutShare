import React from 'react'
import React, {useState} from 'react'
import {View,Button,TextInput} from 'react-native'
import styles from '../styles/styles';


export default function NewExchangeListing() {
    const{Title, setTitle} = useState()
    const{Description,setDescription} = useState()
    const{setDate,Date} = useState()
}


render() {
    return(
        <View style={styles.container}>
            <Text style={styles.commonName}>What are you Selling</Text>

              <TextInput style={styles.textInput} placeholder ="Listing Title"/>

              <TextInput style={styles.textInput} placeholder ="Listing Description"/>

              <TextInput style={styles.textInput} placeholder ="Date"/>

              <Button 
            title = "Submit Post"
            onPress={() => console.log("form submitted")}
            />
                
        </View>
    )
}