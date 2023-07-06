import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import selectCategoryOptions from '../../../../assets/constantData/category';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator} from 'react-native';
import {ApiUrl} from '../../../constants/Api';

const AdminAddProduct = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();

  const token = useSelector(state => state.token.token.user.token);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      company: '',
      price: '',
      quantity: '',
      description: '',
      rating: '',
      colors: '',
      image: '',
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    var formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key == 'category') {
        formdata.append(key, value?.label);
      } else if (key == 'image') {
        formdata.append(key, value);
      } else {
        formdata.append(key, value);
      }
    }
    console.log(formdata, 'formdata');

    try {
      let url = `${ApiUrl}/products`;
      let param = formdata;
      let headersObj = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
          Authorization: 'jwt ' + token,
        },
      };
      const res = await axios.post(url, param, headersObj, null, 'addproduct');
      console.log(res?.data, 'api response');
      if (res?.data?.success === true) {
        setLoading(false);
        alert(res?.data?.message);
        Navigation.navigate('ListOfProducts');
      }
      reset();
    } catch (error) {
      alert(error?.message);
      setLoading(false);
      console.log(error?.message, 'error message');
      console.log(error?.response?.data?.error, 'error');
    }
  };

  //image picker
  const pickImage = async () => {
    try {
      const response = await DocumentPicker?.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log('seting images', response);
      setValue('image', response);
    } catch (error) {
      Alert.alert(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };

  const wibeasyncData = async () => {
    try {
      AsyncStorage.removeItem('token');
      console.log('remove successfully');
      Navigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => Navigation.navigate('AdminProductsList')}>
          <Text style={{color: 'black', fontSize: 20}}>
            <AntDesign name="arrowleft" color="black" size={20} />
            Add Product
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{}}>
          <View style={{margin: 10}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 6,
                paddingHorizontal: 10,
              }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Name"
                  />
                )}
                name="name"
              />
              {errors.name && <Text>This is required.</Text>}
            </View>
          </View>

          {/* category */}
          <View
            style={{
              margin: 10,
              borderColor: 'gray',
              borderRadius: 6,
              borderWidth: 1,
              padding: 10,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Dropdown
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={selectCategoryOptions}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? ' Select Category' : ' category '}
                  searchPlaceholder="Search..."
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
              name="category"
            />
            {errors.category && <Text>This is required.</Text>}
          </View>
          <View style={{margin: 10}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 6,
                paddingHorizontal: 10,
              }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Company"
                  />
                )}
                name="company"
              />
              {errors.company && <Text>This is required.</Text>}
            </View>
          </View>
          <View style={{margin: 10}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 6,
                paddingHorizontal: 10,
              }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                    placeholder="Enter Rating"
                  />
                )}
                name="rating"
              />
              {errors.rating && <Text>This is required.</Text>}
            </View>
          </View>
          <View style={{margin: 10}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 6,
                paddingHorizontal: 10,
              }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Color"
                  />
                )}
                name="colors"
              />
              {errors.colors && <Text>This is required.</Text>}
            </View>
          </View>
          <View style={{margin: 10}}>
            <View
              style={{
                borderColor: 'gray',
                borderRadius: 6,
                borderWidth: 1,
                paddingHorizontal: 10,
              }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Price"
                    keyboardType="numeric"
                  />
                )}
                name="price"
              />
              {errors.price && <Text>This is required.</Text>}
            </View>
          </View>
          <View style={{margin: 10}}>
            <View
              style={{
                borderColor: 'gray',
                borderRadius: 6,
                borderWidth: 1,
                paddingHorizontal: 10,
              }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Quantity"
                    keyboardType="numeric"
                  />
                )}
                name="quantity"
              />
              {errors.quantity && <Text>This is required.</Text>}
            </View>
          </View>
          <View style={{margin: 10}}>
            <View
              style={{
                borderColor: 'gray',
                borderRadius: 6,
                borderWidth: 1,
                paddingHorizontal: 10,
              }}>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Description"
                  />
                )}
                name="description"
              />
              {errors.description && <Text>This is required.</Text>}
            </View>
          </View>
          <View
            style={{
              margin: 10,
              borderColor: 'gray',
              borderRadius: 6,
              borderWidth: 1,
              padding: 15,
            }}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TouchableOpacity
                  onPress={() => pickImage(onChange)}
                  style={{}}>
                  <Text style={[value ? styles.nn : styles.rr]}>
                    {value?.name ?? 'Choose Image'}
                  </Text>
                </TouchableOpacity>
              )}
              name="image"
            />
            {errors.image && <Text>This is required.</Text>}
          </View>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              margin: 10,
              backgroundColor: 'black',
              padding: 10,
              borderRadius: 6,
            }}>
            {loading ? (
              <ActivityIndicator color="white" size={25} />
            ) : (
              <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminAddProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'darkgray',
    textAlign: 'left',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  // for Modal style
  modalView: {
    backgroundColor: 'black',
    height: '100%',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  nn: {
    color: 'black',
  },
  rr: {
    color: 'gray',
  },
});
