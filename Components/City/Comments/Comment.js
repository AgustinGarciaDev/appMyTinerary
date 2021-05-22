import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
const Comment = (props) => {


    const { borrarComentario, editarComentario, comment: { userId: { email, firstName, lastName, userPic }, comment, _id } } = props

    return (
        <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
                <Image style={styles.fotoUser} source={{ uri: userPic }} />
                <Text>{firstName} {lastName}</Text>
            </View>
            <Text>{comment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    containerComment: {
        backgroundColor: 'gray',
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10
    },

    containerInfoUser: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoUser: {
        height: 40,
        width: 40,
        borderRadius: 100
    },



})
export default Comment