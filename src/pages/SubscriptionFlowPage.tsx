import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'

type FlowStep = {
  id: string
  title: string
  subtitle: string
  cta: string
  hints: string[]
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: '0',
    title: '개인정보 제3자 제공 동의',
    subtitle: '필수 약관 동의',
    cta: '동의하고 다음',
    hints: ['필수 동의 항목 체크 후 다음 단계로 진행해요.'],
  },
  {
    id: '1',
    title: '카카오 알림톡 수신',
    subtitle: '약관동의 화면 열기',
    cta: '확인하기',
    hints: ['카카오 알림톡에서 구독 신청 링크를 열고 다음 단계로 이동해요.'],
  },
  {
    id: '2',
    title: '본인인증',
    subtitle: '휴대폰 인증 진행',
    cta: '인증확인',
    hints: ['본인인증 서비스 이용약관 동의 후 인증번호를 입력해요.'],
  },
  {
    id: '3',
    title: '상품확인',
    subtitle: '청약 상품 확인',
    cta: '다음',
    hints: ['신청 상품과 월 구독료를 확인한 뒤 다음으로 진행해요.'],
  },
  {
    id: '4',
    title: '계약자정보 입력',
    subtitle: '이름/연락처/주소',
    cta: '다음',
    hints: ['계약자 기본 정보를 입력하고 주소검색으로 정확한 주소를 등록해요.'],
  },
  {
    id: '5',
    title: '실사용자정보 입력',
    subtitle: '설치 주소 확인',
    cta: '다음',
    hints: ['실사용자 정보 입력 시 서비스 가능 지역 여부가 함께 확인돼요.'],
  },
  {
    id: '6',
    title: '납부정보 입력',
    subtitle: '카드 정보 등록',
    cta: '다음',
    hints: ['유효한 카드 정보와 청구지 정보를 입력해요.'],
  },
  {
    id: '7',
    title: '청약확인',
    subtitle: '입력정보 최종 점검',
    cta: '계약서 확인',
    hints: ['청약 정보를 최종 점검한 뒤 계약서 확인 단계로 이동해요.'],
  },
  {
    id: '8',
    title: '계약서 확인',
    subtitle: '약관 및 계약서 열람',
    cta: '서명하기',
    hints: ['계약서 로딩은 약 5~10초 소요될 수 있어요.'],
  },
  {
    id: '9',
    title: '서명 또는 ARS 출금동의',
    subtitle: '전자서명 진행',
    cta: '완료',
    hints: ['서명이 어려운 고객은 ARS 출금동의로도 진행 가능해요.'],
  },
  {
    id: '10',
    title: '청약 완료 / 추가혜택',
    subtitle: '추가혜택 선택',
    cta: '완료',
    hints: ['추가혜택 선택 없이 완료해도 청약은 정상 완료돼요.'],
  },
  {
    id: '11',
    title: '제휴카드 신청',
    subtitle: '약관동의 및 제휴카드 선택',
    cta: '신청하기',
    hints: ['제휴카드 신청 약관 동의 후 카드를 선택하면 납부카드 자동등록이 진행돼요.'],
  },
  {
    id: '11-2',
    title: '다이렉트 청약 종료',
    subtitle: '종료 확인 팝업',
    cta: 'LG 가전구독으로 이동',
    hints: ['다이렉트 청약 종료 여부를 확인한 뒤 최종 완료 상태로 마무리돼요.'],
  },
]

