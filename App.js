import React, {useRef, useEffect} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

requestLocationPermission = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'VOIS Location Permission',
        message: 'VOIS needs access to your Location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  } catch (err) {
    console.warn(err);
  }
};

reqBatt = async () => {
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
};

checkLocPermission = async () => {
  try {
    await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION');
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  const webView = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Orientation.lockToPortrait();
    this.requestLocationPermission();
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    if (this.checkLocPermission()) {
    } else {
      alert('Silahkan aktifkan lokasi anda');
    }
    setTimeout(() => Orientation.lockToPortrait(), 1000);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      clearInterval(this._interval);
    };
  }, []);

  const onAndroidBackPress = () => {
    if (webView.current) {
      webView.current.goBack();
      return true;
    }
    return false;
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <WebView
          source={{uri: 'https://orbcomm.monitormyvessel.com'}}
          style={styles.video}
          // mediaPlaybackRequiresUserAction={false}
          // domStorageEnabled={true}
          // ref={webView}
          // allowsInlineMediaPlayback
          // useWebKit
          javaScriptEnabled
          javaScriptEnabledAndroid
          // startInLoadingState
          // originWhitelist={['*']}
          // cacheEnabled={false}
          // cacheMode={'LOAD_NO_CACHE'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  video: {
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
  },
});

export default App;
