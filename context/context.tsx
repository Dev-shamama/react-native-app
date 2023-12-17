import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
// Create a context with a default value (in this case, an empty object)
const AuthContext = createContext({});

// Create a provider component
const AuthProvider = ({children}: {children: any}) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState<any>([]);


  // GET DATA
  const getData = async () => {
    try {
      const jsonValue: any = await AsyncStorage.getItem('data');
      if (jsonValue !== null) {
        setTasks(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('Custom Error:', e);
    }
  };

  const LoginHandle = async (navigation: any, data: any) => {
    try {
      const response = await fetch(
        'https://react-native-back-delta.vercel.app/api/v1/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success === true) {
        Alert.alert('Success', 'Login Successfully', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        await AsyncStorage.setItem('token', JSON.stringify(responseData.token));

        const jsonValue: any = await AsyncStorage.getItem('data');
        setToken(responseData.token);
        setAuth(true);

        if (jsonValue !== null) {
          navigation.navigate('Snack Todo 🐍');
        }
      } else {
        Alert.alert('Error', responseData.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e: any) {
      console.log('Custom Error:', e.message);
      Alert.alert('Error', e.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  // DATA SYNC
  const dataSync = async () => {
    console.log(auth);
    await AsyncStorage.removeItem('data');
    try {
      const response = await fetch(
        'https://react-native-back-delta.vercel.app/api/v1/get',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      const data = await response.json();
      await AsyncStorage.setItem('data', JSON.stringify(data.data[0].data));
      await getData();
      console.log('sync data: ', data.data[0].data);
    } catch (e: any) {
      console.log('Custom Error:', e.message);
    }
  };

  // SAVE DATA
  const saveData = async () => {
    const jsonValue: any = await AsyncStorage.getItem('data');
    if (jsonValue !== null) {
      try {
        const response = await fetch(
          'https://react-native-back-delta.vercel.app/api/v1/save',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({data: JSON.parse(jsonValue)}),
          },
        );
        const data = await response.json();
        console.log('save data: ', data);
      } catch (e: any) {
        console.log('Custom Error:', e.message);
      }
    }
  };



  // Provide the state and update function to the components
  return (
    <AuthContext.Provider value={{auth, setAuth, LoginHandle, token, dataSync, saveData, getData, tasks, setTasks}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext must be used within a AuthProvider');
  }
  return context;
};

export {AuthProvider, AuthContext};
