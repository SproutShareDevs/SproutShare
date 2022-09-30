import axios from 'axios';
import React, { useState, useEffect } from 'react';
import{SafeAreaView, Text, View, Button, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from './SearchBar';
import ExchangePreview from './ExchangePreview';


class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalIsVisible: false,
            search: '',
            success: 'No search yet'
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
            <ExchangePreview listing={item} />
          );
        }
        // filter of the name
        if (item.ex_post_title.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
          return (
            <ExchangePreview listing={item}/>
          );
        }
      }

    render() {
        return(
            <View styles={styles.container}>
                <View>
                    <SearchBar 
                        placeholder='Search Here...'
                        updateSearch={this.updateSearch}
                    />
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
    listBottomMargin: {
        marginBottom: 60
    }
  });

export default Exchange;