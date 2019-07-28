const actionNames = {
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
  "100006": {
    "en": "Brand of Wind",
    "de": "Zeichen des Winds",
    "ja": "ブランド・オブ・ウィンド",
    "fr": "Marque du vent"
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
  "100011": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100012": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100013": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100014": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100015": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100016": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100017": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100018": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100019": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100020": {
    "en": "Brand of Fire",
    "de": "Zeichen des Feuers",
    "ja": "ブランド・オブ・ファイア",
    "fr": "Marque du feu"
  },
  "100021": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100022": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100023": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100024": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100025": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100026": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100027": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100028": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100029": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100030": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100031": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100032": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100033": {
    "en": "Rapid Synthesis",
    "de": "Schnelle Bearbeitung",
    "ja": "突貫作業",
    "fr": "Travail rapide"
  },
  "100034": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100035": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100036": {
    "en": "Brand of Ice",
    "de": "Zeichen des Eises",
    "ja": "ブランド・オブ・アイス",
    "fr": "Marque de la glace"
  },
  "100037": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100038": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100039": {
    "en": "Piece by Piece",
    "de": "Stück für Stück",
    "ja": "ピース・バイ・ピース",
    "fr": "Pièce par pièce"
  },
  "100040": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100041": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100042": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100043": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100044": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100045": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100046": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100047": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100048": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100049": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100050": {
    "en": "Brand of Earth",
    "de": "Zeichen der Erde",
    "ja": "ブランド・オブ・アース",
    "fr": "Marque de la terre"
  },
  "100051": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100052": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100053": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100054": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100055": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100056": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100057": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100058": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100059": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100060": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100061": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100062": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100063": {
    "en": "Careful Synthesis",
    "de": "Sorgfältige Bearbeitung",
    "ja": "模範作業",
    "fr": "Travail prudent"
  },
  "100064": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100065": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100066": {
    "en": "Brand of Lightning",
    "de": "Zeichen des Blitzes",
    "ja": "ブランド・オブ・ライトニング",
    "fr": "Marque de la foudre"
  },
  "100067": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100068": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100069": {
    "en": "Careful Synthesis II",
    "de": "Sorgfältige Bearbeitung II",
    "ja": "模範作業II",
    "fr": "Travail prudent II"
  },
  "100070": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100071": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100072": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100073": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100074": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100075": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100076": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100077": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100078": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100079": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100080": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100081": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100082": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100083": {
    "en": "Flawless Synthesis",
    "de": "Makellose Bearbeitung",
    "ja": "堅実作業",
    "fr": "Travail sérieux"
  },
  "100084": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100085": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100086": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100087": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100088": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100089": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100090": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100091": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100092": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100093": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100094": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100095": {
    "en": "Brand of Water",
    "de": "Zeichen des Wassers",
    "ja": "ブランド・オブ・ウォーター",
    "fr": "Marque de l'eau"
  },
  "100096": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100097": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100098": {
    "en": "Tricks of the Trade",
    "de": "Kunstgriff",
    "ja": "秘訣",
    "fr": "Ficelles du métier"
  },
  "100099": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100100": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100101": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100102": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100103": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100104": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100105": {
    "en": "Basic Synthesis",
    "de": "Bearbeiten",
    "ja": "作業",
    "fr": "Travail de base"
  },
  "100106": {
    "en": "Basic Touch",
    "de": "Veredelung",
    "ja": "加工",
    "fr": "Ouvrage de base"
  },
  "100107": {
    "en": "Master's Mend",
    "de": "Wiederherstellung",
    "ja": "マスターズメンド",
    "fr": "Réparation de maître"
  },
  "100108": {
    "en": "Hasty Touch",
    "de": "Hastige Veredelung",
    "ja": "ヘイスティタッチ",
    "fr": "Ouvrage hâtif"
  },
  "100109": {
    "en": "Standard Touch",
    "de": "Solide Veredelung",
    "ja": "中級加工",
    "fr": "Ouvrage standard"
  },
  "100110": {
    "en": "Master's Mend II",
    "de": "Wiederherstellung II",
    "ja": "マスターズメンドII",
    "fr": "Réparation de maître II"
  },
  "100111": {
    "en": "Standard Synthesis",
    "de": "Solide Bearbeitung",
    "ja": "中級作業",
    "fr": "Travail standard"
  },
  "100112": {
    "en": "Advanced Touch",
    "de": "Höhere Veredelung",
    "ja": "上級加工",
    "fr": "Ouvrage avancé"
  },
  "100113": {
    "en": "Observe",
    "de": "Beobachten",
    "ja": "経過観察",
    "fr": "Observation"
  },
  "100114": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100115": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100116": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100117": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100118": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100119": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100120": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100121": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100122": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100123": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100124": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100125": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100126": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100127": {
    "en": "Byregot's Brow",
    "de": "Byregots Schwung",
    "ja": "ビエルゴの技巧",
    "fr": "Contenance de Byregot"
  },
  "100128": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100129": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100130": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100131": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100132": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100133": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100134": {
    "en": "Precise Touch",
    "de": "Präzise Veredelung",
    "ja": "集中加工",
    "fr": "Ouvrage précis"
  },
  "100135": {
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
  "100138": {
    "en": "Innovative Touch",
    "de": "Innovative Veredelung",
    "ja": "イノベイティブタッチ",
    "fr": "Toucher innovant"
  },
  "100139": {
    "en": "Innovative Touch",
    "de": "Innovative Veredelung",
    "ja": "イノベイティブタッチ",
    "fr": "Toucher innovant"
  },
  "100140": {
    "en": "Innovative Touch",
    "de": "Innovative Veredelung",
    "ja": "イノベイティブタッチ",
    "fr": "Toucher innovant"
  },
  "100141": {
    "en": "Innovative Touch",
    "de": "Innovative Veredelung",
    "ja": "イノベイティブタッチ",
    "fr": "Toucher innovant"
  },
  "100142": {
    "en": "Innovative Touch",
    "de": "Innovative Veredelung",
    "ja": "イノベイティブタッチ",
    "fr": "Toucher innovant"
  },
  "100143": {
    "en": "Innovative Touch",
    "de": "Innovative Veredelung",
    "ja": "イノベイティブタッチ",
    "fr": "Toucher innovant"
  },
  "100144": {
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
  "100146": {
    "en": "Byregot's Miracle",
    "de": "Byregots Wunder",
    "ja": "ビエルゴの奇跡",
    "fr": "Miracle de Byregot"
  },
  "100147": {
    "en": "Byregot's Miracle",
    "de": "Byregots Wunder",
    "ja": "ビエルゴの奇跡",
    "fr": "Miracle de Byregot"
  },
  "100148": {
    "en": "Byregot's Miracle",
    "de": "Byregots Wunder",
    "ja": "ビエルゴの奇跡",
    "fr": "Miracle de Byregot"
  },
  "100149": {
    "en": "Byregot's Miracle",
    "de": "Byregots Wunder",
    "ja": "ビエルゴの奇跡",
    "fr": "Miracle de Byregot"
  },
  "100150": {
    "en": "Byregot's Miracle",
    "de": "Byregots Wunder",
    "ja": "ビエルゴの奇跡",
    "fr": "Miracle de Byregot"
  },
  "100151": {
    "en": "Byregot's Miracle",
    "de": "Byregots Wunder",
    "ja": "ビエルゴの奇跡",
    "fr": "Miracle de Byregot"
  },
  "100152": {
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
  "100154": {
    "en": "Nymeia's Wheel",
    "de": "Nymeias Rad",
    "ja": "ニメーヤの紡車",
    "fr": "Rouet de Nymeia"
  },
  "100155": {
    "en": "Nymeia's Wheel",
    "de": "Nymeias Rad",
    "ja": "ニメーヤの紡車",
    "fr": "Rouet de Nymeia"
  },
  "100156": {
    "en": "Nymeia's Wheel",
    "de": "Nymeias Rad",
    "ja": "ニメーヤの紡車",
    "fr": "Rouet de Nymeia"
  },
  "100157": {
    "en": "Nymeia's Wheel",
    "de": "Nymeias Rad",
    "ja": "ニメーヤの紡車",
    "fr": "Rouet de Nymeia"
  },
  "100158": {
    "en": "Nymeia's Wheel",
    "de": "Nymeias Rad",
    "ja": "ニメーヤの紡車",
    "fr": "Rouet de Nymeia"
  },
  "100159": {
    "en": "Nymeia's Wheel",
    "de": "Nymeias Rad",
    "ja": "ニメーヤの紡車",
    "fr": "Rouet de Nymeia"
  },
  "100160": {
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
  "100162": {
    "en": "Trained Hand",
    "de": "Geübte Hand",
    "ja": "匠の技",
    "fr": "Main experte"
  },
  "100163": {
    "en": "Trained Hand",
    "de": "Geübte Hand",
    "ja": "匠の技",
    "fr": "Main experte"
  },
  "100164": {
    "en": "Trained Hand",
    "de": "Geübte Hand",
    "ja": "匠の技",
    "fr": "Main experte"
  },
  "100165": {
    "en": "Trained Hand",
    "de": "Geübte Hand",
    "ja": "匠の技",
    "fr": "Main experte"
  },
  "100166": {
    "en": "Trained Hand",
    "de": "Geübte Hand",
    "ja": "匠の技",
    "fr": "Main experte"
  },
  "100167": {
    "en": "Trained Hand",
    "de": "Geübte Hand",
    "ja": "匠の技",
    "fr": "Main experte"
  },
  "100168": {
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
  "100170": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100171": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100172": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100173": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100174": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100175": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100176": {
    "en": "Satisfaction",
    "de": "Zufriedenheit",
    "ja": "会心の仕事",
    "fr": "Satisfaction"
  },
  "100177": {
    "en": "Finishing Touches",
    "de": "Letzter Schliff",
    "ja": "フィニッシュワーク",
    "fr": "Touche finale"
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
  "100180": {
    "en": "Heart of the Blacksmith",
    "de": "Seele des Grobschmieds",
    "ja": "鍛冶師の魂",
    "fr": "Âme de forgeron"
  },
  "100181": {
    "en": "Heart of the Armorer",
    "de": "Seele des Plattners",
    "ja": "甲冑師の魂",
    "fr": "Âme d'armurier"
  },
  "100182": {
    "en": "Heart of the Goldsmith",
    "de": "Seele des Goldschmieds",
    "ja": "彫金師の魂",
    "fr": "Âme d'orfèvre"
  },
  "100183": {
    "en": "Heart of the Leatherworker",
    "de": "Seele des Gerbers",
    "ja": "革細工師の魂",
    "fr": "Âme de tanneur"
  },
  "100184": {
    "en": "Heart of the Weaver",
    "de": "Seele des Webers",
    "ja": "裁縫師の魂",
    "fr": "Âme de couturier"
  },
  "100185": {
    "en": "Heart of the Alchemist",
    "de": "Seele des Alchemisten",
    "ja": "錬金術師の魂",
    "fr": "Âme d'alchimiste"
  },
  "100186": {
    "en": "Heart of the Culinarian",
    "de": "Seele des Gourmets",
    "ja": "調理師の魂",
    "fr": "Âme de cuisinier"
  },
  "100187": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100188": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100189": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100190": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100191": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100192": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100193": {
    "en": "Whistle While You Work",
    "de": "Trällern",
    "ja": "仕事唄",
    "fr": "Siffler en travaillant"
  },
  "100194": {
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
  "100196": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100197": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100198": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100199": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100200": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100201": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100202": {
    "en": "Hasty Touch II",
    "de": "Hastige Veredelung II",
    "ja": "ヘイスティタッチII",
    "fr": "Ouvrage hâtif II"
  },
  "100203": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100204": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100205": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100206": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100207": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100208": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100209": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100210": {
    "en": "Careful Synthesis III",
    "de": "Sorgfältige Bearbeitung III",
    "ja": "模範作業III",
    "fr": "Travail prudent III"
  },
  "100211": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100212": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100213": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100214": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100215": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100216": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100217": {
    "en": "Rapid Synthesis II",
    "de": "Schnelle Bearbeitung II",
    "ja": "突貫作業II",
    "fr": "Travail rapide II"
  },
  "100218": {
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
  "100220": {
    "en": "Patient Touch",
    "de": "Hingebungsvolle Veredelung",
    "ja": "専心加工",
    "fr": "Ouvrage appliqué"
  },
  "100221": {
    "en": "Patient Touch",
    "de": "Hingebungsvolle Veredelung",
    "ja": "専心加工",
    "fr": "Ouvrage appliqué"
  },
  "100222": {
    "en": "Patient Touch",
    "de": "Hingebungsvolle Veredelung",
    "ja": "専心加工",
    "fr": "Ouvrage appliqué"
  },
  "100223": {
    "en": "Patient Touch",
    "de": "Hingebungsvolle Veredelung",
    "ja": "専心加工",
    "fr": "Ouvrage appliqué"
  },
  "100224": {
    "en": "Patient Touch",
    "de": "Hingebungsvolle Veredelung",
    "ja": "専心加工",
    "fr": "Ouvrage appliqué"
  },
  "100225": {
    "en": "Patient Touch",
    "de": "Hingebungsvolle Veredelung",
    "ja": "専心加工",
    "fr": "Ouvrage appliqué"
  },
  "100226": {
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
  "100228": {
    "en": "Prudent Touch",
    "de": "Nachhaltige Veredelung",
    "ja": "倹約加工",
    "fr": "Ouvrage parcimonieux"
  },
  "100229": {
    "en": "Prudent Touch",
    "de": "Nachhaltige Veredelung",
    "ja": "倹約加工",
    "fr": "Ouvrage parcimonieux"
  },
  "100230": {
    "en": "Prudent Touch",
    "de": "Nachhaltige Veredelung",
    "ja": "倹約加工",
    "fr": "Ouvrage parcimonieux"
  },
  "100231": {
    "en": "Prudent Touch",
    "de": "Nachhaltige Veredelung",
    "ja": "倹約加工",
    "fr": "Ouvrage parcimonieux"
  },
  "100232": {
    "en": "Prudent Touch",
    "de": "Nachhaltige Veredelung",
    "ja": "倹約加工",
    "fr": "Ouvrage parcimonieux"
  },
  "100233": {
    "en": "Prudent Touch",
    "de": "Nachhaltige Veredelung",
    "ja": "倹約加工",
    "fr": "Ouvrage parcimonieux"
  },
  "100234": {
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
  "100236": {
    "en": "Focused Synthesis",
    "de": "Aufmerksame Bearbeitung",
    "ja": "注視作業",
    "fr": "Travail attentif"
  },
  "100237": {
    "en": "Focused Synthesis",
    "de": "Aufmerksame Bearbeitung",
    "ja": "注視作業",
    "fr": "Travail attentif"
  },
  "100238": {
    "en": "Focused Synthesis",
    "de": "Aufmerksame Bearbeitung",
    "ja": "注視作業",
    "fr": "Travail attentif"
  },
  "100239": {
    "en": "Focused Synthesis",
    "de": "Aufmerksame Bearbeitung",
    "ja": "注視作業",
    "fr": "Travail attentif"
  },
  "100240": {
    "en": "Focused Synthesis",
    "de": "Aufmerksame Bearbeitung",
    "ja": "注視作業",
    "fr": "Travail attentif"
  },
  "100241": {
    "en": "Focused Synthesis",
    "de": "Aufmerksame Bearbeitung",
    "ja": "注視作業",
    "fr": "Travail attentif"
  },
  "100242": {
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
  "100244": {
    "en": "Focused Touch",
    "de": "Aufmerksame Veredelung",
    "ja": "注視加工",
    "fr": "Ouvrage attentif"
  },
  "100245": {
    "en": "Focused Touch",
    "de": "Aufmerksame Veredelung",
    "ja": "注視加工",
    "fr": "Ouvrage attentif"
  },
  "100246": {
    "en": "Focused Touch",
    "de": "Aufmerksame Veredelung",
    "ja": "注視加工",
    "fr": "Ouvrage attentif"
  },
  "100247": {
    "en": "Focused Touch",
    "de": "Aufmerksame Veredelung",
    "ja": "注視加工",
    "fr": "Ouvrage attentif"
  },
  "100248": {
    "en": "Focused Touch",
    "de": "Aufmerksame Veredelung",
    "ja": "注視加工",
    "fr": "Ouvrage attentif"
  },
  "100249": {
    "en": "Focused Touch",
    "de": "Aufmerksame Veredelung",
    "ja": "注視加工",
    "fr": "Ouvrage attentif"
  },
  "100250": {
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
  "100252": {
    "en": "Initial Preparations",
    "de": "Fulminanter Start",
    "ja": "初手仕込",
    "fr": "Préparatifs initiaux"
  },
  "100253": {
    "en": "Initial Preparations",
    "de": "Fulminanter Start",
    "ja": "初手仕込",
    "fr": "Préparatifs initiaux"
  },
  "100254": {
    "en": "Initial Preparations",
    "de": "Fulminanter Start",
    "ja": "初手仕込",
    "fr": "Préparatifs initiaux"
  },
  "100255": {
    "en": "Initial Preparations",
    "de": "Fulminanter Start",
    "ja": "初手仕込",
    "fr": "Préparatifs initiaux"
  },
  "100256": {
    "en": "Initial Preparations",
    "de": "Fulminanter Start",
    "ja": "初手仕込",
    "fr": "Préparatifs initiaux"
  },
  "100257": {
    "en": "Initial Preparations",
    "de": "Fulminanter Start",
    "ja": "初手仕込",
    "fr": "Préparatifs initiaux"
  },
  "100258": {
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
  "100260": {
    "en": "Specialty: Reinforce",
    "de": "Ass des Spezialisten: Regeneration",
    "ja": "マイスターの切札：再生",
    "fr": "Atout : Consolidation"
  },
  "100261": {
    "en": "Specialty: Reinforce",
    "de": "Ass des Spezialisten: Regeneration",
    "ja": "マイスターの切札：再生",
    "fr": "Atout : Consolidation"
  },
  "100262": {
    "en": "Specialty: Reinforce",
    "de": "Ass des Spezialisten: Regeneration",
    "ja": "マイスターの切札：再生",
    "fr": "Atout : Consolidation"
  },
  "100263": {
    "en": "Specialty: Reinforce",
    "de": "Ass des Spezialisten: Regeneration",
    "ja": "マイスターの切札：再生",
    "fr": "Atout : Consolidation"
  },
  "100264": {
    "en": "Specialty: Reinforce",
    "de": "Ass des Spezialisten: Regeneration",
    "ja": "マイスターの切札：再生",
    "fr": "Atout : Consolidation"
  },
  "100265": {
    "en": "Specialty: Reinforce",
    "de": "Ass des Spezialisten: Regeneration",
    "ja": "マイスターの切札：再生",
    "fr": "Atout : Consolidation"
  },
  "100266": {
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
  "100268": {
    "en": "Specialty: Refurbish",
    "de": "Ass des Spezialisten: Souveränität",
    "ja": "マイスターの切札：静穏",
    "fr": "Atout : Réconfort"
  },
  "100269": {
    "en": "Specialty: Refurbish",
    "de": "Ass des Spezialisten: Souveränität",
    "ja": "マイスターの切札：静穏",
    "fr": "Atout : Réconfort"
  },
  "100270": {
    "en": "Specialty: Refurbish",
    "de": "Ass des Spezialisten: Souveränität",
    "ja": "マイスターの切札：静穏",
    "fr": "Atout : Réconfort"
  },
  "100271": {
    "en": "Specialty: Refurbish",
    "de": "Ass des Spezialisten: Souveränität",
    "ja": "マイスターの切札：静穏",
    "fr": "Atout : Réconfort"
  },
  "100272": {
    "en": "Specialty: Refurbish",
    "de": "Ass des Spezialisten: Souveränität",
    "ja": "マイスターの切札：静穏",
    "fr": "Atout : Réconfort"
  },
  "100273": {
    "en": "Specialty: Refurbish",
    "de": "Ass des Spezialisten: Souveränität",
    "ja": "マイスターの切札：静穏",
    "fr": "Atout : Réconfort"
  },
  "100274": {
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
  "100276": {
    "en": "Specialty: Reflect",
    "de": "Ass des Spezialisten: Einkehr",
    "ja": "マイスターの切札：真価",
    "fr": "Atout : Sérénité"
  },
  "100277": {
    "en": "Specialty: Reflect",
    "de": "Ass des Spezialisten: Einkehr",
    "ja": "マイスターの切札：真価",
    "fr": "Atout : Sérénité"
  },
  "100278": {
    "en": "Specialty: Reflect",
    "de": "Ass des Spezialisten: Einkehr",
    "ja": "マイスターの切札：真価",
    "fr": "Atout : Sérénité"
  },
  "100279": {
    "en": "Specialty: Reflect",
    "de": "Ass des Spezialisten: Einkehr",
    "ja": "マイスターの切札：真価",
    "fr": "Atout : Sérénité"
  },
  "100280": {
    "en": "Specialty: Reflect",
    "de": "Ass des Spezialisten: Einkehr",
    "ja": "マイスターの切札：真価",
    "fr": "Atout : Sérénité"
  },
  "100281": {
    "en": "Specialty: Reflect",
    "de": "Ass des Spezialisten: Einkehr",
    "ja": "マイスターの切札：真価",
    "fr": "Atout : Sérénité"
  },
  "100282": {
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
  "100284": {
    "en": "Trained Eye",
    "de": "Flinke Hand",
    "ja": "匠の早業",
    "fr": "Main preste"
  },
  "100285": {
    "en": "Trained Eye",
    "de": "Flinke Hand",
    "ja": "匠の早業",
    "fr": "Main preste"
  },
  "100286": {
    "en": "Trained Eye",
    "de": "Flinke Hand",
    "ja": "匠の早業",
    "fr": "Main preste"
  },
  "100287": {
    "en": "Trained Eye",
    "de": "Flinke Hand",
    "ja": "匠の早業",
    "fr": "Main preste"
  },
  "100288": {
    "en": "Trained Eye",
    "de": "Flinke Hand",
    "ja": "匠の早業",
    "fr": "Main preste"
  },
  "100289": {
    "en": "Trained Eye",
    "de": "Flinke Hand",
    "ja": "匠の早業",
    "fr": "Main preste"
  },
  "100290": {
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
  "100292": {
    "en": "Trained Instinct",
    "de": "Kräftige Hand",
    "ja": "匠の荒業",
    "fr": "Main expéditive"
  },
  "100293": {
    "en": "Trained Instinct",
    "de": "Kräftige Hand",
    "ja": "匠の荒業",
    "fr": "Main expéditive"
  },
  "100294": {
    "en": "Trained Instinct",
    "de": "Kräftige Hand",
    "ja": "匠の荒業",
    "fr": "Main expéditive"
  },
  "100295": {
    "en": "Trained Instinct",
    "de": "Kräftige Hand",
    "ja": "匠の荒業",
    "fr": "Main expéditive"
  },
  "100296": {
    "en": "Trained Instinct",
    "de": "Kräftige Hand",
    "ja": "匠の荒業",
    "fr": "Main expéditive"
  },
  "100297": {
    "en": "Trained Instinct",
    "de": "Kräftige Hand",
    "ja": "匠の荒業",
    "fr": "Main expéditive"
  },
  "100298": {
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
  "100300": {
    "en": "Preparatory Touch",
    "de": "Basisveredelung",
    "ja": "下地加工",
    "fr": "Ouvrage préparatoire"
  },
  "100301": {
    "en": "Preparatory Touch",
    "de": "Basisveredelung",
    "ja": "下地加工",
    "fr": "Ouvrage préparatoire"
  },
  "100302": {
    "en": "Preparatory Touch",
    "de": "Basisveredelung",
    "ja": "下地加工",
    "fr": "Ouvrage préparatoire"
  },
  "100303": {
    "en": "Preparatory Touch",
    "de": "Basisveredelung",
    "ja": "下地加工",
    "fr": "Ouvrage préparatoire"
  },
  "100304": {
    "en": "Preparatory Touch",
    "de": "Basisveredelung",
    "ja": "下地加工",
    "fr": "Ouvrage préparatoire"
  },
  "100305": {
    "en": "Preparatory Touch",
    "de": "Basisveredelung",
    "ja": "下地加工",
    "fr": "Ouvrage préparatoire"
  },
  "100306": {
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
  "100308": {
    "en": "Rapid Synthesis III",
    "de": "Schnelle Bearbeitung III",
    "ja": "突貫作業III",
    "fr": "Travail rapide III"
  },
  "100309": {
    "en": "Rapid Synthesis III",
    "de": "Schnelle Bearbeitung III",
    "ja": "突貫作業III",
    "fr": "Travail rapide III"
  },
  "100310": {
    "en": "Rapid Synthesis III",
    "de": "Schnelle Bearbeitung III",
    "ja": "突貫作業III",
    "fr": "Travail rapide III"
  },
  "100311": {
    "en": "Rapid Synthesis III",
    "de": "Schnelle Bearbeitung III",
    "ja": "突貫作業III",
    "fr": "Travail rapide III"
  },
  "100312": {
    "en": "Rapid Synthesis III",
    "de": "Schnelle Bearbeitung III",
    "ja": "突貫作業III",
    "fr": "Travail rapide III"
  },
  "100313": {
    "en": "Rapid Synthesis III",
    "de": "Schnelle Bearbeitung III",
    "ja": "突貫作業III",
    "fr": "Travail rapide III"
  },
  "100314": {
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
  "100316": {
    "en": "Intensive Synthesis",
    "de": "Fokussierte Bearbeitung",
    "ja": "集中作業",
    "fr": "Travail vigilant"
  },
  "100317": {
    "en": "Intensive Synthesis",
    "de": "Fokussierte Bearbeitung",
    "ja": "集中作業",
    "fr": "Travail vigilant"
  },
  "100318": {
    "en": "Intensive Synthesis",
    "de": "Fokussierte Bearbeitung",
    "ja": "集中作業",
    "fr": "Travail vigilant"
  },
  "100319": {
    "en": "Intensive Synthesis",
    "de": "Fokussierte Bearbeitung",
    "ja": "集中作業",
    "fr": "Travail vigilant"
  },
  "100320": {
    "en": "Intensive Synthesis",
    "de": "Fokussierte Bearbeitung",
    "ja": "集中作業",
    "fr": "Travail vigilant"
  },
  "100321": {
    "en": "Intensive Synthesis",
    "de": "Fokussierte Bearbeitung",
    "ja": "集中作業",
    "fr": "Travail vigilant"
  },
  "100322": {
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
  "100324": {
    "en": "Delicate Synthesis",
    "de": "Akribische Bearbeitung",
    "ja": "精密作業",
    "fr": "Travail minutieux"
  },
  "100325": {
    "en": "Delicate Synthesis",
    "de": "Akribische Bearbeitung",
    "ja": "精密作業",
    "fr": "Travail minutieux"
  },
  "100326": {
    "en": "Delicate Synthesis",
    "de": "Akribische Bearbeitung",
    "ja": "精密作業",
    "fr": "Travail minutieux"
  },
  "100327": {
    "en": "Delicate Synthesis",
    "de": "Akribische Bearbeitung",
    "ja": "精密作業",
    "fr": "Travail minutieux"
  },
  "100328": {
    "en": "Delicate Synthesis",
    "de": "Akribische Bearbeitung",
    "ja": "精密作業",
    "fr": "Travail minutieux"
  },
  "100329": {
    "en": "Delicate Synthesis",
    "de": "Akribische Bearbeitung",
    "ja": "精密作業",
    "fr": "Travail minutieux"
  },
  "100330": {
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
  "100332": {
    "en": "Brand of the Elements",
    "de": "Zeichen der Elemente",
    "ja": "ブランド・オブ・エレメンタル",
    "fr": "Marque des éléments"
  },
  "100333": {
    "en": "Brand of the Elements",
    "de": "Zeichen der Elemente",
    "ja": "ブランド・オブ・エレメンタル",
    "fr": "Marque des éléments"
  },
  "100334": {
    "en": "Brand of the Elements",
    "de": "Zeichen der Elemente",
    "ja": "ブランド・オブ・エレメンタル",
    "fr": "Marque des éléments"
  },
  "100335": {
    "en": "Brand of the Elements",
    "de": "Zeichen der Elemente",
    "ja": "ブランド・オブ・エレメンタル",
    "fr": "Marque des éléments"
  },
  "100336": {
    "en": "Brand of the Elements",
    "de": "Zeichen der Elemente",
    "ja": "ブランド・オブ・エレメンタル",
    "fr": "Marque des éléments"
  },
  "100337": {
    "en": "Brand of the Elements",
    "de": "Zeichen der Elemente",
    "ja": "ブランド・オブ・エレメンタル",
    "fr": "Marque des éléments"
  },
  "100338": {
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
  "100340": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },
  "100341": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },
  "100342": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },
  "100343": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },
  "100344": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },
  "100345": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },
  "100346": {
    "en": "Byregot's Blessing",
    "de": "Byregots Benediktion",
    "ja": "ビエルゴの祝福",
    "fr": "Bénédiction de Byregot"
  },
  "100347": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100348": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100349": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100350": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100351": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100352": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100353": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100354": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100355": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100356": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100357": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100358": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100359": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  },
  "100360": {
    "en": "",
    "de": "",
    "ja": "",
    "fr": ""
  }
}
export interface ActionNames {
  [key: string]: {
    [key: string]: string
  }
}
export default actionNames as ActionNames;
