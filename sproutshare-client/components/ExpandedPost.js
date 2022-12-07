import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import NewComment from './NewComment';

function ExpandedPost(props) {
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [commentModal, setCommentModalVisibility] = useState(false);
    useEffect(() => {
        setPost(props.post);
        fetchUserId();
        renderControlButtons();
    }, [props.visible]);

    const fetchUserId = async () => {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.get(`${props.nodeServer}/user/${accessToken}`).then((response) => {
            setUser(response.data);
        }).catch(err => {
            console.log('Error Fetching User: ', err);
        });
    }

    function renderControlButtons() {


        if (user.username == props.post.user_ID) {
            const controlButtons = <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={editButtonHandler}
                    style={styles.formButton}>
                    <Text style={styles.formButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={deleteButtonHandler}
                    style={styles.formButtonDelete}>
                    <Text style={styles.formButtonText}>Delete</Text>
                </TouchableOpacity>
                
            </View>
            return controlButtons;
        }
    }

    async function rerender() {
        props.onNewComment();
    }

    const deleteButtonHandler = () => {
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Post deletion cancellled")
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        axios.delete(`${props.nodeServer}/communityposts/delete/${props.post._id}`).then((response) => {
                            console.log(response.data);
                            props.onDelete();
                        }).catch((err) => {
                            console.log("Error deleting plant: " + err);
                        });
                    }
                }
            ]
        );

    }

    const editButtonHandler = () => {
        Alert.alert(
            "Edit Post",
            "Edit Post Placeholder:",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Edit Post Cancelled")
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        console.log("Edited Post");
                    }
                }
            ]
        );
    }

    const renderItem = ({ item }) => {
        return <View key={item._id} style={{ paddingHorizontal: 20, marginTop: 5 }}>
            <Text>{item.user_ID}</Text>
            <Text>{item.text}</Text>
        </View>
        /*
        if(item.garden_key == props.garden.garden_key) {
            return <UserPlantPreview onDelete={fetchUserPlants} nodeServer ={props.nodeServer} userPlant = {item}/>
        }
        */
    }



    return (

        <>
            <Modal visible={props.visible} animationType="slide">
                <Button title='Close' color="#19543E" onPress={props.onClose} />
                <ImageBackground source={require("./../assets/MainBackground.png")} style={styles.backgroundImage}>

                <View style={styles.fullItemCommunity}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require("./../assets/pfp.png")} style={styles.pfpImage}></Image>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.fullComDate}>{props.post.comm_post_date.substring(0, 10)}</Text>
                            <Text style={styles.fullComUser}>User: {props.post.user_ID}</Text>
                        </View>
                    </View>
                    <Text style={styles.comTitle}>{props.post.comm_post_title}</Text>
                    <Text style={styles.comBody}>{props.post.comm_post_body}</Text>
                    <Text style={{ fontWeight: "bold", marginTop: 15, paddingHorizontal: 20 }}>Comments</Text>
                    <FlatList
                        data={props.post.comments}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                    <NewComment nodeServer={props.nodeServer} post={props.post} onNewComment={rerender} />
                    {renderControlButtons()}
                </View>
                </ImageBackground>
            </Modal>
        </>
    );
}




export default ExpandedPost;