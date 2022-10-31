import { StyleSheet } from "react-native";


export default StyleSheet.create({
    /* container styling */
    container: {
        flex: 1,
        flexDirection: 'column'
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
    },
    
    /* image styling */

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    logoImage: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 340,
        height: 340,
        marginTop: 15,
        marginBottom: 0
    },
    tinyImage: {
        width: 110,
        height: 110,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10
    },
    mediumImage: {
        width: 150,
        height: 150,
        marginRight: 10,
        msrginLeft: 10,
        marginTop: 10
    },

    /* miscellaneous */
    appBackground: {
        flex: 1,
        justifyContent: "center", 
        
    },
    roundButton1: {
        width: 150,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        backgroundColor: '#5ab07d',
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 0.35,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 0,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 30
    },
    roundButton2: {
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        borderRadius: 30,
        backgroundColor: '#5ab07d',
        marginLeft: 80,
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 30
    },
    titleText: {
        fontSize: 50,
        fontFamily: 'serif',
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#5ab07d",
        textShadowColor:'black',
        textShadowOffset:{width: 2, height: 2},
        textShadowRadius:1, 
        marginLeft: 5
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: "700",
        textTransform: "uppercase"

    },
    buttonContainer: {
        flexDirection: 'row',
    },
    nameplate: {
        flexDirection: 'row',
        marginBottom: 10
    },
    item: {
        backgroundColor: '#90EE90',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    listBottomMargin: {
        marginBottom: 60
    },
    rippleEffect: {
        color: '#638c07'
    },
    accountInput: {
            height: 60,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 50,
            padding: 5,
            fontSize: 20,
            fontFamily: 'serif',
            fontWeight: "700"
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        fontFamily: 'serif',
        padding: 16,
        backgroundColor: '#B2D3C2',
        borderColor: '#B2D3C2',
        width: '90%',
        padding: 8,
        color: '#120438',
        margin: 15
    }
});