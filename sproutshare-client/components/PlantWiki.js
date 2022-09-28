import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from './SearchBar';

class PlantWiki extends React.Component {

    constructor(props){
        super(props);
        this.state = {
                    data: [],
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
          <View style={styles.item}>
            <View style={styles.nameplate}>
              <Image
                style={styles.tinyImage}
                source={{uri: item.image }}
              />
              <View>
                <Text style={styles.title}>Plant Name: {item.common_name}</Text>
                <Text style={styles.title}>Latin Name: {item.latin_name}</Text>
              </View>
            </View>
            <Text style={styles.title}>Hardiness Zone: {item.hardiness_zone}</Text>
            <Text style={styles.title}>Soil Type: {item.soil_type}</Text>
            <Text style={styles.title}>min_temp: {item.min_temp}</Text>
            <Text style={styles.title}>max_temp: {item.max_temp}</Text>
          </View>
        );
      }
      // filter of the name
      if (item.common_name.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
        return (
          <View style={styles.item}>
            <Text style={styles.title}>Plant Name: {item.common_name}</Text>
            <Text style={styles.title}>Latin Name: {item.latin_name}</Text>
            <Text style={styles.title}>Hardiness Zone: {item.hardiness_zone}</Text>
            <Text style={styles.title}>min_temp: {item.min_temp}</Text>
            <Text style={styles.title}>max_temp: {item.max_temp}</Text>
          </View>
        );
      }
    }

    render() {
        return(
            <View style={styles.container}>
                <View >
                  <SearchBar
                      placeholder='Search Here...'
                      updateSearch={this.updateSearch}
                      />
                </View>
                <View>
                  <FlatList
                    data = {this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.plant_id}
                  />
                  <Text>Welcome to the Plant Wiki</Text>
                  <Text>{this.state.success}</Text>
                </View>

            </View>
        );
    }

    componentDidMount = async() => {
      await axios.get(`${this.props.nodeServer}/plants`).then((response) => {
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
    backgroundColor: '#90EE90',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  tinyImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  nameplate: {
    flexDirection: 'row',
    marginBottom: 10
  }
});

export default PlantWiki;