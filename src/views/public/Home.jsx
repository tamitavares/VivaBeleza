import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { useFonts, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

const { width } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: require('./images/manicure.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MANICURE',
  },
  {
    coverImageUri: require('./images/pedicure.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'PEDICURE',
  },
  {
    coverImageUri: require('./images/depilacao.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'DEPILAÇÃO NA CERA',
  },
  {
    coverImageUri: require('./images/limpeza.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'LIMPEZA DE PELE',
  },
  {
    coverImageUri: require('./images/spa.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'SPA DOS PÉS',
  },
  {
    coverImageUri: require('./images/Design.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MICROPIGMENTAÇÃO DE SOBRANCELHAS',
  },
  {
    coverImageUri: require('./images/micropigmentacao.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'DESIGN DE SOBRANCELHAS',
  },
  {
    coverImageUri: require('./images/micropigmentacao-labial.jpg'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MICROPIGMENTAÇÃO LABIAL',
  },
];

const DATA1 = [
  {
    coverImageUri: require('./images/micropigmentacao-labial.jpg'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'Glow lips + Micro dos labios R$ 600,00'
  },
  {
    coverImageUri: require('./images/manicure-combo.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MANICURE + PEDICURE R$ 60,00',
  },
  {
    coverImageUri: require('./images/limp-massagem.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'LIMPEZA DE PELE + MASSAGEM RELAXANTE R$ 150,00',
  },
  {
    coverImageUri: require('./images/spa.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'PEDICURE + SPA DOS PÉS R$ 50,00',
  },
  {
    coverImageUri: require('./images/micropigmentacao.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'DESIGN DE SOBRANCELHAS + HENNA R$ 70,00',
  },
];

const Home = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold, Montserrat_600SemiBold
  });

  if(!fontsLoaded) return null;

  const renderItem = data => (
    <View
      key={data.coverImageUri}
      style={styles.cardContainer}
    >
      <View
        style={styles.cardWrapper}
      >
        <Image
          style={styles.card}
          source={data.coverImageUri}
        />
        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
          <Text style={styles.cornerLabelText}>
            { data.cornerLabelText }
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <Text style={styles.titulo}>Bem vindo!</Text>
        <Image source={require('./images/logo.png')} style={styles.imgLogo} />
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
    </View>
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
});

export default Home