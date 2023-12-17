import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// import {launchImageLibrary} from 'react-native-image-picker';

const Register = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://react-native-back-delta.vercel.app/api/v1/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, gender, password}),
        },
      );
      const responseData = await response.json();
      if (responseData.success === true) {
        Alert.alert('Success', 'Account Create Successfully', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Account</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Login')}>
        <Text>Already have and Account? Login</Text>
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

export default Register;
