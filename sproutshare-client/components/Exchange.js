import axios from 'axios';
import React, { useState, useEffect } from 'react';
import{SafeAreaView, Text, View, Button, FlatList, StyleSheet } from 'react-native';


class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return(
            <View styles={styles.container}>
                <Text>Welcome to the Plant Exchange</Text>
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
  });

export default Exchange;