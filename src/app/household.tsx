import { router, useLocalSearchParams } from "expo-router";
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

import { SQLiteHouseholdRepository } from "@/infra/sqlite/SQLiteHouseholdRepository";
import { SQLiteHouseholdProfileRepository } from "@/infra/sqlite/SQLiteHouseholdProfileRepository";
import { SQLiteTransactionManager } from "@/infra/sqlite/SQLiteTransactionManager";

const transactionManager = new SQLiteTransactionManager();
const householdRepository = new SQLiteHouseholdRepository();
const householdProfileRepository = new SQLiteHouseholdProfileRepository();

import { CreateHousehold } from "@/usecases/household/CreateHousehold";

const createHousehold = new CreateHousehold(
  householdRepository,
  householdProfileRepository,
  transactionManager,
);

export default function HouseholdScreen() {
  const { profileId } = useLocalSearchParams<{ profileId: string }>();

  const [householdName, setHouseholdName] = useState("");

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
          Let's set up your household.
        </Text>

        <Text
          style={{
            ...theme.typography.body,
            color: theme.colors.text,
            marginTop: theme.spacing.md,
          }}
        >
          What should we call your household?
        </Text>

        <TextInput
          value={householdName}
          onChangeText={setHouseholdName}
          placeholder="Household name"
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
          disabled={householdName.trim().length === 0}
          onPress={() => {
            const now = new Date().toISOString();

            const household = {
              id: Crypto.randomUUID(),
              householdName: householdName.trim(),
              createdAt: now,
              updatedAt: now,
            };

            const resolvedHousehold = createHousehold.execute(
              household,
              profileId,
            );

            const savedRelationship =
              householdProfileRepository.getByProfileId(profileId);

            console.log("Household resolved:", resolvedHousehold);
            console.log("Relationship resolved:", savedRelationship);

            router.replace({
              pathname: "/home",
              params: {
                householdId: resolvedHousehold.id,
                householdName: resolvedHousehold.householdName,
                profileId,
              },
            });
          }}
          style={{
            alignItems: "center",
            backgroundColor:
              householdName.trim().length > 0
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
