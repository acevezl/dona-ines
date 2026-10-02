import { Text, View } from "react-native";

import { theme } from "@/styles/theme";

export default function HouseholdScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
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
    </View>
  );
}
