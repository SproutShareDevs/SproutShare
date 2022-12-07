import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, TouchableOpacity } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

function ExpandedPost(props) {





    

    return (
        <>
            <Modal visible={props.visible} animationType="slide">
                <Button title='Close' onPress={props.onClose} />

                <View style={styles.containerCenter}>
                    <Text style={styles.title}>{props.post.comm_post_date}</Text>
                    <Text style={styles.title}t>User: {props.post.user_ID}</Text>
                    <Text>{props.post.comm_post_title}</Text>
                    <Text>{props.post.comm_post_body}</Text>
                </View>

            </Modal>
        </>
    );
}




export default ExpandedPost;