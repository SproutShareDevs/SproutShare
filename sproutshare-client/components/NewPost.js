import axios from 'axios';
import { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Pressable, Image, Modal, Button, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/styles';
import * as SecureStore from 'expo-secure-store';

function NewPost(props) {
    const [postModal, togglePostModal] = useState(false);
    const [postTitle, setTitle] = useState('');
    const [postBody, setBody] = useState('');
    const [user, setUser] = useState(props.user);

    function titleInputHandler(enteredTitle) {
        setTitle(enteredTitle);
    }

    function bodyInputHandler(enteredBody) {
        setBody(enteredBody);
    }

    async function getUser(){
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.get(`${props.nodeServer}/user/${accessToken}`).then((response) => {
            setUser(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log('Error fetching user: ', err);
        });
    }

    async function createPost() {
        await getUser();
        console.log("User: ", user)
        if(user !== undefined && user !== ''){
            await axios.post(`${props.nodeServer}/communityPosts/store`, {
                comm_post_title: postTitle,
                comm_post_body: postBody,
                user_ID: user.username
                })
                .then((response) => {
                  console.log(response.data);
                  console.log("Post created");
                }).catch(err => {
                  console.log('Error creating new post: ', err);
            });
            togglePostModal(false);
            props.onNewPost();
        }
    }


    return(
        <>
        
        <TouchableOpacity
            onPress={() => togglePostModal(true)}
            style={styles.circleButton}>
            <Image source={require("./../assets/plus.png")} style={styles.plusImage}></Image>
        </TouchableOpacity>
        <Modal visible={postModal} animationType="slide">
            <View style={styles.containerCenter}>
                <Text style={styles.title}>New Post</Text>
                <TextInput style={styles.textInput}
                    placeholder='Post Title'
                    onChangeText={titleInputHandler}
                    value={postTitle}
                />
                <TextInput style={styles.textInput}
                    placeholder='Post Body'
                    onChangeText={bodyInputHandler}
                    value={postBody}
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button color='#228b22' title='Create' onPress={createPost}/>
                    </View>
                    <View style={styles.button}>
                    <Button color='red' title='Close' onPress={() => togglePostModal(false)}/>
                    </View>
                    
                </View>         
            </View>
        </Modal>
      </>
    );
}


export default NewPost;