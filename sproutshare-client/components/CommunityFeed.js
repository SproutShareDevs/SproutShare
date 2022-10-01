import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, View, Button, FlatList, StyleSheet } from 'react-native';
import NewPost from './NewPost';

class CommunityFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.rerender = this.rerender.bind(this);
        this.fetchCommunityPosts = this.fetchCommunityPosts.bind(this);
    }

    

    render() {
        return(
            <View styles={styles.container}>
                <NewPost nodeServer={this.props.nodeServer} onNewPost={this.rerender}/>
                <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => 
                    <View style={styles.item}>
                        <Text style={styles.title}>User: {item.user_ID}</Text>
                        <Text style={styles.title}>Post Title: {item.comm_post_title}</Text>
                        <Text style={styles.title}>Body: {item.comm_post_body}</Text>
                        <Text style={styles.title}>Post Date: {item.comm_post_date}</Text>
                    </View>}
                    keyExtractor={item => item._id}
                />
            </View>
        );
    }

    // each time a new post is created, community posts needs to be rerendered
    rerender = async() => {
        this.fetchCommunityPosts();
    }

    // on initial rendering of this screen, fetch the community posts
    componentDidMount = async() => {
        this.fetchCommunityPosts();
    }

    // axios GET request to root /communityPosts endpoint. retreives all posts
    fetchCommunityPosts = async() => {
        await axios.get(`${this.props.nodeServer}/communityPosts`).then((response) => {
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
  });

export default CommunityFeed;