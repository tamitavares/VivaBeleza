import { FlatList, SafeAreaView, StyleSheet, Text, Pressable, Button, Alert, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {useFonts, Montserrat_500Medium, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat'
import { SelectList } from 'react-native-dropdown-select-list'

import { getAuth} from 'firebase/auth';
import { getDocs, collection, query, where, addDoc, updateDoc} from 'firebase/firestore';

import { getFirestore } from "firebase/firestore";
import { app } from './../../../firebaseConfig'

const db = getFirestore(app)

const Agenda = () => {
  const [selected, setSelected] = useState("");
  const [exibirHoras, setExibir] = useState(false);
  const [servico, setServico] = useState("");
  const [horario, setHorario] = useState("");
  const [user, setUser] = useState("");
  const [fontsLoaded] = useFonts({ Montserrat_600SemiBold, Montserrat_500Medium});
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);



  const [services, setServices] = useState({ data: [] });
  const [dia, setDia] = useState({ data: [] });
  const [hora, setHora] = useState({ data: [] });
  const [servicosNomes, setServicosNomes] = useState({ data: [] });
  
  const [servicoSelecionado, setServicoSelecionado] = useState(null);



  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  // const dataAtual = new Date();

  const resetState = () => {
    setExibir(false);
    setHorarioSelecionado(null);
    setDataSelecionada(null);
    setDia({ data: [] });
    setHora({ data: [] });
  };

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

    const getNomeServico = async () => {
      try{
        const q = query(
          collection(db, 'horarios'),
        );
        const nome = await getDocs(q);
        const nomeData = [];
        nome.forEach((doc) => {
          nomeData.push(doc.data().servico)
        })
        setServicosNomes(nomeData)
        // console.log(servicosNomes)
      }
      catch (error) {
        alert('Erro ao buscar os nomes: ' + error.message);
      }
    }
    getNomeServico()

  }, []); 

  const handleServicoSeletion = (selected) => {
    //console.log(selected)
    setServico(selected);

    const getAgendamentos = async () => {
      try {
        const q = query(
          collection(db, 'horarios'),
          where('servico', '==', selected)
        );
        const nome = await getDocs(q);
        setServicoSelecionado(nome.docs[0].id)
    
        if (nome.size > 0) {
          const q2 = query(
            collection(db, `horarios/${nome.docs[0].id}/agenda`),
            where('agendado', '!=', true),
          );
          const agendamentos = await getDocs(q2);
    
          const agendaData = [];
          const diasSet = new Set();
          // const horasSet = new Set();
    
          agendamentos.forEach((doc) => {
            const data = doc.data();
            agendaData.push(data);
            diasSet.add(data.dia);
            // horasSet.add(data.hora);
          });
    
          setServices(agendaData);
          setDia([...diasSet]);
          // setHora([...horasSet]);
    
          // console.log(services);
        } else {
          alert('Horário não encontrado para o serviço especificado.');
        }
      } catch (error) {
        alert('Erro ao buscar os agendamentos: ' + error.message);
      }
    };
    getAgendamentos();
    
  };

  const horariosDisponiveis = (diaSelected) => {
    //console.log(diaSelected);
    setDataSelecionada(diaSelected)

    const puxarHora = async () => {
      try {
        const q3 = query(
          collection(db, `horarios/${servicoSelecionado}/agenda`),
          where('dia', '==', diaSelected),
        );
        const h = await getDocs(q3);
        let ho = [];
  
        h.forEach((doc) => {
          if(doc.data().agendado==false){
            ho.push(doc.data().hora);
          }
          
        });
        ho.sort();
  
        setHora(ho);
       // console.log(hora);
      } catch (error) {
        alert('Erro ao buscar os horários: ' + error.message);
      }
    };
  
    setExibir(true);
    puxarHora();
  };
  


  const handleHorarioSelection = (selectedHorario) => {
    // setHorario(selectedHorario);
    setHorarioSelecionado(selectedHorario);
    //console.log(horarioSelecionado)
  };

  if (!fontsLoaded) return null;


  const criarAgendamento = async () => {
    try {
      const q = query(
        collection(db, `horarios/${servicoSelecionado}/agenda`),
        where("dia", "==", dataSelecionada),
        where("hora", "==", horarioSelecionado)
      );
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size > 0) {
        
        const docRef = querySnapshot.docs[0].ref;
  
        
        await updateDoc(docRef, { agendado: true });
        
        const agendamentoData = { usuario: user, servico: servico, horario: horarioSelecionado, data: dataSelecionada };
        await addDoc(collection(db, 'agendamentos'), agendamentoData);
    
        const mensagemAlerta = `Agendado com sucesso!\nDia: ${dataSelecionada}\nHorário: ${horarioSelecionado}\nProcedimento: ${servico}`;
        Alert.alert('Sucesso', mensagemAlerta);
    
        setServico('');
        setHorario('');
        setDataSelecionada('');
        // setCamposPreenchidos(true);
        // setHorarioOcupado(false);
      } else {
        alert('Agendamento não encontrado.');
      }
  
    } catch (error) {
      Alert.alert('Erro ao agendar:', error.message);
    }
  };
  
  
  return (
    <SafeAreaView>
      <Text style={styles.titulo}>Boas vindas à sessão de agendamento!</Text>
      <Text style={styles.t2}>Datas e horários disponíveis:</Text>

      <View style={{margin: 10}}>
        <SelectList
          setSelected={(val) => handleServicoSeletion(val)}
          data={servicosNomes}
          save="servicosNomes"
        />
        <SelectList
          setSelected={(val) => horariosDisponiveis(val)}
          data={dia}
          save="value"
        />

{exibirHoras ? (
  <FlatList
    data={hora}
    renderItem={({ item }) => (
      <Pressable
        onPress={() => handleHorarioSelection(item)}
        style={[
          styles.item,
          {
            backgroundColor: item === horarioSelecionado ? '#3702E0' : '#cc88ff',
          },
        ]}
      >
        <Text style={styles.text}>{item}</Text>
      </Pressable>
    )}
    keyExtractor={(item) => item} 
    numColumns={3}
  />
) : null}



      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          criarAgendamento();
          resetState(); 
        }}
      >
        <Text style={{...styles.titulo, color: "#ffff"}}>Agendar</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Agenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  item: {
    alignItems: "center",
    backgroundColor: '#cc88ff',
    flexGrow: 1,
    margin: 3,
    padding: 10
  },
  text: {
    color: "#ffff",
    fontFamily: 'Montserrat_500Medium',
  },
  titulo: {
    color: '#000000',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
    margin: 10
  },
  t2: {
    color: '#000000',
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'justify',
    fontSize: 18,
    margin: 10
  },
  button: {
    backgroundColor: '#d886ff',
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
});
