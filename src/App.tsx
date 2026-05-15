import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, User, Calendar, MessageSquare, ArrowRight, X, BrainCircuit, Info, ShieldAlert, Activity, AlertTriangle, Calculator, Thermometer, Droplets, CheckCircle2, HelpCircle, Lightbulb, Pencil, Star, Moon, Sun, Printer, HeartPulse, Volume2, ChevronDown, Sparkles, Stethoscope, Zap, XCircle, Clock, RefreshCw, BookOpen, ClipboardList, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { drugs, Drug } from './data/drugs';
import { regimens, Regimen } from './data/regimens';
import InteractionChecker from './components/InteractionChecker';
import MechanismRewriter from './components/MechanismRewriter';


import { ExtravasationGuide } from './components/ExtravasationGuide';

// Nursing Point component (simplified for reuse)
function PatientSideEffectGuide({ drug }: { drug: Drug }) {
  if (!drug.patientEducation) return null;
  
  const sideEffects = drug.patientEducation.sideEffects;
  
  return (
    <div className="space-y-6">
      {/* Side Effect Assessments Grid */}
      <div className="p-6 bg-white/80 rounded-2xl border-2 border-purple-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full -mr-16 -mt-16 blur-2xl" />
        <h3 className="text-xl font-black text-purple-800 mb-4 flex items-center gap-2 relative z-10">
          <Sparkles className="w-5 h-5" /> 副作用評估清單 ({sideEffects.length} 項重點)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {sideEffects.map((s, i) => (
            <div key={i} className="group bg-white/60 p-5 rounded-2xl border border-purple-100 flex flex-col h-full shadow-sm hover:shadow-lg transition-all duration-300 hover:bg-white hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm font-black shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <span className="font-black text-purple-950 text-lg leading-tight border-b-2 border-purple-100 pb-1 flex-1">{s.reaction}</span>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="text-purple-800 text-[15px] font-bold bg-purple-50/70 p-4 rounded-xl border border-purple-50 h-full leading-relaxed">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-3 bg-purple-400 rounded-full" />
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 font-black">處置建議 Management</span>
                  </div>
                  {s.management}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {drug.patientEducation.importantNotes && (
        <div className="p-5 bg-red-50 rounded-2xl border-2 border-red-200 shadow-sm mt-4">
          <h4 className="text-base font-black text-red-700 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" /> 核心注意事項 (Important Clinical Warnings)
          </h4>
          <div className="space-y-2">
            {(Array.isArray(drug.patientEducation.importantNotes) ? drug.patientEducation.importantNotes : [drug.patientEducation.importantNotes]).map((note, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <p className="text-base font-black text-red-900 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Random Quiz Component
function RandomQuiz({ drugId, onClose }: { drugId: string | null, onClose: () => void }) {
  // Helper to generate dynamic questions based on drug data
  const getStableQuestions = (drug: Drug) => {
    // Determine plausible distractors based on category or common clinical settings
    const commonDistractors = [
      "靜脈輸注不少於 15 分鐘",
      "0.45% NaCl",
      "5% Dextrose (D5W)",
      "需避光放置於室溫",
      "高致吐性風險",
      "發疱性外滲 (Vesicant)",
      "刺激性外滲 (Irritant)",
      "不需使用任何濾網",
      "治療前不需基線檢查",
      "主要由腎臟排除無須調整劑量"
    ];

    const generateOptions = (correct: string, type: 'diluent' | 'speed' | 'risk' | 'extravasation' | 'general') => {
      let filtered = commonDistractors.filter(d => d !== correct);
      
      // Contextual distractors
      if (type === 'diluent') {
        filtered = ["5% D5W", "0.45% NaCl", "Sterile Water for Injection", "林格氏液 (LR)"].filter(d => d !== correct);
      } else if (type === 'risk') {
        filtered = ["極高致吐性", "高致吐性", "中度致吐性", "極低致吐性"].filter(d => d !== correct);
      } else if (type === 'extravasation') {
        filtered = ["發疱性 (Vesicant)", "刺激性 (Irritant)", "非發疱性 (Non-vesicant)"].filter(d => d !== correct);
      }
      
      const distractions = filtered.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...distractions].sort(() => Math.random() - 0.5);
      return { options, index: options.indexOf(correct) };
    };

    const questions: any[] = [];

    // 1. Mechanism Question
    if (drug.type) {
      const { options, index } = generateOptions(drug.type, 'general');
      questions.push({
        question: `根據臨床藥理學，${drug.englishName} (${drug.name}) 的主要藥理機制分類為何？`,
        options,
        answerIndex: index,
        explanation: `${drug.englishName} 屬於 ${drug.type}。機轉描述：${drug.mechanism}`,
        drugName: drug.englishName
      });
    }

    // 2. Administration Question (Diluent)
    if (drug.administration?.diluent) {
      const { options, index } = generateOptions(drug.administration.diluent, 'diluent');
      questions.push({
        question: `臨床護理執行 ${drug.englishName} 藥物稀釋配製時，應優先選用何種溶媒？`,
        options,
        answerIndex: index,
        explanation: `根據仿單指引，${drug.englishName} 建議使用 ${drug.administration.diluent} 進行稀釋。`,
        drugName: drug.englishName
      });
    }

    // 3. Extravasation Risk
    if (drug.extravasation) {
      const { options, index } = generateOptions(drug.extravasation, 'extravasation');
      questions.push({
        question: `關於 ${drug.englishName} 的外滲性質分類，下列敘述何者正確？`,
        options,
        answerIndex: index,
        explanation: `${drug.englishName} 於外滲處置指引中被歸類為：${drug.extravasation}。`,
        drugName: drug.englishName
      });
    }

    // 4. Monitoring / Side Effects
    if (drug.monitoring?.length) {
      const correct = drug.monitoring[0];
      const { options, index } = generateOptions(correct, 'general');
      questions.push({
        question: `護理人員在給予 ${drug.englishName} 治療期間，應重點監測下列哪項臨床指標？`,
        options,
        answerIndex: index,
        explanation: `使用 ${drug.englishName} 的護理重點包含：${drug.monitoring.join('、')}。`,
        drugName: drug.englishName
      });
    }

    // 5. Pre-medication
    if (drug.preMedication?.length && drug.preMedication[0] !== '無特殊前置處置') {
      const correct = drug.preMedication[0];
      const { options, index } = generateOptions(correct, 'general');
      questions.push({
        question: `關於 ${drug.englishName} 的前置藥物 (Pre-medication) 預防性給藥，仿單建議為何？`,
        options,
        answerIndex: index,
        explanation: `${drug.englishName} 的前置處置建議：${correct}。`,
        drugName: drug.englishName
      });
    }

    // 6. Emetic Risk
    if (drug.risk) {
      const { options, index } = generateOptions(drug.risk, 'risk');
      questions.push({
        question: `根據致吐風險分級，${drug.englishName} 被歸類為哪一等級？`,
        options,
        answerIndex: index,
        explanation: `${drug.englishName} 的致吐風險為：${drug.risk}。`,
        drugName: drug.englishName
      });
    }

    // 7. Administration Tool / device
    if (drug.administration?.device) {
      const correct = drug.administration.device;
      const { options, index } = generateOptions(correct, 'general');
      questions.push({
        question: `輸注 ${drug.englishName} 時，關於給藥設備 (Administration device) 的規範為何？`,
        options,
        answerIndex: index,
        explanation: `${drug.englishName} 的特殊給藥規範：${correct}。`,
        drugName: drug.englishName
      });
    }

    // 8. Clinical Pearl
    if (drug.clinicalPearls?.length) {
      const correct = drug.clinicalPearls[0];
      const { options, index } = generateOptions(correct, 'general');
      questions.push({
        question: `關於 ${drug.englishName} 的臨床實務重點 (Clinical Pearls)，下列何者正確？`,
        options,
        answerIndex: index,
        explanation: `💡 臨床經驗總結：${correct}`,
        drugName: drug.englishName
      });
    }

    // If we have very few questions, add a generic category one
    if (questions.length < 5) {
      const { options, index } = generateOptions(drug.category, 'general');
      questions.push({
        question: `${drug.englishName} 於本手冊中被歸類在下列哪一項治療類別？`,
        options,
        answerIndex: index,
        explanation: `${drug.englishName} 屬於 ${drug.category} 範疇。`,
        drugName: drug.englishName
      });
    }

    return questions.sort(() => Math.random() - 0.5);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizDrugs = useMemo(() => {
    if (drugId) {
      const drug = drugs.find(d => d.id === drugId);
      return drug ? [drug] : [];
    }
    return drugs;
  }, [drugId]);

  const shuffledQuestions = useMemo(() => {
    if (drugId && quizDrugs[0]) {
      // For a specific drug, we always generate 10 questions
      const generated = getStableQuestions(quizDrugs[0]);
      const staticQuizzes = (quizDrugs[0].quizzes || []).map(q => ({ ...q, drugName: quizDrugs[0].englishName }));
      return [...staticQuizzes, ...generated].sort(() => Math.random() - 0.5).slice(0, 10);
    }
    
    // Cross-drug random quiz
    const all = quizDrugs.flatMap(d => {
      const staticQ = (d.quizzes || []).map(q => ({ ...q, drugName: d.englishName }));
      const dynamicQ = getStableQuestions(d).slice(0, 2); 
      return [...staticQ, ...dynamicQ];
    });
    return all.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [quizDrugs, drugId]);

  if (shuffledQuestions.length === 0) return (
    <div className="p-10 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <HelpCircle className="w-8 h-8 text-slate-400" />
      </div>
      <p className="text-slate-500 font-bold">目前尚無相關測驗題目。</p>
      <button onClick={onClose} className="mt-4 px-6 py-2 bg-accent-blue text-white rounded-xl font-bold">關閉</button>
    </div>
  );

  const currentQ = shuffledQuestions[currentIndex];

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="p-6 bg-purple-600 text-white shrink-0">
          <h3 className="text-xl font-bold flex items-center gap-2 justify-center">
            <Star className="w-6 h-6" /> 挑戰完成 (Challenge Completed)
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-8 text-center space-y-8 custom-scrollbar">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Star className="w-12 h-12 text-purple-600 animate-bounce" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-text-dark mb-4">很棒的挑戰！</h3>
            <div className="inline-block px-6 py-4 bg-purple-50 rounded-3xl border-2 border-purple-100">
              <p className="text-text-muted font-bold text-lg">最終得分</p>
              <p className="text-purple-600 text-5xl font-black mt-1">
                {score} <span className="text-2xl text-purple-300">/ {shuffledQuestions.length}</span>
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-base text-text-muted leading-relaxed">
            「專業護理不在於記得所有細節，而在於隨時保持學習與求證的熱忱。」
          </div>
        </div>
        <div className="p-6 border-t border-slate-100 shrink-0 bg-white">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-purple-200 hover:bg-purple-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            返回臨床手冊 <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 bg-purple-600 text-white shrink-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5" />
            <span className="font-black text-sm uppercase tracking-widest">
              {drugId ? `${currentQ.drugName} 隨堂測驗` : '跨藥物綜合挑戰'}
            </span>
          </div>
          <span className="text-sm font-black bg-white/20 px-3 py-1 rounded-full">
            {currentIndex + 1} / {shuffledQuestions.length}
          </span>
        </div>
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
            className="h-full bg-white"
          />
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
        <div className="space-y-4">
          <div className="inline-block bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-xs font-black mb-2">
            QUESTION
          </div>
          <h4 className="text-xl font-black text-text-dark leading-snug">
            {currentQ.question}
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((opt, i) => (
            <button
              key={i}
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => handleAnswer(i)}
              className={`p-4 rounded-2xl border-2 text-left transition-all font-bold flex justify-between items-center group active:scale-[0.98] ${
                isAnswered
                  ? i === currentQ.answerIndex
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : i === selectedOption
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-slate-100 opacity-60'
                  : 'border-slate-100 hover:border-purple-200 hover:bg-purple-50/30'
              }`}
            >
              <span className="text-lg">{opt}</span>
              {isAnswered && i === currentQ.answerIndex && <CheckCircle2 className="w-5 h-5" />}
              {isAnswered && i === selectedOption && i !== currentQ.answerIndex && <XCircle className="w-5 h-5" />}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border ${selectedOption === currentQ.answerIndex ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className={`w-4 h-4 ${selectedOption === currentQ.answerIndex ? 'text-emerald-600' : 'text-red-600'}`} />
                <span className={`font-black text-sm ${selectedOption === currentQ.answerIndex ? 'text-emerald-700' : 'text-red-700'}`}>
                  解析 (Explanation)
                </span>
              </div>
              <p className="text-base font-bold text-text-dark leading-relaxed">
                {currentQ.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 border-t border-slate-100 shrink-0 bg-white">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group active:scale-95 ${
            isAnswered 
              ? 'bg-purple-600 text-white shadow-xl shadow-purple-200 hover:bg-purple-700 hover:scale-[1.02]' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          {currentIndex < shuffledQuestions.length - 1 ? '下一題' : '查看結果'}
          <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isAnswered ? 'group-hover:translate-x-1' : ''}`} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedDrugId, setSelectedDrugId] = useState<string>(drugs[0].id);
  const [selectedRegimenId, setSelectedRegimenId] = useState<string | null>(null);
  const [sidebarMode, setSidebarMode] = useState<'drugs' | 'regimens'>('drugs');
  // Mobile drawer state — sidebar slides in on small screens.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('全部');
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const [isInteractionCheckerOpen, setIsInteractionCheckerOpen] = useState(false);
  const [isMechanismRewriterOpen, setIsMechanismRewriterOpen] = useState(false);
  const [isRandomQuizOpen, setIsRandomQuizOpen] = useState(false);
  const [quizDrugId, setQuizDrugId] = useState<string | null>(null);
  const [showExtravasationNotes, setShowExtravasationNotes] = useState(false);
  const combinationsRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('favoriteDrugs') || '[]'));
  
  const [userName, setUserName] = useState(() => localStorage.getItem('nurseName') || '點擊設定姓名');
  const [isEditingName, setIsEditingName] = useState(false);
  const [showNameHint, setShowNameHint] = useState(() => !localStorage.getItem('nurseName'));
  const [tempName, setTempName] = useState(userName);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('favoriteDrugs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (selectedRegimenId && combinationsRef.current) {
      combinationsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (!selectedRegimenId && mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedRegimenId, selectedDrugId]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // 先取消正在進行的發音
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // 稍微放慢語速，讓學習者聽得更清楚
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const saveName = () => {
    const finalName = tempName.trim() || '醫護同仁';
    setUserName(finalName);
    localStorage.setItem('nurseName', finalName);
    setIsEditingName(false);
    setShowNameHint(false);
  };

  const selectedDrug = useMemo(() => 
    drugs.find(d => d.id === selectedDrugId) || drugs[0], 
  [selectedDrugId]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(drugs.map(d => d.category))).sort((a, b) => a.localeCompare(b, 'zh-TW'));
    return ['全部', ...cats];
  }, []);

  const subCategories = useMemo(() => {
    if (selectedCategory === '全部') return ['全部'];
    const subs = Array.from(new Set(drugs.filter(d => d.category === selectedCategory).map(d => d.subCategory))).sort((a, b) => a.localeCompare(b, 'zh-TW'));
    return ['全部', ...subs];
  }, [selectedCategory]);

  const filteredDrugs = useMemo(() => {
    return drugs
      .filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             d.englishName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === '全部' || d.category === selectedCategory;
        const matchesSubCategory = selectedSubCategory === '全部' || d.subCategory === selectedSubCategory;
        return matchesSearch && matchesCategory && matchesSubCategory;
      })
      .sort((a, b) => a.englishName.localeCompare(b.englishName));
  }, [searchQuery, selectedCategory, selectedSubCategory]);

  const sectionNumbers = useMemo(() => {
    let count = 1;
    const nums: Record<string, number> = {};
    
    nums['intro'] = count++;
    nums['admin'] = count++;
    nums['check'] = count++;
    nums['extra'] = count++;
    nums['side'] = count++;
    
    if (selectedDrug.dosageAdjustment || selectedDrug.interactions) {
      nums['dose'] = count++;
    }
    
    if (selectedDrug.clinicalPearls && selectedDrug.clinicalPearls.length > 0) {
      nums['pearls'] = count++;
    }
    
    const relevantRegimens = selectedRegimenId 
      ? regimens.filter(r => r.id === selectedRegimenId) 
      : regimens.filter(r => r.drugIds.includes(selectedDrug.id));
    if (relevantRegimens.length > 0) {
      nums['combo'] = count++;
    }
    
    return nums;
  }, [selectedDrug, selectedRegimenId]);

  return (
    <div className="flex flex-col md:flex-row md:h-screen w-full md:w-screen p-2 sm:p-3 md:p-5 gap-2 sm:gap-3 md:gap-5 md:overflow-hidden">
      {/* Mobile sidebar overlay backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar — drawer on mobile, fixed column on desktop */}
      <aside
        className={`glass-panel flex flex-col p-3 sm:p-4 md:shrink-0 fixed md:relative inset-y-0 left-0 z-40 md:z-auto w-72 sm:w-80 max-w-[85vw] transition-transform duration-300 md:overflow-hidden h-screen md:h-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center gap-2 mb-4 md:mb-6 px-2 shrink-0">
          <div className="p-1.5 bg-accent-blue/10 rounded-lg">
            <BrainCircuit className="text-accent-blue w-6 h-6" />
          </div>
          <h2 className="font-bold text-xl text-accent-blue tracking-tight flex-1">UroOnco Guide</h2>
          {/* Close button visible only inside the mobile drawer */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-text-muted"
            aria-label="關閉選單"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Mode Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 shrink-0">
          <button 
            onClick={() => setSidebarMode('drugs')}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${sidebarMode === 'drugs' ? 'bg-white shadow-sm text-accent-blue' : 'text-text-muted hover:text-text-dark'}`}
          >
            藥物清單
          </button>
          <button 
            onClick={() => setSidebarMode('regimens')}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${sidebarMode === 'regimens' ? 'bg-purple-600 shadow-md text-white' : 'text-text-muted hover:text-text-dark'}`}
          >
            處方組合
          </button>
        </div>

        {sidebarMode === 'drugs' ? (
          <>
            <div className="relative mb-4 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="搜尋藥物名稱..." 
                className="w-full bg-white/80 rounded-xl py-2.5 pl-10 pr-4 text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-2 px-1 shrink-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubCategory('全部');
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all uppercase tracking-wider ${
                    selectedCategory === cat 
                      ? 'bg-accent-blue text-white shadow-md' 
                      : 'bg-white/50 text-text-muted hover:bg-white border border-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sub-Category Tabs */}
            {selectedCategory !== '全部' && subCategories.length > 2 && (
              <div className="flex flex-wrap gap-1 mb-4 px-1 shrink-0">
                {subCategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubCategory(sub)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                      selectedSubCategory === sub 
                        ? 'bg-slate-600 text-white' 
                        : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mx-1 px-1">
              {favorites.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 px-2 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 我的常用藥物
                  </h3>
                  <div className="space-y-1.5">
                    {drugs.filter(d => favorites.includes(d.id)).map(drug => {
                      const isActive = selectedDrugId === drug.id && !selectedRegimenId;
                      return (
                        <div
                          key={drug.id}
                          onClick={() => {
                            setSelectedDrugId(drug.id);
                            setSelectedRegimenId(null);
                            setIsSidebarOpen(false);
                            if (selectedDrugId === drug.id && !selectedRegimenId && mainContentRef.current) {
                              mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className={`group cursor-pointer rounded-xl p-2.5 transition-all border ${
                            isActive
                              ? 'bg-accent-blue text-white shadow-lg border-accent-blue'
                              : 'bg-white/60 border-transparent hover:bg-white hover:border-yellow-200 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                              isActive ? 'bg-white/20' : 'bg-yellow-50 border-2 border-yellow-400/30'
                            }`}>
                              <Star className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-300 fill-yellow-300' : 'text-yellow-500 fill-yellow-400'}`} />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-base sm:text-lg font-black truncate min-w-0 flex-1">{drug.englishName}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); speak(drug.englishName); }}
                                  className={`p-1 rounded-full shrink-0 transition-colors ${isActive ? 'hover:bg-white/20 text-white/80' : 'hover:bg-slate-200 text-slate-400 group-hover:text-accent-blue'}`}
                                  aria-label="發音英文藥名"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                                <span className={`text-sm font-bold truncate min-w-0 ${isActive ? 'text-white/85' : 'text-text-muted'}`}>
                                  {drug.name}
                                </span>
                                {drug.brandName && (
                                  <span className={`inline-flex items-center gap-1 text-[10px] leading-none px-1.5 py-0.5 rounded font-black border shrink-0 ${
                                    isActive ? 'bg-white/20 text-white border-white/30' : 'bg-slate-100 text-slate-600 border-slate-200 uppercase'
                                  }`}>
                                    {drug.brandName}
                                    <button
                                      onClick={(e) => { e.stopPropagation(); speak(drug.brandName!); }}
                                      className={`p-0.5 rounded transition-colors ${isActive ? 'hover:bg-white/20' : 'hover:bg-slate-200'}`}
                                      aria-label="發音商品名"
                                    >
                                      <Volume2 className="w-2.5 h-2.5" />
                                    </button>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 px-2">全部藥物清單</h3>
              <div className="space-y-1.5 pb-4">
                {filteredDrugs.map((drug, idx) => {
                  const isActive = selectedDrugId === drug.id && !selectedRegimenId;
                  // category accent strip (left edge)
                  const accent = drug.category === '化學治療' ? 'bg-accent-blue'
                    : drug.category === '免疫治療' ? 'bg-purple-500'
                    : drug.category === '標靶治療' ? 'bg-emerald-500'
                    : 'bg-slate-400';
                  return (
                    <div
                      key={drug.id}
                      onClick={() => {
                        setSelectedDrugId(drug.id);
                        setSelectedRegimenId(null);
                        setIsSidebarOpen(false);
                        if (selectedDrugId === drug.id && !selectedRegimenId && mainContentRef.current) {
                          mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`group cursor-pointer rounded-xl p-2.5 transition-all border relative overflow-hidden ${
                        isActive
                          ? 'bg-accent-blue text-white shadow-lg border-accent-blue'
                          : 'bg-white/60 border-transparent hover:bg-white hover:border-accent-blue/20 hover:shadow-sm'
                      }`}
                    >
                      {/* Category color strip on the left */}
                      {!isActive && <span className={`absolute left-0 top-2 bottom-2 w-1 rounded-r ${accent}`} aria-hidden="true" />}
                      <div className="flex items-start gap-2.5 min-w-0 pl-1.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-50 border-2 border-slate-200 text-slate-500 group-hover:border-accent-blue/30 group-hover:text-accent-blue'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-base sm:text-lg font-black truncate min-w-0 flex-1">{drug.englishName}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); speak(drug.englishName); }}
                              className={`p-1 rounded-full shrink-0 transition-colors ${isActive ? 'hover:bg-white/20 text-white/80' : 'hover:bg-slate-200 text-slate-400 group-hover:text-accent-blue'}`}
                              aria-label="發音英文藥名"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                            <span className={`text-sm font-bold truncate min-w-0 ${isActive ? 'text-white/85' : 'text-text-muted'}`}>
                              {drug.name}
                            </span>
                            {drug.brandName && (
                              <span className={`inline-flex items-center gap-1 text-[10px] leading-none px-1.5 py-0.5 rounded font-black border shrink-0 ${
                                isActive ? 'bg-white/20 text-white border-white/30' : 'bg-slate-100 text-slate-600 border-slate-200 uppercase'
                              }`}>
                                {drug.brandName}
                                <button
                                  onClick={(e) => { e.stopPropagation(); speak(drug.brandName!); }}
                                  className={`p-0.5 rounded transition-colors ${isActive ? 'hover:bg-white/20' : 'hover:bg-slate-200'}`}
                                  aria-label="發音商品名"
                                >
                                  <Volume2 className="w-2.5 h-2.5" />
                                </button>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mx-1 px-1">
            <h3 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-4 px-2 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> 臨床治療組合系列
            </h3>
            <div className="space-y-2 pb-4">
              {regimens.map((regimen) => (
                <div
                  key={regimen.id}
                  onClick={() => {
                    const isAlreadySelected = selectedRegimenId === regimen.id;
                    setSelectedRegimenId(regimen.id);
                    if (regimen.drugIds.length > 0) {
                      setSelectedDrugId(regimen.drugIds[0]);
                    }
                    setIsSidebarOpen(false);
                    if (isAlreadySelected && combinationsRef.current) {
                      combinationsRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border-2 flex flex-col gap-1 shadow-sm relative overflow-hidden group ${
                    selectedRegimenId === regimen.id 
                      ? 'bg-purple-600 border-purple-600 text-white shadow-purple-200 translate-x-2' 
                      : 'bg-white border-slate-100 hover:border-purple-200 text-text-dark hover:bg-purple-50/30'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-base font-black leading-tight">
                      {regimen.name}
                    </span>
                  </div>
                  
                  {selectedRegimenId === regimen.id && (
                    <motion.div 
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white/40"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-col gap-2 shrink-0">
          <button 
            onClick={() => {
              setQuizDrugId(null);
              setIsRandomQuizOpen(true);
            }}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all border border-purple-500/20"
          >
            <BrainCircuit className="w-4 h-4" /> 綜合隨堂測驗
          </button>
          <button 
            onClick={() => setIsInteractionCheckerOpen(true)}
            className="w-full py-2.5 bg-emerald-600/10 text-emerald-700 rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-600/20"
          >
            <Activity className="w-4 h-4" /> 藥物交互作用檢查
          </button>
          <button 
            onClick={() => setIsToolboxOpen(true)}
            className="w-full py-2.5 bg-accent-blue/10 text-accent-blue rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:bg-accent-blue hover:text-white transition-all border border-accent-blue/20"
          >
            <ShieldAlert className="w-4 h-4" /> 外滲處理指引
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 md:overflow-hidden min-w-0">
        <header className="glass-panel flex items-center justify-between gap-2 px-3 sm:px-4 md:px-6 py-2.5 md:py-3 md:h-[70px] shrink-0 flex-wrap">
          {/* Mobile hamburger to open sidebar */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-accent-blue/10 text-accent-blue shrink-0"
            aria-label="開啟藥物清單"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-sm sm:text-base md:text-xl lg:text-2xl font-black text-accent-blue truncate min-w-0 flex-1">
            <span className="hidden md:inline">泌尿腫瘤抗癌藥品智慧學習系統</span>
            <span className="hidden sm:inline md:hidden">泌尿腫瘤學習系統</span>
            <span className="sm:hidden">UroOnco</span>
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6 text-sm sm:text-base md:text-lg text-text-dark flex-wrap justify-end">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-accent-blue/10 rounded-full transition-colors text-accent-blue"
              title={isDarkMode ? "切換至淺色模式" : "切換至深色模式"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 relative">
              <User className="w-4 h-4 text-accent-blue" />
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveName()}
                    onBlur={saveName}
                    autoFocus
                    className="bg-white border border-accent-blue/30 rounded px-2 py-0.5 text-base focus:outline-none focus:ring-1 focus:ring-accent-blue w-24"
                  />
                </div>
              ) : (
                <div 
                  className="flex items-center gap-1.5 cursor-pointer hover:bg-accent-blue/5 px-2 py-1 rounded-lg transition-all group relative"
                  onClick={() => {
                    setTempName(userName);
                    setIsEditingName(true);
                    setShowNameHint(false);
                  }}
                >
                  <span className={`font-bold ${userName === '點擊設定姓名' ? 'text-accent-blue italic' : ''}`}>
                    <span className="hidden sm:inline">護理師：</span>{userName}
                  </span>
                  <motion.div
                    animate={userName === '點擊設定姓名' ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Pencil className={`w-3 h-3 ${userName === '點擊設定姓名' ? 'text-accent-blue' : 'text-accent-blue/40'} group-hover:text-accent-blue transition-colors`} />
                  </motion.div>
                  
                  {/* 引導氣泡 */}
                  <AnimatePresence>
                    {showNameHint && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap"
                      >
                        <div className="bg-accent-blue text-white text-sm py-1.5 px-3 rounded-lg shadow-lg relative font-medium">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent-blue rotate-45" />
                          點擊這裡設定您的姓名
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tooltip hint (for hover) */}
                  {!showNameHint && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      點擊修改姓名
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-blue" />
              <span>{currentDate.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }).replace(/周|星期/, '')}</span>
            </div>
          </div>
        </header>

        <div ref={mainContentRef} className="flex-1 md:overflow-y-auto custom-scrollbar md:pr-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDrug.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 sm:gap-5 md:gap-6 pb-6 md:pb-10"
            >
              {/* Drug Hero Card */}
              <div className="glass-panel p-4 sm:p-5 md:p-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent-blue/5 rounded-full -mr-24 -mt-24 blur-3xl" />
                <div className="flex gap-3 sm:gap-4 md:gap-6 items-start sm:items-center relative z-10 min-w-0">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl shrink-0 ${
                    selectedDrug.category === '化學治療' ? 'bg-accent-blue' :
                    selectedDrug.category === '免疫治療' ? 'bg-purple-500' :
                    selectedDrug.category === '標靶治療' ? 'bg-accent-green' : 'bg-slate-500'
                  }`}>
                    <Activity className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-accent-blue/10 text-accent-blue text-[10px] sm:text-xs font-black uppercase tracking-widest">
                        {selectedDrug.category} • {selectedDrug.subCategory}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight break-words">{selectedDrug.englishName}</h2>
                        <button
                          onClick={() => speak(selectedDrug.englishName)}
                          className="p-1.5 sm:p-2 bg-accent-blue/10 hover:bg-accent-blue/20 rounded-full text-accent-blue transition-all shrink-0"
                          title="發音藥名"
                        >
                          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                      {selectedDrug.brandName && (
                        <div className="flex items-center gap-2 bg-accent-blue/5 px-2.5 py-1 sm:px-3 rounded-xl border border-accent-blue/10">
                          <span className="text-base sm:text-lg md:text-xl font-black text-accent-blue">
                            {selectedDrug.brandName}
                          </span>
                          <button
                            onClick={() => speak(selectedDrug.brandName!)}
                            className="p-1 sm:p-1.5 hover:bg-accent-blue/20 rounded-full text-accent-blue transition-all shrink-0"
                            title="發音商品名"
                          >
                            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-text-muted text-base sm:text-lg md:text-xl font-bold mt-0.5">({selectedDrug.name})</p>
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col items-start lg:items-end gap-2 sm:gap-3 relative z-10 flex-wrap">
                  <button 
                    onClick={() => {
                      setQuizDrugId(selectedDrug.id);
                      setIsRandomQuizOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-2xl text-base font-black hover:bg-purple-700 transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    <HelpCircle className="w-5 h-5" /> 隨堂測驗
                  </button>
                  <div className="flex gap-2">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black shadow-sm ${
                      selectedDrug.risk.includes('高') ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}>
                      <Activity className="w-4 h-4" />
                      {selectedDrug.risk}
                    </div>
                  </div>
                  {selectedDrug.extravasation?.includes('發疱') && !selectedDrug.extravasation?.includes('非') && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-black shadow-lg animate-pulse">
                      <Droplets className="w-4 h-4" />
                      強烈發疱劑 (Vesicant)
                    </div>
                  )}
                </div>
              </div>

              {/* 1. 藥物介紹 */}
              <section className="glass-panel p-4 sm:p-6 md:p-8 scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-accent-blue/10 rounded-xl">
                    <Info className="w-6 h-6 text-accent-blue" />
                  </div>
                  <h3 className="text-2xl font-black text-text-dark">{sectionNumbers['intro']}. 藥物介紹 (Drug Introduction)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-lg font-black text-accent-blue flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5" /> 作用機轉 (Mechanism)
                      </h4>
                      <button
                        onClick={() => setIsMechanismRewriterOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-black hover:shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all"
                        title="用 AI 將機轉改寫為護理衛教文稿"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> AI 衛教改寫
                      </button>
                    </div>
                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                      <p className="text-lg leading-relaxed text-text-dark font-medium">
                        {selectedDrug.mechanism}
                      </p>
                      {selectedDrug.simpleMechanism && (
                        <div className="pt-4 border-t border-slate-200/50">
                          <p className="text-base text-amber-900 font-extrabold flex gap-2">
                            <span className="shrink-0">👉</span>
                            <span>簡單說: {selectedDrug.simpleMechanism}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-accent-blue flex items-center gap-2">
                      <Activity className="w-5 h-5" /> 主要適應症 (Indications)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrug.indications.map(ind => (
                        <span key={ind} className="bg-blue-50 text-blue-800 px-4 py-2 rounded-xl border border-blue-100 text-base font-black">
                          {ind}
                        </span>
                      ))}
                    </div>
                    {/* Common Combinations extraction */}
                    {(selectedDrug.clinicalPearls?.some(p => p.includes('併用') || p.includes('搭配')) || 
                      selectedDrug.indications.some(i => i.includes('併用'))) && (
                      <div className="mt-6 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                        <h5 className="text-sm font-black text-purple-700 mb-2">常見處方組合</h5>
                        <ul className="text-base text-purple-900 space-y-1 font-bold">
                          {selectedDrug.indications.filter(i => i.includes('併用')).map((i, idx) => (
                            <li key={idx}>• {i}</li>
                          ))}
                          {selectedDrug.clinicalPearls?.filter(p => p.includes('併用') || p.includes('搭配')).map((p, idx) => (
                            <li key={idx}>• {p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* 2. 給藥資訊 & 3. 給藥前確認 (Grid) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 2. 給藥資訊 */}
                <section className="glass-panel p-4 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Droplets className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-black text-text-dark">{sectionNumbers['admin']}. 給藥資訊 (Administration)</h3>
                  </div>
                  <div className="space-y-6">
                    {selectedDrug.administration && (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white/60 p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
                          <div className="flex items-start justify-between">
                            <span className="text-emerald-700 font-black">稀釋溶媒</span>
                            <span className="text-text-dark font-black text-right max-w-[60%]">{selectedDrug.administration.diluent}</span>
                          </div>
                          <div className="flex items-start justify-between">
                            <span className="text-emerald-700 font-black">輸注速度</span>
                            <span className="text-text-dark font-black text-right">{selectedDrug.administration.speed}</span>
                          </div>
                          {selectedDrug.administration.device && (
                            <div className="flex items-start justify-between bg-red-50 p-2 rounded-lg">
                              <span className="text-red-700 font-black">輸液套/器材</span>
                              <span className="text-red-800 font-black text-right underline underline-offset-4">{selectedDrug.administration.device}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-black text-text-muted uppercase tracking-widest px-2">保存條件與安定性</h4>
                      <div className="bg-white/60 p-4 rounded-2xl border border-slate-100">
                        <p className="text-base font-bold text-text-dark leading-relaxed mb-4">{selectedDrug.storage}</p>
                        {selectedDrug.stability && (
                          <div className="overflow-x-auto">
                             <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-slate-100 text-emerald-800">
                                  <th className="pb-2 text-left">階段</th>
                                  <th className="pb-2 text-center">RT</th>
                                  <th className="pb-2 text-center">2-8°C</th>
                                </tr>
                              </thead>
                              <tbody className="text-text-dark font-bold">
                                {selectedDrug.stability.reconstitution && (
                                  <tr>
                                    <td className="py-2">調製液</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.reconstitution.roomTemp || "-"}</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.reconstitution.refrigerated || "-"}</td>
                                  </tr>
                                )}
                                {selectedDrug.stability.dilution && (
                                  <tr>
                                    <td className="py-2">稀釋液</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.dilution.roomTemp || "-"}</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.dilution.refrigerated || "-"}</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. 給藥前確認 */}
                <section className="glass-panel p-4 sm:p-6 md:p-8 border-l-4 border-amber-400">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-100 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-black text-text-dark">{sectionNumbers['check']}. 給藥前確認 (Pre-Check)</h3>
                  </div>
                  
                  {selectedDrug.clinicalAlert && (
                    <div className="mb-6 bg-red-50 p-4 rounded-2xl border border-red-200 flex gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                      <div>
                        <span className="block text-red-900 font-black text-sm uppercase">核心警告 (Alert)</span>
                        <p className="text-red-800 font-bold leading-relaxed">{selectedDrug.clinicalAlert}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-black text-amber-700 mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> 必查檢驗與監測 (Labs/Monitoring)
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrug.monitoring.map((item, idx) => (
                          <span key={idx} className="bg-amber-50 text-amber-800 px-3 py-1 rounded-lg border border-amber-100 text-sm font-bold">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-amber-700 mb-3 flex items-center gap-2">
                        <Droplets className="w-4 h-4" /> 特殊前置藥物 (Pre-meds)
                      </h4>
                      <ul className="space-y-2">
                        {selectedDrug.preMedication.map((item, idx) => (
                          <li key={idx} className="bg-white/60 p-3 rounded-xl border border-slate-100 text-base font-bold flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-amber-700 mb-3 flex items-center gap-2">
                        <Droplets className="w-4 h-4" /> 藥物穩定性與保存 (Stability)
                      </h4>
                      <div className="bg-white/60 p-4 rounded-2xl border border-slate-100 mb-4">
                        <p className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
                           <Clock className="w-3 h-3" /> 目前保存建議：{selectedDrug.storage}
                        </p>
                        {selectedDrug.stability && (
                          <div className="overflow-x-auto">
                             <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-slate-100 text-amber-700">
                                  <th className="pb-2 text-left">階段</th>
                                  <th className="pb-2 text-center">室溫 (RT)</th>
                                  <th className="pb-2 text-center">冷藏 (2-8°C)</th>
                                </tr>
                              </thead>
                              <tbody className="text-text-dark font-bold">
                                {selectedDrug.stability.reconstitution && (
                                  <tr className="border-b border-slate-50 last:border-0">
                                    <td className="py-2">調製液</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.reconstitution.roomTemp || "-"}</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.reconstitution.refrigerated || "-"}</td>
                                  </tr>
                                )}
                                {selectedDrug.stability.dilution && (
                                  <tr>
                                    <td className="py-2">稀釋液</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.dilution.roomTemp || "-"}</td>
                                    <td className="py-2 text-center">{selectedDrug.stability.dilution.refrigerated || "-"}</td>
                                  </tr>
                                )}
                                {!selectedDrug.stability.reconstitution && !selectedDrug.stability.dilution && (
                                  <tr>
                                    <td colSpan={3} className="py-4 text-center text-slate-400 italic">依原廠仿單保存建議為主</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-amber-700 mb-3 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> 給藥後處置 / 沖管規範 (Flush)
                      </h4>
                      <div className="bg-white/60 p-4 rounded-2xl border border-slate-100">
                        <p className="text-base font-bold text-text-dark leading-relaxed">
                          {selectedDrug.administration?.flush || "給藥結束後建議使用至少 20ml 之相容溶媒 (如 0.9% NS) 進行沖管，以維持管路通暢並確保藥物劑量完全送達。"}
                        </p>
                        <div className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-sm font-bold text-amber-900 leading-relaxed">
                            {selectedDrug.englishName === 'Navelbine' 
                              ? "注意：Navelbine 建議使用 75-125ml 溶液進行快速沖洗，以減少極高致疱性質造成的血管損傷。" 
                              : "若處方中包含多種藥物，請確認藥物間物理/化學相容性。不確定時請務必執行中間沖洗 (Interim Flush)。"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedDrug.administration?.device && (
                      <div>
                        <h4 className="text-base font-black text-amber-700 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" /> 輸液套 / 設備器材 (Infusion Set)
                        </h4>
                        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/50 flex items-center gap-3">
                          <div className="p-2 bg-amber-100 rounded-lg">
                            <Droplets className="w-4 h-4 text-amber-600" />
                          </div>
                          <p className="text-lg font-extrabold text-amber-900">
                            {selectedDrug.administration.device}
                          </p>
                        </div>
                        <p className="text-[10px] text-amber-600/60 mt-2 font-bold px-1 italic">
                          *依據台大醫院藥劑部化療調劑組注射藥品調配一覽表 (2025/10/23)
                        </p>
                      </div>
                    )}

                    {selectedDrug.contraindications && (
                      <div className="pt-4 border-t border-slate-100">
                        <h4 className="text-base font-black text-red-700 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> 禁忌症與特殊考量
                        </h4>
                        <ul className="space-y-2">
                          {selectedDrug.contraindications.map((item, idx) => (
                            <li key={idx} className="text-sm font-bold text-red-800 bg-red-50/50 p-2 rounded-lg border border-red-100 italic">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* 資料來源連結 */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">資料參考來源</span>
                      <p className="text-xs font-bold text-slate-500 italic">
                        台大醫院藥劑部化療調劑組, 2025/10/23
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-black">官方仿單</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded font-black">Micromedex 2025</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* 4. 化療藥品外滲處置建議 (Extravasation Management) - Standing out as a full-width rectangle */}
              <section className="glass-panel p-4 sm:p-6 md:p-8 border-2 border-orange-200 bg-orange-50 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0 shadow-sm border border-orange-200">
                    <ShieldAlert className="w-10 h-10 text-orange-700" />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-orange-900">{sectionNumbers['extra']}. 化療藥品外滲處置建議 (Extravasation Management)</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-lg font-black text-red-600">風險等級：{selectedDrug.extravasation || '非發疱性'}</p>
                          <button 
                            onClick={() => setShowExtravasationNotes(!showExtravasationNotes)}
                            className="flex items-center gap-2 px-3 py-1 bg-white hover:bg-orange-100 text-orange-700 rounded-lg text-xs font-black transition-all border border-orange-200 shadow-sm"
                          >
                            <Info className="w-3 h-3" />
                            點我看註記 (Notes)
                          </button>
                        </div>
                      </div>
                      {selectedDrug.extravasationAction && (
                        <div className={`px-6 py-2 rounded-2xl text-white font-black text-lg shadow-md ${
                          selectedDrug.extravasationAction.type === '熱敷' ? 'bg-orange-600' : 'bg-blue-600'
                        }`}>
                          建議：{selectedDrug.extravasationAction.type}
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {showExtravasationNotes && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mb-4"
                        >
                          <ExtravasationGuide />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {selectedDrug.extravasationAction ? (
                      <div className="bg-white/90 p-6 rounded-2xl border border-orange-200 shadow-inner">
                        <p className="text-xl text-orange-950 font-black leading-relaxed whitespace-pre-line">
                          {selectedDrug.extravasationAction.detail}
                        </p>
                        <p className="text-xs text-orange-800/60 mt-4 font-bold italic">資料來源：{selectedDrug.extravasationAction.source}</p>
                      </div>
                    ) : (
                      <div className="bg-white/60 p-6 rounded-2xl border border-orange-100 italic text-orange-800 font-bold">
                        此藥物目前無特定外滲處置實證建議，請依院內標準通則(General Protocol)處理。
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* 5. 副作用評估 (雙視角) */}
              <section className="glass-panel p-4 sm:p-6 md:p-8 border-t-8 border-accent-blue/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-blue/10 rounded-xl">
                      <HeartPulse className="w-6 h-6 text-accent-blue" />
                    </div>
                    <h3 className="text-2xl font-black text-text-dark">{sectionNumbers['side']}. 副作用評估 (Side Effect Assessment)</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-black text-text-muted bg-slate-100 px-4 py-2 rounded-full">
                    <span className="w-3 h-3 bg-accent-blue rounded-full" /> 護理視角
                    <span className="w-3 h-3 bg-purple-500 rounded-full ml-4" /> 病人視角
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left: Nursing View */}
                  <div className="space-y-8">
                    {selectedDrug.patientEducation && (
                      <div className="lg:col-span-2">
                        <PatientSideEffectGuide drug={selectedDrug} />
                        <div className="my-8 h-px bg-slate-200" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-black text-accent-blue mb-4 flex items-center gap-2">
                        核心護理重點 (Nursing Considerations)
                      </h4>
                      <div className="space-y-4">
                        {selectedDrug.nursingPoints.map((point, idx) => (
                          <div key={idx} className="p-5 bg-blue-50/30 rounded-2xl border border-blue-100 shadow-sm transition-all hover:bg-white">
                            <h5 className="font-black text-accent-blue text-lg mb-1">{point.title}</h5>
                            <p className="text-base text-text-dark font-bold leading-relaxed">{point.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedDrug.adverseReactionManagement && (
                      <div className="p-6 bg-red-50/50 rounded-2xl border-2 border-red-100">
                        <h4 className="text-lg font-black text-red-700 mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" /> 嚴重副作用緊急處置
                        </h4>
                        <div className="space-y-3">
                          {selectedDrug.adverseReactionManagement.map((m, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border border-red-100">
                              <span className="block text-sm font-black text-red-600 mb-1">{m.condition}</span>
                              <p className="text-base text-text-dark font-bold">{m.action}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Patient View & Common Side Effects */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-black text-purple-600 mb-4 flex items-center gap-2">
                        病人衛教與主觀訴求 (Patient Education)
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedDrug.education.map((item, idx) => (
                          <div key={idx} className="flex gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100 font-bold text-purple-900 leading-relaxed shadow-sm">
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-xs font-black">
                              {idx + 1}
                            </div>
                            <p className="text-base">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <h4 className="text-sm font-black text-text-muted uppercase tracking-widest mb-4">常見副作用清單</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrug.sideEffects.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-text-dark shadow-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. 劑量調整與交互作用 (Dosage & Interactions) */}
              {(selectedDrug.dosageAdjustment || selectedDrug.interactions) && (
                <section className="glass-panel p-4 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-100 rounded-xl">
                      <Calculator className="w-6 h-6 text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-black text-text-dark">{sectionNumbers['dose']}. 劑量調整與交互作用 (Interaction & Adjustment)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedDrug.dosageAdjustment && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-black text-slate-700 flex items-center gap-2">
                          <Activity className="w-5 h-5" /> 劑量調整 (Dosage Adjustment)
                        </h4>
                        <ul className="space-y-3">
                          {selectedDrug.dosageAdjustment.map((adj, idx) => (
                            <li key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-base font-bold italic">
                              {adj}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedDrug.interactions && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-black text-slate-700 flex items-center gap-2">
                          <Zap className="w-5 h-5" /> 交互作用 (Interactions)
                        </h4>
                        <ul className="space-y-3">
                          {selectedDrug.interactions.map((inter, idx) => (
                            <li key={idx} className="bg-red-50/50 p-4 rounded-2xl border border-red-100 text-base font-bold text-red-900">
                              • {inter}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 5. 臨床照護重點 (Clinical Nursing Points) - If present */}
              {selectedDrug.clinicalPearls && selectedDrug.clinicalPearls.length > 0 && (
                <section className="glass-panel p-4 sm:p-6 md:p-8 bg-purple-50/10 border-l-8 border-purple-400">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <Lightbulb className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-black text-text-dark">{sectionNumbers['pearls']}. 臨床照護重點 (Clinical Nursing Points)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDrug.clinicalPearls.map((pearl, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/70 p-4 rounded-2xl border border-purple-100 shadow-sm flex gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                          <Zap className="w-3 h-3" />
                        </div>
                        <p className="text-base font-bold text-text-dark leading-relaxed">{pearl}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* 7. 藥物組合觸發 (Combination Triggers) - Optimized layout with single header */}
              {(() => {
                const relevantRegimens = selectedRegimenId 
                  ? regimens.filter(r => r.id === selectedRegimenId) 
                  : regimens.filter(r => r.drugIds.includes(selectedDrug.id));
                
                if (relevantRegimens.length === 0) return null;

                return (
                  <section ref={combinationsRef} className="glass-panel p-4 sm:p-6 md:p-8 border-l-8 border-purple-500 bg-purple-50/10 scroll-mt-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-xl">
                          <MessageSquare className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-black text-text-dark">{sectionNumbers['combo']}. 藥物組合觸發（Combination triggers）</h3>
                      </div>
                      <span className="px-4 py-1 bg-purple-600 text-white text-xs font-black rounded-full uppercase tracking-widest">
                        {relevantRegimens.length} 組合建議
                      </span>
                    </div>

                    <div className="space-y-10">
                      {relevantRegimens.map((regimen, index) => (
                        <div key={regimen.id} className="relative">
                          {/* 序號標示 */}
                          <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xl shadow-lg border-4 border-white hidden lg:flex">
                            {index + 1}
                          </div>
                          <div className="lg:hidden flex items-center gap-2 mb-4">
                            <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-sm">
                              {index + 1}
                            </span>
                            <span className="text-sm font-black text-purple-700 uppercase tracking-widest">組合詳情</span>
                          </div>

                          <div className={`bg-white/80 rounded-3xl border-2 shadow-sm overflow-hidden flex flex-col md:flex-row ${selectedRegimenId === regimen.id ? 'border-purple-300 ring-2 ring-purple-100' : 'border-purple-100'}`}>
                            <div className="bg-purple-600 text-white p-6 md:w-1/3 flex flex-col justify-center">
                              <span className="text-xs font-black opacity-80 uppercase tracking-widest mb-1">處方組合 {index + 1}</span>
                              <h4 className="text-2xl font-black">{regimen.name}</h4>
                              <div className="mt-4 flex gap-2 flex-wrap">
                                  {regimen.drugIds.map(dId => (
                                    <button 
                                      key={dId} 
                                      onClick={() => {
                                        setSelectedDrugId(dId);
                                        setSelectedRegimenId(regimen.id);
                                      }}
                                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all hover:bg-white/40 ${selectedDrugId === dId ? 'bg-white text-purple-700 ring-2 ring-white/50' : 'bg-white/20'}`}
                                    >
                                      {drugs.find(d => d.id === dId)?.englishName || 'Unknown Drug'}
                                    </button>
                                  ))}
                              </div>
                            </div>
                            <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <span className="text-sm font-black text-red-600 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" /> 疊加毒性 (Stacking Toxicity)
                                </span>
                                <p className="text-lg font-black text-text-dark leading-tight bg-red-50 p-3 rounded-xl border border-red-100">
                                  {regimen.stackingToxicity}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <span className="text-sm font-black text-accent-blue flex items-center gap-2">
                                  <Info className="w-4 h-4" /> 整合提醒 (Nursing Reminder)
                                </span>
                                <p className="text-lg font-bold text-text-dark leading-relaxed italic border-l-4 border-accent-blue pl-4">
                                  {regimen.integratedReminder}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-8 text-xs text-text-muted italic text-right font-bold">※ 組合提醒僅供臨床參考，實際操作請依醫囑與院內規範為準。</p>
                  </section>
                );
              })()}
                <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-text-muted mb-4 font-black">
                  <div className="w-1 h-3.5 bg-accent-blue rounded-full" />
                  延伸學習：同屬 {selectedDrug.subCategory} 類藥物
                </div>
                <div className="flex flex-wrap gap-3">
                  {drugs
                    .filter(d => d.subCategory === selectedDrug.subCategory && d.id !== selectedDrug.id)
                    .sort((a, b) => a.englishName.localeCompare(b.englishName))
                    .map(related => (
                    <button
                      key={related.id}
                      onClick={() => setSelectedDrugId(related.id)}
                      className="px-4 py-2 rounded-xl bg-white/50 border border-slate-100 text-sm font-bold hover:bg-white hover:shadow-md transition-all text-text-dark"
                    >
                      {related.englishName}
                    </button>
                  ))}
                </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Nursing Toolbox Modal */}
      <AnimatePresence>
        {isToolboxOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsToolboxOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                    <div>
                      <h2 className="text-xl font-black">外滲處理指引</h2>
                      <p className="text-xs text-slate-400 font-bold">Extravasation Management Reference Table</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsToolboxOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  <ExtravasationGuide />
                </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRandomQuizOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRandomQuizOpen(false)}
              className="absolute inset-0 bg-purple-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[90vh]"
            >
              <button 
                onClick={() => setIsRandomQuizOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white transition-all backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
              
              <RandomQuiz drugId={quizDrugId} onClose={() => setIsRandomQuizOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInteractionCheckerOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInteractionCheckerOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] z-10"
            >
              <InteractionChecker onClose={() => setIsInteractionCheckerOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Mechanism Rewriter Modal */}
      {isMechanismRewriterOpen && (
        <MechanismRewriter
          drugEnglishName={selectedDrug.englishName}
          drugChineseName={selectedDrug.name}
          mechanism={selectedDrug.mechanism}
          onClose={() => setIsMechanismRewriterOpen(false)}
        />
      )}
    </div>
  );
}
