import {View, Text, Image, Modal, Button } from 'react-native'
import styles from '../styles/styles';

function PlantFullView(props) {



    return(
        <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.containerCenter}>
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


export default PlantFullView;