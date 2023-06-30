import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {removeToken} from '../../../redux/Auth/LoginSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  const fetchProfile = useSelector(state => state?.token?.email?.user);

  const onPress = async () => {
    try {
      dispatch(removeToken());
      Navigation.navigate('Welcomepage');
      Alert.alert(`😔 kanchan is Logout. `);
    } catch (e) {
      console.log(e, 'hfshfgshytdf');
    }
  };
  const ContinueShop = () => {
    Navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={['#22c1c3', '#fdbb2d']}
        style={styles.linearGradient}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <Image
          source={require('../../../../assets/img/admins.png')}
          style={styles.userImage}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            color: 'white',
            fontWeight: 'bold',
          }}>
          Hey,{fetchProfile?.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 5,
            color: '#FFFAFA',
            fontSize: 16,
          }}>
          {fetchProfile?.email}
        </Text>
        <LinearGradient
          colors={['#642B73', '#C6426E']}
          style={{marginTop: 10, borderRadius: 5}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <TouchableOpacity
            style={styles.btntextContinue}
            onPress={ContinueShop}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              <Icon name="ios-arrow-undo-outline" size={18} /> Back To Home
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>

      <View style={{margin: 20}}>
        <View style={{marginBottom: 20}}>
          <Text style={styles.acountInfo}>Account Info</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>NAME </Text>
          <Text style={styles.infoText}>{fetchProfile?.name}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>GENDER </Text>
          <Text style={styles.infoText}>{fetchProfile?.gender}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>EMAIL </Text>
          <Text style={styles.infoText}>{fetchProfile?.email}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>USERNAME ID</Text>
          <Text style={styles.infoText}>{fetchProfile?.id}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Button
            buttonStyle={{
              backgroundColor: 'red',
              margin: 10,
            }}
            style={[styles.textStyles, styles.btn]}
            title="Logout"
            color="error"
            onPress={onPress}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
  userImage: {
    height: 170,
    width: 170,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    display: 'flex',
  },
  btntextContinue: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  acountInfo: {
    color: 'black',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoView: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    marginBottom: 20,
    color: 'black',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Nunito-Regular',
  },
});

// const userlogout =()=>{
// AsyncStorage.removeItem('Email');
// AsyncStorage.removeItem('Password');
//  alert('user logout');
//  Navigation.navigate('login');
// }
