import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class GetStarted extends React.Component {
    render() {
        return(<SafeAreaView style={styles.container}>
            <View style={styles.mainarea}>
                <View style={styles.imagecontainer}>
                    <Image style={styles.image} source={require('../assets/images/pexels-jean-van-der-meulen-1457842.jpg')} />
                </View>
                <View style={styles.options}>
                    <View style={styles.upperpart}>
                        <Text style={styles.introtext}>JOIN THE FAMILY OF FAR SEARCH AND LOCATE THE CONTACTS OF PEOPLE REGISTERED </Text>
                        <Text style={styles.begintext}>Sign in or register with Far Search email</Text>
                    </View>
                    <View style={styles.lowerpart}>
                        <TouchableOpacity style={styles.optionsbutton} onPress={() => this.props.navigation.navigate('register')}>
                            <Text style={styles.optionstext}>REGISTER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionsbutton} onPress={() => this.props.navigation.navigate('signin')}>
                            <Text style={styles.optionstext}>SIGN IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>)
    }
}
export default GetStarted
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(165, 172, 182)'
    },
    mainarea: {
        flex: 1
    },
    imagecontainer: {
        flex: 0.6,
    },
    options: {
        flex: 0.4,
        backgroundColor: 'rgb(255, 255, 255)',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
    },
    image: {
        width: 360,
        height:400,
        alignSelf: 'center'
    },
    lowerpart: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    introtext: {
        fontSize: 20
    },
    begintext: {
        fontSize: 17,
        color: 'rgb(161, 161, 161)'
    },
    optionstext: {
        fontSize: 15
    },
    optionsbutton: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(24, 35, 3)'
    }
});