import React, { useState } from "react";
import { AutomationSettings, AutomationJob } from "../types";
import { 
  Settings, 
  Play, 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  Cpu, 
  RefreshCw, 
  Youtube, 
  Sliders, 
  ToggleLeft, 
  ToggleRight,
  XCircle,
  Video
} from "lucide-react";

interface AutomationControlProps {
  settings: AutomationSettings;
  onUpdateSettings: (settings: AutomationSettings) => void;
  logs: string[];
  jobs: AutomationJob[];
  onTriggerFullAutomation: () => void;
  isTriggering: boolean;
  user: any;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function AutomationControl({
  settings,
  onUpdateSettings,
  logs,
  jobs,
  onTriggerFullAutomation,
  isTriggering,
  user,
  onSignIn,
  onSignOut
}: AutomationControlProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleAutoUpload = () => {
    onUpdateSettings({
      ...settings,
      autoUploadYoutube: !settings.autoUploadYoutube
    });
  };

  const handleSubIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({
      ...settings,
      shopeeSubId: e.target.value
    });
  };

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateSettings({
      ...settings,
      tone: e.target.value as any
    });
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateSettings({
      ...settings,
      automationInterval: e.target.value
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Column 1: Settings Panel */}
      <div className="lg:col-span-5 bg-slate-900/60 border border-slate-900 rounded-2xl p-5 space-y-5">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-400" />
          <span>ตั้งค่าระบบ Automation 100%</span>
        </h3>

        {/* Form elements */}
        <div className="space-y-4">
          
          {/* Sub ID */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
              Shopee Affiliate Sub-ID (เพื่อรับค่าคอมมิชชั่น)
            </label>
            <input
              type="text"
              placeholder="กรอก Sub-ID เช่น admin-noina-shop"
              value={settings.shopeeSubId}
              onChange={handleSubIdChange}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500/80 transition"
            />
            <p className="text-[9px] text-slate-500">
              ระบบจะแปลงลิงก์สินค้าทุกชิ้นเพื่อฝังแท็ก Sub-ID ของคุณอัตโนมัติก่อนโพสต์
            </p>
          </div>

          {/* Tone selection */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
              โทนความฮาของบทพากย์ AI (Comedy Tone)
            </label>
            <select
              value={settings.tone}
              onChange={handleToneChange}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500/80 transition cursor-pointer"
            >
              <option value="extremely_funny">ฮาตัวโยก ตลกโบ๊ะบ๊ะ (Extremely Funny)</option>
              <option value="sarcastic">ประชดประชัน เสียดสีปนฮา (Sarcastic Parody)</option>
              <option value="dramatic_twist">พล็อตดราม่าหักมุมสุดหลอน (Ghost Dramatic Twist)</option>
              <option value="parody">ล้อเลียนโฆษณายุค 90s (Retro Parody)</option>
            </select>
          </div>

          {/* Posting Interval */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
              ความถี่ในการรันโพสต์วิดีโออัตโนมัติ
            </label>
            <select
              value={settings.automationInterval}
              onChange={handleIntervalChange}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500/80 transition cursor-pointer"
            >
              <option value="6h">ทุกๆ 6 ชั่วโมง (วันละ 4 คลิป)</option>
              <option value="12h">ทุกๆ 12 ชั่วโมง (วันละ 2 คลิป)</option>
              <option value="24h">วันละ 1 คลิป (ช่วงเย็นยอดฮิต)</option>
              <option value="manual">รันมือด้วยตนเองเท่านั้น (Manual Trigger)</option>
            </select>
          </div>

          {/* Auto upload toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-900 rounded-xl">
            <div>
              <span className="block text-xs font-bold text-slate-200">โพสต์ลง YouTube Shorts ทันที</span>
              <span className="block text-[9px] text-slate-500">หลังแต่งบทพากย์เสร็จจะยิงโพสต์ขึ้น YouTube ทันที</span>
            </div>
            <button
              onClick={toggleAutoUpload}
              className="text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
            >
              {settings.autoUploadYoutube ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-600" />
              )}
            </button>
          </div>

          {/* YouTube Connection Status */}
          <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <span className="block text-[11px] font-bold text-slate-200">บัญชี YouTube Creator</span>
                  <span className="block text-[9px] text-slate-500">สำหรับอัปโหลดจริง 100%</span>
                </div>
              </div>
              {user ? (
                <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                  เชื่อมต่อแล้ว
                </span>
              ) : (
                <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full">
                  รอเชื่อมต่อ
                </span>
              )}
            </div>

            {user ? (
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-900/60">
                <div className="flex items-center gap-2 min-w-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-6 h-6 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                      YT
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold text-slate-300 truncate">{user.displayName || "YouTube Creator"}</span>
                    <span className="block text-[8px] text-slate-500 truncate">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[9px] font-bold rounded transition cursor-pointer shrink-0"
                >
                  ยกเลิก
                </button>
              </div>
            ) : (
              <div className="pt-1">
                <button
                  onClick={onSignIn}
                  className="w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition shadow-md shadow-red-950/20 cursor-pointer"
                >
                  <Youtube className="w-4 h-4 fill-white" />
                  <span>เชื่อมต่อช่อง YouTube (Google OAuth)</span>
                </button>
                <p className="text-[9px] text-slate-500 text-center mt-1.5 leading-relaxed">
                  *สิทธิ์ YouTube.upload ใช้สำหรับอัปโหลดวิดีโอ Shorts อัตโนมัติไปยังช่องของคุณโดยตรง
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Column 2: Log Terminal & Running jobs queue */}
      <div className="lg:col-span-7 space-y-4">
        
        {/* Core Actions bar */}
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-200">เปิดระบบการเขียนคลิปและอัปโหลดทันที</h4>
            <p className="text-[10px] text-slate-400">ระบบจะทำการสแกนสินค้าเด่นในคลังขึ้นมาสร้างพล็อตหักมุมขำขัน เขียนบท แยกร่างและโพสต์ยูทูปทันที</p>
          </div>

          <button
            id="trigger-full-automation-flow-btn"
            disabled={isTriggering}
            onClick={onTriggerFullAutomation}
            className={`w-full sm:w-auto px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg cursor-pointer shrink-0 ${
              isTriggering ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isTriggering ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-slate-950" />
            )}
            <span>{isTriggering ? "กำลังทำงาน..." : "รันระบบอัตโนมัติเดี๋ยวนี้ (Run 100%)"}</span>
          </button>
        </div>

        {/* Real-time Logs Console */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 font-mono">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE SYSTEM LOGS TERMINAL</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-1.5 font-mono text-[10px] max-h-[160px] overflow-y-auto scrollbar-thin text-slate-300">
            {logs.map((log, idx) => (
              <div key={idx} className="leading-relaxed">
                <span className="text-emerald-500 font-bold">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>

        {/* Queue table */}
        <div className="space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">ประวัติการโพสต์และคิวงานอัตโนมัติ (Automation Jobs)</span>

          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl overflow-hidden">
            <div className="max-h-[160px] overflow-y-auto scrollbar-thin">
              {jobs.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  ไม่มีประวัติการรันในเซสชันนี้ ระบบกำลังเฝ้าสังเกตการณ์คิวรันถัดไป...
                </div>
              ) : (
                <div className="divide-y divide-slate-900">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200 truncate max-w-[200px]">{job.productTitle}</span>
                          <span className="text-[9px] text-slate-500 font-mono">{job.createdAt}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          💡 พล็อตหักมุม: {job.script?.concept || "กำลังคำนวณ..."}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {job.status === "failed" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <XCircle className="w-2.5 h-2.5" />
                            <span>อัปโหลดล้มเหลว</span>
                          </span>
                        ) : !job.youtubeId ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20" title="วิดีโอถูกสร้างเรียบร้อยแล้วในเซิร์ฟเวอร์ แต่ไม่ได้อัปโหลดขึ้น YouTube เนื่องจากยังไม่ได้เชื่อมบัญชี">
                            <Video className="w-2.5 h-2.5" />
                            <span>บันทึกในคลัง</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle className="w-2.5 h-2.5" />
                            <span>โพสต์สำเร็จ</span>
                          </span>
                        )}
                        
                        <div className="flex items-center gap-1.5">
                          {job.youtubeId && (
                            <a 
                              href={`https://studio.youtube.com/video/${job.youtubeId}/edit`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-2 py-0.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[9px] font-bold rounded border border-amber-500/20 transition flex items-center gap-0.5"
                              title="เปิดแก้ไขสถานะคลิปส่วนตัวใน YouTube Studio"
                            >
                              🛠️ แก้ไขหลังบ้าน
                            </a>
                          )}
                          <a 
                            href={job.youtubeUrl || `https://youtube.com/shorts/${job.youtubeId || ""}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2 py-0.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[9px] font-bold rounded border border-red-500/20 transition"
                          >
                            เปิดคลิปสั้น
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Warning & Guidance for YouTube Shorts Uploads */}
        <div className="p-4.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 mt-0.5">
              <Youtube className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100">
                💡 คู่มือตรวจสอบคลิปสั้นหลังอัปโหลด (สำคัญมาก)
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                ทำไมวิดีโอที่อัปโหลดสำเร็จแล้วจึงยังไม่ปรากฏบนหน้า "วิดีโอ" ใน YouTube Studio ของคุณ?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-900 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 block">
                1. ตรวจสอบที่แท็บ "Shorts" เสมอ
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                เนื่องจากแพลตฟอร์มสร้างไฟล์วิดีโอแนวตั้งสัดส่วน 9:16 (2K 1440x2560) และติดแท็ก <span className="text-slate-200">#shorts</span> ยูทูปจะจัดส่งเข้าในหมวดคลิปสั้นโดยเฉพาะ คุณต้องกดที่แท็บ <span className="font-bold text-slate-200">"Shorts"</span> (อยู่ถัดจากแท็บ "วิดีโอ" ในภาพของคุณ) เพื่อดูคลิป
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-900 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 block">
                2. วิดีโอจะถูกตั้งสถานะเป็น "ส่วนตัว" (Private)
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                ตามนโยบายความปลอดภัยของ Google API หากรหัสเชื่อมต่อ (OAuth Client ID) ยังไม่ได้รับการตรวจสอบยืนยัน (Unverified App) วิดีโอที่อัปโหลดทั้งหมดจะถูกบังคับให้เป็นสถานะ <span className="font-bold text-slate-200">"ส่วนตัว" (Private)</span> โดยอัตโนมัติ คุณสามารถเปลี่ยนเป็น "สาธารณะ" ได้เองในหลังบ้าน
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-900/60 font-mono">
            <span>⚙️ การเชื่อมต่อ: เสถียร 100%</span>
            <span>📍 พิกัด: YouTube Studio &gt; Shorts &gt; ปรับสถานะเป็นสาธารณะ</span>
          </div>
        </div>

      </div>
    </div>
  );
}
