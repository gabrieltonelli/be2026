import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import Animated, { FadeInRight, FadeInDown, FadeOutLeft } from 'react-native-reanimated';
import { ChevronLeft, Briefcase, Heart, Smile, Users, Hexagon, ArrowRight, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function WizardScreen({ navigation }: any) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [selectedAmbits, setSelectedAmbits] = useState<string[]>([]);
    const [workspaceCode, setWorkspaceCode] = useState("");

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
        else navigation.navigate('Contacts');
    };

    const skipStep = () => {
        nextStep();
    };

    const AmbitButton = ({ id, icon: Icon, label }: any) => {
        const isSelected = selectedAmbits.includes(id);
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedAmbits(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])}
                className={`w-[47%] p-4 rounded-xl border flex-col items-center gap-3 mb-4 transition-colors ${isSelected ? 'bg-brand-primary/20 border-brand-primary text-white' : 'bg-slate-800/50 border-slate-700/50'}`}
            >
                <Icon size={28} color={isSelected ? '#6366f1' : '#cbd5e1'} />
                <Text className={`font-semibold ${isSelected ? 'text-brand-primary' : 'text-slate-300'}`}>{label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-brand-dark">
            <View className="px-6 pt-6 pb-4 flex-row justify-between items-center border-b border-slate-800">
                <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()} className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center">
                    <ChevronLeft color="#cbd5e1" size={24} />
                </TouchableOpacity>
                <Text className="text-slate-400 font-bold tracking-widest text-xs uppercase">
                    {step}/4 - {step === 1 ? t('wizard.login.title') : step === 2 ? t('wizard.ambits.title') : step === 3 ? t('wizard.workspace.title') : t('wizard.networks.title')}
                </Text>
                <View className="w-10" />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-8 pb-32">
                {step === 1 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-brand-primary/20 rounded-2xl items-center justify-center mb-6">
                            <Users color="#6366f1" size={32} />
                        </View>
                        <Text className="text-3xl font-bold text-white mb-2">{t('wizard.login.title')}</Text>
                        <Text className="text-slate-400 mb-10 text-base">{t('wizard.login.desc')}</Text>

                        <View className="gap-4">
                            <TouchableOpacity onPress={nextStep} className="bg-[#1877F2] p-4 rounded-2xl flex-row items-center justify-center gap-3">
                                <Text className="text-white font-bold text-lg">Continuar con Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={nextStep} className="bg-white p-4 rounded-2xl flex-row items-center justify-center gap-3">
                                <Text className="text-slate-900 font-bold text-lg">Continuar con Google</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}

                {step === 2 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-[#8b5cf6]/20 rounded-2xl items-center justify-center mb-6">
                            <Hexagon color="#8b5cf6" size={32} />
                        </View>
                        <Text className="text-3xl font-bold text-white mb-2">{t('wizard.ambits.title')}</Text>
                        <Text className="text-slate-400 mb-8 text-base">{t('wizard.ambits.desc')}</Text>

                        <View className="flex-row flex-wrap justify-between">
                            <AmbitButton id="laboral" label="Laboral" icon={Briefcase} />
                            <AmbitButton id="social" label="Social" icon={Users} />
                            <AmbitButton id="salud" label="Salud" icon={Heart} />
                            <AmbitButton id="artistico" label="Artístico" icon={Smile} />
                        </View>
                    </Animated.View>
                )}

                {step === 3 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-[#06b6d4]/20 rounded-2xl items-center justify-center mb-6">
                            <Briefcase color="#06b6d4" size={32} />
                        </View>
                        <Text className="text-3xl font-bold text-white mb-2">{t('wizard.workspace.title')}</Text>
                        <Text className="text-slate-400 mb-8 text-base">{t('wizard.workspace.desc')}</Text>

                        <TextInput
                            className="bg-slate-800 text-white p-5 rounded-2xl text-lg font-mono tracking-widest text-center border border-slate-700 mb-6"
                            placeholder="EJ: BE-2026XYZ"
                            placeholderTextColor="#475569"
                            value={workspaceCode}
                            onChangeText={setWorkspaceCode}
                        />
                    </Animated.View>
                )}

                {step === 4 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-[#2dd4bf]/20 rounded-2xl items-center justify-center mb-6">
                            <Star color="#2dd4bf" size={32} />
                        </View>
                        <Text className="text-3xl font-bold text-white mb-2">{t('wizard.networks.title')}</Text>
                        <Text className="text-slate-400 mb-8 text-base">{t('wizard.networks.desc')}</Text>

                        <View className="gap-4">
                            <TouchableOpacity onPress={nextStep} className="bg-[#0077B5] p-4 rounded-2xl flex-row items-center justify-center">
                                <Text className="text-white font-bold text-lg">Conectar LinkedIn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={nextStep} className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex-row items-center justify-center">
                                <Text className="text-white font-bold text-lg">Conectar Instagram</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
            </ScrollView>

            {/* Footer Nav */}
            <Animated.View entering={FadeInDown} className="absolute bottom-0 left-0 right-0 p-6 bg-brand-dark border-t border-slate-800 flex-row gap-4">
                {step > 1 && (
                    <TouchableOpacity onPress={skipStep} className="flex-1 p-4 rounded-2xl items-center justify-center border border-slate-700">
                        <Text className="text-slate-300 font-bold">{t('wizard.skip')}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={nextStep} className="flex-[2] p-4 rounded-2xl bg-brand-primary items-center justify-center flex-row gap-2">
                    <Text className="text-white font-bold">{t('wizard.next')}</Text>
                    <ArrowRight color="white" size={18} />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}
