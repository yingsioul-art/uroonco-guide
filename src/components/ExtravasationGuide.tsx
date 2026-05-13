import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ThermometerSnowflake, ThermometerSun, Info, ShieldAlert } from 'lucide-react';

interface ExtravasationData {
  category: string;
  color: string;
  drugs: string[];
  compress: 'Cold' | 'Warm' | 'Both' | 'None';
  management: string[];
  antidote?: string;
  note?: string;
}

const extravasationData: ExtravasationData[] = [
  {
    category: '發疱劑 (Vesicants) - 冷敷',
    color: 'text-red-600 bg-red-50 border-red-200',
    drugs: ['Doxorubicin (小紅莓)', 'Epirubicin', 'Idarubicin', 'Mitomycin'],
    compress: 'Cold',
    management: [
      '立即停止輸注，保留針頭回抽殘餘藥液。',
      '移除針頭，患肢抬高，避免局部加壓。',
      '冷敷 (每次 15-20 分鐘，每天 4 次)。',
      'Doxorubicin 可依醫囑考慮 Totect (Dexrazoxane) 或 99% DMSO 塗抹。'
    ],
    note: '此類藥物外滲具高組織破壞性，需密切追蹤。'
  },
  {
    category: '發疱劑 (Vesicants) - 熱敷',
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    drugs: ['Vinblastine', 'Vincristine', 'Vinorelbine (溫諾平)'],
    compress: 'Warm',
    management: [
      '立即停止輸注，不建議冷敷 (會增加末梢神經毒性)。',
      '熱敷 (44-50°C，每次 20-30 分鐘，每天 4 次)。',
      '目的為促進局部血流，稀釋並加速藥物吸收。'
    ],
    antidote: '可考慮透明質酸酶 (Hyaluronidase) 局部注射 (依醫囑)。'
  },
  {
    category: '刺激劑 (Irritants) - 熱敷',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    drugs: ['Oxaliplatin (歐力普)', 'Etoposide (癌妥滅)'],
    compress: 'Warm',
    management: [
      '停止輸注並回抽藥液。',
      '絕對禁忌冷敷：Oxaliplatin 對冷極度敏感，冷敷會引發嚴重咽喉痙攣或神經疼痛。',
      '熱敷處置以減輕局部不適。'
    ]
  },
  {
    category: '冷熱敷均宜 (文獻分歧)',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    drugs: ['Paclitaxel', 'Docetaxel', 'Cisplatin', 'Carboplatin', 'Cabazitaxel'],
    compress: 'Both',
    management: [
      '臨床實證對冷敷或熱敷效果尚無一致定論。',
      '早期建議熱敷，但近期亦有冷敷支持。建議依院內 SOP 執行。',
      'Cisplatin 高濃度外滲可考慮 Sodium thiosulfate。'
    ]
  },
  {
    category: '非發疱劑/中性 (冷敷)',
    color: 'text-slate-600 bg-slate-50 border-slate-200',
    drugs: ['Gemcitabine', 'Methotrexate', '5-FU', 'Bevacizumab', 'Cyclophosphamide', 'Irinotecan', 'Bleomycin', 'Trastuzumab'],
    compress: 'Cold',
    management: [
      '停止輸注。',
      '局部冷敷處理以利止痛與減輕腫脹。',
      '觀察注射部位是否有延遲性紅腫或免疫反應。'
    ]
  },
  {
    category: '查無文獻實證藥物',
    color: 'text-zinc-500 bg-zinc-50 border-zinc-200',
    drugs: ['Avelumab', 'Nivolumab', 'Ipilimumab', 'Enfortumab vedotin (Padcev)'],
    compress: 'None',
    management: [
      '目前臨床上查無針對此類免疫藥物外滲之具體溫控處置實證。',
      '建議採一般觀察，密切監控皮下浸潤範圍。',
      '若發生紅腫，應視同一般非發疱性藥物，採保守性處置。'
    ]
  }
];

