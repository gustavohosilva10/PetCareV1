import { Stack } from "expo-router";

export default function Layout() {  

    return (
        <Stack initialRouteName="preloading/index"> 
            <Stack.Screen name="preloading/index" options={{ headerShown: false}} />
        </Stack>    
    );
}