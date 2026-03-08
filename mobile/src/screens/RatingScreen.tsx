import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Settings, LogOut, Moon, Search, Star, Hexagon, BarChart2, SkipForward, Zap, Info } from 'lucide-react-native';
import Animated, {
    FadeInDown,
    FadeIn,
    SlideInDown,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    Extrapolate,
    withSequence,
    runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

import { useRatings } from '../hooks/useRatings';
import KaleidoscopeBackground from '../components/KaleidoscopeBackground';

// Assets
const LOGO = require('../../assets/logo/logo4.png');
const EMOJI_ANGRY = require('../../assets/emojis/angry.png');
const EMOJI_SARCASTIC = require('../../assets/emojis/sarcastic.png');
const EMOJI_NEUTRAL = require('../../assets/emojis/neutral.png');
const EMOJI_SMILE = require('../../assets/emojis/smile.png');
const EMOJI_LOVE = require('../../assets/emojis/love.png');

const EMOJIS = [
    { id: 1, img: EMOJI_ANGRY, color: '#ef4444', glow: '#fb7185' },
    { id: 2, img: EMOJI_SARCASTIC, color: '#f97316', glow: '#fb923c' },
    { id: 3, img: EMOJI_NEUTRAL, color: '#94a3b8', glow: '#cbd5e1' },
    { id: 4, img: EMOJI_SMILE, color: '#84cc16', glow: '#bef264' },
    { id: 5, img: EMOJI_LOVE, color: '#ec4899', glow: '#f472b6' },
];

export default function RatingScreen({ navigation }: any) {
    const { t } = useTranslation();
    const {
        contacts,
        attributes,
        currentContactIdx,
        currentAttrIdx,
        loading,
        nextStep,
        submitRating
    } = useRatings();

    const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const contact = contacts[currentContactIdx];
    const attribute = attributes[currentAttrIdx];

    // Reanimated Shared Values
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const scale = useSharedValue(1);
    const rotateZ = useSharedValue(0);
    const tiltX = useSharedValue(0);
    const tiltY = useSharedValue(0);

    const handleNext = () => {
        setSelectedEmoji(null);
        nextStep();
    }

    // New Gesture API
    const gesture = Gesture.Pan()
        .onStart(() => {
            startX.value = translateX.value;
            startY.value = translateY.value;
            scale.value = withSpring(1.05);
        })
        .onUpdate((event) => {
            translateX.value = startX.value + event.translationX;
            translateY.value = startY.value + event.translationY;
            rotateZ.value = interpolate(event.translationX, [-width / 2, width / 2], [-10, 10]);

            // 3D Tilt effect
            tiltY.value = interpolate(event.translationX, [-width / 2, width / 2], [15, -15]);
            tiltX.value = interpolate(event.translationY, [-height / 4, height / 4], [-10, 10]);
        })
        .onEnd((event) => {
            scale.value = withSpring(1);
            tiltX.value = withSpring(0);
            tiltY.value = withSpring(0);

            if (Math.abs(event.translationX) > 120 || Math.abs(event.translationY) > 120) {
                const targetX = event.translationX > 0 ? width * 1.5 : -width * 1.5;
                const targetY = event.translationY > 0 ? height : -height;

                translateX.value = withTiming(targetX, { duration: 300 });
                translateY.value = withTiming(targetY, { duration: 300 }, () => {
                    translateX.value = 0;
                    translateY.value = height;
                    rotateZ.value = 0;
                    translateY.value = withSpring(0);
                    runOnJS(handleNext)();
                });
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                rotateZ.value = withSpring(0);
            }
        });

    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
                { rotateZ: `${rotateZ.value}deg` },
                { perspective: 1000 },
                { rotateX: `${tiltX.value}deg` },
                { rotateY: `${tiltY.value}deg` },
            ],
        };
    });

    const handleEmojiSelect = async (id: number) => {
        setSelectedEmoji(id);

        // Submit to backend
        await submitRating(id);

        // Visual feedback and auto-next
        setTimeout(() => {
            translateX.value = withTiming(0, { duration: 200 });
            translateY.value = withTiming(-height, { duration: 400 }, () => {
                // Reset card position from bottom
                translateX.value = 0;
                translateY.value = height;
                translateY.value = withSpring(0);
                runOnJS(handleNext)();
            });
        }, 600);
    };

    if (loading || !contact || !attribute) {
        return (
            <View className="flex-1 bg-[#050810] items-center justify-center">
                <View className="absolute inset-0 z-0">
                    <KaleidoscopeBackground palette="horizonShift" />
                    <View className="absolute inset-0 bg-black/40" />
                </View>
                <Animated.View entering={FadeIn} className="items-center z-10">
                    <Hexagon color="#6366f1" size={48} className="mb-4" />
                    <Text className="text-slate-500 font-bold tracking-widest uppercase text-xs">
                        {loading ? 'Sincronizando...' : 'No hay datos'}
                    </Text>
                </Animated.View>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-[#050810] relative">
                {/* Background Kaleidoscope Effect */}
                <View className="absolute inset-0 z-0">
                    <KaleidoscopeBackground palette="horizonShift" />
                    <View className="absolute inset-0 bg-black/40" />
                </View>

                {/* Header */}
                <View className="px-6 pt-4 flex-row justify-between items-center z-50">
                    <TouchableOpacity className="w-11 h-11 bg-slate-900/80 rounded-xl items-center justify-center border border-slate-800 shadow-xl overflow-hidden">
                        <Image source={LOGO} style={{ width: 24, height: 24 }} resizeMode="contain" />
                    </TouchableOpacity>

                    <View className="items-center bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800/50">
                        <Text className="text-brand-accent font-black tracking-[3px] text-[10px] uppercase">
                            {t('rating.ambit')}
                        </Text>
                    </View>

                    <View className="relative">
                        <TouchableOpacity
                            onPress={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="w-11 h-11 bg-indigo-500 rounded-xl items-center justify-center border-2 border-indigo-400/30 overflow-hidden shadow-lg shadow-indigo-500/40"
                        >
                            <LinearGradient
                                colors={['#6366f1', '#4f46e5']}
                                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}
                            >
                                <Text className="text-white font-black text-lg">G</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {isProfileMenuOpen && (
                            <Animated.View
                                entering={FadeIn.duration(200)}
                                className="absolute right-0 top-14 bg-slate-900 rounded-2xl p-4 w-56 shadow-2xl border border-slate-800 z-50"
                            >
                                <View className="border-b border-slate-800 pb-3 mb-3">
                                    <Text className="text-white font-bold text-sm">Gabriel Tonelli</Text>
                                    <Text className="text-slate-500 text-xs">contacto@be.com</Text>
                                </View>
                                <TouchableOpacity className="flex-row items-center gap-3 py-2">
                                    <Moon color="#818cf8" size={16} />
                                    <Text className="text-slate-300 text-xs font-medium">{t('profile.theme')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Welcome')} className="flex-row items-center gap-3 py-2 mt-1">
                                    <LogOut color="#ef4444" size={16} />
                                    <Text className="text-red-500 text-xs font-medium">{t('profile.logout')}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </View>
                </View>

                {/* Contact Area */}
                <View className="flex-[0.35] items-center justify-center z-10 px-8">
                    <Animated.View key={currentContactIdx} entering={FadeInDown.springify()} className="items-center">
                        <View className="w-24 h-24 rounded-full items-center justify-center mb-3 relative">
                            {/* Animated ring */}
                            <View className="absolute inset-0 border-[2px] border-slate-800/50 rounded-full" />
                            <View className="absolute inset-[-6px] border border-indigo-500/20 rounded-full" />
                            <View className="absolute inset-[-12px] border border-indigo-500/10 rounded-full" />

                            <LinearGradient
                                colors={[`${contact.avatarColor || '#6366f1'}`, `${contact.avatarColor || '#6366f1'}40`]}
                                style={{ width: '100%', height: '100%', borderRadius: 100, alignItems: 'center', justifyContent: 'center', padding: 4 }}
                            >
                                <View className="w-full h-full rounded-full bg-slate-900 items-center justify-center">
                                    <Text className="font-black text-4xl" style={{ color: contact.avatarColor || '#6366f1', textShadowColor: contact.avatarColor || '#6366f1', textShadowRadius: 15 }}>
                                        {contact.name.charAt(0)}
                                    </Text>
                                </View>
                            </LinearGradient>

                            <View className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-[#050810] shadow-lg shadow-green-500" />
                        </View>

                        <Text className="text-white font-black text-xl tracking-tight uppercase shadow-xl">{contact.name}</Text>
                        <View className="flex-row items-center gap-2 mt-1">
                            <View className="h-1 w-8 bg-indigo-500 rounded-full" />
                            <Text className="text-indigo-400 font-black text-[9px] tracking-[2px] uppercase">
                                LVL 24 • {t('common.syncing')}
                            </Text>
                            <View className="h-1 w-8 bg-indigo-500 rounded-full" />
                        </View>
                    </Animated.View>
                </View>

                {/* Deck Area */}
                <View className="flex-[0.65] items-center px-6 pb-28 z-20">
                    <View className="relative w-full h-[340px] justify-center">

                        {/* Stack background cards with perspective */}
                        {[...Array(2)].map((_, i) => (
                            <View
                                key={i}
                                className="absolute w-full h-full bg-slate-900 border border-slate-800/50 rounded-[3rem]"
                                style={{
                                    top: (i + 1) * 15,
                                    transform: [{ scale: 1 - (i + 1) * 0.08 }, { perspective: 1000 }, { rotateX: '10deg' }],
                                    opacity: 0.2 - i * 0.1,
                                    zIndex: -i
                                }}
                            />
                        ))}

                        {/* Main Interaction Card */}
                        <GestureDetector gesture={gesture}>
                            <Animated.View style={[animatedCardStyle]} className="w-full h-full">
                                <View className="w-full h-full bg-slate-950 rounded-[3rem] shadow-2xl border-2 border-slate-800 relative overflow-hidden">
                                    {/* Glassmorphism Surface */}
                                    <LinearGradient
                                        colors={['rgba(30,41,59,0.7)', 'rgba(15,23,42,0.95)']}
                                        style={{ width: '100%', height: '100%', padding: 28 }}
                                    >
                                        {/* Scanline Effect */}
                                        <View className="absolute inset-0 bg-white/5 opacity-5" style={{ height: 2 }} />

                                        {/* Inner glows */}
                                        <View className="absolute -top-20 -left-20 w-48 h-48 bg-indigo-600/20 rounded-full blur-[60px]" />
                                        <View className="absolute -bottom-20 -right-20 w-48 h-48 bg-cyan-600/10 rounded-full blur-[60px]" />

                                        <View className="flex-row justify-between items-center mb-6">
                                            <View className="bg-indigo-500/20 px-4 py-1.5 rounded-full border border-indigo-500/30">
                                                <Text className="text-indigo-300 font-black text-[10px] tracking-[3px] uppercase">
                                                    {t('rating.attribute')} {currentAttrIdx + 1}/3
                                                </Text>
                                            </View>
                                            <TouchableOpacity onPress={() => setIsFlipped(!isFlipped)}>
                                                <View className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center border border-slate-700">
                                                    <Info color="#64748b" size={16} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View className="items-center justify-center flex-1 py-4">
                                            <Text className="text-white font-black text-3xl text-center leading-[38px] tracking-tight mb-6" style={{ textShadowColor: 'rgba(255,255,255,0.2)', textShadowRadius: 10 }}>
                                                {attribute.question}
                                            </Text>

                                            {/* Visual Scale Indicator - Gaming Style */}
                                            <View className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex-row border border-slate-700/50">
                                                <LinearGradient
                                                    colors={['#ef4444', '#f97316']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={{ width: '50%', height: '100%', opacity: 0.4 }}
                                                />
                                                <LinearGradient
                                                    colors={['#84cc16', '#22c55e']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={{ width: '50%', height: '100%', opacity: 0.4 }}
                                                />
                                                <View className="absolute left-1/2 top-[-2px] w-1 h-6 bg-white/40 z-10" />
                                            </View>
                                        </View>

                                        {/* Emojis Selector - 3D PNG GRID */}
                                        <View className="flex-row justify-between items-center mt-6">
                                            {EMOJIS.map((emoji) => {
                                                const isSelected = selectedEmoji === emoji.id;
                                                return (
                                                    <TouchableOpacity
                                                        key={emoji.id}
                                                        activeOpacity={0.7}
                                                        onPress={() => handleEmojiSelect(emoji.id)}
                                                        className="items-center"
                                                    >
                                                        <Animated.View
                                                            className="w-14 h-14 rounded-[1.2rem] items-center justify-center transition-all duration-300"
                                                            style={{
                                                                backgroundColor: isSelected ? `${emoji.color}30` : 'rgba(30,41,59,0.3)',
                                                                borderWidth: isSelected ? 2 : 1,
                                                                borderColor: isSelected ? emoji.color : 'rgba(71,85,105,0.3)',
                                                                transform: [{ scale: isSelected ? 1.25 : 1 }],
                                                                shadowColor: isSelected ? emoji.color : 'transparent',
                                                                shadowRadius: isSelected ? 20 : 0,
                                                                shadowOpacity: isSelected ? 0.6 : 0,
                                                                elevation: isSelected ? 10 : 0
                                                            }}
                                                        >
                                                            <Image source={emoji.img} style={{ width: 36, height: 36, opacity: isSelected ? 1 : 0.8 }} resizeMode="contain" />
                                                            {isSelected && (
                                                                <View
                                                                    className="absolute inset-0 rounded-[1.2rem]"
                                                                    style={{ backgroundColor: emoji.color, opacity: 0.1 }}
                                                                />
                                                            )}
                                                        </Animated.View>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>

                                        <View className="flex-row justify-between px-1 mt-6 opacity-60">
                                            <Text className="text-red-500 font-black text-[8px] uppercase tracking-[2px]">{attribute.negative_term}</Text>
                                            <Text className="text-green-500 font-black text-[8px] uppercase tracking-[2px]">{attribute.positive_term}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                </View>

                {/* Gamer Control Bar */}
                <Animated.View entering={SlideInDown.delay(400)} className="absolute bottom-6 w-full px-6 flex-row justify-between items-center z-50">
                    <TouchableOpacity className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center shadow-lg border border-slate-800 active:scale-90">
                        <Search color="#475569" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center shadow-lg border border-slate-800 active:scale-90">
                        <Star color="#f59e0b" size={20} />
                    </TouchableOpacity>

                    {/* Central HEX Button - The Core */}
                    <View className="relative">
                        <View className="absolute inset-[-10px] bg-indigo-500/20 rounded-full blur-xl" />
                        <TouchableOpacity
                            className="w-20 h-20 rounded-[2rem] items-center justify-center shadow-2xl overflow-hidden border-4 border-[#050810]"
                        >
                            <LinearGradient
                                colors={['#6366f1', '#a855f7']}
                                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Hexagon color="white" size={32} fill="rgba(255,255,255,0.3)" />
                                <View className="absolute bottom-2 w-1.5 h-1.5 bg-white rounded-full shadow-lg shadow-white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center shadow-lg border border-slate-800 active:scale-90">
                        <BarChart2 color="#06b6d4" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNext} className="w-12 h-12 bg-slate-900 rounded-2xl items-center justify-center shadow-lg border border-slate-800 active:scale-90">
                        <Zap color="#facc15" size={20} />
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
