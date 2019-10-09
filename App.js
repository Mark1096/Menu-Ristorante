import React from 'react';
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Menu from "./components/Menu"; 
import Carrello from "./components/Carrello";
import { MaterialIcons, Entypo } from '@expo/vector-icons'; 
 
StatusBar.setHidden(true); 

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = MaterialIcons;
  let iconName;
  if (routeName === 'Menu') {
    iconName = `restaurant-menu`;

  } else {
    iconName = `shopping-cart`;
  }

  return <IconComponent name={iconName} size={35} color={tintColor} />;
};

const TabNavigator = createBottomTabNavigator( 
  {
    Menu: Menu,
    Carrello: Carrello
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);