// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('Service Worker registered');
    }).catch(err => {
      console.log('Service Worker registration failed: ', err);
    });
  });
}

// Global i18n Dictionary
const translations = {
  ua: {
    nav_about: "Про систему",
    nav_benefits: "Характеристики",
    nav_medical: "Медицина",
    nav_media: "Відео",
    nav_training: "Тренування",
    
    hero_title: 'АНАТОМІЧНЕ <span class="text-tactical-olive">РОЗВАНТАЖЕННЯ</span> ДЛЯ ЗАХИСНИКІВ',
    hero_desc: 'Революційна запатентована тактична система, яка повністю переносить <span class="text-white font-bold">100% ваги бронезахисту</span> та рюкзака з плечового пояса на кістки таза, зберігаючи здоров\'я хребта.',
    hero_btn_more: 'Дізнатися більше',
    hero_btn_specs: 'Характеристики',
    
    prob_title: 'Критична проблема екіпірування',
    prob_quote: '"Постійне носіння бойової амуніції вагою понад 25-40 кг неминуче руйнує опорно-руховий апарат військовослужбовців."',
    prob_desc_1: 'Хронічний біль у спині, компресійні ураження хребта, швидке стомлення м\'язів та затискання нервів суттєво знижують боєздатність підрозділів. Штурмові жилети та плитоноски тиснуть на плечовий пояс, перетискаючи судини та викликаючи осьове стиснення міжхребцевих дисків.',
    prob_desc_2: 'Звичайні розвантажувальні системи (РПС) лише трохи перерозподіляють вагу, але не усувають компресійну силу тяжіння на хребет. Система <span class="text-white font-bold">РПС Євмінова</span> кардинально змінює фізику навантаження.',
    diagram_01_title: 'Анатомічна схема розподілу навантаження',
    
    svg_1_header: 'DIAGRAM_01: SPINE_UNLOADING',
    svg_1_compression: 'КОМПРЕСІЯ',
    svg_1_weight_label: 'Вага плитоноски',
    svg_1_weight_sub: 'тисне на плечі',
    svg_1_rail_label: 'Байпасна рельса',
    svg_1_rail_sub: 'переносить силу в обхід хребта',
    svg_1_lumbar_label: 'Поперек розвантажено',
    svg_1_lumbar_sub: 'і фізіологічні вигини збережено',
    svg_1_pelvis_label: 'Клубові кістки таза',
    svg_1_pelvis_sub: 'приймають 100% ваги спорядження',
    
    specs_title: 'Технічні інновації та переваги',
    spec_1_title: 'Сумісність',
    spec_1_desc: 'Повна адаптація під будь-які стандартні плитоноски та бойові пояси (варбелти). Не потребує зміни штатної амуніції бійця.',
    spec_2_title: 'Шарнір 360°',
    spec_2_desc: 'Кріплення «Кукумбер» до направляючої рельси забезпечує повне обертання та свободу нахилів і поворотів корпусу без обмежень.',
    spec_3_title: 'Швидкоскид',
    spec_3_desc: 'Повністю збережена робота штатної системи екстреного скидання бронежилета. Система від\'єднується миттєво в один рух.',
    spec_4_title: 'Доступність',
    spec_4_desc: 'Вартість системи — <span class="text-tactical-accent font-bold">14 000 грн</span>. У рази дешевше іноземних екзоскелетних аналогів за значно вищої міцності.',
    
    diagram_02_title: 'Схема інтеграції та механічного кріплення',
    svg_2_header: 'DIAGRAM_02: MECHANICAL_INTERFACE',
    svg_2_pc: 'ШТАТНА ПЛИТОНОСКА',
    svg_2_belt: 'ТАКТИЧНИЙ ВАРБЕЛТ (ПОЯС)',
    svg_2_mount_label: 'Вузол кріплення',
    svg_2_mount_sub1: 'надійно фіксує конструкцію',
    svg_2_mount_sub2: 'до строп MOLLE плитоноски',
    svg_2_rail_label: 'Направляюча рельса',
    svg_2_rail_sub1: 'телескопічний стрижень',
    svg_2_rail_sub2: 'забезпечує міцну опору ваги',
    svg_2_joint_label: 'Шарнір «Кукумбер»',
    svg_2_joint_sub1: 'захищає хребет під час нахилів',
    svg_2_joint_sub2: 'та обертання таза на 360°',
    svg_2_belt_label: 'Базовий варбелт',
    svg_2_belt_sub1: 'приймає вагу і рівномірно',
    svg_2_belt_sub2: 'розподіляє її по колу таза',
    
    specs_header_side: 'Технічні Специфікації',
    spec_bullet_1: '<strong>Вага системи:</strong> всього <span class="text-tactical-accent font-bold">950 грамів</span>. Жодного зайвого навантаження за рахунок використання аерокосмічних сплавів Д16Т.',
    spec_bullet_2: '<strong>Матеріали:</strong> анодований алюміній підвищеної в\'язкості, балістичний пластик та високоміцна оригінальна тканина Cordura 1000D з IRR-просоченням.',
    spec_bullet_3: '<strong>Ергономіка:</strong> плавне регулювання висоти рельси під зріст бійця від 165 до 200 см за лічені хвилини.',
    spec_bullet_4: '<strong>Надійність:</strong> металевий каркас витримує статичне та динамічне навантаження до 120 кг, захищаючи хребці навіть під час десантування чи падіння на спину.',
    
    med_title: 'Медичне обґрунтування системи',
    med_subtitle: 'Анатомічні ефекти розвантаження РПС Євмінова:',
    med_arg_1_title: 'Розвантаження поперекового лордозу та грудного кіфозу',
    med_arg_1_desc: 'Система бере на себе роль додаткового опорного стовпа, запобігаючи деформації та підтримуючи природні вигини хребта під великим навантаженням.',
    med_arg_2_title: 'Повне перенесення осьової ваги з плечей на таз',
    med_arg_2_desc: 'Вся вертикальна маса плитоноски і рюкзака через рельсу та шарнір «Кукумбер» передається безпосередньо на міцні клубові кістки таза, які є природною силовою опорою скелета людини.',
    med_arg_3_title: 'Надійна профілактика протрузій та гриж',
    med_arg_3_desc: 'Усунення осьового компресійного тиску зупиняє процес сплющування та стирання міжхребцевих дисків. Це запобігає защемленню нервових корінців і виникненню радикуліту або гриж у бойових умовах.',
    med_arg_4_title: 'Відновлення природного бойового дихання',
    med_arg_4_desc: 'Звільнення плечового пояса та грудної клітки від тиску ременів бронежилета дозволяє бійцю дихати на повні груди. Це нормалізує надходження кисню (сатурацію), знижує пульс та запобігає задишці при інтенсивних штурмових діях.',
    
    med_exp_1_title: 'Микола Поліщук',
    med_exp_1_sub: 'Нейрохірург, професор, екс-міністр охорони здоров\'я України',
    med_exp_1_desc: '"Система повністю компенсує дегенеративні та травматичні чинники носіння важкого бойового спорядження. Вона повертає природну біомеханіку, убезпечує спинний мозок і зберігає нейром\'язову стабільність. Рекомендована до масштабного впровадження у Збройних Силах України."',
    med_exp_2_title: 'В\'ячеслав Євмінов',
    med_exp_2_sub: 'Президент ПП «Центр Євмінова», розробник ортопедичної методики',
    med_exp_2_desc: '"Тактичний розвантажувальний корсет працює за принципами нашої науково доведеної системи профілактики хребта. Ми провели понад 150 випробувань у реальних бойових підрозділах сил оборони — бійці підтверджують повне усунення втоми спини навіть після доби носіння амуніції."',
    
    train_title: 'Тренувальний хаб відновлення',
    train_subtitle: 'Профілактор Євмінова (Базові тракційні вправи)',
    train_angle_label: 'Оберіть кут нахилу профілактора (°)',
    train_timer_start: 'Старт',
    train_timer_pause: 'Пауза',
    train_timer_next: 'Почати вправу',
    train_timer_next_set: 'Почати підхід',
    train_timer_reset: 'Скинути',
    train_sets_label: 'Виконано підходів',
    train_angle_current: 'Кут нахилу',
    train_prog_power_title: 'Силова програма',
    train_prog_power_desc: 'Для зміцнення м\'язового корсета',
    train_prog_rehab_title: 'Програма реабілітації',
    train_prog_rehab_desc: 'Для відновлення після навантажень',
    
    media_title: 'Презентація та польові тести',
    media_subtitle: 'Ознайомтесь із реальними випробуваннями системи РПС Євмінова силами оборони України та репортажами військових експертів.',
    media_current_video: 'ПОТОЧНЕ ВІДЕО',
    media_playlist_label: 'Оберіть відеоматеріал:',
    media_item_1_title: 'Репортаж КИЇВ24',
    media_item_1_sub: 'Огляд Сюжету • 4:26',
    media_item_2_title: 'Мобільність 360°',
    media_item_2_sub: 'YouTube Shorts • 0:59',
    media_item_3_title: 'Технічний огляд',
    media_item_3_sub: 'Інструкція та збірка • 8:12',
    media_item_4_title: 'Польові тести ЗСУ',
    media_item_4_sub: 'Випробування • 5:45',
    
    footer_desc: 'Ми створюємо інструменти для тих, хто тримає небо на своїх плечах. Здоров\'я хребта — це збереження боєздатності нації та наближення нашої Перемоги.',
    footer_contacts: 'Контакти',
    footer_address: '📍 ПП «Центр Євмінова», м. Київ, вул. Костьольна, 9',
    footer_army: 'Армія та Здоров\'я',
    footer_slogan: 'Слава Україні! Героям Слава!',
    footer_copy: '© 2026 РПС ЄВМІНОВА. АНАТОМІЧНІ ТАКТИЧНІ СИСТЕМИ.'
  },
  en: {
    nav_about: "About System",
    nav_benefits: "Specs",
    nav_medical: "Medicine",
    nav_media: "Videos",
    nav_training: "Training",
    
    hero_title: 'ANATOMICAL <span class="text-tactical-olive">UNLOADING</span> FOR DEFENDERS',
    hero_desc: 'A revolutionary patented tactical system that completely transfers <span class="text-white font-bold">100% of armor weight</span> and backpack from the shoulder girdle to the pelvic bones, preserving spinal health.',
    hero_btn_more: 'Learn More',
    hero_btn_specs: 'Specifications',
    
    prob_title: 'Critical Equipment Problem',
    prob_quote: '"Constant carrying of combat equipment weighing over 25-40 kg inevitably destroys the musculoskeletal system of service members."',
    prob_desc_1: 'Chronic back pain, compression spine damage, rapid muscle fatigue, and pinched nerves significantly reduce unit combat readiness. Assault vests and plate carriers press on the shoulder girdle, compressing blood vessels and causing axial compression of intervertebral discs.',
    prob_desc_2: 'Standard load-bearing vests (RPS) only slightly redistribute weight but do not eliminate the compressive gravity on the spine. The <span class="text-white font-bold">Evminov RPS</span> system fundamentally changes the physics of load distribution.',
    diagram_01_title: 'Anatomical Load Distribution Schematic',
    
    svg_1_header: 'DIAGRAM_01: SPINE_UNLOADING',
    svg_1_compression: 'COMPRESSION',
    svg_1_weight_label: 'Armor weight',
    svg_1_weight_sub: 'presses shoulders',
    svg_1_rail_label: 'Bypass rail',
    svg_1_rail_sub: 'carries force around spine',
    svg_1_lumbar_label: 'Lumbar is unloaded',
    svg_1_lumbar_sub: 'natural curves preserved',
    svg_1_pelvis_label: 'Iliac pelvic bones',
    svg_1_pelvis_sub: 'absorb 100% of gear weight',
    
    specs_title: 'Technical Innovations & Benefits',
    spec_1_title: 'Compatibility',
    spec_1_desc: 'Full adaptation to any standard plate carriers and battle belts (warbelts). No modification of standard soldier equipment required.',
    spec_2_title: '360° Joint',
    spec_2_desc: 'The "Cucumber" joint attachment to the guide rail provides full rotation and absolute freedom of body tilts and turns without limit.',
    spec_3_title: 'Quick Release',
    spec_3_desc: 'Full functionality of the standard emergency plate carrier release system is completely preserved. The system detaches instantly in one move.',
    spec_4_title: 'Affordability',
    spec_4_desc: 'System cost is — <span class="text-tactical-accent font-bold">14 000 UAH</span>. Multiples cheaper than foreign exoskeleton analogues with significantly higher durability.',
    
    diagram_02_title: 'Integration and Mechanical Mount Scheme',
    svg_2_header: 'DIAGRAM_02: MECHANICAL_INTERFACE',
    svg_2_pc: 'STANDARD PLATE CARRIER',
    svg_2_belt: 'TACTICAL WARBELT (BELT)',
    svg_2_mount_label: 'Mount bracket',
    svg_2_mount_sub1: 'securely connects system',
    svg_2_mount_sub2: 'to plate carrier MOLLE webbing',
    svg_2_rail_label: 'Support guide rail',
    svg_2_rail_sub1: 'telescopic metal rod',
    svg_2_rail_sub2: 'transfers gear weight load',
    svg_2_joint_label: '«Cucumber» joint',
    svg_2_joint_sub1: 'protects spine during tilts',
    svg_2_joint_sub2: 'with full 360° pelvic articulation',
    svg_2_belt_label: 'Padded warbelt',
    svg_2_belt_sub1: 'takes the load and evenly',
    svg_2_belt_sub2: 'distributes it around hips',
    
    specs_header_side: 'Technical Specifications',
    spec_bullet_1: '<strong>System weight:</strong> only <span class="text-tactical-accent font-bold">950 grams</span>. Zero extra strain due to high-strength aerospace D16T alloys.',
    spec_bullet_2: '<strong>Materials:</strong> high-viscosity anodized aluminum, ballistic polymer, and genuine Cordura 1000D fabric with IRR treatment.',
    spec_bullet_3: '<strong>Ergonomics:</strong> smooth rail length adjustment to fit soldiers from 165 to 200 cm in height in less than 3 minutes.',
    spec_bullet_4: '<strong>Reliability:</strong> robust frame holds static & dynamic load up to 120 kg, protecting vertebrae even during drops or falling.',
    
    med_title: 'Medical Justification',
    med_subtitle: 'Anatomical Effects of Evminov RPS Unloading:',
    med_arg_1_title: 'Lumbar Lordosis & Thoracic Kyphosis Unloading',
    med_arg_1_desc: 'The system acts as a supportive external column, preventing spinal deformation and preserving natural physiological curvatures under weight.',
    med_arg_2_title: 'Complete axial load transfer to the pelvis',
    med_arg_2_desc: 'All vertical load of the armor and assault pack passes through the rail and "Cucumber" joint directly to the pelvis iliac bones, which are natural structural load receptors.',
    med_arg_3_title: 'Reliable Protrusion & Hernia Prevention',
    med_arg_3_desc: 'Removing vertical compression stops intervertebral disc degeneration. This prevents nerve root impingement, back spasms, or hernias in combat.',
    med_arg_4_title: 'Restoration of Natural Combat Respiration',
    med_arg_4_desc: 'Freeing the chest and shoulders from heavy plate carrier straps allows the soldier to take full deep breaths. This normalizes blood oxygen (saturation), lowers pulse rate, and avoids fatigue.',
    
    med_exp_1_title: 'Mykola Polishchuk',
    med_exp_1_sub: 'Neurosurgeon, Professor, former Minister of Health of Ukraine',
    med_exp_1_desc: '"The system completely offsets the degenerative and traumatic loads of carrying heavy combat loadouts. It restores natural biomechanics, secures the spinal cord, and preserves neuromuscular stability. Highly recommended for deployment in the Armed Forces of Ukraine."',
    med_exp_2_title: 'Vyacheslav Evminov',
    med_exp_2_sub: 'President of the "Evminov Center", author of the orthopedic spine care method',
    med_exp_2_desc: '"Our tactical unloading support frame applies the proven principles of our orthopedic method. We executed over 150 live tactical trials in active units — defenders report total absence of lumbar fatigue even after 24 hours of combat operations."',
    
    train_title: 'Recovery Training Hub',
    train_subtitle: 'Evminov Board (Basic traction routines)',
    train_angle_label: 'Select profilactor angle (°)',
    train_timer_start: 'Start',
    train_timer_pause: 'Pause',
    train_timer_next: 'Begin exercise',
    train_timer_next_set: 'Begin set',
    train_timer_reset: 'Reset',
    train_sets_label: 'Sets completed',
    train_angle_current: 'Tilt angle',
    train_prog_power_title: 'Power Program',
    train_prog_power_desc: 'To strengthen the muscular core',
    train_prog_rehab_title: 'Rehab Program',
    train_prog_rehab_desc: 'For restoration after combat duty',
    
    media_title: 'Presentations & Field Trials',
    media_subtitle: 'Watch active field trials of the Evminov RPS by the Ukrainian Defense Forces and reviews by military experts.',
    media_current_video: 'CURRENT VIDEO',
    media_playlist_label: 'Select video material:',
    media_item_1_title: 'Kyiv24 Report',
    media_item_1_sub: 'TV News Story • 4:26',
    media_item_2_title: '360° Mobility',
    media_item_2_sub: 'YouTube Shorts • 0:59',
    media_item_3_title: 'Technical Review',
    media_item_3_sub: 'Assembly Manual • 8:12',
    media_item_4_title: 'Field Tests',
    media_item_4_sub: 'Combat Trials • 5:45',
    
    footer_desc: 'We build gear for those who hold the sky on their shoulders. Spine health is preserving the nation\'s fighting capacity and bringing our Victory closer.',
    footer_contacts: 'Contacts',
    footer_address: '📍 PE "Evminov Center", Kyiv, Kostolna str. 9',
    footer_army: 'Army & Health',
    footer_slogan: 'Glory to Ukraine! Glory to the Heroes!',
    footer_copy: '© 2026 EVMINOV RPS. ANATOMICAL TACTICAL SYSTEMS.'
  },
  pl: {
    nav_about: "O systemie",
    nav_benefits: "Specyfikacja",
    nav_medical: "Medycyna",
    nav_media: "Wideo",
    nav_training: "Trening",
    
    hero_title: 'ANATOMICZNE <span class="text-tactical-olive">ODCIĄŻENIE</span> DLA OBROŃCÓW',
    hero_desc: 'Rewolucyjny, opatentowany system taktyczny, który całkowicie przenosi <span class="text-white font-bold">100% wagi pancerza</span> i plecaka z obręczy barkowej na kości miednicy, chroniąc kręgosłup.',
    hero_btn_more: 'Dowiedz się więcej',
    hero_btn_specs: 'Specyfikacja',
    
    prob_title: 'Krytyczny problem z ekwipunkiem',
    prob_quote: '"Stałe noszenie wyposażenia bojowego o wadze ponad 25-40 kg nieuchronnie niszczy układ ruchu żołnierzy."',
    prob_desc_1: 'Przewlekły ból pleców, kompresyjne uszkodzenia kręgosłupa, szybkie zmęczenie mięśni i ucisk nerwów drastycznie obniżają sprawność bojową. Kamizelki balistyczne uciskają obręcz barkową, upośledzając krążenie i powodując osiowy ucisk dysków.',
    prob_desc_2: 'Standardowe szelki (RPS) jedynie rozkładają masę na ramiona, lecz nie usuwają siły ucisku osiowego grawitacji na kręgosłup. System <span class="text-white font-bold">RPS Ewminowa</span> całkowicie zmienia fizykę obciążeń.',
    diagram_01_title: 'Anatomiczny schemat rozkładu obciążeń',
    
    svg_1_header: 'DIAGRAM_01: SPINE_UNLOADING',
    svg_1_compression: 'UCISK',
    svg_1_weight_label: 'Waga pancerza',
    svg_1_weight_sub: 'naciska na barki',
    svg_1_rail_label: 'Szyna omijająca',
    svg_1_rail_sub: 'przenosi siłę obok kręgosłupa',
    svg_1_lumbar_label: 'Lędźwie odciążone',
    svg_1_lumbar_sub: 'krzywizny fizjologiczne zachowane',
    svg_1_pelvis_label: 'Kości biodrowe miednicy',
    svg_1_pelvis_sub: 'przyjmują 100% masy oporządzenia',
    
    specs_title: 'Innowacje techniczne i zalety',
    spec_1_title: 'Kompatybilność',
    spec_1_desc: 'Pełna integracja z dowolnymi standardowymi kamizelkami kuloodpornymi i pasami taktycznymi (warbelt). Nie wymaga zmiany ekwipunku.',
    spec_2_title: 'Zawias 360°',
    spec_2_desc: 'Łącznik „Cucumber” połączony z szyną zapewnia pełną mobilność oraz absolutną swobodę skłonów i skrętów tułowia bez ograniczeń.',
    spec_3_title: 'Zrzut awaryjny',
    spec_3_desc: 'Pełna kompatybilność z fabrycznym systemem szybkiego zrzucania kamizelki. System rozpina się błyskawicznie jednym pociągnięciem.',
    spec_4_title: 'Dostępność',
    spec_4_desc: 'Koszt systemu wynosi — <span class="text-tactical-accent font-bold">14 000 UAH</span>. Wielokrotnie tańszy od zagranicznych egzoszkieletów przy znacznie większej wytrzymałości.',
    
    diagram_02_title: 'Schemat integracji i montażu mechanicznego',
    svg_2_header: 'DIAGRAM_02: MECHANICAL_INTERFACE',
    svg_2_pc: 'STANDARDOWA KAMIZELKA',
    svg_2_belt: 'PAS TAKTYCZNY (WARBELT)',
    svg_2_mount_label: 'Uchwyt mocujący',
    svg_2_mount_sub1: 'bezpiecznie scala konstrukcję',
    svg_2_mount_sub2: 'z taśmami MOLLE kamizelki',
    svg_2_rail_label: 'Szyna wspierająca',
    svg_2_rail_sub1: 'teleskopowy rdzeń metalowy',
    svg_2_rail_sub2: 'przenosi obciążenie oporządzenia',
    svg_2_joint_label: 'Łącznik «Cucumber»',
    svg_2_joint_sub1: 'chroni kręgosłup przy skłonach',
    svg_2_joint_sub2: 'zapewniając pełną ruchomość 360°',
    svg_2_belt_label: 'Pas biodrowy',
    svg_2_belt_sub1: 'absorbuje wagę i równomiernie',
    svg_2_belt_sub2: 'rozprowadza ją wokół bioder',
    
    specs_header_side: 'Specyfikacje Techniczne',
    spec_bullet_1: '<strong>Waga systemu:</strong> tylko <span class="text-tactical-accent font-bold">950 gramów</span>. Zero dodatkowego obciążenia dzięki lotniczym stopom aluminium D16T.',
    spec_bullet_2: '<strong>Materiały:</strong> anodowane aluminium o wysokiej udarności, tworzywa balistyczne, oryginalna Cordura 1000D z wykończeniem IRR.',
    spec_bullet_3: '<strong>Ergonomia:</strong> płynna regulacja szyny dopasowuje konstrukcję do wzrostu żołnierza (od 165 do 200 cm) w 3 minuty.',
    spec_bullet_4: '<strong>Niezawodność:</strong> rama wytrzymuje obciążenia statyczne/dynamiczne do 120 kg, chroniąc kręgi przy upadkach na plecy.',
    
    med_title: 'Uzasadnienie Medyczne',
    med_subtitle: 'Efekty anatomiczne odciążenia kręgosłupa przez RPS Ewminowa:',
    med_arg_1_title: 'Odciążenie lordozy lędźwiowej i kifozy piersiowej',
    med_arg_1_desc: 'System działa jako zewnętrzna kolumna podporowa, zapobiegając deformacjom dysków i zachowując naturalną strukturę kręgosłupa.',
    med_arg_2_title: 'Całkowite przeniesienie obciążenia osiowego na miednicę',
    med_arg_2_desc: 'Pionowy nacisk kamizelki balistycznej przechodzi przez szynę i zawias «Cucumber» wprost na kości biodrowe, będące naturalną bazą nośną szkieletu.',
    med_arg_3_title: 'Skuteczna profilaktyka dyskopatii i przepuklin',
    med_arg_3_desc: 'Zniwelowanie ucisku osiowego powstrzymuje deformacje krążków międzykręgowych. Chroni to przed uciskiem na nerwy i rwą kulszową na misjach.',
    med_arg_4_title: 'Przywrócenie swobodnego oddechu w walce',
    med_arg_4_desc: 'Oswobodzenie klatki piersiowej od ciężkich szelek pozwala na pełny i głęboki oddech. Stabilizuje to poziom tlenu we krwi, obniża tętno i zapobiega zadyszce.',
    
    med_exp_1_title: 'Mykoła Poliszczuk',
    med_exp_1_sub: 'Neurochirurg, profesor, były Minister Zdrowia Ukrainy',
    med_exp_1_desc: '"System w pełni neutralizuje zwyrodnieniowe i urazowe przeciążenia wynikające z noszenia ciężkiego oporządzenia. Przywraca fizjologiczną biomechanikę i stabilność nerwowo-mięśniową. Rekomendowany do wdrożenia w Siłach Zbrojnych Ukrainy."',
    med_exp_2_title: 'Wiaczesław Ewminow',
    med_exp_2_sub: 'Prezes „Centrum Ewminowa”, twórca metodyki leczenia kręgosłupa',
    med_exp_2_desc: '"Nasz taktyczny gorset odciążający opiera się na medycznych zasadach profilaktyki kręgosłupa. Ponad 150 prób bojowych potwierdziło, że żołnierze nie odczuwają zmęczenia pleców nawet po dobowej służbie w pełnym rynsztunku."',
    
    train_title: 'Centrum Regeneracji',
    train_subtitle: 'Trenażer Ewminowa (Podstawowe ćwiczenia trakcyjne)',
    train_angle_label: 'Wybierz kąt nachylenia trenażera (°)',
    train_timer_start: 'Start',
    train_timer_pause: 'Pauza',
    train_timer_next: 'Rozpocznij',
    train_timer_next_set: 'Rozpocznij serię',
    train_timer_reset: 'Reset',
    train_sets_label: 'Wykonane serie',
    train_angle_current: 'Kąt nachylenia',
    train_prog_power_title: 'Program Siłowy',
    train_prog_power_desc: 'Do wzmocnienia gorsetu mięśniowego',
    train_prog_rehab_title: 'Program Rehabilitacji',
    train_prog_rehab_desc: 'Dla regeneracji po służbie bojowej',
    
    media_title: 'Prezentacje i Próby Polowe',
    media_subtitle: 'Zapoznaj się z testami bojowymi systemu RPS Ewminowa realizowanymi przez wojsko Ukrainy oraz opiniami ekspertów.',
    media_current_video: 'BIEŻĄCE WIDEO',
    media_playlist_label: 'Wybierz wideo:',
    media_item_1_title: 'Reportaż Kijów24',
    media_item_1_sub: 'Materiał TV • 4:26',
    media_item_2_title: 'Mobilność 360°',
    media_item_2_sub: 'YouTube Shorts • 0:59',
    media_item_3_title: 'Przegląd techniczny',
    media_item_3_sub: 'Instrukcja montażu • 8:12',
    media_item_4_title: 'Testy Polowe',
    media_item_4_sub: 'Próby poligonowe • 5:45',
    
    footer_desc: 'Tworzymy narzędzia dla tych, którzy trzymają niebo na swoich barkach. Zdrowie kręgosłupa to sprawność bojowa żołnierzy i przybliżenie naszego Zwycięstwa.',
    footer_contacts: 'Kontakty',
    footer_address: '📍 PP „Centrum Ewminowa”, Kijów, ul. Kościelna 9',
    footer_army: 'Wojsko i Zdrowie',
    footer_slogan: 'Chwała Ukrainie! Chwała Bohaterom!',
    footer_copy: '© 2026 RPS EWMINOWA. ANATOMICZNE SYSTEMY TAKTYCZNE.'
  },
  ru: {
    nav_about: "О системе",
    nav_benefits: "Характеристики",
    nav_medical: "Медицина",
    nav_media: "Видео",
    nav_training: "Тренировки",
    
    hero_title: 'АНАТОМИЧЕСКАЯ <span class="text-tactical-olive">РАЗГРУЗКА</span> ДЛЯ ЗАЩИТНИКОВ',
    hero_desc: 'Революционная запатентованная тактическая система, полностью переносящая <span class="text-white font-bold">100% веса бронежилета</span> и рюкзака с плечевого пояса на кости таза, сохраняя здоровье позвоночника.',
    hero_btn_more: 'Узнать больше',
    hero_btn_specs: 'Характеристики',
    
    prob_title: 'Критическая проблема экипировки',
    prob_quote: '"Постоянное ношение боевой амуниции весом более 25-40 кг неизбежно разрушает опорно-двигательный аппарат военнослужащих."',
    prob_desc_1: 'Хроническая боль в спине, компрессионные поражения позвоночника, быстрое утомление мышц и защемление нервов существенно снижают боеспособность подразделений. Штурмовые жилеты и плитоноски давят на плечевой пояс, пережимая сосуды и вызывая осевое сжатие межпозвоночных дисков.',
    prob_desc_2: 'Обычные разгрузочные системы (РПС) лишь немного перераспределяют вес, но не устраняют компрессионную силу тяжести на позвоночник. Система <span class="text-white font-bold">РПС Евминова</span> кардинально изменяет физику нагрузки.',
    diagram_01_title: 'Анатомическая схема распределения нагрузки',
    
    svg_1_header: 'DIAGRAM_01: SPINE_UNLOADING',
    svg_1_compression: 'КОМПРЕССИЯ',
    svg_1_weight_label: 'Вес плитоноски',
    svg_1_weight_sub: 'давит на плечи',
    svg_1_rail_label: 'Байпасный рельс',
    svg_1_rail_sub: 'переносит силу в обход позвоночника',
    svg_1_lumbar_label: 'Поясница разгружена',
    svg_1_lumbar_sub: 'и физиологические изгибы сохранены',
    svg_1_pelvis_label: 'Подвздошные кости таза',
    svg_1_pelvis_sub: 'принимают 100% веса снаряжения',
    
    specs_title: 'Технические инновации и преимущества',
    spec_1_title: 'Совместимость',
    spec_1_desc: 'Полная адаптация под любые стандартные плитоноски и боевые пояса (варбелты). Не требует изменения штатной амуниции бойца.',
    spec_2_title: 'Шарнир 360°',
    spec_2_desc: 'Крепление «Кукумбер» к направляющему рельсу обеспечивает полное вращение и свободу наклонов и поворотов корпуса без ограничений.',
    spec_3_title: 'Быстросброс',
    spec_3_desc: 'Полностью сохранена работа штатной системы экстренного сброса бронежилета. Система отсоединяется мгновенно в одно движение.',
    spec_4_title: 'Доступность',
    spec_4_desc: 'Стоимость системы — <span class="text-tactical-accent font-bold">14 000 грн</span>. В разы дешевле иностранных экзоскелетных аналогов при значительно более высокой прочности.',
    
    diagram_02_title: 'Схема интеграции и механического крепления',
    svg_2_header: 'DIAGRAM_02: MECHANICAL_INTERFACE',
    svg_2_pc: 'ШТАТНАЯ ПЛИТОНОСКА',
    svg_2_belt: 'ТАКТИЧЕСКИЙ ВАРБЕЛТ (ПОЯС)',
    svg_2_mount_label: 'Узел крепления',
    svg_2_mount_sub1: 'надежно фиксирует конструкцию',
    svg_2_mount_sub2: 'к стропам MOLLE плитоноски',
    svg_2_rail_label: 'Направляющий рельс',
    svg_2_rail_sub1: 'телескопический стержень',
    svg_2_rail_sub2: 'обеспечивает прочную опору веса',
    svg_2_joint_label: 'Шарнир «Кукумбер»',
    svg_2_joint_sub1: 'защищает позвоночник при наклонах',
    svg_2_joint_sub2: 'и вращении таза на 360°',
    svg_2_belt_label: 'Базовый варбелт',
    svg_2_belt_sub1: 'принимает вес и равномерно',
    svg_2_belt_sub2: 'распределяет его по кругу таза',
    
    specs_header_side: 'Технические Спецификации',
    spec_bullet_1: '<strong>Вес системы:</strong> всего <span class="text-tactical-accent font-bold">950 грамм</span>. Никакой лишней нагрузки за счет использования аэрокосмических сплавов Д16Т.',
    spec_bullet_2: '<strong>Материалы:</strong> анодированный алюминий повышенной вязкости, баллистический пластик и высокопрочная оригинальная ткань Cordura 1000D с IRR-пропиткой.',
    spec_bullet_3: '<strong>Эргономика:</strong> плавная регулировка высоты рельса под рост бойца от 165 до 200 см за считанные минуты.',
    spec_bullet_4: '<strong>Надежность:</strong> металлический каркас выдерживает статическую и динамическую нагрузку до 120 кг, защищая позвонки даже во время десантирования или падения на спину.',
    
    med_title: 'Медицинское обоснование',
    med_subtitle: 'Анатомические эффекты разгрузки РПС Евминова:',
    med_arg_1_title: 'Разгрузка поясничного лордоза и грудного кифоза',
    med_arg_1_desc: 'Система берет на себя роль дополнительного опорного столба, предотвращая деформацию и поддерживая естественные изгибы позвоночника под большой нагрузкой.',
    med_arg_2_title: 'Полный перенос осевого веса с плеч на таз',
    med_arg_2_desc: 'Вся вертикальная масса плитоноски и рюкзака через рельс и шарнир «Кукумбер» передается непосредственно на прочные подвздошные кости таза, являющиеся естественной силовой опорой скелета человека.',
    med_arg_3_title: 'Надежная профилактика протрузий и грыж',
    med_arg_3_desc: 'Устранение осевого компрессионного давления останавливает процесс сплющивания и истирания межпозвоночных дисков. Это предотвращает защемление нервных корешков и возникновение радикулита или грыж в боевых условиях.',
    med_arg_4_title: 'Восстановление естественного боевого дыхания',
    med_arg_4_desc: 'Освобождение плечевого пояса и грудной клетки от давления ремней бронежилета позволяет бойцу дышать полной грудью. Это нормализует поступление кислорода (сатурацию), снижает пульс и предотвращает одышку при интенсивных штурмовых действиях.',
    
    med_exp_1_title: 'Николай Полищук',
    med_exp_1_sub: 'Нейрохирург, профессор, экс-министр здравоохранения Украины',
    med_exp_1_desc: '"Система полностью компенсирует дегенеративные и травматические факторы ношения тяжелого боевого снаряжения. Она возвращает естественную биомеханику, обезопашивает спинной мозг и сохраняет нейромышечную стабильность. Рекомендована к масштабному внедрению в Вооруженных Силах Украины."',
    med_exp_2_title: 'Вячеслав Евминов',
    med_exp_2_sub: 'Президент ЧП «Центр Евминова», разработчик ортопедической методики',
    med_exp_2_desc: '"Тактический разгрузочный корсет работает по принципам нашей научно доказанной системы профилактики позвоночника. Мы провели более 150 испытаний в реальных боевых подразделениях сил обороны — бойцы подтверждают полное устранение усталости спины даже после суток ношения амуниции."',
    
    train_title: 'Восстановительный тренировочный хаб',
    train_subtitle: 'Профилактор Евминова (Базовые тракционные упражнения)',
    train_angle_label: 'Выберите угол наклона профилактора (°)',
    train_timer_start: 'Старт',
    train_timer_pause: 'Пауза',
    train_timer_next: 'Начать упражнение',
    train_timer_next_set: 'Начать подход',
    train_timer_reset: 'Сбросить',
    train_sets_label: 'Выполнено подходов',
    train_angle_current: 'Угол наклона',
    train_prog_power_title: 'Силовая программа',
    train_prog_power_desc: 'Для укрепления мышечного корсета',
    train_prog_rehab_title: 'Программа реабилитации',
    train_prog_rehab_desc: 'Для восстановления после нагрузок',
    
    media_title: 'Презентация и полевые тесты',
    media_subtitle: 'Ознакомьтесь с реальными испытаниями системы РПС Евминова силами обороны Украины и репортажами военных экспертов.',
    media_current_video: 'ТЕКУЩЕЕ ВИДЕО',
    media_playlist_label: 'Выберите видеоматериал:',
    media_item_1_title: 'Репортаж КИЕВ24',
    media_item_1_sub: 'Обзор Сюжета • 4:26',
    media_item_2_title: 'Мобильность 360°',
    media_item_2_sub: 'YouTube Shorts • 0:59',
    media_item_3_title: 'Технический обзор',
    media_item_3_sub: 'Инструкция и сборка • 8:12',
    media_item_4_title: 'Полевые тесты ВСУ',
    media_item_4_sub: 'Испытания • 5:45',
    
    footer_desc: 'Мы создаем инструменты для тех, кто держит небо на своих плечах. Здоровье позвоночника — это сохранение боеспособности нации и приближение нашей Победы.',
    footer_contacts: 'Контакты',
    footer_address: '📍 ЧП «Центр Евминова», г. Киев, ул. Костельная, 9',
    footer_army: 'Армия и Здоровье',
    footer_slogan: 'Слава Украине! Героям Слава!',
    footer_copy: '© 2026 РПС ЕВМИНОВА. АНАТОМИЧЕСКИЕ ТАКТИЧЕСКИЕ СИСТЕМЫ.'
  }
};

