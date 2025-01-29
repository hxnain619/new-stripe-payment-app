import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { KEYS } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";

const StripeCardInput = () => {
  const { email, clientSecret } = useLocalSearchParams<{
    email: string;
    clientSecret: string;
  }>();
  const [cardDetails, setCardDetails] = useState<any>(null);
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Please enter complete card details");
      return;
    }

    try {
      // Call your backend to create a PaymentIntent and get the client secret
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: { email },
        },
      });

      if (error) {
        Alert.alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent) {
        Alert.alert("Payment successful!");
      }
    } catch (error: any) {
      Alert.alert(`Error: ${error?.message}`);
    }
  };

  return (
    <StripeProvider publishableKey={KEYS.STRIPE_PUBLISHABLE_KEY ?? ""}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Card Details</Text>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: "4242 4242 4242 4242",
            expiration: "MM/YY",
            cvc: "CVC",
          }}
          onCardChange={(cardDetails) => {
            console.log(cardDetails, "card");
            setCardDetails(cardDetails);
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
        />
        <Button
          mode="contained"
          disabled={loading}
          style={styles.button}
          onPress={handlePayPress}
        >
          Pay Now
        </Button>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    height: 50,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6200ee",
  },
});

export default StripeCardInput;
