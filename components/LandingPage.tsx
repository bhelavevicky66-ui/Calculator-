import React from 'react';
import { Play } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="h-full w-full flex items-center justify-center bg-[#e0e5ec] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-sky-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>

            <div className="z-10 bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-12 max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 mx-4">

                <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                        <p className="text-gray-500 font-medium tracking-wider text-sm uppercase">Introducing the New</p>
                        <h1 className="text-6xl font-bold text-gray-800 leading-tight">
                            TI-84 <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Calculator
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Experience the power of advanced calculation with our beautiful, glassmorphic interface. Simple, elegant, and powerful.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onStart}
                            className="group relative px-8 py-4 bg-gray-900 rounded-full text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10">Start Calculating</span>
                            <Play size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </button>

                        <button className="px-8 py-4 bg-white/50 hover:bg-white/80 rounded-full text-gray-800 font-semibold shadow-sm hover:shadow-md transition-all duration-200 border border-white/50">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="flex-1 relative">
                    {/* Abstract Calculator Visualization */}
                    <div className="relative w-full aspect-[3/4] bg-gray-900 rounded-[2rem] shadow-2xl p-4 border-4 border-gray-800 transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                        {/* Screen */}
                        <div className="h-1/3 bg-gray-800 rounded-xl mb-4 p-4 flex flex-col justify-end items-end relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                            <div className="text-gray-400 text-sm mb-1">2 + 2 =</div>
                            <div className="text-white text-3xl font-mono">4</div>
                        </div>
                        {/* Keypad Lines */}
                        <div className="grid grid-cols-4 gap-2 h-1/2">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={`rounded-lg ${i % 4 === 3 ? 'bg-blue-600' : 'bg-gray-700'} opacity-50`}></div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-10 -right-10 bg-white/40 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                        <span className="text-2xl font-bold text-gray-800">100%</span>
                        <span className="block text-xs text-gray-600">Accuracy</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
