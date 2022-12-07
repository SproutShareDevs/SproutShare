import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Button, FlatList, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
import NewPost from './NewPost';
import PostPreview from './PostPreview';
import ExpandedPost from './ExpandedPost';
import styles from '../styles/styles';

import * as SecureStore from 'expo-secure-store';


class CommunityFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: {},
        }
        this.rerender = this.rerender.bind(this);
        this.fetchCommunityPosts = this.fetchCommunityPosts.bind(this);
        this.fetchUserId = this.fetchUserId.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.sortPosts = this.sortPosts.bind(this);
    }



    sortPosts = () => {
        const data = this.state.data;
        const sortedData = data.sort((a, b) => (a.comm_post_date < b.comm_post_date));
    
        this.setState({data: sortedData});
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
                    <View style={{ flexDirection: 'row' }}>
                        <NewPost nodeServer={this.props.nodeServer} onNewPost={this.rerender} />
                        <Image source={require("./../assets/MyCommunity.png")} style={styles.communityImage}></Image>
                    </View>
                    <View style={styles.listBottomMargin}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) =>


                                <View style={styles.itemCommunity}>
                                    <PostPreview nodeServer={this.props.nodeServer} onDelete={this.rerender} post={item}/>
                                    {/*<Pressable android_ripple={styles.rippleEffect} onLongPress={() => this.deletePost(item._id)}>*/}
                                </View>



                            }
                            keyExtractor={item => item._id}
                            contentContainerStyle={{ paddingBottom: 20 }}

                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }

    // each time a new post is created, community posts needs to be rerendered
    rerender = async () => {
        await this.fetchCommunityPosts();
        this.sortPosts();
    }

    // on initial rendering of this screen, fetch the community posts
    componentDidMount = async () => {
        await this.fetchUserId();
        await this.fetchCommunityPosts();
        this.sortPosts();
    }

    // axios GET request to root /communityPosts endpoint. retreives all posts
    fetchCommunityPosts = async () => {

        await axios.get(`${this.props.nodeServer}/communityPosts`).then((response) => {
            this.setState(state => {
                return { data: response.data }
            });
        }).catch(err => {
            console.log('Error Fetching Posts: ', err);
        });
    }

    fetchUserId = async () => {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.get(`${this.props.nodeServer}/user/${accessToken}`).then((response) => {
            this.setState(state => {
                return { user: response.data }
            });
        }).catch(err => {
            console.log('Error Fetching Posts: ', err);
        });
    }

    deletePost = async (id) => {
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