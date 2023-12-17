import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useAuth} from '../context/context';

const Profile = ({navigation}: {navigation: any}) => {
  const auth: any = useAuth();
  const image =
    'https://media.istockphoto.com/id/1249654571/photo/futuristic-digital-blockchain-background-abstract-connections-technology-and-digital-network.webp?b=1&s=170667a&w=0&k=20&c=y7IiOxIFOlFp-BM6KD6UCVEJou8ND9Y828NWh1YQxIM=';

  useEffect(() => {
    if (auth.auth === false) {
      navigation.navigate('Login');
    }
  }, [auth.auth, navigation]);

  const logoutHandler = () => {
    auth.setAuth(false);
  };


  const saveDataOnCloud = () => {
    auth.saveData();
  };

  const dataFetchOnCloud = () => {
    auth.dataSync();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.coverPhoto} source={{uri: image}} />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
            }}
          />
          <Text style={styles.nameText}>SHAMAMA BIN SHAKIL</Text>
        </View>
      </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
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
    width: 100,
    height: 100,
    borderRadius: 50,
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
