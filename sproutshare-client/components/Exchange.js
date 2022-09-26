import axios from 'axios';
import React, { useState, useEffect } from 'react';
import{SafeAreaView, Text, View, Button, FlatList, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'


class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalIsVisible: false
        }
        this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
    }

    toggleModalVisibility() {
        if(this.state.modalIsVisible == true) {
            this.setState({modalIsVisible: false});
        } else {
            this.setState({modalIsVisible: true});    
        }
    }

    render() {
        return(
            <View styles={styles.container}>
                <Text>Welcome to the Plant Exchange</Text>
                <Button title='Search for post' color='#228b22' onPress={this.toggleModalVisibility}/>
                <Modal style={styles.modalcss} visible={this.state.modalIsVisible} animationType='slide'>
                    <Button title='Exchange Home' color='#228b22' onPress={this.toggleModalVisibility}/>
                    
                    <TextInput
                        style={styles.textInput} 
                        placeholder='Search by plant, user, or description' 
                    />
                </Modal>

                <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => 
                    <View style={styles.item}>
                        <Text style={styles.title}>User: {item.user_ID}</Text>
                        <Text style={styles.title}>Post Title: {item.ex_post_title}</Text>
                        <Text style={styles.title}>Body: {item.ex_post_body}</Text>
                        <Text style={styles.title}>Post Date: {item.ex_post_date}</Text>
                    </View>}
                    keyExtractor={item => item._id}
                />
            </View>
        );
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#B2D3C2',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 16,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 16,
        backgroundColor: '#B2D3C2',
        borderColor: '#B2D3C2',
        width: '100%',
        padding: 8,
        color: '#120438'
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },



  });

export default Exchange;