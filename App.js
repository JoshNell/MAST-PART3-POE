import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';




import {
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    width,
    height,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
import { useState, useEffect } from "react";


function HomeScreen() {
  const route = useRoute();
  const { book, author, pages, genre, totalpages } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.horisontalLayout}>
          <TextInput
            style={styles.placeholderTextAuthor}
            placeholder={`Book Title: ${book}`}
          />
        </View>
        <View style={styles.horisontalLayout}>
          <TextInput
            style={styles.placeholderTextAuthor}
            placeholder={`Author: ${author}`}
          />
        </View>
        <View style={styles.horisontalLayout}>
          <TextInput
            style={styles.placeholderTextAuthor}
            placeholder={`Genre: ${genre}`}
          />
        </View>
        <View style={styles.horisontalLayout}>
          <TextInput
            style={styles.placeholderTextPagesRead}
            placeholder={`No. of Pages Read: ${pages}`}
          />
        </View>
        <Image
          style={{
            resizeMode: 'cover',
            height: 200,
            width: 150,
            marginLeft: 10,
          }}
          source={require('./Images/richdadpoordad.jpg')}
        />
        <View style={styles.horisontalLayout}>
          <TextInput
            style={styles.placeholderTotaltPagesRead}
            placeholder={`Total Pages Read: ${totalpages} `}
          />
        </View>
        
      </View>
    </SafeAreaView>
  );
}

import {  Button } from 'react-native';


const AddBookScreen = () => {
  const navigation = useNavigation();

  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const [bookTitles, setBookTitles] = useState([]);

  const handleBook = () => {
    const newTotalPages = totalPagesRead + Number(pagesRead);
    setTotalPagesRead(newTotalPages);

    const updatedBookTitles = [bookTitle, ...bookTitles]; 
    setBookTitles(updatedBookTitles);

    navigation.navigate('History', { bookTitles: updatedBookTitles });

    navigation.navigate('Home', {
      book: bookTitle,
      author: bookAuthor,
      pages: pagesRead,
      totalpages: newTotalPages,
      genre: selectedGenre,
    });
  };

  return (
  <SafeAreaView style={styles.container}>  
   
    <View style={styles.content}>
      <Text style={styles.title}>Add Book</Text>
    <View style={styles.horisontalLayout}>
    
    
    
      <TextInput
        placeholder="Book Title"
        style={[styles.placeholderTextAuthor, { marginBottom: 30 }]}
        value={bookTitle}
        onChangeText={(text) => setBookTitle(text)}
      />
      <TextInput
        placeholder="Author"
        style={[styles.placeholderTextAuthor, { marginBottom: 30 }]}
        value={bookAuthor}
        onChangeText={(text) => setBookAuthor(text)}
      />
      <Picker
        selectedValue={selectedGenre}
        style={[styles.placeholderTextAuthor, { height: 30, width: 200, marginBottom: 30 }]}
        onValueChange={(itemValue) => setSelectedGenre(itemValue)}


      ><Picker.Item label="Geography" value="Geography" />
        <Picker.Item label="Fiction" value="Fiction" />
        <Picker.Item label="History" value="History" />
        <Picker.Item label="Autobiography" value="Autobiography" />
        <Picker.Item label="Finance" value="Finance" />
      </Picker>
      <TextInput
        placeholder="Enter Pages Read"
        style={[styles.placeholderTextAuthor, { marginBottom: 30 }]}
        value={pagesRead}
        onChangeText={(number) => setPagesRead(number)}
      />
      
      <TouchableOpacity onPress={handleBook}>
          <View style={styles.button}>
            <Text style={styles.btnText}>Add book</Text>
          </View>
      </TouchableOpacity>
    </View>
  </View>
  </SafeAreaView>
  ) 
};

