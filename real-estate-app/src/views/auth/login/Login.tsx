import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

import { mainColor } from '@utils';
import { login } from 'src/services/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    login({ phone, password })
      .then((res) => {
        console.log(res);
        if (res) {
          AsyncStorage.setItem('token', res.access).then(() => {
            navigation.navigate('UserNavigator');
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigateToRegister = () => {
    console.log('Navigate to Register');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Let's Sign You In</Text>
        <Text style={styles.subheading}>Let us get to know you better!</Text>
      </View>
      <View style={styles.registerContainer}>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder='Phone Number'
          keyboardType='phone-pad'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
          keyboardType='default'
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <View style={styles.haveAccountContainer}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Pressable onPress={navigateToRegister}>
            <Text style={styles.linkText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: mainColor,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    color: '#979C9E',
    textAlign: 'left',
  },
  registerContainer: {
    marginTop: 30,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: mainColor,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#404446',
  },
  linkText: {
    fontSize: 16,
    color: mainColor,
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  forgotLink: {
    fontSize: 16,
    color: '#054A80',
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
