import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarCodeScanner } from "expo-barcode-scanner";

class Scanner extends React.Component {
  state = {
    permission: null,
    scanned: null,
  };
  componentDidMount() {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({ permission: status === "granted" });
    })();
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.props.navigation.navigate("profile", {
      data: JSON.parse(data),
    });
    console.log(data);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scanwindow}>
          <BarCodeScanner
            onBarCodeScanned={
              this.state.scanned ? undefined : this.handleBarCodeScanned
            }
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <View style={styles.share}>
          <Text style={{ fontSize: 18, alignSelf: "center" }}>
            Want to Share your contact? <Button title="Send QR" />{" "}
          </Text>
        </View>
      </View>
    );
  }
}
export default Scanner;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanwindow: {
    flex: 0.9,
    backgroundColor: "red",
  },
  share: {
    flex: 0.1,
  },
});
