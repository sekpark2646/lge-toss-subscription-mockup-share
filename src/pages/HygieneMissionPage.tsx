import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_DETAILS } from '../data/productDetails'
import '../App.css'

type Question = {
  id: string
  text: string
  match: '정수기' | '세탁기/워시타워' | '공기청정기/가습기' | '냉장고' | '전체'
  imageKind: 'kitchen' | 'laundry' | 'air' | 'fridge' | 'general'
}

const QUESTIONS: Question[] = [
  { id: 'Q1', text: '주방/거실에서 눈에 보이는 먼지나 물때가 자주 신경 쓰인다', match: '전체', imageKind: 'general' },
  { id: 'Q2', text: '정수기 출수구 노즐·물받이를 직접 닦아본 적이 거의 없다', match: '정수기', imageKind: 'kitchen' },
  { id: 'Q3', text: '아이/가족이 자주 만지는 가전 표면 위생이 불안하다', match: '전체', imageKind: 'general' },
  { id: 'Q4', text: '세탁기/건조기 내부에서 냄새가 난 적 있다', match: '세탁기/워시타워', imageKind: 'laundry' },
  { id: 'Q5', text: '필터/부품 교체 주기를 정확히 모르거나 자주 놓친다', match: '전체', imageKind: 'general' },
  { id: 'Q6', text: '아이방·노약자방 공기가 걱정된 적이 있다', match: '공기청정기/가습기', imageKind: 'air' },
  { id: 'Q7', text: '계절이 바뀔 때 가전 내부 위생 관리가 특히 부담된다', match: '전체', imageKind: 'general' },
  { id: 'Q8', text: '냉장고 내부 냄새·오염이 신경 쓰인 적이 있다', match: '냉장고', imageKind: 'fridge' },
  { id: 'Q9', text: '우리 집 가전이 오래돼 위생/성능 저하가 걱정된다', match: '전체', imageKind: 'general' },
  { id: 'Q10', text: '가전 구매 전 "관리가 힘들까" 고민한 적 있다', match: '전체', imageKind: 'general' },
]

const RECOMMENDED_ITEMS = [
  {
    productId: 'air',
    name: 'LG 퓨리케어 AI 오브제컬렉션 360˚ 공기청정기',
    price: '22,900',
    icon: '🌬️',
    imageUrl: PRODUCT_DETAILS.air.imageUrl,
  },
  {
    productId: 'fridge',
    name: 'LG 디오스 AI 오브제컬렉션 냉장고',
    price: '41,900',
    icon: '🧊',
    imageUrl: PRODUCT_DETAILS.fridge.imageUrl,
  },
  {
    productId: 'wash-tower',
    name: 'LG 트롬 오브제컬렉션 워시타워',
    price: '59,900',
    icon: '🧺',
    imageUrl: PRODUCT_DETAILS['wash-tower'].imageUrl,
  },
] as const

function QuestionIllustration({ kind }: { kind: Question['imageKind'] }) {
  const scenes = {
    kitchen: { emoji: '💧', title: '우리집 가전 위생' },
    laundry: { emoji: '🧺', title: '우리집 가전 위생' },
    air: { emoji: '🌬️', title: '우리집 가전 위생' },
    fridge: { emoji: '🧊', title: '우리집 가전 위생' },
    general: { emoji: '🏠', title: '우리집 가전 위생' },
  }[kind]

  return (
    <p className="mission-category-badge">
      {scenes.emoji} {scenes.title}
    </p>
  )
}

