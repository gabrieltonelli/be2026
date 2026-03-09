import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Users, ArrowRight, Smartphone, Globe, Zap, Sparkles } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp, FadeIn, useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import KaleidoscopeBackground from '../components/KaleidoscopeBackground';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: any) {
    const { t, i18n: i18nInstance } = useTranslation();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    // Pulse animation for the main button or logo
    const pulseValue = useSharedValue(1);

    React.useEffect(() => {
        pulseValue.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ),
            -1,
            true
        );
    }, []);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseValue.value }],
    }));

    // Avoid Hydration issues or render until i18n is initialized
    if (!i18nInstance.isInitialized) {
        return (
            <View className="flex-1 bg-[#050810] items-center justify-center">
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    const changeLanguage = (lang: string) => {
        i18nInstance.changeLanguage(lang);
        setIsLangMenuOpen(false);
    };

    return (
        <View className="flex-1 bg-[#050810] relative">
            {/* Background Kaleidoscope Effect - Full Screen */}
            <View className="absolute inset-0 z-0">
                <KaleidoscopeBackground palette="cosmicInk" />
                <View className="absolute inset-0 bg-black/40" />
            </View>

            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-8 pt-10 z-10">
                    {/* Header */}
                    <Animated.View entering={FadeInUp.delay(200).duration(800)} className="flex-row items-center justify-between mb-16 relative z-50">
                        <View className="flex-row items-center gap-3">
                            <View className="w-12 h-12 rounded-2xl items-center justify-center shadow-2xl relative overflow-hidden bg-slate-900 border border-slate-800">
                                <Image
                                    source={require('../../assets/logo/logo4.png')}
                                    style={{ width: 32, height: 32 }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text className="text-2xl font-black text-white tracking-tighter">{t('app.name')}</Text>
                        </View>

                        <View className="flex-row items-center gap-4">
                            <View className="relative">
                                <TouchableOpacity
                                    onPress={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="w-11 h-11 items-center justify-center bg-slate-900 border border-slate-800 rounded-xl shadow-xl"
                                >
                                    <Globe color="#94a3b8" size={20} />
                                </TouchableOpacity>

                                {isLangMenuOpen && (
                                    <Animated.View entering={FadeInUp.duration(200)} className="absolute right-0 top-14 bg-slate-900 rounded-2xl p-2 w-40 shadow-2xl border border-slate-800 z-[100]">
                                        <TouchableOpacity onPress={() => changeLanguage('es')} className="p-4 border-b border-slate-800/50 flex-row items-center justify-between">
                                            <Text className={`font-black text-xs tracking-widest uppercase ${i18nInstance.language.includes('es') ? 'text-indigo-400' : 'text-slate-500'}`}>{t('lang.es')}</Text>
                                            {i18nInstance.language.includes('es') && <View className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />}
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => changeLanguage('en')} className="p-4 flex-row items-center justify-between">
                                            <Text className={`font-black text-xs tracking-widest uppercase ${i18nInstance.language.includes('en') ? 'text-indigo-400' : 'text-slate-500'}`}>{t('lang.en')}</Text>
                                            {i18nInstance.language.includes('en') && <View className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />}
                                        </TouchableOpacity>
                                    </Animated.View>
                                )}
                            </View>
                        </View>
                    </Animated.View>

                    {/* Hero Content */}
                    <Animated.View entering={FadeInDown.delay(400).duration(800)} className="mb-14">
                        <View className="flex-row items-center gap-2 mb-4">
                            <View className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                                <Text className="text-indigo-400 font-black tracking-[2px] text-[10px] uppercase">
                                    {t('app.slogan')}
                                </Text>
                            </View>
                            <Sparkles color="#6366f1" size={14} />
                        </View>

                        <Text className="text-5xl font-black text-white leading-[50px] tracking-tighter mb-5">
                            {t('hero.title1')}{"\n"}
                            <Text className="text-indigo-500">{t('hero.title2')}</Text>
                        </Text>
                        <Text className="text-lg text-slate-500 font-medium leading-relaxed max-w-[90%]">
                            {t('hero.description')}
                        </Text>
                    </Animated.View>

                    {/* Action Area */}
                    <Animated.View entering={FadeInDown.delay(600).duration(800)} className="mb-14">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('Wizard')}
                            className="h-20 rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-500/40 border-b-4 border-indigo-900"
                        >
                            <LinearGradient
                                colors={['#6366f1', '#a855f7']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="w-full h-full flex-row items-center justify-center gap-4 px-8"
                            >
                                <Text className="text-white font-black text-xl tracking-tight">{t('button.start')}</Text>
                                <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
                                    <ArrowRight color="white" size={20} />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Feature Grid */}
                    <View className="gap-5 mb-16">
                        <FeatureCard
                            icon={<Shield color="#2dd4bf" size={24} />}
                            title={t('feature1.title')}
                            description={t('feature1.desc')}
                            delay={800}
                            accent="#2dd4bf"
                        />
                        <FeatureCard
                            icon={<Users color="#8b5cf6" size={24} />}
                            title={t('feature2.title')}
                            description={t('feature2.desc')}
                            delay={1000}
                            accent="#8b5cf6"
                        />
                    </View>

                    {/* Footer Section */}
                    <View className="mt-auto pb-10 items-center">
                        <View className="flex-row items-center gap-2 mb-4">
                            <View className="h-[1px] w-8 bg-slate-800" />
                            <Text className="text-slate-600 font-white text-[9px] tracking-[3px] uppercase">{t('common.trusted')}</Text>
                            <View className="h-[1px] w-8 bg-slate-800" />
                        </View>
                        <Text className="text-center text-slate-500 text-xs font-bold font-white leading-relaxed px-10 opacity-60">
                            {t('footer')}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
    accent: string;
}

function FeatureCard({ icon, title, description, delay, accent }: FeatureCardProps) {
    return (
        <Animated.View
            entering={FadeInDown.delay(delay).springify()}
            className="p-6 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 flex-row items-center gap-5 shadow-2xl relative overflow-hidden"
        >
            <View className="w-14 h-14 rounded-2xl bg-slate-900 items-center justify-center border border-slate-700/50 shadow-inner">
                {icon}
            </View>
            <View className="flex-1">
                <Text className="text-white font-black text-lg mb-1 tracking-tight">{title}</Text>
                <Text className="text-slate-500 text-[13px] font-bold leading-[18px]">{description}</Text>
            </View>
            <View className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-5" style={{ backgroundColor: accent }} />
        </Animated.View>
    );
}
