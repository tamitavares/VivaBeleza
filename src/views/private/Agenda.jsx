import { FlatList, SafeAreaView, StyleSheet, Text, Pressable, Button, Alert, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {useFonts, Montserrat_500Medium, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat'
import { SelectList } from 'react-native-dropdown-select-list'

import { getAuth} from 'firebase/auth';
import { getDocs, collection, query, where, addDoc } from 'firebase/firestore';

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
  const [camposPreenchidos, setCamposPreenchidos] = useState(false);
  const [horarioOcupado, setHorarioOcupado] = useState(false);



  const [servicoAgenda, setServicoAgenda] = useState(false);



  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  // const dataAtual = new Date();

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


    const getServicoAgenda = async () => {
      try {
        const qSnapshot = await getDocs(collection(db, 'horarios'));
        const servicoData = [];
        qSnapshot.forEach((doc) => {
          servicoData.push(doc.data().servico);
        });
        setServicoAgenda(servicoData);
      } catch (error) {
        alert('Erro ao buscar agenda: ' + error.message);
      }
    }
    getServicoAgenda()



  }, []);

   const horariosDisponiveis = (val) => {
    setSelected(val);
    setExibir(true);
    setDataSelecionada(val);
  };

  const handleSevicoSelection = (selected) => {
    setServico(selected);
  };
  const handleHorarioSelection = (selectedHorario) => {
    setHorario(selectedHorario);
    setHorarioSelecionado(selectedHorario);
  };

  if (!fontsLoaded) return null;

const dataAtual = new Date(); 

const data = [];

for (let i = 1; i <= 7; i++) {
    const novaData = dataAtual.addDays(i);
    
    // Verificar se o dia da semana não é domingo (0) nem segunda-feira (1)
    if (novaData.getDay() !== 0 && novaData.getDay() !== 1) {
        data.push({
            key: `${i}`,
            value: `${novaData.getDate()}/${novaData.getMonth() + 1}`,
        });
    }
}

  const servicosNomes = [
    "Manicure  -  R$27,00",
    "Pedicure  -  R$30,00",
    "Depilação na Cera  -  R$50,00",
    "Micropigmentação Labial  -  R$850,00",
    "Limpeza de Pele  -  R$120,00",
    "Spa dos Pés  -  R$80,00",
    "Design de Sobrancelhas  -  R$40,00",
    "Micropigmentação de Sobrancelhas  -  R$480,00",
  ];

  state = {
    data: [
      { id: "00", name: "07:00", value: "07:00" },
      { id: "01", name: "07:30", value: "07:30" },
      { id: "02", name: "08:00", value: "08:00" },
      { id: "03", name: "08:30", value: "08:30" },
      { id: "04", name: "09:00", value: "09:00" },
      { id: "05", name: "09:30", value: "09:30" },
      { id: "06", name: "10:00", value: "10:00" },
      { id: "07", name: "10:30", value: "10:30" },
      { id: "08", name: "11:00", value: "11:00" },
      { id: "09", name: "11:30", value: "11:30" },
      { id: "10", name: "12:00", value: "12:00" },
      { id: "11", name: "13:30", value: "13:30" },
      { id: "12", name: "14:00", value: "14:00" },
      { id: "13", name: "14:30", value: "14:30" },
      { id: "14", name: "15:00", value: "15:00" },
      { id: "15", name: "15:30", value: "15:30" },
      { id: "16", name: "16:00", value: "16:00" },
      { id: "17", name: "16:30", value: "16:30" },
      { id: "18", name: "17:00", value: "17:00" },
      { id: "19", name: "17:30", value: "17:30" },
      { id: "20", name: "18:00", value: "18:00" },
    ],}

  const criarAgendamento = async () => {
    try {
      if (servico && horario && dataSelecionada) {
        const horarioOcupado = await verificarHorarioOcupado(dataSelecionada, horario);
        if (horarioOcupado) {
          Alert.alert('Erro ao agendar:', 'Este horário já está ocupado. Escolha outro horário.');
          setHorarioOcupado(true);
          return;
        }
  
        const agendamentoData = { usuario: user, servico: servico, horario: horario, data: dataSelecionada };
        await addDoc(collection(db, 'agendamentos'), agendamentoData);
        const mensagemAlerta = `Agendado com sucesso!\nDia: ${selected}\nHorário: ${horario}\nProcedimento: ${servico}`;
        Alert.alert('Sucesso', mensagemAlerta);
        
        setServico('');
        setHorario('');
        setCamposPreenchidos(true);
        setHorarioOcupado(false);
      } else {
        Alert.alert('Erro ao agendar:', 'Preencha todos os campos antes de agendar.');
        setCamposPreenchidos(false);
      }   
    } catch (error) {
      Alert.alert('Erro ao agendar:', error.message);
    }
  };

  const verificarHorarioOcupado = async (data, horario) => {
    try {
      const q = query(
        collection(db, 'agendamentos'),
        where('data', '==', data),
        where('horario', '==', horario)
      );
      const agendamentos = await getDocs(q);
      return agendamentos.size > 0;
    } catch (error) {
      console.error('Erro ao verificar horário ocupado:', error);
      return true;
    }
  };
  
  return (
    <SafeAreaView>
      <Text style={styles.titulo}>Boas vindas à sessão de agendamento!</Text>
      <Text style={styles.t2}>Datas e horários disponíveis:</Text>

      <View style={{margin: 10}}>
        <SelectList
          setSelected={(val) => handleSevicoSelection(val)}
          data={servicoAgenda}
          save="servicoAgenda"
        />
        <SelectList
          setSelected={(val) => horariosDisponiveis(val)}
          data={data}
          save="value"
        />

        {exibirHoras ? (
          <FlatList
            data={state.data} 
            setSelected={(val) => handleHorarioSelection(val)}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => handleHorarioSelection(item.value) }
                style={[ styles.item, {backgroundColor: item.value === horarioSelecionado ? '#3702E0' : '#cc88ff' },]}>
                  <Text style={styles.text}>{item.name}</Text>
                </Pressable>
              );
            }}
          />
        ) : null}

        <TouchableOpacity
        style={styles.button}
        onPress={criarAgendamento}
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
