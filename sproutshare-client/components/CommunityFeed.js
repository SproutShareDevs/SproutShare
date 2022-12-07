import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, View, Button, FlatList, StyleSheet, Pressable, Image, ImageBackground, Modal, TextInput } from 'react-native';
import NewPost from './NewPost';
import PostPreview from './PostPreview';
import ExpandedPost from './ExpandedPost';
import styles from '../styles/styles';
import * as SecureStore from 'expo-secure-store';

import * as SecureStore from 'expo-secure-store';


class CommunityFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            bigViewModal: false,
            user: ''
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
    onBigViewModal = () => {
        this.setState({bigViewModal: true});
    }
    offBigViewModal = () => {
        this.setState({bigViewModal: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>
                <View style={{flexDirection: 'row'}}>
                <NewPost nodeServer={this.props.nodeServer} onNewPost={this.rerender} user={this.state.user}/>
                <Image source={require("./../assets/MyCommunity.png")} style={styles.communityImage}></Image>
                </View>
                <View style={styles.listBottomMargin}>
                <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => 
                        <View style={styles.itemCommunity}>
                            <Pressable android_ripple={styles.rippleEffect} onPress = {this.onBigViewModal} onLongPress={() => this.deletePost(item._id)}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require("./../assets/pfp.png")} style={styles.pfpImage}></Image>
                                    <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.comDate}>{item.comm_post_date}</Text>
                                    {console.log("Item: ", item)}
                                    <Text style={styles.comUser}>User: {item.user_ID}</Text>
                                    </View>
                                </View>
                                <Text style={styles.comTitle}>{item.comm_post_title}</Text>
                                <Text style={styles.comBody}>{item.comm_post_body}</Text>
                                
                            </Pressable>
                            <CommPostBigView bigViewModal={this.state.bigViewModal} offBigViewModal={this.offBigViewModal} item={item} styles={styles} user={this.state.user}/>
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
    rerender = async () => {
        await this.fetchCommunityPosts();
        this.sortPosts();
    }

    // on initial rendering of this screen, fetch the community posts
    componentDidMount = async() => {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.get(`${this.props.nodeServer}/user/${accessToken}`).then((response) => {
            this.setState({user: response.data});
            console.log(response.data);
            console.log("User: ", this.state.user);
        }).catch(err => {
            console.log('Error fetching user: ', err);
        });
        this.fetchCommunityPosts();
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

function CommPostBigView(props){
    const [rating, setRating] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const [comment, setComment] = useState('');
    
    function toggleRating (){
        let index = props.item.rated_by_users.findIndex((element) => element == props.user.username);
        console.log("Index: ", index);
        console.log("User: ", props.user);
        if(index != -1){
            setRating(false);
            props.item.rated_by_users.splice(0, 1);
            console.log("Rating: ", rating);
            console.log("Item: ", props.item);
        } else{
            setRating(true);
            props.item.rated_by_users.push(props.user.username);
            console.log("Rating: ", rating);
            console.log("Item: ", props.item);
        }
    }

    function addComment (){
        props.item.comments.push(
            {
                user_ID: props.user.username,
                comm_post_body: comment,
                rated_by_users: []
            }
        )
    }

    return(
        <><Modal visible={props.bigViewModal} animationType="slide">
            <Button title='Close' onPress={props.offBigViewModal} />
            <View style={{flexDirection: 'row'}}>
                <Image source={require("./../assets/pfp.png")} style={props.styles.pfpImage}></Image>
                <View style={{flexDirection: 'column'}}>
                <Text style={props.styles.comDate}>{props.item.comm_post_date}</Text>
                {console.log("Item: ", props.item)}
                <Text style={props.styles.comUser}>User: {props.item.user_ID}</Text>
                </View>
            </View>
            <Text style={props.styles.comTitle}>{props.item.comm_post_title}</Text>
            <Text style={props.styles.comBody}>{props.item.comm_post_body}</Text>
            {/*The length of the rated by users array is the number of users who have rated it. You can't see this from the main comm feed atm,
            if anyone asks say it's like YouTube - need to engage with the full content for at least a bit before you can see/engange with ratings*/}
            <Text style={props.styles.comBody}>{props.item.rated_by_users.length}</Text>
            <Button title={(rating) ? "Upvoted!" : "Not upvoted"} onPress={toggleRating} />
            <Button title={"Add comment"} onPress={addComment} />
            <TextInput placeholder='Enter Comment' onChangeText={text => setComment(text)} value={comment} />
            <FlatList 
                    data={props.item.comments}
                    renderItem={({ item }) => 
                        <View style={styles.itemCommunity}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("./../assets/pfp.png")} style={styles.pfpImage}></Image>
                                <View style={{flexDirection: 'column'}}>
                                <Text style={styles.comDate}>{item.comm_post_date}</Text>
                                {console.log("Item: ", item)}
                                <Text style={styles.comUser}>User: {item.user_ID}</Text>
                                </View>
                            </View>
                            <Text style={styles.comBody}>{item.comm_post_body}</Text>
                            <Text>Rating: {item.rated_by_users.length} </Text>
                        </View>
                    }
                    keyExtractor={item => item._id}
                    contentContainerStyle={{paddingBottom: 20}}
                />
        </Modal></>
        
    )
}

export default CommunityFeed;