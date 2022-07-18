import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { contactinfo } from "../profile";
import { connect } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config";
import { setUser } from "../actions";

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, imageuri: "" };
  }
  async getUserData() {
    console.log(this.props.profile);
    console.log(this.props.profile.uid, this.props.profile.email);
    try {
      const docRef = await doc(firestore, "users", this.props.profile.uid);
      const docSnap = await getDoc(docRef);
      const url = await getDownloadURL(
        ref(storage, `images/${this.props.profile.uid}`)
      );
      console.log("1", docSnap && docSnap);
      const userData = {
        ...docSnap.data(),
        image: url,
        email: this.props.profile.email,
      };
      // if (docSnap.exists()) {
      //   this.setState({ user: userData });
      //   this.props.setUser(userData);
      // }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getUserData();
  }
  render() {
    return (
      <View style={styles.container}>
        {!this.state.user ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Loading....</Text>
            <ActivityIndicator />
          </View>
        ) : (
          <React.Fragment>
            <View style={styles.toppart}>
              <Text style={styles.toptext}>Exchange Contact Information</Text>
              <Text style={[styles.toptext, { color: "rgb(164, 164, 164)" }]}>
                Scan this QR below to share your contacts
              </Text>
            </View>
            <View style={styles.qrimage}>
              <QRCode value={JSON.stringify(this.state.user)} size={250} />
            </View>
            <View style={styles.profile}>
              <View style={styles.profileimage}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  source={{ uri: this.state.user.image }}
                />
              </View>
              <View style={styles.profiledetails}>
                <Text style={styles.profiletext}>
                  {this.state.user.fullname}
                </Text>
                <Text
                  style={[styles.profiletext, { color: "rgb(164, 164, 164)" }]}
                >
                  {this.state.user.role}
                </Text>
              </View>
            </View>
            <View style={styles.bottom}>
              <Text style={{ fontSize: 17 }}>
                Want to add a new connection?{" "}
                <Button
                  onPress={() => this.props.navigation.navigate("scanner")}
                  title="Scan QR"
                />{" "}
              </Text>
            </View>
          </React.Fragment>
        )}
      </View>
    );
  }
}
const mapDispatchToProps = {
  setUser: setUser,
};

const mapStateToProps = (state) => {
  return { profile: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  toppart: {
    flex: 0.2,
  },
  toptext: {
    fontSize: 20,
  },
  qrimage: {
    flex: 0.5,
  },
  profile: {
    flex: 0.2,
    flexDirection: "row",
  },
  profiletext: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  bottom: {
    flex: 0.1,
  },
  profiledetails: {
    marginVertical: 10,
  },
});
