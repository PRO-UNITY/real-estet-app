import { StyleSheet } from 'react-native';

import ApiNavigator from 'src/navigators/ApiNavigator';

export default function App() {
  return (
    <>
      <ApiNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
