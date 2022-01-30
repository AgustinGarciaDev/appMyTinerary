import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import Comments from "./Comments/Comments";
import Activities from "./Activities";
import { connect } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Avatar } from "react-native-elements";
import { Button } from "react-native-elements";
import ItineraryAction from "../../ReduxStore/Action/ItineraryAction";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";

const Itinerary = (props) => {
  const {
    itinerary: {
      comments,
      nombreItinerary,
      _id,
      authorName,
      duration,
      authorPic,
      hastag,
      precie,
      picBanner,
      likes,
      userLiked,
    },
  } = props;
  const [btnVisible, setBtn] = useState(false);
  const [user, setUser] = useState("");
  const [heartLike, setHeartLike] = useState(false);
  const [usersLikes, setUsersLikes] = useState(userLiked);
  const [like, setLike] = useState(likes);
  const [loadingHeart, setLoadingHeart] = useState(true);
  const [commentsPeople, setCommentsPeople] = useState(comments);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);

  const _renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.slide}>
        <ImageBackground
          source={{ uri: item }}
          style={styles.image}
        ></ImageBackground>
      </View>
    );
  };

  const changeStatusBtn = () => {
    setBtn(!btnVisible);
    setCommentsPeople(comments);
  };
  const likeBtn = async () => {
    if (props.usuarioStatus) {
      setLoadingHeart(false);
      setUser(props.usuarioStatus.name);
      const response = await props.likeHeart(_id, props.usuarioStatus.name);
      setLike(response.likes);
      setUsersLikes(response.usuariosLikes);
      setHeartLike(response.btnStatus);
      setLoadingHeart(true);
    } else {
      Toast.show({
        text1: "You must be logged in to  like an itinerary",
        type: "error",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (props.usuarioStatus) {
      if (usersLikes.includes(props.usuarioStatus.name)) {
        setHeartLike(true);
      } else {
        setHeartLike(false);
      }
    } else {
      setHeartLike(false);
    }
  }, [props.usuarioStatus]);

  const animation = React.useRef(null);
  const isFirstRun = React.useRef(true);
  React.useEffect(() => {
    if (!isFirstRun) {
      if (heartLike) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (heartLike) {
      animation.current.play(33, 63);
    } else {
      animation.current.play(0, 19);
    }
  }, [heartLike]);

  useEffect(() => {
    return function limpiando() {
      props.cleanItinerary();
    };
  }, []);

  return (
    <ScrollView style={styles.containerItinerary}>
      <View>
        <Text style={styles.titleItinerary}>{nombreItinerary}</Text>
        <View style={styles.containerHastag}>
          {hastag.map((hastag, index) => (
            <Text style={styles.hastag} key={index}>
              #{hastag}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.containerCarrusel}>
        <Carousel
          ref={(c) => {
            _carousel = c;
          }}
          data={picBanner}
          sliderWidth={500}
          itemWidth={400}
          renderItem={_renderItem}
          layout={"stack"}
          loop={true}
          autoplay={true}
          onSnapToItem={(index) => setSlider1ActiveSlide(index)}
        />
        <Pagination
          dotsLength={picBanner.length}
          containerStyle={styles.paginationContainer}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "black",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          activeDotIndex={slider1ActiveSlide}
        />
      </View>
      <View style={styles.containerUserAndName}>
        <Avatar size="large" rounded source={{ uri: authorPic }} />
        <Text style={styles.nameUser} h3>
          {authorName}
        </Text>
      </View>
      <View style={styles.containerPrecie}>
        <View style={styles.containerCash}>
          {Array(precie)
            .fill(precie)
            .map((billete, index) => (
              <Icon
                style={{ marginLeft: 10 }}
                size={35}
                key={index}
                name="money-bill-wave"
                type="font-awesome-5"
                color="#032e50"
              />
            ))}
        </View>
      </View>
      <View style={styles.containerHour}>
        <Icon size={35} name="clock" type="font-awesome-5" color="#032e50" />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontFamily: "Poppins_400Regular",
          }}
        >
          {duration} hours(Approx.)
        </Text>
      </View>
      <View style={styles.containerLike}>
        {/*  {heartLike
                    ? <Icon onPress={loadingHeart ? likeBtn : null} type='font-awesome-5' name="heart" size={35} color="red" />
                    : <Icon onPress={loadingHeart ? likeBtn : null} type='font-awesome-5' name="heart" size={35} color='#032e50' />
                } */}
        <TouchableOpacity onPress={loadingHeart ? likeBtn : null}>
          <LottieView
            ref={animation}
            style={styles.heartLottie}
            source={require("../../assets/animation/44921-like-animation.json")}
            autoPlay={false}
            loop={false}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: -20,
            fontSize: 25,
            fontFamily: "Poppins_400Regular",
          }}
        >
          {like}
        </Text>
      </View>
      <View>
        {!btnVisible && (
          <Button
            buttonStyle={styles.btnView}
            onPress={changeStatusBtn}
            title={btnVisible ? "View Less" : "View More"}
          />
        )}
      </View>
      {btnVisible && (
        <View>
          <Activities btnVisible={btnVisible} idItinerary={_id} />
          <Comments
            setCommentsPeople={setCommentsPeople}
            commentsPeople={commentsPeople}
            idItinerary={_id}
          />
          <Button
            buttonStyle={styles.btnView}
            onPress={changeStatusBtn}
            title={btnVisible ? "View Less" : "View More"}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerItinerary: {
    backgroundColor: "#fdffed",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  titleItinerary: {
    fontFamily: "Poppins_700Bold",
    fontSize: 35,
  },
  containerHastag: {
    flexDirection: "row",
    alignItems: "center",
  },
  hastag: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  containerCarrusel: {
    justifyContent: "center",
    marginLeft: -10,
  },
  containerUserAndName: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameUser: {
    marginLeft: 20,
    fontFamily: "Poppins_700Bold",
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    height: 300,
    width: "90%",
  },
  containerPrecie: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  containerCash: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerHour: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  containerLike: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
    marginLeft: -17,
  },
  coin: {
    width: "20%",
    borderRadius: 100,
    height: "20%",
  },
  buttonHeart: {
    width: "10%",
  },

  paginationContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnView: {
    backgroundColor: "#032e50",
    height: 50,
  },
  heartLottie: {
    width: 100,
    height: 100,
  },
});

const mapStateToProps = (state) => {
  return {
    usuarioStatus: state.user.usuarioStatus,
  };
};

const mapDispatchToProps = {
  likeHeart: ItineraryAction.likeHeart,
  cleanItinerary: ItineraryAction.cleanItinerary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
