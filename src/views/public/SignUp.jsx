import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from './../../../firebaseConfig'

import { useNavigation } from '@react-navigation/native';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const navigation = useNavigation();

  const navigateToSignIn = () => {
    navigation.navigate('SignIn'); 
  };

  const auth = getAuth(app);

  const authSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário registrado:", user);
        Alert.alert("Usuário cadastrado")
        navigateToSignIn()
      })
      .catch(error => {
        console.error("Erro no SignUp:", error);
      });
  };

  return (
    <View style={styles.tela}>
            <Text style={styles.titulo}>Criar Conta</Text>
            <Image source={require('./../images/logo.png')} style={styles.logo}/>
            <Text style={{...styles.texto, top: 251, maxWidth: 320}}>Crie uma conta para acessar todas as
funcionalidades do nosso aplicativo.</Text>
            <TextInput
              style={{...styles.textInputs, top: 110}}
              placeholder="   Nome"
              placeholderTextColor="white" 
              onChangeText={(text) => setUsername(text)}
              value={username}
            /> 
            <TextInput
              style={{...styles.textInputs, top: 110}}
              placeholder="   Telefone"
              placeholderTextColor="white" 
              onChangeText={(text) => setPhone(text)}
              value={phone}
              keyboardType="phone-pad"
            /> 
              <TextInput
              style={{...styles.textInputs, top: 110}}
              placeholder="   Email"
              placeholderTextColor="white" 
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            /> 
              <TextInput
              style={{...styles.textInputs}}
              placeholder="   Senha"
              placeholderTextColor="white" 
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />            

            <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={authSignUp}
            >
            <Text style={styles.textButtonCadastrar}>Cadastrar</Text>
            </TouchableOpacity>
            
        </View>
      );
    };



const styles = StyleSheet.create({
  logo:{
    height: 194,
    resizeMode: 'cover', 
    top: 0,
    width: 194,
  },
  tela: {
    backgroundColor: '#fafafa',
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    color: '#000000',
    //////fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    fontWeight: '700',
    left: 43,
    position: 'absolute',
    top: 192,
  },
  justifyItems:{
    display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'
  },
  textInputs: {
    backgroundColor: '#b71fff',
    borderRadius: 10,
    height: 35,
    width: 318,
    top: 110,
    margin: 10,
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
  },
  texto: {
    color: '#000000',
    ////fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '500',
    left: 41,
    position: 'absolute',
    top: 514,
  },
  buttonCadastrar:{
    backgroundColor: '#d886ff',
    height: 35,
    width: 130,
    position: 'absolute',
    top: 600,
    right:'10%',
    borderRadius: 10,
    justifyContent: 'center'
  },
  textButtonCadastrar:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    ////fontFamily: 'Montserrat-Medium',
  }
});

export default SignUp;
