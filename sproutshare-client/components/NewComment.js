import axios from 'axios';
import { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Pressable, Image, Modal, Button, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/styles';

import * as SecureStore from 'expo-secure-store';

function NewComment(props) {
    const [commentModal, toggleCommentModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [username, setUsername] = useState('');

    function textInputHandler(enteredBody) {
        setCommentText(enteredBody);
    }

    useEffect(() => {
        const fetchUsername = async () => {
            let accessToken = await SecureStore.getItemAsync('AccessToken');
            await axios.get(`${props.nodeServer}/user/${accessToken}`).then((response) => {
                setUsername(response.data.username)
            }).catch(err => {
                console.log('Error: ', err);
            });
        }
        fetchUsername();
    }, []);

    async function createComment() {

        await axios.post(`${props.nodeServer}/communityPosts/${props.post._id}/addcomment`, {
            text: commentText,
            user_ID: username,
            rated_by_users: [],
            })
            .then((response) => {
              console.log("Parent post: ", props.post);
              console.log("Comment: ", response.data);
              console.log("Comment created");
              //props.onNewComment();
            }).catch(err => {
              console.log('Error creating new comment: ', err);
        });
        await axios.get(`${props.nodeServer}/communityPosts/${props.post._id}`)
            .then((response) => {
              // Need someway to add the new comment to the current post
              //props.post.comments.push(response.data.comments);
              props.post.comments = response.data.comments;
              console.log("Props post: ", props.post);
              console.log("New post: ", response.data);
              console.log("Comment created");
              
              //props.onNewComment();
            }).catch(err => {
              console.log('Error creating new comment: ', err);
        });
        toggleCommentModal(false);
        // props.onNewComment();
    }


    return(
        <>
        <View style={{alignItems:'center', marginTop: 10}}>
        <TouchableOpacity
                onPress={() => toggleCommentModal(true)}
                style={styles.formButton}>
                <Text style={styles.formButtonText}>Add Comment</Text>
        </TouchableOpacity>
        </View>
        <Modal visible={commentModal} animationType="slide">
            <View style={styles.containerCenter}>
                <Text style={styles.title}>New Comment</Text>
                <TextInput style={styles.textInput}
                    placeholder='Comment Text'
                    onChangeText={textInputHandler}
                    value={commentText}
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button color='#228b22' title='Create' onPress={createComment}/>
                    </View>
                    <View style={styles.button}>
                    <Button color='red' title='Close' onPress={() => toggleCommentModal(false)}/>
                    </View>
                    
                </View>         
            </View>
        </Modal>
      </>
    );
}


export default NewComment;