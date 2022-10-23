import axios from 'axios';
import React, { useState, useEffect } from 'react';
import{SafeAreaView, Text, View, Button, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from './SearchBar';
import ExchangePreview from './ExchangePreview';
import styles from '../styles/styles';


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
            ExchangeDescription:' '
        }
       
        this.updateSearch = this.updateSearch.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    updateSearch = (search) => {
        this.setState(state => {
          return {search: search};
        });
    }

    /*Returns item if state.search is included in common name*/
    renderItem = ({ item }) => {
        const searchPhrase = this.state.search;
        // when no input, show all
        if (searchPhrase === "") {
          return (
            <ExchangePreview nodeServer={this.props.nodeServer} listing={item} />
          );
        }
        // filter of the name
        if (item.ex_post_title.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
          return (
            <ExchangePreview nodeServer={this.props.nodeServer} listing={item}/>
          );
        }
      }

   
    /*setNewListingState(){
        this.setState({NewListing:true})
    }*/

    render() {
        return(
            <View styles={styles.container}>
                <View>
                    <SearchBar 
                        placeholder='Search Here...'
                        updateSearch={this.updateSearch}
                    />
                </View>

                

                <View styles={styles.buttonContainer}>
                    <Button
                    title = "ADD NEW LISTING"
                    onPress = {() => this.setState({NewListing:true})}
                     />
                    <Modal
                    transparent = {false}
                    visible = {this.state.NewListing}
                    >
                    <View style={styles.containerCenter}>
                    <View style= {{backgroundColor:"#ffffff"}}>
                        
                    <View style={styles.containerCenter}>
                    <Text>Create a New Exchange Listing</Text>

                    <TextInput style={styles.textInput} placeholder ="Listing Title"
                    onChangeText={() => {this.setState({ExchangePlant:''})}}
                    />

                    <TextInput style={styles.textInput} placeholder ="Listing Title"
                    onChangeText={() => {this.setState({ExchangeTitle:''})}} />

                    <TextInput style={styles.textInput}  placeholder ="Listing Description"
                    onChangeText={() => {this.setState({ExchangeDescription:''})}}         
                    />    
                    <View style={styles.buttonContainer}>
                     <Button color ="red" title = "Close" onPress={() => this.setState({NewListing:false})} />
                     <Button title = "Submit Listing" onPress={()=> this.submitListing}/>
                    </View>      
                    </View>
                    </View>
                    </View>
                    
                    </Modal>
                 </View>

                
                <View style={styles.listBottomMargin}>
                    <FlatList 
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item._id}
                    />
                </View>
            </View>
        );
    }

    submitListing = async() =>{
        console.log("in function")
        await axios.post(`${this.props.nodeServer}exchangeListings/store`,{
        ex_plant: ExchangePlant,
        ex_post_title: ExchangeTitle, 
        ex_post_body: ExchangeDescription,
        user_ID: 'Christian'

    }).then((response) => {
        console.log(response.data);
        console.log("Listing Posted");
    }).catch(err => {
        console.log('Error: ', err);
    })
}

    componentDidMount = async() => {
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