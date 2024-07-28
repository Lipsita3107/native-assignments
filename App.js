import React, { useReducer, createContext, useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SectionList,ScrollView, Image, ImageBackground, Switch, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Contexts and Providers
const FavoriteContext = createContext();
const CartContext = createContext();

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

const useFavorites = () => useContext(FavoriteContext);
const useCart = () => useContext(CartContext);

const FavoriteProvider = ({ children }) => {
  const [favorites, dispatchFavorites] = useReducer(favoriteReducer, []);
  const addToFavorites = (product) => dispatchFavorites({ type: 'ADD_FAVORITE', payload: product });
  const removeFromFavorites = (productId) => dispatchFavorites({ type: 'REMOVE_FAVORITE', payload: productId });
  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const addToCart = (product) => dispatchCart({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (productId) => dispatchCart({ type: 'REMOVE_FROM_CART', payload: productId });
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Sample Image
const image1 = { uri: 'https://images.rawpixel.com/image_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA5L3JtNTY5LWVsZW1lbnQtc2VjMi0wMDZfMS5qcGc.jpg' };

// Screens
const StartPage = ({ navigation }) => (
  <View style={styles.container}>
    <ImageBackground source={image1} resizeMode="cover" style={styles.image1}>
      <Text style={styles.appText}>UKiyO : a transient shopping spree</Text>
      <Button title="Getting Started" color="green" onPress={() => navigation.navigate('RegisterPage')} />
    </ImageBackground>
  </View>
);

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    if (username && password && email) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify({ username, password, email }));
        navigation.navigate('SignInPage');
      } catch (e) {
        Alert.alert('Error saving data');
      }
    } else {
      Alert.alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Sign Up" color="green" onPress={handleSignUp} />
    </View>
  );
};

const SignInPage = ({ navigation }) => {
  const [signinUsername, setSigninUsername] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user && signinUsername === user.username && signinPassword === user.password) {
        navigation.navigate('HomePage');
      } else {
        Alert.alert('Error! Please check your credentials again');
      }
    } catch (e) {
      Alert.alert('Error retrieving data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={signinUsername}
        onChangeText={setSigninUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={signinPassword}
        secureTextEntry
        onChangeText={setSigninPassword}
      />
      <Button title="Login" color="green" onPress={handleSignIn} />
    </View>
  );
};

const HomePage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prevState) => !prevState);

  return (
    <View style={[styles.container, isEnabled ? styles.lightBackground : styles.darkBackground]}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <View style={styles.switchContainer}>
        <Text>UKiyO</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
const SectionData = [
  {
    title:'Jwellery',
    data:['Rings', 'Bracelets']
  },
  { 
    title: 'WOMEN',
     data: ['Tshirts', 'Accessories']
      },
  {
     title: 'MEN',
      data: ['Jackets', 'Bags'] 
      },
  { 
    title: 'Electronics',
     data: ['Monitor', 'Sandisk'] 
     },
  
];


const ProductData = [
  {
    id: 1,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    category: "jewelery",
    image: "https://th.bing.com/th/id/OIP.JAsARiAQYuJOah6W0JgbywHaJ4?w=152&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
        rate: 4.6,
        count: 400
    }
},
{
    id: 2,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    category: "jewelery",
    image: "https://th.bing.com/th/id/OIP.v2i58n17quh0xcCVLBc8xwAAAA?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
        rate: 3.9,
        count: 70
    }
},
{
    id: 3,
    title: "White Gold Plated Princess",
    price: 9.99,
    category: "jewelery",
    image: "https://th.bing.com/th/id/OIP.ewurAk5sZIZMOd3GQataEAHaHp?w=177&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
        rate: 3,
        count: 400
    }
},
{
    id: 4,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    category: "jewelery",
    image: "https://th.bing.com/th/id/OIP.TQqlRXOHJo08hGrcMz-zAgHaHa?w=190&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
        rate: 1.9,
        count: 100
    }
},
 {
    id: 5,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    category: "men's clothing",
    image: "https://th.bing.com/th/id/OIP.iHlYxrweZv2OWvCJadxMuQHaJx?w=186&h=246&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 3.9,
      count: 120,}
    },
    {
        id: 6,
        title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        category: "men's clothing",
        image: "https://th.bing.com/th/id/OIP.iD0s8qkgpnHDrwgX93TyKgHaJQ?w=162&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 4.1,
            count: 259
        }
    },
    {
        id: 7,
        title: "Mens Cotton Jacket",
        price: 55.99,
        category: "men's clothing",
        image: "https://th.bing.com/th/id/OIP.tY3vjnWUtaIIZwSWTNMxPQHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 4.7,
            count: 500
        }
    },
    {
        id: 8,
        title: "Mens Casual Slim Fit",
        price: 15.99,
        category: "men's clothing",
        image: "https://th.bing.com/th/id/OIP.d7Yw9VM1vg9Yi1Vj6YcxZgHaJU?w=166&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 2.1,
            count: 430
        }
    },
    
    {
        id: 9,
        title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
        price: 64,
        category: "electronics",
        image: "https://th.bing.com/th/id/OIP.-hoLwRJSgthp_yR1hF2K2QHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 3.3,
            count: 203
        }
    },
    {
        id: 10,
        title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        price: 109,
        image: "https://th.bing.com/th/id/OIP.6LFxIYfuryoqqIc1NFfKOAHaFe?w=249&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 2.9,
            count: 470
        }
    },
    {
        id: 11,
        title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        price: 599,
        category: "electronics",
        image: "https://th.bing.com/th/id/OIP.qNCEzojZNKMLPpSPe5rpVAHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 2.9,
            count: 250
        }
    },
    {
        id: 12,
        title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor ",
        price: 999.99,
        category: "electronics",
        image: "https://th.bing.com/th/id/OIP.Oeny4qetZG8xtPVvLCnr3AHaFj?w=214&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 2.2,
            count: 140
        }
    },
    {
        id: 13,
        title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        price: 56.99,
        category: "women's clothing",
        image: "https://th.bing.com/th/id/OIP.hN73Ell9z-N2Or_0I-d9CwHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        rating: {
            rate: 2.6,
            count: 235
        }
    },
    
];

