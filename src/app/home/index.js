import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../profile";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const [isProfileTabFocused, setProfileTabFocus] = React.useState(false);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: 130,
          backgroundColor: 'blue',
          borderTopWidth: 0,
          elevation: 2,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        },
      }}
    >
      <Tab.Screen
        name="Home1"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 22,
                height: 22,
                resizeMode: 'cover',
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home2"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Novo Pet',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 22,
                height: 22,
                resizeMode: 'cover',
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 22,
                height: 22,
                resizeMode: 'cover',
              }}
            />
          ),
          headerShown: false,
        }}
        listeners={{
          tabPress: () => {
            setProfileTabFocus((prev) => !prev);
          },
        }}
      />
    </Tab.Navigator>
  );
}
