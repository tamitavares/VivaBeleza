import React, { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from '@react-navigation/native';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); 
  };
  const navigateToNavigator = () => {
    navigation.navigate('Navigator'); 
  };

  const auth = getAuth();

  const authSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login de usuário:", user);
        Alert.alert("Usuário logado")
        return user, navigateToNavigator
      })
      .catch(error => {
        console.error("Usuário não registrado:", error);
      });
  };

  return (
        
        <View style={styles.login}>
          <View style={styles.div}>
            <Text style={styles.textWrapper}>Bem vindo!</Text>
            <Image source={require('./images/logo.png')} style={styles.logo}/>
            <Text style={styles.p}>Faça login na sua conta:</Text>
            <View style={styles.divWrapper}>
              {/* <Text style={styles.textWrapper4}>Email</Text> */}
              <TextInput
              style={styles.textWrapper4}
              placeholder="Email"
              placeholderTextColor="white" 
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
            </View>
            <View style={styles.overlap2}>
              {/* <Text style={styles.textWrapper4}>Senha</Text> */}
              <TextInput
              style={styles.textWrapper4}
              placeholder="Senha"
              placeholderTextColor="white" 
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />            
            </View>

            <TouchableOpacity onPress={authSignIn}>
              <Text style={styles.buttonEntrar}>Entrar</Text>
            </TouchableOpacity>
            
            <Text style={styles.textWrapper5}>Ainda não tem conta?</Text>

            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.buttonCadastrar}>Cadastre-se</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      );
    };




const styles = StyleSheet.create({
  logo:{
    height: 194,
    left: '25%',
    resizeMode: 'cover', // Em vez de object-fit: cover
    position: 'absolute',
    top: 0,
    width: 194,
  },
  login: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  div: {
    backgroundColor: '#fafafa',
    height: 800,
    overflow: 'hidden',
    position: 'relative',
    width: 400,
  },
  textWrapper: {
    color: '#000000',
    ////fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    fontWeight: '700',
    left: 43,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 192,
  },
  menu: {
    height: 87,
    left: 0,
    position: 'absolute',
    top: 713,
    width: 404,
  },
  overlap: {
    height: 87,
    position: 'relative',
    width: 400,
  },
  overlapGroupWrapper: {
    height: 87,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 400,
  },
  overlapGroup: {
    height: 87,
    position: 'relative',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    height: 55,
    left: 0,
    position: 'absolute',
    top: 32,
    width: 400,
  },
  ellipse: {
    backgroundColor: '#b71fff',
    borderRadius: 32.5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    height: 65,
    left: 167,
    position: 'absolute',
    top: 0,
    width: 65,
  },
  codiconHome: {
    height: 38,
    left: 181,
    position: 'absolute',
    top: 14,
    width: 38,
  },
  group: {
    height: 23,
    left: 307,
    position: 'absolute',
    top: 42,
    width: 23,
  },
  textWrapper2: {
    color: '#bab9b9',
    ////fontFamily: 'Montserrat-Medium',
    fontSize: 9,
    fontWeight: '500',
    left: 289,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 70,
  },
  textWrapper3: {
    color: '#bab9b9',
    ////fontFamily: 'Montserrat-Medium',
    fontSize: 9,
    fontWeight: '500',
    left: 65,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 69,
  },
  uilSchedule: {
    height: 27,
    left: 70,
    position: 'absolute',
    top: 35,
    width: 27,
  },
  p: {
    color: '#000000',
    // //fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '500',
    left: 43,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 251,
  },
  divWrapper: {
    backgroundColor: '#b71fff',
    borderRadius: 10,
    height: 35,
    left: 41,
    position: 'absolute',
    top: 308,
    width: 318,
  },
  textWrapper4: {
    color: '#ffffff',
    // //fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '500',
    left: 14,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 8,
  },
  overlap2: {
    backgroundColor: '#b71fff',
    borderRadius: 10,
    height: 35,
    left: 41,
    position: 'absolute',
    top: 359,
    width: 318,
  },
  textWrapper5: {
    color: '#000000',
    //fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '500',
    left: 41,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 514,
  },
  buttonCadastrar: {
    color: '#b71fff',
    //fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '500',
    left: 274,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 514,
  },
  textWrapper7: {
    color: '#b71fff',
    //fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '500',
    left: 320,
    letterSpacing: 0,
    // lineHeight: normal,
    position: 'absolute',
    top: 417,
  },
  buttonEntrar:{
    color: '#b71fff',
    //fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    alignItems: 'center',
    left: 320,
    position: 'absolute',
    top: 417,
  },
});

export default SignIn