import { auth } from './firebaseConfig';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GetStarted from './src/views/public/GetStarted'
import Seila from './src/views/public/Seila'




const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="GetStarted" 
        component={GetStarted}
      />
      <Stack.Screen 
        name="Seila" 
        component={Seila}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


