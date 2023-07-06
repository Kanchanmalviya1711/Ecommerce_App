import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {testapi} from '../../../redux/features/allProductsSlice';
import uuid from 'react-native-uuid';
import FormatePrice from '../../../helpers/FormatePrice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ApiUrl} from '../../../constants/Api';
import axios from 'axios';

const AdminProductsList = () => {
  const [search, setSearch] = useState('');
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchProducts = useSelector(
    state => state.allProducts.products.products,
  );
  const productCount = useSelector(
    state => state.allProducts.products.productsCount,
  );
  console.log(productCount, 'fetch product count');

  useEffect(() => {
    let url = 'products';
    dispatch(testapi(url));
    const unsubscribe = Navigation.addListener('focus', () => {
      dispatch(testapi(url));
    });
    return () => {
      unsubscribe;
    };
  }, [Navigation]);

  const fetchItem = fetchProducts?.filter(e =>
    e?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteProductItem = async id => {
    console.log(id, 'kanchan');
    try {
      let url = `${ApiUrl}/products/${id}`;
      const response = await axios.delete(url, null, 'delete product');
      console.log(response, 'delete product');
    } catch (error) {
      console.log('delete', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity
        style={styles.searbar}
        onPress={() => Navigation.navigate('AdminAddProduct')}>
        <Text
          style={{
            padding: 10,
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
            textAlign: 'center',
          }}>
          Add Product
        </Text>
      </TouchableOpacity>
      <FlatList
        data={fetchItem}
        refreshing={false}
        keyExtractor={() => uuid.v4()}
        renderItem={({item}) => {
          return (
            <View style={styles.productImageContent}>
              <Image
                source={{uri: item?.image}}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'stretch',
                  margin: 10,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  marginTop: 5,
                }}>
                {item?.name}
              </Text>
              <Text style={{textAlign: 'center'}}>{item?.company}</Text>
              <Text
                style={{
                  color: '#5f9ea0',
                  margin: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {<FormatePrice price={item?.price} />}
              </Text>
              <View>
                <TouchableOpacity onPress={() => deleteProductItem(item?._id)}>
                  <Text style={{margin: 10}}>
                    <AntDesign name="delete" size={20} color="red" />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('mmn')}>
                  <Text style={{margin: 10}}>
                    <AntDesign name="edit" size={20} color="blue" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AdminProductsList;

const styles = StyleSheet.create({
  aa: {
    backgroundColor: 'white',
  },
  iconStyle: {
    fontSize: 18,
    color: '#dfb726d1',
  },
  productImageContent: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 6,
    paddingBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searbar: {
    margin: 10,
    backgroundColor: '#48b1bf',
    borderRadius: 5,
    elevation: 6,
    paddingBottom: 5,
  },
});
