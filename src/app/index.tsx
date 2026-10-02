import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { theme } from "@/styles/theme";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";

import { SQLiteProfileRepository } from "@/infra/sqlite/SQLiteProfileRepository";
const profileRepository = new SQLiteProfileRepository();

export default function WelcomeScreen() {
  const [name, setName] = useState("");

  const canContinue = name.trim().length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            ...theme.typography.display,
            color: theme.colors.primary,
          }}
        >
          Welcome.
        </Text>

        <Text
          style={{
            ...theme.typography.body,
            color: theme.colors.text,
            marginTop: theme.spacing.md,
          }}
        >
          My name is Doña Inés.{"\n"}
          I'm here to keep your household in order.
        </Text>

        <Text
          style={{
            ...theme.typography.bodyStrong,
            color: theme.colors.text,
            marginTop: theme.spacing.xl,
          }}
        >
          First, what should I call you?
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="done"
          style={{
            ...theme.typography.body,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            marginTop: theme.spacing.md,
          }}
        />

        <Pressable
          disabled={!canContinue}
          onPress={() => {
            const now = new Date().toISOString();
            profileRepository.create({
              id: Crypto.randomUUID(),
              name: name.trim(),
              onboardingCompleted: false,
              createdAt: now,
              updatedAt: now,
            });
            // const savedProfile = profileRepository.get();
            // console.log("Saved profile:", savedProfile);
            router.replace("/household");
          }}
          style={{
            alignItems: "center",
            backgroundColor: canContinue
              ? theme.colors.primary
              : theme.colors.primaryDisabled,
            borderRadius: theme.radius.md,
            marginTop: theme.spacing.lg,
            padding: theme.spacing.md,
          }}
        >
          <Text
            style={{
              ...theme.typography.bodyStrong,
              color: theme.colors.textOnPrimary,
            }}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
