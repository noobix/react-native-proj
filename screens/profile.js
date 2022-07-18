import React from "react";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Touchable,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { scannedData: null, profileData: null, data: null };
  }
  componentDidMount() {
    let { data: scannedData, sampleinfo } = this.props.route.params;
    if (scannedData) {
      this.setState({ data: scannedData });
    } else if (sampleinfo) {
      this.setState({ data: sampleinfo });
    }
  }
  render() {
    // console.log(this.props.route.params);
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.display}>
            <View style={styles.profile}>
              <Image
                source={
                  this.state.data && {
                    uri: this.state.data.image,
                  }
                }
                style={styles.profileimage}
              />
              <View style={{ marginVertical: 20 }}>
                <Text style={[styles.profiletext, { fontWeight: "700" }]}>
                  {this.state.data && this.state.data.fullname}
                </Text>
                <Text
                  style={[styles.profiletext, { color: "rgb(164, 164, 164)" }]}
                >
                  {this.state.data && this.state.data.role}
                </Text>
              </View>
            </View>
            <View style={styles.socialmedia}>
              <TouchableWithoutFeedback>
                <AntDesign
                  style={{ marginHorizontal: 20 }}
                  name="twitter"
                  size={24}
                  color="black"
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Entypo
                  style={{ marginRight: 20 }}
                  name="linkedin"
                  size={24}
                  color="black"
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Entypo name="tumblr" size={24} color="black" />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.contactdata}>
              <View style={{ flexDirection: "row" }}>
                <Feather name="phone" size={30} color="black" />
                <Text style={{ fontSize: 20, marginHorizontal: 30 }}>
                  {this.state.data && this.state.data.phone}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={30}
                  color="black"
                />
                <Text style={{ fontSize: 20, marginHorizontal: 30 }}>
                  {this.state.data && this.state.data.email}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <SimpleLineIcons name="location-pin" size={30} color="black" />
                <Text style={{ fontSize: 20, marginHorizontal: 30 }}>
                  {this.state.data && this.state.data.address}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.display}></View>
        </View>
      </React.Fragment>
    );
  }
}
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  display: {
    flex: 0.5,
  },
  profileimage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  profiletext: {
    fontSize: 20,
  },
  profile: {
    flex: 0.4,
    flexDirection: "row",
  },
  socialmedia: {
    flex: 0.15,
    flexDirection: "row",
  },
  contactdata: {
    flex: 0.45,
    justifyContent: "space-between",
  },
});
