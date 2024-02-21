import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import { mainColor } from '@utils';

const HeaderTitle = ({ icons, navigation }: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.header}>
        <View style={styles.iconsContainer}>
          {icons.map((icon: any, index: any) => (
            <TouchableWithoutFeedback
              key={index}
              style={styles.iconContainer}
              onPress={() => navigation.navigate(icon.screen)}
            >
              <View style={styles.iconContainer}>
                <Icon name={icon.name} color={mainColor} size={icon.size} />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#054A80',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 8, // Adjust as needed
  },
});
