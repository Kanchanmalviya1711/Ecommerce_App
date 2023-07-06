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
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator} from 'react-native';
import selectCategoryOptions from '../../../../Assets/constantData/category';

const UpdateProduct = ({route}) => {
  const id = route?.params?.id;
  console.log(id, 'idddd');
  const [isFocus, setIsFocus] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();

  const token = useSelector(state => state?.authtoken?.token?.token);

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

  useEffect(() => {
    if (id) {
      var newCategory = selectCategoryOptions.find(
        e => e.label == id?.category,
      );
      setValue('name', id?.name);
      setValue('category', newCategory);
      setValue('company', id?.company);
      setValue('price', '' + id?.price);
      setValue('quantity', '' + id?.quantity);
      setValue('description', id?.description);
      setValue('colors', '' + id?.colors);
      setValue('rating', '' + id?.rating);
      setValue('image', '' + id?.image);
    }
  }, [id, setValue]);

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
      let url = 'http://10.0.2.2:5000/products/' + id?._id;
      console.log(url, 'api response');
      let param = formdata;
      let headersObj = {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
          Authorization: 'jwt ' + token,
        },
      };
      const res = await axios.put(
        url,
        param,
        headersObj,
        null,
        'updateproduct',
      );
      console.log(res, url, 'api response');
      if (res?.data?.success === true) {
        setLoading(false);
        alert(res?.data?.message);
        Navigation.navigate('ListOfProducts');
      }
      reset();
    } catch (error) {
      alert(error?.message);
      setLoading(false);
      console.log(error, 'error message');
      console.log(error?.response?.data?.error, 'error');
    }
  };

  // Image picker
  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log('setting image', response);
      setImage(response.name);
      setValue('image', response);
    } catch (error) {
      Alert.alert(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingVertical: 10}}>
        <TouchableOpacity onPress={() => Navigation.navigate('ListOfProducts')}>
          <Text style={{color: 'black', fontSize: 20}}>
            {' '}
            <AntDesign name="arrowleft" color="black" size={20} />
            Update Product
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
                    {image ?? value?.name ?? 'Choose Image'}
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
                Update
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProduct;

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
