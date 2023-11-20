import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {useFonts, Montserrat_500Medium, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';

import { getFirestore } from "firebase/firestore";
import { app } from './../../../firebaseConfig'

const db = getFirestore(app)

const Account = () => {
  const [user, setUser] = useState(null);
  const [agendamentos, setAgendamentos] = useState(null);
  // const [fontsLoaded] = useFonts({ Montserrat_600SemiBold, Montserrat_500Medium});

  // if (!fontsLoaded) return null;

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

    const getAgendamentos = async () => {
      try {
        const q = query(
          collection(db, 'agendamentos'),
          where('usuario.email', '==', auth.currentUser.email)
        );
        const agendamentosUser = await getDocs(q);
        const dadosAgendamentos = agendamentosUser.docs.map(doc => doc.data());
        setAgendamentos(dadosAgendamentos);
      } catch (error) {
        alert('Erro ao buscar agendamentos: ' + error.message);
      }
    };  

    getAgendamentos()
    
  }, []);

  return (
    <ScrollView>
    <View style={styles.tela}>
      <Image source={require('./../images/logo.png')} style={styles.logo} />
      <View style={styles.ellipse}>
        <Icon name="user" size={70} color="black" />
      </View>
      <View>
        {user && <Text style={styles.titulo}>{user.displayName}</Text>}
        {user && <Text style={styles.texto}>Email: {user.email}</Text>}
        {user && <Text style={styles.texto}>Celular: {user.phoneNumber}</Text>}
      </View>
      <View style={{maxWidth: 300}}>
        <Text style={styles.titulo}>Meus agendamentos:</Text>
        {agendamentos && agendamentos.length > 0 ? (
          agendamentos.map((agendamento, index) => (
            <Text key={index} style={styles.texto}>
              <Text style={{ fontWeight: 'bold' }}>{agendamento.servico}</Text> - {agendamento.data} às {agendamento.horario}
            </Text>
          ))
        ) : (
          <Text>Nenhum agendamento encontrado.</Text>
        )}
      </View>
      <View style={{ height: 100 }}></View>
    </View>
    </ScrollView>
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
    alignItems: 'center'
  },
  ellipse: {
    width: 152,
    height: 152,
    borderRadius: 80,
    backgroundColor: '#D987FF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  titulo: {
    color: '#000000',
    fontSize: 23,
    // fontWeight: '700',
    fontFamily: 'Montserrat_600SemiBold',
    margin: 20,
    textAlign: 'center'
  },
  texto:{
    fontFamily: 'Montserrat_500Medium',
  }
})