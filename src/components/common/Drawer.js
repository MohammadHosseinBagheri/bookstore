import {VStack, Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const CustomDrawer = () => {
  return (
    <VStack style={styles.container}>
      <TouchableOpacity>
        <Text fontFamily="aviny" >Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text fontFamily="aviny" >Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text fontFamily="aviny" >About</Text>
      </TouchableOpacity>
    </VStack>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', borderBottomLeftRadius: 300},
});
