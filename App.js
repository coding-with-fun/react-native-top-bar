import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import {
    Appbar,
    Button,
    Menu,
    Provider as PaperProvider,
    Title,
} from "react-native-paper";

const Stack = createStackNavigator();

export default function App() {
    return (
        <PaperProvider>
            <StatusBar />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        header: (props) => <CustomNavigationBar {...props} />,
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

function CustomNavigationBar({ navigation, previous }) {
    const route = useRoute();

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Appbar.Header>
            {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} />
            ) : null}
            <Appbar.Content title={route.name} />
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action
                        icon="menu"
                        color="white"
                        onPress={openMenu}
                    />
                }
            >
                <Menu.Item
                    onPress={() => {
                        closeMenu();
                    }}
                    title="Option 1"
                />
                <Menu.Item
                    onPress={() => {
                        closeMenu();
                    }}
                    title="Option 2"
                />
                <Menu.Item
                    onPress={() => {
                        navigation.navigate(
                            route.name === "Home" ? "Details" : "Home"
                        );
                        closeMenu();
                    }}
                    title={route.name === "Home" ? "Details" : "Home"}
                />
            </Menu>
        </Appbar.Header>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View style={style.container}>
            <Title>Home Screen</Title>
            <Button
                mode="contained"
                onPress={() => navigation.navigate("Details")}
            >
                Go to details
            </Button>
        </View>
    );
}

function DetailsScreen() {
    return (
        <View style={style.container}>
            <Title>Details Screen</Title>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
