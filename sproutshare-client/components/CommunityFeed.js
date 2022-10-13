import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, View, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import NewPost from './NewPost';
import styles from '../styles/styles';

class CommunityFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.rerender = this.rerender.bind(this);
        this.fetchCommunityPosts = this.fetchCommunityPosts.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    render() {
        return(
            <View styles={styles.container}>
                <NewPost nodeServer={this.props.nodeServer} onNewPost={this.rerender}/>
                <View style={styles.listBottomMargin}>
                <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => 
                    
                    <View style={styles.item}>
                        <Pressable android_ripple={styles.rippleEffect} onLongPress={() => this.deletePost(item._id)}>
                            <Text style={styles.title}>User: {item.user_key}</Text>
                            <Text style={styles.title}>Post Title: {item.comm_post_title}</Text>
                            <Text style={styles.title}>Body: {item.comm_post_body}</Text>
                            <Text style={styles.title}>Post Date: {item.comm_post_date}</Text>
                        </Pressable>
                    </View>
                   
                    }
                    keyExtractor={item => item._id}
                />
                </View>
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

    deletePost = async(id) => {
        await axios.delete(`${this.props.nodeServer}/communityPosts/delete/${id}`).then((response) => {
            console.log(response.data);
            console.log("Post deleted");
          }).catch(err => {
            console.log('Error: ', err);
        });
        this.rerender();
    }
}

export default CommunityFeed;