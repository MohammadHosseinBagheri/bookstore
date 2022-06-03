import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Heading, HStack, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import {GREEN_COLOR} from '../../constant/styles';

const {config} = RNFetchBlob;
const Document = ({item, onCopy, value, hasCopied}) => {
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path:
        RNFetchBlob.fs.dirs.DownloadDir + '/' + item?.source?.split('/').pop(),
      description: 'دانلود جزوه',
    },
  };
  return (
    <VStack shadow={3} borderRadius={8} p={4} bg="#fff" m={2} flex={1}>
      <HStack flexWrap="wrap" justifyContent="space-between">
        <Text fontSize="xs">{item?.college?.name}</Text>
        <Text fontSize="xs">{item?.field?.name}</Text>
      </HStack>
      <HStack flexWrap="wrap" justifyContent="space-between">
        <Text fontSize="xs">{item?.author}</Text>
        <Text fontSize="xs">{item?.field?.university?.name}</Text>
      </HStack>
      <Heading textAlign="center">{item?.name}</Heading>
      <HStack justifyContent="space-between">
        <Icon
          onPress={async () => {
            config(options)
              .fetch('GET', item?.source)
              .progress((received, total) => {
                console.log('progress', received / total);
              })
              .then(res => {
                let status = res.info().status;

                if (status === 200) {
                  // the conversion is done in native code
                  let base64Str = res.base64();
                  // the following conversions are done in js, it's SYNC
                  let text = res.text();
                  let json = res.json();
                }
              })
              // Something went wrong:
              .catch((errorMessage, statusCode) => {
                // error handling
                console.log({errorMessage, statusCode}, item?.source);
              });
          }}
          color={GREEN_COLOR}
          name="download"
          size={15}
        />
        {hasCopied && item?.source === value ? (
          <Icon name="check" size={15} />
        ) : (
          <Icon onPress={() => onCopy(item?.source)} name="copy" size={15} />
        )}
      </HStack>
    </VStack>
  );
};

export default Document;

const styles = StyleSheet.create({});
