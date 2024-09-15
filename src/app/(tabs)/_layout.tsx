// app/(tabs)/_layout.js
import React from "react";
import { Tabs } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
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
        name="index"
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
        name="novopet/index"
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
        name="profile/index"
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
      />
    </Tab.Navigator>
  );
}
