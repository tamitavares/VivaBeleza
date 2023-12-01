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




  const [services, setServices] = useState({ data: [] });




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

    const dados = {
      data: [
        {id: "00", nome: "Manicure  -  R$27,00", dia: "05/12", value: "08:00", agendado: false},
        {id: "01", nome: "Manicure  -  R$27,00", dia: "05/12", value: "09:00", agendado: false},
        {id: "02", nome: "Manicure  -  R$27,00", dia: "05/12", value: "10:00", agendado: false},
        {id: "03", nome: "Manicure  -  R$27,00", dia: "05/12", value: "11:00", agendado: false},
  
  
        {id: "04", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "08:00", agendado: false},
        {id: "05", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "09:00", agendado: false},
        {id: "06", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "10:00", agendado: false},
        {id: "07", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "11:00", agendado: false},

        {id: "04", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "08:00", agendado: false},
        {id: "05", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "09:00", agendado: false},
        {id: "06", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "10:00", agendado: false},
        {id: "07", nome: "Pedicure  -  R$30,00", dia: "05/12", value: "11:00", agendado: false},
        
      ]
    }
    setServices(dados)

  }, []);

  const horariosDisponiveis = (val) => {
    setSelected(val);
  
    // Filtrar os horários disponíveis antes de exibi-los
    const horariosDisponiveis = services.data.filter(
      (item) => !(item.agendado)
    );
  
    setServices({ data: horariosDisponiveis });
    setExibir(true);
    setDataSelecionada(val);
  };
  

  const handleServicoSeletion = (selected) => {
    setServico(selected);
  };
  const handleHorarioSelection = (selectedHorario) => {
    setHorario(selectedHorario);
    setHorarioSelecionado(selectedHorario);
  };

  if (!fontsLoaded) return null;

  const dias = [
    "05/12",
    "06/12",
    "07/12",
    "08/12",
    "09/12",
  ]

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

  const criarAgendamento = async () => {
    try {
      if (servico && horario && dataSelecionada) {
        const horarioOcupado = await verificarHorarioOcupado(dataSelecionada, horario);
        if (horarioOcupado) {
          // Remover o item correspondente em services.data
          const updatedServices = services.data.filter(
            (item) => !(item.nome.includes(servico) && item.dia === dataSelecionada && item.value === horario)
          );
          setServices({ data: updatedServices });
  
          // Avisar ao usuário que o horário já está ocupado
          Alert.alert('Erro ao agendar:', 'Este horário já está ocupado. Escolha outro horário.');
          setHorarioOcupado(true);
          return;
        }
  
        // Encontrar o item correspondente em services.data
        const index = services.data.findIndex(item => item.nome.includes(servico) && item.dia === dataSelecionada && item.value === horario);
  
        if (index !== -1) {
          // Atualizar a propriedade agendado para true
          const updatedServices = [...services.data];
          updatedServices[index].agendado = true;
          setServices({ data: updatedServices });
        }
  
        // Restante do código para criar o agendamento...
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
          setSelected={(val) => handleServicoSeletion(val)}
          data={servicosNomes}
          save="servicosNomes"
        />
        <SelectList
          setSelected={(val) => horariosDisponiveis(val)}
          data={dias}
          save="value"
        />

    {exibirHoras ? (
      <FlatList
        data={services.data.filter(item => item.nome.includes(servico) && item.dia.includes(dataSelecionada))}
        setSelected={(val) => handleHorarioSelection(val)}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => handleHorarioSelection(item.value) }
              style={[ styles.item, {backgroundColor: item.value === horarioSelecionado ? '#3702E0' : '#cc88ff' },]}>
              <Text style={styles.text}>{item.value}</Text>
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
