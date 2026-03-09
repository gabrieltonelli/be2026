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
    withRepeat,
    interpolate,
    Extrapolate,
    withSequence,
    runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

import { useRatings } from '../hooks/useRatings';
import KaleidoscopeBackground from '../components/KaleidoscopeBackground';

// Assets
const LOGO = require('../../assets/logo/logo4.png');

// Static Noise Texture for Realism (Wyper Pen Style)
const STATIC_NOISE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAOh0lEQVR4nO1dbVczNw69JCEvBJInEEIgEIb//6/6fbu73e77tt0P1o2vZQ3QPgRCmHsOJ8mMx5ZlWZJljQEynlBia58ncq3nykzs8wzApVy/ATAAMANwJdevACxdnbCyp/bHNhqpn/DP3aMdS/ucAri17xurQ/s6AnBhfbiQZzZSbgvgzuiE1Te0MgDwIO2RdsUaJR/0OvtwzYuPdsPjSgjcyOfICBjZNWXSBuXALIJ6Wfej...+TRT7Q1OpRREzyM2JrBHvDzLZ8nQTdbV8XdfgSaQZurc0TpIF5QCks6opeIktyNHMVHNA5kiZYol6zRJgajbt2STQlgJ7DAFnfTZAk+hzZgDdSXsHRL9+36xftUXgXqAtLw4xpNJG7k3kt+8T9UUgeuQtntkmhqxi5b6blAO5I3R2ragOrV6dOCeiwQAecaz/ceAFg7oFcp1ySlqY+3tMdE2QFR9u34+WKWcBRO5zk5EBmuIeBo27vfIffJZxSXSoLOdOdpVEzFA6erSqWiQ+kOmqvRPkIRli3jVPEEO6XhsUTs0V8gaZYV2N19xgWTnIjuGPtIIjQH8COBXAP+zzvwA4L/296s8uEZi4C9GzBDAv+X+qdTzaN//hcSAfxjx1/bMCDkI+U8j9me79pN18gyJQf+xjvxkdfxiz8Dq/dm+/8Wuz6x/Y7kHo+dXAH+1+v9u1/tW54/2e2Y0sszfjAYgCe5v1s6NPXMqdS2Mr1O5Rlzb839GEp7fkAb2TyygKoF6rO9+k0B6RXyGQTxfVw9Zium7+qiDbA3ygPj2IrB9hmN8edXTY5R2gG00KD0kfUbpUxea6CNWfTTMsGeoATgLB0hC3Ecd/3oRh2joxshqKVqJqzdD71CxRvbxvbfU2Oc3o/MWNd41vhcZUxZ8ycXVihgQhBCvnWuT/pHdU2lUg3iP53XzBVJnv6EeCJ0JM6OHwkaBU1s4D+icIPWL6";
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

