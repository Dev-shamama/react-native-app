import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Home from './Home';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../context/context';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const AuthValidate = (navigation: any) => {
    navigation.navigate('Login');
  };
  return (
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
          title: 'Snack Todo 🐍',
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
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  const AuthValidate = (navigation: any) => {
    navigation.navigate('Login');
  };
  return (
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
          title: 'Snack Todo 🐍',
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
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  const auth: any = useAuth();
  return <View>{auth.auth === true ? <AuthStack /> : <AppStack />}</View>;
};

export default MainApp;
