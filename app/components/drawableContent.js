import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

class DrawableContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text onPress={() => this.props.navigation.navigate('FeedbackScreen')}>
          Dashboard
        </Text>

        <Text onPress={() => this.props.navigation.navigate('SplashScreen')}>
          Logout
        </Text>
      </View>
    );
  }
}

export default DrawableContent;