const localizedPrograms = {
  ua: {
    power: [
      { name: 'Силове витягування', desc: 'Максимальне зміцнення глибоких м\'язів корсета' },
      { name: 'Скручування', desc: 'Робота з косими м\'язами живота' },
      { name: 'Статика', desc: 'Утримання статичної позиції під кутом' }
    ],
    rehab: [
      { name: 'Напіввиси', desc: 'Розслаблення м\'язів спини та м\'яке витягування хребта' },
      { name: 'Плавні повороти', desc: 'Відновлення природної рухливості хребців' },
      { name: 'Дихальна вправа', desc: 'Синхронізація дихання з розвантажувальною розтяжкою' }
    ]
  },
  en: {
    power: [
      { name: 'Power Traction', desc: 'Maximum strengthening of the deep core muscles' },
      { name: 'Twists', desc: 'Work with the oblique abdominal muscles' },
      { name: 'Statics', desc: 'Holding static position under an angle' }
    ],
    rehab: [
      { name: 'Half-hangs', desc: 'Relaxation of back muscles and gentle spine traction' },
      { name: 'Smooth turns', desc: 'Restoration of natural vertebral mobility' },
      { name: 'Breathing exercise', desc: 'Synchronization of breathing with unloading stretch' }
    ]
  },
  pl: {
    power: [
      { name: 'Trakcja siłowa', desc: 'Maksymalne wzmocnienie głębokich mięśni gorsetu' },
      { name: 'Skręty tułowia', desc: 'Praca z skośnymi mięśniami brzucha' },
      { name: 'Statyka', desc: 'Utrzymanie pozycji statycznej pod kątem' }
    ],
    rehab: [
      { name: 'Półzwisy', desc: 'Rozluźnienie mięśni pleców i łagodne rozciąganie kręgosłupa' },
      { name: 'Płynne skręty', desc: 'Przywrócenie naturalnej ruchomości kręgów' },
      { name: 'Ćwiczenia oddechowe', desc: 'Synchronizacja oddechu z rozciąganiem odciążającym' }
    ]
  },
  ru: {
    power: [
      { name: 'Силовое вытяжение', desc: 'Максимальное укрепление глубоких мышц корсета' },
      { name: 'Скручивания', desc: 'Работа с косыми мышцами живота' },
      { name: 'Статика', desc: 'Удержание статической позиции под углом' }
    ],
    rehab: [
      { name: 'Полувисы', desc: 'Расслабление мышц спины и мягкое вытяжение позвоночника' },
      { name: 'Плавные повороты', desc: 'Восстановление естественной подвижности позвонков' },
      { name: 'Дыхательное упражнение', desc: 'Синхронизация дыхания с разгрузочной растяжкой' }
    ]
  }
};

