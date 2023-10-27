import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; // Importe o componente Text
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // O usuário está autenticado
        setUser(currentUser);
      } else {
        // O usuário não está autenticado
        setUser(null);
      }
    });

    // Limpeza da função de observação ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.tela}>
      <Image source={require('./../images/logo.png')} style={styles.logo} />
      <View style={styles.ellipse}>
        <Icon name="user" size={70} color="black" />
      </View>
      <View>
        {user && <Text style={styles.titulo}>{user.displayName}</Text>}
        {user && <Text>Email: {user.email}</Text>}
        {user && <Text>Celular: {user.phoneNumber}</Text>}
      </View>
    </View>
  );
};

export default Account

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
  ellipse: {
    width: 152,
    height: 152,
    borderRadius: 80, // metade da largura e altura para torná-lo uma elipse
    backgroundColor: '#D987FF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  titulo: {
    color: '#000000',
    //////fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    fontWeight: '700',
    margin: 10
  },
})