import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icons from 'react-native-vector-icons/Feather';
import IconsFeather from 'react-native-vector-icons/FontAwesome';
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Provider as PaperProvider,
} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import FeedbackViewComp from '../components/feedbackViewComp';

class FeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('props received by feedback screen....');
    console.log(props);

    this.state = {
      token: '',
      feedbacks: [],
      name: '',
      photo: '',
    };
  }

  componentDidMount() {
    this.setState({
      token: this.props.route.params.token,
      feedbacks: this.props.route.params.feedbacks,
      name: this.props.route.params.name,
      photo: this.props.route.params.photo,
    });
  }

  renderItem = ({item}) => (
    <FeedbackViewComp
      name={item.name}
      feedback={item.feadback}
      date={item.date}
    />
  );

  render() {
    console.log('state.....' + this.state);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.feedback == [] ? (
          <FeedbackViewComp
            name={item.name}
            feedback={item.feadback}
            date={item.date}
          />
        ) : (
          <FlatList
            horizontal={true}
            legacyImplementation={false}
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item) => item._id}
            data={this.state.feedbacks}
            renderItem={this.renderItem}
          />
        )}

        {/* <Footer {...this.props} /> */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.loginReducer,
});

export default connect(mapStateToProps)(FeedbackScreen);

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
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '20%',
    backgroundColor: '#009387',
    borderRightWidth: 1,
    borderColor: 'darkgreen',
  },
});
