export type ProductDetail = {
  headline: string
  categoryLabel: string
  fullName: string
  lumpSum: string
  monthly: string
  benefitMax: string
  /** LG 가전 구독 PDP 대표 이미지(og:image와 동일 경로) */
  imageUrl: string
}

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  aircon: {
    headline: '에어컨 0원 구독, LG전자에서 시작해요',
    categoryLabel: '에어컨 · FQ17FC1ED2',
    fullName: 'LG 휘센 오브제컬렉션 쿨 에어컨 2in1 (1시리즈)',
    lumpSum: '1,929,000',
    monthly: '32,900',
    benefitMax: '0',
    imageUrl:
      'https://www.lge.co.kr/kr/images/air-conditioners/md10560847/gallery/medium01.jpg',
  },
  styler: {
    headline: '스타일러 0원 구독, LG전자에서 시작해요',
    categoryLabel: '스타일러 · SC5GMR52CS',
    fullName: 'LG 스타일러 오브제컬렉션 (2026 NEW)',
    lumpSum: '1,770,000',
    monthly: '35,900',
    benefitMax: '0',
    imageUrl: 'https://www.lge.co.kr/kr/images/lg-styler/md10754842/gallery/medium09.jpg',
  },
  fridge: {
    headline: '냉장고 0원 구독, LG전자에서 시작해요',
    categoryLabel: '냉장고 · S834MEE111',
    fullName: 'LG 디오스 AI 오브제컬렉션 냉장고 (양문형, 매직스페이스)',
    lumpSum: '1,680,000',
    monthly: '41,900',
    benefitMax: '0',
    imageUrl: 'https://www.lge.co.kr/kr/images/refrigerators/md10635830/gallery/medium01.jpg',
  },
  air: {
    headline: '공기청정기 0원 구독, LG전자에서 시작해요',
    categoryLabel: '공기청정기 · AS356NSLLM',
    fullName: 'LG 퓨리케어 AI 오브제컬렉션 360˚ 공기청정기 M5 + 무빙휠 세트',
    lumpSum: '1,490,000',
    monthly: '22,900',
    benefitMax: '0',
    imageUrl: 'https://www.lge.co.kr/kr/images/air-purifier/md10762836/gallery/medium01.jpg',
  },
  'wash-tower': {
    headline: '워시타워 0원 구독, LG전자에서 시작해요',
    categoryLabel: '워시타워 · WL21EGZU',
    fullName: 'LG 트롬 오브제컬렉션 워시타워',
    lumpSum: '3,500,000',
    monthly: '59,900',
    benefitMax: '0',
    imageUrl: 'https://www.lge.co.kr/kr/images/wash-tower/md09942827/gallery/medium01.jpg',
  },
}