// State Variables
let currentLang = localStorage.getItem('rps_lang') || 'ua';
let timerInterval;
let timeLeft = 30;
let isRunning = false;
let currentSet = 0;
const totalSets = 4;
let currentProgram = 'rehab';
let exerciseIndex = 0;

// Language Switcher Logic
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('rps_lang', lang);
  
  // Translate all DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang] ? translations[lang][key] : null;
    if (translation !== undefined && translation !== null) {
      if (element.tagName.toLowerCase() === 'text' || element.namespaceURI === 'http://www.w3.org/2000/svg') {
        // SVG Text: strip HTML tags
        element.textContent = translation.replace(/<\/?[^>]+(>|$)/g, "");
      } else {
        element.innerHTML = translation;
      }
    }
  });
  
  // Update switcher buttons active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('text-tactical-accent', 'bg-tactical-olive/30');
    btn.classList.add('text-gray-400', 'hover:text-white');
  });
  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-gray-400', 'hover:text-white');
    activeBtn.classList.add('text-tactical-accent', 'bg-tactical-olive/30');
  }
  
  // Synchronize training components
  resetTimer();
  updateExerciseDisplay();
  
  // Synchronize active video texts
  updateVideoText();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer-display').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('set-count').textContent = `${currentSet}/${totalSets}`;
}

