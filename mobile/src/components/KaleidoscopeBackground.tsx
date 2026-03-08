import React, { useEffect, useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Stop, Circle, Rect, Filter, FeColorMatrix, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const KALEIDOSCOPE_SIZE = Math.max(width, height) * 2;

export const PALETTES = {
    horizonShift: ["#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#F4F4F4", "#FF6B6B"],
    quietVoltage: ["#1A1A1D", "#4E4E50", "#6F2232", "#950740", "#C3073F", "#EAEAEA"],
    filteredReality: ["#1F1D36", "#3F3351", "#864879", "#E9A6A6", "#F0F0F0", "#2E2E2E"],
    desertBloom: ["#3E2723", "#6D4C41", "#D7CCC8", "#FFAB91", "#FF7043", "#FFF3E0"],
    cosmicInk: ["#0F0F1B", "#1B1B2F", "#16213E", "#533483", "#E94560", "#F5F5F5"]
};

interface KaleidoscopeBackgroundProps {
    palette?: keyof typeof PALETTES;
    duration?: number;
}

export default function KaleidoscopeBackground({
    palette = 'cosmicInk',
    duration = 25000
}: KaleidoscopeBackgroundProps) {
    const rotation = useSharedValue(0);
    const colors = PALETTES[palette];

    useEffect(() => {
        rotation.value = 0;
        rotation.value = withRepeat(
            withTiming(360, { duration, easing: Easing.linear }),
            -1,
            false
        );
    }, [palette, duration]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const blobs = useMemo(() => {
        return colors.map((color, i) => {
            const angle = (i / colors.length) * 2 * Math.PI;
            const radius = KALEIDOSCOPE_SIZE / 3;
            const x = (KALEIDOSCOPE_SIZE / 2) + radius * Math.cos(angle);
            const y = (KALEIDOSCOPE_SIZE / 2) + radius * Math.sin(angle);

            return {
                color,
                x,
                y,
                size: KALEIDOSCOPE_SIZE / 1.2
            };
        });
    }, [colors]);

    return (
        <View style={StyleSheet.absoluteFill} className="bg-[#050810] overflow-hidden items-center justify-center">
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        width: KALEIDOSCOPE_SIZE,
                        height: KALEIDOSCOPE_SIZE,
                    }
                ]}
            >
                <Svg width={KALEIDOSCOPE_SIZE} height={KALEIDOSCOPE_SIZE} viewBox={`0 0 ${KALEIDOSCOPE_SIZE} ${KALEIDOSCOPE_SIZE}`}>
                    <Defs>
                        <Filter id="saturate">
                            <FeColorMatrix
                                type="saturate"
                                values="1.6"
                            />
                        </Filter>

                        {blobs.map((blob, i) => (
                            <RadialGradient
                                key={`grad-${i}`}
                                id={`grad-${i}`}
                                cx={blob.x}
                                cy={blob.y}
                                rx={blob.size / 2}
                                ry={blob.size / 2}
                                fx={blob.x}
                                fy={blob.y}
                                gradientUnits="userSpaceOnUse"
                            >
                                <Stop offset="0%" stopColor={blob.color} stopOpacity="0.95" />
                                <Stop offset="45%" stopColor={blob.color} stopOpacity="0.6" />
                                <Stop offset="100%" stopColor={blob.color} stopOpacity="0" />
                            </RadialGradient>
                        ))}
                    </Defs>

                    <Rect x="0" y="0" width={KALEIDOSCOPE_SIZE} height={KALEIDOSCOPE_SIZE} fill="#050810" />

                    <G filter="url(#saturate)">
                        {blobs.map((blob, i) => (
                            <Circle
                                key={i}
                                cx={blob.x}
                                cy={blob.y}
                                r={blob.size / 2}
                                fill={`url(#grad-${i})`}
                            />
                        ))}
                    </G>
                </Svg>
            </Animated.View>
        </View>
    );
}
