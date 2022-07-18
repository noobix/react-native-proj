import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signInUser } from "../actions";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
  }
  handleSignIn = () => {
    signInUser(this.state.email, this.state.password);
  };
  render() {
    return (
      <React.Fragment>
        <KeyboardAwareScrollView styles={styles.container}>
          <View style={styles.mainarea}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.image}
                source={require("../assets/images/pexels-max-vakhtbovych-6312072.jpg")}
              />
            </View>
            <View style={styles.form}>
              <TextInput
                style={styles.textinput}
                placeholder="Email"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
              />
              <TextInput
                style={styles.textinput}
                secureTextEntry
                placeholder="Password"
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <TouchableOpacity
                style={styles.signinbutton}
                onPress={this.handleSignIn}
              >
                <Text style={styles.signinbuttontext}>SIGN IN</Text>
              </TouchableOpacity>
              <View style={styles.passwordoption}>
                <Text style={styles.forgottext}>Forgot?</Text>
                <TouchableOpacity style={styles.forgotpasswordbutton}>
                  <Text style={styles.resetbuttontext}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </React.Fragment>
    );
  }
}
export default Signin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainarea: {
    flex: 1,
  },
  imagecontainer: {
    flex: 0.3,
    backgroundColor: "rgb(162, 145, 138)",
  },
  form: {
    flex: 0.7,
    paddingHorizontal: 16,
    justifyContent: "space-around",
  },
  image: {
    width: 360,
    height: 200,
  },
  textinput: {
    width: 325,
    height: 50,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  passwordoption: {
    flexDirection: "row",
    marginVertical: 20,
  },
  signinbutton: {
    backgroundColor: "rgb(162, 145, 138)",
    width: 325,
    height: 60,
    elevation: 5,
    borderRadius: 5,
  },
  signinbuttontext: {
    fontSize: 40,
    alignSelf: "center",
  },
  forgottext: {
    fontSize: 20,
  },
  resetbuttontext: {
    fontSize: 20,
  },
  forgotpasswordbutton: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
  },
});
