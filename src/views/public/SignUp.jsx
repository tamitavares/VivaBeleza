import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useFonts, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

//Firebase configs----------------------------------------------------------
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { app } from './../../../firebaseConfig'
import { collection, addDoc } from "firebase/firestore"; 


import { useNavigation } from '@react-navigation/native';

const auth = getAuth(app);
const db = getFirestore(app)
//--------------------------------------------------------------------------


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fontsLoaded] = useFonts({Montserrat_500Medium, Montserrat_700Bold});

  const navigation = useNavigation();

  const navigateToSignIn = () => {
    navigation.navigate('SignIn'); 
  };

  if(!fontsLoaded) return null;

  const authSignUp = async () => {
    try {
      if (password.length < 6) {
        Alert.alert('Erro no cadastro', 'A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;
      const docRef = await addDoc(collection(db, 'users'), {
        email: email,
        displayName: displayName,
        phoneNumber: phoneNumber,
        uid: uid,
      });
      // console.log('Document written with ID: ', docRef.id);
      Alert.alert('Usuário ' + displayName + ' cadastrado com sucesso!');
      navigateToSignIn();
    } catch (error) {
      console.error('Erro no SignUp:', error);
    }
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
              onChangeText={(text) => setDisplayName(text)}
              value={displayName}
            /> 
            <TextInput
              style={{...styles.textInputs}}
              placeholder="   Telefone"
              placeholderTextColor="white" 
              onChangeText={(text) => {
                if (text.startsWith('+55')) {
                  // Remove o prefixo "+55" se o usuário tentar editá-lo
                  setPhoneNumber(text);
                } else if (text.startsWith('+')) {
                  // Evita que o usuário insira qualquer prefixo além de "+55"
                } else {
                  // Concatena o número de telefone com o prefixo "+55"
                  setPhoneNumber(`+55${text}`);
                } 
              }}
              value={phoneNumber}
              keyboardType="phone-pad"
            /> 
              <TextInput
              style={{...styles.textInputs}}
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
    fontFamily: 'Montserrat_700Bold',
    fontSize: 23,
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
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
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
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium',
  }
});

export default SignUp;
