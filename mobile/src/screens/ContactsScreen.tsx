import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Play, Shield, ChevronLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ContactsScreen({ navigation }: any) {
    const { t } = useTranslation();

    const contacts = [
        { id: 1, name: 'María García', relation: 'Compañera de trabajo', color: '#6366f1' },
        { id: 2, name: 'Juan Pérez', relation: 'Hermano', color: '#8b5cf6' },
        { id: 3, name: 'Sofia Rodriguez', relation: 'Amiga', color: '#06b6d4' },
        { id: 4, name: 'Carlos Díaz', relation: 'Jefe', color: '#f59e0b' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-brand-dark">
            <View className="px-6 pt-6 pb-4 flex-row items-center border-b border-slate-800 gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center">
                    <ChevronLeft color="#cbd5e1" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">{t('contacts.title')}</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                <Text className="text-slate-400 mb-8 text-base">{t('contacts.desc')}</Text>

                <View className="gap-4">
                    {contacts.map((contact, index) => (
                        <Animated.View key={contact.id} entering={FadeInDown.delay(index * 100)}>
                            <TouchableOpacity className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex-row items-center gap-4">
                                <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: `${contact.color}30` }}>
                                    <Text className="font-bold text-lg" style={{ color: contact.color }}>
                                        {contact.name.charAt(0)}
                                    </Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-bold text-lg mb-1">{contact.name}</Text>
                                    <Text className="text-slate-400 text-sm">{contact.relation}</Text>
                                </View>
                                <View className="w-10 h-10 rounded-full bg-brand-primary/20 items-center justify-center">
                                    <Play color="#6366f1" size={18} fill="#6366f1" />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                <Animated.View entering={FadeInDown.delay(600)} className="mt-12 bg-[#2dd4bf]/10 p-6 rounded-3xl border border-[#2dd4bf]/20 items-center">
                    <Shield color="#2dd4bf" size={32} className="mb-4" />
                    <Text className="text-white font-bold text-lg text-center mx-4 mb-2">Recuerda</Text>
                    <Text className="text-[#2dd4bf] text-center mb-6 leading-relaxed">
                        Tus calificaciones son 100% anónimas y no enviarán notificaciones directas al calificar.
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Rating')}
                        className="bg-[#2dd4bf] py-4 px-8 rounded-full shadow-lg shadow-[#2dd4bf]/30"
                    >
                        <Text className="text-slate-900 font-bold">{t('contacts.start')}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
