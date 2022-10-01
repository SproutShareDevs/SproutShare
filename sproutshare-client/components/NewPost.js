import axios from 'axios';
import { useState } from 'react';
import {StyleSheet, View, Text, Pressable, Image, Modal, Button, TextInput } from 'react-native'


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
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    title: {
      fontSize: 16,
      textAlign: 'center'
    },
    button: {
        margin: 15
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 16,
        backgroundColor: '#B2D3C2',
        borderColor: '#B2D3C2',
        width: '90%',
        padding: 8,
        color: '#120438',
        margin: 15
    }
  });

export default NewPost;