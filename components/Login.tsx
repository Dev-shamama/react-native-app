import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  // Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '../context/context';

const Login = ({navigation}: {navigation: any}) => {
  const auth: any = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      if (auth.auth === true) {
        navigation.navigate('Profile');
      }
    }, []),
  );

  const contextLogin = () => {
    const data = {email, password};
    auth.LoginHandle(navigation, data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Your Account</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={() => contextLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Register')}>
        <Text>Not Account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  form: {
    width: '80%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  avatarContainer: {
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  input: {
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: '#E91E63',
    backgroundColor: 'rgba(233,30,99, .2)',
    borderRadius: 2,
    padding: 4,
    marginVertical: 15,
    color: '#E91E63',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#E91E63',
    borderWidth: 0.2,
    borderStyle: 'solid',
    borderColor: '#E91E63',
    padding: 8,
    borderRadius: 2,
    transition: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginBtn: {
    marginTop: 10,
  },
});

export default Login;
