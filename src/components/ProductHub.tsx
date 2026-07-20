import React, { useState } from "react";
import { ShopeeProduct } from "../types";
import { Link2, Sparkles, Plus, RefreshCw, ShoppingBag, BadgeAlert, Flame, CheckCircle } from "lucide-react";

interface ProductHubProps {
  products: ShopeeProduct[];
  onAddProduct: (product: ShopeeProduct) => void;
  onSelectProduct: (product: ShopeeProduct) => void;
  selectedProductId?: string;
  onGenerateVideo: (product: ShopeeProduct) => void;
  isGenerating: boolean;
}

export default function ProductHub({
  products,
  onAddProduct,
  onSelectProduct,
  selectedProductId,
  onGenerateVideo,
  isGenerating
}: ProductHubProps) {
  const [shopeeUrl, setShopeeUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gemini Trending States
  const [trendingProducts, setTrendingProducts] = useState<ShopeeProduct[]>([]);
  const [isSearchingTrending, setIsSearchingTrending] = useState(false);
  const [trendingError, setTrendingError] = useState<string | null>(null);
  const [addedTrendIds, setAddedTrendIds] = useState<Record<string, boolean>>({});

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopeeUrl.trim()) return;

    setIsScraping(true);
    setError(null);

    try {
      const response = await fetch("/api/scrape-shopee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: shopeeUrl.trim() })
      });

      if (!response.ok) {
        throw new Error("ล้มเหลวในการเชื่อมต่อเซิร์ฟเวอร์วิเคราะห์ลิงก์ Shopee");
      }

      const data = await response.json();
      if (data.success && data.product) {
        onAddProduct(data.product);
        setShopeeUrl("");
      } else {
        throw new Error(data.error || "ไม่สามารถดึงข้อมูลสินค้าได้");
      }
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าชั่วคราว");
    } finally {
      setIsScraping(false);
    }
  };

  const fetchTrendingProducts = async () => {
    setIsSearchingTrending(true);
    setTrendingError(null);
    try {
      const response = await fetch("/api/search-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error("ล้มเหลวในการสื่อสารกับเซิร์ฟเวอร์วิเคราะห์กระแสสินค้า");
      }
      const data = await response.json();
      if (data.success && data.products) {
        setTrendingProducts(data.products);
      } else {
        throw new Error("ไม่ได้รับข้อมูลกระแสจาก AI ในปัจจุบัน");
      }
    } catch (err: any) {
      setTrendingError(err.message || "เกิดข้อผิดพลาดจากระบบวิเคราะห์ข้อมูลกระแส Gemini");
    } finally {
      setIsSearchingTrending(false);
    }
  };

  const handleAddTrendItemInOneClick = (prod: ShopeeProduct) => {
    // Mark as added
    setAddedTrendIds(prev => ({ ...prev, [prod.id]: true }));
    // Add to library and automatically fire up generation!
    onAddProduct(prod);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-5 space-y-6">
      
      {/* SECTION 1: ค้นหาสินค้าป้ายยาสุดฮิตด้วย Gemini AI (New AI Feature) */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/10 space-y-3.5 relative overflow-hidden">
        {/* Decorative corner pulse indicator */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Flame className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-100">
                ค้นหาสินค้าป้ายยาสุดฮิตด้วย Gemini AI ✨
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                ค้นหากระแสสินค้ามาแรงล่าสุด เพื่อนำมาทำวิดีโอ Shorts แบบหักมุมขำขัน
              </p>
            </div>
          </div>
          <span className="text-[8px] uppercase tracking-wider bg-red-500/15 text-red-400 font-bold px-2 py-0.5 rounded border border-red-500/20">
            HOT AI TRENDS
          </span>
        </div>

        <button
          id="btn-fetch-gemini-trends"
          onClick={fetchTrendingProducts}
          disabled={isSearchingTrending}
          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSearchingTrending ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>{isSearchingTrending ? "Gemini กำลังวิเคราะห์สินค้าขายดี..." : "วิเคราะห์ค้นหาสินค้าป้ายยาสุดฮิตล่าสุด"}</span>
        </button>

        {trendingError && (
          <div className="flex items-center gap-2 text-[11px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
            <BadgeAlert className="w-4 h-4 shrink-0" />
            <span>{trendingError}</span>
          </div>
        )}

        {trendingProducts.length > 0 && (
          <div className="space-y-2 mt-2 pt-2 border-t border-slate-900">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              💡 ผลวิเคราะห์สินค้าขายดีปัจจุบันจาก Gemini:
            </span>
            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
              {trendingProducts.map((prod) => {
                const alreadyAdded = addedTrendIds[prod.id] || products.some(p => p.title === prod.title);
                return (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-900 border border-slate-850 hover:border-slate-800 transition"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-9 h-9 rounded object-cover border border-slate-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded font-bold shrink-0">
                            {prod.price}
                          </span>
                          <span className="text-[8px] text-slate-400 truncate uppercase">
                            {prod.category}
                          </span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-200 mt-0.5 truncate leading-tight">
                          {prod.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      id={`btn-add-trend-${prod.id}`}
                      disabled={alreadyAdded || isGenerating}
                      onClick={() => handleAddTrendItemInOneClick(prod)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 transition cursor-pointer ${
                        alreadyAdded
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm"
                      }`}
                    >
                      {alreadyAdded ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>เพิ่มแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>ทำคลิป (1-Click)</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: ค้นหาและวิเคราะห์สินค้า Shopee ด้วยลิงก์ */}
      <div className="space-y-3 pt-2 border-t border-slate-900/60">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-emerald-400" />
            <span>นำเข้าสินค้าป้ายยาด้วย URL</span>
          </h3>
          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
            MANUAL IMPORT
          </span>
        </div>

        <form onSubmit={handleScrape} className="flex gap-2">
          <div className="relative flex-1">
            <input
              id="shopee-url-scraper-input"
              type="url"
              required
              placeholder="วางลิงก์สินค้า Shopee เช่น https://shopee.co.th/product/..."
              value={shopeeUrl}
              onChange={(e) => setShopeeUrl(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition"
            />
            <ShoppingBag className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
          </div>
          <button
            id="shopee-scrape-submit-btn"
            type="submit"
            disabled={isScraping || !shopeeUrl.trim()}
            className={`px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
              isScraping ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isScraping ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{isScraping ? "วิเคราะห์ลิงก์..." : "นำเข้าป้ายยา"}</span>
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
            <BadgeAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* SECTION 3: คลังสินค้าป้ายยาพร้อมแปลงเป็นคลิปหักมุม */}
      <div className="space-y-3 pt-2 border-t border-slate-900/60">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          คลังสินค้าป้ายยาพร้อมแปลงเป็นคลิปหักมุม ({products.length} ชิ้น)
        </h4>

        <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
          {products.map((prod) => {
            const isSelected = prod.id === selectedProductId;
            return (
              <div
                key={prod.id}
                id={`product-card-${prod.id}`}
                className={`group flex gap-3 p-3 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-slate-950/80 border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                    : "bg-slate-950/50 border-slate-850 hover:bg-slate-950/90 hover:border-slate-800"
                }`}
              >
                {/* Product Image */}
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-850 bg-slate-900 relative">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 bg-slate-950/80 text-[8px] text-emerald-400 font-bold px-1 rounded">
                    {prod.price}
                  </div>
                </div>

                {/* Info and action */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[8px] text-slate-500 bg-slate-900 border border-slate-800 px-1 px-1.5 py-0.2 rounded font-mono truncate max-w-full">
                        {prod.category}
                      </span>
                    </div>
                    <h5
                      onClick={() => onSelectProduct(prod)}
                      className="text-xs font-bold text-slate-200 mt-1 truncate hover:text-emerald-400 cursor-pointer"
                    >
                      {prod.title}
                    </h5>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-1.5">
                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="text-[10px] text-slate-400 hover:text-slate-100 transition"
                    >
                      ดูรายละเอียด
                    </button>

                    <button
                      id={`btn-generate-video-for-${prod.id}`}
                      disabled={isGenerating}
                      onClick={() => onGenerateVideo(prod)}
                      className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20 text-[10px] font-bold rounded-lg cursor-pointer transition flex items-center gap-1 shrink-0"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isGenerating && isSelected ? "กำลังทำ..." : "ทำคลิปหักมุม"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
