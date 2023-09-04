import React from 'react';
import { StyleSheet, Button, View, Dimensions, Text } from 'react-native';

export default function App() {
    
    return (
        <View>
            <View style={styles.retangulo}>
                <Text>VivaBeleza</Text>
                <Text>Viva a Beleza em Cada Detalhe!</Text>
            </View>
            <View>
                <View style={styles.button}>
                    <Button
                        title='Login'
                        fontFamily='Monteserat'
                        color="#fff"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title='Criar conta'
                    color="#fff"
                    />
                </View>
            </View>
        </View>
    );
}

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    retangulo: {
        minWidth: screenWidth,
        maxWidth: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        height: 550,
        flexShrink: 0,
        backgroundColor: '#D987FF'
    },
    button: {
        flewDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#D987FF'
    },
});
