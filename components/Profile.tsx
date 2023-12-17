import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useAuth} from '../context/context';

const Profile = ({navigation}: {navigation: any}) => {
  const auth: any = useAuth();
  const image =
    'https://res.cloudinary.com/dejdypxzw/image/upload/v1702817949/reactnativeapp/sicpu18aowxwhqegc6ch.jpg';

  useEffect(() => {
    if (auth.auth === false) {
      navigation.navigate('Login');
    }
  }, [auth.auth, navigation]);

  const logoutHandler = () => {
    auth.setAuth(false);
    Alert.alert('Success', 'Logout Successfully', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const saveDataOnCloud = () => {
    auth.saveData();
  };

  const dataFetchOnCloud = () => {
    auth.dataSync();
  };

  useEffect(() => {
    auth.profile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.coverPhoto} source={{uri: image}} />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: 'https://res.cloudinary.com/dejdypxzw/image/upload/v1702817950/reactnativeapp/wuftyq5ozsk0bhk2mlod.jpg',
            }}
          />
          <Text style={styles.nameText}>SHAMAMA BIN SHAKIL</Text>
        </View>
      </View> 
      <View style={styles.functionBtn}>
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            ullamcorper nisi.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={saveDataOnCloud}>
          <Text style={styles.buttonText}>Save data on cloud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={dataFetchOnCloud}>
          <Text style={styles.buttonText}>Data Fetch on Cloud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logoutHandler}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  functionBtn: {
    width: '80%',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    marginTop: 10,
    // width: '80%',
    backgroundColor: '#E91E63',
    borderWidth: 0.2,
    borderStyle: 'solid',
    borderColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 1.5,
    borderRadius: 2,
    transition: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Profile;