function updateExerciseDisplay() {
  const activeProgs = localizedPrograms[currentLang] || localizedPrograms['ua'];
  const exercise = activeProgs[currentProgram][exerciseIndex];
  if (exercise) {
    document.getElementById('exercise-name').textContent = exercise.name;
    document.getElementById('exercise-desc').textContent = exercise.desc;
  }
  
  // Translate timer button
  const btn = document.getElementById('timer-btn');
  if (btn) {
    if (isRunning) {
      btn.textContent = translations[currentLang]['train_timer_pause'] || 'Пауза';
    } else {
      if (currentSet === 0) {
        btn.textContent = translations[currentLang]['train_timer_start'] || 'Старт';
      } else {
        btn.textContent = translations[currentLang]['train_timer_next_set'] || 'Почати підхід';
      }
    }
  }
}

function toggleTimer() {
  const btn = document.getElementById('timer-btn');
  if (isRunning) {
    clearInterval(timerInterval);
    btn.textContent = translations[currentLang]['train_timer_start'] || 'Старт';
    btn.classList.replace('bg-red-600', 'bg-tactical-olive');
  } else {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        finishSet();
      }
    }, 1000);
    btn.textContent = translations[currentLang]['train_timer_pause'] || 'Пауза';
    btn.classList.replace('bg-tactical-olive', 'bg-red-600');
  }
  isRunning = !isRunning;
}

