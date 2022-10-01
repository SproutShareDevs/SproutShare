import { useState } from 'react';
import {StyleSheet, View, Text, Pressable, Image, Modal, Button } from 'react-native'


function NewPost(props) {
    const [postModal, togglePostModal] = useState(false);

    return(
        <>
        <Button color='#228b22' title='New Post' onPress={() => togglePostModal(true)}/>
        <Modal visible={postModal} animationType="slide">
            <View style={styles.container}>
                <Text>New Post</Text>
                <Button color='#228b22' title='Close' onPress={() => togglePostModal(false)}/>
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
        color: '#228b22'
    }
  });

export default NewPost;