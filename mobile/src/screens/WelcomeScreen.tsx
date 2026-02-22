import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Hexagon, Shield, Users, ArrowRight, Smartphone, Globe } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen({ navigation }: any) {
    const { t, i18n: i18nInstance } = useTranslation();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    // Avoid Hydration issues or render until i18n is initialized
    if (!i18nInstance.isInitialized) {
        return (
            <View className="flex-1 bg-brand-dark items-center justify-center">
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    const changeLanguage = (lang: string) => {
        i18nInstance.changeLanguage(lang);
        setIsLangMenuOpen(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-brand-dark">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-12">
                {/* Header */}
                <Animated.View entering={FadeInUp.delay(200).duration(800)} className="flex-row items-center justify-between mb-12 relative z-50">
                    <View className="flex-row items-center gap-2">
                        <View className="w-10 h-10 bg-brand-primary rounded-xl items-center justify-center">
                            <Hexagon color="white" size={20} fill="rgba(255,255,255,0.2)" />
                        </View>
                        <Text className="text-2xl font-bold text-white tracking-tighter">{t('app.name')}</Text>
                    </View>

                    <View className="flex-row items-center gap-4">
                        {/* Lang Menu */}
                        <View className="relative">
                            <TouchableOpacity
                                onPress={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="w-10 h-10 items-center justify-center bg-slate-800 rounded-full"
                            >
                                <Globe color="#cbd5e1" size={20} />
                            </TouchableOpacity>

                            {isLangMenuOpen && (
                                <Animated.View entering={FadeInUp.duration(200)} className="absolute right-0 top-12 bg-slate-800 rounded-xl p-2 w-32 shadow-xl border border-slate-700">
                                    <TouchableOpacity onPress={() => changeLanguage('es')} className="p-3 border-b border-slate-700/50">
                                        <Text className={`text-center ${i18nInstance.language.includes('es') ? 'text-brand-accent font-bold' : 'text-slate-300'}`}>{t('lang.es')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => changeLanguage('en')} className="p-3">
                                        <Text className={`text-center ${i18nInstance.language.includes('en') ? 'text-brand-accent font-bold' : 'text-slate-300'}`}>{t('lang.en')}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            )}
                        </View>
                        <Smartphone color="#6366f1" size={24} />
                    </View>
                </Animated.View>

                {/* Hero */}
                <Animated.View entering={FadeInDown.delay(400).duration(800)} className="mb-16 z-10">
                    <Text className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-2">
                        {t('app.slogan')}
                    </Text>
                    <Text className="text-4xl font-extrabold text-white leading-tight mb-4">
                        {t('hero.title1')}{"\n"}
                        <Text className="text-brand-accent">{t('hero.title2')}</Text>
                    </Text>
                    <Text className="text-lg text-slate-400 leading-relaxed">
                        {t('hero.description')}
                    </Text>
                </Animated.View>

                {/* Action Button */}
                <Animated.View entering={FadeInDown.delay(600).duration(800)} className="mb-16 z-10">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Wizard')}
                        className="bg-brand-primary p-5 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
                    >
                        <Text className="text-white font-bold text-lg">{t('button.start')}</Text>
                        <ArrowRight color="white" size={20} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Features Preview */}
                <View className="gap-6 mb-12 z-10">
                    <FeatureCard
                        icon={<Shield color="#06b6d4" size={24} />}
                        title={t('feature1.title')}
                        description={t('feature1.desc')}
                        delay={800}
                    />
                    <FeatureCard
                        icon={<Users color="#8b5cf6" size={24} />}
                        title={t('feature2.title')}
                        description={t('feature2.desc')}
                        delay={1000}
                    />
                </View>

                {/* Footer */}
                <View className="mt-auto py-8 border-t border-slate-800/50 z-10">
                    <Text className="text-center text-slate-500 text-xs">
                        {t('footer')}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
    return (
        <Animated.View
            entering={FadeInDown.delay(delay).duration(800)}
            className="p-5 rounded-3xl bg-slate-800/30 border border-slate-700/50 flex-row items-center gap-4"
        >
            <View className="w-12 h-12 rounded-2xl bg-slate-900 items-center justify-center border border-slate-700">
                {icon}
            </View>
            <View className="flex-1">
                <Text className="text-white font-bold text-base mb-1">{title}</Text>
                <Text className="text-slate-400 text-sm leading-snug">{description}</Text>
            </View>
        </Animated.View>
    );
}
