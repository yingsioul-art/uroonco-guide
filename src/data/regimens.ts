export interface Regimen {
  id: string;
  name: string;
  drugIds: string[];
  stackingToxicity: string;
  integratedReminder: string;
}

export const regimens: Regimen[] = [
  {
    id: "ev-pembro",
    name: "EV + Pembrolizumab",
    drugIds: ["enfortumab-vedotin", "pembrolizumab"],
    stackingToxicity: "皮膚毒性↑ + 周邊神經病變↑ + irAE",
    integratedReminder: "皮膚 + 神經評估頻率增加；高血糖監測"
  },
  {
    id: "nivo-ipi",
    name: "Nivolumab + Ipilimumab",
    drugIds: ["nivolumab", "ipilimumab"],
    stackingToxicity: "irAE最高風險 ( 腸炎、肝炎、內分泌 )",
    integratedReminder: "每次給藥前完整irAE評估；肝功能/甲狀腺監測"
  },
  {
    id: "gc-cis",
    name: "GC ( Gemcitabine + Cisplatin )",
    drugIds: ["gemcitabine", "cisplatin"],
    stackingToxicity: "腎毒性↑ + 骨髓抑制↑",
    integratedReminder: "嚴格水化；CrCl每次確認；CBC監測"
  },
  {
    id: "gem-carbo",
    name: "Carboplatin + Gemcitabine",
    drugIds: ["carboplatin", "gemcitabine"],
    stackingToxicity: "骨髓抑制↑ ( 血小板↓ )",
    integratedReminder: "Platelet重點監測；必要時延後"
  },
  {
    id: "cis-pacli",
    name: "Cisplatin + Paclitaxel",
    drugIds: ["cisplatin", "paclitaxel"],
    stackingToxicity: "神經毒性↑ + 腎毒性↑",
    integratedReminder: "神經症狀評估；電解質補充"
  },
  {
    id: "carbo-pacli",
    name: "Carboplatin + Paclitaxel",
    drugIds: ["carboplatin", "paclitaxel"],
    stackingToxicity: "骨髓抑制↑ + 過敏反應",
    integratedReminder: "Premedication與輸注反應監測"
  },
  {
    id: "pembro-ev",
    name: "Pembrolizumab + Enfortumab vedotin",
    drugIds: ["pembrolizumab", "enfortumab-vedotin"],
    stackingToxicity: "皮膚毒性↑↑ + 神經毒性↑ + irAE",
    integratedReminder: "高風險組合；密集監測皮膚與神經症狀"
  },
  {
    id: "bep",
    name: "BEP ( Bleomycin + Etoposide + Cisplatin )",
    drugIds: ["bleomycin", "etoposide", "cisplatin"],
    stackingToxicity: "肺毒性 + 腎毒性 + 神經毒性",
    integratedReminder: "肺功能監測；避免高氧暴露"
  },
  {
    id: "mvac",
    name: "MVAC ( Methotrexate + Vinblastine + Doxorubicin + Cisplatin )",
    drugIds: ["methotrexate", "vinblastine", "doxorubicin", "cisplatin"],
    stackingToxicity: "黏膜炎 + 心毒性 + 腎毒性 + 神經毒性",
    integratedReminder: "建議完整給藥前checklist ( 心臟/腎/血球 )"
  }
];