const History = ({ route }) => {
  const { bookTitles } = route.params || { bookTitles: [] };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      <View style={styles.horisontalLayout}>
        <Text style={styles.title}>History</Text>
        
          {bookTitles.map((title, index) => (
            <TextInput
              key={index}
              style={styles.placeholderTotaltPagesRead}
              placeholder={`Book Title ${index + 1}: ${title}`}
              editable={false}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

function GenreScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <Image
      style={styles.background}
      source={require('./Images/backgroundBookApp.png')}
      resizeMode="cover"
    />
    
    <View style={styles.content}>
      <Text style={styles.title2}> Genres</Text>
      
        <View style={styles.horisontalLayout}>
          <TextInput
            style={styles.placeholderText}
            placeholder="Fiction                          "
          />
        
        
          <TextInput
            style={styles.placeholderTextAuthor}
            placeholder="History                                "
          />
               
          <TextInput
            style={styles.placeholderTextGenre}
            placeholder="Finance " 
          /> 
          <TextInput
            style={styles.placeholderTextGenre}
            placeholder="Geography " 
          />  
           <TextInput
            style={styles.placeholderTextGenre}
            placeholder="Autobiography " 
          />                                
        </View>     
    </View>
  </SafeAreaView>
  );
}  


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{ tabBarIcon: makeIconRender("home") }}
  />
  <Tab.Screen
    name="Book addition"
    component={AddBookScreen}
    options={{ tabBarIcon: makeIconRender("plus") }}
  />
  <Tab.Screen
    name="History"
    component={History}
    options={{ tabBarIcon: makeIconRender("book") }}
  />
  <Tab.Screen
    name="Genre"
    component={GenreScreen}
    options={{ tabBarIcon: makeIconRender("genres") }}
  />
</Tab.Navigator>

    </NavigationContainer>
  );
}

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4d1c91',
    },
  
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
    },
  
    overflow: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  
    content: {
      alignItems: 'center',
      paddingHorizontal: 14,
    },
  
    title: {
      fontSize: 60,
      color: '#74E372',
      marginBottom: 0,
      textAlign: 'left',
      marginTop: 40,
      marginRight: 220,
      fontWeight: '700',
    },

    title2: {
      fontSize: 60,
      color: '#74E372',
      marginBottom: 0,
      textAlign: 'left',
      marginTop: 40,
      marginRight: 90,
      fontWeight: '700',
    },
  
    btnText: {
      fontSize: 24,
      color: 'black',
      fontWeight: '500',
    },
  
    button: {
      padding: 18,
      backgroundColor: '#6FE9A8',
      alignItems: 'center',
      borderRadius: 28,
      marginBottom: 20,
    },

    buttonHistory: {
      padding: 18,
      backgroundColor: '#6FE9A8',
      alignItems: 'center',
      borderRadius: 28,
      marginTop: 20,
    },

    
    horisontalLayout: {
      
      justifyContent: 'space-evenly',
      marginTop: 30,
    },

    horisontalLayoutHistory: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 30,
    },
    placeholderText: {
      fontWeight: 'bold',
      fontSize: 30,
      backgroundColor: '#D9D9D9',
      marginBottom: 10,
      marginRight: 30,
      fontWeight: '400',
    },
    placeholderTextButton: {
      fontWeight: 'bold',
      fontSize: 30,
      backgroundColor: '#D9D9D9',
      marginBottom: 30,
      marginRight: 115,
      fontWeight: '400',
    },
    placeholderTextAuthor: {
      fontWeight: 'bold',
      fontSize: 30,
      backgroundColor: '#D9D9D9',
      marginBottom: 10,
      marginRight: 50,
      fontWeight: '400',
    },
    placeholderTextGenre: {
      fontWeight: 'bold',
      fontSize: 30,
      backgroundColor: '#D9D9D9',
      marginBottom: 10,
      marginRight: 60,
      fontWeight: '300',
    },
    placeholderTextPagesRead: {
      fontWeight: 'bold',
      fontSize: 30,
      backgroundColor: '#D9D9D9',
      marginBottom: 20,
      marginRight: 95,
      fontWeight: '400',
    },
    placeholderTotaltPagesRead: {
      fontWeight: 'bold',
      fontSize: 30,
      backgroundColor: '#D9D9D9',
      marginBottom: 10,
      marginRight: 25,
      fontWeight: '400',
    },
  });

  // IEE, 2023 Mobile App Scripting MASTS5112 [POE]

