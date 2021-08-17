import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icons from 'react-native-vector-icons/Feather';
import IconsFeather from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import axios from 'axios';
import LOGIN_URL from '../api/url';
import {apiService} from '../libs/apiCall';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      eye: false,
      token: '',
      feedbacks: [],
      status: 0,
      response: null,
      name: '',
    };
  }

  handleEyeClick = () => {
    this.setState({
      eye: !this.state.eye,
    });
  };

  loginUser = (email, token, name, feedbacks) => {
    this.props.dispatch({
      type: 'LOGIN',
      payload: {
        email: email,
        token: token,
        username: name,
        feedbacks: feedbacks,
      },
    });
  };

  onResponse = (res) => {
    console.log('inside sign In screen .....');
    console.log(res);

    if (res.status === 200) {
      this.loginUser(res.email, res.token, res.name, res.feedbacks);
      this.props.navigation.navigate('RootDrawerNav', {
        screen: 'FeedbackScreen',
        params: {
          token: res?.token || '',
          feedbacks: res?.feedbacks || '',
          name: res?.name || '',
          email: res?.email || '',
        },
      });
    } else alert('Incorrect Login Credentials');
  };

  handleClick = async () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
      // email: 'rohit.kp.pandey@gmail.com',
      // password: 'VVSyoI1nDW',
    };

    apiService.signIn(data, this.onResponse, 'post');

    // axios
    //   .post('https://705de0168521.ngrok.io/DeveloperSignin', data, {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then((response) => {
    //     console.log('response.UserLogin ......', response.data.UserLogin);
    //     this.setState({
    //       feedbacks: response.data.UserLogin.Feadbacks,
    //       status: response.status,
    //       token: response.data.UserLogin.token,
    //       name: response.data.UserLogin.name,
    //       email: response.data.UserLogin.email,
    //       photo: response.data.UserLogin.Profile,
    //     });

    //     this.checkStatus();
    //   })
    //   .catch((error) => {
    //     console.log('catch error block', error);
    //     this.setState({response: error});
    //   });
  };

  checkStatus = () => {
    console.log('this is the state in sign in .....');
    console.log(this.state);
    if (this.state.status === 200) {
      this.loginUser(
        this.state.email,
        this.state.token,
        this.state.name,
        this.state.feedbacks,
      );
      this.props.navigation.navigate('RootDrawerNav', {
        screen: 'FeedbackScreen',
        params: {
          token: this.state?.token || '',
          feedbacks: this.state?.feedbacks || '',
          name: this.state?.name || '',
          email: this.state?.email || '',
        },
      });
    } else alert('Incorrect Login Credentials');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}
          useNativeDriver={true}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <IconsFeather name="user-o" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              maxLength={30}
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({email: text});
              }}
            />
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
          <View style={styles.action}>
            <Icons name="lock" color="#05375a" size={20} />
            {this.state.eye ? (
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({password: text});
                }}
              />
            ) : (
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({password: text});
                }}
              />
            )}

            {this.state.eye ? (
              <Icons
                name="eye"
                color="grey"
                size={20}
                onPress={this.handleEyeClick}
              />
            ) : (
              <Icons
                name="eye-off"
                color="grey"
                size={20}
                onPress={this.handleEyeClick}
              />
            )}
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => this.handleClick()}>
              {/*  */}
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: 'white'}]}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUpScreen')}
              style={[
                styles.signIn,
                {borderWidth: 1, marginTop: 15, borderColor: '#009387'},
              ]}>
              <Text style={[styles.textSign, {color: '#009387'}]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

export default connect()(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
