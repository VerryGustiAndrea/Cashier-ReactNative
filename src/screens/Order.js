import React, {Component} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';

const URL_PRODUCT_LIST = 'http://192.168.1.234:4000/api/product/getall';
const URL_VIEW_CART = 'http://192.168.1.234:4000/api/cart/cartuser/1';

export default class Login extends Component {
  state = {
    product: [],

    cart: {
      invoice: 0,
      cashier: '',
      total_item: 0,
      total_price: 0,
      ppn: 0,
      total_price_order: 0,
      product: [
        {
          invoice: 0,
          cashier: '',
          id_product: 0,
          product: '',
          price: 0,
          category: '',
          qty: 0,
          total_price: '',
        },
      ],
    },
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getProduct = async () => {
    await axios.get(URL_PRODUCT_LIST).then(res => {
      const product = res.data;
      //   console.warn(product);
      this.setState({product});
    });
  };

  checkCart = async () => {
    await axios.get(URL_VIEW_CART).then(res => {
      const cart = res.data;
      this.setState({cart});
    });
  };

  componentDidMount() {
    this.getProduct();
    this.checkCart();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40, paddingBottom: 30}}>𝕄𝕖𝕟𝕦</Text>
        <StatusBar
          hidden={false}
          backgroundColor="#a06e2c"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <StatusBar
            hidden={false}
            backgroundColor="#a06e2c"
            translucent={false}
            networkActivityIndicatorVisible={true}
          />

          <View style={styles.containerCheckout}>
            <Text style={{fontSize: 34, paddingBottom: 40}}>ℂ𝕙𝕖𝕔𝕜𝕠𝕦𝕥</Text>
            <View style={styles.box}>
              {this.state.cart.product.map(cart => {
                return (
                  <View style={styles.formCheckout} key={cart.z}>
                    <Text style={styles.productCheckout}> {cart.product}</Text>
                    <Text style={styles.qtyCheckout}>x {cart.qty}</Text>
                    <Text style={styles.priceCheckout}>
                      {' '}
                      IDR. {cart.total_price}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.buttonContinueShoping}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.buttonText}>Continue Shoping</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonCheckout}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.box}>
          {this.state.product.map(product => {
            let img_url = product.images.replace('localhost', '192.168.1.234');
            let img_url_fix = {uri: img_url};
            return (
              <View style={styles.item} key={product.id}>
                <TouchableOpacity>
                  <Image
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                    source={img_url_fix}
                  />
                </TouchableOpacity>

                <Text style={styles.itemText}> {product.name}</Text>
                <Text style={styles.itemText}> IDR. {product.price}</Text>
              </View>
            );
          })}
        </View>

        {/* <Image  style={{width:400, height: 200 , top: 180 }} source={require('../images/logo.png')}/> */}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={styles.buttonText}>
              Order ({this.state.cart.total_item})
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white', position: 'absolute', bottom: 40}}>
          {' '}
          Credit Viwi App 2020{' '}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:-20,
    paddingTop: 30,
    // justifyContent:'center',

    alignItems: 'center',
    backgroundColor: '#f5f5dc',
  },

  containerCheckout: {
    flex: 1,
    // marginTop:-20,
    paddingTop: 150,

    // justifyContent:'center',

    alignItems: 'center',
    backgroundColor: '#f5f5dc',
  },

  formCheckout: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  box: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  item: {
    width: '45%',
    height: 170,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    margin: 10,
    marginBottom: 50,
  },

  itemText: {
    fontSize: 17,
    textAlign: 'center',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },

  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    position: 'absolute',
    bottom: 60,
  },

  productCheckout: {
    left: 10,
    fontSize: 24,
    width: '40%',
    // backgroundColor: 'red',
    textAlign: 'left',
    marginBottom: 20,
  },
  qtyCheckout: {
    right: 10,
    fontSize: 24,
    width: '30%',
    // backgroundColor: 'blue',
    textAlign: 'right',
    marginBottom: 20,
  },

  priceCheckout: {
    right: 10,
    fontSize: 24,
    width: '30%',
    // backgroundColor: 'red',
    textAlign: 'right',
    marginBottom: 20,
  },

  buttonContinueShoping: {
    width: 420,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    position: 'absolute',
    bottom: 80,
  },

  buttonCheckout: {
    width: 420,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    position: 'absolute',
    bottom: 15,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
