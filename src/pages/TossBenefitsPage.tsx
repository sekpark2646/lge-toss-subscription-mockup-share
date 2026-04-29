import { useNavigate } from 'react-router-dom'
import '../App.css'

type BenefitItem = {
  id: string
  title: string
  reward: string
  icon: string
  highlighted?: boolean
}

const BENEFIT_ITEMS: BenefitItem[] = [
  { id: 'b1', title: '내 집 시세 확인하고', reward: '10원 받기', icon: '🏠' },
  { id: 'b2', title: '2월 자동차 미션하고', reward: '리워드 받기', icon: '🚘' },
  { id: 'b3', title: '고향사랑기부제 구경하고', reward: '포인트 받기', icon: '🎁' },
  { id: 'b4', title: '페이스페이 이벤트 소식 받고', reward: '1원 받기', icon: '🅿️' },
  { id: 'b5', title: '무제한 요금제 가입하고', reward: '토스포인트 2만원 받기', icon: '🟩' },
  { id: 'b6', title: '가전구독 혜택보고', reward: '10원 받기', icon: '🟠', highlighted: true },
  { id: 'b7', title: '둥그라미 최고 기록 세우고', reward: '포인트 받기', icon: '⭕' },
  { id: 'b8', title: '요금제 하나 바꾸고', reward: '최대 3만 2천원 포인트 받기', icon: '📱' },
  { id: 'b9', title: '내 카드 한도 확인하고', reward: '포인트 받기', icon: '🟡' },
  { id: 'b10', title: '여행자 보험 가입하고', reward: '최대 3만원 받기', icon: '✈️' },
  { id: 'b11', title: '구글 스토어 앱 결제하고', reward: '300원 받기', icon: '🌀' },
]

export default function TossBenefitsPage() {
  const navigate = useNavigate()

  return (
    <div className="benefits-page-wrap">
      <div className="benefits-phone-frame">
        <header className="benefits-top-header" aria-label="토스 헤더">
          <span className="benefits-top-header__logo">toss</span>
          <span className="benefits-top-header__title">혜택</span>
        </header>

        <main className="benefits-list" aria-label="혜택 목록">
          {BENEFIT_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`benefit-row ${item.highlighted ? 'is-highlighted' : ''}`}
              onClick={() => {
                if (item.id === 'b6') navigate('/')
              }}
            >
              <span className="benefit-row__icon" aria-hidden>
                {item.icon}
              </span>
              <span className="benefit-row__text">
                <strong>{item.title}</strong>
                <small>{item.reward}</small>
              </span>
            </button>
          ))}
        </main>

        <nav className="benefits-bottom-nav" aria-label="하단 탭">
          <span>홈</span>
          <span className="is-active">혜택</span>
          <span>소비</span>
          <span>송금</span>
          <span>전체</span>
        </nav>
      </div>
    </div>
  )
}
