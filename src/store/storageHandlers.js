import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (key, value, setStore) => {
  try {
    let jsonValueKey = await AsyncStorage.getItem(key);
    jsonValueKey = jsonValueKey != null ? JSON.parse(jsonValueKey) : null
    let data = { data : [value]}
    if (jsonValueKey){
        
        let dataTemp = [...jsonValueKey.data].filter(item => item.id !== value.id)
        data = { data : [value,...dataTemp]}
    }
    setStore(data)
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data", error);
  }
};

export const getData = async (key,setStore) => {
  try {
    let jsonValue = await AsyncStorage.getItem(key);
    jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null
    console.log(jsonValue)
    if(jsonValue && setStore){
        setStore(jsonValue)
    }
    return jsonValue
   
  } catch (error) {
    console.error("Error retrieving data", error);
  }
};

export const removeData = async (key,value, setStore) => {
  try {
    let jsonValueKey = await AsyncStorage.getItem(key);
    jsonValueKey = jsonValueKey != null ? JSON.parse(jsonValueKey) : null
    let data = {}
    if (jsonValueKey){
        console.log(jsonValueKey)
        let dataTemp = [...jsonValueKey.data].filter(item => item.id !== value.id)
        console.log(dataTemp,"data")
        data = { data : [...dataTemp]}
    }
    setStore(data)
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data", error);
  }
};
