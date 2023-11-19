import { FlatList, SafeAreaView, StyleSheet, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_500Medium_Italic, Montserrat_600SemiBold_Italic } from '@expo-google-fonts/montserrat';
import { SelectList } from 'react-native-dropdown-select-list'


const Agenda = () => {

  const [selected, setSelected] = useState("");
  const [exibirHoras, setExibir] = useState(false);
  const [fontsLoaded] = useFonts({Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_500Medium_Italic, Montserrat_600SemiBold_Italic});
  if(!fontsLoaded) return null;  

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date;
  }

  const dataAtual = new Date()

  const horariosDisponiveis = (val)=>{
    setSelected(val);
    setExibir(true)
    console.log(val)
    console.log(exibirHoras)
  };

  const data = [
      {key:'1', value:`${dataAtual.addDays(1).getDate()}/${dataAtual.addDays(1).getMonth() + 1}`,},
      {key:'2', value:`${dataAtual.addDays(2).getDate()}/${dataAtual.addDays(2).getMonth() + 1 }`},
      {key:'3', value:`${dataAtual.addDays(3).getDate()}/${dataAtual.addDays(3).getMonth() + 1}`},
      {key:'4', value:`${dataAtual.addDays(4).getDate()}/${dataAtual.addDays(4).getMonth() + 1}`},
      {key:'5', value:`${dataAtual.addDays(5).getDate()}/${dataAtual.addDays(5).getMonth() + 1}`},
      {key:'6', value:`${dataAtual.addDays(6).getDate()}/${dataAtual.addDays(6).getMonth() + 1}`},
      {key:'7', value:`${dataAtual.addDays(7).getDate()}/${dataAtual.addDays(7).getMonth() + 1}`},
  ]
  state = {
    data: [
      { id: "00", name: "07:00" },
      { id: "01", name: "07:30" },
      { id: "02", name: "08:00" },
      { id: "03", name: "08:30" },
      { id: "04", name: "09:00" },
      { id: "05", name: "09:30" },
      { id: "06", name: "10:00" },
      { id: "07", name: "10:30" },
      { id: "08", name: "11:00" },
      { id: "09", name: "11:30" },
      { id: "10", name: "12:00" },
      { id: "11", name: "13:30" },
      { id: "12", name: "14:00" },
      { id: "13", name: "14:30" },
      { id: "14", name: "15:00" },
      { id: "15", name: "15:30" },
      { id: "16", name: "16:00" },
      { id: "17", name: "16:30" },
      { id: "18", name: "17:00" },
      { id: "19", name: "17:30" },
      { id: "20", name: "18:00" },
    ]
  };

    return (
        <SafeAreaView>
          <Text style={styles.titulo}> Boas vindas à sessão de agendamento!</Text>
          <Text style={styles.t2}>Datas e horários disponíveis</Text> 
          
          <SelectList 
            setSelected={(val) => horariosDisponiveis(val)} 
            data={data} 
            save="value"
            style={styles.dropDown}
          />

          {exibirHoras ? (
            <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => console.log(item.name)} style={styles.item}>
                  <Text style={styles.text}>{item.name}</Text>
                </Pressable>
              );
            }}
          />
          ) : null}    
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    backgroundColor: '#cc88ff',
    flexGrow: 1,
    margin: 3,
    padding: 10,
  },
  titulo: {
    color: '#000000',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
  },
  t2: {
    color: '#000000',
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'justify',
    fontSize: 18,
    // top:10,
  },
  dropDown:{
    top:50,
  },
});

export default Agenda