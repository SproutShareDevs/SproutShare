import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Button } from 'react-native'
import styles from "../styles/styles";
import ExpandedPost from "./ExpandedPost";
import axios from 'axios';

function PostPreview(props) {
    const [subModalVisible, setSubModalIsVisible] = useState(false);
    const [post, setPost] = useState({});

    const deleteHandler = () => {
        props.onDelete();
        setSubModalIsVisible(false);
    }

    const setModalVisibility = () => {
        setSubModalIsVisible(!subModalVisible);
    }

    return (
        <>
        <Pressable
            onPress={setModalVisibility}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image source={require("./../assets/pfp.png")} style={styles.pfpImage}></Image>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.comDate}>{props.post.comm_post_date}</Text>
                    <Text style={styles.comUser}>User: {props.post.user_ID}</Text>
                </View>
            </View>
            <Text style={styles.comTitle}>{props.post.comm_post_title}</Text>
            <Text style={styles.comBody}>{props.post.comm_post_body}</Text>
            
        </Pressable>
        <ExpandedPost nodeServer={props.nodeServer} post={props.post} visible={subModalVisible} onDelete={deleteHandler} onClose={setSubModalIsVisible} />
        </>
    );
}
export default PostPreview;