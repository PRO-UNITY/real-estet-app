import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Direct = () => {
  return (
    <View style={styles.container}>
      <Text>Direct</Text>
    </View>
  );
};

export default Direct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
