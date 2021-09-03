import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (data, key) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};
export const getData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
