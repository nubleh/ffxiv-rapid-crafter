const actionNames = {
  "244": {
    "en": "Steady Hand",
    "de": "Ruhige Hand",
    "ja": "ステディハンド",
    "fr": "Main sûre"
  },
  "252": {
    "en": "Inner Quiet",
    "de": "Innere Ruhe",
    "ja": "インナークワイエット",
    "fr": "Calme intérieur"
  },
  "260": {
    "en": "Great Strides",
    "de": "Große Schritte",
    "ja": "グレートストライド",
    "fr": "Grands progrès"
  },
  "276": {
    "en": "Rumination",
    "de": "Nachsinnen",
    "ja": "リラックス",
    "fr": "Relaxation"
  },
  "277": {
    "en": "Ingenuity",
    "de": "Einfallsreichtum",
    "ja": "工面算段",
    "fr": "Ingéniosité"
  },
  "278": {
    "en": "Manipulation",
    "de": "Manipulation",
    "ja": "マニピュレーション",
    "fr": "Manipulation"
  },
  "279": {
    "en": "Waste Not",
    "de": "Nachhaltigkeit",
    "ja": "倹約",
    "fr": "Parcimonie"
  },
  "283": {
    "en": "Ingenuity II",
    "de": "Einfallsreichtum II",
    "ja": "工面算段II",
    "fr": "Ingéniosité II"
  },
  "284": {
    "en": "Innovation",
    "de": "Innovation",
    "ja": "イノベーション",
    "fr": "Innovation"
  },
  "285": {
    "en": "Waste Not II",
    "de": "Nachhaltigkeit II",
    "ja": "倹約II",
    "fr": "Parcimonie II"
  },
  "286": {
    "en": "Comfort Zone",
    "de": "Komfortzone",
    "ja": "コンファートゾーン",
    "fr": "Zone de confort"
  },
  "287": {
    "en": "Reclaim",
    "de": "Reklamation",
    "ja": "リクレイム",
    "fr": "Récupération"
  },
  "4574": {
    "en": "Manipulation",
    "de": "Manipulation",
    "ja": "マニピュレーション",
    "fr": "Manipulation"
  },
  "4597": {
    "en": "Reuse",
    "de": "Wiederverwertung",
    "ja": "リユース",
    "fr": "Récupération de chutes"
  },
  "4607": {
    "en": "Steady Hand II",
    "de": "Ruhige Hand II",
    "ja": "ステディハンドII",
    "fr": "Main sûre II"
  },
  "4615": {
    "en": "Name of the Elements",
    "de": "Name der Elemente",
    "ja": "アート・オブ・エレメンタル",
    "fr": "Nom des éléments"
  },
  "100001": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100002": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100003": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100004": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100005": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100007": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100008": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100010": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100033": {
    "en": "Rapid Synthesis",
    "de": "Schnelle Bearbeitung",
    "ja": "突貫作業",
    "fr": "Travail rapide"
  },
  "100039": {
    "en": "Piece by Piece",
    "de": "Stück für Stück",
    "ja": "ピース・バイ・ピース",
    "fr": "Pièce par pièce"
  },
  "100063": {
    "en": "Careful Synthesis",
    "de": "Sorgfältige Bearbeitung",
    "ja": "模範作業",
    "fr": "Travail prudent"
  },
  "100069": {
    "en": "Careful Synthesis II",
    "de": "Sorgfältige Bearbeitung II",
    "ja": "模範作業II",
    "fr": "Travail prudent II"
  },
  "100083": {
    "en": "Flawless Synthesis",
    "de": "Makellose Bearbeitung",
    "ja": "堅実作業",
    "fr": "Travail sérieux"
  },
  "100098": {
    "en": "Tricks of the Trade",
    "de": "Kunstgriff",
    "ja": "秘訣",
    "fr": "Ficelles du métier"
  },
  "100108": {
    "en": "Hasty Touch",
    "de": "Hastige Veredelung",
    "ja": "ヘイスティタッチ",
    "fr": "Ouvrage hâtif"
  },
  "100128": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100136": {
    "en": "Muscle Memory",
    "de": "Motorisches Gedächtnis",
    "ja": "確信",
    "fr": "Mémoire musculaire"
  },
  "100137": {
    "en": "Innovative Touch",
    "de": "Innovative Veredelung",
    "ja": "イノベイティブタッチ",
    "fr": "Toucher innovant"
  },
  "100145": {
    "en": "Byregot's Miracle",
    "de": "Byregots Wunder",
    "ja": "ビエルゴの奇跡",
    "fr": "Miracle de Byregot"
  },
  "100153": {
    "en": "Nymeia's Wheel",
    "de": "Nymeias Rad",
    "ja": "ニメーヤの紡車",
    "fr": "Rouet de Nymeia"
  },
  "100161": {
    "en": "Trained Hand",
    "de": "Geübte Hand",
    "ja": "匠の技",
    "fr": "Main experte"
  },
  "100169": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100178": {
    "en": "Maker's Mark",
    "de": "Kunst des Kundigen",
    "ja": "堅実の心得",
    "fr": "Marque du fabricant"
  },
  "100179": {
    "en": "Heart of the Carpenter",
    "de": "Seele des Zimmerers",
    "ja": "木工師の魂",
    "fr": "Âme de menuisier"
  },
  "100187": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100195": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100203": {
    "en": "Careful Synthesis",
    "de": "Sorgfältige Bearbeitung",
    "ja": "模範作業",
    "fr": "Travail prudent"
  },
  "100211": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100219": {
    "en": "Patient Touch",
    "de": "Hingebungsvolle Veredelung",
    "ja": "専心加工",
    "fr": "Ouvrage appliqué"
  },
  "100227": {
    "en": "Prudent Touch",
    "de": "Nachhaltige Veredelung",
    "ja": "倹約加工",
    "fr": "Ouvrage parcimonieux"
  },
  "100235": {
    "en": "Focused Synthesis",
    "de": "Aufmerksame Bearbeitung",
    "ja": "注視作業",
    "fr": "Travail attentif"
  },
  "100243": {
    "en": "Focused Touch",
    "de": "Aufmerksame Veredelung",
    "ja": "注視加工",
    "fr": "Ouvrage attentif"
  },
  "100251": {
    "en": "Initial Preparations",
    "de": "Fulminanter Start",
    "ja": "初手仕込",
    "fr": "Préparatifs initiaux"
  },
  "100259": {
    "en": "Specialty: Reinforce",
    "de": "Ass des Spezialisten: Regeneration",
    "ja": "マイスターの切札：再生",
    "fr": "Atout : Consolidation"
  },
  "100267": {
    "en": "Specialty: Refurbish",
    "de": "Ass des Spezialisten: Souveränität",
    "ja": "マイスターの切札：静穏",
    "fr": "Atout : Réconfort"
  },
  "100275": {
    "en": "Specialty: Reflect",
    "de": "Ass des Spezialisten: Einkehr",
    "ja": "マイスターの切札：真価",
    "fr": "Atout : Sérénité"
  },
  "100283": {
    "en": "Trained Eye",
    "de": "Flinke Hand",
    "ja": "匠の早業",
    "fr": "Main preste"
  },
  "100291": {
    "en": "Trained Instinct",
    "de": "Kräftige Hand",
    "ja": "匠の荒業",
    "fr": "Main expéditive"
  },
  "100299": {
    "en": "Preparatory Touch",
    "de": "Basisveredelung",
    "ja": "下地加工",
    "fr": "Ouvrage préparatoire"
  },
  "100307": {
    "en": "Rapid Synthesis III",
    "de": "Schnelle Bearbeitung III",
    "ja": "突貫作業III",
    "fr": "Travail rapide III"
  },
  "100315": {
    "en": "Intensive Synthesis",
    "de": "Fokussierte Bearbeitung",
    "ja": "集中作業",
    "fr": "Travail vigilant"
  },
  "100323": {
    "en": "Delicate Synthesis",
    "de": "Akribische Bearbeitung",
    "ja": "精密作業",
    "fr": "Travail minutieux"
  },
  "100331": {
    "en": "Brand of the Elements",
    "de": "Zeichen der Elemente",
    "ja": "ブランド・オブ・エレメンタル",
    "fr": "Marque des éléments"
  },
  "100339": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },

  // rapid synth
  "100363": { en: "Reflect" },
  "100364": { en: "Reflect" },
  "100365": { en: "Reflect" },
  "100366": { en: "Reflect" },
  "100367": { en: "Reflect" },
  "100368": { en: "Reflect" },
  "100369": { en: "Reflect" },
  "100370": { en: "Reflect" },
  // muscle memory
  "100379": { en: "Muscle Memory" },
  "100380": { en: "Muscle Memory" },
  "100381": { en: "Muscle Memory" },
  "100382": { en: "Muscle Memory" },
  "100383": { en: "Muscle Memory" },
  "100384": { en: "Muscle Memory" },
  "100385": { en: "Muscle Memory" },
  "100386": { en: "Muscle Memory" },
  // tricks of the trade
  "100371": { en: "Tricks of the Trade" },
  "100372": { en: "Tricks of the Trade" },
  "100373": { en: "Tricks of the Trade" },
  "100374": { en: "Tricks of the Trade" },
  "100375": { en: "Tricks of the Trade" },
  "100376": { en: "Tricks of the Trade" },
  "100377": { en: "Tricks of the Trade" },
  "100378": { en: "Tricks of the Trade" },
  // hasty touch
  "100355": { en: "Hasty Touch" },
  "100356": { en: "Hasty Touch" },
  "100357": { en: "Hasty Touch" },
  "100358": { en: "Hasty Touch" },
  "100359": { en: "Hasty Touch" },
  "100360": { en: "Hasty Touch" },
  "100361": { en: "Hasty Touch" },
  "100362": { en: "Hasty Touch" },
  // reflect
  "100387": { en: "Reflect" },
  "100388": { en: "Reflect" },
  "100389": { en: "Reflect" },
  "100390": { en: "Reflect" },
  "100391": { en: "Reflect" },
  "100392": { en: "Reflect" },
  "100393": { en: "Reflect" },
  "100394": { en: "Reflect" },
  // waste not
  "4631": { en: "Waste Not" },
  "4632": { en: "Waste Not" },
  "4633": { en: "Waste Not" },
  "4634": { en: "Waste Not" },
  "4635": { en: "Waste Not" },
  "4636": { en: "Waste Not" },
  "4637": { en: "Waste Not" },
  "4638": { en: "Waste Not" },
  // ingenuity
  "4623": { en: "Ingenuity" },
  "4624": { en: "Ingenuity" },
  "4625": { en: "Ingenuity" },
  "4626": { en: "Ingenuity" },
  "4627": { en: "Ingenuity" },
  "4628": { en: "Ingenuity" },
  "4629": { en: "Ingenuity" },
  "4630": { en: "Ingenuity" },
  // waste not ii
  "4639": { en: "Waste Not II" },
  "4640": { en: "Waste Not II" },
  "4641": { en: "Waste Not II" },
  "4642": { en: "Waste Not II" },
  "4643": { en: "Waste Not II" },
  "4644": { en: "Waste Not II" },
  "4645": { en: "Waste Not II" },
  "19002": { en: "Waste Not II" },
  "19003": { en: "Waste Not II" },
  // innovation
  "19004": { en: "Innovation" },
  "19005": { en: "Innovation" },
  "19006": { en: "Innovation" },
  "19007": { en: "Innovation" },
  "19008": { en: "Innovation" },
  "19009": { en: "Innovation" },
  "19010": { en: "Innovation" },
  "19011": { en: "Innovation" },
  // final appraisal
  "19012": { en: "Final Appraisal" },
  "19013": { en: "Final Appraisal" },
  "19014": { en: "Final Appraisal" },
  "19015": { en: "Final Appraisal" },
  "19016": { en: "Final Appraisal" },
  "19017": { en: "Final Appraisal" },
  "19018": { en: "Final Appraisal" },
  "19019": { en: "Final Appraisal" }
};

export interface ActionNames {
  [key: string]: {
    [key: string]: string
  }
}
export default actionNames as ActionNames;
