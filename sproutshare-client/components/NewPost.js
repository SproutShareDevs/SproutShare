import axios from 'axios';
import { useState } from 'react';
import {StyleSheet, View, Text, Pressable, Image, Modal, Button, TextInput } from 'react-native'
import styles from '../styles/styles';

function NewPost(props) {
    const [postModal, togglePostModal] = useState(false);
    const [postTitle, setTitle] = useState('');
    const [postBody, setBody] = useState('');

    function titleInputHandler(enteredTitle) {
        setTitle(enteredTitle);
    }

    function bodyInputHandler(enteredBody) {
        setBody(enteredBody);
    }

    async function createPost() {
        await axios.post(`${props.nodeServer}/communityPosts/store`, {
            comm_post_title: postTitle,
            comm_post_body: postBody,
            user_ID: 'Erik'
            })
            .then((response) => {
              console.log(response.data);
              console.log("Post created");
            }).catch(err => {
              console.log('Error: ', err);
        });
        togglePostModal(false);
        props.onNewPost();
    }


    return(
        <>
        <Button color='#228b22' title='New Post' onPress={() => togglePostModal(true)}/>
        <Modal visible={postModal} animationType="slide">
            <View style={styles.containerCenter}>
                <Text style={styles.title}>New Post</Text>
                <TextInput style={styles.textInput}
                    placeholder='Post Title'
                    onChangeText={titleInputHandler}
                    value={postTitle}
                />
                <TextInput style={styles.textInput}
                    placeholder='Post Title'
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