"use client"

import React, { useState, useEffect } from 'react';
import { Circle, Sparkles, Brain, Zap, ArrowRight, Check, Github, Twitter } from 'lucide-react';

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            left: `${mousePos.x - 250}px`,
            top: `${mousePos.y - 250}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-md group-hover:blur-lg transition-all opacity-75" />
                <div className="relative bg-black border border-purple-500/50 rounded-xl p-2">
                  <div className="grid grid-cols-2 gap-1">
                    <Circle className="w-2 h-2 fill-purple-500 text-purple-500" />
                    <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />
                    <Circle className="w-2 h-2 fill-purple-500 text-purple-500" />
                    <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />
                  </div>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Dote
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#how" className="text-gray-400 hover:text-white transition-colors">How it works</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Sign in
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-purple-500/25">
                Get started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">Your second brain for development</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]">
                <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Connect the
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  dots
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                작은 지식 하나하나를 기록하고 연결해서<br className="hidden md:block" />
                더 큰 인사이트를 만들어보세요
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <button className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
                <span className="relative z-10 flex items-center gap-2">
                  Start free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="px-8 py-4 border border-white/20 hover:border-white/40 rounded-xl font-bold text-lg transition-all hover:bg-white/5 flex items-center gap-2">
                <Github className="w-5 h-5" />
                View demo
              </button>
            </div>

            {/* Hero Visual - Interactive Dots */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />
              
              <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-1 shadow-2xl">
                <div className="bg-black/60 rounded-3xl p-8 md:p-12">
                  <div className="grid md:grid-cols-5 gap-6">
                    {/* Notes Preview */}
                    <div className="md:col-span-3 space-y-4">
                      {[
                        { title: 'React Server Components', tag: 'react', color: 'cyan', time: '2시간 전' },
                        { title: 'TypeScript 5.0 새기능', tag: 'typescript', color: 'blue', time: '어제' },
                        { title: 'Next.js 15 마이그레이션', tag: 'next', color: 'purple', time: '3일 전' }
                      ].map((note, i) => (
                        <div 
                          key={i}
                          className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all cursor-pointer hover:scale-[1.02]"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-${note.color}-400 animate-pulse`} />
                              <span className="text-xs text-gray-500">{note.time}</span>
                            </div>
                            <span className={`px-2 py-1 bg-${note.color}-500/10 text-${note.color}-400 text-xs rounded-full border border-${note.color}-500/20`}>
                              #{note.tag}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{note.title}</h3>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            Server Components는 서버에서만 실행되는 컴포넌트로...
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Connection Graph */}
                    <div className="md:col-span-2 bg-white/5 rounded-2xl p-6 border border-white/10 flex items-center justify-center">
                      <div className="relative w-full h-64">
                        <svg className="w-full h-full">
                          {/* Connections */}
                          <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.6" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>

                          <g filter="url(#glow)">
                            <line x1="25%" y1="25%" x2="75%" y2="40%" stroke="url(#lineGrad)" strokeWidth="2" className="animate-pulse" />
                            <line x1="25%" y1="25%" x2="50%" y2="75%" stroke="url(#lineGrad)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                            <line x1="75%" y1="40%" x2="50%" y2="75%" stroke="url(#lineGrad)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1s'}} />
                            <line x1="75%" y1="40%" x2="90%" y2="70%" stroke="url(#lineGrad)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                          </g>

                          {/* Nodes */}
                          <circle cx="25%" cy="25%" r="16" fill="#a78bfa" className="animate-pulse" />
                          <circle cx="75%" cy="40%" r="16" fill="#60a5fa" className="animate-pulse" style={{animationDelay: '0.3s'}} />
                          <circle cx="50%" cy="75%" r="16" fill="#c084fc" className="animate-pulse" style={{animationDelay: '0.6s'}} />
                          <circle cx="90%" cy="70%" r="12" fill="#818cf8" className="animate-pulse" style={{animationDelay: '0.9s'}} />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-center">
                            <Brain className="w-12 h-12 text-purple-400 mx-auto mb-2 animate-pulse" />
                            <p className="text-sm text-gray-400 font-medium">Knowledge Graph</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="container mx-auto px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Simple yet Powerful
              </h2>
              <p className="text-xl text-gray-400">필요한 기능만 담았습니다</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: '빠른 기록',
                  desc: '생각나는 순간 바로 기록. 마크다운 지원으로 코드도 쉽게 정리.',
                  gradient: 'from-yellow-500 to-orange-500'
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: '지식 연결',
                  desc: '관련된 노트를 연결하고 시각화. 큰 그림을 볼 수 있어요.',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: '개인 브랜딩',
                  desc: 'dote.io/username으로 공유. 당신만의 지식 포트폴리오.',
                  gradient: 'from-blue-500 to-cyan-500'
                }
              ].map((feature, i) => (
                <div key={i} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />
                  <div className="relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-300 hover:scale-105">
                    <div className={`inline-flex p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
              ))}
            </div>
            <h3 className="text-3xl font-bold mb-6">
              개발자들이 사랑하는 이유
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                '복잡한 설정 없이 바로 시작',
                '마크다운으로 코드 정리 가능',
                '노트 간 연결로 지식 구조화'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                지금 시작하세요
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              무료로 시작. 신용카드 필요 없음. 언제든 업그레이드 가능.
            </p>
            <button className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-2xl text-xl font-bold transition-all hover:scale-105 shadow-2xl shadow-purple-500/25">
              <span className="flex items-center gap-3">
                무료로 시작하기
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-sm" />
                <div className="relative bg-black border border-purple-500/50 rounded-lg p-2">
                  <div className="grid grid-cols-2 gap-1">
                    <Circle className="w-1.5 h-1.5 fill-purple-500 text-purple-500" />
                    <Circle className="w-1.5 h-1.5 fill-blue-500 text-blue-500" />
                    <Circle className="w-1.5 h-1.5 fill-purple-500 text-purple-500" />
                    <Circle className="w-1.5 h-1.5 fill-blue-500 text-blue-500" />
                  </div>
                </div>
              </div>
              <span className="font-bold text-lg">Dote</span>
              <span className="text-gray-500">© 2024</span>
            </div>
            <div className="flex gap-8 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}