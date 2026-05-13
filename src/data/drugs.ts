export interface Drug {
  id: string;
  name: string;
  englishName: string;
  brandName?: string;
  category: string;
  subCategory: string;
  type: string;
  risk: string;
  mechanism: string;
  simpleMechanism?: string;
  indications: string[];
  sideEffects: string[];
  preMedication: string[];
  monitoring: string[];
  extravasation?: string;
  extravasationAction?: {
    type: '冷敷' | '熱敷' | '冷敷或熱敷' | '不需處理' | '其他';
    detail: string;
    source: string;
  };
  clinicalAlert?: string;
  clinicalPearls?: string[];
  dosageAdjustment?: string[];
  interactions?: string[];
  contraindications?: string[];
  adverseReactionManagement?: {
    condition: string;
    action: string;
  }[];
  nursingPoints?: {
    title: string;
    content: string;
  }[];
  quizzes?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
  administration?: {
    diluent: string;
    speed: string;
    device?: string;
    flush?: string;
  };
  storage?: string;
  education?: string[];
  patientEducation?: {
    title: string;
    administrationMethod: string[];
    preAdministrationInfo: string[];
    sideEffects: { reaction: string; management: string }[];
    additionalNotes?: string | string[];
    importantNotes?: string | string[];
  };
  stability?: {
    reconstitution?: { roomTemp: string; refrigerated: string };
    dilution?: { roomTemp: string; refrigerated: string };
  };
}

