import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* container styling */
    container: {
        flex: 1,
    },
    containerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBarContainer: {
        margin: 15,
        paddingLeft:4,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        borderColor: '#000000',
        borderWidth: 1
    },

    /* text styling */

    title: {
        fontSize: 16,
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
    
    /* image styling */

    mediumImage: {
        width: 175,
        height: 175,
        marginRight: 10,
    },
    tinyImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    nameplate: {
        flexDirection: 'row',
        marginBottom: 10
    },

    /* miscellaneous */

    button: {
        margin: 15
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    
    listBottomMargin: {
        marginBottom: 60
    },
    item: {
        backgroundColor: '#90EE90',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
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