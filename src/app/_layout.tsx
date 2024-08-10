import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack> 
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="preloading/index" options={{ headerShown: false }} />
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
            <Stack.Screen name="recoveryPassword/index" options={{ headerShown: false }} />
        </Stack>    
    );
}
