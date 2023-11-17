import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; // Importe o componente Text
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';

import { getFirestore } from "firebase/firestore";
import { app } from './../../../firebaseConfig'

const db = getFirestore(app)

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);

    const getAccount = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          where('email', '==', auth.currentUser.email)
        );
        const usuario = await getDocs(q);

        if (usuario.size > 0) {
          const userData = usuario.docs[0].data();
          setUser(userData);
        } else {
          alert('Usuário não encontrado.');
        }
      } catch (error) {
        alert('Erro ao buscar o usuário: ' + error.message);
      }
    };
    getAccount();
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