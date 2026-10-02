import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { theme } from "@/styles/theme";

export default function HomeScreen() {
  const { householdName } = useLocalSearchParams<{
    householdName: string;
  }>();

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
        {householdName}
      </Text>
    </View>
  );
}
