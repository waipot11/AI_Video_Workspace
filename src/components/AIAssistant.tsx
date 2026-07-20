import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw, BadgeHelp } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "สวัสดีครับ! ยินดีต้อนรับสู่ **ศูนย์ให้คำปรึกษาแผนวีดีโอ Shopee Automation** 🤖✨\n\nผมพร้อมช่วยคุณคิดไอเดียบทภาพยนตร์พล็อตหักมุมขำขันแบบเจ๋งๆ หรือปรึกษาวิธีดึงยอดขายด้วยคลิป YouTube Shorts บังคับคลิก!\n\n**ลองถามผมดูสิครับ เช่น:**\n- *'ขอไอเดียตลกๆ สำหรับขายสินค้าหม้อหุงข้าวจิ๋วหน่อย'* \n- *'ทำยังไงให้คนดูคลิปจบแล้วกดลิงก์ Shopee ใต้คอมเมนต์ทันที?'*"
    }
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error("ล้มเหลวในการเชื่อมต่อเซิร์ฟเวอร์ปัญญาประดิษฐ์");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "ขออภัยด้วยครับ ระบบวิเคราะห์ภาษาของ Gemini ขัดข้องชั่วคราว แต่คำแนะนำสำหรับการทำวิดีโอ Shorts ป้ายยาที่ดีคือ: เน้นใส่ข้อความตัวหนากลางหน้าจอ, ตัดเสียงพูดให้กระชับห้ามเว้นจังหวะหายใจ และหักมุมภายใน 10 วินาทีแรกเพื่อหยุดนิ้วคนดูครับ!"
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 flex flex-col h-[500px]">
      <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>แชทบอทวิเคราะห์ & วางแผนสคริปต์วิดีโอ (AI Strategist)</span>
        </h3>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-500/20">
          Gemini 3.5 Flash
        </span>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin mb-3">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  isUser
                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                    : "bg-slate-950 border-slate-850 text-slate-400"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? "bg-emerald-500 text-slate-950 font-semibold"
                    : "bg-slate-950/80 border border-slate-850 text-slate-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-3 max-w-[85%] mr-auto items-center">
            <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            </div>
            <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-2xl text-xs text-slate-500 italic">
              AI กำลังประมวลผลคำตอบแนวหักมุมขำขัน...
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          id="ai-coaching-input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความปรึกษาเกี่ยวกับพล็อตวิดีโอหรือเทคนิคทำคลิป..."
          className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition"
        />
        <button
          id="btn-send-chat-to-ai"
          type="submit"
          disabled={!input.trim() || isSending}
          className="px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl flex items-center justify-center transition cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
