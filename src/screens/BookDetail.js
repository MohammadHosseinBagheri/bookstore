import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {height} from 'styled-system';

const BookDetailScreen = props => {
  const {
    route: {params},
  } = props;
  console.log('data?._id', params);
  return (
    <View style={styles.container}>
      <SharedElement id={`book-image${params?._id}`}>
        <Image
          resizeMode="stretch"
          source={{uri: `https://www.imohammadhossein.ir${params?.picPath}`}}
          style={[StyleSheet.absoluteFillObject, {height: 250}]}
        />
      </SharedElement>
    </View>
  );
};
BookDetailScreen.sharedElements = (route, otherRoute, showing) => {
  const {
    route: {params},
  } = route;
  return [`book-image${params?._id}`];
};
export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
