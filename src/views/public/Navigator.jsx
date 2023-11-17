import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Agenda from './Agenda'
import Home from './Home'
import Account from './Account'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'>
      <Tab.Screen 
        name="Agenda" 
        component={Agenda}
        options={{
          tabBarLabel: "Agenda",
          tabBarIcon: () => (
            <Icon name="calendar" size={30} color="#D987FF" />
          )
        }} 
      />
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Icon name="home" size={30} color="#D987FF" />
          )
        }} 
      />
      <Tab.Screen 
        name="Minha Conta" 
        component={Account}
        options={{
          tabBarLabel: "Minha conta",
          tabBarIcon: () => (
            <Icon name="user" size={30} color="#D987FF" />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  return (
    <MyTabs />
  )
}

export default Navigator