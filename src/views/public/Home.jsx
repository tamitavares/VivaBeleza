import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Carousel, { PaginationLight } from 'react-native-x-carousel';

const { width } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: require('./images/manicure.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'MANICURE E PEDICURE',
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
    cornerLabelText: 'SPA DOS PéS',
  },
  {
    coverImageUri: require('./images/Design.png'),
    cornerLabelColor: '#b71fff',
    cornerLabelText: 'DESIGN DE SOBRANCELHAS',
  },  
];

const Home = () => {
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
      <Text style={styles.titulo}>Bem vindo!</Text>
      <Image source={require('./images/logo.png')} style={styles.imgLogo} />
      <Text style={styles.t2}> Serviços Disponíveis </Text>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={DATA}
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
    top: 0,
    resizeMode:'cover',
    left: 270
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: 250
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    top: 10,
  },
  card: {
    width: width * 0.5,
    height: width * 0.5,
    alignItems: 'flex-end'
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  titulo: {
    color: '#000000',
    ////fontFamily: 'Montserrat-Bold',
    fontSize: 33,
    fontWeight: '700',
    left: 20,
    position: 'absolute',
    top: 20,
  },
  t2: {
    color: '#000000',
    ////fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    fontWeight: '500',
    left: 10,
    top: 10,
  },
});

export default Home