const ProductCard = ({ product, isFavorite, isInCart, onFavoritePress, onAddToCartPress }) => (
  <View style={styles.card}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{product.title}</Text>
      <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.cardRating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
    </View>
    <View style={styles.buttonWrapper}>
      <Button 
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={onFavoritePress}
        color={isFavorite ? '#d9534f' : '#5bc0de'}
      />
    </View>
    <View style={styles.buttonWrapper}>
      <Button 
        title={isInCart ? 'Remove from Cart' : 'Add to Cart'}
        onPress={onAddToCartPress}
        color={isInCart ? '#d9534f' : '#5bc0de'}
      />
    </View>
  </View>
);

const ProductPage = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { cart, addToCart, removeFromCart } = useCart();

  const toggleFavorite = (product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const toggleCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <Text style={styles.welcomeText}>Hello there</Text>
        {ProductData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.some((fav) => fav.id === product.id)}
            isInCart={cart.some((item) => item.id === product.id)}
            onFavoritePress={() => toggleFavorite(product)}
            onAddToCartPress={() => toggleCart(product)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.alertText}>No favorites yet</Text>
      ) : (
        <ScrollView style={styles.ScrollView}>
          <Text style={styles.welcomeText}>Favorites</Text>
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              isInCart={false}
              onFavoritePress={() => removeFromFavorites(product.id)}
              onAddToCartPress={() => {}}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.alertText}>No items in the cart</Text>
      ) : (
        <ScrollView style={styles.ScrollView}>
          <Text style={styles.welcomeText}>Cart Items</Text>
          {cart.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={false}
              isInCart={true}
              onFavoritePress={() => {}}
              onAddToCartPress={() => removeFromCart(product.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const SectionPage = () => (
  
  <View style={styles.container}>
  <View style={styles.section}>
    <SectionList
      sections={SectionData}
      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      keyExtractor={(item, index) => item + index}
    />
    </View>
  </View>
);


const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: '#694fad' }}
  >
    <Tab.Screen
      name="ProductPage"
      component={ProductPage}
      options={{
        tabBarLabel: 'Products',
        tabBarIcon: ({ color }) => <Ionicons name="bag" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="FavoritesPage"
      component={FavoritesPage}
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="CartPage"
      component={CartPage}
      options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomePage} />
    <Drawer.Screen name ="Categories" component={SectionPage} />
    <Drawer.Screen name="Shop" component={TabNavigator} />
    <Drawer.Screen name ="LogOut" component={StartPage} options={{ headerShown: false }} />
  </Drawer.Navigator>
);

const App = () => (
  <FavoriteProvider>
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage">
          <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="SignInPage" component={SignInPage} />
          <Stack.Screen name="HomePage" component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  </FavoriteProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3C3C9',
    marginBottom: 5,
  },
 appText:{
    fontSize: 50,
    color: '#06044D',
    fontWeight: 'bold',
    marginBottom: 550,
    marginLeft: 30,
    marginRight:30,

  },
  title: {
    fontSize: 30,
    color: '#A46F5D',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 30,
    color: '#6A2A13',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  usernameText: {
    fontSize: 20,
    color: '#D0720D',
    marginBottom: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  
  card: {
    flex:1,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width:'80%',
    alignItems:'center',
   // marginLeft: 120 ,
    height: '140',
    
    alignSelf:'center'
    

    
  },
  image: {
    flex:1,
    width: '15%',
    height: 100,
    marginBottom: 16,
  },


  cardContent: {
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#d9534f',
  },
  cardRating: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  ScrollView: {
    width: '100%',
    flex: 1,
  },
  item: {
    backgroundColor: '#ECC732',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  header: {
    color: '#5B3020',
    fontSize: 28,
    fontStyle:'italic',
    fontWeight: 'bold',
    backgroundColor: 'white',
    
    borderRadius: 10,
  },
  section: {
    width: '90%',
    padding: 10,
    paddingTop:40,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth:10,
    borderColor: 'white',
    height: 700,
    marginHorizontal:100,
  },

  sectionTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'italic',
    marginBottom: 10,
  },
  image1: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  lightBackground: {
    backgroundColor: '#D0B468',
    width: '100%',
  },
  darkBackground: {
    backgroundColor: '#E3C3C9',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  alertText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});
export default App;