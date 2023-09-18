import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAnG5bzp7EwoO8YPLJZsllECC9Y1-LMKQM",
  authDomain: "vivabeleza-e025c.firebaseapp.com",
  projectId: "vivabeleza-e025c",
  storageBucket: "vivabeleza-e025c.appspot.com",
  messagingSenderId: "170789247063",
  appId: "1:170789247063:web:d17b9068af189e62c1ab12",
  measurementId: "G-37LK1XGT6Y"
};

const app = initializeApp(firebaseConfig);


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './src/views/public/SignIn'
import SignUp from './src/views/public/SignUp'
import Agenda from './src/views/public/Agenda'
import Home from './src/views/public/Home'


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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


