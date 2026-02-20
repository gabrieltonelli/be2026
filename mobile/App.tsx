import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Hexagon, Shield, Users, Zap, ArrowRight, Smartphone } from 'lucide-react-native';
import { motion } from 'framer-motion'; // Note: Framer motion is for web, but for now we'll use standard RN/Reanimated logic
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-brand-dark">
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-12">
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(200).duration(800)} className="flex-row items-center justify-between mb-12">
          <View className="flex-row items-center gap-2">
            <View className="w-10 h-10 bg-brand-primary rounded-xl items-center justify-center">
              <Hexagon color="white" size={20} fill="rgba(255,255,255,0.2)" />
            </View>
            <Text className="text-2xl font-bold text-white tracking-tighter">Be</Text>
          </View>
          <Smartphone color="#6366f1" size={24} />
        </Animated.View>

        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="mb-16">
          <Text className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-2">
            We are perceptions
          </Text>
          <Text className="text-4xl font-extrabold text-white leading-tight mb-4">
            Descubre tu{"\n"}
            <Text className="text-brand-accent">verdadera esencia</Text>
          </Text>
          <Text className="text-lg text-slate-400 leading-relaxed">
            La red social de feedback anónimo diseñada para tu crecimiento personal.
          </Text>
        </Animated.View>

        {/* Action Button */}
        <Animated.View entering={FadeInDown.delay(600).duration(800)} className="mb-16">
          <StyledTouchableOpacity
            activeOpacity={0.8}
            className="bg-brand-primary p-5 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
          >
            <Text className="text-white font-bold text-lg">Empezar Ahora</Text>
            <ArrowRight color="white" size={20} />
          </StyledTouchableOpacity>
        </Animated.View>

        {/* Features Preview */}
        <View className="gap-6 mb-12">
          <FeatureCard
            icon={<Shield color="#06b6d4" size={24} />}
            title="Anonimato Total"
            description="Calificaciones privadas y seguras por defecto."
            delay={800}
          />
          <FeatureCard
            icon={<Users color="#8b5cf6" size={24} />}
            title="Sincronización Web"
            description="Vincula tu cuenta con la interface de escritorio."
            delay={1000}
          />
        </View>

        {/* Footer */}
        <View className="mt-auto py-8 border-t border-slate-800/50">
          <Text className="text-center text-slate-500 text-xs">
            © 2026 Be Project. Tu identidad, en perspectiva.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(800)}
      className="p-5 rounded-3xl bg-slate-800/30 border border-slate-700/50 flex-row items-center gap-4"
    >
      <View className="w-12 h-12 rounded-2xl bg-slate-900 items-center justify-center border border-slate-700">
        {icon}
      </div>
      <View className="flex-1">
        <Text className="text-white font-bold text-base mb-1">{title}</Text>
        <Text className="text-slate-400 text-sm leading-snug">{description}</Text>
      </View>
    </Animated.View>
  );
}
