import { StyleSheet, View, Text, Image, Dimensions, Alert, Modal, Pressable, ScrollView } from 'react-native'
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { useFonts, Montserrat_700Bold, Montserrat_600SemiBold,  Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import React, {useState} from 'react';


const { width } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: require('./../images/manicure.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MANICURE',
    description: 'Manicure é o profissional responsável pelo embelezamento e saúde das unhas das mãos, realizando cortes de unhas, cuidados da cutícula, lixamento e polimento das unhas bem como a esmaltação e decoração das mesmas.'
  },
  {
    coverImageUri: require('./../images/pedicure.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'PEDICURE',
    description: 'Pedicure é o profissional responsável pelo embelezamento e saúde das unhas dos pés, realizando cortes de unhas, cuidados da cutícula, lixamento e polimento das unhas bem como a esmaltação e decoração das mesmas.'
  },
  {
    coverImageUri: require('./../images/depilacao.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'DEPILAÇÃO NA CERA',
    description: 'A depilação com cera promove a remoção completa dos fios, por isso sua duração é maior que a da gilete.'
  },
  {
    coverImageUri: require('./../images/limpeza.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'LIMPEZA DE PELE',
    description: 'A limpeza de pele tem como objetivo remover os cravos e as impurezas, desobstruir os poros e melhorar a capacidade de absorção da pele, auxiliando na oxigenação, hidratação, nutrição e clareamento da pele.'
  },
  {
    coverImageUri: require('./../images/spa.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'SPA DOS PÉS',
    description:'O spa dos pés é um tratamento relaxante para hidratar a região dos pés de modo que voltem a parecer como os de bebês.'
  },
  {
    coverImageUri: require('./../images/Design.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MICROPIGMENTAÇÃO DE SOBRANCELHAS',
    description:'A micropigmentação é a técnica de preencher as sobrancelhas fio a fio, através de um aparelho que funciona por agulhas e estímulos de corrente elétrica.'
  },
  {
    coverImageUri: require('./../images/micropigmentacao.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'DESIGN DE SOBRANCELHAS',
    description: 'O Design consiste em remodelar as sobrancelhas com o uso da cera ou pinça, de forma a valorizar o olhar e embelezar o rosto, trazendo equilíbrio e simetria adequada.'
  },
  {
    coverImageUri: require('./../images/micropigmentacao-labial.jpg'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MICROPIGMENTAÇÃO LABIAL',
    description: 'A micropigmentação labial é um procedimento estético onde são aplicados pigmentos nos lábios, a fim de definir melhor o seu contorno, dar cor e criar um aspecto de mais volume.'
  },
];

const DATA1 = [
  {
    coverImageUri: require('./../images/micropigmentacao-labial.jpg'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'Glow lips + Micro dos labios R$ 600,00',
    description: 'O glow lips é um tratamento labial que revitaliza, hidrata e realça com naturalidade a cor dos lábios, deixando uma textura glossy. \nJá a micropigmentação labial é um procedimento estético onde são aplicados pigmentos nos lábios, a fim de definir melhor o seu contorno, dar cor e criar um aspecto de mais volume.',
  },
  {
    coverImageUri: require('./../images/manicure-combo.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MANICURE + PEDICURE R$ 60,00',
    description: 'Manicure/pedicure é o profissional responsável pelo embelezamento e saúde das unhas das mãos e dos pés, realizando cortes de unhas, cuidados da cutícula, lixamento e polimento das unhas bem como a esmaltação e decoração das mesmas.'
  },
  {
    coverImageUri: require('./../images/limp-massagem.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'LIMPEZA DE PELE + MASSAGEM RELAXANTE R$ 150,00',
    description: 'A limpeza de pele tem como objetivo remover os cravos e as impurezas, desobstruir os poros e melhorar a capacidade de absorção da pele, auxiliando na oxigenação, hidratação, nutrição e clareamento da pele.\nA massagem relaxante é uma técnica que aplica movimentos suaves utilizando apenas as mãos na musculatura do corpo, como cotovelos, punhos e antebraços, para liberação da ocitocina e ralaxamento muscular e diminuição do estresse.'
  },
  {
    coverImageUri: require('./../images/spa.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'PEDICURE + SPA DOS PÉS R$ 50,00',
    description: 'O spa dos pés é um tratamento relaxante para hidratar a região dos pés de modo que voltem a parecer como os de bebês.'
  },
  {
    coverImageUri: require('./../images/micropigmentacao.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'DESIGN DE SOBRANCELHAS + HENNA R$ 70,00',
    description:  'O Design consiste em remodelar as sobrancelhas com o uso da cera ou pinça, de forma a valorizar o olhar e embelezar o rosto, trazendo equilíbrio e simetria adequada.\nJá a Henna vem com a função de corrigir pequenas falhas, alongar e realçar as sobrancelhas.\nCom o uso dessas duas técnicas é possível obter um resultado perfeito e impactante no seu olhar!'
  },
];

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_500Medium});
  const [modalData, setModalData] = useState({})

  const touch = (infoImg) => {
    setModalVisible(true);
    setModalData(infoImg);
  }

  if(!fontsLoaded) return null;

  const renderItem = data => (
    <Pressable onPress={() => touch(data)} key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.coverImageUri}/>
        <View style={[ styles.cornerLabel, { backgroundColor: data.cornerLabelColor },]}>
          <Text style={styles.cornerLabelText}> { data.cornerLabelText } </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <Text style={styles.titulo}>Bem vindo!</Text>
          <Image source={require('./../images/logo.png')} style={styles.imgLogo} />
        </View>
        <Text style={styles.t2}> Serviços Disponíveis </Text>
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DATA}
          loop
          autoplay
        />
        <Text style={styles.t2}> Pacotes </Text>
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DATA1}
          loop
          autoplay
        />
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>{modalData?modalData.description:""}</Text>
            <Pressable
              style={[styles.button, styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  imgLogo:{
    height: 150,
    width: 150,
    resizeMode:'cover',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: 250,

  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },
  card: {
    width: width * 0.5,
    height: width * 0.5,
    alignItems: 'center'
  },
  cornerLabel: {
    position:  'relative',
    bottom: 0,
    alignItems: 'center',
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    paddingTop: 'auto',
    paddingBottom: 'auto',
    textAlign: 'justify',
  },
  titulo: {
    color: '#000000',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 33,
    left: 20,
  },
  t2: {
    color: '#000000',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
    left: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 4,
    backgroundColor: '#d886ff',
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 10,
    textAlign: 'justify',
    fontFamily: 'Montserrat_500Medium'
  },
});

export default Home