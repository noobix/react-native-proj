import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

class Splash extends React.Component {
    render() {
        return(<React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.mainarea}>
                    <View style={styles.toppart}>
                        <FontAwesome5 style={styles.icon} name="binoculars" size={55} color="white" />
                        <Text style={styles.toptext}>Far Search</Text>
                    </View>
                    <View style={styles.middlepart}>
                        <Text style={styles.intro}>Far Search</Text>
                        <Text style={styles.intro}>Contacts</Text>
                    </View>
                    <View style={styles.bottompart}>
                        <TouchableOpacity style={styles.pouch} onPress={() => this.props.navigation.navigate('startpage')}>
                            <Text style={styles.bottomtext}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </React.Fragment>)
    }
}
export default Splash
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(70, 83, 99)'
    },
    mainarea: {
        flex: 1,
        justifyContent: 'space-around'
    },
    toppart: {
        flexDirection: 'row'
    },
    toptext: {
        color: 'rgb(194, 202, 213)',
        fontSize: 50,
    },
    icon: {
        marginVertical: 20
    },
    intro: {
        color: 'rgb(194, 202, 213)',
        fontSize: 50,
        textAlign: 'center'
    },
    bottomtext: {
        fontSize: 20,
        textAlign: 'center',
        color: 'rgb(255, 225, 255)'
    },
    pouch: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(255, 225, 255)',
        width: 100,
        alignSelf: 'center'
    }
  });