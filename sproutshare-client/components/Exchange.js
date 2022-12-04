import axios from 'axios';
import React, { useState, useEffect } from 'react';
import{SafeAreaView, Text, View, Button, StyleSheet, Modal, TouchableOpacity, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import { FlatList, Switch } from 'react-native-gesture-handler';
import SearchBar from './SearchBar';
import ExchangePreview from './ExchangePreview';
import styles from '../styles/styles';

import * as ImagePicker from 'expo-image-picker';



class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalIsVisible: false,
            search: '',
            success: 'No search yet',
            NewListing: false,
            ExchangePlant:'',
            ExchangeName:'',
            imageurivariable:null,
            ExchangeDescription:' ',
            Imagewanted: false
            
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.refreshpage = this.refreshpage.bind(this);
        this.getListings= this.getListings.bind(this);
    }

    updateSearch = (search) => {
        this.setState(state => {
          return {search: search};
        });
    }

    takePhoto = async () =>{
        
      const result = await ImagePicker.launchCameraAsync();
     
      this.imageurivariable = result.uri;console.log(this.imageurivariable)
      
  
    }
 
        pickImage = async () => {
           
             //No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
          
           this.imageurivariable = result.uri;
           
            
        }


    /*Returns item if state.search is included in common name*/
    renderItem = ({ item }) => {
        const searchPhrase = this.state.search;
        // when no input, show all
        if (searchPhrase === "") {
          return (
            <ExchangePreview nodeServer={this.props.nodeServer} listing={item} onExchangePreview= {this.refreshpage}/>
          );
        }
        // filter of the name
        if (item.ex_post_title.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
          return (
            <ExchangePreview nodeServer={this.props.nodeServer} listing={item} onExchangePreview= {this.refreshpage}/>
          );
        }
      }

    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
                
                <View>
                    <Image source={require("./../assets/Exchange.png")} style={styles.exchangeImage}></Image>
                    <View style={{marginTop:0}}>
                    <SearchBar 
                       
                        placeholder='Search Here...'
                        updateSearch={this.updateSearch}
                    />
                    </View>
                </View>

                  
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress = {() => this.setState({NewListing:true})}
                        style={styles.exchangeButton}>
                        <Text style ={styles.buttonText}>Add New Listing</Text>
                    </TouchableOpacity>
                    <Modal
                    transparent = {false}
                    visible = {this.state.NewListing}
                    >
                   
                    <View style={styles.containerCenter}>
                    <View style= {{backgroundColor:"#ffffff"}}>
                        
                    <View style={styles.containerCenter}>
                    <Text>Create a New Exchange Listing</Text>
                    <View style={styles.buttonContainer}>
                    <Button title="Upload an Image"
                    onPress={() => this.pickImage()}
                    />
                    <View style={styles.buttonContainer}>
                    <Button title="Take a new image"
                    onPress={() => this.takePhoto()}
                    />
                    </View>
                    </View>

                    <TextInput style={styles.textInput} placeholder ="Plant Type"
                    onChangeText = {(text) => {this.setState({ExchangePlant:text})}}
                    />

                    <TextInput style={styles.textInput} placeholder ="Listing Title"
                    onChangeText = {(text) => {this.setState({ExchangeName:text})}}
                    />

                    <TextInput style={styles.textInput}  placeholder ="Listing Description"
                    onChangeText = {(text) => {this.setState({ExchangeDescription:text})}}    
                    />    
                    
                   

                    

                    <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                     <Button color ="red" title = "Close" onPress={() => this.setState({NewListing:false})} />
                     </View>
                     <View style={styles.button}>
                     <Button title = "Submit Listing" onPress={()=> this.submitListing()}/>
                    </View>
                    </View>      
                    </View>
                    </View>
                    </View>
                    
                    </Modal>
                 </View>


                <View style={styles.ExchangeListingMargin}>
                    <FlatList 
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item._id}
                    />
                </View>
                </ImageBackground>
            </View>
        );
    }
    submitListing () {
        axios.post(`${this.props.nodeServer}/exchangeListings/store`,{
           ex_plant: this.state.ExchangePlant,
           ex_post_title: this.state.ExchangeName,
           ex_post_body: this.state.ExchangeDescription,
           user_key: 'Christian'
       }).then((response) => {
           this.setState({NewListing: false});
           console.log(response.data);
           console.log("Listing Posted");
       }).catch(err => {
           console.log('Error: ', err);
           console.log(err.response.data)
       });
       this.refreshpage();
    }

    refreshpage = async()=> {
        this.getListings();
    }
    componentDidMount = async() =>{
        this.getListings();
    }
    getListings = async() => {
        await axios.get(`${this.props.nodeServer}/exchangeListings`).then((response) => {
            this.setState(state => {
                return {data: response.data}
            });
          }).catch(err => {
            console.log('Error: ', err);
        });
    }
}

export default Exchange;