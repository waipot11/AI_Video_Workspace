import React, { useState, useEffect } from "react";
import { FunnyScript, ShopeeProduct } from "../types";
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  FileText, 
  Sparkles, 
  Flame, 
  ChevronRight, 
  Copy, 
  Check, 
  Clock, 
  Smartphone,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VideoGeneratorProps {
  script: FunnyScript | null;
  product: ShopeeProduct | null;
  isGenerating: boolean;
}

export default function VideoGenerator({ script, product, isGenerating }: VideoGeneratorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  // Auto-play interval logic simulating video player
  useEffect(() => {
    let timer: any;
    if (isPlaying && script) {
      const activeScene = script.storyboard[currentSceneIndex];
      const durationMs = (activeScene?.duration || 4) * 1000;
      
      let start = Date.now();
      timer = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.min((elapsed / durationMs) * 100, 100);
        setProgress(percent);

        if (percent >= 100) {
          clearInterval(timer);
          setProgress(0);
          if (currentSceneIndex < script.storyboard.length - 1) {
            setCurrentSceneIndex((prev) => prev + 1);
          } else {
            setCurrentSceneIndex(0);
            setIsPlaying(false);
          }
        }
      }, 100);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIndex, script]);

  // Restart play on script load
  useEffect(() => {
    setCurrentSceneIndex(0);
    setProgress(0);
    setIsPlaying(false);
  }, [script]);

  const handleCopyTitle = () => {
    if (!script) return;
    navigator.clipboard.writeText(script.title);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  const handleCopyDesc = () => {
    if (!script) return;
    navigator.clipboard.writeText(script.description);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[500px] text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin" />
          <Sparkles className="w-6 h-6 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-200">กำลังปัญญาประดิษฐ์สร้างวิดีโอป้ายยาแนวหักมุมขำขัน...</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            กำลังสแกนคำอธิบายเด่นของผลิตภัณฑ์ นำเสนอพล็อตหักมุมขำขัน เขียนบทพากย์เสียง และซิงก์พิกัดภาพวิชวล
          </p>
        </div>
      </div>
    );
  }

  if (!script || !product) {
    return (
      <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[500px] text-center space-y-4">
        <Smartphone className="w-12 h-12 text-slate-700 animate-bounce" />
        <div>
          <h3 className="text-sm font-bold text-slate-300">คลิปวิดีโอยังไม่ถูกสร้าง</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            เลือกสินค้าจากคลังด้านซ้าย จากนั้นกดปุ่ม <span className="text-emerald-400 font-bold">"ทำคลิปหักมุม"</span> ระบบ AI จะสร้างสรรค์วิดีโอสั้นพร้อมโพสต์ทันที!
          </p>
        </div>
      </div>
    );
  }

  const activeScene = script.storyboard[currentSceneIndex];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
      {/* Smartphone Vertical Shorts Frame Player */}
      <div className="md:col-span-5 flex flex-col items-center">
        <div className="relative w-full max-w-[280px] aspect-[9/16] bg-slate-950 border-[6px] border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-emerald-500/5 group flex flex-col justify-between">
          
          {/* Top Notch / Status Bar */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
          </div>

          {/* Video Background Scene Image (Simulating continuous frame slideshow) */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSceneIndex}
                src={activeScene?.imageUrl}
                alt={`Scene ${currentSceneIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover brightness-75"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80" />
          </div>

          {/* Top Indicators Overlay */}
          <div className="relative z-10 px-4 pt-8 flex justify-between items-center w-full">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[8px] font-bold text-white tracking-wider font-mono">
                SCENE {currentSceneIndex + 1}/4
              </span>
            </div>

            <div className="text-[9px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
              <Flame className="w-2.5 h-2.5 fill-slate-950" />
              <span>แนวหักมุมฮา</span>
            </div>
          </div>

          {/* Subtitles Overlay Center */}
          <div className="relative z-10 px-4 w-full flex flex-col items-center text-center space-y-4 mb-2">
            
            {/* Animated waveforms showing speech synthesis */}
            {isPlaying && (
              <div className="flex items-center gap-0.5 justify-center h-4">
                {[1, 2, 3, 4, 3, 2, 4, 1, 3, 2, 4].map((i, idx) => (
                  <motion.span
                    key={idx}
                    className="w-[2px] bg-emerald-400 rounded-full"
                    animate={{ height: ["4px", "14px", "4px"] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: idx * 0.05,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Subtitle bubble */}
            <div className="bg-black/60 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-md max-w-[240px] shadow-lg">
              <p className="text-white text-[11px] font-bold leading-snug">
                {activeScene?.subtitle}
              </p>
            </div>

            {/* Video Controls and Progress Tracker */}
            <div className="w-full space-y-2 pb-3">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-100 ease-linear" 
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/60 font-mono">
                  {currentSceneIndex * 3}s / 14s
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setCurrentSceneIndex(0);
                      setProgress(0);
                      setIsPlaying(false);
                    }}
                    className="text-white/80 hover:text-white transition cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentSceneIndex((prev) => (prev + 1) % 4);
                      setProgress(0);
                    }}
                    className="text-white/80 hover:text-white transition cursor-pointer"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Volume2 className="w-3.5 h-3.5 text-white/60" />
              </div>
            </div>
          </div>

        </div>

        <p className="text-[10px] text-slate-500 mt-2 font-mono flex items-center gap-1">
          <Info className="w-3 h-3 text-emerald-400" />
          <span>จำลองการแสดงผลคลิปสั้นแบบเสถียร 100%</span>
        </p>
      </div>

      {/* Script & Meta Information details */}
      <div className="md:col-span-7 flex flex-col justify-between space-y-4">
        
        {/* Joke concept display */}
        <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 space-y-2">
          <span className="text-[9px] text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">
            คอนเซ็ปต์ตลกหักมุม (Comedy Twist)
          </span>
          <h4 className="text-xs font-bold text-slate-200 mt-1">
            {script.concept}
          </h4>
          <p className="text-[11px] text-slate-400">
            <span className="font-bold text-rose-400">พล็อตหักมุมขำขัน:</span> {script.plotTwist}
          </p>
        </div>

        {/* Copyable Optimized YouTube Post metadata */}
        <div className="space-y-3">
          {/* YouTube Shorts Title */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">ชื่อเรื่องแนะนำ (YouTube Shorts Title)</span>
              <button
                onClick={handleCopyTitle}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedTitle ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedTitle ? "คัดลอกแล้ว!" : "คัดลอก"}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-xl text-xs text-slate-100 font-bold leading-relaxed">
              {script.title}
            </div>
          </div>

          {/* YouTube Shorts Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">รายละเอียด & แท็กป้ายยา (Description & Affiliate Link)</span>
              <button
                onClick={handleCopyDesc}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedDesc ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedDesc ? "คัดลอกแล้ว!" : "คัดลอก"}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-xl text-xs text-slate-400 whitespace-pre-wrap font-mono leading-relaxed max-h-[140px] overflow-y-auto scrollbar-thin">
              {script.description}
            </div>
          </div>
        </div>

        {/* Detailed scenes table */}
        <div className="space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">บทพากย์และเฟรมงานภาพละเอียด (Scene Board)</span>
          
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto scrollbar-thin pr-1">
            {script.storyboard.map((sc, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setCurrentSceneIndex(idx);
                  setProgress(0);
                }}
                className={`flex gap-3 items-start p-2.5 rounded-xl border transition cursor-pointer ${
                  currentSceneIndex === idx
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                }`}
              >
                <span className="w-5 h-5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {sc.sceneNo}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-200 font-semibold line-clamp-1">🎙️ {sc.voiceover}</p>
                  <p className="text-[9px] text-slate-500 truncate mt-0.5">Prompt: {sc.visualPrompt}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">{sc.duration} วินาที</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
