import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    type?: 'error' | 'success' | 'info';
    onClose: () => void;
}

export default function CustomAlert({
    visible,
    title,
    message,
    onClose,
    type = 'info'
}: CustomAlertProps) {
    if (!visible) return null;

    const getIcon = () => {
        switch (type) {
            case 'error': return <AlertCircle color="#ff4444" size={32} />;
            case 'success': return <CheckCircle2 color="#00C851" size={32} />;
            default: return <Info color="#6366f1" size={32} />;
        }
    };

    const getAccentColor = () => {
        switch (type) {
            case 'error': return '#ff4444';
            case 'success': return '#00C851';
            default: return '#6366f1';
        }
    };

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={StyleSheet.absoluteFill} className="items-center justify-center px-6">
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={StyleSheet.absoluteFill}
                >
                    {/* Fallback View if BlurView fails to render in some environments */}
                    <View style={StyleSheet.absoluteFill} className="bg-black/80" />
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                </Animated.View>

                <Animated.View
                    entering={ZoomIn.duration(300)}
                    exiting={ZoomOut.duration(200)}
                    className="w-full max-w-sm bg-slate-900 border-2 rounded-[2.5rem] overflow-hidden shadow-2xl"
                    style={{ borderColor: `${getAccentColor()}40` }}
                >
                    <View className="p-8 items-center">
                        <View
                            className="w-20 h-20 rounded-3xl items-center justify-center mb-6 shadow-2xl"
                            style={{ backgroundColor: `${getAccentColor()}20`, borderWidth: 1, borderColor: `${getAccentColor()}40` }}
                        >
                            {getIcon()}
                        </View>

                        <Text className="text-2xl font-black text-white text-center mb-3 tracking-tight">
                            {title}
                        </Text>

                        <Text className="text-slate-400 text-center text-lg font-medium leading-relaxed mb-10 px-2">
                            {message}
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={onClose}
                            className="w-full h-16 rounded-2xl overflow-hidden shadow-lg"
                        >
                            <LinearGradient
                                colors={type === 'error' ? ['#ef4444', '#b91c1c'] : ['#6366f1', '#a855f7']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="w-full h-full items-center justify-center"
                            >
                                <Text className="text-white font-black text-lg tracking-widest uppercase">Entendido</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}
