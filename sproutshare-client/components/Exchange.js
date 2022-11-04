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
        this.refreshthelistings = this.refreshthelistings.bind(this);
        this.GetexchangeListings = this.GetexchangeListings(this);
    
        
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
      
    

    render() {

        return(
      <View styles={styles.container}>

        <ExchangePreview nodeServer={this.props.nodeServer} onDeleteList={this.refreshthelistings}/>
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
                    color ="green"
                     />
                    <Modal
                    transparent = {false}
                    visible = {this.state.NewListing}
                    >
                    <View style={styles.containerCenter}>
                    <View style= {{backgroundColor:"#ffffff"}}>
                        
                    <View style={styles.containerCenter}>
                    <Text>Create a New Exchange Listing</Text>

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

   
                <View style={styles.ExchangelistBottomMargin}>
                    <FlatList 
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item._id}
                    />
                </View>
            </View>
        </View>
  

        );
    }

    submitListing () {
     axios.post(`${this.props.nodeServer}/exchangeListings/store`,{
        ex_plant: this.state.ExchangePlant,
        ex_post_title: this.state.ExchangeName,
        ex_post_body: this.state.ExchangeDescription,
        user_ID: 'Christian'
    }).then((response) => {
        this.setState({NewListing: false});
        console.log(response.data);
        console.log("Listing Posted");
        
      
    }).catch(err => {
        console.log('Error: ', err);
        console.log(err.response.data)
    });
    this.refreshthelistings();
    
}


refreshthelistings = async() => {
  this.GetexchangeListings();
    
}

componentDidMount = async() => {
    this.GetexchangeListings();
}

GetexchangeListings = async() => {
    await axios.get(`${this.props.nodeServer}/exchangeListings`).then((response) => {
        this.setState(state => {
            return {data: response.data}
            
        });
      }).catch(err => {
        console.log('Error: ', err);
    });
    console.log("refreshed");
}
}



   /*ComponentDidMount = async() => {
        await axios.get(`${this.props.nodeServer}/exchangeListings`).then((response) => {
            this.setState(state => {
                return {data: response.data}
            });
          }).catch(err => {
            console.log('Error: ', err);
        });
    }
}*/

export default Exchange;