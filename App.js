import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GetStarted from './src/views/public/GetStarted'
import Navigator from './src/views/public/Navigator'
import SignIn from './src/views/public/SignIn'
import SignUp from './src/views/public/SignUp'


const Stack = createStackNavigator();

function StackNavigation() {
  

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen 
        name="GetStarted" 
        component={GetStarted}
      />
      <Stack.Screen 
        name="SignIn" 
        component={SignIn}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp}
      /> */}
      <Stack.Screen 
        name="Navigator" 
        component={Navigator}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}