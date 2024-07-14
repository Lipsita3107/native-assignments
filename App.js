import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [page, setPage] = useState('gettingStarted');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [storedUsername, setStoredUsername] = useState('');
  const [storedPassword, setStoredPassword] = useState('');

  const handleGetStarted = () => {
    setPage('signUp');
  };

  const handleSignUp = () => {
    setStoredUsername(username);
    setStoredPassword(password);
    setUsername('');
    setPassword('');
    setEmail('');
    setPage('login');
  };

  const handleLogin = () => {
    if (username === storedUsername && password === storedPassword) {
      setPage('welcome');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setPage('gettingStarted');
  };

  const image = {URL: 'th (1).jpeg'};

const App = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  </View>
);

  let content;
  if (page === 'gettingStarted') {
    content = (
      <View style={styles.container}>
        <Text style={styles.title}>Explore more about UKiyo</Text>
        <Text style={styles.title}>Click below </Text>
        <Button title="Getting Started" color='green' onPress={handleGetStarted} />
      </View>
    );
  } else if (page === 'signUp') {
    content = (
      <View style={styles.container} >
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
        <Button title="Sign Up" color='green' onPress={handleSignUp} />
      </View>
    );
  } else if (page === 'login') {
    content = (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
        <Button title="Login" color='green' onPress={handleLogin} />
      </View>
    );
  } else if (page === 'welcome') {
    content = (
      <View style={styles.container}>
        <Text style={styles.title}>UKiyo:Welcomes you</Text>
        <Text style={styles.title}>let me take you to the transition world</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  title: {
    fontSize: 36,
    color: 'blue',
    fontWeight:'bold',
    marginBottom: 20,
    
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'blueviolet',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 20,
    color:'black',
    fontSize:10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;