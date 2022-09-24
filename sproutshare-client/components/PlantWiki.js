import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from './SearchBar';

class PlantWiki extends React.Component {


    constructor(props){
        super(props);
        this.state = {
                    plantList: [],
                    search: '',
                    success: 'No search yet'
        }
        this.query = this.query.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    query = (search) => {
      //TODO: request DB for filtered plant data by search term, needs endpoint to access
      //Placeholder output to test
      this.setState(state => {
        return {success: 'you searched for '+ search};
      });
    }

    updateSearch = (search) => {
      this.setState(state => {
        return {search: search};
      });
      this.query(search);
    }

    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SearchBar
                    placeholder='Search Here...'
                    updateSearch={this.updateSearch}
                />
                <Text>Welcome to the Plant Wiki</Text>
                <Text>{this.state.success}</Text>
                <FlatList
                  data = {this.state.data}
                  keyExtractor={item => item._id}
                />

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#90EE90',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 16,
    },
  });

export default PlantWiki;