export const drugs: Drug[] = [
  {
    "id": "avelumab",
    "brandName": "Bavencio",
    "name": "百穩益注射劑",
    "englishName": "Avelumab",
    "category": "免疫治療",
    "subCategory": "免疫治療",
    "type": "PD-L1 抑制劑",
    "risk": "極低至低致吐性",
    "mechanism": "Avelumab 是一種人類免疫球蛋白 G1 (IgG1) 單株抗體，可直接與程序性死亡配體 1 (PD-L1) 結合。藉由阻斷 PD-L1 與程序性死亡受體 1 (PD-1) 以及 B7.1 受體之間的交互作用，Avelumab 可移除 PD-L1 對細胞毒性 T 細胞 (CD8+) 的抑制作用，進而恢復抗腫瘤免疫反應。此外，Avelumab 亦可透過天然殺手 (NK) 細胞引發抗體依賴性細胞介導的細胞毒性作用 (ADCC)。",
    "simpleMechanism": "增強免疫系統攻擊癌細胞。",
    "indications": [
      "適用於單獨使用於局部晚期或轉育性默克細胞癌 (MCC)",
      "與 Axitinib 併用，適用於進展性或轉移性腎細胞癌 (RCC) 病患的第一線治療",
      "作為局部晚期或轉移性尿路上皮癌 (UC) 病患，在含鉑化療第一線誘導治療後未惡化之維持治療"
    ],
    "sideEffects": [
      "輸注相關反應 (IRR)",
      "疲倦與全身無力",
      "肌肉骨骼疼痛",
      "腹瀉與食慾下降",
      "免疫相關副作用 (irAEs)，如肺炎、結腸炎、肝炎、內分泌疾病等"
    ],
    "preMedication": [
      "最初 4 次輸注前必須給予抗組織胺藥品與 Acetaminophen",
      "後續視臨床狀況與先前的反應決定是否調整"
    ],
    "monitoring": [
      "每次輸注期間的生命徵象 (疑似 IRR)",
      "甲狀腺功能 (TSH, Free T4)",
      "肝功能 (ALT, AST, Bilirubin) 指標",
      "腎功能與電解質",
      "空腹血糖監測 (預防免疫相關糖尿病)"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "其他",
      "detail": "目前查無此藥物相關之外滲處置實證資料，建議依院內規範進行處置。",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "與 Axitinib 併用時，需特別監測血壓變化，併用期間可能增加高血壓風險",
      "免疫副作用可能延遲發生，停藥後幾個月仍需觀察",
      "發生輸注反應時應減慢速度或停止輸注，視嚴重度給予類固醇"
    ],
    "quizzes": [
      {
        "question": "Avelumab 輸注的前幾次必須給予前置藥物？",
        "options": [
          "前 2 次",
          "前 4 次",
          "每次都要"
        ],
        "answerIndex": 1,
        "explanation": "根據仿單規範，前 4 次輸注 Avelumab 前必須給予抗組織胺與 Acetaminophen 以降低 IRR 風險。"
      },
      {
        "question": "護理人員在給予 Avelumab 時，必須使用下列哪種過濾器？",
        "options": [
          "不需要過濾器",
          "0.22 micron 低蛋白結合性線上過濾器",
          "1.2 micron 線上過濾器"
        ],
        "answerIndex": 1,
        "explanation": "Avelumab 必須使用 0.22 micron 的低蛋白結合性線上過濾器，以確保藥液品質並過濾微粒。"
      },
      {
        "question": "關於 Avelumab 的病人衛教，下列何者正確？",
        "options": [
          "藥物只會影響泌尿道系統",
          "免疫副作用可能在停藥後數月才發生",
          "輸注後只要沒發燒就代表完全安全"
        ],
        "answerIndex": 1,
        "explanation": "免疫治療(如 Avelumab)產生的免疫相關副作用(irAEs)可能累計全身各器官，並可能在治療停止後的數週甚至數月才出現。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS (0.45% NS 亦可，但 NS 較常用)",
      "speed": "靜脈輸注時間不少於 60 分鐘",
      "device": "0.22 micron 低蛋白結合性線上過濾器 (in-line filter) (橘)"
    },
    "storage": "2-8°C 冷藏避光保存",
    "education": [
      "前 4 次給藥需提早報到接受前置藥物預防過敏",
      "若在輸注期間感到胸悶、呼吸不順或發冷，請立即告知護理人員",
      "回家後若出現呼吸喘、嚴重腹瀉或是極度疲倦，可能是免疫副作用，務必聯繫醫療團隊"
    ],
    "nursingPoints": [
      {
        "title": "輸注管理與過敏監測",
        "content": "嚴密觀察最初 4 次給藥的 IRR 反應。輸注速度務必不可超過每分鐘 1 毫克。"
      },
      {
        "title": "皮膚與器官評估",
        "content": "監測皮膚完整性。定期查檢甲狀腺功能與血糖，以利及早發現免疫副作用。"
      }
    ],
    "patientEducation": {
      "title": "Avelumab/ Bavencio® 百穩益注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射，通常輸注時間不少於 60 分鐘。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Avelumab 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "最初 4 次給藥前必須使用抗組織胺藥品及止痛退燒藥 (Acetaminophen) 以降低過敏風險，請配合醫護人員指示提前報到用藥。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過此藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "輸注相關反應 (寒顫、發燒、背痛、低血壓、呼吸急促)", "management": "施打時或施打後 24 小時內發生，應立即告知醫療人員。" },
        { "reaction": "肺部功能異常 (呼吸困難、咳嗽、胸痛)", "management": "立即告知醫療人員。" },
        { "reaction": "腸道功能異常 (嚴重腹瀉、腹痛、血便)", "management": "立即告知醫療人員。" },
        { "reaction": "肝功能相關副作用 (尿液顏色變深、疲倦、灰白便或皮膚變黃)", "management": "立即告知醫療人員。" },
        { "reaction": "內分泌功能異常 (體重增減、虛弱無力、心跳加快、口渴頻尿)", "management": "立即告知醫療人員。" },
        { "reaction": "腎功能相關副作用 (尿量減少、排尿困難、體重增加、水腫)", "management": "立即告知醫療人員。" },
        { "reaction": "心臟功能異常 (呼吸急促、胸痛、心跳不規則)", "management": "立即告知醫療人員。" },
        { "reaction": "皮膚反應 (嚴重紅疹、水泡、脫屑)", "management": "立即告知醫療人員。" },
        { "reaction": "視力模糊、眼睛紅痛", "management": "立即告知醫療人員。" }
      ],
      "importantNotes": [
        "本藥品可能造成免疫相關副作用，影響範圍可能涵蓋全身器官。若出現任何新症狀，請務必主動回報。",
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    }
  },
  {
    "id": "nivolumab",
    "brandName": "Opdivo",
    "name": "保疾伏注射劑",
    "englishName": "Nivolumab",
    "category": "免疫治療",
    "subCategory": "免疫治療",
    "type": "PD-1 抑制劑",
    "risk": "極低",
    "mechanism": "Nivolumab 是一款人類單株抗體，其可與程序性死亡受體-1 (PD-1) 結合，進而阻斷 PD-1 與其配體 PD-L1 及 PD-L2 之間的交互作用。PD-1 受體與其配體結合後，會產生免疫反應的負向調節訊號，降低 T 細胞之增生與多釋放細胞因子。Nivolumab 藉由抑制結合，使 T 細胞自抑制狀態釋放，進而增強抗腫瘤活性。",
    "simpleMechanism": "撕掉癌細胞表面的「偽裝」，讓免疫細胞能認出並打敗它。",
    "indications": [
      "適用於黑色素瘤、非小細胞肺癌的治療",
      "適用於先前曾受過治療之局部晚期或轉移性腎細胞癌 (RCC)",
      "與 Ipilimumab 併用治療未曾受過治療且屬中高風險之晚期腎細胞癌",
      "適用於接受含鉑類化療期間或之後出現疾病進展之局部晚期或轉移性尿路上皮癌 (UC)"
    ],
    "sideEffects": [
      "疲倦、全身無力",
      "肌肉與關節疼痛",
      "腹瀉與結腸炎",
      "皮疹、搔癢",
      "免疫媒介各器官炎性反應 (肺炎、肝炎、腎炎、內分泌等)"
    ],
    "preMedication": [
      "一般不需常規預防給藥",
      "若先前有輕微輸注反應，可考慮預給止痛退燒與抗組織胺"
    ],
    "monitoring": [
      "監測是否有咳嗽、氣促或呼吸困难 (預防肺炎)",
      "肝功能檢查 (ALT, AST, Bilirubin)",
      "血清肌酸酐檢測 (腎功能監測)",
      "血糖與內分泌系統評估 (甲狀腺、皮質醇層次)"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "其他",
      "detail": "目前查無此藥物相關之外滲處置實證資料，建議依院內規範進行處置。",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "免疫相關副作用可能發生於治療中或治療停止後的任何時間",
      "與 Ipilimumab 併用時，雖然療效可能較佳，但免疫副作用的發生率也顯著提高",
      "若出現嚴重免疫副作用，主要治療手段為暫停給藥並啟動高劑量全身性類固醇治療"
    ],
    "quizzes": [
      {
        "question": "Nivolumab 的作用機轉主要在哪一個路徑？",
        "options": [
          "PD-1 / PD-L1 通路",
          "CTLA-4 通路",
          "VEGF 血管新生通路"
        ],
        "answerIndex": 0,
        "explanation": "Nivolumab 透過阻斷 PD-1 受體與其配體之結合，解除 T 細胞受到的免疫抑制。"
      },
      {
        "question": "在使用 Nivolumab 期間，若病患出現何種情況應懷疑為「免疫性肺炎」並立即評估？",
        "options": [
          "輕微皮膚搔癢",
          "新發生的咳嗽、氣促或呼吸困難",
          "輕微噁心想吐"
        ],
        "answerIndex": 1,
        "explanation": "免疫性肺炎是 PD-1 抑制劑嚴重的副作用，應告知病患若有呼吸喘、持續咳嗽等症狀須立即回報。"
      },
      {
        "question": "關於 Nivolumab 的給藥衛教，下列何者「錯誤」？",
        "options": [
          "輸注時間通常為 30-60 分鐘",
          "如果輸注後 24 小時內出現寒顫發燒，應告知醫療人員",
          "因為是藥物治療，所以治療期間不需要避孕"
        ],
        "answerIndex": 2,
        "explanation": "接受免疫治療期間（及停藥後一段時間）仍建議採取有效的避孕措施，以預防對胎兒的潛在風險。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "30 分鐘至 60 分鐘靜脈滴注",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "2-8°C 冷藏，由原包裝避光保存",
    "education": [
      "監測體溫與糞便性狀，若一天腹瀉次數較平常多出 4-6 次請回報",
      "採取可靠的避孕措施，不建議在治療期間哺乳",
      "告知醫師所有的用藥記錄，特別是先前或正在使用的類固醇"
    ],
    "nursingPoints": [
      {
        "title": "呼吸功能監測",
        "content": "免疫性肺炎是嚴重副作用，必須掌握病患的基础血氧與呼吸狀況。"
      },
      {
        "title": "併用藥物管理",
        "content": "注意與 Axitinib 併用時的血壓、血脂與肝指數監測。"
      }
    ],
    "patientEducation": {
      "title": "Nivolumab/ Opdivo® 保疾伏注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品輸注時可能產生嚴重輸注反應，症狀包括：發燒、寒顫、呼吸困難、臉部浮腫等。大部分反應發生時間為輸注後 24 小時，請密切注意自身身體狀況，若有出現任何不適，請立即告知醫療人員。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Nivolumab 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過此藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "高血糖症狀 (意識混亂、嗜睡、口渴、飢餓、頻尿、呼吸急促、呼氣有水果味)", "management": "立即告知醫療人員，若您有糖尿病病史請告知您的醫師。" },
        { "reaction": "肝功能相關副作用 (尿液顏色變深、疲倦、灰白便或皮膚變黃)", "management": "立即告知醫療人員。" },
        { "reaction": "腎功能相關副作用 (尿量減少、排尿困難、體重增加、水腫)", "management": "立即告知醫療人員。" },
        { "reaction": "肺功能相關副作用 (呼吸困難、換氣過度、咳嗽)", "management": "立即告知醫療人員。" },
        { "reaction": "全身性皮膚紅斑、腫脹或脫屑", "management": "立即告知醫療人員。" },
        { "reaction": "黑便、血便、劇烈腹痛、咖啡色嘔吐物、嚴重腹瀉或便秘", "management": "立即告知醫療人員。" },
        { "reaction": "嚴重頭痛、脖子僵硬、視幻覺、抽搐、意識混亂", "management": "立即告知醫療人員。" },
        { "reaction": "發冷、盜汗、臉漲紅、心跳不規則、體重增減、虛弱無力、視力模糊", "management": "可與醫療人員反應。" }
      ],
      "importantNotes": [
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    }
  },
  {
    "id": "ipilimumab",
    "brandName": "Yervoy",
    "name": "益伏注射劑",
    "englishName": "Ipilimumab",
    "category": "免疫治療",
    "subCategory": "免疫治療",
    "type": "CTLA-4 抑制劑",
    "risk": "極低",
    "mechanism": "Ipilimumab 為一種重組的人類單株抗體，可與細胞毒性 T 淋巴球抗原-4 (CTLA-4) 結合。CTLA-4 是 T 細胞活性的負向調節因子。Ipilimumab 藉由阻斷 CTLA-4 與其配體 (CD80/CD86) 的交互作用，增強 T 細胞的活化與增殖，包含腫瘤浸潤性效應 T 細胞的活化，進而增加抗腫瘤免疫反應。",
    "simpleMechanism": "拿掉免疫系統的「煞車」，讓免疫大軍全力攻擊。",
    "indications": [
      "與 Nivolumab 併用，治療先前未受過治療且屬中高風險之晚期腎細胞癌 (RCC)",
      "用於治療無法切除或轉移性之黑色素瘤"
    ],
    "sideEffects": [
      "免疫性結腸炎 (嚴重的腹瀉及腹痛)",
      "免疫性肝炎",
      "皮炎 (搔癢、皮疹)",
      "內分泌病變 (腦垂腺炎、甲狀腺衰竭)",
      "疲倦、食慾下降"
    ],
    "preMedication": [
      "一般不需常規預防給藥"
    ],
    "monitoring": [
      "腸胃道症狀評估 (腹瀉次數、有無血便)",
      "肝功能監測 (ALT, AST, Bilirubin)",
      "內分泌評估 (甲狀腺刺激素 TSH、促腎上腺皮質激素 ACTH 等)",
      "血清肌酸酐檢測"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "其他",
      "detail": "目前查無此藥物相關之外滲處置實證資料，建議依院內規範進行處置。",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "Ipilimumab 引起的免疫副作用通常比 PD-1 抑制劑更為劇烈且發生較早",
      "與 Nivolumab 併用時，病患需密切監控結腸炎反應，嚴重時可能導致腸穿孔",
      "若發生 3 級或 4 級 irAEs，應永久停藥並給予高劑量類固醇"
    ],
    "quizzes": [
      {
        "question": "Ipilimumab 併用 Nivolumab 治療腎癌時，最需要警覺的腸胃道症狀是？",
        "options": [
          "便秘",
          "腹瀉及血便",
          "打嗝"
        ],
        "answerIndex": 1,
        "explanation": "嚴重结腸炎是 Ipilimumab 最危險的副作用之一，表現為頻繁腹瀉及血便。"
      },
      {
        "question": "Ipilimumab (Yervoy) 的作用機轉為何？",
        "options": [
          "阻斷 PD-1 與 PD-L1 的結合",
          "阻斷 CTLA-4 與 CD80/CD86 的交互作用",
          "抑制 HER2 受體的磷酸化"
        ],
        "answerIndex": 1,
        "explanation": "Ipilimumab 是 CTLA-4 抑制劑，藉由拿掉免疫系統的「煞車」來增強抗腫瘤免疫。"
      },
      {
        "question": "病患若在治療期間出現「視力改變或嚴重頭痛」，護理人員應優先警覺何種免疫副作用？",
        "options": [
          "免疫性肝炎",
          "免疫性內分泌病變 (如腦垂腺炎)",
          "輸注相關反應"
        ],
        "answerIndex": 1,
        "explanation": "腦垂腺炎是 Ipilimumab 常見的內分泌副作用，可能導致嚴重頭痛、畏光、視力模糊或疲累，需監測激素水平。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "靜脈輸注時間不少於 30 分鐘 (常用 90 分鐘)",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "2-8°C 冷藏避光保存",
    "education": [
      "即使在結束治療數月後，若出現持續性腹瀉 or 嚴重腹痛，應立即聯繫醫師",
      "注意皮膚變化，包含搔癢或不明疹子",
      "在每次給藥前，應完整報告任何新出現的身體不適"
    ],
    "nursingPoints": [
      {
        "title": "結腸炎監控",
        "content": "監測腹痛及排便性質。嚴重腹瀉 (一天比平常多出 6 次以上) 需要住院處理。"
      },
      {
        "title": "內分泌機能評估",
        "content": "觀察是否有腦垂腺炎引起的嚴重頭痛或視力改變。"
      }
    ],
    "patientEducation": {
      "title": "Ipilimumab/ Yervoy® 益伏注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Ipilimumab 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過此藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "肝功能相關副作用 (尿液顏色變深、疲倦、灰白便或皮膚變黃)", "management": "立即告知醫療人員。" },
        { "reaction": "腎功能相關副作用 (尿量減少、排尿困難、體重增加、水腫等)", "management": "立即告知醫療人員。" },
        { "reaction": "肺功能相關副作用 (呼吸困難、換氣過度、咳嗽等)", "management": "立即告知醫療人員。" },
        { "reaction": "心臟功能異常 (呼吸急促、體重增加、水腫或心跳不規則等)", "management": "立即告知醫療人員。" },
        { "reaction": "神經相關副作用 (皮膚感覺異常或麻木、神經痛、手腳灼燒感等)", "management": "立即告知醫療人員。" },
        { "reaction": "嚴重頭痛、脖子僵硬、視幻覺、抽搐、意識混亂", "management": "立即告知醫療人員。" },
        { "reaction": "全身性皮膚紅斑、腫脹或脫屑", "management": "立即告知醫療人員。" },
        { "reaction": "黑便、血便、劇烈腹痛、咖啡色嘔吐物、嚴重腹瀉或便秘", "management": "立即告知醫療人員。" },
        { "reaction": "發冷、盜汗、臉漲紅、體重增減、虛弱無力、視力模糊", "management": "可與醫療人員反應。" },
        { "reaction": "眼睛紅痛、畏光、視力模糊", "management": "可與醫療人員反應。" }
      ],
      "importantNotes": [
        "本藥品可能造成嚴重的發炎副作用。若您有腸胃、肝臟、皮膚、神經或內分泌相關疾病，請告知您的醫師。並於用藥期間注意是否出現相關症狀。",
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    }
  },

  {
    "id": "bevacizumab",
    "brandName": "Avastin",
    "name": "癌思停注射劑",
    "englishName": "Bevacizumab",
    "category": "標靶治療",
    "subCategory": "抗血管增生",
    "type": "VEGF 抑制劑",
    "risk": "低致吐性",
    "mechanism": "Bevacizumab 是一種重組的人源化單株抗體，可與人類血管內皮生長因子 (VEGF) 結合。這會阻斷 VEGF 與其位於血管內皮細胞表面上的受體 (Flt-1 與 KDR) 之交互作用。中和 VEGF 的 biological 活性後，會導致腫瘤血管新生的減少，並抑制腫瘤生長。",
    "simpleMechanism": "中和血管生長因子，阻斷腫瘤「自備供水系統」（血管新生），進而餓死腫瘤。",
    "indications": [
      "轉移性大腸直腸癌 (mCRC) ：合併 5-FU 為基礎之化療",
      "轉移性乳癌 (mBC) ：與 paclitaxel 合併使用於 HER2(-) 病人第一線治療",
      "神經膠母細胞瘤 (WHO 第 4 級)：單獨使用於放射線及 Temozolomide 治療失敗後",
      "晚期、轉移性或復發性非鱗狀非小細胞肺癌 (NSCLC)",
      "晚期卵巢上皮細胞、輸卵管或原發性腹膜癌：一線或復發性治療",
      "持續性、復發性或轉移性之子宮頸癌"
    ],
    "sideEffects": [
      "高血壓",
      "蛋白尿",
      "胃腸穿孔 (嚴重者有生命危險)",
      "傷口癒合不良",
      "出血 (例如鼻出血、肺出血)",
      "動脈血栓栓塞事件 (如中風、心肌梗塞)"
    ],
    "preMedication": [
      "一般不需要特定前置藥物",
      "若先前曾有輕微輸注反應，可考慮給予止痛退燒與抗組織胺"
    ],
    "monitoring": [
      "血壓監測 (每次給藥前與居家定期監測)",
      "尿蛋白質分析 (Urine Dipstick)",
      "觀察是否有腹痛、便秘或黑便 (腸穿孔或出血徵象)",
      "評召傷口癒合狀態",
      "監測心血管栓塞預兆 (如胸痛、單側無力)"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "其他",
      "detail": "目前查無此藥物相關之外滲處置實證資料，建議依院內規範進行處置。",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "嚴重出血風險：對最近曾發生肺出血或咳血者不可投予",
      "手術管理：重大手術前至少 28 天應暫停使用，術後至少 28 天且傷口完全癒合後方可重新給藥",
      "輸注速度：首劑 90 分鐘，若耐受良好後續可縮短至 60 分鐘甚至 30 分鐘",
      "不可與葡萄糖溶液 (D5W) 混合或同時使用"
    ],
    "quizzes": [
      {
        "question": "醫囑給予 Bevacizumab (Avastin) 時，下列哪種稀釋液是絕對不可使用的？",
        "options": [
          "0.9% 生理食鹽水 (NS)",
          "5% 葡萄糖水 (D5W)",
          "兩者皆可使用"
        ],
        "answerIndex": 1,
        "explanation": "Bevacizumab 與葡萄糖溶液不相容，會產生濃度依賴性的降解，因此僅能使用 0.9% NS。"
      },
      {
        "question": "關於 Bevacizumab 的手術管理與護理衛教，下列何者正確？",
        "options": [
          "手術當天早上施打即可",
          "重大手術前後至少需停藥 28 天且傷口完全癒合方可使用",
          "此藥不會影響傷口癒合"
        ],
        "answerIndex": 1,
        "explanation": "Bevacizumab 會抑制血管新生，嚴重影響傷口癒合。建議手術前至少 28 天停藥，且手術後需等待傷口癒合（至少 28 天）後再投藥。"
      },
      {
        "question": "護理人員在給予 Bevacizumab 治療期間，應指導病患常規監測下列哪一項？",
        "options": [
          "體溫與心律",
          "居家血壓測量與記錄",
          "視力與聽力"
        ],
        "answerIndex": 1,
        "explanation": "高血壓是 Bevacizumab 常见的副作用（發生率可能超過 30%），病患應規律監測血壓並在數值異常（如 >160/100 mmHg）時聯繫醫師。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS (不可使用 D5W)",
      "speed": "首劑 90 分鐘，第二劑 60 分鐘，隨後 30 分鐘 (視耐受性調整)",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "2-8°C 冷藏，由原包裝避光保存，請勿冰凍或搖晃",
    "education": [
      "每日測量並記錄血壓。收縮壓 >160 mmHg 或舒張壓 >100 mmHg 應告知醫師",
      "若發現尿液有大量且持續的泡沫，或尿量顯著減少，請告知醫療團隊",
      "計書進行牙科手術或侵入性檢查前，務必告知正在使用本藥",
      "治療期間及最後一劑給藥後 6 個月內應採取有效避孕措施"
    ],
    "nursingPoints": [
      {
        "title": "腸道與血管安全性",
        "content": "監測血壓變化及腸穿孔徵兆（如腹痛）。觀察傷口癒合狀況，重大手術前後需停藥 28 天。"
      },
      {
        "title": "出血與血栓監測",
        "content": "評估有無鼻出血、咳血或血栓跡象。注意蛋白尿情形，必要時暫停投藥。"
      }
    ],
    "patientEducation": {
      "title": "Bevacizumab/Avastin® 癌思停注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "施打時若不慎外滲，發現注射部位紅腫熱痛、水泡請立即告知人員。"
      ],
      "preAdministrationInfo": [
        "若已知過敏、有肝腎疾病或高血壓史請告知。",
        "告知目前用藥史。若有重大手術計畫或近期受傷請提出。",
        "育齡女性用藥期間至停藥後至少 6 個月應避孕，且不建議哺乳。"
      ],
      "sideEffects": [
        { "reaction": "高血壓 (頭痛、視力模糊)", "management": "每日監測血壓，若異常升高請告知醫師。" },
        { "reaction": "胃腸穿孔 (劇烈腹痛、便秘、發燒)", "management": "【極重要】若出現上述症狀請「立即」告知團隊或就醫。" },
        { "reaction": "出血 (鼻血、血便、血尿、吐血)", "management": "立即就醫。" },
        { "reaction": "傷口癒合延遲", "management": "告知醫療人員。手術前後需依醫囑停藥。" },
        { "reaction": "蛋白尿 (尿液出現泡泡)", "management": "告知醫師。將定期追蹤尿液檢查。" }
      ],
      "importantNotes": [
        "本藥品可能造成傷口癒合延遲、嚴重出血及腸胃穿孔副作用。",
        "若有腸胃疾病、腹部放療史、近期流血或手術，請務必主動告知。"
      ]
    }
  },
  {
    "id": "enfortumab-vedotin",
    "brandName": "Padcev",
    "name": "備思復凍晶注射劑",
    "englishName": "Enfortumab vedotin",
    "category": "標靶治療",
    "subCategory": "ADC",
    "type": "ADC",
    "risk": "低致吐",
    "mechanism": "Enfortumab vedotin 是一種抗體藥物複合體 (ADC)。由針對 Nectin-4 的全人源 IgG1-kappa 單株抗體透過蛋白酶可切割的連接子 (vc) 與微管蛋白聚合抑制劑 monomethyl auristatin E (MMAE) 結合而成。ADC 與細胞表面的 Nectin-4 結合後會進入細胞內，釋放出 MMAE 破壞細胞內的微管網絡，進而導致細胞週期停滯與凋亡。",
    "simpleMechanism": "精準鎖定癌細胞表面的 Nectin-4，將強效毒素 MMAE 直接送入癌細胞內，破壞其細胞支架使其死亡。",
    "indications": [
      "單獨治療局部晚期或轉移性泌尿道上皮癌 (mUC) 且先前曾接受過 PD-1/PD-L1 抑制劑與含鉑化療者",
      "不適合含 cisplatin 化療且先前接受過一線以上治療之 mUC",
      "與 pembrolizumab 併用治療局部晚期或轉移性 mUC"
    ],
    "sideEffects": [
      "嚴重皮膚反應 (包括 SJS, TEN)",
      "高血糖症 (可能致死)",
      "肺炎 / 間質性肺病 (ILD)",
      "周邊神經病變 (麻木、刺痛)",
      "眼部疾患 (乾眼、視力模糊)",
      "疲倦、食慾減退、掉髮"
    ],
    "preMedication": [
      "給藥前建議給予預防性止吐藥物"
    ],
    "monitoring": [
      "密切監測皮膚反應 (特別是第一個治療週期)",
      "血糖監測 (血糖 > 250 mg/dL 需暫停給藥)",
      "周邊神經病變徵兆 (手腳麻木、肌肉無力)",
      "眼部異常 (如乾眼、流蓮增多)",
      "呼吸狀況與肺部影像監測"
    ],
    "extravasation": "刺激性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days.",
      "source": "Padcev Package Insert"
    },
    "clinicalAlert": "警告：本藥可能引起嚴重且致命的皮膚不良反應 (SJS/TEN) 及重度高血糖。若出現嚴重皮疹、水泡或血糖升高，請務必立即處理。",
    "clinicalPearls": [
      "給藥方案：1.25 mg/kg (最高 125 mg)，於 28 天週期的第 1, 8, 15 天給藥",
      "若單藥治療發生不良反應，建議依序減量至 1.0 -> 0.75 -> 0.5 mg/kg",
      "對於糖尿病或高血糖風險者，應密切監控血糖，視情況使用胰島素",
      "眼部不良反應發生率約 40%，可考慮常規使用人工淚液輔助"
    ],
    "quizzes": [
      {
        "question": "Enfortumab vedotin (Padcev) 最主要的安全性警語包含下列哪些項目？",
        "options": [
          "嚴重心律不整與出血",
          "嚴重皮膚反應與高血糖症",
          "腎衰竭與肌肉溶解"
        ],
        "answerIndex": 1,
        "explanation": "依據仿單，Padcev 之特殊警語包含嚴重皮膚反應 (SJS/TEN) 及高血糖症，兩者皆有致死風險。"
      },
      {
        "question": "在使用 Enfortumab vedotin 治療期間，病患血糖若超過多少 mg/dL 應暫停給藥？",
        "options": [
          "150 mg/dL",
          "200 mg/dL",
          "250 mg/dL"
        ],
        "answerIndex": 2,
        "explanation": "根據安全管理指引，若病患血糖 > 250 mg/dL 應暫停給藥直至血糖獲得控制。"
      },
      {
        "question": "關於 Padcev 的副作用管理，下列衛教何者「正確」？",
        "options": [
          "乾眼症很少見，不需理會",
          "若出現大面積紅疹或水泡，應立即就醫不可延誤",
          "掉髮是唯一的副作用"
        ],
        "answerIndex": 1,
        "explanation": "Padcev 有致命皮膚反應風險。若出現嚴重紅疹或水泡應視為急症立即處理。另外，約 40% 患者會有眼部副作用，建議可搭配人工淚液。"
      }
    ],
    "administration": {
      "diluent": "SWFI 配置後再加入 0.9% NS, 5% D5W 或 LR 稀釋",
      "speed": "靜脈輸注 30 分鐘",
      "device": "不可透過同一條輸液管同時給予其他藥物",
      "flush": "給藥後建議進行沖管。"
    },
    "storage": "2-8°C 冷藏避光保存",
    "stability": {
      "reconstitution": {
        "roomTemp": "立即使用",
        "refrigerated": "2-8°C 最多 24 小時"
      },
      "dilution": {
        "roomTemp": "不可冰凍",
        "refrigerated": "2-8°C 最多 16 小時 (含輸注時間)"
      }
    },
    "dosageAdjustment": [
      "起始劑量: 1.25 mg/kg (最高 125 mg)",
      "第一次減量: 1.0 mg/kg (最高 100 mg)",
      "第二次減量: 0.75 mg/kg (最高 75 mg)",
      "第三次減量: 0.5 mg/kg (最高 50 mg)",
      "確診 SJS/TEN、4級皮膚反應、>=3級肺炎患者應永久停藥。"
    ],
    "education": [
      "若出現任何皮膚癢、紅疹或起水泡，必須立即聯繫團隊",
      "監測是否有口渴、多尿等高血糖徵兆",
      "育齡女性停藥後 6 個月、男性停藥後 4 個月內應避孕"
    ],
    "nursingPoints": [
      {
        "title": "皮膚與黏膜監測",
        "content": "高達 58% 病患會出現皮膚反應，常見發生於第一週期。應評估是否有標靶性斑塊、水泡或口腔潰瘍。"
      },
      {
        "title": "血糖急症評估",
        "content": "中位發生時間為 0.5 個月。即使無糖尿病病史，血糖 > 250 mg/dL 時亦需暫停給藥直至改善。"
      },
      {
        "title": "神經與間質性肺病監測",
        "content": "監測病患有無新發生或惡化的呼吸困難、咳嗽，以及手腳麻木、刺痛。這些可能指示 ILD 或周邊神經毒性。"
      }
    ],
    "patientEducation": {
      "title": "Enfortumab vedotin/ Padcev® 備思復凍晶注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "若輸注時注射部位出現紅腫熱痛或液體外滲，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若已知對此藥曾有過敏（皮疹、喘、腫脹等）請告知。",
        "告知完整用藥史（含處方、中藥、健康食品等）。",
        "若有糖尿病史請告知，治療期間體需密切監測血糖。",
        "若之後需要接種疫苗，務必告知醫師曾使用此藥。",
        "育齡男女應避孕：女性至停藥後 6 個月，男性至停藥後 4 個月。",
        "治療期間至停藥後 6 個月內請勿哺餵母乳。"
      ],
      "sideEffects": [
        { "reaction": "嚴重皮膚反應 (SJS/TEN)", "management": "【極重要】若出現大面積紅疹、水泡、脫皮或黏膜潰瘍，請立即就醫。" },
        { "reaction": "高血糖急症 (頻尿、口渴、水果味口氣)", "management": "立即就醫。此藥可能導致血糖嚴重升高。" },
        { "reaction": "肺部異常 (呼吸困難、氣喘、咳嗽)", "management": "立即就醫或告知醫療人員，需評估肺部毒性。" },
        { "reaction": "過敏反應 (皮疹、喘、呼吸困難)", "management": "立即告知醫療人員，並停止用藥。" },
        { "reaction": "感染或出血 (發燒、瘀青、血尿等)", "management": "立即就醫或告知人員，評估是否需治療。" },
        { "reaction": "周邊神經/視覺異常 (麻木、視力模糊)", "management": "告知醫療人員。包含分佈異常、疼痛或乾眼等任何視力變化。" },
        { "reaction": "腸胃道反應 (腹痛、腹瀉/便秘、嘔吐)", "management": "可與人員反應給予藥物緩解。建議少量多餐，減少刺激性食物。" },
        { "reaction": "疲倦、虛弱、頭痛、味覺改變", "management": "屬常見反應，可與醫療人員討論緩解處置。" }
      ]
    }
  },
  {
    "id": "cisplatin",
    "brandName": "Kemoplat",
    "name": "克莫抗癌注射劑",
    "englishName": "Cisplatin",
    "category": "化學治療",
    "subCategory": "鉑類",
    "type": "鉑金類",
    "risk": "高致吐",
    "mechanism": "順鉑是一種含鉑單複合物，其水解後與 DNA 結合形成鏈內及鏈間交聯 (Cross-links)，進而改變 DNA 構造並抑制其複製。這種機制可引發細胞週期阻斷並啟動細胞凋亡序列，對多種泌尿道惡性腫瘤具有強效殺傷力。",
    "simpleMechanism": "黏住並破壞癌細胞的 DNA，使其無法生長。",
    "indications": [
      "局部晚期或轉移性尿路上皮癌 (UC) 之組合化療首選 (如 MVAC 或 GC 處方)",
      "轉移性睪丸腫瘤 (BEP 處方成分之一)",
      "轉移性卵巢癌、膀胱癌、頭頸癌"
    ],
    "sideEffects": [
      "腎毒性 (致命風險)",
      "嚴重噁心嘔吐 (高致吐性)",
      "耳毒性 (高頻聽力喪失)",
      "電解質異常 (低鎂、低鉀)",
      "周邊神經病變"
    ],
    "preMedication": [
      "強烈建議進行 Pre-hydration 與 Post-hydration (1-2 公升點滴)",
      "高致吐藥物組合預防：NK1 + 5-HT3 + Dexa (如 Akynzeo)"
    ],
    "monitoring": [
      "血清肌酸酐與 CrCl (通常需 > 60ml/min)",
      "每小時尿量監控 (輸注中需 > 100ml/hr)",
      "電解質指標 (Mg, K, Ca)",
      "聽力狀態評估"
    ],
    "extravasation": "刺激性 (未稀釋時具發疱性)",
    "extravasationAction": {
      "type": "冷敷或熱敷",
      "detail": "1. Cold compression with ice pack for 20 min QID for 1-2 days OR warm compression.\n2. 大體積未稀釋 cisplatin 外滲: 可用 Sodium thiosulfate (1/6 M or 4%) 2mL into IV line. 4% Sodium thiosulfate( 配製見註記)",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "「藥物稀釋於 NS 者較穩定」，嚴禁完全使用 D5W 稀釋以防結構破壞",
      "腎毒性具有累積性，若病患尿量低於預期務必暫停給藥並加強補充水分",
      "耳毒性於兒童及老年病患較為普遍"
    ],
    "quizzes": [
      {
        "question": "給予 Cisplatin (順鉑) 前，護理上最重要的前置安全確認是？",
        "options": [
          "確認病患有無掉髮",
          "確認病患尿量是充足的 (Hydration status)",
          "確認病患心電圖正常"
        ],
        "answerIndex": 1,
        "explanation": "為了預防腎小管損傷，充足的水份補充及尿量監測是順鉑給藥的首亞守則。"
      },
      {
        "question": "關於 Cisplatin 的稀釋與儲存，下列何者正確？",
        "options": [
          "必須使用 0.9% NS 稀釋，且不可冷藏以免藥物結晶",
          "可以使用 5% D5W 稀釋以減少鈉離子攝取",
          "為了保持穩定，混合後必須立即冰存"
        ],
        "answerIndex": 0,
        "explanation": "Cisplatin 在鹽水中較穩定，嚴禁純用 D5W 稀釋。且藥物遇冷易析出結晶，因此通常室溫保存。"
      },
      {
        "question": "Cisplatin 常見的長期累積性副作用不包括下列何者？",
        "options": [
          "聽力損害 (耳毒性)",
          "腎功能受損",
          "急性腹瀉"
        ],
        "answerIndex": 2,
        "explanation": "耳毒性與腎毒性是 Cisplatin 著名的累積性副作用。急性腹瀉並非其主要特徵，反而「高致吐性」才是其特點。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或含氯化鈉之點滴 (鹽水可降低分解)",
      "speed": "取決於總體液量與處方計畫，通常需數小時輸注",
      "device": "一般輸液套 (Standard set)",
      "flush": "給藥後需使用至少 20-50ml NS 進行沖管；若併用多種藥物，建議確認相容性或使用不同管路。"
    },
    "storage": "室溫保存 (15-25°C)，不可冷藏 (會析出結晶)",
    "stability": {
      "reconstitution": {
        "roomTemp": "48小時",
        "refrigerated": "不可冷藏"
      },
      "dilution": {
        "roomTemp": "72小時 (含 5% Mannitol 時)",
        "refrigerated": "不可冷藏"
      }
    },
    "education": [
      "打藥期間及出院後數天，請務必補充大量白開水 (2000-3000cc)",
      "若感到耳朵悶塞、耳鳴或聽力下降，請立即告知",
      "打藥後可能會有嚴重嘔吐感，請配合醫囑服用止吐藥"
    ],
    "nursingPoints": [
      {
        "title": "腎臟保護與水化",
        "content": "嚴格執行進出量紀錄 (I/O)。確保輸注中每小時尿量 > 100 cc。若尿量不足可視醫囑補給利尿劑。"
      },
      {
        "title": "電解質補充",
        "content": "順鉑易導致低鎂血症，需注意病患有無抽筋或肌肉震顫表現。"
      }
    ],
    "patientEducation": {
      "title": "Cisplatin/Kemoplat ® 克莫注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "若輸注時注射部位出現紅腫熱痛、水泡或液體外滲，請立即告知護理人員。"
      ],
      "preAdministrationInfo": [
        "對 platin 鉑類藥物過敏（皮疹、喘、腫脹等）請告知。",
        "告知完整用藥史（含處方、中藥、健康食品等）。",
        "若有腎功能不全或聽力問題，請務必先告知醫師。",
        "若之後有需要注射疫苗，務必告知醫師曾使用此藥。",
        "若正在哺乳應停止，有懷孕計畫者請先與醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉痛)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血尿、瘀青、出血點)", "management": "立即就醫或告知醫療團隊，可能需輸血治療。" },
        { "reaction": "電解質不平衡 (心律不整、抽動、無力)", "management": "【重要】若有意識改變或肌肉震顫請立即告知人員。" },
        { "reaction": "腎功能異常 (尿量減、水腫、體重增)", "management": "立即告知醫療人員進行腎功能評估。" },
        { "reaction": "聽力受損或耳鳴", "management": "立即告知醫療人員。" },
        { "reaction": "周邊神經異常 (麻木、疼痛、灼熱感)", "management": "立即告知醫療人員。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "常發生在當天或結束後 3-4 天。建議少量多餐，減少刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應給予緩解治療。" }
      ],
      "importantNotes": [
        "請仔細觀察身體反應，並隨時與醫療照護人員討論。",
        "不論是處方藥或健康食品，服用前皆應與醫師討論。",
        "若有任何問題，請聯絡醫師、藥師或護理師。"
      ]
    }
  },
  {
    "id": "carboplatin",
    "brandName": "Paraplatin",
    "name": "佳鉑帝靜脈注射液",
    "englishName": "Carboplatin",
    "category": "化學治療",
    "subCategory": "鉑類",
    "type": "鉑金類",
    "risk": "中致吐",
    "mechanism": "卡鉑是非特異性細胞週期抗腫瘤藥物。它在體內與 DNA 結合形成鏈內及鏈間交聯，阻礙 DNA 複製與轉錄。相較於順鉑，卡鉑具有較低的腎毒性與胃腸毒性，但具有較顯著的骨髓抑制作用，特別是血小板減少症。",
    "simpleMechanism": "在癌細胞的 DNA 上打結，讓它無法複製。",
    "indications": [
      "適用於晚期卵巢癌之第一線與第二線治療",
      "與其他化療藥物併用治療局部晚期或轉移性尿路上皮癌 (UC)",
      "小細胞肺癌與非小細胞肺癌"
    ],
    "sideEffects": [
      "骨髓抑制 (主要是血小板低下與貧血)",
      "噁心、嘔吐 (低至中度)",
      "周邊神經病變",
      "過敏反應 (發生於多劑量治療後)"
    ],
    "preMedication": [
      "中致吐性預防：5-HT3 拮抗劑 + Dexamethasone"
    ],
    "monitoring": [
      "監測血小板計數 (最低值常發生在第 21 天左右)",
      "腎功能監測 (以計算 AUC 劑量)",
      "觀察是否有皮膚紅疹 (遲發性過敏)"
    ],
    "extravasation": "刺激性",
    "extravasationAction": {
      "type": "冷敷或熱敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days OR warm compression. *",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "劑量通常使用 Calvert 公式計算：Dose (mg) = Target AUC x (GFR + 25)",
      "與順鉑相比，卡鉑較不具腎毒性，一般不需大量水化 (Hydration)",
      "對於接受多個療程的病患，需注意急性過敏反應的風險隨療程增加而上升"
    ],
    "quizzes": [
      {
        "question": "Carboplatin (卡鉑) 的劑量主要是依據哪一項指標計算？",
        "options": [
          "體表面積 (BSA)",
          "腎功能與目標曲線下面積 (AUC)",
          "體重 (Weight)"
        ],
        "answerIndex": 1,
        "explanation": "卡鉑使用 Calvert 公式計算劑量，核心變數是病患的 GFR 與目標 AUC。"
      },
      {
        "question": "Carboplatin 相較於 Cisplatin，具有哪一種更顯著的副作用？",
        "options": [
          "骨髓抑制 (特別是血小板低下)",
          "嚴重的腎毒性",
          "劇烈呕吐"
        ],
        "answerIndex": 0,
        "explanation": "Carboplatin 的腎毒性與致吐性較低，但其骨髓抑制（特別是血小板減少）通常比 Cisplatin 更為嚴重。"
      },
      {
        "question": "有關 Carboplatin 過敏反應的護理評估，下列何者正確？",
        "options": [
          "通常只發生在第一劑",
          "過敏風險會隨著治療療程次數增加而累計上升",
          "卡鉑絕對不會引起過敏反應"
        ],
        "answerIndex": 1,
        "explanation": "Carboplatin 的過敏反應常發生在治療過數個療程之後（如第7-8次），此為其臨床特性。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "靜脈輸注時間定為 15 至 60 分鐘",
      "device": "一般輸液套 (Standard set)",
      "flush": "給藥後建議使用 20ml NS 進行沖管。"
    },
    "storage": "室溫保存 (15-25°C)，由原包裝避光，不可冷藏",
    "stability": {
      "reconstitution": {
        "roomTemp": "8-24小時",
        "refrigerated": "5天 (2-8°C)"
      },
      "dilution": {
        "roomTemp": "8-24小時",
        "refrigerated": "24小時"
      }
    },
    "education": [
      "注意是否有不明原因的皮下出血、青紫或刷牙流血 (血小板低下徵兆)",
      "若在打藥後幾個療程才出現紅疹、搔癢，請務必告知護理人員",
      "保持充足水分攝取"
    ],
    "patientEducation": {
      "title": "Carboplatin/Paraplatin® 佳鉑帝注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知人員。"
      ],
      "preAdministrationInfo": [
        "若已知對 platin 鉑類化合物藥品曾有過敏狀況（皮疹、呼吸急促、腫脹等）請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知醫師您曾使用過本藥品。",
        "若正在哺乳請務必停止；有懷孕計畫者請先與醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、喘、呼吸困難)", "management": "立即告知人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青)", "management": "立即就醫或告知人員，需輸血治療。" },
        { "reaction": "血液電解質不平衡 (意識改變、肌肉痛、無力、心跳不規則、抽搐)", "management": "立即就醫或告知人員。" },
        { "reaction": "腎功能相關 (尿量減少、排尿困難、水腫)", "management": "立即告知人員。" },
        { "reaction": "周邊神經相關 (皮感異常、麻木、神經痛、灼燒感)", "management": "立即告知人員。" },
        { "reaction": "聽力受損、耳鳴", "management": "立即告知人員。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱、情緒改變", "management": "可與人員反應，給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了當天，也可能發生在之後 3-4 天。請少量多餐。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與人員反應，給予症狀緩解。" },
        { "reaction": "掉髮", "management": "請保持清潔。療程結束後頭髮會再生。" }
      ],
      "additionalNotes": [
        "觀察身體狀況反應，隨時與照護人員討論。",
        "若有任何問題，請聯絡醫師、藥師、護理師。"
      ]
    },
    "nursingPoints": [
      {
        "title": "骨髓抑制監測",
        "content": "密切監測血小板計數。通常血小板最低點出現在第 21 天，恢復較緩慢。"
      },
      {
        "title": "過敏反應預防",
        "content": "對於曾接受過多個療程的病患，需特別警覺過敏反應。建議輸注前備妥抗過敏藥物。"
      }
    ]
  },
  {
    "id": "oxaliplatin",
    "brandName": "Oxalip",
    "name": "歐力普注射劑",
    "englishName": "Oxaliplatin",
    "category": "化學治療",
    "subCategory": "鉑類",
    "type": "鉑金類",
    "risk": "中致吐",
    "mechanism": "歐利普是第三代含鉑抗腫瘤藥。它透過形成 DNA 鏈內及鏈間交聯來抑制 DNA 的合成及修補。與順鉑或卡鉑不同，歐利普具有 1,2-二胺環己烷 (DACH) 載體基團，使其對某些對前兩代鉑類具抗藥性的細胞株仍具活性。主要的劑量限制毒性為神經毒性。",
    "simpleMechanism": "破壞癌細胞的修補能力，使其因損傷嚴重而死亡。",
    "indications": [
      "與 5-FU 併用，治療轉移性大腸直腸癌 (FOLFOX 處方)",
      "與 5-FU 併用，作為第三期大腸癌手術後之輔助治療",
      "適用於某些局部晚期尿路上皮癌的化療計畫"
    ],
    "sideEffects": [
      "急性與慢性周邊神經病變",
      "急性冷敏感性 (Laryngopharyngeal dysesthesia)",
      "噁心、嘔吐、腹瀉",
      "骨髓抑制 (中性球低下)"
    ],
    "preMedication": [
      "中致吐性預防：5-HT3 拮抗劑 + Dexamethasone"
    ],
    "monitoring": [
      "神經系統檢查 (末梢麻木、咽喉緊縮感)",
      "血球計數監測"
    ],
    "extravasation": "刺激性",
    "extravasationAction": {
      "type": "熱敷",
      "detail": "Warm compression (44-50℃) for 20-30 min, QID for 1-2 days.",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "嚴禁使用生理食鹽水 (NS) 稀釋或與之接觸，必須使用 5% D5W 稀釋以維持穩定性",
      "絕不可給予冷飲或讓病患暴露在冷氣出口，否則會引發急性咽喉痙攣",
      "神經毒性累積至一定劑量後可能變為不可逆"
    ],
    "quizzes": [
      {
        "question": "使用 Oxaliplatin (歐利普) 輸注期間，病患最需要避免的行為是？",
        "options": [
          "多走路",
          "飲用冰水或接觸冷風",
          "大聲說話"
        ],
        "answerIndex": 1,
        "explanation": "冷刺激會誘發 Oxaliplatin 的急性神經毒性，造成喉部不適感與刺痛。"
      },
      {
        "question": "醫囑處方 Oxaliplatin 時，護理人員稀釋藥液必須選用下列何者？",
        "options": [
          "0.9% 生理食鹽水 (NS)",
          "5% 葡萄糖水 (D5W)",
          "林格氏液 (LR)"
        ],
        "answerIndex": 1,
        "explanation": "Oxaliplatin 與含氯離子的溶液相容性差且會降解，因此僅限使用 5% D5W 稀釋。"
      },
      {
        "question": "關於 Oxaliplatin 的累積性毒性監測，護理評估應包含下列何者？",
        "options": [
          "聽力測驗",
          "病患日常活動（如扣鈕扣、寫字）有無麻木困難感",
          "有無頻繁打嗝"
        ],
        "answerIndex": 1,
        "explanation": "Oxaliplatin 會產生累積性的周邊神經毒性，長期使用可能影響日常精細動作，需定期追蹤評估。"
      }
    ],
    "administration": {
      "diluent": "僅限 5% D5W (不可使用 NS)",
      "speed": "靜脈輸注時間為 2 至 6 小時",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "室溫保存 (15-25°C)，不可冷藏或冷凍",
    "education": [
      "輸注後幾天內請勿喝冰飲，建議喝溫熱水",
      "從冰箱拿取東西時請戴手套，洗手請用溫水",
      "戶外風大時請戴口罩與圍巾保護口鼻，避免吸入冷空氣導致喉嚨不適"
    ],
    "patientEducation": {
      "title": "Oxaliplatin/Oxalip® 歐力普注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Oxaliplatin 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過 Oxaliplatin 藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (解黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了接受治療當天可能發生，亦可能發生在治療結束後 3-4 天。請少量多餐，並減少攝取刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "周邊神經相關副作用 (皮膚感覺異常或麻木、神經痛、手腳灼燒感)", "management": "立即告知醫療人員。" },
        { "reaction": "心臟功能相關副作用 (呼吸急促、體重增加、水腫或心跳不規則)", "management": "立即告知醫療人員。" },
        { "reaction": "肺功能相關副作用 (呼吸困難、換氣過度、咳嗽)", "management": "立即告知醫療人員。" },
        { "reaction": "肝功能相關副作用 (尿液顏色變深、疲倦、灰白便或皮膚變黃)", "management": "立即告知醫療人員。" },
        { "reaction": "橫紋肌溶解 (肌肉痛、肌肉紅腫無力等)", "management": "立即告知醫療人員。" },
        { "reaction": "癲癇發作、抽搐", "management": "立即告知醫療人員。" }
      ],
      "importantNotes": [
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "此藥會影響視力，請盡量避免開車或其他危險事務。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    },
    "nursingPoints": [
      {
        "title": "冷管理安全衛教",
        "content": "輸注前半小時務必口頭衛教病患嚴禁冷飲。關閉床位上方的冷氣風口。"
      },
      {
        "title": "神經功能追蹤",
        "content": "詢問病患扣鈕扣或寫字有無困難，以評估慢性累積的神經毒性。"
      }
    ]
  },
{
    "id": "paclitaxel",
    "brandName": "Phyxol",
    "name": "輝克癒蘇注射劑",
    "englishName": "Paclitaxel",
    "category": "化學治療",
    "subCategory": "Taxane",
    "type": "紫杉醇類",
    "risk": "中致吐",
    "mechanism": "Paclitaxel 是一種抗微管藥劑。它可促進微管蛋白二聚體組合成微管，並透過防止已形成的微管去聚合來使其穩定。這種穩定作用會抑制微管網絡的正常動態重編。導致細胞有絲分裂停止在 M 期並啟動凋亡路徑。",
    "simpleMechanism": "讓癌細胞分裂時的管路無法拆解，使它動彈不得而死亡。",
    "indications": [
      "適用於晚期卵巢癌與乳癌的治療",
      "作為轉移性非小細胞肺癌的第一線治療",
      "適用於治療卡波西氏肉瘤",
      "常用於與其他藥物併用治療晚期膀胱癌或生殖細胞腫瘤"
    ],
    "sideEffects": [
      "严重的過敏反應 (Hypersensitivity)",
      "骨髓抑制 (嗜中性球低下為主要限制毒性)",
      "周邊神經病變 (手腳麻木)",
      "掉髮 (幾乎 100%)",
      "肌肉關節痠痛",
      "心搏過緩"
    ],
    "preMedication": [
      "輸注前必須預給：Dexamethasone + Diphenhydramine + H2-antagonist",
      "目的是預防 Cremophor EL 溶劑引起的急性過敏"
    ],
    "monitoring": [
      "輸注前 15 分鐘及輸注中的生命徵象 (BP, HR)",
      "密切評估有無呼吸喘、潮紅、蕁麻疹反應",
      "CBC 計數監測"
    ],
    "extravasation": "刺激性",
    "extravasationAction": {
      "type": "冷敷或熱敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days OR warm compression. *",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "絕大多數嚴重過敏反應發生在輸注開始的前 10 分鐘內",
      "藥物稀釋後需儲存於 Non-PVC 容器中，並使用 Non-PVC 輸注套管",
      "需透過 0.22 micron 的線上過濾器給藥"
    ],
    "quizzes": [
      {
        "question": "Paclitaxel (Taxol) 輸注初期需密切監測病患的原因是？",
        "options": [
          "急性過敏反應風險",
          "突發性高血壓",
          "嚴重的局部疼痛"
        ],
        "answerIndex": 0,
        "explanation": "因溶劑成分容易誘發致死性過敏，開始滴注的前 10-15 分鐘必須在旁嚴密監控。"
      },
      {
        "question": "為何 Paclitaxel 滴注前必須給予類固醇、抗組織胺及 H2-antagonist？",
        "options": [
          "預防血液毒性",
          "預防溶劑引起之嚴重過敏反應",
          "預防藥物引起的掉髮"
        ],
        "answerIndex": 1,
        "explanation": "Paclitaxel 的溶劑 Cremophor EL 具有高度致敏性，因此必須使用三聯前置藥物預防過敏。"
      },
      {
        "question": "關於 Paclitaxel 給藥設備的選擇，下列何者正確？",
        "options": [
          "使用一般 PVC 輸液套即可",
          "必須使用 Non-PVC 容器與套管，並搭配 0.22 micron 過濾器",
          "藥物必須避光但可使用普通塑膠袋"
        ],
        "answerIndex": 1,
        "explanation": "Paclitaxel 會使 PVC 材質中的塑化劑 (DEHP) 溶出，因此必須使用 Non-PVC 器材，並使用 0.22 micron filter 以過濾微粒。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "通常為 3 小時輸注 (視處方而定)",
      "device": "Non-PVC 輸注套 (綠) + 0.22 micron filter (橘)"
    },
    "storage": "15-25°C 室溫保存，由原包裝避光",
    "education": [
      "治療後 1-2 週可能出現嚴重掉髮，可先預備頭巾",
      "打藥後幾天可能會有肌肉痠痛，通常可自行緩解，嚴重時請告知醫師",
      "若手腳麻木持續加劇，影響走路或抓握，請於下次門診提出"
    ],
    "nursingPoints": [
      {
        "title": "過敏反應與安全監控",
        "content": "起始滴注速度需緩慢。一旦發生呼吸喘或血壓下降，立即停藥並通知醫師。"
      },
      {
        "title": "器材選擇與相容性",
        "content": "確保輸注套管與過濾器均符合規格。觀察溶液有無析出結晶。"
      }
    ],
    "patientEducation": {
      "title": "Paclitaxel/Phyxol®輝克癒蘇注射劑; Abraxane®亞伯杉注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 paclitaxel 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過 paclitaxel 藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了接受治療當天可能發生，亦可能發生在治療結束後 3-4 天。請少量多餐，並減少攝取刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "掉髮", "management": "在治療期間發生，請盡量保持清潔。療程結束後，頭髮會再生。" },
        { "reaction": "心臟功能相關副作用 (呼吸急促、體重增加、水腫或心跳不規則等)", "management": "立即告知醫療人員。" },
        { "reaction": "周邊神經相關副作用 (皮膚感覺異常或麻木、神經痛、手腳灼燒感等)", "management": "立即告知醫療人員。" },
        { "reaction": "肝功能相關副作用 (尿液顏色變深、疲倦、灰白便或皮膚變黃)", "management": "立即告知醫療人員。" }
      ],
      "importantNotes": [
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "此藥會影響視力，請盡量避免開車或其他危險事務。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    }
  },
  {
    "id": "docetaxel",
    "brandName": "Taxotere",
    "name": "剋癌易注射劑",
    "englishName": "Docetaxel",
    "category": "化學治療",
    "subCategory": "Taxane",
    "type": "紫杉醇類",
    "risk": "低至中致吐",
    "mechanism": "Docetaxel 是一種抗腫瘤藥劑，其作用方式是促進微管蛋白組合成穩定的微管並抑制其去聚合，從而使微管束變得顯著增加。这种穩定作用會干擾有絲分裂。Docetaxel 在微管上保持一段長時間，導致細胞內微管累積，進而引起細胞死亡。",
    "simpleMechanism": "凍結癌細胞分裂工具，使其停留在分裂階段而死亡。",
    "indications": [
      "適用於治療局部晚期或轉移性乳癌",
      "與 Prednisone 併用適用於治療轉移性去勢抗性前列腺癌 (mCRPC)",
      "與 Cisplatin 併用適用於非小細胞肺癌",
      "用於頭頸癌與胃癌的合併治療"
    ],
    "sideEffects": [
      "骨髓抑制 (嗜中性球低下為主要毒性)",
      "體液滯留 (Edema，具有累積性)",
      "過敏反應",
      "指甲病變與皮膚反應",
      "肌肉與關節疼痛"
    ],
    "preMedication": [
      "口服類固醇 (如 Dexamethasone 8mg BID)：輸注前一天開始服用，共三天",
      "目的為降低過敏反應頻率及嚴重度，並減輕體液滯留"
    ],
    "monitoring": [
      "監測體重變化 (評估體液滯留程度)",
      "CBC 計數 (尤其是 ANC > 1500)",
      "肝功能檢查 (ALT, AST, Alk Phos)",
      "輸注期間的生命徵象"
    ],
    "extravasation": "刺激性 (曾有發疱反應報導)",
    "extravasationAction": {
      "type": "其他",
      "detail": "目前查無此藥物相關之外滲處置實證資料，建議依院內規範進行處置。",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "對於肝功能異常的病患，Docetaxel 的毒性風險顯著增加，需嚴謹調整劑量",
      "體液滯留可能表現為周邊水腫、胸水或腹水，通常在累積劑量約 400 mg/m2 後發生",
      "與紫杉醇 (Paclitaxel) 不同，剋癌易通常不需使用特定 Non-PVC 輸注器材，但建議使用玻璃或聚丙烯瓶"
    ],
    "quizzes": [
      {
        "question": "服用 Docetaxel 前，病患必須連續服用三天的藥物是？",
        "options": [
          "口服類固醇 (如 Dexamethasone)",
          "抗生素",
          "止痛藥"
        ],
        "answerIndex": 0,
        "explanation": "為了預防嚴重的體液滯留與過敏，病患必須在打藥前一天開始服用口服類固醇，持續三天。"
      },
      {
        "question": "Docetaxel (剋癌易) 常見的「體液滯留」副作用，在護理評估上要注意？",
        "options": [
          "病患有無出現下肢水腫或體重快速增加",
          "病患有無嚴重出血",
          "病患有無聽力下降"
        ],
        "answerIndex": 0,
        "explanation": "體液滯留是 Docetaxel 的特徵副作用，包含周邊水腫、胸水或腹水，監測體重是重要的護理措施。"
      },
      {
        "question": "在使用 Docetaxel 期間，若病患肝功能數值 (如 Bilirubin) 顯著異常，醫護團隊應優先考慮？",
        "options": [
          "增加劑量",
          "評估病患可能不適合給藥或需要劑量調整",
          "不須理會，繼續施打"
        ],
        "answerIndex": 1,
        "explanation": "Docetaxel 具高度肝毒性風險，且病患肝功能不佳時會增加骨髓抑制風險，需依檢驗值評估給藥安全性。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "靜脈輸注時間定為 1 小時",
      "device": "Non-PVC 綠 (需使用玻璃瓶或聚丙烯瓶)",
      "flush": "給藥後需使用 NS 沖洗管路。因其具刺激性且易與不相容過濾器反應，應嚴格遵守設備規範。"
    },
    "storage": "2-25°C 保存，由原包裝避光",
    "stability": {
      "reconstitution": {
        "roomTemp": "8小時",
        "refrigerated": "無資料"
      },
      "dilution": {
        "roomTemp": "6小時 (含輸注 1小時)",
        "refrigerated": "48小時"
      }
    },
    "education": [
      "若發現手腳開始腫脹、體重快速增加，請在回診時告知醫師",
      "指甲可能會變軟、黑掉或脫落，這是藥物影響，請保持清潔預防感染",
      "治療期間可能會有明顯的全身無力感，請多休息、補充營養"
    ],
    "nursingPoints": [
      {
        "title": "體液滯留管理",
        "content": "指導病患每日測量體重。觀察下肢是否有凹陷性水腫。"
      },
      {
        "title": "肝毒性評估",
        "content": "給藥前必查肝功能數值。若 Bilirubin 超標，通常需考慮延後給藥或減量。"
      }
    ],
    "patientEducation": {
      "title": "Docetaxel/Taxotere ® 剋癌易注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "若輸注時注射部位出現紅腫熱痛、水泡或液體外滲，請立即告知護理人員。"
      ],
      "preAdministrationInfo": [
        "若已知對 docetaxel 曾有過敏狀況（皮疹、呼吸急促、腫脹等）請立即告知。",
        "告知完整用藥史，特別是抗黴菌、抗病毒及抗生素類藥品、中藥或健康食品。",
        "若之後有需要注射疫苗，務必告知醫師曾使用此藥。",
        "若正在哺乳或有懷孕計畫，請與醫師進行諮詢，治療期間應停止哺乳。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、喘、呼吸困難)", "management": "立即告知醫療人員，並視情況停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉痛、咳嗽)", "management": "立即就醫或告知醫療團隊，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、瘀青等)", "management": "立即就醫或告知醫療團隊，評估是否需輸血或止血處理。" },
        { "reaction": "肝/心功能異常 (黃疸、水腫、喘)", "management": "立即告知醫療人員，需評估肝指數或心臟功能。" },
        { "reaction": "周邊神經/視力異常 (麻木、視力模糊)", "management": "立即告知醫療人員，評估神經毒性或視力受損狀況。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "常發生在當天或藥後 3-4 天。建議少量多餐，避開刺激性食物。" },
        { "reaction": "腹瀉、肌肉痠痛、頭痛", "management": "可與醫療人員反應，將給予症狀緩解藥物。" },
        { "reaction": "口腔黏膜炎、疲倦、無力", "management": "加強口腔清潔，並與人員反應給予緩解治療。" },
        { "reaction": "掉髮", "management": "治療期間請保持清潔，療程結束後頭髮會正常再生。" }
      ],
      "importantNotes": [
        "請仔細觀察身體反應，並隨時與醫療照護人員討論。",
        "服用的任何藥物、健康食品或中藥，皆應與醫師討論。",
        "若有任何問題，請聯絡醫師、藥師或護理師。",
        "若正在哺乳應停止，有懷孕計畫者請先與醫師討論。"
      ]
    }
  },
  {
    "id": "cabazitaxel",
    "brandName": "Jevtana",
    "name": "去癌達注射劑",
    "englishName": "Cabazitaxel",
    "category": "化學治療",
    "subCategory": "Taxane",
    "type": "紫杉醇類",
    "risk": "中致吐",
    "mechanism": "Cabazitaxel 是一種抗腫瘤藥劑。它可促進微管蛋白二聚體組合成微管，並透過防止已形成的微管去聚合來使其穩定。Cabazitaxel 具有在 Docetaxel 抗藥性細胞株中顯示活性的特點，特別是對轉移性去勢抗性前列腺癌 (mCRPC) 有效。",
    "simpleMechanism": "專門鎖死具有抗藥性的癌細胞骨架，阻止其分裂。",
    "indications": [
      "併用 Prednisone 可治療曾接受過 Docetaxel 治療方案的轉移性去勢抗性前列腺癌 (mCRPC) 病患"
    ],
    "sideEffects": [
      "重度骨髓抑制 (主要是熱性嗜中性球減少症 FN)",
      "嚴重胃腸道副作用 (腹瀉、嘔吐)",
      "血尿、排尿困難",
      "疲倦與全身無力",
      "過敏反應"
    ],
    "preMedication": [
      "止吐劑 (5-HT3 拮抗劑 + Dexamethasone)",
      "抗組織胺 (如 Diphenhydramine)",
      "H2 受體拮抗劑"
    ],
    "monitoring": [
      "密切監測血球計數 (ANC 需 > 1500)",
      "評估是否有嚴重腹瀉或脫水徵象",
      "監測是否有血尿 (出血性膀胱炎風險)",
      "腎功能評估"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "冷敷或熱敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days OR warm compression. *",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "發生 FN (發燒性嗜中性球低下) 的風險極高，臨床常建議預防性使用 G-CSF",
      "與其他紫杉醇類藥物一樣，稀釋後需儲存於 Non-PVC 容器並使用 Non-PVC 套管",
      "具有致命性的副作用風險，若病患出現嚴重腹瀉應立即積極補液處理"
    ],
    "quizzes": [
      {
        "question": "Cabazitaxel 在臨床上最常被用於哪一類病患？",
        "options": [
          "肺癌第一線治療",
          "對 Docetaxel 抗藥的轉移性去勢抗性前列腺癌",
          "早期乳癌手術後輔助化療"
        ],
        "answerIndex": 1,
        "explanation": "它是針對 Docetaxel 失敗後的前列腺癌病患所設計的化療藥物。"
      },
      {
        "question": "給予 Cabazitaxel (去癌達) 治療後，護理人員應指導病患若發生哪項情況須立即就醫？",
        "options": [
          "手部輕微脫皮",
          "發燒超過 38 度或嚴重腹瀉",
          "小便顏色變紅 (正常反應)"
        ],
        "answerIndex": 1,
        "explanation": "Cabazitaxel 有極高的熱性嗜中性球低下 (FN) 風險與嚴重腹瀉風險，兩者皆為潛在致命副作用。"
      },
      {
        "question": "關於 Cabazitaxel 的給藥設備，下列何者正確？",
        "options": [
          "使用 Non-PVC 輸注器材並使用 0.2 micron filter",
          "可以使用普通 PVC 輸液套且不需 filter",
          "必须使用黑色遮光紙包覆"
        ],
        "answerIndex": 0,
        "explanation": "紫杉醇類（除 Abraxane 外）通常都需 Non-PVC 器材且必須過濾微粒。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W (兩階段稀釋)",
      "speed": "靜脈輸注時間定為 1 小時",
      "device": "Non-PVC 輸注套 (Standard) + 0.2 micron in-line filter (橘)"
    },
    "storage": "室溫保存 (15-30°C)，稀釋液在室溫下穩定時間有限",
    "education": [
      "打藥後若發燒超過 38 度，無論何時請務必立即聯繫醫療團隊或至急診",
      "若出現嚴重腹瀉、腹痛或血尿，請立即報之",
      "治療期間需搭配服用口服類固醇 Prednisone"
    ],
    "patientEducation": {
      "title": "Cabazitaxel/Jevtana® 去癌達注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 cabazitaxel 曾有過敏狀況（皮疹、呼吸急促、腫脹等）請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您有肝臟疾病病史或曾經接受過骨盆腔部位的放射治療，請告知您的醫師。",
        "若您之後有需要注射疫苗，請務必告知醫師您曾使用過本藥品。",
        "若正在哺乳請務必停止；有懷孕計畫者請先與醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、喘、呼吸困難)", "management": "立即告知人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青)", "management": "立即就醫或告知人員，需輸血治療。" },
        { "reaction": "腎功能相關 (尿量減少、排尿困難、體重增加、水腫)", "management": "立即告知人員。" },
        { "reaction": "周邊神經相關 (皮膚感覺異常、麻木、神經痛、手腳灼燒感)", "management": "立即告知人員。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了當天，也可能發生在之後 3-4 天。請少量多餐。" },
        { "reaction": "腹瀉、胃痙攣、頭痛、關節痛", "management": "可與人員反應，給予症狀緩解治療。" },
        { "reaction": "掉髮", "management": "請保持清潔。療程結束後頭髮會再生。" }
      ],
      "additionalNotes": [
        "觀察身體狀況反應，隨時與照護人員討論。",
        "若有任何問題，請聯絡醫師、藥師、護理師。"
      ]
    },
    "nursingPoints": [
      {
        "title": "神經與骨髓毒性評估",
        "content": "詳細追蹤 ANC 數值。評估病患的神經病變嚴重度 (麻木感)。"
      },
      {
        "title": "輸注安全性",
        "content": "嚴格執行 Non-PVC 耗材配置。監測輸注期間是否有疑似過敏反應。"
      }
    ]
  },
  {
    "id": "fluorouracil",
    "brandName": "5-FU",
    "name": "好復注射液",
    "englishName": "Fluorouracil",
    "category": "化學治療",
    "subCategory": "抗代謝",
    "type": "抗代謝藥物",
    "risk": "低致吐",
    "mechanism": "5-Fluorouracil (5-FU) 是一種嘧啶類似物。它在細胞內轉化為活性代謝物，藉由抑制胸苷酸合成酶 (TS) 阻斷 DNA 合成，並可嵌入 RNA 中導致合成蛋白質障礙。這會造成細胞分裂停止與死亡，對快速增殖的腫瘤細胞具有殺傷作用。",
    "simpleMechanism": "偽裝成營養組件，讓癌細胞誤用後因建造不出正確 DNA 而死亡。",
    "indications": [
      "治療消化道癌症 (如胃、腸、胰臟)",
      "與其他藥物併用治療乳癌、頭頸癌",
      "用於表淺性基底細胞癌的局部治療 (乳膏製劑)",
      "泌尿科偶用於尿路上皮癌的合併化療計畫"
    ],
    "sideEffects": [
      "口腔黏膜炎 (Mucositis)",
      "腹瀉",
      "手足症候群 (Hand-foot syndrome)",
      "骨髓抑制",
      "心肌缺計 (罕見但嚴重)"
    ],
    "preMedication": [
      "止吐劑 (通常極低致吐，視總劑量而定)",
      "冰块 (給藥時含在口中可預防黏膜炎)"
    ],
    "monitoring": [
      "觀察口腔黏膜完整性",
      "監測排便次數",
      "檢查手掌與足底有無紅腫或脫皮",
      "心臟功能評估 (若病患有胸悶主訴)"
    ],
    "extravasation": "刺激性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "併用 Leucovorin 會增加 5-FU 與胸苷酸合成酶的結合，顯著增強其療效及毒性",
      "長期連續輸注 (CI) 較易發生手足症候群；快速注射 (Bolus) 較易發生骨髓抑制",
      "DPRD 基因缺陷的病患在使用 5-FU 後可能產生威脅生命的嚴重毒性"
    ],
    "quizzes": [
      {
        "question": "5-FU 輸注期間建議病人？",
        "options": [
          "口腔冰敷 (Ice chips)",
          "喝酒",
          "抽菸"
        ],
        "answerIndex": 0,
        "explanation": "含冰塊可減少口腔黏膜炎的嚴重度。"
      },
      {
        "question": "關於 5-FU 的「手足症候群」(Hand-foot syndrome) 衛教，下列何者正確？",
        "options": [
          "只會發生在快速注射的病患",
          "病患應保持皮膚涼爽、保濕，並避免穿過緊的鞋襪",
          "症狀消失前嚴禁洗澡"
        ],
        "answerIndex": 1,
        "explanation": "手足症候群是 5-FU 長時間輸注常見的副作用。病患應注意皮膚保養並避免摩擦或高溫刺激。"
      },
      {
        "question": "5-FU 的作用機轉主要在於抑制下列哪一個酵素？",
        "options": [
          "胸苷酸合成酶 (TS)",
          "拓樸異構酶 II",
          "核糖核苷酸還原酶"
        ],
        "answerIndex": 0,
        "explanation": "5-FU 會抑制胸苷酸合成酶，導致 DNA 合成受阻。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "可為快速推注 (Bolus) 或長時泵輸注 (Continuous Infusion)",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "室溫保存 (15-25°C)，不可冷藏 (會產生沉澱且複溶困難)",
    "education": [
      "注意口腔衛生，多漱口，若有破皮疼痛請告知醫師處方口內膏",
      "若手腳心發紅、緊繃或疼痛，請保持局部涼爽並塗抹護膚霜",
      "若出現胸悶或呼吸不順，請立即就醫"
    ],
    "patientEducation": {
      "title": "Fluorouracil/ 5-FU ® 好復注射液",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "若輸注時注射部位出現紅腫熱痛、水泡或液體外滲，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若已知對 Fluorouracil 曾有過敏（如皮疹、喘、腫脹等）請告知。",
        "告知完整用藥史（含處方、中藥、健康食品或補藥）。",
        "若患有心臟疾病或正在服用抗凝血劑 (Warfarin) 請告知醫師。",
        "若之後有需要注射疫苗，務必告知照護醫師您曾使用過此藥。",
        "若正在哺乳應停止，有懷孕計畫者請先與醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血尿、瘀青、出血點)", "management": "立即就醫或告知醫療團隊，可能需輸血治療。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱", "management": "可與醫療人員反應，將給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "常發生在當天或藥後 3-4 天。建議少量多餐，減少刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應給予緩解處置。" },
        { "reaction": "心臟/神經異常 (胸悶、麻木、灼熱感)", "management": "若出現心跳不律、水腫或手腳麻木，請立即告知人員。" },
        { "reaction": "視力/平衡改變", "management": "若視力模糊或無法控制眼球運動，請立即告知人員。" },
        { "reaction": "掉髮", "management": "治療期間請保持清潔，療程結束後頭髮會正常再生。" }
      ],
      "importantNotes": [
        "請仔細觀察身體反應，並隨時與醫療照護人員討論。",
        "服用任何藥物、健康食品或中藥，皆應與醫師討論。",
        "治療期間皮膚易曬傷，請加強防曬或使用遮蔽衣物。",
        "若有任何疑問，請聯絡醫師、藥師或護理師。"
      ]
    },
    "nursingPoints": [
      {
        "title": "黏膜炎預防與護理",
        "content": "指導病患執行口腔冷凍療法 (含冰塊) 20-30 分鐘。評估口腔潰瘍分級。"
      },
      {
        "title": "手足症候群觀察",
        "content": "提醒病患避免手部受壓 or 摩擦。若出現一級紅腫需注意保濕。"
      }
    ]
  },
  {
    "id": "gemcitabine",
    "brandName": "Gemmis",
    "name": "健仕注射液",
    "englishName": "Gemcitabine",
    "category": "化學治療",
    "subCategory": "抗代謝",
    "type": "抗代謝藥物",
    "risk": "低致吐",
    "mechanism": "Gemcitabine 是一種核苷類似物 (抗代謝藥物)。它在細胞內由核苷激酶代謝為活性二磷酸和三磷酸核苷。Gemcitabine 二磷酸抑制核糖核苷酸還原酶，減少 DNA 合成所需的脫氧核苷酸池。Gemcitabine 三磷酸則與脫氧胞苷三磷酸競爭嵌入 DNA 鏈，導致 DNA 合成終止並引發細胞凋亡。",
    "simpleMechanism": "取代正確的 DNA 磚塊，讓癌細胞在分裂時倒塌。",
    "indications": [
      "與 Cisplatin 併用治療局部晚期或轉移性膀胱癌 (GC 處方)",
      "作為非小細胞肺癌的第一線治療",
      "適用於治療晚期胰臟癌、乳癌及卵巢癌"
    ],
    "sideEffects": [
      "骨髓抑制 (主要是貧血與血小板低下)",
      "類流感症狀 (Flu-like symptoms)",
      "蛋白尿與血尿 (局部影響)",
      "肝功能指數升高 (暫時性)",
      "周邊水腫"
    ],
    "preMedication": [
      "止吐劑 (低致吐風險，常用 Dexamethasone)"
    ],
    "monitoring": [
      "CBC 計數 (特別注意血小板數值)",
      "肝腎功能指標",
      "生命徵象監測 (輸注反應)"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "滴注時間不可超過 60 分鐘，因為延長輸注時間會增加藥物毒性 (特別是骨髓抑制)",
      "類流感症狀通常發生在給藥後 24 小時內，一般不需特殊處理即可緩解",
      "具有肺毒性風險，若病患出現不明原因呼吸困難需評估是否有肺間質病變"
    ],
    "quizzes": [
      {
        "question": "Gemcitabine (健仕) 的標準靜脈滴注時間建議為？",
        "options": [
          "不超過 60 分鐘",
          "3 小時以上",
          "24 小時連續滴注"
        ],
        "answerIndex": 0,
        "explanation": "健仕的輸注時間與毒性呈正相關，臨床上通常為 30 分鐘，嚴禁超過 60 分鐘。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS",
      "speed": "靜脈輸注時間定為 30 分鐘",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "室溫保存 (15-30°C)，不可冷藏 (冷藏可能會產生結晶)",
    "education": [
      "打藥後可能會有發燒、骨頭痠痛的感覺，多休息、多喝水即可緩解",
      "若皮膚出現瘀青或刷牙易出血，請告知醫療人員",
      "注意尿液顏色，若有明顯血尿請立即聯繫醫院"
    ],
    "nursingPoints": [
      {
        "title": "輸注時程控管",
        "content": "嚴格遵守 30 分鐘輸注時間。避免因速度過慢增加毒性。"
      },
      {
        "title": "血球低下觀察",
        "content": "重點監測血小板。告知病患日常生活中的出血預防措施。"
      }
    ],
    "patientEducation": {
      "title": "Gemcitabine/Gemcitabine® 健仕平注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Gemcitabine 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過 Gemcitabine 藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了接受治療當天可能發生，亦可能發生在治療結束後 3-4 天。請少量多餐，並減少攝取刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "肺功能相關副作用 (呼吸困難、換氣過度、咳嗽)", "management": "立即告知醫療人員。" },
        { "reaction": "肝功能相關副作用 (尿液顏色變深、疲倦、灰白便或皮膚變黃)", "management": "立即告知醫療人員。" },
        { "reaction": "腎功能相關副作用 (尿量減少、排尿困難、體重增加水腫)", "management": "立即告知醫療人員。" },
        { "reaction": "癲癇發作、抽搐", "management": "立即告知醫療人員。" },
        { "reaction": "周邊神經相關副作用 (皮膚感覺異常或麻木、神經痛、手腳灼燒感)", "management": "立即告知醫療人員。" },
        { "reaction": "血液電解質不平衡 (意識改變、肌肉痛、無力、心跳不規則、癲癇抽蓄)", "management": "立即就醫或告知醫療人員。" },
        { "reaction": "高血糖症狀 (意識混亂、嗜睡、口渴、頻尿、呼吸急促、呼氣有水果味)", "management": "立即告知醫療人員。若您有糖尿病病史請務必告知您的醫師。" }
      ],
      "importantNotes": [
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    }
  },
  {
    "id": "methotrexate",
    "brandName": "Methotrexate",
    "name": "盈壽求得注射液",
    "englishName": "Methotrexate Sodium",
    "category": "化學治療",
    "subCategory": "抗代謝",
    "type": "抗代謝藥物",
    "risk": "低致吐",
    "mechanism": "Methotrexate 是一種抗代谢藥物，常用於治療惡性腫瘤。其透過競爭性抑制二氫葉酸還原酶 (DHFR) 來發揮作用。這種酶負責將二氫葉酸還原為活性的四氫葉酸。缺乏四氫葉酸會阻斷 DNA、RNA 及蛋白質的合成，最終導致細胞死亡。",
    "simpleMechanism": "鎖死細胞製造 DNA 的「生產線」，讓癌細胞斷糧而死。",
    "indications": [
      "與 Vinblastine, Doxorubicin, Cisplatin 併用治療晚期尿路上皮癌 (MVAC 處方)",
      "治療滋養層細胞疾病 (絨毛膜癌)",
      "用於白血病與淋巴瘤的中樞神經系統預防",
      "治療異位妊娠 (低劑量計畫)"
    ],
    "sideEffects": [
      "腎毒性 (由於在腎小管析出結晶)",
      "骨髓抑制",
      "口腔黏膜炎",
      "肝功能異常",
      "光敏感性"
    ],
    "preMedication": [
      "高劑量治療時必須預給：尿液鹼化 (Sodium Bicarbonate)",
      "大量水化 (Hydration)",
      "Leucovorin Rescue (依藥物濃度調整救援劑量)"
    ],
    "monitoring": [
      "血清 MTX 濃度監測 (高劑量時必做)",
      "尿液 pH 值 (需維持於 7.0 以上)",
      "血清肌酸酐檢測 (CrCl 需良好)",
      "CBC 與肝功能分析"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "併用 NSAIDs、盤林西林類抗生素會顯著降低 MTX 腎排泄，導致致死性毒性",
      "Leucovorin (活性葉酸) 補給可拯救正常細胞免於 MTX 非特異性殺傷",
      "腹水或胸水病患會形成「第三空間」，導致藥物緩慢釋放並增加全身毒性"
    ],
    "quizzes": [
      {
        "question": "高劑量 Methotrexate 輸注期間，為何需要監測尿液 pH 值？",
        "options": [
          "防止藥物在腎小管析出結晶導致腎衰竭",
          "增加病患舒適度",
          "評估肝功能"
        ],
        "answerIndex": 0,
        "explanation": "MTX 在酸性環境易沉澱，鹼化尿液 (pH > 7) 是保護腎臟的關鍵。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "取決於劑量，可從快速推注到 24 小時輸注不等",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "儲存於 20-25°C，避光保存",
    "education": [
      "治療期間及後數天，嚴禁服用葉酸保健食品或綜合維他命",
      "外出請加強防曬，避免陽光直射皮膚",
      "若有嚴重嘴破、喉嚨痛，請通知醫師評估黏膜毒性"
    ],
    "nursingPoints": [
      {
        "title": "尿液鹼化與救援監控",
        "content": "確保尿液 pH > 7.0 後方可給藥。嚴格遵守 Leucovorin 給藥時間，延遲給藥會導致不可逆毒性。"
      },
      {
        "title": "藥物交互作用警戒",
        "content": "核對病患居家藥物，特別是阿斯匹靈或感冒藥，避免 MTX 排泄受阻。"
      }
    ],
    "patientEducation": {
      "title": "Methotrexate/Methotrexate® 盈壽求得注射液注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品輸注時可能產生嚴重輸注反應，症狀包括：發燒、寒顫、呼吸困難、臉部浮腫等。大部分反應發生時間為輸注後 24 小時，請密切注意自身身體狀況，若有出現任何不適，請立即告知醫療人員。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Methotrexate 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過此藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。",
        "若您有骨髓相關疾病(例如低白血球、低血小板、貧血)、飲酒問題、肝臟疾病或是免疫功能問題等，請告知您的醫師。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱、情緒改變", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了接受治療當天可能發生，亦可能發生在治療結束後 3-4 天。請少量多餐，並減少攝取刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "掉髮", "management": "在治療期間發生，請盡量保持清潔。療程結束後，頭髮會再生。" },
        { "reaction": "腫瘤溶解症候群 (尿量變少、肌肉抽搐、腹痛噁心等)", "management": "立即告知醫療人員。" },
        { "reaction": "心臟功能異常 (呼吸急促、體重增加、水腫或心跳不規則等)", "management": "立即告知醫療人員。" },
        { "reaction": "肺功能相關副作用 (呼吸困難、換氣過度、咳嗽)", "management": "立即告知醫療人員。" },
        { "reaction": "肝功能相關副作用 (尿液顏色變深、疲倦、灰白便或皮膚變黃)", "management": "立即告知醫療人員。" },
        { "reaction": "腎功能相關副作用 (尿量減少、排尿困難、體重增加水腫)", "management": "立即告知醫療人員。" },
        { "reaction": "癲癇發作、抽搐", "management": "立即告知醫療人員。" },
        { "reaction": "周邊神經相關副作用 (皮膚感覺異常或麻木、神經痛、手腳灼燒感)", "management": "立即告知醫療人員。" },
        { "reaction": "可逆性後大腦白質病變症候群 (癲癇、高血壓、頭痛、嗜睡、困惑、失明等)", "management": "立即告知醫療人員。" },
        { "reaction": "血液電解質不平衡 (意識改變、肌肉痛、無力、心跳不規則、癲癇抽蓄)", "management": "立即就醫或告知醫療人員。" },
        { "reaction": "高血糖症狀 (意識混亂、嗜睡、口渴、頻尿、呼吸急促、呼氣有水果味)", "management": "立即告知醫療人員。若您有糖尿病病史請務必告知您的醫師。" },
        { "reaction": "急性胰臟炎 (腹痛、噁心嘔吐)", "management": "立即告知醫療人員。" },
        { "reaction": "手足症候群 (手腳掌泛紅、腫脹、麻木、刺痛、脫皮、水泡)", "management": "立即告知醫療人員。避免暴露在太陽下及接觸熱水太久，穿寬鬆衣物鞋子。" },
        { "reaction": "周邊神經相關副作用 (皮疹、痤瘡、甲溝炎)", "management": "立即告知醫療人員。可予症狀緩解治療。" }
      ],
      "importantNotes": [
        "本藥品可能造成嚴重骨髓抑制、腸胃功能問題，尤其是同時並用非類固醇抗發炎藥品 (如 ibuprofen、naproxen)。若需用止痛藥，請與您的醫師討論。",
        "本藥品可能增加心臟衰竭風險。若您有心臟相關疾病，請告知醫師。",
        "治療期間容易曬傷，請使用防曬乳以及遮蔽衣物。",
        "請仔細觀察身體狀況反應，隨時與醫療照護人員討論。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    }
  },
  {
    "id": "etoposide",
    "brandName": "Fytosid",
    "name": "癌妥滅靜脈注射液",
    "englishName": "Etoposide",
    "category": "化學治療",
    "subCategory": "植物鹼",
    "type": "抑制劑",
    "risk": "低致吐",
    "mechanism": "Etoposide 是一種拓樸異構酶 II 抑制劑。它可與 DNA 和拓樸異構酶 II 形成三元複合物。Etoposide 可防止拓樸異構酶 II 對 DNA 鏈進行再連接，這會導致 DNA 鏈斷裂並引發 G2 期的細胞週期停滯，最後導致細胞凋亡。",
    "simpleMechanism": "鎖定並阻止修復 DNA 的「工人」，讓癌細胞 DNA 斷裂而死。",
    "indications": [
      "與其他化療藥物併用治療轉移性睪丸腫瘤 (BEP 處方)",
      "與 Cisplatin 併用適用於非小細胞或小細胞肺癌的第一線治療",
      "用於治療淋巴瘤及某些兒童腫瘤"
    ],
    "sideEffects": [
      "急性低血壓 (發生於輸注速度過快時)",
      "骨髓抑制 (主要是嗜中性球低下)",
      "掉髮 (常見且可達重度)",
      "過敏反應 (支氣管痙攣)",
      "口腔黏膜炎"
    ],
    "preMedication": [
      "止吐劑 (低致吐風險，如 Dexamethasone)"
    ],
    "monitoring": [
      "輸注期間的血壓監測 (若 BP 下降需調慢滴速)",
      "CBC 計數分析",
      "評估是否有過敏症狀 (喘鳴音、皮膚紅疹)"
    ],
    "extravasation": "刺激性",
    "extravasationAction": {
      "type": "熱敷",
      "detail": "Warm compression (44-50℃) for 20-30 min, QID for 1-2 days.",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "輸注時間務必大於 30-60 分鐘，以防止突發性的低血壓反應",
      "若病患出現低血壓，通常停止輸注並補充液體即可恢復，隨後可考慮以較慢速度恢復輸注",
      "藥物在高濃度下容易產生析出結晶，稀釋後應儘速給藥"
    ],
    "quizzes": [
      {
        "question": "Etoposide 輸注期間最關鍵的生命徵象監測項目是？",
        "options": [
          "血壓 (BP)",
          "體溫 (BT)",
          "血氧 (SpO2)"
        ],
        "answerIndex": 0,
        "explanation": "輸注速度過快會引發類過敏反應導致血壓下降。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "靜脈輸注時間不少於 30-60 分鐘",
      "device": "Non-PVC 輸注套 (綠) (cIF 亦可)"
    },
    "storage": "儲存於室溫 (15-25°C)，避光保存",
    "education": [
      "在打藥過程中若感到頭暈、心跳加快或呼吸不順，請立即呼叫護理師",
      "治療後可能會有明顯掉髮現象，通常於療程結束後會緩慢長回",
      "多休息並預防感染"
    ],
    "patientEducation": {
      "title": "Etoposide / Fytosid ® 癌妥滅靜脈注射液",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "若輸注時注射部位出現紅腫熱痛、水泡或液體外滲，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若已知對 etoposide 曾有過敏（如皮疹、喘、腫脹等）請告知。",
        "告知完整用藥史（含處方藥、自購藥、中藥、補藥或健康食品）。",
        "若之後有需要注射疫苗，務必告知照護醫師您曾使用過此藥。",
        "若正在哺乳應停止，有懷孕計畫者請先與醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血尿、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱", "management": "可與人員反應給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "常發生在當天或藥後 3-4 天。建議少量多餐，減少刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應給予緩解處置。" },
        { "reaction": "肝/神經異常 (黃疸、麻木、灼熱感)", "management": "若出現尿深、皮膚變黃或手腳異常感，請立即告知人員。" },
        { "reaction": "掉髮", "management": "治療期間請保持清潔，療程結束後頭髮會正常再生。" }
      ],
      "importantNotes": [
        "請仔細觀察身體反應，並隨時與醫療照護人員討論。",
        "服用任何藥物、健康食品或中藥，皆應與醫師討論。",
        "若有任何疑問，請聯絡醫師、藥師或護理師。"
      ]
    },
    "nursingPoints": [
      {
        "title": "血壓平衡監控",
        "content": "輸注前半小時與輸注期間定期量測血壓。注意病患姿位性低血壓風險。"
      },
      {
        "title": "相容性觀察",
        "content": "稀釋後觀察瓶內是否有微細結晶。建議使用高容量稀釋液以維持穩定。"
      }
    ]
  },
  {
    "id": "irinotecan",
    "brandName": "Campto Conc",
    "name": "抗癌妥靜脈輸注濃縮液",
    "englishName": "Irinotecan HCl",
    "category": "化學治療",
    "subCategory": "植物鹼",
    "type": "抑制劑",
    "risk": "中致吐",
    "mechanism": "Irinotecan 是一種拓樸異構酶 I 抑制劑。它是 Camptothecin 的半合成衍生物。Irinotecan 及其活性代謝物 SN-38 可與拓樸異構酶 I - DNA 複合物結合，進而防止 DNA 鏈의 再連接。這會導致 DNA 雙鏈斷裂並引起細胞死亡。",
    "simpleMechanism": "阻斷癌細胞切斷與修補 DNA 的關鍵步驟，讓它死於 DNA 損傷。",
    "indications": [
      "與 5-FU 及 Leucovorin 併用治療轉移性大腸直腸癌 (FOLFIRI 處方)",
      "與其他藥物併用治療局部晚期或轉移性尿路上皮癌",
      "用於治療小細胞肺癌"
    ],
    "sideEffects": [
      "腹瀉 (分為早發性膽鹼激性與遲發性)",
      "嚴重骨髓抑制 (嗜中性球低下)",
      "噁心、嘔吐",
      "膽鹼性症狀 (流口水、出汗、腹部絞痛)",
      "掉髮"
    ],
    "preMedication": [
      "止吐劑 (中致吐風險：5-HT3 拮抗劑 + Dexamethasone)",
      "Atropine (可預防性給藥或用於處理急性腹瀉)"
    ],
    "monitoring": [
      "密切監測病患在輸注期間是否有腹部絞痛 or 出汗",
      "CDC 計數分析 (尤其是 ANC)",
      "肝功能指數評估",
      "生命徵象監測"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "「I run to the can」是其腹瀉副作用的順口溜。急性期可用 Atropine，遲發期必須用 Loperamide",
      "具有重度骨髓抑制風險，特別是在 UGT1A1 基因多型性特定的病患中毒性較高",
      "稀釋液通常建議使用 5% D5W，部分資料顯示在 NS 中較不穩定"
    ],
    "quizzes": [
      {
        "question": "對於使用 Irinotecan 後產生的「遲發性」腹瀉，首選處置藥物是？",
        "options": [
          "Atropine",
          "Loperamide (Imodium)",
          "綜合維他命"
        ],
        "answerIndex": 1,
        "explanation": "遲發性腹瀉可能導致脫水甚至致命，需指導病患在家服用高劑量 Loperamide。"
      }
    ],
    "administration": {
      "diluent": "5% D5W (建議) 或 0.9% NS",
      "speed": "靜脈輸注時間定為 90 分鐘",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "儲存於室溫 (15-30°C)，避光保存",
    "education": [
      "打藥期間若覺得口水變多、肚子痛或一直想跑廁所，請立即告訴護理師",
      "若回家後出現大量水瀉 (一天大於 4 次)，請立即服用診所備用的止瀉藥並回報",
      "注意發燒徵兆，預防感染"
    ],
    "nursingPoints": [
      {
        "title": "雙重腹瀉管理",
        "content": "詳細區分早發性 (24 小時內) 與遲發性腹瀉。確認病患手中有足量止瀉藥預備。"
      },
      {
        "title": "膽鹼能危象觀察",
        "content": "輸注時備妥 Atropine。觀察是否有出汗或縮瞳等副交感神經活性增加徵兆。"
      }
    ],
    "patientEducation": {
      "title": "Irinotecan/Campto®抗癌妥靜脈輸注濃縮液",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品在施打時若不慎外滲，可能造成局部組織損傷，故如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Irinotecan 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過 Irinotecan 藥品。",
        "若您正接受腎臟透析，請告知您的醫師。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "嚴重腹瀉 (黑便或血便、脫水症狀、24小時內無法緩解)", "management": "【極重要】出現上述症狀或無法從口補充液體時，請立即告知您的醫師。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (解黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了接受治療當天可能發生，亦可能發生在治療結束後 3-4 天。請少量多餐，並減少攝取刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "掉髮", "management": "在治療期間發生，請盡量保持清潔。療程結束後，頭髮會再生。" },
        { "reaction": "血液電解質不平衡 (意識改變、肌肉痛、無力、心跳不規則、癲癇抽蓄)", "management": "立即就醫或告知醫療人員。" },
        { "reaction": "肺功能相關副作用 (呼吸困難、換氣過度、咳嗽)", "management": "立即告知醫療人員。" },
        { "reaction": "腎功能相關副作用 (尿量減少、排尿困難、體重增加水腫)", "management": "立即告知醫療人員。" },
        { "reaction": "周邊神經相關副作用 (皮膚感覺異常或麻木、神經痛、手腳灼燒感)", "management": "立即告知醫療人員。" }
      ],
      "importantNotes": [
        "本藥品可能造成嚴重腹瀉問題，若您出現黑便或血便、出現脫水症狀或無法從口補充液體時，以及腹瀉症狀無法再 24 小時內獲得緩解，請告知您的醫師。",
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    }
  },
  {
    "id": "doxorubicin",
    "brandName": "Adriamycin",
    "name": "艾黴素注射劑",
    "englishName": "Doxorubicin HCL",
    "category": "化學治療",
    "subCategory": "抗體類",
    "type": "蒽環類",
    "risk": "中至高致吐",
    "mechanism": "Doxorubicin 是一種蒽環類抗癌抗生素。它主要透過嵌入 DNA 鹼基對之間並抑制拓樸異構酶 II 來干擾 DNA 的合成及功能。它也會產生自由基，導致細胞膜受損與 DNA 斷裂，進而引發細胞凋亡。其具有顯著的心臟毒性。",
    "simpleMechanism": "干擾癌細胞製作 DNA 的機具，並讓它們累積毒素自殺。",
    "indications": [
      "與其他化療藥物併用治療局部晚期或轉移性尿路上皮癌 (MVAC 處方)",
      "用於治療淋巴瘤、白血病、乳癌、肉瘤",
      "轉移性膀胱癌的常見二線或合併處方成分"
    ],
    "sideEffects": [
      "心臟毒性 (急性能引起心律不整，遲發性能引起心臟衰竭)",
      "紅色尿液 (無害的藥物色澤)",
      "骨髓抑制 (嗜中性球低下為限制毒性)",
      "嚴重的局部組織發疱 (Extravasation 危險)",
      "完全性掉髮"
    ],
    "preMedication": [
      "高致吐性預防：5-HT3 拮抗劑 + Dexamethasone",
      "可能需要 NK1 拮抗劑 (視劑量與組合而定)"
    ],
    "monitoring": [
      "監測心臟功能 (LVEF，通常每 3 個月評估一次)",
      "計算終生累積劑量 (通常上限為 450-550 mg/m2)",
      "輸注期間密切觀察注射部位 (預防外滲)",
      "CDC 計數分析"
    ],
    "extravasation": "發疱性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "1. 99% DMSO, topical, to twice the affected area, allow to air dry. Repeat QID x 7 days.\n2. Cold compression with ice pack for 20 min QID for 1-2 days.",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "Adriamycin 的紅色藥水極具識別度，病患排出的紅色尿液常被誤認為血尿，需預先說明",
      "發生外滲時會導致嚴重的組織潰瘍與壞死，建議優先使用中央靜脈導管 (Port-A) 給藥",
      "心臟毒性具有永久性且與劑量呈正相關，達到上限後必須更換處方"
    ],
    "quizzes": [
      {
        "question": "使用 Doxorubicin (小紅莓) 治療後，病患發現尿液變為紅色，下列敘述何者正確？",
        "options": [
          "是藥物本色導致的正常現象，不需擔心",
          "代表腎臟出血，需立即就醫",
          "這是食物過敏的反應"
        ],
        "answerIndex": 0,
        "explanation": "小紅莓為紅棕色透明藥水，給藥後 1-2 天內尿液呈現紅橘色為藥物排除的正常反應。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS",
      "speed": "靜脈推注 (Slow push) 或短期輸注",
      "device": "具有極高發疱性風險，建議優先使用中央靜脈導管 (Port-A) 或一般輸液套 (Standard set)",
      "flush": "【關鍵】給藥結束後必須立即使用大量 (至少 20-50ml) NS 進行沖洗，以降低血管化學性發炎風險。"
    },
    "storage": "儲存於室溫 (15-30°C)，避光保存",
    "stability": {
      "reconstitution": {
        "roomTemp": "24小時",
        "refrigerated": "30天"
      }
    },
    "education": [
      "打藥後一兩天如果尿尿變紅是藥水的顏色，不用驚慌",
      "若在打藥後感到明顯心悸、呼吸變喘或是腳踝腫脹，請務必回診告知",
      "治療期間頭髮會明顯脫落，通常在停藥後會重新生長"
    ],
    "patientEducation": {
      "title": "Doxorubicin/Adriamycin® 艾黴素注射劑",
      "importantNotes": "本藥品為強烈發疱性藥物，且具有累積性的心臟毒性。醫師會定期檢查您的心臟功能。",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "此藥為強烈發疱劑，若注射部位出現紅腫熱痛、灼熱感請「立即」告知醫療人員。若外滲未即時處理，可能導致嚴重的皮膚潰瘍。"
      ],
      "preAdministrationInfo": [
        "若已知對 Doxorubicin 或其它蒽環類藥物過敏，請告知醫師。",
        "告知目前用藥史 (特別是心臟病藥物)。",
        "有疫苗建議、哺乳或懷孕計畫請提出。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應", "management": "立即告知人員。" },
        { "reaction": "感染/出血 (發燒、瘀青等)", "management": "立即就醫或告知人員。" },
        { "reaction": "心臟功能異常 (喘促、水腫)", "management": "立即就醫評估。" },
        { "reaction": "肝腎功能異常", "management": "定期回診監測抽血指標。" },
        { "reaction": "嚴重皮膚反應/紅色的尿液", "management": "尿液變紅為正常；若有皮膚紅斑請告知人員。" }
      ],
      "additionalNotes": [
        "掉髮：幾乎 100% 發生，停藥後會再長回。",
        "噁心嘔吐：發生於當天或 3-4 天後。"
      ]
    },
    "nursingPoints": [
      {
        "title": "終生劑量與心功能管理",
        "content": "給藥前核對病患病歷中的過往累積劑量。確保病患的心臟 LVEF 百分比符合安全標準。"
      },
      {
        "title": "外滲高防護措施",
        "content": "若由周邊靜脈給藥，每 2-5 分鐘需回抽確認有無回血。一旦發生外滲立即啟動冷敷與 DMSO 處置。"
      }
    ]
  },
  {
    "id": "vinblastine",
    "brandName": "Vinblastine",
    "name": "敏伯斯登注射液",
    "englishName": "Vinblastine",
    "category": "化學治療",
    "subCategory": "植物鹼",
    "type": "長春花生物鹼",
    "risk": "低致吐",
    "mechanism": "Vinblastine 是一種長春花生物鹼。其與微管蛋白結合並抑制微管的聚合，導致有絲分裂紡錘體消失與細胞分裂停止在 M 期。它主要作用於細胞週期的 M 期，對快速分裂的細胞顯示高度選擇性殺傷。",
    "simpleMechanism": "破壞癌細胞分裂所需的「鷹架」，讓它無法順利造出下一代。",
    "indications": [
      "與其他化療藥物併用治療轉移性睪丸腫瘤 (如 BEP 處方)",
      "併用於治療晚期尿路上皮癌 (如 MVAC 處方)",
      "治療何杰金氏淋巴瘤、各種硬組織肉瘤"
    ],
    "sideEffects": [
      "骨髓抑制 (主要是嗜中性球低下，為劑量限制毒性)",
      "嚴重的組織發疱 (Extravasation 危險)",
      "周邊神經毒性 (末梢麻木、便秘)",
      "噁心、嘔吐",
      "肌肉痛"
    ],
    "preMedication": [
      "止吐劑 (低致吐風險)"
    ],
    "monitoring": [
      "CDC 計數分析",
      "監測腸胃蠕動 (評估有無嚴重便秘或麻痺性腸阻塞)",
      "輸注部位密切觀察 (預防外滲)",
      "神經功能評估"
    ],
    "extravasation": "發疱性",
    "extravasationAction": {
      "type": "熱敷",
      "detail": "Warm compression (44-50℃) for 20-30 min, QID for 1-2 days.",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "嚴禁進行鞘內 (Intrathecal) 給藥，一旦誤用會導致致命的神經毒性",
      "發生外滲時與大多數藥物不同，必須使用熱敷以加速藥物吸收分佈",
      "自主神經毒性可能導致嚴重便秘，建議預防性使用軟便劑"
    ],
    "quizzes": [
      {
        "question": "對於 Vinblastine (敏畢停) 引起的外滲處置，下列敘述何者正確？",
        "options": [
          "需立即使用熱敷處理",
          "必須使用冰袋冷敷",
          "不需要特別處理，可自行吸收"
        ],
        "answerIndex": 0,
        "explanation": "長春花生物鹼類外滲必須使用「熱敷」，幫助藥物散出注射部位，減少局部組織壞死。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS",
      "speed": "靜脈推注 (Slow push) 或短期輸注",
      "device": "具有極高發疱性風險，需確認靜脈回流良好；一般輸液套 (Standard set)"
    },
    "storage": "儲存於 2-8°C 冷藏避光",
    "education": [
      "打藥期間應多攝取蔬果維持排便順暢，若數天未排便請主動告知",
      "若手腳麻木、刺痛感增加，請於回診時討論",
      "打藥部位若有紅腫、脹痛感，請立即反應"
    ],
    "patientEducation": {
      "title": "Vinblastine/敏伯斯登注射液",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "此藥為強烈發疱劑，若注射部位出現紅腫熱痛、灼熱感請「立即」告知醫療人員。若外滲未即時處理，可能導致嚴重的皮膚潰瘍。與大多數藥物不同，長春花生物鹼外滲需執行「熱敷」。"
      ],
      "preAdministrationInfo": [
        "若已知對 Vinblastine 或其類藥物過敏請告知。",
        "告知目前用藥史 (含中西藥、健康食品)。",
        "有疫苗建議/哺乳/懷孕計畫請提出。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應", "management": "立即告知人員。" },
        { "reaction": "感染/出血 (發燒、瘀青等)", "management": "立即就醫。" },
        { "reaction": "嚴重便秘/腹部絞痛", "management": "多吃蔬果，必要時告知醫師開立軟便劑。" },
        { "reaction": "周邊神經損傷 (發麻、無力)", "management": "告知醫療人員評估。" }
      ],
      "additionalNotes": [
        "噁心嘔吐：發生於當天或 3-4 天後。",
        "嚴禁鞘內注射 (Intrathecal)，僅限靜脈給藥。"
      ]
    },
    "nursingPoints": [
      {
        "title": "發疱防範與處置",
        "content": "確保輸注路徑暢通。一旦疑似外滲，立即停止輸注，執行熱敷處置。"
      },
      {
        "title": "腸道功能管理",
        "content": "監測病患排便頻次。必要時依醫囑給予軟便藥物，防範麻痺性腸阻塞。"
      }
    ]
  },
  {
    "id": "bleomycin",
    "brandName": "Bleocin",
    "name": "撲類惡注射劑",
    "englishName": "Bleomycin",
    "category": "化學治療",
    "subCategory": "抗體類",
    "type": "抗生素類",
    "risk": "低致吐",
    "mechanism": "Bleomycin 是一種抗腫瘤抗生素。其透過與 DNA 結合並與鐵和氧形成複合物來發揮作用，這會導致單鏈及雙鏈 DNA 斷裂。它在細胞週期的 G2 及 M 期最為活躍。",
    "simpleMechanism": "直接破壞癌細胞的 DNA 結構，像剪刀一樣剪斷它。",
    "indications": [
      "與其他化療藥物併用治療轉移性睪丸腫瘤 (BEP 處方)",
      "治療鱗狀細胞癌 (如頭頸癌、陰莖、外陰癌)",
      "適用於治療何杰金氏淋巴瘤"
    ],
    "sideEffects": [
      "肺毒性 (間質性肺炎與肺纖維化，為黑盒警語)",
      "皮膚反應 (色素沉著、角化過度)",
      "發燒與寒顫 (給藥後常見)",
      "黏膜炎",
      "過敏反應 (急性喘鳴)"
    ],
    "preMedication": [
      "給藥前預防發燒：Acetaminophen (如 Panadol)",
      "某些中心建議進行劑量測試以排除急性過敏"
    ],
    "monitoring": [
      "監測肺功能測試 (PFT，特別是 DLCO)",
      "定期聽診肺部有無囉音 (Crackle)",
      "監測體溫變化",
      "觀察皮膚是否有帶狀色素沉著 (Flagellate erythema)"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "肺毒性具有累積劑量相關性，通常上限為 400 單位，高齡或腎功能差者風險更高",
      "接受過 Bleomycin 治療的病患，後續接受高濃度氧氣治療 (如手術時) 會誘發肺損傷，需告知麻醉師",
      "「鞭打狀」色素沉著 (Flagellate Erythema) 是此藥極具特色的皮膚副作用"
    ],
    "quizzes": [
      {
        "question": "Bleomycin (撲瘤欣) 最具威脅性且具備終生累積劑量限制的器官毒性是？",
        "options": [
          "腎衰竭",
          "肺纖維化",
          "心肌炎"
        ],
        "answerIndex": 1,
        "explanation": "肺毒性是撲瘤欣最嚴重的副作用，若病患出現不明原因咳嗽或呼吸喘必須提高警覺。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS 或 5% D5W",
      "speed": "靜脈輸注時間定為 10-30 分鐘，或緩慢靜脈推注",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "2-8°C 冷藏避光保存",
    "education": [
      "打藥當下或幾小時後可能會發燒或發冷，可服用醫師開立的退燒藥",
      "若覺得皮膚顏色變深、出現像是被鞭打過的紅痕，請告知醫師",
      "若感到呼吸變喘、持續乾咳，請務必立即就醫"
    ],
    "patientEducation": {
      "title": "Bleomycin/Bleocin® 撲類惡注射劑",
      "administrationMethod": [
        "給藥方式為靜脈點滴或皮下、肌肉注射。",
        "輸注過程中或結束後幾小時內，可能出現藥物熱（發燒、發冷），可依醫囑服用退燒藥。"
      ],
      "preAdministrationInfo": [
        "若已知對 bleomycin 曾有過敏狀況（皮疹、呼吸急促等）請立即告知。",
        "告知完整用藥史，包含處方藥、中藥、補藥或健康食品。",
        "若曾因治療其他癌症接受過 peplomycin 或其他形式的 bleomycin，務必告知。",
        "若正在哺乳或有懷孕計畫，請與醫師進行諮詢。",
        "若有肺部疾病病史或曾接受過肺部放療，請主動告知。"
      ],
      "sideEffects": [
        { "reaction": "呼吸困難、發燒、咳嗽 (肺毒性)", "management": "【極重要】立即告知醫療人員。藥後 2 個月內出現也應即刻就醫，需偵測肺功能。" },
        { "reaction": "過敏反應 (皮疹、喘、腫脹)", "management": "立即告知醫療人員，並視情況停止輸注。" },
        { "reaction": "出血 (黑便、血痰、瘀青等)", "management": "立即就醫或告知醫護人員，需評估是否需進一步治療。" },
        { "reaction": "感染 (發燒、寒顫、喉痛)", "management": "立即就醫或告知醫護人員，可能需要抗生素治療。" },
        { "reaction": "噁心、嘔吐、食慾下降", "management": "常發生於當天或藥後 3-4 天。建議少量多餐，避開刺激性食物。" },
        { "reaction": "腹瀉、胃痙攣、頭痛", "management": "可與醫護人員反應，將給予症狀緩解藥物或對症處理。" },
        { "reaction": "口腔黏膜炎、疲倦、無力", "management": "落實口腔清潔護理，並與醫護反應給予緩解治療。" },
        { "reaction": "皮膚變化、色素沈澱", "management": "出現「鞭打狀」紅疹屬此藥特色，可與人員討論緩解方式。" },
        { "reaction": "掉髮", "management": "療程期間請保持頭皮清潔。結束後頭髮會正常再生。" }
      ],
      "importantNotes": [
        "本藥品可能造成嚴重肺部問題（如間質性肺炎、肺纖維化），機率與累積劑量、抽菸及腎功有關。",
        "若曾接受過肺部放療或患有肺病，務必告知醫師。",
        "接受過此藥治療的病患，後續接受高濃度氧氣治療（如手術麻醉）有誘發肺損傷風險，需告知麻醉醫師。",
        "在接受治療期間及用藥後兩個月內，若出現呼吸喘、發燒或咳嗽，請立即就醫。"
      ],
      "additionalNotes": [
        "觀察身體狀況反應，隨時與照護人員討論。",
        "若有任何問題，請聯絡醫師、藥師、護理師。"
      ]
    },
    "nursingPoints": [
      {
        "title": "肺功能監控精準化",
        "content": "詳細核對病患的 DLCO 報告。給藥前詢問是否有呼吸短促徵象。"
      },
      {
        "title": "術前麻醉安全備註",
        "content": "提醒病患未來若需手術，務必告知醫療團隊曾使用過撲瘤欣，以控管流量氧氣濃度。"
      }
    ]
  },
  {
    "id": "vincristine",
    "brandName": "Oncovin",
    "name": "溫諾平注射劑",
    "englishName": "Vincristine",
    "category": "化學治療",
    "subCategory": "植物鹼",
    "type": "長春花生物鹼",
    "risk": "低致吐",
    "mechanism": "Vincristine 是一種長春花生物鹼。其與微管蛋白結合並抑制微管的聚合，導致有絲分裂紡錘體消失與細胞分裂停止在 M 期。",
    "simpleMechanism": "破壞癌細胞分裂所需的「鷹架」，讓它無法順利造出下一代。",
    "indications": [
      "用於治療急性白血病、淋巴瘤、肉瘤"
    ],
    "sideEffects": [
      "嚴重的組織發疱 (Extravasation 危險)",
      "周邊神經毒性 (末梢麻木、便秘)",
      "噁心、嘔吐",
      "掉髮"
    ],
    "preMedication": [
      "止吐劑 (低致吐風險)"
    ],
    "monitoring": [
      "監測腸胃蠕動 (評估有無嚴重便秘)",
      "輸注部位密切觀察 (預防外滲)",
      "神經功能評估"
    ],
    "extravasation": "發疱性",
    "extravasationAction": {
      "type": "熱敷",
      "detail": "Warm compression (44-50℃) for 20-30 min, QID for 1-2 days.",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "嚴禁進行鞘內 (Intrathecal) 給藥，一旦誤用會導致致命的神經毒性",
      "外滲必須使用熱敷",
      "自主神經毒性可能導致嚴重便秘"
    ],
    "quizzes": [
      {
        "question": "Vincristine (溫諾平) 的給藥途徑嚴禁？",
        "options": [
          "靜脈推注",
          "鞘內注射 (Intrathecal)",
          "肌肉注射"
        ],
        "answerIndex": 1,
        "explanation": "誤將長春花生物鹼類藥物進行鞘內注射會導致致死性的神經毒性。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS",
      "speed": "靜脈推注 (Slow push)",
      "device": "具有極高發疱性風險，需確認靜脈回流良好"
    },
    "storage": "儲存於 2-8°C 冷藏避光",
    "education": [
      "若手腳麻木、刺痛感增加，請告知醫師",
      "注意有無幾天沒排便的情形"
    ],
    "patientEducation": {
      "title": "Vincristine/ VinCristine®文克斯汀注射液",
      "administrationMethod": [
        "給藥方式為靜脈點滴注射。",
        "本藥品具有強烈的發疱性，施打時若不慎外滲，可能造成局部組織損傷。如果在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。"
      ],
      "preAdministrationInfo": [
        "若您已知對 Vincristine 曾有過敏狀況，例如打藥後曾立即出現皮疹、呼吸急促或哮喘、咳嗽、臉部或喉嚨浮腫等，請立即告知您的醫師。",
        "您目前的用藥史，包含處方藥、自行使用的指示藥、中藥、補藥或是健康食品等。",
        "若您之後有需要注射疫苗，請務必告知照護醫師您曾使用過此藥品。",
        "若您正在哺乳，請務必停止哺乳，並告知您的醫師。此外，若是有懷孕計畫者，也請先與您的醫師討論。"
      ],
      "sideEffects": [
        { "reaction": "過敏反應 (皮疹、哮喘、呼吸困難)", "management": "立即告知醫療人員，並停藥。" },
        { "reaction": "感染 (發燒、寒顫、喉嚨痛、咳嗽)", "management": "立即就醫或告知醫療人員，可能需抗生素治療。" },
        { "reaction": "出血 (黑便、血痰、血尿、牙齦出血、瘀青、出血點)", "management": "立即就醫或告知醫療人員，需輸血治療。" },
        { "reaction": "肺功能相關副作用 (呼吸困難、換氣過度、咳嗽)", "management": "立即告知醫療人員。" },
        { "reaction": "周邊神經相關副作用 (皮膚感覺異常或麻木、神經痛、手腳灼燒感)", "management": "立即告知醫療人員。" },
        { "reaction": "腎功能相關副作用 (尿量減少、排尿困難、體重增加、水腫)", "management": "立即告知醫療人員。" },
        { "reaction": "癲癇發作、抽搐", "management": "立即告知醫療人員。" },
        { "reaction": "口腔黏膜炎、疲倦、虛弱", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "噁心嘔吐、食慾下降", "management": "除了接受治療當天可能發生，亦可能發生在治療結束後 3-4 天。請少量多餐，並減少攝取刺激性食物。" },
        { "reaction": "便秘、腹瀉、胃痙攣、頭痛", "management": "可與醫療人員反應，給予症狀緩解治療。" },
        { "reaction": "掉髮", "management": "在治療期間發生，請盡量保持清潔。療程結束後，頭髮會再生。" },
        { "reaction": "視力或聽力異常", "management": "可與醫療人員反應。" }
      ],
      "importantNotes": [
        "本藥品具有強烈的發疱性，施打時若不慎外滲，可能造成局部組織損傷。如在接受點滴注射時，注射部位出現紅腫熱痛、水泡或是有液體外滲時，請立即告知醫療人員。",
        "請注意了解您目前所使用的藥品，並仔細觀察身體狀況的反應，隨時與您的醫療照護人員討論。",
        "若有任何問題，請隨時與您的醫師、藥師、護理師聯絡討論。"
      ]
    },
    "nursingPoints": [
      {
        "title": "嚴防鞘內誤注",
        "content": "標籤必須加註「僅限靜脈給藥」。確認給藥途徑為 IV。"
      }
    ]
  },
  {
    "id": "trastuzumab",
    "brandName": "Herceptin",
    "name": "賀癌平注射劑",
    "englishName": "Trastuzumab",
    "category": "標靶治療",
    "subCategory": "單株抗體",
    "type": "HER2 抑制劑",
    "risk": "低致吐",
    "mechanism": "Trastuzumab 是一種重組人類化單株抗體，可選擇性地與人類上皮細胞生長因子受體 2 (HER2) 的細胞外結構域結合。結合後可抑制 HER2 陽性腫瘤細胞的增殖，並引發抗體依賴性細胞介導的細胞毒性作用 (ADCC)。",
    "simpleMechanism": "鎖定癌細胞表面的 HER2 標籤，阻止它發送生長訊號並引導免疫系統攻擊。",
    "indications": [
      "HER2 陽性之早期或轉移性乳癌",
      "HER2 陽性之轉移性胃癌"
    ],
    "sideEffects": [
      "心臟毒性 (LVEF 下降)",
      "輸注反應 (Infusion reaction)",
      "骨髓抑制 (輕微)",
      "肺毒性"
    ],
    "preMedication": [
      "通常不需要，除非曾發生輸注反應"
    ],
    "monitoring": [
      "監測心臟功能 (LVEF，每 3-4 個月)",
      "監測輸注期間是否有發燒、寒顫"
    ],
    "extravasation": "非發疱性",
    "extravasationAction": {
      "type": "冷敷",
      "detail": "Cold compression with ice pack for 20 min QID for 1-2 days",
      "source": "醫院規範"
    },
    "clinicalPearls": [
      "心臟毒性通常具可逆性，但在併用蒽環類藥物 (如 Doxorubicin) 時風險顯著增加",
      "首劑輸注時間建議為 90 分鐘，之後可縮短為 30-60 分鐘",
      "皮下注射型態 (SC) 亦常用，需注意給藥部位反應"
    ],
    "quizzes": [
      {
        "question": "使用 Trastuzumab (賀癌平) 最需定期監測的器官功能是？",
        "options": [
          "腎功能",
          "心臟功能 (LVEF)",
          "聽力"
        ],
        "answerIndex": 1,
        "explanation": "賀癌平具有潛在的心臟毒性，需定期評估左心室射出率 (LVEF) 以確保安全。"
      }
    ],
    "administration": {
      "diluent": "0.9% NS",
      "speed": "首劑 90 分鐘，後續 30-60 分鐘",
      "device": "一般輸液套 (Standard set)"
    },
    "storage": "2-8°C 冷藏避光",
    "education": [
      "若打藥期間或回家後感到呼吸急促、腳踝水腫、體重快速增加，請通知醫療人員",
      "第一次打藥可能會有發燒發冷的感覺，通常之後就會改善"
    ],
    "nursingPoints": [
      {
        "title": "心功能安全性監控",
        "content": "定期追蹤 LVEF 報告。評估病患是否有 CHF 初期徵兆 (如端坐呼吸)。"
      }
    ]
  }
];
