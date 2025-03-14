import React from "react";
import { Text, View, Button, StyleSheet, ImageBackground } from "react-native";
import { NavigationProp } from "@react-navigation/native";

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <ImageBackground 
      source={require("../../assets/sad.png")} 
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* <Text style={styles.title}>Home Screen</Text> */}

        <Button 
         style={styles.Buttons}
          title="Go to List Student" 
          onPress={() => navigation.navigate("ListStudent")} 
        />
        <View style={{ borderRadius: 10, overflow: 'hidden' }}>
          <Button 
            title="Go to List Courses" 
            onPress={() => navigation.navigate("ListCourse")} 
            color="green"
          />
        </View>
        
        <View style={styles.btnDetails}>
          <Button 
            title="About Us" 
            onPress={() => navigation.navigate("Details")} 
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the image covers the entire screen
    width: "100%",
    height: "100%",
    justifyContent: "center", // Centers children vertically
    alignItems: "center", // Centers children horizontally
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    paddingBottom: 20,
    color: "white", // Ensures text is visible over the background
  },
  btnDetails: {
    marginTop: 420,
  },

  Buttons: {
    width: 300,
    height: 50,
    borderRadius: 10,
  },
});