function finishSet() {
  clearInterval(timerInterval);
  isRunning = false;
  currentSet++;
  
  // Visual/Audio Feedback
  document.getElementById('timer-display').classList.add('text-green-500');
  setTimeout(() => document.getElementById('timer-display').classList.remove('text-green-500'), 2000);

  if (currentSet >= totalSets) {
    nextExercise();
  } else {
    timeLeft = 30;
    document.getElementById('timer-btn').textContent = translations[currentLang]['train_timer_next_set'] || 'Почати підхід';
  }
  updateDisplay();
}

function nextExercise() {
  currentSet = 0;
  timeLeft = 30;
  const activeProgs = localizedPrograms[currentLang] || localizedPrograms['ua'];
  exerciseIndex = (exerciseIndex + 1) % activeProgs[currentProgram].length;
  const exercise = activeProgs[currentProgram][exerciseIndex];
  
  document.getElementById('exercise-name').textContent = exercise.name;
  document.getElementById('exercise-desc').textContent = exercise.desc;
  document.getElementById('timer-btn').textContent = translations[currentLang]['train_timer_next'] || 'Почати вправу';
  updateDisplay();
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = 30;
  currentSet = 0;
  const btn = document.getElementById('timer-btn');
  if (btn) {
    btn.textContent = translations[currentLang]['train_timer_start'] || 'Старт';
    btn.classList.replace('bg-red-600', 'bg-tactical-olive');
  }
  updateDisplay();
}

