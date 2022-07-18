import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { registerUser, isAuthenticated } from "../actions";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      fullname: "",
      email: "",
      phonenumber: "",
      role: "",
      twitterhandle: "",
      linkedInhandle: "",
      image: null,
      password: "",
    };
  }
  handleSumit() {
    const regdata = {
      fullname: this.state.fullname,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      role: this.state.role,
      twitterhandle: this.state.twitterhandle,
      linkedInhandle: this.state.linkedInhandle,
      address: "D112/58 Palace square",
    };
    registerUser(
      this.state.email,
      this.state.password,
      regdata,
      this.state.image
    );
    this.props.isAuthenticated(true);
  }
  render() {
    const pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
        // console.log(result)
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <React.Fragment>
        <KeyboardAwareScrollView styles={styles.container}>
          <View style={styles.mainarea}>
            <TouchableWithoutFeedback
              style={styles.imagecontainer}
              onPress={() => {
                pickImage();
              }}
            >
              {this.state.image ? (
                <Image
                  style={styles.selectimage}
                  resizeMode="cover"
                  source={{ uri: this.state.image }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../assets/images/profile_user_190494.png")}
                />
              )}
            </TouchableWithoutFeedback>
            <View style={styles.form}>
              <View style={styles.inputaddons}>
                <Text style={styles.descriptive}>Full Name</Text>
                <TextInput
                  style={[styles.input, { width: 251 }]}
                  placeholder="Full Name"
                  value={this.state.fullname}
                  onChangeText={(text) => this.setState({ fullname: text })}
                />
              </View>
              <View style={styles.inputaddons}>
                <Text style={styles.descriptive}>Email</Text>
                <TextInput
                  style={[styles.input, { width: 285 }]}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>
              <View style={styles.inputaddons}>
                <Text style={styles.descriptive}>Password</Text>
                <TextInput
                  style={[styles.input, { width: 251 }]}
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputaddons}>
                <Text style={styles.descriptive}>Phone Number</Text>
                <TextInput
                  style={[styles.input, { width: 214 }]}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  value={this.state.phonenumber}
                  onChangeText={(text) => this.setState({ phonenumber: text })}
                />
              </View>
              <View style={styles.inputaddons}>
                <Text style={styles.descriptive}>Role</Text>
                <TextInput
                  style={[styles.input, { width: 294 }]}
                  placeholder="Role"
                  value={this.state.role}
                  onChangeText={(text) => this.setState({ role: text })}
                />
              </View>
              <View style={styles.inputaddons}>
                <Text style={styles.descriptive}>Twitter</Text>
                <TextInput
                  style={[styles.input, { width: 275 }]}
                  placeholder="Twitter"
                  value={this.state.twitterhandle}
                  onChangeText={(text) =>
                    this.setState({ twitterhandle: text })
                  }
                />
              </View>
              <View style={styles.inputaddons}>
                <Text style={styles.descriptive}>Linkedin</Text>
                <TextInput
                  style={[styles.input, { width: 264 }]}
                  placeholder="Linkedin"
                  value={this.state.linkedInhandle}
                  onChangeText={(text) =>
                    this.setState({ linkedInhandle: text })
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSumit()}
              >
                <Text style={styles.buttontext}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = {
  isAuthenticated: isAuthenticated,
};
export default connect(null, mapDispatchToProps)(Register);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainarea: {
    flex: 1,
  },
  imagecontainer: {
    flex: 0.3,
  },
  form: {
    flex: 0.7,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  selectimage: {
    width: "100%",
    height: 180,
  },
  input: {
    height: 50,
    fontSize: 20,
    textAlign: "right",
    paddingHorizontal: 10,
  },
  inputaddons: {
    flexDirection: "row",
  },
  descriptive: {
    alignSelf: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "rgb(162, 145, 138)",
    width: 325,
    height: 60,
    elevation: 5,
    borderRadius: 5,
  },
  buttontext: {
    fontSize: 40,
    alignSelf: "center",
  },
});
const ProfileImageSelect = () => {
  const [hasGalleryPermission, setGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
      pickImage();
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  if (hasGalleryPermission === "false") {
    <Text>Permission failed</Text>;
  }
  return <Register Image={image} />;
};
