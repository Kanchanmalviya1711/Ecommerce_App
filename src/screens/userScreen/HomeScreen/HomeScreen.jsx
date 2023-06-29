import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Button, Card} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  const img = [
    require('../../../../assets/img/cart.jpg'),
    require('../../../../assets/img/BestImages.png'),
    require('../../../../assets/img/black.webp'),
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.baseStyle}>
        <View>
          <Text style={{fontSize: 20, color: '#5F9EA0'}}>
            😍 Good To See You
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Kanchan Malviya
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => Navigation.toggleDrawer()}>
            <Icon
              name="bars"
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: 'black',
                padding: 10,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Image
          source={require('../../../../assets/img/BestImages.png')}
          style={{height: 300}}
        />
      </View>

      <View style={{marginTop: 15}}>
        <Card style={styles.allProductStyles} title="All Products">
          <Text style={{marginBottom: 10, textAlign: 'center', fontSize: 20}}>
            See All Product
          </Text>
          <Button
            icon={
              <Icon
                name="caretright"
                color="#ffffff"
                style={{position: 'relative', right: 10, top: 1}}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: '#20b2aa',
            }}
            title="VIEW NOW"
            onPress={() => Navigation.navigate('ProductsList')}
          />
        </Card>
      </View>

      <View style={styles.featureProductStyles}>
        <Card style={styles.allProductStyles} title="All Products">
          <Text style={{marginBottom: 10, textAlign: 'center', fontSize: 20}}>
            Feature Products
          </Text>
          <View>
            <Button
              icon={
                <Icon
                  name="caretright"
                  color="white"
                  style={{position: 'relative', right: 10, top: 1}}
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: '#ffa07a',
              }}
              title="VIEW NOW"
              onPress={() => Navigation.navigate('ProductsList')}
            />
          </View>
        </Card>
        {/* <Text onPress={() => pickImage()}>choose Image</Text> */}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  navbarStyles: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    margin: 10,
  },
  baseStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: 10,
  },
  textStyles: {
    color: '#48d1cc',
    fontSize: 20,
  },

  innerText: {
    color: '#fd746c',
    fontSize: 25,
    fontWeight: 'bold',
  },
  innerTextgiven: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
  allProductStyles: {},
  featureProductStyles: {},
});

// const logoutUser = () => {
//   AsyncStorage.removeItem('Email');
//   AsyncStorage.removeItem('Password');
//   alert('user logout');
//   navigation.navigate('login');
// };