function setAngle(angle) {
  document.getElementById('current-angle').textContent = `${angle}°`;
  // Visual feedback for selected button
  document.querySelectorAll('.angle-btn').forEach(btn => {
    btn.classList.remove('bg-tactical-olive', 'text-white');
    if (btn.textContent === `${angle}°`) {
      btn.classList.add('bg-tactical-olive', 'text-white');
    }
  });
}

function selectProgram(type) {
  currentProgram = type;
  exerciseIndex = 0;
  resetTimer();
  const activeProgs = localizedPrograms[currentLang] || localizedPrograms['ua'];
  const exercise = activeProgs[currentProgram][0];
  document.getElementById('exercise-name').textContent = exercise.name;
  document.getElementById('exercise-desc').textContent = exercise.desc;
}

// Video Gallery Logic and Data
const videoData = {
  'X-v5XyT1XwU': {
    ua: {
      title: 'Репортаж телеканалу КИЇВ24',
      desc: 'Ексклюзивний сюжет про РПС Євмінова за участі полковника Сил оборони Володимира Стецюка та головного інженера-розробника з позивним «Тул».'
    },
    en: {
      title: 'Report of KIYV24 TV Channel',
      desc: 'Exclusive coverage of the Evminov RPS featuring Colonel Volodymyr Stetsiuk and Chief Engineer with the call sign "Tool".'
    },
    pl: {
      title: 'Reportaż kanału telewizyjnego KIJÓW24',
      desc: 'Ekskluzywny materiał o RPS Ewminowa z udziałem pułkownika Wołodymyra Steciuka oraz głównego inżyniera o pseudonimie „Tool”.'
    },
    ru: {
      title: 'Репортаж телеканала КИЕВ24',
      desc: 'Эксклюзивный сюжет о РПС Евминова с участием полковника Сил обороны Владимира Стецюка и главного инженера-разработчика с позывным «Тул».'
    }
  },
  '6aK2kpcq2Z0': {
    ua: {
      title: 'Демонстрація мобільності (Shorts)',
      desc: 'Реальне випробування рухливості на 360 градусів у повному екіпіруванні. Бій в обмеженому просторі, нахили, присідання та біг.'
    },
    en: {
      title: 'Mobility Demonstration (Shorts)',
      desc: 'Real mobility test at 360 degrees in full combat gear. Close-quarters battle, bends, squats, and running.'
    },
    pl: {
      title: 'Demonstracja mobilności (Shorts)',
      desc: 'Rzeczywisty test mobilności w zakresie 360 stopni w pełnym rynsztunku bojowym. Walka w ograniczonej przestrzeni, skłony, przysiady i bieg.'
    },
    ru: {
      title: 'Демонстрация мобильности (Shorts)',
      desc: 'Реальное испытание подвижности на 360 градусов в полном экипировании. Бой в ограниченном пространстве, наклоны, приседания и бег.'
    }
  },
  'RqKDdvtqbk8': {
    ua: {
      title: 'Технічний огляд та налаштування',
      desc: 'Детальна інструкція зі збирання системи, індивідуального підгону висоти рельси та регулювання з\'єднання «Кукумбер» під антропометрію бійця.'
    },
    en: {
      title: 'Technical Review and Setup',
      desc: 'Detailed assembly manual, individual adjustment of guide rail height and calibration of the "Cucumber" joint to fit anatomy.'
    },
    pl: {
      title: 'Przegląd techniczny i konfiguracja',
      desc: 'Szczegółowa instrukcja montażu systemu, indywidualnego dopasowania wysokości szyny i regulacji złącza „Cucumber” do budowy ciała.'
    },
    ru: {
      title: 'Технический обзор и настройка',
      desc: 'Подробная инструкция по сборке системы, индивидуальной подгонке высоты рельса и регулировке соединения «Кукумбер» под антропометрию бойца.'
    }
  },
  'NBxzUCDOxh4': {
    ua: {
      title: 'Випробування у бойових умовах',
      desc: 'Реальні відгуки військовослужбовців ЗСУ та польові тести системи на тактичному полігоні Сил оборони України.'
    },
    en: {
      title: 'Combat Testing',
      desc: 'Real reviews from AFU soldiers and field tests of the system on the tactical training ground of the Defense Forces of Ukraine.'
    },
    pl: {
      title: 'Testy w warunkach bojowych',
      desc: 'Rzeczywiste opinie żołnierzy ZSU i testy polowe systemu na poligonie taktycznym Sił Obronnych Ukrainy.'
    },
    ru: {
      title: 'Испытания в боевых условиях',
      desc: 'Реальные отзывы военнослужащих ВСУ и полевые тесты системы на тактическом полях обороны Украины.'
    }
  }
};

let currentVideoId = 'X-v5XyT1XwU';

function selectVideo(videoId, element) {
  currentVideoId = videoId;
  const iframe = document.getElementById('main-video-player');
  if (!iframe) return;
  
  // Set embed URL
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  
  // Update description
  updateVideoText();
  
  // Update active state class in playlist
  document.querySelectorAll('.video-card').forEach(card => {
    card.classList.remove('border-tactical-accent', 'bg-tactical-olive/20');
    card.classList.add('border-white/5', 'bg-tactical-dark');
  });
  
  if (element) {
    element.classList.remove('border-white/5', 'bg-tactical-dark');
    element.classList.add('border-tactical-accent', 'bg-tactical-olive/20');
  }
}

function updateVideoText() {
  const info = videoData[currentVideoId];
  if (info) {
    const activeInfo = info[currentLang] || info['ua'];
    document.getElementById('video-title').textContent = activeInfo.title;
    document.getElementById('video-desc').textContent = activeInfo.desc;
  }
}

// Initial Loading & Synchronization
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  setAngle(30);
});
