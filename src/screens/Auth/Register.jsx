import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {setToken} from '../../redux/Auth/LoginSlice';
import {useDispatch} from 'react-redux';
import {ApiUrl} from '../../constants/Api';

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: '',
      confirmPassword: '',
      password: '',
    },
  });
  const onSubmit = async data => {
    console.log(data, 'register');
    Keyboard.dismiss;
    setLoader(true);
    try {
      let url = `${ApiUrl}/register`;
      let body = {
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        gender: data.gender,
        confirmPassword: data.confirmPassword,
        password: data.password,
      };
      const res = await axios.post(url, body, null, 'register');
      console.log(res?.data, 'response register');
      if (res?.data?.success === false) {
        setLoader(false);
        ToastAndroid.showWithGravity(
          res?.data?.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        setLoader(false);
        ToastAndroid.showWithGravity(
          res?.data?.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        Navigation.navigate('Login');
      }
    } catch (error) {
      setLoader(false);
      alert('Invalid Credientials');
      console.log(error, 'error');
    }
    reset(), setLoader(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#252525',
        justifyContent: 'center',
      }}>
      {pageLoading ? (
        <ActivityIndicator size={'large'} color="white" />
      ) : (
        <KeyboardAwareScrollView>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              source={require('../../../assets/img/sign.png')}
              style={{width: 150, height: 150}}
            />
          </View>

          <View style={{margin: 10}}>
            <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>
              Ecommerce App
            </Text>
          </View>

          <View style={{padding: 10}}>
            <View style={{marginVertical: 5}}>
              <Text style={styles.textStyleInput}> Enter Name</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Name"
                    mode="outlined"
                    maxLength={100}
                    placeholderTextColor="grey"
                    outlineColor="#ddd"
                    underlineColor="#333"
                  />
                )}
                name="name"
              />
              {errors.name && (
                <Text style={{color: 'red', marginTop: 5, fontSize: 16}}>
                  This is required.
                </Text>
              )}
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.textStyleInput}> Enter Email</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Email"
                    mode="outlined"
                    maxLength={100}
                    placeholderTextColor="grey"
                    outlineColor="#ddd"
                    underlineColor="#333"
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={{color: 'red', marginTop: 5, fontSize: 16}}>
                  This is required.
                </Text>
              )}
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.textStyleInput}> Enter Phone</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Phone"
                    mode="outlined"
                    maxLength={100}
                    placeholderTextColor="grey"
                    outlineColor="#ddd"
                    underlineColor="#333"
                  />
                )}
                name="phone"
              />
              {errors.phone && (
                <Text style={{color: 'red', marginTop: 5, fontSize: 16}}>
                  This is required.
                </Text>
              )}
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.textStyleInput}> Enter Gender</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Gender"
                    mode="outlined"
                    maxLength={100}
                    placeholderTextColor="grey"
                    outlineColor="#ddd"
                    underlineColor="#333"
                  />
                )}
                name="gender"
              />
              {errors.gender && (
                <Text style={{color: 'red', marginTop: 5, fontSize: 16}}>
                  This is required.
                </Text>
              )}
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.textStyleInput}> Enter Password</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="password"
                    mode="outlined"
                    maxLength={100}
                    placeholderTextColor="grey"
                    outlineColor="#ddd"
                    underlineColor="#333"
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text style={{color: 'red', marginTop: 5, fontSize: 16}}>
                  This is required.
                </Text>
              )}
            </View>

            <View>
              <Text style={styles.textStyleInput}>Enter Confirm Password</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Confirm Password"
                    mode="outlined"
                    maxLength={100}
                    placeholderTextColor="grey"
                    outlineColor="#ddd"
                    underlineColor="#333"
                  />
                )}
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <Text style={{color: 'red', margin: 5, fontSize: 16}}>
                  This is required.
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              {loader ? (
                <ActivityIndicator size={'small'} color="white" />
              ) : (
                <Text
                  style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={{padding: 10}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>
              Already Sign Up
            </Text>
            <TouchableOpacity onPress={() => Navigation.navigate('Register')}>
              <Text
                style={{
                  color: '#1CB5E0',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 600,
                  margin: 10,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
  },
  textStyle: {
    fontSize: 40,
    color: 'white',
  },
  textStyleInput: {
    color: 'white',
    margin: 5,
    fontSize: 16,
  },
  iconstyle: {
    margin: 10,
  },
  button: {
    backgroundColor: 'gray',
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  textSubStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    color: 'white',
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
});
