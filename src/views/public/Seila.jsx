import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Agenda from './Agenda'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import GetStarted from './GetStarted'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
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
        name="Login" 
        component={SignIn}
        options={{
          tabBarLabel: "Minha conta",
          tabBarIcon: () => (
            <Icon name="user" size={30} color="#D987FF" />
          )
        }} 
      />
      {/* <Tab.Screen name="SignUp" component={SignUp} /> */}
      <Tab.Screen name="SignUp" component={SignUp} />
      {/* <Tab.Screen 
        name="GetStarted" 
        component={GetStarted}
      /> */}
    </Tab.Navigator>
  );
}

const Seila = () => {
  return (
    // <NavigationContainer>
      <MyTabs />
    // </NavigationContainer>
  )
}

export default Seila