export default function HygieneMissionPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array.from({ length: QUESTIONS.length }, () => null))
  const [view, setView] = useState<'quiz' | 'result' | 'bundle'>('quiz')

  const current = QUESTIONS[currentIndex]
  const selected = answers[currentIndex]
  const checkedCount = answers.filter((v) => v).length
  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)

  const result = useMemo(() => {
    if (checkedCount <= 2) return { label: '안정형', message: '좋은 관리 습관을 유지 중이에요. 핵심 제품 1개만 점검해도 충분해요.' }
    if (checkedCount <= 5) return { label: '관심형', message: '인식은 있지만 실행이 부담돼요. 월 3만원대 단일 케어부터 시작해보세요.' }
    if (checkedCount <= 8) return { label: '주의형', message: '관리 공백이 보이기 시작했어요. 2종 조합으로 체감 개선이 빨라요.' }
    return { label: '위험형', message: '더 미룰 수 없는 단계예요. 오늘부터 체계적인 위생 관리를 시작해보세요.' }
  }, [checkedCount])

  const topConcerns = useMemo(() => {
    const counts = new Map<string, number>()
    answers.forEach((ans, idx) => {
      if (!ans) return
      const key = QUESTIONS[idx].match
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k)
  }, [answers])

  const setAnswer = (value: boolean) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = value
      return next
    })
  }

  useEffect(() => {
    if (view !== 'quiz' || selected === null) return
    const timer = window.setTimeout(() => {
      if (currentIndex === QUESTIONS.length - 1) {
        setView('result')
      } else {
        setCurrentIndex((p) => p + 1)
      }
    }, 150)
    return () => window.clearTimeout(timer)
  }, [selected, currentIndex, view])

  return (
    <div className="mission-page-wrap">
      <div className="mission-page">
        <header className="mission-nav app-header">
          <button
            type="button"
            className="mission-nav__back app-header__icon-btn"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            ←
          </button>
          <p className="app-header__title">우리집 위생관심 지수</p>
          <button
            type="button"
            className="mission-nav__back app-header__icon-btn"
            onClick={() => navigate('/')}
            aria-label="닫기"
          >
            ✕
          </button>
        </header>

        {view === 'quiz' && (
          <>
            <div className="mission-progress-wrap">
              <div className="mission-progress">
                <p className="mission-q-count">
                  {currentIndex + 1} / 10
                </p>
            </div>
              <div className="mission-progress-bar" aria-hidden>
                <span style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <main className="mission-quiz-content">
              <QuestionIllustration kind={current.imageKind} />
              <p className="mission-question">{current.text}</p>

              <div className="mission-options">
                <button
                  type="button"
                  className={`mission-option ${selected === true ? 'is-selected' : ''}`}
                  onClick={() => setAnswer(true)}
                >
                  <span className="mission-option__check" aria-hidden>
                    {selected === true ? '✓' : ''}
                  </span>
                  <span>네, 자주 신경 쓰여요</span>
                </button>
                <button
                  type="button"
                  className={`mission-option mission-option--muted ${selected === false ? 'is-selected' : ''}`}
                  onClick={() => setAnswer(false)}
                >
                  <span className="mission-option__check" aria-hidden>
                    {selected === false ? '✓' : ''}
                  </span>
                  <span>아니요, 괜찮아요</span>
                </button>
              </div>
            </main>
          </>
        )}

        {view === 'result' && (
          <main className="mission-card">
            <p className="mission-step-label">[Step 5 - 결과 대시보드]</p>
            <h2 className="mission-result-title">당신의 가전 위생 관리 지수</h2>
            <div className="mission-gauge" aria-label={`불안지수 ${Math.round((checkedCount / 10) * 100)}%`}>
              <p>
                <strong>{Math.round((checkedCount / 10) * 100)}%</strong>
                <br />
                {result.label}
              </p>
            </div>
            <p className="mission-result-message">{result.message}</p>

            <div className="mission-top-concerns">
              <p>핵심 불안 TOP 3</p>
              <ol>
                {(topConcerns.length ? topConcerns : ['정수기', '공기청정기/가습기', '냉장고']).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <button type="button" className="mission-next" onClick={() => setView('bundle')}>
              당신의 불안 해소 보기 ▶
            </button>
            <p className="mission-reward">● 공유하고 토스머니 +#300</p>
          </main>
        )}

        {view === 'bundle' && (
          <main className="mission-card mission-card--bundle">
            <p className="mission-step-label">[Step 7 - 맞춤 추천 CTA]</p>
            <p className="mission-bundle-copy">당신의 관리 유형에 맞는 추천 제품</p>

            <div className="mission-bundle-list">
              {RECOMMENDED_ITEMS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="mission-bundle-item"
                  onClick={() => navigate(`/product/${item.productId}`)}
                >
                  <div className="mission-bundle-item__thumb">
                    <img src={item.imageUrl} alt={item.name} loading="lazy" decoding="async" />
                  </div>
                  <p className="mission-bundle-item__name">
                    <span className="mission-bundle-item__icon" aria-hidden>
                      {item.icon}
                    </span>{' '}
                    {item.name}
                  </p>
                  <p className="mission-bundle-item__price">
                    월 <strong>₩{item.price}</strong> / 케어 포함
                  </p>
                </button>
              ))}
            </div>

            <button type="button" className="mission-next mission-next--dark">
              당신의 위생을 위해 청약하기
            </button>
          </main>
        )}
      </div>
    </div>
  )
}
