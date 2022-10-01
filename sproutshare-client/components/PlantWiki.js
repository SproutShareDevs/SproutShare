import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from './SearchBar';
import PlantPreview from './PlantPreview';
import styles from '../styles/styles';

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
          <PlantPreview plant={item} />
        );
      }
      // filter of the name
      if (item.common_name.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
        return (
          <PlantPreview plant={item}/>
        );
      }
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                  <SearchBar
                      placeholder='Search Here...'
                      updateSearch={this.updateSearch}
                      />
                </View>
                
                <View style={styles.listBottomMargin}>
                  <FlatList
                    data = {this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.plant_id}
                  />
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

export default PlantWiki;