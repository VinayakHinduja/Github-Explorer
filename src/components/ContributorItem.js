import { View, Text, Image, StyleSheet } from "react-native";

function ContributorItem({ item, theme = "light" }) {
  const isDarkMode = theme === "dark";

  return (
    <View
      style={[
        styles.contributorItem,
        { backgroundColor: isDarkMode ? "#2c2c2c" : "#f9f9f9" },
        isDarkMode && styles.shadowDark,
      ]}
    >
      <Image
        source={{ uri: `${item.avatar_url}&s=70` }}
        style={[
          styles.contributorAvatar,
          { borderColor: isDarkMode ? "#555" : "#ddd" },
        ]}
      />
      <View>
        <Text
          style={[
            styles.contributorName,
            { color: isDarkMode ? "#ffffff" : "#1a73e8" },
          ]}
        >
          {item.login}
        </Text>
        <Text
          style={[
            styles.contributorDetails,
            { color: isDarkMode ? "#aaa" : "#555" },
          ]}
        >
          Contributor
        </Text>
      </View>
    </View>
  );
}

export default ContributorItem;

const styles = StyleSheet.create({
  contributorItem: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowDark: {
    shadowColor: "#111",
    shadowOpacity: 0.3,
  },
  contributorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
  },
  contributorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  contributorDetails: {
    fontSize: 14,
  },
});
