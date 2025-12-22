export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  article?: string;
}

export interface Document {
  id: string;
  number: string;
  title: string;
  adoptionDate: string;
  effectiveDate: string;
  status: 'active' | 'repealed' | 'draft';
  issuingAuthority: string;
  categoryId: string;
  type: string;
  isNew?: boolean;
  isUpdated?: boolean;
  sections: DocumentSection[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  branchId: string;
}

export interface Branch {
  id: string;
  name: string;
  icon: string;
}

export const branches: Branch[] = [
  { id: 'pensions', name: 'Pensiyalar', icon: 'Heart' },
  { id: 'benefits', name: 'Nafaqalar va Imtiyozlar', icon: 'Shield' },
  { id: 'disability', name: 'Nogironlik', icon: 'Heart' },
  { id: 'family', name: 'Oila va Bolalar', icon: 'Heart' },
  { id: 'veterans', name: 'Faxriylar va Veteranlar', icon: 'Shield' },
  { id: 'employment', name: 'Bandlik va Ishsizlik', icon: 'Briefcase' },
  { id: 'healthcare', name: 'Tibbiy Sug\'urta', icon: 'Heart' },
  { id: 'social-services', name: 'Ijtimoiy Xizmatlar', icon: 'FileText' },
];

export const categories: Category[] = [
  // Pensiyalar
  { id: 'pension-general', name: 'Umumiy qoidalar', branchId: 'pensions' },
  { id: 'pension-old-age', name: 'Qarlik pensiyasi', branchId: 'pensions' },
  { id: 'pension-disability', name: 'Nogironlik pensiyasi', branchId: 'pensions' },
  { id: 'pension-survivors', name: 'Ta\'minlovchini yo\'qotganlik pensiyasi', branchId: 'pensions' },
  
  // Nafaqalar va Imtiyozlar
  { id: 'benefits-children', name: 'Bolalar uchun nafaqalar', branchId: 'benefits' },
  { id: 'benefits-maternity', name: 'Homiladorlik va tug\'ruq nafaqalari', branchId: 'benefits' },
  { id: 'benefits-low-income', name: 'Kam ta\'minlangan oilalar', branchId: 'benefits' },
  { id: 'benefits-utilities', name: 'Kommunal xizmatlar imtiyozlari', branchId: 'benefits' },
  
  // Nogironlik
  { id: 'disability-assessment', name: 'Nogironlikni baholash', branchId: 'disability' },
  { id: 'disability-rights', name: 'Nogironlar huquqlari', branchId: 'disability' },
  { id: 'disability-rehabilitation', name: 'Reabilitatsiya xizmatlari', branchId: 'disability' },
  
  // Oila va Bolalar
  { id: 'family-child-support', name: 'Bolalarni qo\'llab-quvvatlash', branchId: 'family' },
  { id: 'family-orphans', name: 'Etimlar va ota-onasiz bolalar', branchId: 'family' },
  { id: 'family-large-families', name: 'Ko\'p bolali oilalar', branchId: 'family' },
  
  // Faxriylar va Veteranlar
  { id: 'veterans-benefits', name: 'Veteranlar nafaqalari', branchId: 'veterans' },
  { id: 'veterans-honors', name: 'Faxriy unvonlar', branchId: 'veterans' },
  
  // Bandlik va Ishsizlik
  { id: 'employment-unemployment', name: 'Ishsizlik nafaqasi', branchId: 'employment' },
  { id: 'employment-programs', name: 'Bandlik dasturlari', branchId: 'employment' },
  
  // Tibbiy Sug'urta
  { id: 'healthcare-insurance', name: 'Majburiy tibbiy sug\'urta', branchId: 'healthcare' },
  { id: 'healthcare-coverage', name: 'Tibbiy xizmatlar qamrovi', branchId: 'healthcare' },
  
  // Ijtimoiy Xizmatlar
  { id: 'services-elderly', name: 'Qariyalar uchun xizmatlar', branchId: 'social-services' },
  { id: 'services-care', name: 'Parvarishlash xizmatlari', branchId: 'social-services' },
];

export const subcategories: Subcategory[] = [
  // Pensiyalar subcategories
  { id: 'pension-old-age-early', name: 'Muddatidan oldin pensiya', categoryId: 'pension-old-age' },
  { id: 'pension-old-age-regular', name: 'Oddiy pensiya', categoryId: 'pension-old-age' },
  
  // Nafaqalar subcategories
  { id: 'benefits-children-birth', name: 'Tug\'ilish nafaqasi', categoryId: 'benefits-children' },
  { id: 'benefits-children-monthly', name: 'Oylik nafaqa', categoryId: 'benefits-children' },
  
  // Nogironlik subcategories
  { id: 'disability-group1', name: 'I guruh nogironlik', categoryId: 'disability-assessment' },
  { id: 'disability-group2', name: 'II guruh nogironlik', categoryId: 'disability-assessment' },
  { id: 'disability-group3', name: 'III guruh nogironlik', categoryId: 'disability-assessment' },
  
  // Oila subcategories
  { id: 'family-large-3', name: '3 va undan ortiq bolali oilalar', categoryId: 'family-large-families' },
  { id: 'family-large-5', name: '5 va undan ortiq bolali oilalar', categoryId: 'family-large-families' },
];

export const documents: Document[] = [
  {
    id: 'doc-001',
    number: 'ЗРУ-474',
    title: 'O\'zbekiston Respublikasining Davlat Pensiya Ta\'minoti To\'g\'risida Qonuni',
    adoptionDate: '2020-09-01',
    effectiveDate: '2021-01-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Oliy Majlisi',
    categoryId: 'pension-general',
    type: 'Qonun',
    isNew: false,
    sections: [
      {
        id: 's1',
        title: 'Umumiy qoidalar',
        article: '1-modda',
        content: 'Ushbu Qonun O\'zbekiston Respublikasida davlat pensiya ta\'minoti tizimining huquqiy, iqtisodiy va tashkiliy asoslarini belgilaydi. Davlat pensiya ta\'minoti fuqarolarning qarlik, nogironlik yoki oilaning asosiy ta\'minlovchisini yo\'qotish bilan bog\'liq holda daromadlarni yo\'qotishini ijtimoiy qo\'llab-quvvatlash shakllaridan biridir.'
      },
      {
        id: 's2',
        title: 'Pensiya ta\'minoti sub\'ektlari',
        article: '2-modda',
        content: 'Pensiya ta\'minoti sub\'ektlari O\'zbekiston Respublikasi fuqarolari, O\'zbekiston Respublikasida doimiy istiqomat qiluvchi chet el fuqarolari va fuqaroligi bo\'lmagan shaxslardir. Pensiya ta\'minoti xalqaro shartnomalar asosida chet el fuqarolariga ham tarqalishi mumkin.'
      },
      {
        id: 's3',
        title: 'Pensiya turlari',
        article: '3-modda',
        content: 'O\'zbekiston Respublikasida quyidagi pensiya turlari belgilangan: qarillik pensiyasi, nogironlik pensiyasi, ta\'minlovchini yo\'qotganlik bo\'yicha pensiya. Har bir pensiya turi uchun alohida shartlar va me\'yorlar belgilanadi.'
      },
      {
        id: 's4',
        title: 'Pensiyani tayinlash tartibi',
        article: '4-modda',
        content: 'Pensiya fuqaroning arzi asosida pensiya organlarida tayinlanadi. Pensiyani tayinlash uchun zarur hujjatlar ro\'yxati va murojaat qilish tartibi Vazirlar Mahkamasi tomonidan belgilanadi. Pensiya qarori qabul qilingan kundan e\'tiboran to\'lanadi.'
      },
      {
        id: 's5',
        title: 'Pensiya miqdori',
        article: '5-modda',
        content: 'Pensiya miqdori mehnat faoliyati davrlari, sug\'urta badallari to\'lanishi va o\'rtacha ish haqi asosida hisoblanadi. Minimal pensiya miqdori davlat tomonidan kafolatlanadi va yashash minimumini ta\'minlashi kerak.'
      }
    ]
  },
  {
    id: 'doc-002',
    number: 'ПП-5270',
    title: 'Qarillik Pensiyasini Tayinlash va To\'lash Tartibini Takomillashtirish To\'g\'risida',
    adoptionDate: '2024-10-15',
    effectiveDate: '2024-12-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Prezidenti',
    categoryId: 'pension-old-age',
    type: 'Prezident Farmoni',
    isNew: true,
    sections: [
      {
        id: 's1',
        title: 'Qarillik pensiyasiga haqiqat',
        article: '1-band',
        content: 'Qarillik pensiyasi fuqarolarning ma\'lum yoshga yetgan va belgilangan mehnat stajiga ega bo\'lgan taqdirda tayinlanadi. Erkaklar 60 yoshga, ayollar 55 yoshga to\'lganlarida pensiya olish huquqiga ega bo\'ladilar, agar ular kamida 25 yil (erkaklar) va 20 yil (ayollar) mehnat stajiga ega bo\'lsalar.'
      },
      {
        id: 's2',
        title: 'Imtiyozli pensiya',
        article: '2-band',
        content: 'Og\'ir va zararli mehnat sharoitlarida ishlagan, shuningdek, ma\'lum toifadagi xodimlar muddatidan oldin pensiyaga chiqish huquqiga ega. Bu toifalar ro\'yxati va ularga qo\'yiladigan talablar Vazirlar Mahkamasi qarorida belgilangan.'
      },
      {
        id: 's3',
        title: 'Pensiya hisoblash tartibi',
        article: '3-band',
        content: 'Qarillik pensiyasi miqdori ish staji davomida to\'langan sug\'urta badallari va o\'rtacha oylik ish haqi asosida hisoblanadi. Pensiya miqdorini hisoblashda so\'nggi 60 oy davomidagi eng yuqori daromadlar e\'tiborga olinadi.'
      }
    ]
  },
  {
    id: 'doc-003',
    number: 'ЗРУ-712',
    title: 'Bolalar Uchun Nafaqalar To\'g\'risida Qonun',
    adoptionDate: '2022-05-20',
    effectiveDate: '2022-07-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Oliy Majlisi',
    categoryId: 'benefits-children',
    type: 'Qonun',
    isUpdated: true,
    sections: [
      {
        id: 's1',
        title: 'Qonunning maqsadi',
        article: '1-modda',
        content: 'Ushbu Qonun bolalar tug\'ilishi va parvarishlanishi bilan bog\'liq xarajatlarni qoплаsh, oila va bolalik institutini qo\'llab-quvvatlash maqsadida nafaqalar tizimini tartibga soladi. Davlat bolalarning sog\'lom o\'sishi va rivojlanishi uchun ijtimoiy kafolatlar beradi.'
      },
      {
        id: 's2',
        title: 'Nafaqa turlari',
        article: '2-modda',
        content: 'Bolalar uchun quyidagi nafaqalar belgilangan: bir martalik tug\'ilish nafaqasi, 2 yoshgacha bolalar uchun oylik nafaqa, kam ta\'minlangan oilalardagi bolalar uchun qo\'shimcha nafaqa. Nafaqalar barcha fuqarolarga, mehnat faoliyatidan qat\'iy nazar, beriladi.'
      },
      {
        id: 's3',
        title: 'Nafaqa miqdori',
        article: '3-modda',
        content: 'Bir martalik tug\'ilish nafaqasi bazaviy hisoblash miqdorining 10 barobariga teng. 2 yoshgacha bolalar uchun oylik nafaqa bazaviy hisoblash miqdorining 1.5 barobariga teng. Nafaqa miqdorlari har yili inflyatsiya darajasiga qarab indeksatsiya qilinadi.'
      },
      {
        id: 's4',
        title: 'Nafaqani olish tartibi',
        article: '4-modda',
        content: 'Nafaqani olish uchun ota-onalar yoki qonuniy vakillar ijtimoiy himoya organlariga ariza topshiradilar. Ariza bolaning tug\'ilgani to\'g\'risidagi guvohnoma va ota-onalarning pasportlari bilan birgalikda beriladi. Nafaqa arizadan keyin 10 ish kunidan kechiktirmay tayinlanadi.'
      }
    ]
  },
  {
    id: 'doc-004',
    number: 'ЗРУ-528',
    title: 'Nogironlar Huquqlari va Ijtimoiy Himoyasi To\'g\'risida Qonun',
    adoptionDate: '2021-11-18',
    effectiveDate: '2022-01-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Oliy Majlisi',
    categoryId: 'disability-rights',
    type: 'Qonun',
    sections: [
      {
        id: 's1',
        title: 'Asosiy tushunchalar',
        article: '1-modda',
        content: 'Nogiron - bu sog\'liqning buzilishi, organizm funksiyalarining cheklanganligi natijasida kundalik faoliyat va ijtimoiy hayotda qatnashishda doimiy yordamga muhtoj shaxs. Nogironlik darajasi tibbiy-ijtimoiy ekspertiza komissiyasi tomonidan belgilanadi.'
      },
      {
        id: 's2',
        title: 'Nogironlarning huquqlari',
        article: '2-modda',
        content: 'Nogironlar quyidagi huquqlarga ega: ijtimoiy himoya va ta\'minot, tibbiy xizmat, ta\'lim olish, mehnat faoliyati bilan shug\'ullanish, xizmatlar va infratuzilmadan to\'siqsiz foydalanish, transport imtiyozlari. Davlat nogironlarning teng huquqli fuqarolar sifatida jamiyat hayotida qatnashishini ta\'minlaydi.'
      },
      {
        id: 's3',
        title: 'Nogironlik pensiyasi',
        article: '3-modda',
        content: 'Nogironlik pensiyasi sog\'liqning buzilishi darajasiga qarab I, II yoki III guruh nogironlik belgilangan shaxslarga tayinlanadi. I guruh nogironlik bo\'yicha pensiya eng yuqori, III guruh bo\'yicha eng past miqdorda belgilanadi. Pensiya mehnat stajidan qat\'iy nazar tayinlanadi.'
      },
      {
        id: 's4',
        title: 'Reabilitatsiya xizmatlari',
        article: '4-modda',
        content: 'Nogironlar tibbiy, ijtimoiy, kasbiy va psixologik reabilitatsiya xizmatlaridan foydalanish huquqiga ega. Reabilitatsiya dasturlari individual reabilitatsiya rejasi asosida ishlab chiqiladi va nogironlarning ijtimoiy moslashuvini ta\'minlashga qaratilgan.'
      }
    ]
  },
  {
    id: 'doc-005',
    number: 'ПКМ-234',
    title: 'Ko\'p Bolali Oilalarni Qo\'llab-Quvvatlash Chora-Tadbirlari To\'g\'risida',
    adoptionDate: '2023-03-10',
    effectiveDate: '2023-04-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Vazirlar Mahkamasi',
    categoryId: 'family-large-families',
    type: 'Vazirlar Mahkamasi Qarori',
    isUpdated: true,
    sections: [
      {
        id: 's1',
        title: 'Umumiy qoidalar',
        article: '1-band',
        content: 'Ko\'p bolali oila deb 3 va undan ortiq voyaga yetmagan bolalar parvarish qilayotgan oila hisoblanadi. Bunday oilalar davlat tomonidan maxsus qo\'llab-quvvatlashga va imtiyozlarga ega bo\'ladilar. Davlat ko\'p bolali oilalarning turmush darajasini yaxshilashni ustuvor yo\'nalish sifatida belgilaydi.'
      },
      {
        id: 's2',
        title: 'Moddiy qo\'llab-quvvatlash',
        article: '2-band',
        content: '5 va undan ortiq voyaga yetmagan bolalari bo\'lgan oilalarga oylik nafaqa to\'lanadi. Nafaqa miqdori bazaviy hisoblash miqdorining 3 barobariga teng. Bundan tashqari, bunday oilalar kommunal xizmatlar uchun to\'lovlarda 50% chegirmaga ega.'
      },
      {
        id: 's3',
        title: 'Ijtimoiy imtiyozlar',
        article: '3-band',
        content: 'Ko\'p bolali oilalar quyidagi imtiyozlarga ega: jamoat transportida bepul yoki chegirmali sayohat, maktabgacha ta\'lim muassasalarida birinchi navbatda joy olish, sanatoriy-kurort davolashda imtiyozlar, uy-joy berishda ustuvorlik.'
      }
    ]
  },
  {
    id: 'doc-006',
    number: 'ЗРУ-645',
    title: 'Homiladorlik va Tug\'ruq bo\'yicha Nafaqalar To\'g\'risida Qonun',
    adoptionDate: '2021-08-25',
    effectiveDate: '2021-10-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Oliy Majlisi',
    categoryId: 'benefits-maternity',
    type: 'Qonun',
    sections: [
      {
        id: 's1',
        title: 'Nafaqaga haqiqat',
        article: '1-modda',
        content: 'Homiladorlik va tug\'ruq bo\'yicha nafaqa ishlaydigan ayollarga homiladorlik va tug\'ruqdan keyingi davrdagi daromad yo\'qotishini qoplash maqsadida to\'lanadi. Nafaqa olish huquqi homiladorlikning 30 haftaligidan boshlanadi.'
      },
      {
        id: 's2',
        title: 'Nafaqa davomiyligi',
        article: '2-modda',
        content: 'Homiladorlik va tug\'ruq bo\'yicha nafaqa jami 126 kalendar kun davomida to\'lanadi: tug\'ruqdan oldin 70 kun va tug\'ruqdan keyin 56 kun. Murakkab tug\'ruq yoki bir necha bola tug\'ilganda bu muddat uzaytiriladi - 140 kungacha.'
      },
      {
        id: 's3',
        title: 'Nafaqa miqdori',
        article: '3-modda',
        content: 'Nafaqa miqdori ayolning o\'rtacha oylik ish haqi asosida hisoblanadi. Hisoblash uchun nafaqa tayinlashdan oldingi 12 oy davridagi daromadlar e\'tiborga olinadi. Nafaqa 100% o\'rtacha oylik ish haqiga teng miqdorda to\'lanadi.'
      }
    ]
  },
  {
    id: 'doc-007',
    number: 'ПП-4985',
    title: 'Ishsizlik Nafaqasi Tizimini Joriy Etish To\'g\'risida',
    adoptionDate: '2024-06-05',
    effectiveDate: '2024-08-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Prezidenti',
    categoryId: 'employment-unemployment',
    type: 'Prezident Farmoni',
    isNew: true,
    sections: [
      {
        id: 's1',
        title: 'Ishsizlik nafaqasining maqsadi',
        article: '1-band',
        content: 'Ishsizlik nafaqasi ishini yo\'qotgan va ish izlayotgan fuqarolarni vaqtincha moddiy qo\'llab-quvvatlash maqsadida joriy etiladi. Nafaqa bandlik markazlarida ro\'yxatdan o\'tgan va faol ish izlayotgan shaxslarga to\'lanadi.'
      },
      {
        id: 's2',
        title: 'Nafaqani olish shartlari',
        article: '2-band',
        content: 'Ishsizlik nafaqasini olish uchun: bandlik markazida ishsiz sifatida ro\'yxatdan o\'tish, oxirgi 12 oy ichida kamida 6 oy davomida sug\'urta badallarini to\'lash, bandlik markazining takliflarini bajarish talab etiladi.'
      },
      {
        id: 's3',
        title: 'Nafaqa miqdori va davomiyligi',
        article: '3-band',
        content: 'Nafaqa oldingi ish joyidagi o\'rtacha oylik ish haqining 60% miqdorida to\'lanadi. Nafaqa maksimal 6 oy davomida beriladi. Nafaqa minimal oylik ish haqidan past bo\'lishi mumkin emas.'
      }
    ]
  },
  {
    id: 'doc-008',
    number: 'ЗРУ-589',
    title: 'Majburiy Tibbiy Sug\'urta To\'g\'risida Qonun',
    adoptionDate: '2020-03-30',
    effectiveDate: '2021-01-01',
    status: 'active',
    issuingAuthority: 'O\'zbekiston Respublikasi Oliy Majlisi',
    categoryId: 'healthcare-insurance',
    type: 'Qonun',
    sections: [
      {
        id: 's1',
        title: 'Tibbiy sug\'urta tizimi',
        article: '1-modda',
        content: 'Majburiy tibbiy sug\'urta fuqarolarning tibbiy xizmatlardan foydalanish huquqini kafolatlash va sog\'liqni saqlash tizimini moliyaviy ta\'minlash mexanizmidir. Barcha O\'zbekiston fuqarolari majburiy tibbiy sug\'urta tizimiga kiritiladi.'
      },
      {
        id: 's2',
        title: 'Sug\'urta badallari',
        article: '2-modda',
        content: 'Ishlaydigan fuqarolar uchun sug\'urta badallari ish beruvchilar tomonidan oylik ish haqidan belgilangan foiz miqdorida to\'lanadi. Ishlamaydigan fuqarolar, pensionerlar va nogironlar uchun sug\'urta badallari davlat byudjeti hisobidan to\'lanadi.'
      },
      {
        id: 's3',
        title: 'Kafolatlangan tibbiy xizmatlar',
        article: '3-modda',
        content: 'Majburiy tibbiy sug\'urta quyidagi xizmatlarni qamrab oladi: ambulatoriya-poliklinika yordami, statsionar davolash, tez tibbiy yordam, profilaktik tekshiruvlar, dori vositalar bilan ta\'minlash (belgilangan ro\'yxat bo\'yicha). Xizmatlar ro\'yxati Vazirlar Mahkamasi tomonidan tasdiqlanadi.'
      }
    ]
  }
];

export const stats = {
  totalDocuments: 1247,
  activeDocuments: 1156,
  repealedDocuments: 91,
  updatesThisMonth: 23
};

export function getDocumentById(id: string): Document | undefined {
  return documents.find(doc => doc.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function getBranchById(id: string): Branch | undefined {
  return branches.find(branch => branch.id === id);
}

export function getCategoriesByBranch(branchId: string): Category[] {
  return categories.filter(cat => cat.branchId === branchId);
}

export function getSubcategoriesByCategory(categoryId: string): Subcategory[] {
  return subcategories.filter(sub => sub.categoryId === categoryId);
}

export function getDocumentsByCategory(categoryId: string): Document[] {
  return documents.filter(doc => doc.categoryId === categoryId);
}

export function getRecentDocuments(): Document[] {
  return documents
    .filter(doc => doc.isNew || doc.isUpdated)
    .slice(0, 5);
}
