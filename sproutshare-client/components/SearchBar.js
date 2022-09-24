import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet } from 'react-native';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
    }

    handleChange = (search) =>{
        console.log('called handleChange')
        this.props.updateSearch(search);

    }

    render() {
        return(
                <TextInput style={styles.container}
                    placeholder='Search Here...'
                    onChangeText={this.handleChange}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
    margin: 15,
    paddingLeft:4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    borderColor: '#000000',
    borderWidth: 1
    
  },
  });

export default SearchBar