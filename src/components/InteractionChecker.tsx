import { useState } from 'react';
import { X, Search, Activity, AlertTriangle, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { drugs, Drug } from '../data/drugs';
import { GoogleGenAI } from "@google/genai";

interface InteractionResult {
  severity: 'high' | 'medium' | 'low' | 'none';
  summary: string;
  details: string;
  simpleMechanism?: string;
  recommendation: string;
}

export default function InteractionChecker({ onClose }: { onClose: () => void }) {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<InteractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredDrugs = drugs.filter(d => 
    !selectedDrugs.find(s => s.id === d.id) &&
    (d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     d.englishName.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 10);

  const categories = Array.from(new Set(drugs.map(d => d.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const addDrug = (drug: Drug) => {
    if (selectedDrugs.length >= 5 || selectedDrugs.find(s => s.id === drug.id)) return;
    setSelectedDrugs([...selectedDrugs, drug]);
    setSearchQuery('');
  };

  const removeDrug = (id: string) => {
    setSelectedDrugs(selectedDrugs.filter(d => d.id !== id));
    setResult(null);
  };

  const checkInteractions = async () => {
    if (selectedDrugs.length < 2) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const drugNames = selectedDrugs.map(d => `${d.englishName} (${d.name})`).join(', ');
      
      const prompt = `你是一位專業的腫瘤科藥師。請分析以下藥物之間的潛在交互作用（Drug-Drug Interactions）：
${drugNames}

請以 JSON 格式回傳，格式如下：
{
  "severity": "high" | "medium" | "low" | "none",
  "summary": "一句話總結交互作用狀況",
  "details": "詳細的交互作用機制說明 (繁體中文)",
  "simpleMechanism": "使用超簡單、白話的方式解釋交互作用機制，讓非醫療背景的人也能聽懂 (繁體中文)",
  "recommendation": "給護理人員的臨床建議或監測重點 (繁體中文)"
}

注意：
1. 若藥物間目前無已知重大交互作用，請回傳 severity: "none"。
2. Details 與 Recommendation 請使用專業的醫學術語。
3. simpleMechanism 請極度白話，並避免使用術語。`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text) as InteractionResult;
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('檢查失敗，請稍後再試。這可能與 API 金鑰或網路連線有關。');
    } finally {
      setLoading(false);
    }
  };

  const severityColors = {
    high: 'text-red-600 bg-red-100 border-red-200',
    medium: 'text-orange-600 bg-orange-100 border-orange-200',
    low: 'text-blue-600 bg-blue-100 border-blue-200',
    none: 'text-emerald-600 bg-emerald-100 border-emerald-200'
  };

  const severityIcons = {
    high: <AlertTriangle className="w-6 h-6" />,
    medium: <AlertTriangle className="w-6 h-6" />,
    low: <AlertCircle className="w-6 h-6" />,
    none: <CheckCircle2 className="w-6 h-6" />
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="p-6 bg-accent-blue text-white shrink-0 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6" />
            <h3 className="text-xl font-black">藥物交互作用檢查 (Interaction Checker)</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-white/80 text-sm font-medium">由 Gemini AI 提供支援，協助分析多種藥物併用的風險。</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Selection Area */}
        <div className="space-y-4">
          <label className="text-sm font-black text-text-muted uppercase tracking-widest px-1">已選取藥物 ({selectedDrugs.length}/5)</label>
          
                  <div className="flex flex-wrap gap-2 p-4 bg-white rounded-2xl border-2 border-dashed border-slate-200 min-h-[80px] items-center">
            {selectedDrugs.length === 0 && (
              <p className="text-slate-400 font-bold text-center w-full text-sm">尚未選取。請搜尋或從下方清單點選</p>
            )}
            <AnimatePresence>
              {selectedDrugs.map(drug => (
                <motion.div
                  key={drug.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-accent-blue text-white rounded-xl font-bold shadow-sm text-sm"
                >
                  <span>{drug.englishName} {drug.brandName && `(${drug.brandName})`}</span>
                  <button onClick={() => removeDrug(drug.id)} className="hover:text-red-200 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Search and Category Toggle */}
          <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜尋藥物名稱 (中文或英文)..."
                  className="w-full py-3 pl-12 pr-4 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-accent-blue outline-none transition-all font-bold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={selectedDrugs.length >= 5}
                />
              </div>
            </div>

            {searchQuery ? (
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {filteredDrugs.length > 0 ? (
                  filteredDrugs.map(drug => (
                    <button
                      key={drug.id}
                      onClick={() => addDrug(drug)}
                      className="w-full px-6 py-3 text-left hover:bg-accent-blue/5 transition-all flex justify-between items-center border-b border-slate-50 last:border-0"
                    >
                      <div>
                        <div className="font-bold text-text-dark">{drug.englishName} <span className="text-xs text-text-muted">({drug.brandName})</span></div>
                        <div className="text-xs text-text-muted">{drug.name}</div>
                      </div>
                      <span className="text-accent-blue font-black text-[10px] px-2 py-1 bg-accent-blue/10 rounded-md">選取</span>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-text-muted font-bold italic">未找到相符藥物</div>
                )}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row h-[350px]">
                {/* Category Sidebar */}
                <div className="w-full lg:w-40 bg-slate-50 border-r border-slate-100 flex lg:flex-col overflow-x-auto lg:overflow-y-auto custom-scrollbar shrink-0">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-3 text-left text-xs font-black transition-all whitespace-nowrap lg:whitespace-normal ${
                        activeCategory === cat 
                          ? 'bg-white text-accent-blue border-r-2 lg:border-r-4 border-accent-blue' 
                          : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {/* Drug List Area */}
                <div className="flex-1 overflow-y-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-2 custom-scrollbar content-start">
                  {drugs.filter(d => d.category === activeCategory && !selectedDrugs.find(s => s.id === d.id)).map(drug => (
                    <button
                      key={drug.id}
                      onClick={() => addDrug(drug)}
                      className="p-3 text-left bg-white border border-slate-100 rounded-xl hover:border-accent-blue hover:shadow-md transition-all group"
                    >
                      <div className="font-bold text-sm text-text-dark group-hover:text-accent-blue truncate">
                        {drug.englishName}
                      </div>
                      <div className="text-[10px] text-text-muted truncate">
                        {drug.brandName ? drug.brandName : drug.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="relative">
          <AnimatePresence>
            {selectedDrugs.length >= 2 && !loading && !result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute -top-12 left-0 right-0 text-center"
              >
                <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black shadow-sm flex items-center gap-2 w-fit mx-auto border border-emerald-200">
                  <Sparkles className="w-3 h-3" />
                  已準備好！點擊開始分析
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={checkInteractions}
            disabled={selectedDrugs.length < 2 || loading}
            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg relative overflow-hidden ${
              selectedDrugs.length < 2 || loading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] shadow-emerald-200'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                正在啟動 AI 專家系統...
              </span>
            ) : (
              <>
                <div className={`absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-opacity duration-500 ${selectedDrugs.length >= 2 ? 'opacity-100' : 'opacity-0'}`} />
                <span className="relative flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  開始分析交互作用
                </span>
              </>
            )}
          </button>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6"
            >
              <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-slate-100">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent-blue to-transparent"
                  />
                </div>
                
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-accent-blue"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-10 h-10 text-accent-blue animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900">AI 藥理分析中</h4>
                  <p className="text-slate-500 font-bold text-sm">
                    正在諮詢 Gemini 醫學大模型<br />分析藥物間的潛在交互作用...
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-2 h-2 bg-accent-blue rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Area */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-700 font-bold flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={`p-6 rounded-3xl border-2 flex gap-5 items-start ${severityColors[result.severity]}`}>
                <div className="p-3 bg-white/50 rounded-2xl shrink-0">
                  {severityIcons[result.severity]}
                </div>
                <div>
                  <div className="text-sm font-black uppercase tracking-tighter mb-1 opacity-80">風險等級：{result.severity.toUpperCase()}</div>
                  <h4 className="text-2xl font-black mb-2">{result.summary}</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h5 className="text-lg font-black text-text-dark mb-4 border-b pb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-accent-blue" />
                    交互作用機制 (Mechanism)
                  </h5>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                    {result.details}
                  </p>
                  {result.simpleMechanism && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-base text-amber-900 font-extrabold flex gap-2">
                        <span className="shrink-0">👉</span>
                        <span>簡單說: {result.simpleMechanism}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h5 className="text-lg font-black text-text-dark mb-4 border-b pb-2 flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    護理監測重點 (Clinical Recommendations)
                  </h5>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                    {result.recommendation}
                  </p>
                </div>
              </div>

              <div className="text-center italic text-xs text-text-muted p-4">
                * 本功能由 AI 提供參考，實際用藥請務必遵守醫師處分與藥師核對規範。
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
