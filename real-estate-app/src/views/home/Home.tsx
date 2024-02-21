import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { SearchBar } from 'react-native-elements';

import { mainColor, secondaryColor, skyColor } from '@utils';
import { HouseCard } from '@components';
import {
  getHouses,
  getHousesByCategoryFilter,
  getHousesByLocationFilter,
  getHousesByPriceFilter,
  getHousesBySqrFilter,
} from 'src/services/house/house';
import { getCategories } from 'src/services/categories/categories';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Home = ({ navigation }: any) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceSearchActive, setPriceSearchActive] = useState(false);
  const [sqr, setSqr] = useState('');
  const [houses, setHouses] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Apartment',
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: 'All',
  });

  useEffect(() => {
    getHouses().then((res) => {
      console.log(res);
      setHouses(res.results);
      setSelectedCategory({
        id: 0,
        name: 'All',
      });
    });
  }, []);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleCategoryPress = async (category: any) => {
    setSelectedCategory(category);
    try {
      const response = await getHousesByCategoryFilter(category.id);
      setHouses(response.results);
    } catch (error) {
      console.error('Error filtering houses:', error);
    }
  };

  const handleSearch = (text: string) => {
    console.log(text);
    getHousesByLocationFilter(text).then((res: any) => {
      setHouses(res.results);
    });
    setSearchQuery(text);
  };

  const handleSearchWithSqr = (text: string) => {
    console.log(text);
    setSqr(text);
    getHousesBySqrFilter(text).then((res: any) => {
      setHouses(res.results);
    });
  };

  const handlePriceSearch = () => {
    if (!priceSearchActive) {
      console.log(minPrice, maxPrice);
      getHousesByPriceFilter(`${minPrice},${maxPrice}`).then((res: any) => {
        setHouses(res.results);
        setMaxPrice('');
        setMinPrice('');
        // console.log(res.results);
        setPriceSearchActive(true);
      });
    } else {
      getHouses().then((res) => {
        setHouses(res.results);
        setPriceSearchActive(false);
      });
    }
  };

  const renderCategoryButton = ({ category, index }: any) => (
    <Pressable
      key={index}
      style={[
        styles.categoryButton,
        {
          backgroundColor:
            category.name === selectedCategory.name ? mainColor : '#fff',
          borderColor:
            category.name === selectedCategory.name
              ? mainColor
              : secondaryColor,
        },
      ]}
      onPress={() => handleCategoryPress(category)}
    >
      <Text
        style={[
          { color: category.name === selectedCategory.name ? '#fff' : '#000' },
        ]}
      >
        {category.name}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder='Search Address, City, or Postal Code'
        value={searchQuery}
        platform='default'
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
        loadingProps={{}}
        showLoading={false}
        lightTheme={false}
        round={false}
        onClear={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        // @ts-ignore
        onChangeText={(text) => handleSearch(text)}
      />
      <Text style={styles.titleText}>Filtering</Text>
      <View style={styles.priceContainer}>
        <TextInput
          style={[styles.searchInputContainer, styles.sqrInput]}
          placeholder='Sqr Ft'
          keyboardType='numeric'
          value={sqr}
          onChangeText={(text) => handleSearchWithSqr(text)}
        />

        <TextInput
          style={styles.priceInput}
          placeholder='Min price'
          keyboardType='numeric'
          value={minPrice}
          onChangeText={setMinPrice}
        />
        <TextInput
          style={styles.priceInput}
          placeholder='Max price'
          keyboardType='numeric'
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
        <Pressable style={styles.priceSearchButton} onPress={handlePriceSearch}>
          <Text style={styles.searchText}>
            {priceSearchActive ? 'Clear' : 'Search'}
          </Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        <Pressable
          style={[
            styles.categoryButton,
            {
              backgroundColor: selectedCategory.id === 0 ? mainColor : '#fff',
              borderColor:
                selectedCategory.id === 0 ? mainColor : secondaryColor,
            },
          ]}
          onPress={() => {
            setSelectedCategory({
              id: 0,
              name: 'All',
            });
            getHouses().then((res) => {
              setHouses(res.results);
            });
          }}
        >
          <Text
            style={[{ color: selectedCategory.id === 0 ? '#fff' : '#000' }]}
          >
            All
          </Text>
        </Pressable>
        {categories.map((category, index) =>
          renderCategoryButton({ category, index })
        )}
      </ScrollView>
      <FlatList
        data={houses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HouseCard navigation={navigation} item={item} />
        )}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginVertical: 8,
  },
  searchInputContainer: {
    paddingLeft: 8,
    borderRadius: 25,
    backgroundColor: skyColor,
  },
  sqrInput: {
    width: 90,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: skyColor,
    fontSize: 16,
  },
  input: {
    padding: 16,
    borderRadius: 25,
    backgroundColor: skyColor,
    marginVertical: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
  priceInput: {
    width: 90,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: skyColor,
    fontSize: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryScroll: {
    flexGrow: 0,
    height: 40,
    marginTop: 16,
  },
  categoryButton: {
    borderColor: secondaryColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    borderRadius: 22,
    marginRight: 4,
  },
  priceSearchButton: {
    padding: 7,
    backgroundColor: mainColor,
    borderRadius: 10,
  },
  searchText: {
    color: '#fff',
  },
});
