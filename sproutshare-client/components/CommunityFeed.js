import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, View, Button, FlatList, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
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
            <View style={styles.container}>
                <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
                <View style={{flexDirection: 'row'}}>
                <NewPost nodeServer={this.props.nodeServer} onNewPost={this.rerender}/>
                <Image source={require("./../assets/MyCommunity.png")} style={styles.communityImage}></Image>
                </View>
                <View style={styles.listBottomMargin}>
                <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => 
                    
                    <View style={styles.itemCommunity}>
                        <Pressable android_ripple={styles.rippleEffect} onLongPress={() => this.deletePost(item._id)}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("./../assets/pfp.png")} style={styles.pfpImage}></Image>
                                <View style={{flexDirection: 'column'}}>
                                <Text style={styles.comDate}>{item.comm_post_date}</Text>
                                <Text style={styles.comUser}>User: {item.user_key}</Text>
                                </View>
                            </View>
                            <Text style={styles.comTitle}>{item.comm_post_title}</Text>
                            <Text style={styles.comBody}>{item.comm_post_body}</Text>
                            
                        </Pressable>
                    </View>
                   
                    }
                    keyExtractor={item => item._id}
                    contentContainerStyle={{paddingBottom: 20}}
                />
                </View>
                </ImageBackground>
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
            console.log('Error Fetching Posts: ', err);
        });
    }

    deletePost = async(id) => {
        await axios.delete(`${this.props.nodeServer}/communityPosts/delete/${id}`).then((response) => {
            console.log(response.data);
            console.log("Post deleted");
          }).catch(err => {
            console.log('Error Deleting Post: ', err);
        });
        this.rerender();
    }
}

export default CommunityFeed;