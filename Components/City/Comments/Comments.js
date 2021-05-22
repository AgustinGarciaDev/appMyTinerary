import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { connect } from "react-redux";
import itineraryAction from '../../../ReduxStore/Action/ItineraryAction'
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements'
import Comment from './Comment';

const Comments = (props) => {
    const [loadingComment, setLoadingComment] = useState(true)
    const { commentsPeople, setCommentsPeople, usuarioStatus } = props
    const id = props.idItinerary
    const [newComment, setNewComment] = useState({
        mensaje: "",
    })

    const commentInput = (e) => {
        setNewComment({
            ...newComment,
            mensaje: e
        })
    }



    const sendComment = async () => {
        const emptySearch = newComment.mensaje.charAt(0)
        if (props.usuarioStatus) {
            if (emptySearch === " " || newComment.mensaje === "") {
                Toast.show({
                    text1: 'Los campos deben estar completos',
                    type: 'error',
                    position: 'bottom',
                });
            } else {
                console.log(newComment)
                setLoadingComment(false)
                const response = await props.addComment({ mensaje: newComment.mensaje, token: usuarioStatus.token }, id)
                setCommentsPeople(response)
                setLoadingComment(true)
                setNewComment({
                    ...newComment,
                    mensaje: ""
                })
            }
        } else {
            Toast.show({
                text1: 'You must be logged in to comment',
                type: 'error',
                position: 'bottom',
            });
        }
    }

    const deleteComment = async (idComentario, email) => {
        if (props.usuarioStatus) {
            if (email === props.usuarioStatus.name) {
                const respuesta = await props.borrarComentario(idComentario, id)
                setCommentsPeople(respuesta)
                Toast.show({
                    text1: 'Comment deleted successfully',
                    type: 'sucess',
                    position: 'bottom',
                });

            }
        }
    }

    const editComment = async (idComentario, comment, email) => {
        if (email === props.usuarioStatus.name) {
            const respuesta = await props.editarComentario(id, idComentario, comment)
            setCommentsPeople(respuesta)
        }
    }

    return (

        <View>
            {commentsPeople.map(comment => <Comment key={comment._id} comment={comment} editComment={editComment} deleteComment={deleteComment} />)}
            {usuarioStatus &&
                <View style={styles.containerInputAndButton}>
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        onChangeText={commentInput}
                        containerStyle={styles.inputComment}
                    />
                    <Icon onPress={sendComment} name='paper-plane' type='font-awesome-5' color='#00aced' />
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({

    containerInputAndButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    inputComment: {
        width: "90%",
    }


})


const mapStateToProps = state => {
    return {
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {
    addComment: itineraryAction.addComment,
    deleteComment: itineraryAction.deleteComment,
    editComment: itineraryAction.editComment
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments)