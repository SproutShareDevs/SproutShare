import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Button, FlatList, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
import NewPost from './NewPost';
import ExpandedPost from './ExpandedPost';
import styles from '../styles/styles';

import * as SecureStore from 'expo-secure-store';

class CommunityFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: {},
            modalVisible: false
        }
        this.rerender = this.rerender.bind(this);
        this.fetchCommunityPosts = this.fetchCommunityPosts.bind(this);
        this.fetchUserId = this.fetchUserId.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.setModalVisiblity = this.setModalVisiblity.bind(this);
        this.sortPosts = this.sortPosts.bind(this);
    }

    setModalVisiblity(bool) {
        this.setState(state => {
            return { modalVisible: bool }
        });
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
                                    <Pressable
                                        onPress={() => this.setModalVisiblity(true)}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={require("./../assets/pfp.png")} style={styles.pfpImage}></Image>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.comDate}>{item.comm_post_date}</Text>
                                                <Text style={styles.comUser}>User: {item.user_ID}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.comTitle}>{item.comm_post_title}</Text>
                                        <Text style={styles.comBody}>{item.comm_post_body}</Text>
                                    </Pressable>
                                    <ExpandedPost nodeServer={this.props.nodeServer} post={item} visible={this.state.modalVisible} onClose={() => this.setModalVisiblity(false)} />
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