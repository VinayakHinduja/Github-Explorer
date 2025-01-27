import { useState, useLayoutEffect, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { ThemeContext } from "../context/theme-context";
import { FavouritesContext } from "../context/favourite-context";
import { fetchContributors } from "../api/apis";

import IconButton from "../components/IconButton";
import ContributorItem from "../components/ContributorItem";

function RepositoryDetails({ route, navigation }) {
  const { repository } = route.params;
  const favoriteCtx = useContext(FavouritesContext);
  const themeCtx = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [contributors, setContributors] = useState([]);

  const isFavorite = favoriteCtx.Favourites.some(
    (repo) => repo.id === repository.id
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      favoriteCtx.removeFavorite(repository.id);
    } else {
      favoriteCtx.addFavorite(repository);
    }
  };

  useEffect(() => {
    const getContributors = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchContributors(repository.contributors_url);
        setContributors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getContributors();
  }, [repository.contributors_url]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        const iconColor = themeCtx.theme == "dark" ? "white" : "gray";
        return (
          <IconButton
            size={24}
            onPress={toggleFavorite}
            color={isFavorite ? "red" : iconColor}
            icon={isFavorite ? "heart-sharp" : "heart-outline"}
          />
        );
      },
    });
  }, [navigation, toggleFavorite]);

  const renderItem = () => {
    const theme = themeCtx.theme.mode;

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={styles.loadingText}>Loading contributors...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          theme === "dark"
            ? themeCtx.theme.backgroundColor
            : themeCtx.theme.backgroundColor,
        ]}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: `${repository.owner.avatar_url}&s=80` }}
            style={styles.avatar}
          />
          <Text style={[styles.ownerName, theme === "dark" && styles.darkText]}>
            {repository.owner.login}
          </Text>
        </View>

        <Text style={[styles.repoName, theme === "dark" && styles.darkText]}>
          {repository.name}
        </Text>
        <Text
          style={[styles.repoDescription, theme === "dark" && styles.darkText]}
        >
          {repository.description || "No description available"}
        </Text>
        {repository.language && (
          <View style={styles.languageContainer}>
            <Text
              style={[
                styles.languageLabel,
                theme === "dark" && styles.darkText,
              ]}
            >
              Primary Language:
            </Text>
            <Text
              style={[styles.language, theme === "dark" && styles.darkText]}
            >
              {repository.language}
            </Text>
          </View>
        )}
        <View style={styles.repoStats}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={18} color="gold" />
            <Text
              style={[styles.statText, theme === "dark" && styles.darkText]}
            >
              {repository.stargazers_count}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="git-branch" size={18} color="gray" />
            <Text
              style={[styles.statText, theme === "dark" && styles.darkText]}
            >
              {repository.forks_count}
            </Text>
          </View>
        </View>
        <Text style={[styles.dateText, theme === "dark" && styles.darkText]}>
          Created on: {new Date(repository.created_at).toLocaleDateString()}
        </Text>
        <Text style={[styles.dateText, theme === "dark" && styles.darkText]}>
          Last updated: {new Date(repository.updated_at).toLocaleDateString()}
        </Text>
        {contributors.length > 0 ? (
          <Text
            style={[styles.sectionTitle, theme === "dark" && styles.darkText]}
          >
            Contributors:
          </Text>
        ) : (
          <Text
            style={[styles.noContributors, theme === "dark" && styles.darkText]}
          >
            No contributors available.
          </Text>
        )}
        {contributors.length > 0 &&
          contributors.map((contributor) => (
            <ContributorItem
              item={contributor}
              key={contributor.id}
              theme={theme}
            />
          ))}
      </View>
    );
  };

  return (
    <FlatList
      data={[repository]}
      renderItem={renderItem}
      keyExtractor={(index) => index.id}
    />
  );
}

export default RepositoryDetails;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
    fontWeight: "bold",
  },
  darkText: { color: "#fff" },
  errorText: { fontSize: 16, color: "red" },
  language: { fontSize: 16, color: "#555" },
  statText: { marginLeft: 5, fontSize: 16 },
  loadingText: { fontSize: 18, color: "gray" },
  ownerName: { fontSize: 18, fontWeight: "bold" },
  container: { paddingTop: 16, paddingHorizontal: 16 },
  repoStats: { flexDirection: "row", marginBottom: 16 },
  dateText: { fontSize: 14, color: "#777", marginBottom: 16 },
  languageContainer: { flexDirection: "row", marginBottom: 16 },
  repoName: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  noContributors: { fontSize: 16, color: "#666", marginBottom: 16 },
  repoDescription: { fontSize: 16, color: "#666", marginBottom: 16 },
  languageLabel: { fontSize: 16, fontWeight: "bold", marginRight: 8 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  statItem: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
