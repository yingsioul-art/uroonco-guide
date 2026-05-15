import { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Copy, Check, KeyRound, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

interface RewriteResult {
  brief: string;
  detailed: string;
  classification: '免疫檢查點抑制劑 (immune checkpoint inhibitor, ICI)' | '標靶藥品 (targeted therapy)' | '抗體結合藥物 (antibody-drug conjugate, ADC)' | string;
}

interface Props {
  drugEnglishName: string;
  drugChineseName: string;
  mechanism: string;
  onClose: () => void;
}

const STORAGE_KEY = 'geminiApiKey';

function buildPrompt(drugName: string, chineseName: string, mechanism: string) {
  return `以下是 ${drugName}（${chineseName}）的藥理機轉原文說明：

「${mechanism}」

請依照下列原則改寫，說明的受詞是護理師，目的是幫助護理師理解後能對病人進行衛教指導：

1. 說明此藥為單株抗體（monoclonal antibody, mAb），並明確標註其分類屬於下列哪一種，且附上英文全名：
   - 免疫檢查點抑制劑（immune checkpoint inhibitor, ICI）
   - 標靶藥品（targeted therapy）
   - 抗體結合藥物（antibody-drug conjugate, ADC）

2. 所有專有名詞保留中文，並在第一次出現時加上英文全名與縮寫，例如：程序性死亡配體 1（programmed death-ligand 1, PD-L1）

3. 艱深的免疫或分子機轉用詞，降階改用護理師日常工作能理解的比喻或白話說明，例如：
   - 受體結合 → 黏住／接上
   - 抑制訊號 → 讓...停止攻擊／發出「不要攻擊」的訊號
   - 腫瘤免疫逃脫 → 癌細胞偽裝成正常組織

請以 JSON 格式回傳，格式如下：
{
  "classification": "藥品分類完整中英文（例：免疫檢查點抑制劑（immune checkpoint inhibitor, ICI）；若非 mAb 三大類，請填最接近分類）",
  "brief": "2-3 句的【簡要說明】，用最白話的語言，讓護理師能直接口頭轉述給病人。說明藥品分類、作用對象、核心機轉。",
  "detailed": "連貫的段落（勿用條列），依序涵蓋：藥品分類 → 癌細胞如何逃脫免疫 → 藥物如何介入 → 最終效果。專有名詞第一次出現須附英文全名與縮寫。結尾不需要加護理指導摘要。"
}

注意：
- 全部以繁體中文輸出。
- brief 與 detailed 內的英文全名與縮寫請保留。
- 不要在 JSON 之外輸出任何額外文字。`;
}

export default function MechanismRewriter({ drugEnglishName, drugChineseName, mechanism, onClose }: Props) {
  // Resolve API key: env first (AI Studio dev), then localStorage (user-provided on Pages)
  const envKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || '';
  const [apiKey, setApiKey] = useState<string>(() => {
    if (envKey && envKey !== 'MY_GEMINI_API_KEY') return envKey;
    return localStorage.getItem(STORAGE_KEY) || '';
  });
  const [tempKey, setTempKey] = useState('');
  const [result, setResult] = useState<RewriteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<'brief' | 'detailed' | 'all' | null>(null);

  const hasKey = !!apiKey;

  const runRewrite = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: buildPrompt(drugEnglishName, drugChineseName, mechanism),
        config: { responseMimeType: 'application/json' },
      });
      const data = JSON.parse(response.text) as RewriteResult;
      setResult(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Auto-run on open when a key is already available
  useEffect(() => {
    if (hasKey && !result && !loading && !error) {
      runRewrite();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveKey = () => {
    const trimmed = tempKey.trim();
    if (!trimmed) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    setApiKey(trimmed);
    setTempKey('');
    // Immediately try a rewrite with the new key
    setTimeout(runRewrite, 50);
  };

  const clearKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey('');
    setResult(null);
    setError(null);
  };

  const copyText = async (section: 'brief' | 'detailed' | 'all', text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 bg-white/15 rounded-lg shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold opacity-80">AI 衛教改寫</div>
                <h2 className="text-lg sm:text-xl font-black truncate">{drugEnglishName}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors shrink-0"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {/* API Key entry */}
            {!hasKey && (
              <div className="flex flex-col items-center text-center gap-3 py-6">
                <div className="p-3 bg-purple-100 rounded-2xl">
                  <KeyRound className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-lg font-black text-text-dark">需要 Gemini API Key</h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-sm">
                  本功能會呼叫 Google Gemini 改寫機轉文字。請貼上您的 API Key
                  (僅儲存在本機瀏覽器 localStorage,不會上傳)。
                  <br />
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent-blue underline font-bold"
                  >
                    取得免費 API Key →
                  </a>
                </p>
                <div className="w-full max-w-md flex flex-col sm:flex-row gap-2 mt-2">
                  <input
                    type="password"
                    placeholder="貼上 API Key..."
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveKey()}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-sm font-mono"
                  />
                  <button
                    onClick={saveKey}
                    disabled={!tempKey.trim()}
                    className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-black hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    儲存並改寫
                  </button>
                </div>
              </div>
            )}

            {/* Loading */}
            {hasKey && loading && (
              <div className="flex flex-col items-center gap-3 py-12">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                <p className="text-sm text-text-muted font-bold">AI 正在改寫衛教文稿...</p>
              </div>
            )}

            {/* Error */}
            {hasKey && error && !loading && (
              <div className="flex flex-col gap-3 py-4">
                <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-black text-red-900">改寫失敗</div>
                    <div className="text-xs text-red-700 break-words mt-1">{error}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={runRewrite}
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-black hover:bg-purple-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> 重試
                  </button>
                  <button
                    onClick={clearKey}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    更換 API Key
                  </button>
                </div>
              </div>
            )}

            {/* Result */}
            {hasKey && result && !loading && (
              <div className="flex flex-col gap-5">
                {/* Classification badge */}
                {result.classification && (
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 bg-purple-50 text-purple-800 rounded-full text-xs font-black border border-purple-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    {result.classification}
                  </div>
                )}

                {/* Brief */}
                <section>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-black text-purple-700">【簡要說明】</h3>
                    <button
                      onClick={() => copyText('brief', result.brief)}
                      className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                      title="複製簡要說明"
                    >
                      {copiedSection === 'brief' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
                    <p className="text-base leading-relaxed text-text-dark font-medium whitespace-pre-wrap">
                      {result.brief}
                    </p>
                  </div>
                </section>

                {/* Detailed */}
                <section>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-black text-purple-700">【詳細說明】</h3>
                    <button
                      onClick={() => copyText('detailed', result.detailed)}
                      className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                      title="複製詳細說明"
                    >
                      {copiedSection === 'detailed' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-base leading-relaxed text-text-dark whitespace-pre-wrap">
                      {result.detailed}
                    </p>
                  </div>
                </section>

                {/* Footer actions */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => copyText('all', `【簡要說明】\n${result.brief}\n\n【詳細說明】\n${result.detailed}`)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-black hover:bg-purple-700 transition-colors"
                  >
                    {copiedSection === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedSection === 'all' ? '已複製' : '複製全部'}
                  </button>
                  <button
                    onClick={runRewrite}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> 重新產生
                  </button>
                  <button
                    onClick={clearKey}
                    className="ml-auto text-xs text-text-muted hover:text-text-dark underline"
                  >
                    更換 API Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
