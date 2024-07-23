import { Stack } from "expo-router";

import Preloading from "./preloading";

export default function Layout() {  

    return (
        <Stack initialRouteName="Preloading" screenOptions={{ headerShown: false}}>
        </Stack>
    );
}