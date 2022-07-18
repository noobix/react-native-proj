import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Splash from "./screens/splash";
import GetStarted from "./screens/getstarted";
import Signin from "./screens/signin";
import Register from "./screens/register";
import AddContact from "./screens/addcontact";
import Scanner from "./screens/scanner";
import Profile from "./screens/profile";
import { sampleinfo } from "./profile";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "./config";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser, isAuthenticated } from "./actions";

const NativeStack = createNativeStackNavigator();
const Router = () => {
  const { user, authenticated } = useSelector(({ user, authenticated }) => ({
    user,
    authenticated,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        // dispatch(isAuthenticated(true));
      } else {
        dispatch(setUser(null));
        dispatch(isAuthenticated(false));
      }
    });
  }, []);
  const handleLogout = () => {
    // const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log("Cant logout: error");
      });
  };

  return (
    <NavigationContainer>
      <NativeStack.Navigator
        initialRouteName={user && authenticated ? "addcontact" : "splash"}
        screenOptions={{ headerShown: false }}
      >
        {user && authenticated ? (
          <>
            <NativeStack.Screen
              name="addcontact"
              component={AddContact}
              options={({ navigation }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: "rgb(162, 145, 138)" },
                headerTitle: "Add Contact",
                headerTitleAlign: "center",
                headerLeft: () => (
                  <TouchableOpacity onPress={handleLogout}>
                    <AntDesign name="poweroff" size={24} color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("profile", { sampleinfo })
                    }
                  >
                    <AntDesign name="user" size={24} color="black" />
                  </TouchableOpacity>
                ),
              })}
            />
            <NativeStack.Screen name="scanner" component={Scanner} />
            <NativeStack.Screen
              name="profile"
              component={Profile}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "rgb(162, 145, 138)" },
                headerTitle: "Profile",
                headerTitleAlign: "center",
              }}
            />
          </>
        ) : (
          <>
            <NativeStack.Screen name="startpage" component={GetStarted} />
            <NativeStack.Screen
              name="register"
              component={Register}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "rgb(162, 145, 138)" },
                headerTitle: "Register",
                headerTitleAlign: "center",
              }}
            />
            <NativeStack.Screen
              name="signin"
              component={Signin}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "rgb(162, 145, 138)" },
                headerTitle: "Sign In",
                headerTitleAlign: "center",
              }}
            />
            <NativeStack.Screen name="splash" component={Splash} />
          </>
        )}
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
