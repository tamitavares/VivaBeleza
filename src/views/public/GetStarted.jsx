import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CertificadoItemm = () => {

    const navigation = useNavigation();

    const navigateToSignUp = () => {
      navigation.navigate('SignUp'); 
  };
  const navigateToSignIn = () => {
      navigation.navigate('SignIn'); 
  };

  return (
    <View style={styles.tela}>
        <Image
          style={styles.image}
          source={require('./images/logo.png')}
        />
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
            style={styles.button}
            onPress={navigateToSignIn}
            >
            <Text style={styles.text}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={navigateToSignUp}
            >
            <Text style={styles.text}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default CertificadoItemm

const styles = StyleSheet.create({
  tela: {
    backgroundColor: '#fafafa',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 300,
    position: 'absolute',
    top: 70,
    width: 300,
  },
  button: {
    backgroundColor: '#d886ff',
    height: 60,
    width: 152,
    top: 500,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  }
})