import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
const Comment = (props) => {

    const { deleteComment, editComment, comment: { userId: { email, firstName, lastName, userPic }, comment, _id } } = props
    const [changeInput, setChangeInput] = useState(false)
    const [ownerComment, setOwnerComment] = useState(false)
    const [newComment, setNewComment] = useState({
        mensaje: comment,
    })

    const commentInput = (e) => {
        setNewComment({
            ...newComment,
            mensaje: e
        })
    }

    const deleteCommentUser = () => {

        Alert.alert(
            "Delete Comment",
            "Are you sure you want to delete your comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Delete", onPress: () => deleteComment(_id, props.comment.userId.email) }
            ]
        );
    }

    const sendEditComment = () => {

        if (newComment.mensaje.length !== 0) {
            props.editComment(_id, newComment.mensaje, props.comment.userId.email)
            setChangeInput(!changeInput)
        } else {
            Toast.show({
                text1: 'Los campos deben estar completos',
                type: 'error',
                position: 'bottom',
            });
        }
    }

    useEffect(() => {
        if (props.usuarioStatus) {
            if (email === props.usuarioStatus.name) {
                setOwnerComment(!ownerComment)
            }
        }
    }, [props.usuarioStatus])

    return (
        <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
                <Image style={styles.fotoUser} source={{ uri: userPic }} />
                <Text style={{ marginLeft: 10, fontSize: 25, fontFamily: 'Poppins_400Regular' }}  >{firstName} {lastName}</Text>
            </View>
            <View>
                {changeInput
                    ? <View style={styles.containerInputAndButton}>
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={commentInput}
                            containerStyle={styles.inputComment}
                            value={newComment.mensaje}
                        />
                        <Icon onPress={sendEditComment} name='paper-plane' type='font-awesome-5' size={35} color='#032e50' />
                    </View>
                    : <Text style={{ marginLeft: 10, fontSize: 20, marginTop: 10, marginBottom: 10, fontFamily: 'Poppins_400Regular' }}>{comment}</Text>
                }
            </View>
            {
                ownerComment &&
                <View style={styles.optionComment}>
                    <Pressable onPress={() => setChangeInput(!changeInput)} >
                        <Text style={styles.buttonComment}>Edit</Text>
                    </Pressable>
                    <Pressable onPress={deleteCommentUser} >
                        <Text style={styles.buttonComment}>Delete</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    containerComment: {
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,

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
    optionComment: {
        backgroundColor: "white",
        flexDirection: 'row'
    },
    buttonComment: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5
    },

    containerInputAndButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    inputComment: {
        width: "90%",
    }


})

mapStateToProps = (state) => {
    return {
        usuarioStatus: state.user.usuarioStatus
    }
}
export default connect(mapStateToProps)(Comment)