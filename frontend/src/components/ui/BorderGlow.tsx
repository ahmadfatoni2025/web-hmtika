import { useRef, useCallback, useState, useEffect, type ReactNode } from 'react';

interface BorderGlowProps {
    children?: ReactNode;
    className?: string;
    glowColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    glowRadius?: number;
    glowIntensity?: number;
    coneSpread?: number;
    colors?: string[];
    fillOpacity?: number;
    /** Rotation speed in rotations-per-second. Default: 0.4 */
    rotateSpeed?: number;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
    const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 40, s: 80, l: 80 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
    const { h, s, l } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const layers: [number, number, number, number, number, boolean][] = [
        [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
        [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
        [0, 0, 50, 2, 10, true],
        [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
        [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
    ];
    return layers.map(([x, y, blur, spread, alpha, inset]) => {
        const a = Math.min(alpha * intensity, 100);
        return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    }).join(', ');
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
    const gradients: string[] = [];
    for (let i = 0; i < 7; i++) {
        const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
        gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
    }
    gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
    return gradients;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
    children,
    className = '',
    glowColor = '40 80 80',
    backgroundColor = '#120F17',
    borderRadius = 28,
    glowRadius = 40,
    glowIntensity = 1.0,
    coneSpread = 25,
    colors = ['#c084fc', '#f472b6', '#38bdf8'],
    fillOpacity = 0.5,
    rotateSpeed = 0.4,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cursorAngle, setCursorAngle] = useState(0);
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    const autoAngleRef = useRef(0);

    // Auto-rotate: continuously spin the glow cone around the border
    useEffect(() => {
        function tick(timestamp: number) {
            if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
            const delta = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;
            // degrees per ms = rotateSpeed * 360 / 1000
            autoAngleRef.current = (autoAngleRef.current + delta * rotateSpeed * 360 / 1000) % 360;
            setCursorAngle(autoAngleRef.current);
            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            lastTimeRef.current = null;
        };
    }, [rotateSpeed]);

    const meshGradients = buildMeshGradients(colors);
    const borderBg = meshGradients.map(g => `${g} border-box`);
    const fillBg = meshGradients.map(g => `${g} padding-box`);
    const angleDeg = `${cursorAngle.toFixed(3)}deg`;

    const defaultBoxShadow = 'rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.1) 0 8px 16px, rgba(0,0,0,0.1) 0 16px 32px, rgba(0,0,0,0.1) 0 32px 64px';

    return (
        <div
            ref={cardRef}
            className={`relative grid isolate border border-white/15 ${className}`}
            style={{
                background: backgroundColor,
                borderRadius: `${borderRadius}px`,
                transform: 'translate3d(0, 0, 0.01px)',
                boxShadow: defaultBoxShadow,
            }}
        >
            {/* mesh gradient border */}
            <div
                className="absolute inset-0 rounded-[inherit] -z-[1]"
                style={{
                    border: '1px solid transparent',
                    background: [
                        `linear-gradient(${backgroundColor} 0 100%) padding-box`,
                        'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
                        ...borderBg,
                    ].join(', '),
                    opacity: 1,
                    maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
                    WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
                }}
            />

            {/* mesh gradient fill near edges */}
            <div
                className="absolute inset-0 rounded-[inherit] -z-[1]"
                style={{
                    border: '1px solid transparent',
                    background: fillBg.join(', '),
                    maskImage: [
                        'linear-gradient(to bottom, black, black)',
                        'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
                        'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
                        'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
                        'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
                        'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
                        `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
                    ].join(', '),
                    WebkitMaskImage: [
                        'linear-gradient(to bottom, black, black)',
                        'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
                        'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
                        'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
                        'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
                        'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
                        `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
                    ].join(', '),
                    maskComposite: 'subtract, add, add, add, add, add',
                    WebkitMaskComposite: 'source-out, source-over, source-over, source-over, source-over, source-over',
                    opacity: fillOpacity,
                    mixBlendMode: 'soft-light',
                } as React.CSSProperties}
            />

            {/* outer glow span */}
            <span
                className="absolute pointer-events-none z-[1] rounded-[inherit]"
                style={{
                    inset: `${-glowRadius}px`,
                    maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
                    WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
                    opacity: glowIntensity,
                    mixBlendMode: 'plus-lighter',
                } as React.CSSProperties}
            >
                <span
                    className="absolute rounded-[inherit]"
                    style={{
                        inset: `${glowRadius}px`,
                        boxShadow: buildBoxShadow(glowColor, glowIntensity),
                    }}
                />
            </span>

            <div className="flex flex-col relative overflow-auto z-[1]">
                {children}
            </div>
        </div>
    );
};

export default BorderGlow;