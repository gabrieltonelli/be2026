import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInRight, FadeInDown, FadeOutLeft, FadeIn } from 'react-native-reanimated';
import { ChevronLeft, Briefcase, Heart, Smile, Users, Hexagon, ArrowRight, Star, Lock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import KaleidoscopeBackground from '../components/KaleidoscopeBackground';
import CustomAlert from '../components/CustomAlert';

const { width } = Dimensions.get('window');

export default function WizardScreen({ navigation }: any) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [selectedAmbits, setSelectedAmbits] = useState<string[]>([]);
    const [workspaceCode, setWorkspaceCode] = useState("");

    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        title: '',
        message: '',
        type: 'info' as 'error' | 'success' | 'info'
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const nextStep = () => {
        if (step === 1 && !isAuthenticated) {
            setAlertConfig({
                visible: true,
                title: t('wizard.login.required.title'),
                message: t('wizard.login.required.desc'),
                type: 'error'
            });
            return;
        }
        if (step === 2 && selectedAmbits.length === 0) {
            setAlertConfig({
                visible: true,
                title: t('wizard.ambits.required.title'),
                message: t('wizard.ambits.required.desc'),
                type: 'error'
            });
            return;
        }

        if (step < 4) setStep(step + 1);
        else navigation.navigate('Contacts');
    };

    const handleLogin = () => {
        // Simular login con Firebase
        setIsAuthenticated(true);
        nextStep();
    }

    const getPalette = () => {
        switch (step) {
            case 1: return 'cosmicInk';
            case 2: return 'horizonShift';
            case 3: return 'filteredReality';
            case 4: return 'desertBloom';
            default: return 'cosmicInk';
        }
    };

    const AmbitButton = ({ id, icon: Icon, label, color }: any) => {
        const isSelected = selectedAmbits.includes(id);
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedAmbits(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])}
                className={`w-[47%] p-6 rounded-3xl border flex-col items-center gap-4 mb-4 shadow-2xl ${isSelected ? 'border-indigo-500/50' : 'bg-slate-900/40 border-slate-800'}`}
            >
                {isSelected ? (
                    <LinearGradient
                        colors={[`${color}40`, `${color}10`]}
                        className="absolute inset-0 rounded-3xl"
                    />
                ) : null}
                <View className={`w-14 h-14 rounded-2xl items-center justify-center border ${isSelected ? 'bg-white/10 border-white/20' : 'bg-slate-800/80 border-slate-700/50'}`}>
                    <Icon size={28} color={isSelected ? color : '#64748b'} />
                </View>
                <Text className={`font-black text-sm tracking-widest uppercase ${isSelected ? 'text-white' : 'text-slate-500'}`}>{label}</Text>
                {isSelected && (
                    <View className="absolute top-3 right-3 w-5 h-5 bg-indigo-500 rounded-full items-center justify-center">
                        <Text className="text-white text-[10px] font-bold">✓</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-[#050810]">
            {/* Background Kaleidoscope Effect */}
            <View className="absolute inset-0 z-0">
                <KaleidoscopeBackground palette={getPalette() as any} />
                <View className="absolute inset-0 bg-black/40" />
            </View>

            {/* Custom Header */}
            <View className="px-6 pt-4 pb-4 flex-row justify-between items-center z-50">
                <TouchableOpacity
                    onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}
                    className="w-11 h-11 bg-slate-900/80 rounded-xl items-center justify-center border border-slate-800 shadow-xl"
                >
                    <ChevronLeft color="#94a3b8" size={24} />
                </TouchableOpacity>

                <View className="bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800/50">
                    <Text className="text-brand-accent font-black tracking-[3px] text-[10px] uppercase">
                        {step}/4 • {t('app.name')}
                    </Text>
                </View>

                <View className="w-11" />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-6 pb-40 z-10">
                {step === 1 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-indigo-500/20 rounded-[2rem] items-center justify-center mb-8 border border-indigo-500/30">
                            <Users color="#818cf8" size={32} />
                        </View>
                        <Text className="text-4xl font-black text-white mb-3 tracking-tighter leading-none">{t('wizard.login.title')}</Text>
                        <Text className="text-slate-400 mb-10 text-lg font-medium leading-relaxed">{t('wizard.login.desc')}</Text>

                        <View className="gap-4">
                            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin} className="bg-[#1877F2]/90 p-5 rounded-[2rem] flex-row items-center justify-center gap-3 border-b-4 border-[#0e5cad]">
                                <Text className="text-white font-black text-lg tracking-tight">{t('wizard.login.facebook')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin} className="bg-white p-5 rounded-[2rem] flex-row items-center justify-center gap-3 border-b-4 border-slate-300">
                                <Text className="text-slate-900 font-black text-lg tracking-tight">{t('wizard.login.google')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}

                {step === 2 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-purple-500/20 rounded-[2rem] items-center justify-center mb-8 border border-purple-500/30">
                            <Hexagon color="#a855f7" size={32} />
                        </View>
                        <Text className="text-4xl font-black text-white mb-3 tracking-tighter leading-none">{t('wizard.ambits.title')}</Text>
                        <Text className="text-slate-400 mb-8 text-lg font-medium leading-relaxed">{t('wizard.ambits.desc')}</Text>

                        <View className="flex-row flex-wrap justify-between">
                            <AmbitButton id="laboral" label={t('wizard.ambit.laboral')} icon={Briefcase} color="#6366f1" />
                            <AmbitButton id="social" label={t('wizard.ambit.social')} icon={Users} color="#8b5cf6" />
                            <AmbitButton id="salud" label={t('wizard.ambit.health')} icon={Heart} color="#ec4899" />
                            <AmbitButton id="artistico" label={t('wizard.ambit.artistic')} icon={Smile} color="#f59e0b" />
                        </View>
                    </Animated.View>
                )}

                {step === 3 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-cyan-500/20 rounded-[2rem] items-center justify-center mb-8 border border-cyan-500/30">
                            <Lock color="#22d3ee" size={32} />
                        </View>
                        <Text className="text-4xl font-black text-white mb-3 tracking-tighter leading-none">{t('wizard.workspace.title')}</Text>
                        <Text className="text-slate-400 mb-8 text-lg font-medium leading-relaxed">
                            {t('wizard.workspace.desc')} {"\n"}
                        </Text>

                        <View className="relative mt-10">
                            <TextInput
                                className="bg-slate-900 text-white p-6 rounded-[2rem] text-xl font-black tracking-[4px] text-center border-2 border-slate-800 focus:border-cyan-500/50 shadow-2xl"
                                placeholder={t('wizard.workspace.placeholder')}
                                placeholderTextColor="#334155"
                                value={workspaceCode}
                                onChangeText={setWorkspaceCode}
                                autoCapitalize="characters"
                            />
                            <View className="absolute -top-4 left-0 right-0 items-center z-9999">
                                <View className="bg-slate-900 px-6 py-2 rounded-full border border-slate-800 shadow-2xl z-9999">
                                    <Text className="text-[11px] font-black text-cyan-400 tracking-widest uppercase">{t('wizard.workspace.badge')}</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                )}

                {step === 4 && (
                    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="flex-1">
                        <View className="w-16 h-16 bg-teal-500/20 rounded-[2rem] items-center justify-center mb-8 border border-teal-500/30">
                            <Star color="#14b8a6" size={32} />
                        </View>
                        <Text className="text-4xl font-black text-white mb-3 tracking-tighter leading-none">{t('wizard.networks.title')}</Text>
                        <Text className="text-slate-400 mb-8 text-lg font-medium leading-relaxed">{t('wizard.networks.desc')}</Text>

                        <View className="gap-4">
                            <TouchableOpacity activeOpacity={0.8} onPress={nextStep} className="bg-[#0077B5] p-5 rounded-[2rem] flex-row items-center justify-center border-b-4 border-[#045d8b]">
                                <Text className="text-white font-black text-lg">{t('wizard.networks.linkedin')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={nextStep} className="bg-slate-900 border-2 border-slate-800 p-5 rounded-[2rem] flex-row items-center justify-center border-b-4 border-slate-950">
                                <Text className="text-white font-black text-lg">{t('wizard.networks.instagram')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
            </ScrollView>

            <CustomAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={() => setAlertConfig(prev => ({ ...prev, visible: false }))}
            />

            {/* Footer Navigation - Floating Aesthetic */}
            <Animated.View entering={FadeInDown.delay(500)} className="absolute bottom-0 left-0 right-0 p-8 z-50">
                <View className="bg-slate-900/90 border border-slate-800 p-4 rounded-[2.5rem] flex-row gap-4 shadow-2xl">
                    {step > 1 && (
                        <TouchableOpacity
                            onPress={() => setStep(prev => prev - 1)}
                            className="flex-1 p-5 rounded-[1.8rem] items-center justify-center border border-slate-800"
                        >
                            <Text className="text-slate-500 font-black text-xs tracking-widest uppercase">{t('wizard.back')}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={nextStep}
                        className="flex-[2] h-16 rounded-[1.8rem] overflow-hidden shadow-lg shadow-indigo-500/30"
                    >
                        <LinearGradient
                            colors={['#6366f1', '#a855f7']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="w-full h-full items-center justify-center flex-row gap-3"
                        >
                            <Text className="text-white font-black text-base tracking-tight">{t('wizard.next')}</Text>
                            <ArrowRight color="white" size={20} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}
