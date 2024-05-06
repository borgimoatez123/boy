import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import { LoginContext } from "../context/LoginContext";
import LoginPage from "../screens/LoginPage";
import Home from "../screens/Home";
import Notificaxions from "../screens/Notifications";
import {COLORS} from '../../app/constants/theme'
import { DeliveryContext } from "../context/DeliveryContext";
import PickedDelivery from "../screens/PickedDelivery";
import Delivered from "../screens/Delivered";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: COLORS.primary,
  borderTopWidth: 0,
  elevation: 0, // This will remove the shadow on Android
  shadowOpacity: 0, // This will remove the shadow on iOS
};

const BottomTab = () => {

  const {login, setLogin} = useContext(LoginContext)
  const {delivery, setDelivery} = useContext(DeliveryContext)

  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.secondary}
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />

    

      <Tab.Screen
        name="Profile"
        component={login ? Profile :  LoginPage }
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
