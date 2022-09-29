import {StyleSheet, View, Text, Pressable, Image, Modal, Button } from 'react-native'

function PlantFullView(props) {



    return(
        <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.commonName}>Plant Name: {props.plant.common_name}</Text>
                    <Text style={styles.latinName}>Latin Name: {props.plant.latin_name}</Text>
                </View>
                
                <Image
                    style={styles.mediumImage}
                    source={{uri: props.plant.image }}
                />

                <Text style={styles.title}>Hardiness Zone: {props.plant.hardiness_zone}</Text>
                <Text style={styles.title}>Soil Type: {props.plant.soil_type}</Text>
                <Text style={styles.title}>min_temp: {props.plant.min_temp}</Text>
                <Text style={styles.title}>max_temp: {props.plant.max_temp}</Text>
                <Button title='Close' onPress={props.onClose}/>
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
    commonName: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },  
    latinName: {
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    title: {
      fontSize: 16,
      textAlign: 'center'
    },
    mediumImage: {
      width: 175,
      height: 175,
      marginRight: 10,
    },
    nameplate: {
      flexDirection: 'row',
      marginBottom: 10
    }
  });

export default PlantFullView;