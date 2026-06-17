import { Head, Link, useForm, usePage } from '@inertiajs/react';
import WhatsAppOtpForm from '@/components/WhatsAppOtpForm';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';

interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    password_confirmation: string;
    [key: string]: any;
}

interface PupilProps {
    size?: number;
    maxDistance?: number;
    pupilColor?: string;
    forceLookX?: number;
    forceLookY?: number;
}

const Pupil = ({ size = 12, maxDistance = 5, pupilColor = 'black', forceLookX, forceLookY }: PupilProps) => {
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const pupilRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculatePupilPosition = () => {
        if (!pupilRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const pupil = pupilRef.current.getBoundingClientRect();
        const pupilCenterX = pupil.left + pupil.width / 2;
        const pupilCenterY = pupil.top + pupil.height / 2;

        const deltaX = mouseX - pupilCenterX;
        const deltaY = mouseY - pupilCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={pupilRef}
            className="rounded-full"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: pupilColor,
                transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        />
    );
};

interface EyeBallProps {
    size?: number;
    pupilSize?: number;
    maxDistance?: number;
    eyeColor?: string;
    pupilColor?: string;
    isBlinking?: boolean;
    forceLookX?: number;
    forceLookY?: number;
}

const EyeBall = ({
    size = 48,
    pupilSize = 16,
    maxDistance = 10,
    eyeColor = 'white',
    pupilColor = 'black',
    isBlinking = false,
    forceLookX,
    forceLookY,
}: EyeBallProps) => {
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const eyeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculatePupilPosition = () => {
        if (!eyeRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const eye = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={eyeRef}
            className="flex items-center justify-center rounded-full border border-border transition-all duration-150"
            style={{
                width: `${size}px`,
                height: isBlinking ? '2px' : `${size}px`,
                backgroundColor: eyeColor,
                overflow: 'hidden',
            }}
        >
            {!isBlinking && (
                <div
                    className="rounded-full"
                    style={{
                        width: `${pupilSize}px`,
                        height: `${pupilSize}px`,
                        backgroundColor: pupilColor,
                        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />
            )}
        </div>
    );
};

export default function Register() {
    const { name } = usePage<SharedData>().props;
    const [showPassword, setShowPassword] = useState(false);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
    const [isBlackBlinking, setIsBlackBlinking] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
    const [isPurplePeeking, setIsPurplePeeking] = useState(false);
    const purpleRef = useRef<HTMLDivElement>(null);
    const blackRef = useRef<HTMLDivElement>(null);
    const yellowRef = useRef<HTMLDivElement>(null);
    const orangeRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        phone: '',
        role: 'pekerja',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Blinking effect for purple character
    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsPurpleBlinking(true);
                setTimeout(() => {
                    setIsPurpleBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());

            return blinkTimeout;
        };

        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    // Blinking effect for black character
    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsBlackBlinking(true);
                setTimeout(() => {
                    setIsBlackBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());

            return blinkTimeout;
        };

        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    // Looking at each other animation when typing starts
    useEffect(() => {
        if (isTyping) {
            setIsLookingAtEachOther(true);
            const timer = setTimeout(() => {
                setIsLookingAtEachOther(false);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setIsLookingAtEachOther(false);
        }
    }, [isTyping]);

    // Purple sneaky peeking animation when typing password and it's visible
    useEffect(() => {
        if (data.password.length > 0 && showPassword) {
            const schedulePeek = () => {
                const peekInterval = setTimeout(
                    () => {
                        setIsPurplePeeking(true);
                        setTimeout(() => {
                            setIsPurplePeeking(false);
                        }, 800);
                    },
                    Math.random() * 3000 + 2000,
                );
                return peekInterval;
            };

            const firstPeek = schedulePeek();
            return () => clearTimeout(firstPeek);
        } else {
            setIsPurplePeeking(false);
        }
    }, [data.password, showPassword, isPurplePeeking]);

    const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        const faceX = Math.max(-15, Math.min(15, deltaX / 20));
        const faceY = Math.max(-10, Math.min(10, deltaY / 30));

        const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

        return { faceX, faceY, bodySkew };
    };

    const purplePos = calculatePosition(purpleRef);
    const blackPos = calculatePosition(blackRef);
    const yellowPos = calculatePosition(yellowRef);
    const orangePos = calculatePosition(orangeRef);

    return (
        <div className="grid min-h-screen bg-background text-foreground selection:bg-[#FFE7E2] selection:dark:bg-[#FF7E6B]/20 selection:text-[#F0654F] selection:dark:text-[#FF9485] lg:grid-cols-2">
            <Head title="Log in" />

            {/* Left Content Section */}
            <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-background p-12 text-foreground lg:flex">
                <div className="relative z-20">
                    <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-[#FFE7E2] dark:bg-[#FF7E6B]/20 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                            <AppLogoIcon className="size-6 fill-current text-[#F0654F] dark:text-[#FF9485]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="leading-none font-bold text-foreground">SISTRA-SAWIT</span>
                            <span className="mt-1 text-[10px] font-semibold tracking-widest text-[#F0654F] dark:text-[#FF9485] uppercase">Transparansi RAM Sawit</span>
                        </div>
                    </Link>
                </div>

                <div className="relative z-20 flex h-[500px] items-end justify-center">
                    {/* Cartoon Characters */}
                    <div className="relative" style={{ width: '550px', height: '400px' }}>
                        {/* Palm Green tall rectangle character - Back layer */}
                        <div
                            ref={purpleRef}
                            className="absolute bottom-0 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-700 ease-in-out"
                            style={{
                                left: '70px',
                                width: '180px',
                                height: isTyping || (data.password.length > 0 && !showPassword) ? '440px' : '400px',
                                backgroundColor: '#65A30D', // Primary Palm Green
                                borderRadius: '10px 10px 0 0',
                                zIndex: 1,
                                transform:
                                    data.password.length > 0 && showPassword
                                        ? `skewX(0deg)`
                                        : isTyping || (data.password.length > 0 && !showPassword)
                                            ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                                            : `skewX(${purplePos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            {/* Leaf Crown */}
                            <div className="pointer-events-none absolute -top-7 left-1/2 z-0 flex w-20 -translate-x-1/2 justify-center gap-1 select-none">
                                <div className="h-10 w-4 origin-bottom-right rotate-[-45deg] rounded-full border border-[#65A30D] bg-[#84CC16] shadow-sm" />
                                <div className="h-12 w-4 origin-bottom rotate-[-15deg] rounded-full border border-[#65A30D] bg-[#84CC16] shadow-sm" />
                                <div className="h-12 w-4 origin-bottom rotate-[15deg] rounded-full border border-[#65A30D] bg-[#84CC16] shadow-sm" />
                                <div className="h-10 w-4 origin-bottom-left rotate-[45deg] rounded-full border border-[#65A30D] bg-[#84CC16] shadow-sm" />
                            </div>

                            {/* Eyes */}
                            <div
                                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                                style={{
                                    left:
                                        data.password.length > 0 && showPassword
                                            ? `${20}px`
                                            : isLookingAtEachOther
                                                ? `${55}px`
                                                : `${45 + purplePos.faceX}px`,
                                    top:
                                        data.password.length > 0 && showPassword
                                            ? `${35}px`
                                            : isLookingAtEachOther
                                                ? `${65}px`
                                                : `${40 + purplePos.faceY}px`,
                                }}
                            >
                                <EyeBall
                                    size={18}
                                    pupilSize={7}
                                    maxDistance={5}
                                    eyeColor="white"
                                    pupilColor="#2D2D2D"
                                    isBlinking={isPurpleBlinking}
                                    forceLookX={
                                        data.password.length > 0 && showPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined
                                    }
                                    forceLookY={
                                        data.password.length > 0 && showPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined
                                    }
                                />
                                <EyeBall
                                    size={18}
                                    pupilSize={7}
                                    maxDistance={5}
                                    eyeColor="white"
                                    pupilColor="#2D2D2D"
                                    isBlinking={isPurpleBlinking}
                                    forceLookX={
                                        data.password.length > 0 && showPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined
                                    }
                                    forceLookY={
                                        data.password.length > 0 && showPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined
                                    }
                                />
                            </div>
                        </div>

                        {/* Charcoal RAM/Timbangan Guard character - Middle layer */}
                        <div
                            ref={blackRef}
                            className="absolute bottom-0 border border-border shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-700 ease-in-out"
                            style={{
                                left: '240px',
                                width: '120px',
                                height: '310px',
                                backgroundColor: '#27272A', // Zinc-800 Charcoal
                                borderRadius: '8px 8px 0 0',
                                zIndex: 2,
                                transform:
                                    data.password.length > 0 && showPassword
                                        ? `skewX(0deg)`
                                        : isLookingAtEachOther
                                            ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                                            : isTyping || (data.password.length > 0 && !showPassword)
                                                ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                                                : `skewX(${blackPos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            {/* Safety Helmet */}
                            <div className="pointer-events-none absolute -top-4 left-1/2 z-10 h-[30px] w-[90px] -translate-x-1/2 select-none">
                                <div className="relative mx-auto h-[26px] w-[70px] rounded-t-full border border-[#CA8A04] bg-[#EAB308] shadow-md">
                                    <div className="absolute top-0 left-1/2 h-full w-2 -translate-x-1/2 rounded-t-full bg-[#CA8A04]/40" />
                                </div>
                                <div className="absolute bottom-[4px] left-1/2 h-[3px] w-[84px] -translate-x-1/2 rounded-full border border-[#CA8A04] bg-[#EAB308]" />
                            </div>

                            {/* Eyes */}
                            <div
                                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                                style={{
                                    left:
                                        data.password.length > 0 && showPassword
                                            ? `${10}px`
                                            : isLookingAtEachOther
                                                ? `${32}px`
                                                : `${26 + blackPos.faceX}px`,
                                    top:
                                        data.password.length > 0 && showPassword
                                            ? `${28}px`
                                            : isLookingAtEachOther
                                                ? `${12}px`
                                                : `${32 + blackPos.faceY}px`,
                                }}
                            >
                                <EyeBall
                                    size={16}
                                    pupilSize={6}
                                    maxDistance={4}
                                    eyeColor="white"
                                    pupilColor="#84CC16"
                                    isBlinking={isBlackBlinking}
                                    forceLookX={data.password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                                    forceLookY={data.password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? -4 : undefined}
                                />
                                <EyeBall
                                    size={16}
                                    pupilSize={6}
                                    maxDistance={4}
                                    eyeColor="white"
                                    pupilColor="#84CC16"
                                    isBlinking={isBlackBlinking}
                                    forceLookX={data.password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                                    forceLookY={data.password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? -4 : undefined}
                                />
                            </div>
                        </div>

                        {/* Orange Ripe Palm Fruit Bunch character - Front left */}
                        <div
                            ref={orangeRef}
                            className="absolute bottom-0 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-700 ease-in-out"
                            style={{
                                left: '0px',
                                width: '240px',
                                height: '200px',
                                zIndex: 3,
                                backgroundColor: '#EA580C', // Orange/Red ripe sawit color
                                borderRadius: '120px 120px 0 0',
                                transform: data.password.length > 0 && showPassword ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            {/* Palm Fruitlet Textures */}
                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[120px] opacity-20">
                                <div className="absolute top-[40px] left-[35px] h-8 w-6 rotate-12 rounded-full bg-[#7C2D12]" />
                                <div className="absolute top-[65px] left-[70px] h-8 w-6 -rotate-12 rounded-full bg-[#7C2D12]" />
                                <div className="absolute top-[50px] left-[110px] h-8 w-6 rotate-45 rounded-full bg-[#7C2D12]" />
                                <div className="absolute top-[75px] left-[140px] h-8 w-6 -rotate-45 rounded-full bg-[#7C2D12]" />
                                <div className="absolute top-[45px] left-[175px] h-8 w-6 rotate-12 rounded-full bg-[#7C2D12]" />
                                <div className="absolute top-[100px] left-[40px] h-8 w-6 -rotate-12 rounded-full bg-[#7C2D12]" />
                                <div className="absolute top-[110px] left-[100px] h-8 w-6 rotate-12 rounded-full bg-[#7C2D12]" />
                                <div className="absolute top-[95px] left-[165px] h-8 w-6 -rotate-12 rounded-full bg-[#7C2D12]" />
                            </div>

                            {/* Eyes - just pupils, no white */}
                            <div
                                className="absolute flex gap-8 transition-all duration-200 ease-out"
                                style={{
                                    left: data.password.length > 0 && showPassword ? `${50}px` : `${82 + (orangePos.faceX || 0)}px`,
                                    top: data.password.length > 0 && showPassword ? `${90}px` : `${90 + (orangePos.faceY || 0)}px`,
                                }}
                            >
                                <Pupil
                                    size={12}
                                    maxDistance={5}
                                    pupilColor="#2D2D2D"
                                    forceLookX={data.password.length > 0 && showPassword ? -5 : undefined}
                                    forceLookY={data.password.length > 0 && showPassword ? -4 : undefined}
                                />
                                <Pupil
                                    size={12}
                                    maxDistance={5}
                                    pupilColor="#2D2D2D"
                                    forceLookX={data.password.length > 0 && showPassword ? -5 : undefined}
                                    forceLookY={data.password.length > 0 && showPassword ? -4 : undefined}
                                />
                            </div>
                        </div>

                        {/* Yellow Golden Palm Oil character - Front right */}
                        <div
                            ref={yellowRef}
                            className="absolute bottom-0 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-700 ease-in-out"
                            style={{
                                left: '310px',
                                width: '140px',
                                height: '230px',
                                backgroundColor: '#EAB308', // Harvest Yellow
                                borderRadius: '70px 70px 0 0',
                                zIndex: 4,
                                transform: data.password.length > 0 && showPassword ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            {/* Golden Oil Droplet Badge */}
                            <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 select-none">
                                <div className="h-7 w-5 animate-pulse rounded-t-full rounded-b-2xl border border-[#FEF08A]/40 bg-gradient-to-b from-[#FDE047] to-[#CA8A04] shadow-sm" />
                                <span className="text-[8px] font-bold tracking-widest text-[#CA8A04] uppercase">CPO</span>
                            </div>

                            {/* Eyes - just pupils, no white */}
                            <div
                                className="absolute flex gap-6 transition-all duration-200 ease-out"
                                style={{
                                    left: data.password.length > 0 && showPassword ? `${20}px` : `${52 + (yellowPos.faceX || 0)}px`,
                                    top: data.password.length > 0 && showPassword ? `${35}px` : `${40 + (yellowPos.faceY || 0)}px`,
                                }}
                            >
                                <Pupil
                                    size={12}
                                    maxDistance={5}
                                    pupilColor="#2D2D2D"
                                    forceLookX={data.password.length > 0 && showPassword ? -5 : undefined}
                                    forceLookY={data.password.length > 0 && showPassword ? -4 : undefined}
                                />
                                <Pupil
                                    size={12}
                                    maxDistance={5}
                                    pupilColor="#2D2D2D"
                                    forceLookX={data.password.length > 0 && showPassword ? -5 : undefined}
                                    forceLookY={data.password.length > 0 && showPassword ? -4 : undefined}
                                />
                            </div>
                            {/* Horizontal line for mouth */}
                            <div
                                className="absolute h-[4px] w-20 rounded-full bg-[#2D2D2D] transition-all duration-200 ease-out"
                                style={{
                                    left: data.password.length > 0 && showPassword ? `${10}px` : `${40 + (yellowPos.faceX || 0)}px`,
                                    top: data.password.length > 0 && showPassword ? `${88}px` : `${88 + (yellowPos.faceY || 0)}px`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="bg-grid-black/[0.01] dark:bg-grid-white/[0.02] absolute inset-0 bg-[size:20px_20px]" />
            </div>

            {/* Right Register Section */}
            <div className="flex items-center justify-center bg-background p-8 overflow-y-auto">
                <div className="relative z-10 w-full max-w-[400px] py-10">
                    {/* Mobile Logo */}
                    <div className="mb-8 flex items-center justify-center gap-2 text-lg font-semibold lg:hidden">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-[#FFE7E2] dark:bg-[#FF7E6B]/20">
                                <AppLogoIcon className="size-5 fill-current text-[#F0654F] dark:text-[#FF9485]" />
                            </div>
                            <span className="font-bold tracking-tight text-foreground">{name}</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-1 text-2xl font-bold tracking-tight text-foreground">Daftar Akun Baru</h1>
                        <p className="text-sm text-muted-foreground">Silakan lengkapi data diri Anda di bawah ini</p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-foreground">Nama Lengkap</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Cth: Budi Santoso"
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                className="h-11 rounded-lg border-border bg-background text-foreground transition-all focus:border-[#FF7E6B] focus:ring-1 focus:ring-[#FF7E6B]"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="budi@example.com"
                                    onFocus={() => setIsTyping(true)}
                                    onBlur={() => setIsTyping(false)}
                                    className="h-11 rounded-lg border-border bg-background text-foreground transition-all focus:border-[#FF7E6B] focus:ring-1 focus:ring-[#FF7E6B]"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Nomor HP </Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    tabIndex={3}
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    disabled={processing}
                                    placeholder="0812..."
                                    onFocus={() => setIsTyping(true)}
                                    onBlur={() => setIsTyping(false)}
                                    className="h-11 rounded-lg border-border bg-background text-foreground transition-all focus:border-[#FF7E6B] focus:ring-1 focus:ring-[#FF7E6B]"
                                />
                                <InputError message={errors.phone} />
                            </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">* Wajib mengisi minimal salah satu (Email atau Nomor HP) untuk keperluan login.</p>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-sm font-medium text-foreground">Peran (Role)</Label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                disabled={processing}
                                tabIndex={4}
                                className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-[#FF7E6B] focus:ring-[#FF7E6B]"
                            >
                                <option value="pekerja">Pekerja Kebun (Supir)</option>
                                <option value="petugas_ram">Petugas RAM (Timbangan)</option>
                            </select>
                            <InputError message={errors.role} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Minimal 8 karakter"
                                    className="h-11 rounded-lg border-border bg-background pr-10 text-foreground transition-all focus:border-[#FF7E6B] focus:ring-1 focus:ring-[#FF7E6B]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-sm font-medium text-foreground">Konfirmasi Password</Label>
                            <Input
                                id="password_confirmation"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={6}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Ulangi password"
                                className="h-11 rounded-lg border-border bg-background text-foreground transition-all focus:border-[#FF7E6B] focus:ring-1 focus:ring-[#FF7E6B]"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="text-center">OR</div>

                        <div className="mt-4">
                            <a
                                href="/auth/google"
                                className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fill="#FFC107"
                                        d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.204 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                    />
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
                                    />
                                    <path
                                        fill="#4CAF50"
                                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.146 35.091 26.676 36 24 36c-5.183 0-9.623-3.326-11.283-7.946l-6.522 5.025C9.529 39.556 16.227 44 24 44z"
                                    />
                                    <path
                                        fill="#1976D2"
                                        d="M43.611 20.083H42V20H24v8h11.303c-1.125 3.188-3.561 5.705-6.894 7.57l6.19 5.238C38.269 37.404 44 31.252 44 24c0-1.341-.138-2.65-.389-3.917z"
                                    />
                                </svg>
                                Daftar dengan Google
                            </a>
                        </div>

                        <WhatsAppOtpForm />

                        <Button
                            type="submit"
                            className="mt-6 flex h-11 w-full animate-none cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-[#FF7E6B] text-base font-bold text-white shadow-sm transition-all hover:bg-[#FF9485]"
                            tabIndex={7}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Daftar Sekarang
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Sudah punya akun?{' '}
                        <TextLink href={route('login')} tabIndex={8} className="font-medium text-[#FF7E6B] dark:text-[#FF9485] transition-colors hover:text-[#FF9485]">
                            Log in di sini
                        </TextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
