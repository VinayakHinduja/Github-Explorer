import { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { ThemeContext } from "../context/theme-context";
import { FavouritesContext } from "../context/favourite-context";

import SearchListItem from "../components/SearchListItem";

function FavoritesScreen({ navigation }) {
  const favoritesCtx = useContext(FavouritesContext);
  const themeCtx = useContext(ThemeContext);

  const isDarkMode = themeCtx.theme.mode === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeCtx.theme.backgroundColor },
      ]}
    >
      {favoritesCtx.Favourites.length === 0 ? (
        <View style={styles.noFavoritesContainer}>
          <Ionicons
            name="heart-outline"
            size={48}
            color={isDarkMode ? "#555" : "#ccc"}
          />
          <Text
            style={[
              styles.noFavoritesText,
              { color: isDarkMode ? "#fff" : "#555" },
            ]}
          >
            No favorites yet!
          </Text>
          <Text
            style={[
              styles.noFavoritesSubText,
              { color: isDarkMode ? "#aaa" : "#888" },
            ]}
          >
            Start adding some by tapping the star icon.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritesCtx.Favourites}
          renderItem={({ item }) => (
            <SearchListItem
              item={item}
              onTap={() =>
                navigation.navigate("RepositoryDetails", { repository: item })
              }
              theme={themeCtx.theme.mode}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noFavoritesText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  noFavoritesSubText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
