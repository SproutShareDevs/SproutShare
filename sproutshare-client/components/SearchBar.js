import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet } from 'react-native';
import styles from '../styles/styles';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
    }

    handleChange = (search) =>{
        this.props.updateSearch(search);

    }

    render() {
        return(
                <TextInput style={styles.searchBarContainer}
                    placeholder= {this.props.placeholder}
                    onChangeText={this.handleChange}
                />
        );
    }
}



export default SearchBar