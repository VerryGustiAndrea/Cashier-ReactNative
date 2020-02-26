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
const URL_DELETE_PRODUCT = 'http://192.168.1.234:4000/api/product/del';

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

    detailProduct: {
      id: 0,
      name: '',
      id_category: 0,
      description: '',
      stock: 0,
      price: 0,
      images: '',
      updated_at: new Date(),
      category: '',
    },

    modalDetail: false,
    modalDelete: false,
  };

  setModalDetail(visible) {
    this.setState({modalDetail: visible});
  }

  setModalDelete(visible) {
    this.setState({modalDelete: visible});
  }

  handleDetail = async data => {
    await this.setState({
      detailProduct: data,
      detailImage: data.images.replace('localhost', '192.168.1.234'),
    });
  };

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

  //Delete Product

  deleteProduct = () => {
    axios
      .delete(`${URL_DELETE_PRODUCT}/${this.state.detailProduct.id}`)
      .then(
        response => this.setModalDetail(!this.state.modalDetail),
        this.getProduct(),
      )
      .catch(err => console.warn(err));
  };

  //End Delete Product

  componentDidMount() {
    this.getProduct();
    this.checkCart();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40, paddingBottom: 30}}>ℍ𝕠𝕞𝕖</Text>
        <StatusBar
          hidden={false}
          backgroundColor="#a06e2c"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {/* MODAL DETAIL PRODUCT */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalDetail}>
          <StatusBar
            hidden={false}
            backgroundColor="#a06e2c"
            translucent={false}
            networkActivityIndicatorVisible={true}
          />

          <View style={styles.containerCheckout}>
            <Text style={{fontSize: 38, paddingBottom: 20}}>𝕀𝕥𝕖𝕞 𝔻𝕖𝕥𝕒𝕚𝕝𝕤</Text>
            <View style={styles.box}>
              <View style={styles.formDetail}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 200,
                      height: 100,
                      borderRadius: 10,
                      // paddingBottom:20,
                    }}
                    source={{
                      uri: this.state.detailImage,
                    }}
                  />
                </View>
                <Text style={styles.nameDetail}>
                  {this.state.detailProduct.name}
                </Text>
                <Text style={styles.categoryDetail}>
                  {'{ '}
                  {this.state.detailProduct.category}
                  {' }'}
                </Text>
                <Text style={styles.descriptionDetail}>
                  {this.state.detailProduct.description}
                </Text>
                <Text style={styles.priceDetail}>
                  {' '}
                  IDR. {this.state.detailProduct.price}{' '}
                </Text>
                <Text style={styles.stockDetail}>
                  {' '}
                  Stock : {this.state.detailProduct.stock}{' '}
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  this.setModalDetail(!this.state.modalDetail);
                  this.setModalDelete(true);
                }}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => {
                  this.setModalDetail(!this.state.modalDetail);
                }}>
                <Text style={styles.buttonText}>ℂ𝕝𝕠𝕤𝕖</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* END MODAL DETAIL PRODUCT */}

        {/* MODAL DELETE PRODUCT */}

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalDelete}>
          <StatusBar
            hidden={false}
            backgroundColor="#a06e2c"
            translucent={false}
            networkActivityIndicatorVisible={true}
          />

          <View style={styles.containerDelete}>
            <Text style={{fontSize: 38, paddingBottom: 40}}>
              𝔻𝕖𝕝𝕖𝕥𝕖 ℂ𝕠𝕟𝕗𝕚𝕣𝕞𝕒𝕥𝕚𝕠𝕟
            </Text>
            <View style={styles.box}>
              <View
                style={{
                  fontSize: 24,
                  width: '100%',
                  textAlign: 'center',
                  marginBottom: 10,
                }}>
                <Text style={styles.nameDetail}>
                  Delete this
                  {this.state.detailProduct.name} product?
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  this.setModalDelete(!this.state.modalDelete);
                }}>
                <Text style={styles.editButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  this.setModalDetail(!this.state.modalDetail);
                  this.setModalDelete(!this.state.modalDelete);
                  this.deleteProduct();
                }}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* END MODAL DELETE PRODUCT */}

        {/* MODAL EDIT PRODUCT */}
        <View>
          <TouchableOpacity
            style={styles.buttonAddProduct}
            onPress={() => {
              this.setModalDetail(!this.state.modalDetail);
            }}>
            <Text style={styles.buttonText}>𝔸𝕕𝕕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          {this.state.product.map(product => {
            let img_url = product.images.replace('localhost', '192.168.1.234');
            let img_url_fix = {uri: img_url};
            return (
              <View style={styles.item} key={product.id}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalDetail(true);

                    this.handleDetail(product);
                  }}>
                  <Image
                    style={{width: '100%', height: 170, borderRadius: 10}}
                    source={img_url_fix}
                  />
                </TouchableOpacity>
                <Text style={styles.itemText}> {product.name}</Text>
              </View>
            );
          })}
        </View>

        {/* <Image  style={{width:400, height: 200 , top: 180 }} source={require('../images/logo.png')}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#f5f5dc',
  },

  containerCheckout: {
    flex: 1,
    paddingTop: 45,
    alignItems: 'center',
    backgroundColor: '#f5f5dc',
  },

  formCheckout: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  box: {
    top: 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  buttonAddProduct: {
    width: 460,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    // position: 'absolute',
    // bottom: -355,
    // right: -30,
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
    marginTop: -200,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
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

  //FORM DETAIL

  formDetail: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  nameDetail: {
    fontSize: 24,
    width: '100%',
    // backgroundColor: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoryDetail: {
    fontSize: 24,
    width: '100%',
    // backgroundColor: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },

  descriptionDetail: {
    padding: 20,
    fontSize: 24,
    width: '100%',
    // backgroundColor: 'blue',
    textAlign: 'center',
    marginBottom: 20,
  },

  priceDetail: {
    fontSize: 24,
    width: '100%',
    // backgroundColor: 'red',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },

  stockDetail: {
    fontSize: 24,
    width: '100%',
    // backgroundColor: 'red',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },

  //FORM CHECKOUT
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

  //Close BUTTON in Product Detail

  buttonClose: {
    width: 420,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    position: 'absolute',
    bottom: -355,
    right: -210,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

  //Edit BUTTON in Product Detail
  editButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

  editButton: {
    width: '40%',
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    position: 'absolute',
    bottom: -295,
    right: 10,
  },

  //DELETE BUTTON in Product Detail
  deleteButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

  deleteButton: {
    width: '40%',
    backgroundColor: '#ffb380',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    position: 'absolute',
    bottom: -295,
    left: 10,
  },

  //MODAL DELETE

  containerDelete: {
    flex: 1,
    paddingTop: 300,
    alignItems: 'center',
    backgroundColor: '#f5f5dc',
  },
});
