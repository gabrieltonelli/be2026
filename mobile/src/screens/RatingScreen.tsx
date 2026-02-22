import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated as RNAnimated, PanResponder, Dimensions, Image } from 'react-native';
import { Menu, Settings, LogOut, Moon, Search, Star, Hexagon, BarChart2, SkipForward } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn, SlideInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const CONTACTS = [
    { id: 1, name: 'María García', avatarColor: '#6366f1' },
    { id: 2, name: 'Juan Pérez', avatarColor: '#8b5cf6' },
    { id: 3, name: 'Sofia Rodriguez', avatarColor: '#06b6d4' },
];

const EMOJIS = [
    { id: 1, icon: '😡', labelKey: 'rating.very_negative', color: '#ef4444' },
    { id: 2, icon: '😠', labelKey: 'rating.negative', color: '#f97316' },
    { id: 3, icon: '😐', labelKey: 'rating.neutral', color: '#94a3b8' },
    { id: 4, icon: '🙂', labelKey: 'rating.positive', color: '#84cc16' },
    { id: 5, icon: '🤩', labelKey: 'rating.very_positive', color: '#22c55e' },
];

export default function RatingScreen({ navigation }: any) {
    const { t } = useTranslation();
    const [currentContactIdx, setCurrentContactIdx] = useState(0);
    const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    // Tinder Swipe setup for the card
    const pan = useRef(new RNAnimated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: RNAnimated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gesture) => {
                if (gesture.dx > 120 || gesture.dx < -120) {
                    // Swipe force met, animate off screen
                    RNAnimated.spring(pan, {
                        toValue: { x: gesture.dx > 0 ? width + 100 : -width - 100, y: gesture.dy },
                        useNativeDriver: true,
                    }).start(() => {
                        // Callback when animation finishes
                        resetCard();
                    });
                } else {
                    // Snap back
                    RNAnimated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const resetCard = () => {
        setSelectedEmoji(null);
        pan.setValue({ x: 0, y: 0 });
        // Simulate next contact/attribute
        setCurrentContactIdx((prev) => (prev + 1) % CONTACTS.length);
    };

    const handleEmojiSelect = (id: number) => {
        setSelectedEmoji(id);
        // Auto swipe out after selection
        setTimeout(() => {
            RNAnimated.spring(pan, {
                toValue: { x: 0, y: -height }, // Swipe up
                useNativeDriver: true,
            }).start(() => resetCard());
        }, 500);
    };

    const contact = CONTACTS[currentContactIdx];

    const rotate = pan.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView className="flex-1 bg-[#0f172a] relative">
            <View className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <View className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-50" />
                <View className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600 rounded-full blur-3xl opacity-50" />
            </View>

            {/* Header */}
            <View className="px-6 pt-6 pb-2 flex-row justify-between items-center z-50">
                <TouchableOpacity className="w-12 h-12 bg-slate-800/80 rounded-2xl items-center justify-center border border-slate-700/50 shadow-lg shadow-indigo-500/20">
                    <Menu color="#cbd5e1" size={24} />
                </TouchableOpacity>

                <View className="items-center">
                    <Text className="text-brand-accent font-black tracking-widest text-xs">{t('rating.ambit')}</Text>
                </View>

                <View className="relative">
                    <TouchableOpacity
                        onPress={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="w-12 h-12 bg-brand-primary rounded-2xl items-center justify-center border border-indigo-400/50 shadow-lg shadow-indigo-500/50 overflow-hidden"
                    >
                        <Text className="text-white font-bold text-lg">G</Text>
                    </TouchableOpacity>

                    {isProfileMenuOpen && (
                        <Animated.View entering={FadeIn.duration(200)} className="absolute right-0 top-16 bg-slate-800 rounded-2xl p-4 w-56 shadow-2xl border border-slate-700 z-50">
                            <View className="border-b border-slate-700/50 pb-3 mb-3">
                                <Text className="text-white font-bold text-base">Gabriel Tonelli</Text>
                                <Text className="text-slate-400 text-xs">contacto@be.com</Text>
                            </View>
                            <TouchableOpacity className="flex-row items-center gap-3 py-2 px-1 hover:bg-slate-700/50 rounded-lg">
                                <Moon color="#a78bfa" size={18} />
                                <Text className="text-slate-300 font-medium">{t('profile.theme')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Welcome')} className="flex-row items-center gap-3 py-2 px-1 hover:bg-slate-700/50 rounded-lg mt-1">
                                <LogOut color="#f87171" size={18} />
                                <Text className="text-red-400 font-medium">{t('profile.logout')}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </View>
            </View>

            {/* Top Half: Contact Area */}
            <View className="flex-[0.4] items-center justify-center z-10 px-8 pt-8">
                <Animated.View entering={FadeInDown.duration(500)} className="items-center">
                    <View className="w-32 h-32 rounded-full items-center justify-center mb-4 relative" style={{ backgroundColor: `${contact.avatarColor}40` }}>
                        <View className="absolute inset-0 border-4 border-slate-800/80 rounded-full" />
                        <Text className="font-extrabold text-5xl" style={{ color: contact.avatarColor }}>
                            {contact.name.charAt(0)}
                        </Text>
                    </View>
                    <Text className="text-white font-black text-2xl tracking-tight">{contact.name}</Text>
                    <View className="mt-2 bg-slate-800/80 px-4 py-1 rounded-full border border-slate-700">
                        <Text className="text-slate-400 text-xs tracking-wider">DESLIZA PARA CAMBIAR</Text>
                    </View>
                </Animated.View>
            </View>

            {/* Bottom Half: Card Area */}
            <View className="flex-[0.6] items-center px-6 pb-24 z-20">
                <View className="relative w-full h-full justify-center">
                    {/* Background card (Stack effect) */}
                    <View className="absolute w-full h-64 bg-slate-800/30 border border-slate-700/30 rounded-[2rem] top-8 scale-95" />
                    <View className="absolute w-full h-64 bg-slate-800/50 border border-slate-700/50 rounded-[2rem] top-4 scale-95" />

                    {/* Draggable Card */}
                    <RNAnimated.View
                        {...panResponder.panHandlers}
                        style={[
                            pan.getLayout(),
                            { transform: [{ rotate }] }
                        ]}
                        className="w-full bg-slate-800 rounded-[2.5rem] p-6 shadow-2xl border border-slate-700/80 relative overflow-hidden"
                    >
                        {/* Neon Glow effect inside card */}
                        <View className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary/20 blur-3xl rounded-full" />

                        <View className="items-center justify-center py-6 min-h-[120px]">
                            <Text className="text-white font-black text-2xl text-center leading-tight mb-2">
                                {t('rating.question')}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-end mt-4 px-2">
                            {EMOJIS.map((emoji) => {
                                const isSelected = selectedEmoji === emoji.id;
                                return (
                                    <TouchableOpacity
                                        key={emoji.id}
                                        activeOpacity={0.8}
                                        onPress={() => handleEmojiSelect(emoji.id)}
                                        className="items-center"
                                    >
                                        <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 transition-all duration-300 shadow-xl ${isSelected ? 'scale-125 border-2' : 'scale-100 bg-slate-900/50 border border-slate-700/50'}`} style={{ backgroundColor: isSelected ? emoji.color : 'rgba(15,23,42,0.5)', borderColor: isSelected ? 'white' : 'transparent' }}>
                                            <Text className="text-2xl">{emoji.icon}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <View className="flex-row justify-between px-2 mt-4">
                            <Text className="text-red-400 font-bold text-xs uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded-md">- {t('rating.very_negative')}</Text>
                            <Text className="text-green-400 font-bold text-xs uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-md">+ {t('rating.very_positive')}</Text>
                        </View>
                    </RNAnimated.View>
                </View>
            </View>

            {/* Bottom Bar: Gamer Controls */}
            <Animated.View entering={SlideInDown.delay(500)} className="absolute bottom-8 w-full px-6 flex-row justify-between items-center z-50">
                <TouchableOpacity className="w-14 h-14 bg-slate-800 rounded-full items-center justify-center shadow-lg border border-slate-700/50 active:scale-90 transition-transform">
                    <Search color="#94a3b8" size={24} />
                </TouchableOpacity>

                <TouchableOpacity className="w-14 h-14 bg-slate-800 rounded-full items-center justify-center shadow-lg border border-slate-700/50 active:scale-90 transition-transform">
                    <Star color="#f59e0b" size={24} />
                </TouchableOpacity>

                {/* Central Prominent Button */}
                <TouchableOpacity className="w-20 h-20 bg-linear-to-b from-indigo-500 to-purple-600 rounded-full items-center justify-center shadow-2xl shadow-indigo-500/40 border-4 border-[#0f172a] -mt-8 active:scale-95 transition-transform">
                    <Hexagon color="white" size={36} fill="white" />
                    <View className="absolute inset-0 bg-white/20 rounded-full opacity-0 active:opacity-100 transition-opacity" />
                </TouchableOpacity>

                <TouchableOpacity className="w-14 h-14 bg-slate-800 rounded-full items-center justify-center shadow-lg border border-slate-700/50 active:scale-90 transition-transform">
                    <BarChart2 color="#38bdf8" size={24} />
                </TouchableOpacity>

                <TouchableOpacity onPress={resetCard} className="w-14 h-14 bg-slate-800 rounded-full items-center justify-center shadow-lg border border-slate-700/50 active:scale-90 transition-transform">
                    <SkipForward color="#cbd5e1" size={24} />
                </TouchableOpacity>
            </Animated.View>

        </SafeAreaView>
    );
}

const { height } = Dimensions.get('window');
