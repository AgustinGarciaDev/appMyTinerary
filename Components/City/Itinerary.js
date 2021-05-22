import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements'
import { ScrollView, StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import Comments from './Comments/Comments'
import Activities from './Activities'
import { connect } from "react-redux";
import Carousel from 'react-native-snap-carousel';
import { Avatar } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';


const Itinerary = (props) => {
    const { itinerary: { comments, nombreItinerary, _id, authorName, duration, authorPic, hastag, precie, picBanner, offered, countryCoin, likes, userLiked } } = props
    const [btnVisible, setBtn] = useState(false)
    const [user, setUser] = useState('')
    const [heartLike, setHeartLike] = useState(false)
    const [usersLikes, setUsersLikes] = useState(userLiked)
    const [like, setLike] = useState(likes)
    const [loadingHeart, setLoadingHeart] = useState(true)
    const [commentsPeople, setCommentsPeople] = useState(comments)


    const _renderItem = ({ item, index }) => {

        return (
            <View key={index} style={styles.slide} >
                <ImageBackground source={{ uri: item }} style={styles.image}>
                </ImageBackground>
            </View>
        )
    }

    const changeStatusBtn = () => {
        setBtn(!btnVisible)
        setCommentsPeople(comments)
    }

    return (
        <ScrollView style={styles.containerItinerary}>
            <View>
                <Text style={styles.titleItinerary}>{nombreItinerary}</Text>
                <View>
                    {hastag.map((hastag, index) => <Text key={index}>#{hastag}</Text>)}
                </View>
            </View>
            <View>
                <Carousel
                    ref={(c) => { _carousel = c; }}
                    data={picBanner}
                    sliderWidth={500}
                    itemWidth={400}
                    renderItem={_renderItem}
                    layout={"stack"}
                />
            </View>
            <View>
                <Avatar rounded source={{ uri: authorPic }} />
                <Text h3>{authorName}</Text>
            </View>
            <View>
                {Array(precie).fill(precie).map((billete, index) => <Icon key={index} name='money-bill-wave' type='font-awesome-5' color='#00aced' />)}
            </View>
            <View>
                <Text>
                    <Icon name='clock' type='font-awesome-5' color='#00aced' />
                    {duration} hours(Approx.)
                </Text>
            </View>
            <View>
                <Icon type='font-awesome-5' name="heart" size={25} color="red" />
            </View>
            <View>
                {!btnVisible && <Button onPress={changeStatusBtn} title={btnVisible ? "View Less" : "View More"} />}
            </View>
            {
                btnVisible
                &&
                <View>
                    <Activities
                        btnVisible={btnVisible}
                        idItinerary={_id}
                    />
                    <Comments
                        setCommentsPeople={setCommentsPeople}
                        commentsPeople={commentsPeople}
                        idItinerary={_id}
                    />
                    <Button onPress={changeStatusBtn} title={btnVisible ? "View Less" : "View More"} />
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    containerItinerary: {
        backgroundColor: "#fdffed",
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 20
    },
    titleItinerary: {
        fontFamily: "Poppins_700Bold",
    },
    image: {
        resizeMode: "cover",
        justifyContent: "center",
        height: 300,
        width: "90%"
    },
    coin: {
        width: "20%",
        borderRadius: 100,
        height: "20%"
    },
    buttonHeart: {
        width: "10%"
    }


})

export default Itinerary