export default function SubscriptionFlowPage() {
  const navigate = useNavigate()
  const { stepId } = useParams<{ stepId: string }>()
  const [selectedPartnerCard, setSelectedPartnerCard] = useState('')

  const currentIndex = useMemo(
    () => FLOW_STEPS.findIndex((step) => step.id === stepId),
    [stepId],
  )
  const currentStep = currentIndex >= 0 ? FLOW_STEPS[currentIndex] : FLOW_STEPS[0]
  const progress = `${currentIndex + 1} / ${FLOW_STEPS.length}`
  const partnerBenefitLabel =
    selectedPartnerCard === 'lotte'
      ? '[롯데] LG구독엔로카 · 월 최대 -26,000원 할인'
      : selectedPartnerCard === 'shinhan'
        ? '[신한] LG전자 다구독케어 · 월 최대 -20,000원 할인'
        : selectedPartnerCard === 'hana'
          ? '[하나] LG전자 플러스 · 월 최대 -20,000원 할인'
          : ''

  const goNext = () => {
    if (currentIndex === FLOW_STEPS.length - 1) {
      navigate('/')
      return
    }
    const next = FLOW_STEPS[currentIndex + 1]
    navigate(`/subscribe/flow/${next.id}`)
  }

  return (
    <div className="flow-page-wrap">
      <div className="flow-page">
        <header className="flow-header app-header">
          <button type="button" className="flow-header__back app-header__icon-btn" onClick={() => navigate(-1)}>
            ←
          </button>
          <p className="app-header__title">다이렉트 청약 단계</p>
          <span className="flow-header__progress">{progress}</span>
        </header>

        <main className="flow-main">
          <section className="flow-card">
            <p className="flow-card__step">STEP {currentStep.id}</p>
            <h1 className="flow-card__title">{currentStep.title}</h1>
            <p className="flow-card__subtitle">{currentStep.subtitle}</p>

            {currentStep.id === '0' ? (
              <div className="flow-consent-preview" aria-hidden>
                <label className="flow-consent-preview__check">
                  <input type="checkbox" checked readOnly />
                  <span>개인정보 제3자 제공 동의 <em>(필수)</em></span>
                </label>
                <div className="flow-consent-preview__panel">
                  <p>다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>
                  <ol>
                    <li>개인정보 제공받는 자: 예) ○○○ 카드</li>
                    <li>제공받는 자의 개인정보 이용목적: 예) 이벤트 공동개최 등 업무제휴 및 제휴카드 발급</li>
                    <li>제공하는 개인정보 항목: 예) 성명, 주소, 휴대폰번호, 이메일</li>
                    <li>제공받는 자의 보유 및 이용기간: 예) 회원탈퇴시 또는 개인정보 제3자 제공 철회 시까지</li>
                  </ol>
                </div>
              </div>
            ) : currentStep.id === '1' ? (
              <div className="flow-kakao-preview" aria-hidden>
                <div className="flow-kakao-preview__top">
                  <span>LG전자 구독</span>
                  <span className="flow-kakao-preview__brand">kakao</span>
                </div>
                <div className="flow-kakao-preview__card">
                  <div className="flow-kakao-preview__header">
                    알림톡 도착
                  </div>
                  <div className="flow-kakao-preview__body">
                    <p>[LG전자 구독 가입 안내]</p>
                    <p>고객님 안녕하십니까? LG전자 구독입니다.</p>
                    <p>제품 설치를 위해 온라인 청약이 진행되오니 아래 URL 클릭 후 청약 사항 확인 및 진행 부탁드립니다.</p>
                    <p>진행하지 않으실 경우 제품 설치가 지연될 수 있으므로 반드시 진행 부탁드립니다.</p>
                    <p>(※ 본 링크는 수신 후 당일 포함 3일간 유효하며, 만 21세부터 가입하시기까지는 신청이 불가하오니 참고하시기 바랍니다.)</p>
                    <p>하이케어솔루션(주) : 02-6926-7781</p>
                    <button type="button">청약신청 바로</button>
                  </div>
                </div>
              </div>
            ) : currentStep.id === '11' ? (
              <div className="flow-partner-preview" aria-hidden>
                <div className="flow-partner-preview__top">제휴카드 신청</div>
                <div className="flow-partner-preview__icon">💳</div>
                <div className="flow-partner-preview__box">
                  <p>전체동의</p>
                  <span />
                  <span />
                </div>
                <div className="flow-partner-preview__box">
                  <p>제휴카드 선택</p>
                  <select
                    className="flow-partner-preview__select"
                    value={selectedPartnerCard}
                    onChange={(event) => setSelectedPartnerCard(event.target.value)}
                    aria-label="제휴카드 선택"
                  >
                    <option value="">제휴카드 선택</option>
                    <option value="lotte">[롯데] LG구독엔로카 | 월 최대 -26,000원 할인</option>
                    <option value="shinhan">[신한] LG전자 다구독케어 | 월 최대 -20,000원 할인</option>
                    <option value="hana">[하나] LG전자 플러스 | 월 최대 -20,000원 할인</option>
                  </select>
                  {partnerBenefitLabel && (
                    <p className="flow-partner-preview__benefit">
                      {partnerBenefitLabel.split('·')[0]} · 월 최대 <strong>{partnerBenefitLabel.split('월 최대 ')[1]}</strong>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flow-preview" aria-hidden>
                <div className="flow-preview__top" />
                <div className="flow-preview__body">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="flow-preview__bottom" />
              </div>
            )}

            <ul className="flow-card__hints">
              {currentStep.hints.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>
          </section>
        </main>

        <aside className="flow-bottom">
          <button type="button" className="flow-bottom__cta" onClick={goNext}>
            {currentStep.cta}
          </button>
        </aside>
      </div>
    </div>
  )
}
