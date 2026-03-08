import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Shield, ChevronLeft, Filter, Hexagon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRatings } from '../hooks/useRatings';

import KaleidoscopeBackground from '../components/KaleidoscopeBackground';

const { width } = Dimensions.get('window');

export default function ContactsScreen({ navigation }: any) {
    const { t } = useTranslation();
    const { contacts, loading } = useRatings();

    const getInitials = (name: string) => name ? name.charAt(0) : 'B';
    const getColor = (contact: any) => contact.color || '#6366f1';

    return (
        <SafeAreaView className="flex-1 bg-[#050810]">
            {/* Background Kaleidoscope Effect */}
            <View className="absolute inset-0 z-0">
                <KaleidoscopeBackground palette="filteredReality" />
                <View className="absolute inset-0 bg-black/40" />
            </View>

            {/* Custom Header */}
            <View className="px-6 pt-4 pb-4 flex-row justify-between items-center z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-11 h-11 bg-slate-900/80 rounded-xl items-center justify-center border border-slate-800 shadow-xl"
                >
                    <ChevronLeft color="#94a3b8" size={24} />
                </TouchableOpacity>

                <View className="bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800/50">
                    <Text className="text-brand-accent font-black tracking-[3px] text-[10px] uppercase">
                        {t('contacts.title')}
                    </Text>
                </View>

                <TouchableOpacity className="w-11 h-11 bg-slate-900/80 rounded-xl items-center justify-center border border-slate-800">
                    <Filter color="#94a3b8" size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} className="z-10">
                <View className="mb-8">
                    <Text className="text-4xl font-black text-white mb-2 tracking-tighter leading-none">
                        {t('contacts.title')}
                    </Text>
                    <Text className="text-slate-500 font-medium text-base">
                        {t('contacts.desc')}
                    </Text>
                </View>
                {loading ? (
                    <View className="items-center justify-center py-20">
                        <Hexagon color="#6366f1" size={32} />
                        <Text className="text-slate-500 font-bold tracking-widest uppercase text-[10px] mt-4">{t('common.loading')}</Text>
                    </View>
                ) : (
                    <View className="gap-5">
                        {contacts.map((contact, index) => (
                            <Animated.View key={contact.id} entering={FadeInDown.delay(index * 100).springify()}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Rating')}
                                    className="bg-slate-900/60 p-5 rounded-[2rem] border border-slate-800 flex-row items-center gap-5 shadow-2xl relative overflow-hidden"
                                >
                                    <View className="w-14 h-14 rounded-2xl items-center justify-center relative" style={{ backgroundColor: `${getColor(contact)}20` }}>
                                        <View className="absolute inset-0 border border-white/5 rounded-2xl" />
                                        <Text className="font-black text-2xl" style={{ color: getColor(contact) }}>
                                            {getInitials(contact.name)}
                                        </Text>
                                        <View className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-[#050810]" />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-white font-black text-lg leading-tight mb-1">{contact.name}</Text>
                                        <View className="flex-row items-center gap-2">
                                            <Text className="text-slate-500 font-bold text-[10px] tracking-widest uppercase">{(contact as any).source || 'MANUAL'}</Text>
                                            <View className="w-1 h-1 bg-slate-700 rounded-full" />
                                            <Text className="text-indigo-400/80 font-black text-[10px] uppercase">{(contact as any).ratings || 0} {t('rating.stats')}</Text>
                                        </View>
                                    </View>

                                    <View className="w-10 h-10 rounded-xl bg-slate-800/80 items-center justify-center border border-slate-700/50">
                                        <Play color={getColor(contact)} size={16} fill={getColor(contact)} />
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>
                )}

                {/* Privacy Card */}
                <Animated.View entering={FadeInDown.delay(600)} className="mt-12 group">
                    <LinearGradient
                        colors={['rgba(34,212,191,0.08)', 'rgba(34,212,191,0.03)']}
                        style={{ padding: 24, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(34,212,191,0.2)' }}
                    >
                        <View className="flex-row items-center gap-4 mb-4">
                            <View className="w-12 h-12 rounded-2xl bg-[#2dd4bf]/20 items-center justify-center">
                                <Shield color="#2dd4bf" size={24} />
                            </View>
                            <Text className="text-white font-black text-xl tracking-tight">{t('privacy.title')}</Text>
                        </View>
                        <Text className="text-[#2dd4bf]/80 text-[15px] font-medium leading-[22px] mb-6">
                            {t('privacy.desc')}
                        </Text>
                    </LinearGradient>
                </Animated.View>
            </ScrollView>

            {/* Floating Action Button */}
            <Animated.View entering={FadeInDown.delay(800)} className="absolute bottom-6 left-0 right-0 px-8 z-50">
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Rating')}
                    className="h-16 rounded-[1.8rem] overflow-hidden shadow-2xl shadow-indigo-500/40"
                >
                    <LinearGradient
                        colors={['#6366f1', '#a855f7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="w-full h-full items-center justify-center flex-row gap-3"
                    >
                        <Play color="white" size={20} fill="white" />
                        <Text className="text-white font-black text-base tracking-widest uppercase">{t('contacts.start')}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}
