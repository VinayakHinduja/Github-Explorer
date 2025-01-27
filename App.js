import { useContext } from "react";
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as SystemUI from "expo-system-ui";

import IconButton from "./src/components/IconButton";
import SearchScreen from "./src/screens/SearchScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import RepositoryDetails from "./src/screens/RepositoryDetails";

import { ThemeProvider, ThemeContext } from "./src/context/theme-context";
import FavoritesContextProvider from "./src/context/favourite-context";

const Stack = createNativeStackNavigator();
const BottomsTab = createBottomTabNavigator();

const DarkModeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const icon = theme.mode === "dark" ? "sunny-outline" : "moon";
  const iconColor = theme.mode === "dark" ? "white" : "black";

  return (
    <View style={{ marginHorizontal: 6 }}>
      <IconButton
        icon={icon}
        size={24}
        color={iconColor}
        onPress={toggleTheme}
      />
    </View>
  );
};

const BottomTabNavigator = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <BottomsTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        drawerContentStyle: {
          backgroundColor: themeCtx.theme.backgroundColor,
        },
        tabBarStyle: {
          backgroundColor: themeCtx.theme.backgroundColor,
          borderTopWidth: 0,
        },
        sceneStyle: {
          backgroundColor: themeCtx.theme.backgroundColor,
        },
        headerStyle: {
          backgroundColor: themeCtx.theme.backgroundColor,
        },
        headerTintColor: themeCtx.theme.mode === "dark" ? "#fff" : "#000",
        tabBarActiveTintColor: themeCtx.theme.mode === "dark" ? "#fff" : "#000",
      }}
    >
      <BottomsTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Search Repositories",
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
          headerRight: () => <DarkModeToggleButton />,
        }}
      />
      <BottomsTab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
          headerRight: () => <DarkModeToggleButton />,
        }}
      />
    </BottomsTab.Navigator>
  );
};

const StackNavigator = () => {
  const themeCtx = useContext(ThemeContext);

  SystemUI.setBackgroundColorAsync(themeCtx.theme.backgroundColor);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: themeCtx.theme.backgroundColor,
        },
        headerTintColor: themeCtx.theme.mode === "dark" ? "#fff" : "#000",
        contentStyle: { backgroundColor: themeCtx.theme.backgroundColor },
        cardStyle: { backgroundColor: themeCtx.theme.backgroundColor },
      }}
    >
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RepositoryDetails"
        component={RepositoryDetails}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ThemeProvider>
        <FavoritesContextProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </FavoritesContextProvider>
      </ThemeProvider>
    </>
  );
}