export const ExtravasationGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex gap-3 shadow-sm">
        <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
        <div>
          <h3 className="font-black text-red-900">緊急處置守則 (SOP)</h3>
          <p className="text-red-800 text-sm font-bold leading-relaxed">
            1. 立即停止輸注、保留針頭回抽、勿加壓。<br />
            2. 抬高患肢、記錄外滲範圍。<br />
            3. 根據下方對應藥物選擇「冷敷」或「熱敷」。
          </p>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-bottom border-slate-200">
              <th className="p-4 font-black text-slate-900 text-sm w-[22%]">外滲特性</th>
              <th className="p-4 font-black text-slate-900 text-sm w-[25%]">對應藥理學名</th>
              <th className="p-4 font-black text-slate-900 text-sm w-[15%]">溫降原則</th>
              <th className="p-4 font-black text-slate-900 text-sm">關鍵處置指引</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {extravasationData.map((item, idx) => (
              <motion.tr 
                key={item.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-4 align-top">
                  <div className={`px-2 py-1 rounded-lg border font-black text-[10px] inline-flex items-center gap-1.5 ${item.color}`}>
                    <ShieldAlert className="w-3 h-3" />
                    {item.category}
                  </div>
                </td>
                <td className="p-4 align-top">
                  <div className="flex flex-wrap gap-1">
                    {item.drugs.map(drug => (
                      <span key={drug} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                        {drug}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 align-top">
                  {item.compress === 'Cold' ? (
                    <div className="flex items-center gap-1 text-blue-600 font-black text-xs">
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                      冷敷
                    </div>
                  ) : item.compress === 'Warm' ? (
                    <div className="flex items-center gap-1 text-orange-600 font-black text-xs">
                      <ThermometerSun className="w-3.5 h-3.5" />
                      熱敷
                    </div>
                  ) : item.compress === 'Both' ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-slate-500 font-black text-[10px]">
                        <ThermometerSnowflake className="w-3 h-3" /> 冷 / <ThermometerSun className="w-3 h-3" /> 熱
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold italic">無定論</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs font-bold">一般觀察</span>
                  )}
                </td>
                <td className="p-4 align-top">
                  <ul className="space-y-1">
                    {item.management.map((step, sIdx) => (
                      <li key={sIdx} className="text-[11px] text-slate-600 flex gap-1 font-medium leading-normal">
                        <span className="text-slate-300">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                  {item.note && (
                    <p className="mt-1 text-[10px] text-red-500 font-black italic">
                      ★ {item.note}
                    </p>
                  )}
                  {item.antidote && (
                    <div className="mt-2 p-1.5 bg-slate-50 rounded-lg flex gap-1.5 items-start border border-slate-100">
                      <Info className="w-3 h-3 text-accent-blue shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-500 font-bold leading-tight italic">
                        {item.antidote}
                      </p>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
          <h5 className="text-[11px] font-black text-blue-800 mb-1 flex items-center gap-1">
            <ThermometerSnowflake className="w-3 h-3" /> 冷敷處置定義
          </h5>
          <p className="text-[10px] text-blue-700 leading-normal font-medium">
            0°C 冰敷袋包毛巾，每次 20 分鐘，每天 3-4 次，持續 24-48 小時。
          </p>
        </div>
        <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100">
          <h5 className="text-[11px] font-black text-orange-800 mb-1 flex items-center gap-1">
            <ThermometerSun className="w-3 h-3" /> 熱敷處置定義
          </h5>
          <p className="text-[10px] text-orange-700 leading-normal font-medium">
            44-50°C，每次 20-30 分鐘，每天 3-4 次，持續 24-48 小時。
          </p>
        </div>
      </div>

      <div className="p-4 bg-slate-100 rounded-2xl text-[10px] text-slate-400 text-center font-bold">
        藥物外滲特性僅供參考，實際處置與解毒劑使用請務必遵循臨床醫師與各院所 SOP。資料來源：2023.5 處置指引。
      </div>
    </div>
  );
};
