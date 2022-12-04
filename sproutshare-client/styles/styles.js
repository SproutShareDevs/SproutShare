import { StyleSheet } from "react-native";


export default StyleSheet.create({
    /* container styling */
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row'
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
    headerText: {
        fontSize: 100,
        fontWeight: 'bold',
        color: 'green'
    },
    weatherLocationText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    weatherTempText: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    weatherOtherText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 0
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
    myGardenTitle: {
        fontSize: 30,
        marginLeft: 22,
       
    },
    myGardenID: {
        fontSize: 55,
        marginLeft: 55,
        fontWeight: 'bold'
    },
    myGardenSubs:{
        fontSize: 20,
        marginLeft: 20
    },
    postText: {
        fontSize: 15
    },
    comUser: {
        fontSize:18,
        marginLeft: 7,
        marginTop: 20 
    },
    comTitle: {
        fontSize:20,
        fontWeight: 'bold',
        marginLeft: 20 
    },
    comBody: {
        fontSize:15,
        marginLeft: 20 
    },
    comDate: {
        fontSize:12,
        marginLeft:110
    },
    exUser: {
        fontSize:18,
        marginLeft: 7,
        marginTop: 30 
    },
    exTitle: {
        fontSize:22,
        fontWeight: 'bold',
        marginLeft:10
    },
    exBody: {
        fontSize:18,
        marginLeft:5
       
    },
    exDate: {
        fontSize:12,
        marginLeft:145
    },
    exPlant: {
        fontSize:12,
        marginLeft:250
    },
    /* image styling */
    weatherPic: {
        flex: 2,
        marginTop:0
    },

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
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
        resizeMode: 'contain',
        width: 300,
        height: 100,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 15      
    },
    communityImage: {
        resizeMode: 'contain',
        width: 300,
        height: 120,
        marginLeft: 10,
        
    },
    exchangeImage: {
        resizeMode: 'contain',
        width: 365,
        height: 50,
        marginLeft: 5,
        marginRight: 5,  
        marginTop:20    
    },
    wikiImage: {
        resizeMode: 'contain',
        width: 275,
        height: 80,
        marginLeft: 50,  
        marginTop:120
    },
    pfpImage: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 5,
        borderColor: "#A0B86F",
        borderWidth: 3,
        borderRadius: 50
    },
    veggieImage: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        marginLeft: 50,
        marginTop: 5,
        borderColor: "#A0B86F",
        borderWidth: 3,
        borderRadius: 40
    },
    plusImage: {
        resizeMode: 'contain',
        width: 35,
        height: 35              
    },
    mediumImage: {
        width: 150,
        height: 150,
        marginRight: 10,
        msrginLeft: 10,
        marginTop: 20
    },
    tabBar: {
        backgroundColor: '#5eb876'
    },
    /* miscellaneous */
    appBackground: {
        flex: 1,
        justifyContent: "center", 
        
    },
    exchangeButton: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        backgroundColor: '#5ab07d',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 0,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 30
    },
    circleButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        backgroundColor: '#5ab07d',
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 20,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 50
    },
    roundButton1: {
        width: 150,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        backgroundColor: '#5ab07d',
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
        backgroundColor: '#5ab07d',
        marginLeft: 80,
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 30
    },
    myGardenButtons: {
        width: 160,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 25,
        backgroundColor: '#A5B8A1',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 10,
        borderColor: "black",
        borderWidth: 4,
        borderRadius: 30,
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
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: "700",
        textTransform: "uppercase"

    },
    gardenButtonText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        fontWeight: "700",
        textTransform: "uppercase"

    },
    buttonContainer: {
        flexDirection: 'row',
    },
    nameplate: {
        flexDirection: 'row',
       
    },
    item: {
        backgroundColor: '#e0e8d0',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#A0B86F',
        height: 125,
        width: 355
    },
    itemCommunity: {
        backgroundColor: '#e0e8d0',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#A0B86F',
        height: 200,
        width: 355
    },
    itemExchange: {
        backgroundColor: '#e0e8d0',
        padding: 2,
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#A0B86F',
        height: 220,
        width: 360
    },
    listBottomMargin: {
        marginBottom: 20
    },
    rippleEffect: {
        color: '#638c07'
    },
    ExchangeListingMargin: {
        marginBottom: 200
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