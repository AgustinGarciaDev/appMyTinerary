import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';

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
        props.editComment(_id, newComment.mensaje, props.comment.userId.email)
        setChangeInput(!changeInput)
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
                <Text>{firstName} {lastName}</Text>
            </View>
            <View>
                {changeInput
                    ? <View style={styles.containerInputAndButton}>
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={commentInput}
                            containerStyle={styles.inputComment}
                        />
                        <Icon onPress={sendEditComment} name='paper-plane' type='font-awesome-5' color='#00aced' />
                    </View>
                    : <Text>{comment}</Text>
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