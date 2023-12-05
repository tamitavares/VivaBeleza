import React, { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './../../../firebaseConfig'
import { useNavigation } from '@react-navigation/native';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({ Montserrat_500Medium});

  const navigation = useNavigation();

  if (!fontsLoaded) return null;

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToNavigator = () => {
    navigation.navigate('Navigator');
  };

  const auth = getAuth(app);

  const authSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("Login de usuário:", user);
        Alert.alert("Usuário logado");
        navigateToNavigator();
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          Alert.alert("Erro", "Senha incorreta. Por favor, tente novamente.");
        } else {
          console.error("Erro no login:", error);
        }
      });
  };
  
  return (
        
        <View style={styles.tela}>
            <Text style={styles.titulo}>Bem vindo!</Text>
            <Image source={require('./../images/logo.png')} style={styles.logo}/>
            <Text style={{...styles.texto, top: 251}}>Faça login na sua conta:</Text>
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
            style={styles.buttonEntrar}
            onPress={authSignIn}
            >
            <Text style={styles.textButtonEntrar}>Entrar</Text>
            </TouchableOpacity>
            
            <Text style={styles.texto}>Ainda não tem conta?</Text>

            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.buttonCadastrar}>Cadastre-se</Text>
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
    fontFamily: 'Montserrat_500Medium',
    fontSize: 23,
    left: 43,
    position: 'absolute',
    top: 192,
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
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    left: 41,
    position: 'absolute',
    top: 514,
  },
  buttonCadastrar: {
    color: '#b71fff',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    position: 'absolute',
    top: 210,
    left: '17%'
  },
  buttonEntrar:{
    backgroundColor: '#d886ff',
    height: 35,
    width: 130,
    position: 'absolute',
    top: 430,
    right:'10%',
    borderRadius: 10,
    justifyContent: 'center'
  },
  textButtonEntrar:{
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium',
  }
});

export default SignIn