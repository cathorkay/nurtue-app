import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { v4 as uuid } from "uuid";

import Text from "../components/Text";
import BlueButton from "../components/BlueButton";
import Dialog from "../components/Dialog";
import IconButton from "../components/IconButton";
import OrangeButton from "../components/OrangeButton";
import PostCard from "../components/PostCard";
import TextInput from "../components/TextInput";
import Colors from "../constants/Colors";
import {
  addReply,
  deletePost,
  deleteReply,
  likePost,
  likeReply,
} from "../data/post";
import { useAppDispatch, useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";
import { Parent, Post, Reply } from "../types/state";

import { getAuth } from "firebase/auth";
import { db } from '../firebase';
import { updateDoc, setDoc, doc, getDoc, addDoc, where, getDocs, collection, DocumentData, query, FieldPath } from 'firebase/firestore';
import { getStorage, uploadBytes, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

import { Amplify, Storage } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
import { off } from "process";
Amplify.configure(awsmobile);

let replyImgURL = "";
const AWSBASE = "https://nurtue-bucket172437-nurtueenv.s3.us-west-1.amazonaws.com/public/";

const CommunityThreadScreen: React.FC<
  RootStackScreenProps<"CommunityThread">
> = ({ route }) => {
  const postId = route.params.postId;
  const fromSearch = (route.params as any).fromSearch;

  const listViewRef = useRef<FlatList>(null);
  const inputRef = useRef<RNTextInput>(null);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  
  /* switching to firebase
  const post = useAppSelector((state) =>
    state.postState.posts.find((p) => p.id === postId)
  )!;
  const user = useAppSelector((state) => state.profileState.profile.user);
  */
  const auth = getAuth();
  const user = auth.currentUser;
  const [post, setPost] = useState<DocumentData>();

  const [currentActionPost, setCurrentActionPost] = useState<
    Post | Reply | null
  >(null);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [postReported, setPostReported] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [replies, setReplies] = useState<DocumentData[]>([]);

  //get post & its replies from firebase (michael)
  useEffect(() => {
    getDoc(doc(db, "posts", postId)).then((docSnap) => {
      setPost(docSnap.data());
      const newReplies: DocumentData[] = [];
      docSnap.data().replies.forEach(rId => {
        getDoc(doc(db, "replies", rId)).then(rSnap => {
          newReplies.push(rSnap.data());
          setReplies([...newReplies]);
        })
      });
    });
  }, [postId]);

  useEffect(() => {
    if(post){
      const newReplies: DocumentData[] = [];
      post.replies.forEach(rId => {
        getDoc(doc(db, "replies", rId)).then(rSnap => {
          newReplies.push(rSnap.data());
          setReplies([...newReplies]);
        })
      });
    }
  }, [post]);

  const handleMorePress = (post: Post | Reply) => {
    setCurrentActionPost(post);
    setActionMenuVisible(true);
  };

  const handleMoreClose = () => {
    setActionMenuVisible(false);
  };

  const handleModalHide = () => {
    setCurrentActionPost(null);
    setPostReported(false);
  };

  const handleReport = () => {
    if (!postReported) {
      setPostReported(true);
    }
  };

  //update fireabse when liked (michael)
  const handleLikePost = () => {
    let likers = post.likers;
    let loc = likers.indexOf(user.uid);

    if(loc != -1){
      console.log("unlike");
      let temp = likers[loc];
      likers[loc] = likers[0];
      likers[0] = temp;
      likers.shift();
    }else{
      console.log("like");
      likers.push(user.uid);
    }

    const newPost = post;
    newPost.likeCount = likers.length;
    newPost.likers = likers;
    setPost({...newPost});

    updateDoc(doc(db, "posts", postId), {
      likeCount: likers.length,
      likers: likers,
    });

    /*dispatch(
      likePost({
        postId,
        userId: user.id,
      })
    );*/
  };

  const handleDeletePost = (postId: string) => {
    handleMoreClose();
    setTimeout(() => {
      navigation.goBack();
      setTimeout(() => {
        dispatch(
          deletePost({
            postId,
          })
        );
      }, 1000);
    }, 500);
  };

  //update firebase (michael)
  const handleLikeReply = (replyId: string) => {
    console.log(replyId);
    getDoc(doc(db, "replies", replyId)).then((snapshot => {
      let reply = snapshot.data();
      let likers = reply.likers;
      let loc = likers.indexOf(user.uid);

      if(loc != -1){
        console.log("unlike");
        let temp = likers[loc];
        likers[loc] = likers[0];
        likers[0] = temp;
        likers.shift();
      }else{
        console.log("like");
        likers.push(user.uid);
      }

      const newReplies: DocumentData[] = replies;
      let i = newReplies.findIndex((r => r.id === replyId));
      newReplies[i].likeCount = likers.length;
      newReplies[i].likers = likers;
      setReplies([...newReplies]);

      updateDoc(doc(db, "replies", replyId), {
        likeCount: likers.length,
        likers: likers,
      });
    }));


    /*dispatch(
      likeReply({
        postId,
        replyId,
        userId: user.id,
      })
    );*/
  };

  const handleImagePick = async () => {
    if (image) {
      setImage("");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      let path = result.uri;
      let fileName = result.fileName + uuid();
      setImage(path);
      if(fileName) setImageName(fileName);
    }
  };

  const handleImageDelete = () => {
    setImage("");
  };

  //upload img to firebase (michael) - no longer used
  async function imgToFirebase(){
    const storage = getStorage();
    const storageRef = ref(storage, `replies/${imageName}`);

    const img = await fetch(image);
    const blob = await img.blob();
    const newFile = new File([blob], `${imageName}.jpeg`, { // Going from blob -> File due to Firebase SDK v9.3.0+ bug.
      type: "image/jpeg",
    });      

    console.log(imageName, newFile);

    console.log("uploading image");
    const uploadTask = uploadBytesResumable(storageRef, newFile);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log('Storage error', error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          replyImgURL = downloadURL;
        });
      }
    );
  }

  async function imgToAWS(){
    const img = await fetch(image)
    const blob = await img.blob()
  
    console.log("uploading to aws...");
  
    //aws amplify
    await Storage.put(imageName, blob, {
      level: "public",
      contentType: 'image/jpeg',
      progressCallback(progress){
        console.log(parseInt((progress.loaded / progress.total) * 100));
      },
    })
    .then((response) => {
      console.log("upload complete, ", response.key);
    })
    .catch((error ) => {
      console.log(error);
    });
  }
  
  //upload reply to firebase (michael)
  async function uploadReplytoFirebase(){
    console.log("upload post to firebase");
    var replyID = uuid();
    let authorSnap = await getDoc(doc(db, "users", user.uid));
    let userTemp = authorSnap.data();
    userTemp['id'] = user.uid;

    let imgLocation = "";

    if(image){
      imgToAWS();
      //await imgToFirebase();
      imgLocation = AWSBASE + imageName;
    }

    try {
      setDoc(doc(db, 'replies', replyID), {
        id: replyID,
        author: userTemp,
        content: replyText,
        image: imgLocation,
        likeCount: 0,
        likers: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    } catch (err) {
      alert(err);
    }    

    //add reply to the post
    const postRef = doc(db, 'posts', post.id);
    const newReplies = post.replies;
    newReplies.push(replyID);

    updateDoc(postRef, {
        replies: newReplies,
    })
  }

  const handleAddReply = () => {
    console.log("uploading reply");
    uploadReplytoFirebase();


    /*dispatch(
      addReply({
        postId,
        reply: {
          id: uuid(),
          author: {
            ...(user as Parent),
          },
          content: replyText,
          image,
          likeCount: 0,
          likers: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
    );
    */
    setImage("");
    setReplyText("");
    Keyboard.dismiss();
    setTimeout(() => {
      listViewRef.current?.scrollToEnd();
      listViewRef.current?.scrollToOffset({ offset: 10000 });
    }, 500);
  };

  const handleDeleteReply = (replyId: string) => {
    dispatch(
      deleteReply({
        postId,
        replyId,
      })
    );
    handleMoreClose();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          style={{
            marginLeft: 10,
          }}
          name="chevron-left"
          size={36}
          color={Colors.bluegreen}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation]);

  const renderPostCard: ListRenderItem<Reply> = ({ item }) => (
    <PostCard
      style={styles.postCard}
      preview={false}
      post={item}
      liked={item.likers.includes(user.id)}
      onLike={() => handleLikeReply(item.id)}
      onMore={() => handleMorePress(item)}
    />
  );

  //console.log(post);
  if(post !== undefined){
  return (
    <>
      <FlatList
        ref={listViewRef}
        style={styles.list}
        contentContainerStyle={{
          marginTop: -20,
          paddingBottom: insets.bottom + 90,
        }}
        data={replies}
        ListHeaderComponent={
          <PostCard
            post={post}
            liked={post.likers.includes(user.id)}
            onLike={handleLikePost}
            onReply={() => inputRef.current?.focus()}
            onMore={() => handleMorePress(post)}
          />
        }
        renderItem={renderPostCard}
        keyExtractor={(item) => item.id}
        onScrollBeginDrag={() => inputRef.current?.blur()}
      />
      <KeyboardAvoidingView
        style={styles.inputAreaContainer}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={fromSearch ? 82 : 60}
      >
        <View
          style={[
            styles.inputArea,
            {
              paddingBottom: 10 + insets.bottom,
            },
          ]}
        >
          {image ? (
            <View>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.imageDeleteButtonContainer}>
                <IconButton
                  style={styles.imageDeleteButton}
                  name="close"
                  size={12}
                  color="white"
                  onPress={handleImageDelete}
                />
              </View>
            </View>
          ) : (
            <IconButton
              name="image-plus"
              size={28}
              color={Colors.greengrey}
              onPress={handleImagePick}
            />
          )}
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder="Add a reply..."
            placeholderTextColor={Colors.greengrey}
            multiline
            value={replyText}
            onChangeText={setReplyText}
          />
          <OrangeButton
            disabled={!replyText}
            textContainerStyle={styles.postButton}
            onPress={handleAddReply}
          >
            Post
          </OrangeButton>
        </View>
      </KeyboardAvoidingView>
      <Dialog
        isVisible={actionMenuVisible}
        type="success"
        title="Actions"
        onBackdropPress={handleMoreClose}
        onModalHide={handleModalHide}
      >
        {currentActionPost?.author.name === user.name ? (
          <BlueButton
            textStyle={styles.actionButtonText}
            style={styles.actionButton}
            onPress={() =>
              (currentActionPost as Post).title
                ? handleDeletePost(currentActionPost.id)
                : handleDeleteReply(currentActionPost.id)
            }
          >
            Delete
          </BlueButton>
        ) : (
          <BlueButton
            textStyle={styles.actionButtonText}
            style={styles.actionButton}
            selected={postReported}
            onPress={handleReport}
          >
            {postReported ? "Reported!" : "Report"}
          </BlueButton>
        )}
      </Dialog>
    </>
  );
  }else{
    //loading post animation or some kind?
    return(
      <Text>Loading post...</Text>
    )
  }
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
    paddingTop: 40,
  },
  postCard: {
    marginTop: 15,
  },
  inputAreaContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  inputArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 20,
    maxHeight: 100,
  },
  postButton: {
    paddingHorizontal: 16,
    minHeight: 32,
  },
  actionButton: {
    marginVertical: 3,
  },
  actionButtonText: {
    paddingVertical: 8,
  },
  image: {
    height: 28,
    width: 28,
    borderRadius: 6,
  },
  imageDeleteButton: {},
  imageDeleteButtonContainer: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: Colors.grey,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommunityThreadScreen;
