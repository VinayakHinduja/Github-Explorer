import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FormatNumber } from "../util/converter";

function SearchListItem({ item, onTap, theme = "light" }) {
  const isDarkMode = theme === "dark";

  return (
    <TouchableOpacity
      style={[
        styles.repoItem,
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
      ]}
      onPress={onTap}
    >
      <Image
        source={{ uri: `${item.owner.avatar_url}&s=80` }}
        style={styles.avatar}
      />

      <View style={styles.repoInfo}>
        <View style={styles.repoDescContainer}>
          <Text
            style={[styles.repoName, { color: isDarkMode ? "#fff" : "#333" }]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.repoDescription,
              { color: isDarkMode ? "#aaa" : "#666" },
            ]}
            numberOfLines={2}
          >
            {item.description || "No description available"}
          </Text>
        </View>
        <View style={styles.repoStats}>
          <View style={styles.statItem}>
            <Ionicons
              name="star"
              size={16}
              color={isDarkMode ? "#ffd700" : "gold"}
            />
            <Text
              style={[styles.statText, { color: isDarkMode ? "#fff" : "#333" }]}
            >
              {FormatNumber(item.stargazers_count)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons
              name="git-branch"
              size={16}
              color={isDarkMode ? "#bbb" : "gray"}
            />
            <Text
              style={[styles.statText, { color: isDarkMode ? "#fff" : "#333" }]}
            >
              {FormatNumber(item.forks_count)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SearchListItem;

const styles = StyleSheet.create({
  repoInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  repoName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  repoDescContainer: {
    maxWidth: "60%",
  },
  repoDescription: {
    fontSize: 14,
  },
  repoItem: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  repoStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
  },
});
