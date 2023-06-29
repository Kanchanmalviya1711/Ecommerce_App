import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const StartScreen = () => {
  const Navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginVertical: 15,
          }}>
          Login As..!
        </Text>
      </View>
      <View style={styles.sectionHeading}>
        <View
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
          }}>
          <Image
            source={require('../../../assets/img/admins.png')}
            style={{width: 100, height: 100}}
          />
          <Text
            style={styles.headingAdminLogin}
            onPress={() => Navigation.navigate('Login')}>
            Admin
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
          }}>
          <Image
            source={require('../../../assets/img/users.png')}
            style={{width: 100, height: 100}}
          />
          <Text
            style={styles.headingUserLogin}
            onPress={() => Navigation.navigate('Login')}>
            User
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  EntryPointstyle: {
    height: '100%',
  },

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
  text: {
    color: '#fff0f5',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    left: 10,
  },

  shoptext: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    position: 'absolute',
    top: 10,
    left: 30,
  },
  headingAdminLogin: {
    fontSize: 20,
    backgroundColor: '#FF8C00',
    width: 150,
    margin: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    color: 'white',
  },
  headingUserLogin: {
    fontSize: 20,
    backgroundColor: '#DC143C',
    width: 150,
    margin: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    color: 'white',
  },
});

export default StartScreen;
