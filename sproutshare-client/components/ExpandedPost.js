import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, TouchableOpacity, Alert } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import NewComment from './NewComment';

function ExpandedPost(props) {
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [rating, setRating] = useState(false);
    const [editView, setEditView] = useState(false);
    const [editPost, setEditPost] = useState('');
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
            const controlButtons = <View>
                <Button title="Delete Post" onPress={deleteButtonHandler} />
                <Button title="Edit" onPress={editButtonHandler} />
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
        setEditView(true);
        /*Alert.alert(
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
        )*/
    }

    const renderItem = ({ item }) => {
        return <View key={item._id} style={{ paddingHorizontal: 20, marginTop: 5 }}>
            <Text style={{fontWeight: "bold", fontSize: 20}} >{item.user_ID}</Text>
            <Text>{item.text}</Text>
            <Text>Rating: {item.rated_by_users.length} </Text>
            <Button title={(hasUserRated(item)) ? "Upvoted!" : "Not upvoted"} onPress={() => toggleRating(item)} />
        </View>
        /*
        if(item.garden_key == props.garden.garden_key) {
            return <UserPlantPreview onDelete={fetchUserPlants} nodeServer ={props.nodeServer} userPlant = {item}/>
        }
        */
    }

     // setRating and rating aren't actually used, but they update state and force a rerender so.... they're necessary.
     function toggleRating(item){
        let index = item.rated_by_users.findIndex((element) => element == props.user.username);
        //console.log("Index: ", index);
        //console.log("User: ", props.user);
        if(index != -1){
            setRating(false);
            item.rated_by_users.splice(index, 1);
            console.log("Rating: ", rating);
            console.log("Item: ", item);
        } else{
            setRating(true);
            item.rated_by_users.push(props.user.username);
            console.log("Rating: ", rating);
            console.log("Item: ", item);
        }
    }

    function hasUserRated(item){
        if(item.rated_by_users.findIndex((element) => element == props.user.username) == -1){
            return false;
        } else
            return true;
    }

    async function closeAndSave(post){
        console.log("Post: ", post);
        console.log("ID: ", post._id);
        await axios.put(`${props.nodeServer}/communityPosts/update/${post._id}`, {
            user_ID: post.user_ID,
            comm_post_date: post.comm_post_date, 
            comm_post_title: post.comm_post_title, 
            comm_post_body: post.comm_post_body,
            rated_by_users: post.rated_by_users,
            comments: post.comments
          }).then((response) => {
            console.log(response.data);
            console.log("Post updated");
        }).catch(err => {
            console.log('Error updating post: ', err);
        });
        props.onClose();
    }



    return (

        <>
            <Modal visible={props.visible} animationType="slide">
                <Button title='Close' onPress={() => closeAndSave(props.post)} />

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
                    <Text >Rating: {props.post.rated_by_users.length}</Text>
                    <Button title={(hasUserRated(props.post)) ? "Upvoted!" : "Not upvoted"} onPress={() => toggleRating(props.post)} />
                    <Text style={{ fontWeight: "bold", marginTop: 15, paddingHorizontal: 20 }}>Comments</Text>
                    <FlatList
                        data={props.post.comments}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                    <NewComment nodeServer={props.nodeServer} post={props.post} onNewComment={rerender}/>
                    {renderControlButtons()}
                    {editView ? <><TextInput style={styles.textInput} placeholder = 'New post...' onChangeText={text => setEditPost(text)} value={editPost}></TextInput>
                    <Button title='Confirm' onPress={() => props.post.comm_post_body = editPost} />
                    <Button title='Close' onPress={() => setEditView(false)} />
                    </> : <></>}
                </View>

            </Modal>
        </>
    );
}




export default ExpandedPost;