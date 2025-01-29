import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { router } from "expo-router";
import { createPaymentIntent } from "@/services/stripeService";
import { Button, Text } from "react-native-paper";

const currency = "thb";
const amount = "12,000";

export default function HomeScreen() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleProceedToPay = async () => {
    if (!email) {
      alert("Please fill email!");
      return;
    }

    setLoading(true);

    try {
      // Call your backend to create a Payment Intent and get the client secret
      const { clientSecret } = await createPaymentIntent(
        amount,
        currency,
        email
      );

      // Navigate to the next page with the clientSecret
      router.push({ pathname: "/payment", params: { clientSecret, email } });
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>eSim Payment</Text>
      <TextInput
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleProceedToPay}
        disabled={loading}
        style={styles.button}
      >
        Proceed to Pay {amount} {currency}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6200ee",
  },
  input: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
});
