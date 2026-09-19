import { Tabs } from 'expo-router';
import { TowerControl, Layers, Sparkles } from 'lucide-react-native';
import { colors } from '@/src/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: { backgroundColor: colors.abyss, borderTopColor: colors.line },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tower',
          tabBarIcon: ({ color, size }) => <TowerControl color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="realms"
        options={{
          title: 'Realms',
          tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
