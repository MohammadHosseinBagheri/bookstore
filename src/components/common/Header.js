import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Box, HStack} from 'native-base';
const Header = props => {
  const {left, right, body} = props;
  return (
    <HStack justifyContent="space-between" bg="#fff" p={4}>
      <Box w={'33%'}>{left}</Box>
      <Box alignItems="center" w={'33%'}>
        {body}
      </Box>
      <Box alignItems="flex-end" w={'33%'}>
        {right}
      </Box>
    </HStack>
  );
};

export default Header;

const styles = StyleSheet.create({});
