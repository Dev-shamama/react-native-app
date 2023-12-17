import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContextProvider from './ContextProvider';
const Stack = createNativeStackNavigator();

function App() {
  const AuthValidate = (navigation: any) => {
    navigation.navigate('Login');
  };

  const MainHome = (navigation: any) => {
    navigation.navigate('Snack Todo 🐍');
  };

  const configuration = ({navigation}: {navigation: any}) => ({
    title: 'Snack Todo 🐍',
    headerRight: () => (
      <>
        <TouchableOpacity onPress={() => AuthValidate(navigation)}>
          <Icon
            name="user-circle-o"
            size={25}
            color="#fff"
            style={{margin: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => MainHome(navigation)}>
          <Icon name="home" size={25} color="#fff" style={{margin: 10}} />
        </TouchableOpacity>
      </>
    ),
  });

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#E91E63',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Snack Todo 🐍"
            component={Home}
            options={configuration}
          />
          <Stack.Screen
            name="Register"
            options={configuration}
            component={Register}
          />
          <Stack.Screen
            name="Profile"
            options={configuration}
            component={Profile}
          />
          <Stack.Screen
            name="Login"
            options={configuration}
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
