import { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import SearchListItem from "../components/SearchListItem";

import { ThemeContext } from "../context/theme-context";
import { fetchRepositories } from "../api/apis";

function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if there is more data to load

  const themeCtx = useContext(ThemeContext);

  const isDarkMode = themeCtx.theme.mode === "dark";

  const handleSearch = async (newQuery) => {
    if (!newQuery.trim()) return;

    setQuery(newQuery);
    setPage(1); // Reset to page 1 when the query changes
    setRepositories([]); // Clear current results
    setHasMore(true); // Reset to allow more results to be loaded
    fetchData(newQuery, 1); // Fetch data for the first page
  };

  const fetchData = async (query, pageNum) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchRepositories(query, pageNum);
      if (data.length < 30) {
        setHasMore(false); // No more data to load if results are fewer than perPage
      }
      setRepositories((prevRepos) => [...prevRepos, ...data]); // Append new data to current list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return; // Prevent loading if already loading or no more data
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(query, nextPage); // Fetch data for the next page
      return nextPage;
    });
  };

  const renderRepository = ({ item }) => (
    <SearchListItem
      item={item}
      onTap={() =>
        navigation.navigate("RepositoryDetails", { repository: item })
      }
      theme={themeCtx.theme.mode}
    />
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeCtx.theme.backgroundColor },
      ]}
    >
      <TextInput
        style={[
          styles.searchBar,
          {
            backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
            borderColor: isDarkMode ? "#333" : "#ddd",
            color: isDarkMode ? "#fff" : "#000",
          },
        ]}
        placeholder="Search repositories..."
        placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => {
          handleSearch(query);
          Keyboard.dismiss();
        }}
      />

      {error && (
        <Text style={[styles.error, { color: isDarkMode ? "tomato" : "red" }]}>
          {error}
        </Text>
      )}

      {loading && <ActivityIndicator size="large" color="tomato" />}

      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id + new Date().getDate}
        renderItem={renderRepository}
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListEmptyComponent={
          !loading && (
            <Text
              style={[
                query.trim() ? styles.emptyText : styles.emptyTextActive,
                { color: isDarkMode ? "#aaa" : "#666" },
              ]}
            >
              {query.trim()
                ? "No repositories found"
                : "Please enter a search query to find repositories"}
            </Text>
          )
        }
        onEndReached={loadMore} // Trigger load more when scrolled near bottom
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 32,
    textAlign: "center",
  },
  emptyTextActive: {
    fontSize: 16,
    marginTop: 32,
    fontStyle: "italic",
    textAlign: "center",
  },
  list: {
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  error: {
    textAlign: "center",
    marginVertical: 8,
  },
});
