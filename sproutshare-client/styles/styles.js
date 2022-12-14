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
    postContainerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: "10%"
    },
    searchBarContainer: {
        margin: 15,
        paddingLeft: 4,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        borderColor: '#000000',
        borderWidth: 1
    },

    textContainer: {
        flex: 3,
        flexDirection: 'column'
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    nameplate: {
        flexDirection: 'row',
        alignItems: 'flex-start'

    },
    wateringTextContainer: {
        flex: 2,
        flexDirection: 'column',
    },
    checkbox: {
        alignSelf: 'center'
    },
    listBottomMargin: {
        marginBottom: 100
    },
    rippleEffect: {
        color: '#638c07'
    },

    /* text styling */
    weatherLocationText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    weatherTempText: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    soilQ: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
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
        fontSize: 24,
        marginLeft: 22,
    },
    myGardenID: {
        fontSize: 30,
        marginLeft: 45,
        fontWeight: 'bold'
    },
    myGardenSubs: {
        fontSize: 20,
        marginLeft: 20
    },
    comUser: {
        fontSize: 18,
        marginLeft: 7,
        marginTop: 20
    },
    fullComUser: {
        fontSize: 18,
        marginLeft: 7
    },
    comTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    comBody: {
        fontSize: 15,
        marginLeft: 20
    },
    comDate: {
        fontSize: 12,
        marginLeft: 110
    },
    fullComDate: {
        fontSize: 12,
        marginLeft: 7
    },
    exUser: {
        fontSize: 18,
        marginLeft: 7,
        marginTop: 30
    },
    exTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10
    },
    exBody: {
        fontSize: 18,
        marginLeft: 5

    },
    exDate: {
        fontSize: 12,
        marginLeft: 145
    },
    exPlant: {
        fontSize: 12,
        marginLeft: 250
    },
    titleText: {
        fontSize: 50,
        fontFamily: 'serif',
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#5ab07d",
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        marginLeft: 10,
        marginRight: 1
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
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        fontWeight: "700",
        textTransform: "uppercase"
    },
    formButtonText: {
        color: "#F2F3F5",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        fontWeight: "700",
        textTransform: "uppercase"
    },
    veggieText: {
        flex: 1
    },
    wateringContainerText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        fontWeight: "700",
        marginTop: 5
    },
    wateringTextBold: {
        marginTop: 13,
        fontWeight: "bold"
    },
    /* image styling */
    weatherPic: {
        flex: 2,
        marginTop: 0
    },
    buttonImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
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
        marginTop: 20
    },
    wikiImage: {
        resizeMode: 'contain',
        width: 275,
        height: 80,
        marginLeft: 50,
        marginTop: 120
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
        flex: 1,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 50,
        marginLeft: 10,
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
    newProfile: {
        width: 115,
        height: 115,
        marginLeft: 10,
        marginTop: 20
    },
    mediumImage: {
        width: 150,
        height: 150,
        marginRight: 10,
        msrginLeft: 10,
        marginTop: 20
    },
    wateringImage: {

        width: 70,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        padding: 9,
        marginLeft: 10,
        marginTop: 5,
        marginRight: 10,
        borderColor: "#AFE4DE",
        borderWidth: 3,
        borderRadius: 40
    },
    tabBar: {
        backgroundColor: '#5eb876'
    },
    /* miscellaneous */
    appBackground: {
        flex: 1,
        justifyContent: "center",

    },
    /* buttons */
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
    newGarden: {
        width: 300,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        elevation: 50,
        marginLeft: 45,
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 30
    },
    quizButton: {
        width: 290,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        elevation: 50,
        marginLeft: 45,
        marginBottom: 10,
        marginTop: 5,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 30
    },
    myGardenButtons: {
        width: "40%",
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
    soilButton: {
        width: 70,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
        padding: 1,
        backgroundColor: '#A5B8A1',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 5,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10
    },
    textureButton: {
        width: 175,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
        padding: 1,
        backgroundColor: '#A5B8A1',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 5,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10
    },
    myGardenButtonsFullWidth: {
        width: "90%",
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
    /*misc */
    item: {
        flexDirection: 'row',
        backgroundColor: '#e0e8d0',
        padding: 2,
        alignItems: 'flex-start',
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
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#A0B86F',
        width: 355
    },
    fullItemCommunity: {
        backgroundColor: '#e0e8d0',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#A0B86F',
        width: 355,
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
    },
    waterContainer: {
        width: "95%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        elevation: 25,
        backgroundColor: '#AFE4DE',
        marginBottom: 205,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 10,
        borderColor: "black",
        borderWidth: 4,
        borderRadius: 30
    },
    wateringItem: {
        flexDirection: 'row',
        backgroundColor: '#079BF5',
        paddingTop: 4,
        alignItems: 'flex-start',
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#079BF5',
        height: 100,
        width: 320
    },
    formButton: {
        alignItems: "center",
        backgroundColor: "#19543E",
        margin: 2,
        padding: 10,
        justifyContent: 'center',
        elevation: 25,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 30,
        width: "70%"
    },
    formButtonDelete: {
        alignItems: "center",
        backgroundColor: "#943B60",
        margin: 2,
        padding: 10,
        justifyContent: 'center',
        elevation: 25,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 30,
        width: "70%"
    },

});