// Helper to generate a consistent portrait ID from name
const getPortraitUrl = (name: string, isMale: boolean = true) => {
    // Generate a simple hash of the name for a consistent ID between 1 and 99
    const id = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 99 + 1;
    const gender = isMale ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

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

    // Shine animation value
    const shineX = useSharedValue(-width);

    // Frosted glass background animation
    const glassAnim = useSharedValue(0);

    // Pulsing animation for avatar rings
    const ringPulse = useSharedValue(1);

    React.useEffect(() => {
        // Periodic shine sweep - Wider interval, smoother move
        const interval = setInterval(() => {
            shineX.value = -width * 1.5;
            shineX.value = withTiming(width * 2.5, { duration: 2500 });
        }, 8000);

        // Continuous frosted glass movement
        glassAnim.value = withRepeat(
            withTiming(1, { duration: 10000 }),
            -1,
            true
        );

        // Avatar pulse animation
        ringPulse.value = withRepeat(withTiming(1.2, { duration: 2000 }), -1, true);

        return () => clearInterval(interval);
    }, []);

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
                { perspective: 1200 },
                { rotateX: `${tiltX.value}deg` },
                { rotateY: `${tiltY.value}deg` },
            ],
        };
    });

    const animatedShineStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: shineX.value },
            { rotate: '35deg' }
        ],
    }));

    const animatedGlassStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(glassAnim.value, [0, 1], [-20, 20]) },
            { translateY: interpolate(glassAnim.value, [0, 1], [-10, 10]) },
            { scale: 1.2 }
        ],
        opacity: 0.3
    }));

    const animatedRingStyle = useAnimatedStyle(() => ({
        transform: [{ scale: ringPulse.value }],
        opacity: interpolate(ringPulse.value, [1, 1.2], [0.6, 0.2])
    }));

    const animatedGlareStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(tiltY.value, [-15, 15], [width * 0.4, -width * 0.4]) },
            { translateY: interpolate(tiltX.value, [-10, 10], [height * 0.2, -height * 0.2]) },
        ],
        opacity: interpolate(Math.abs(tiltX.value) + Math.abs(tiltY.value), [0, 25], [0.1, 0.5])
    }));

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
            <View className="flex-1 bg-[#050810] relative">
                {/* Background Kaleidoscope Effect - Full Screen */}
                <View className="absolute inset-0 z-0">
                    <KaleidoscopeBackground palette="cosmicInk" />
                    <View className="absolute inset-0 bg-black/30" />
                </View>

                <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

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

                    {/* Contact Area - Clean Cyber-Gamer Style */}
                    <View className="flex-[0.38] items-center justify-center z-10 px-8">
                        <Animated.View key={currentContactIdx} entering={FadeInDown.springify()} className="items-center">
                            <View className="w-44 h-44 items-center justify-center mb-5 relative">

                                {/* Large Ambient Outer Glow */}
                                <Animated.View
                                    style={[animatedRingStyle, {
                                        position: 'absolute',
                                        inset: -15,
                                        borderRadius: 100,
                                        backgroundColor: `${contact.avatarColor || '#6366f1'}15`,
                                    }]}
                                />

                                {/* Clean Neon Glow Border */}
                                <View className="absolute inset-[-4px] rounded-full overflow-hidden p-[2px]">
                                    <LinearGradient
                                        colors={[`${contact.avatarColor || '#6366f1'}`, '#a855f7', 'transparent']}
                                        style={{ flex: 1, borderRadius: 100 }}
                                    />
                                </View>

                                {/* Main Avatar Circle */}
                                <View className="w-full h-full rounded-full bg-slate-900 overflow-hidden border-4 border-[#050810] shadow-2xl">
                                    <Image
                                        source={{ uri: getPortraitUrl(contact.name) }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />

                                    {/* Glass Tint Overlay */}
                                    <LinearGradient
                                        colors={['rgba(99, 102, 241, 0.1)', 'transparent', 'rgba(0,0,0,0.4)']}
                                        className="absolute inset-0"
                                    />
                                </View>

                                {/* Clean Level Indicator Pop */}
                                <View className="absolute -bottom-2 bg-slate-900 border border-indigo-500/30 px-4 py-1 rounded-full shadow-2xl">
                                    <Text className="text-brand-accent font-black text-[11px] tracking-widest">LVL 24</Text>
                                </View>

                                {/* Online Status Integrated */}
                                <View className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#050810] items-center justify-center border border-white/5 z-20">
                                    <View className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_12px_#22c55e]" />
                                </View>
                            </View>

                            <Text className="text-white font-black text-3xl tracking-tighter uppercase mb-1" style={{ textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 15 }}>
                                {contact.name}
                            </Text>

                            <View className="flex-row items-center gap-3">
                                <View className="h-[2px] w-4 bg-indigo-500 rounded-full" />
                                <Text className="text-indigo-400 font-bold text-[10px] tracking-[4px] uppercase opacity-60">
                                    {t('common.syncing')}
                                </Text>
                                <View className="h-[2px] w-4 bg-indigo-500 rounded-full" />
                            </View>
                        </Animated.View>
                    </View>

                    {/* Deck Area */}
                    <View className="flex-[0.7] items-center px-4 pb-28 z-20">
                        <View className="relative w-full h-[400px] justify-center">


                            {/* Stack background cards with deep perspective */}
                            {[...Array(2)].map((_, i) => (
                                <View
                                    key={i}
                                    className="absolute w-full h-full bg-slate-900/40 border border-slate-700/30 rounded-[2.5rem]"
                                    style={{
                                        top: (i + 1) * 20,
                                        transform: [{ scale: 1 - (i + 1) * 0.1 }, { perspective: 1200 }, { rotateX: '15deg' }],
                                        opacity: 0.1,
                                        zIndex: -i
                                    }}
                                />
                            ))}

                            {/* Main Interaction Card */}
                            <GestureDetector gesture={gesture}>
                                <Animated.View style={[animatedCardStyle, { width: '100%', height: '100%' }]}>
                                    {/* Metallic Silver Notorious Border Wrapper */}
                                    <View className="flex-1 bg-slate-400 rounded-[2.5rem] p-[2.5px] overflow-hidden shadow-[0_65px_100px_-20px_rgba(0,0,0,1)]">
                                        <LinearGradient
                                            colors={['#ffffff', '#cbd5e1', '#94a3b8', '#cbd5e1', '#ffffff']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                        />

                                        <View className="flex-1 bg-transparent rounded-[2.4rem] relative overflow-hidden">
                                            {/* Expo BlurView for Glass Effect */}
                                            <BlurView intensity={80} tint="dark" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

                                            {/* Subtle dark overlay for readability */}
                                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 10, 25, 0.4)' }} />

                                            {/* Static Noise Overlay */}
                                            <Image
                                                source={{ uri: STATIC_NOISE }}
                                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05 }}
                                                resizeMode="repeat"
                                            />

                                            {/* Dynamic Glare / Spotlight using SVG for Real Blur */}
                                            <Animated.View
                                                style={[animatedGlareStyle, {
                                                    position: 'absolute',
                                                    width: width * 1.5,
                                                    height: width * 1.5,
                                                    top: -width / 2,
                                                    left: -width / 2,
                                                    zIndex: 10
                                                }]}
                                                pointerEvents="none"
                                            >
                                                <Svg height="100%" width="100%">
                                                    <Defs>
                                                        <RadialGradient
                                                            id="glare"
                                                            cx="50%"
                                                            cy="50%"
                                                            rx="50%"
                                                            ry="50%"
                                                            fx="50%"
                                                            fy="50%"
                                                        >
                                                            <Stop offset="0%" stopColor="white" stopOpacity="0.22" />
                                                            <Stop offset="45%" stopColor="white" stopOpacity="0.08" />
                                                            <Stop offset="100%" stopColor="white" stopOpacity="0" />
                                                        </RadialGradient>
                                                    </Defs>
                                                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#glare)" />
                                                </Svg>
                                            </Animated.View>

                                            {/* Tech Accents - Corner Brackets */}
                                            <View className="absolute top-4 left-4 w-6 h-6 border-t border-l border-indigo-500/40 rounded-tl-lg" />
                                            <View className="absolute top-4 right-4 w-6 h-6 border-t border-r border-indigo-500/40 rounded-tr-lg" />
                                            <View className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-indigo-500/40 rounded-bl-lg" />
                                            <View className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-indigo-500/40 rounded-br-lg" />

                                            {/* Periodic Shine Sweep - Diagonal & Smooth */}
                                            <Animated.View
                                                style={[animatedShineStyle, {
                                                    position: 'absolute',
                                                    top: -height,
                                                    bottom: -height,
                                                    width: 350,
                                                    zIndex: 20
                                                }]}
                                            >
                                                <LinearGradient
                                                    colors={['transparent', 'rgba(255,255,255,0)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0)', 'transparent']}
                                                    start={{ x: 0, y: 0.5 }}
                                                    end={{ x: 1, y: 0.5 }}
                                                    style={{ flex: 1 }}
                                                />
                                            </Animated.View>

                                            {/* Surface Layer with Main Labels */}
                                            <View style={{ flex: 1, padding: 24, zIndex: 30 }}>
                                                {/* Header within Card */}
                                                <View className="flex-row justify-between items-center mb-6">
                                                    <View className="bg-slate-900/60 shadow-inner px-4 py-1.5 rounded-lg border border-white/5">
                                                        <Text className="text-brand-accent font-black text-[9px] tracking-[4px] uppercase" style={{ color: '#818cf8' }}>
                                                            {t('rating.attribute')} {currentAttrIdx + 1}/3
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => setIsFlipped(!isFlipped)}>
                                                        <View className="w-10 h-10 rounded-xl bg-slate-900/60 items-center justify-center border border-white/10 shadow-lg">
                                                            <Info color="#818cf8" size={18} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>

                                                {/* Core Attribute Content */}
                                                <View className="items-center justify-center flex-1">
                                                    <Text
                                                        className="text-white font-black text-4xl text-center leading-[48px] tracking-tight mb-8"
                                                        style={{
                                                            textShadowColor: 'rgba(0,0,0,0.5)',
                                                            textShadowRadius: 20,
                                                            elevation: 10
                                                        }}
                                                    >
                                                        {attribute.question}
                                                    </Text>

                                                    {/* Animated Visual Scale Indicator */}
                                                    <View className="w-full h-3 bg-black/60 rounded-full overflow-hidden flex-row border border-indigo-500/20 shadow-inner mt-4">
                                                        <LinearGradient
                                                            colors={['#ef4444', '#f97316']}
                                                            start={{ x: 0, y: 0 }}
                                                            end={{ x: 1, y: 0 }}
                                                            style={{ width: '50%', height: '100%', opacity: 0.8 }}
                                                        />
                                                        <LinearGradient
                                                            colors={['#84cc16', '#22c55e']}
                                                            start={{ x: 0, y: 0 }}
                                                            end={{ x: 1, y: 0 }}
                                                            style={{ width: '50%', height: '100%', opacity: 0.8 }}
                                                        />
                                                        {/* Scanline Selector Marker */}
                                                        <View className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-white z-10 shadow-[0_0_15px_#fff]" />
                                                    </View>
                                                </View>

                                                {/* Emojis Selector */}
                                                <View className="flex-row justify-between items-center mt-12 px-2">
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
                                                                    className="w-[62px] h-[62px] rounded-2xl items-center justify-center transition-all relative shadow-2xl"
                                                                    style={{
                                                                        backgroundColor: isSelected ? `${emoji.color}50` : 'rgba(0,0,0,0.25)',
                                                                        borderWidth: isSelected ? 2 : 1,
                                                                        borderColor: isSelected ? 'white' : 'rgba(255,255,255,0.05)',
                                                                        transform: [{ scale: isSelected ? 1.4 : 1 }],
                                                                        shadowColor: emoji.color,
                                                                        shadowRadius: isSelected ? 25 : 0,
                                                                        shadowOpacity: isSelected ? 1 : 0,
                                                                        elevation: isSelected ? 20 : 0
                                                                    }}
                                                                >
                                                                    <Image
                                                                        source={emoji.img}
                                                                        style={{
                                                                            width: 44,
                                                                            height: 44,
                                                                            opacity: isSelected ? 1 : 0.8,
                                                                            shadowColor: 'black',
                                                                            shadowRadius: 5
                                                                        }}
                                                                        resizeMode="contain"
                                                                    />

                                                                    {isSelected && (
                                                                        <LinearGradient
                                                                            colors={[`${emoji.color}40`, 'transparent']}
                                                                            className="absolute inset-0 rounded-2xl"
                                                                        />
                                                                    )}
                                                                </Animated.View>
                                                            </TouchableOpacity>
                                                        );
                                                    })}
                                                </View>

                                                <View className="flex-row justify-between px-2 mt-10 opacity-80">
                                                    <View className="flex-row items-center gap-2">
                                                        <View className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                        <Text className="text-red-400 font-black text-[8px] uppercase tracking-[3px]">{attribute.negative_term}</Text>
                                                    </View>
                                                    <View className="flex-row items-center gap-2">
                                                        <Text className="text-green-400 font-black text-[8px] uppercase tracking-[3px]">{attribute.positive_term}</Text>
                                                        <View className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
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
            </View>
        </GestureHandlerRootView>
    );
}
