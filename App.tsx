import * as React from 'react';
import {AuthProvider} from './context/context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createNativeStackNavigator();

function App() {
  const AuthValidate = (navigation: any) => {
    navigation.navigate('Login');
  };
  return (
    <AuthProvider>
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
            options={({navigation}: {navigation: any}) => ({
              title: 'Home',
              headerRight: () => (
                <>
                  <TouchableOpacity onPress={() => AuthValidate(navigation)}>
                    <Icon
                      name="user-circle-o"
                      size={25}
                      color="#fff"
                      style={{margin: 5}}
                    />
                  </TouchableOpacity>
                </>
              ),
            })}
          /> 
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Login" component={Login} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
