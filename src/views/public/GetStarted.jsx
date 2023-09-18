import React from 'react';
import { View, Image, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default GetStarted = () => {

    const navigation = useNavigation();

    const navigateToSignUp = () => {
        navigation.navigate('Seila'); 
    };
    // const navigateToSignIn = () => {
    //     navigation.navigate('Login'); 
    // };


  return (
    <View style={styles.container}>
      <View style={styles.div}>
        {/* <View style={styles.overlap}>
          <Image
            style={styles.logoFloral}
            source={require('./images/logo.png')}
          />
          <Text style={styles.vivaBeleza}>Viva Beleza</Text>
          <Text style={styles.vivaABelezaEm}>Viva Beleza em Cada Detalhe!</Text>
        </View> */}
        {/* <View>
            <TouchableOpacity
            style={styles.login}
            onPress={navigateToSignIn}
            >
            <Text style={styles.text}>Entrar</Text>
            </TouchableOpacity>
        </View> */}
        <View>
            <TouchableOpacity
            style={styles.signup}
            onPress={navigateToSignUp}
            >
            <Text style={styles.text}>Criar conta</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    backgroundColor: '#ffffff',
    height: 800,
    width: 600,
    position: 'relative',
  },
  overlap: {
    backgroundColor: '#d886ff',
    height: 628,
    minWidth: 600,
    top: 0,
    left: 0,
  },
  logoFloral: {
    height: 313,
    width: 313,
    position: 'absolute',
    top: 34,
    left: 43,
    resizeMode: 'cover',
  },
  vivaBeleza: {
    color: '#000000',
    // fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    fontWeight: '700',
    justifyContent: 'center',
    textAlign: 'center',
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 359,
    // left: 103,
  },
  vivaABelezaEm: {
    height: 15,
    width: 313,
    position: 'absolute',
    top: 427,
    left: 42,
  },
  login: {
    backgroundColor: '#d886ff',
    height: 35,
    width: 152,
    position: 'absolute',
    top: 500,
    left:'20%',
    borderRadius: 10,
  },
  overlapGroup: {
    backgroundColor: '#d886ff',
    height: 35,
    width: 150,
    position: 'relative',
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    // fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    // lineHeight: 'normal',
    textAlign: 'center',
    position: 'absolute',
    top: 9,
    left: 33,
    width: 85,
  },
  signup: {
    backgroundColor: '#d886ff',
    height: 35,
    width: 152,
    position: 'absolute',
    top: 500,
    right:'20%',
    borderRadius: 10,
  },
});
