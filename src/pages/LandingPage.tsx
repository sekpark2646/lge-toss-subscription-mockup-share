import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { PRODUCT_DETAILS } from '../data/productDetails'
import '../App.css'

export default function LandingPage() {
  const navigate = useNavigate()
  const [openedFaq, setOpenedFaq] = useState<number | null>(null)
  const [openedM3, setOpenedM3] = useState(false)
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)

  const heroKvImages = [
    '/kv-roll-1.png',
    '/kv-roll-2.png',
    '/kv-roll-3.png',
    '/kv-roll-4.png',
    '/kv-roll-5.png',
    '/kv-roll-6.png',
  ] as const

  const coreBenefitBadges = [
    {
      id: 'visit',
      label: '케어 전문가 방문 관리',
      icon: 'wrench' as const,
    },
    {
      id: 'filter',
      label: '시기에 맞춘 소모품 교체',
      icon: 'droplet' as const,
    },
    {
      id: 'repair',
      label: '고장나면 무상 A/S',
      icon: 'wrench' as const,
    },
  ]

  const missionEntries = [
    {
      id: 'hygiene',
      bg: '#eef4ff',
      title: '우리집 위생관심 지수',
      detail: '60초 · 10Q',
      reward: '시작하기',
      icon: 'droplet' as const,
    },
    {
      id: 'care',
      bg: '#f5eeff',
      title: '케어중독 테스트',
      detail: '45초 · 10Q',
      reward: '시작하기',
      icon: 'heart' as const,
    },
  ]

  const topPopularIds = ['aircon', 'styler', 'fridge', 'air'] as const
  const topPopularProducts = topPopularIds.map((id) => {
    const d = PRODUCT_DETAILS[id]
    return {
      id,
      name: d.fullName,
      price: d.monthly,
      imageUrl: d.imageUrl,
    }
  })

  const bestDetail = PRODUCT_DETAILS['wash-tower']
  const bestProduct = {
    id: 'wash-tower' as const,
    name: bestDetail.fullName,
    price: bestDetail.monthly,
    imageUrl: bestDetail.imageUrl,
    tag: '토스 단독 -3개월',
  }

  const goProductDetail = (productId: string) => {
    navigate(`/product/${productId}`)
  }

  const trustReviewsCarouselRef = useRef<HTMLDivElement>(null)

  const trustReviews = [
    {
      id: 'r1',
      quote:
        '8년째 같은 매니저님이 꾸준히 관리해주셔서 안심되고, 방문 시간도 정확해 생활 리듬이 전혀 깨지지 않아 정말 만족해요.',
      customerName: '김*경',
    },
    {
      id: 'r2',
      quote:
        '청약 신청부터 설치 일정 확정까지 진행이 빨랐고, 토스 결제로 매달 납부 내역을 한눈에 확인할 수 있어 관리가 훨씬 편해졌어요.',
      customerName: '박*민',
    },
    {
      id: 'r3',
      quote:
        '케어기사 방문 안내 문자가 정확하게 와서 일정 맞추기 쉬웠고, 응대도 친절해 부모님 댁 설치까지 걱정 없이 맡길 수 있었어요.',
      customerName: '이*진',
    },
  ] as const

  const pressOutlets = ['한경', '매경', '조선', '중앙'] as const

  const scrollTrustReviews = (dir: -1 | 1) => {
    const el = trustReviewsCarouselRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.m7-trust__review-card')
    const gap = 10
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.88
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroKvImages.length)
    }, 2000)
    return () => window.clearInterval(timer)
  }, [heroKvImages.length])

  const faqs = [
    {
      q: '중도 해지가 가능한가요?',
      a: '약정·상품 구성에 따라 가능 여부와 위약금·잔여 구독료 규정이 달라집니다. 자세한 내용은 상품 상세와 약관을 확인해 주세요.',
    },
    {
      q: '이전 설치는 무료인가요?',
      a: '이사 등으로 제품을 옮겨 재설치하는 경우, 상품·프로모션에 따라 무료 또는 별도 비용이 발생할 수 있습니다. 청약 시 안내됩니다.',
    },
    {
      q: '신용조회가 필요한가요?',
      a: '구독 한도·결제 승인을 위해 사전 신용조회가 필요할 수 있으며, 상품별로 절차가 다를 수 있습니다.',
    },
    {
      q: '케어서비스 주기는?',
      a: '제품·플랜마다 다르며, 방문 케어는 예를 들어 6개월 주기 등으로 제공되는 경우가 많습니다. 정확한 일정은 상품 상세를 참고해 주세요.',
    },
    {
      q: '약정 기간이 어떻게 되나요?',
      a: '선택한 상품·구독 플랜에 따라 약정 기간이 정해지며, 신청 단계에서 확인하실 수 있습니다.',
    },
  ]

  return (
    <div className="page-wrap">
      <div className="page">
        <main>
          <section className="module module-hero">
            <nav className="hero-nav app-header" aria-label="페이지 내비게이션">
              <button type="button" className="hero-nav__btn app-header__icon-btn" aria-label="뒤로가기">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="app-header__title">LG 가전 구독</p>
              <button type="button" className="hero-nav__btn app-header__icon-btn" aria-label="공유">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </nav>
            <div className="hero-partner-badge" aria-label="Toss 및 LG전자 로고">
              <span className="hero-partner-badge__logo hero-partner-badge__logo--toss">toss</span>
              <span className="hero-partner-badge__divider" aria-hidden>
                ×
              </span>
              <span className="hero-partner-badge__logo hero-partner-badge__logo--lg">LG전자</span>
            </div>
            <h1 className="hero-title">
              0원으로 시작하는
              <br />
              LG 가전 구독
            </h1>
            <div className="hero-visual">
              <div
                className="hero-carousel__track"
                style={{ transform: `translateX(-${heroSlideIndex * 100}%)` }}
              >
                {heroKvImages.map((src, idx) => (
                  <div key={src} className="hero-carousel__slide">
                    <img
                      src={src}
                      alt={`LG 가전 구독 KV 이미지 ${idx + 1}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-scroll-hint">
              <span className="hero-scroll-hint__chevron" aria-hidden>
                ▼
              </span>
              <span>스크롤</span>
            </div>
          </section>

          <section className="module module-benefit">
            <p className="m2-subcopy">
              왜 구독이 좋을까?
              <span className="m2-subcopy__headline">구독을 선택하는 이유</span>
            </p>
            <ul className="m2-badge-list">
              {coreBenefitBadges.map((row) => (
                <li key={row.id} className="m2-badge">
                  <span className="m2-badge__icon" aria-hidden>
                    {row.icon === 'wrench' ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2 2 0 01-2.83-2.83l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                          stroke="#222"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z"
                          stroke="#222"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="m2-badge__text">{row.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="module module-toss-banner" aria-label="토스 전용 혜택">
            <div className="m3-banner__inner">
              <p className="m3-banner__label">
                <span className="m3-banner__gift" role="img" aria-label="선물">
                  🎁
                </span>
                <span>토스에서만</span>
              </p>
              <p className="m3-banner__headline">
                첫 <span className="m3-banner__accent">3개월</span> 구독료
                <br />
                최대 <span className="m3-banner__accent">50%</span> 할인
              </p>
              <p className="m3-banner__sub">
                <span className="m3-banner__accent">+</span> 토스머니 최대{' '}
                <span className="m3-banner__accent">₩10,000</span> 캐시백
              </p>
              <button
                type="button"
                className={`m3-banner__accordion-trigger ${openedM3 ? 'is-open' : ''}`}
                aria-expanded={openedM3}
                aria-controls="m3-benefit-detail"
                onClick={() => setOpenedM3((prev) => !prev)}
              >
                혜택 상세 안내
                <span className="m3-banner__chevron" aria-hidden>
                  ▼
                </span>
              </button>
              {openedM3 && (
                <div id="m3-benefit-detail" className="m3-banner__detail" role="region" aria-label="혜택 상세 안내">
                  <ul>
                    <li>첫 3개월 동안 월 구독료 최대 50% 할인 (상품별 상이)</li>
                    <li>토스 결제 시 토스머니 최대 10,000원 캐시백 제공</li>
                    <li>청약 완료 고객 대상 설치 우선 배정 및 알림톡 안내</li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section className="module module-mission" aria-labelledby="m4-title">
            <header className="m4-heading">
              <h2 id="m4-title" className="m4-title">
                나에게 맞는 구독 찾고 포인트 받기
              </h2>
              <p className="m4-subtitle">60초면 충분해요</p>
            </header>
            <div className="m4-grid">
              {missionEntries.map((mission) => (
                <button
                  key={mission.id}
                  type="button"
                  className={`m4-card m4-card--${mission.id}`}
                  style={{ backgroundColor: mission.bg }}
                  onClick={() => {
                    if (mission.id === 'hygiene') navigate('/mission/hygiene')
                  }}
                >
                  <span className="m4-card__icon" aria-hidden>
                    {mission.icon === 'droplet' ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z"
                          stroke="#ec4899"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          stroke="#3182f6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="m4-card__body">
                    <p className="m4-card__title">{mission.title}</p>
                    <p className="m4-card__detail">{mission.detail}</p>
                  </div>
                  <span className="m4-card__reward">{mission.reward}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="module module-products product-showcase" aria-labelledby="m5-title">
            <h2 id="m5-title" className="m5-section-title">
              구독 베스트 Top 5
            </h2>
            <ProductGrid items={topPopularProducts} onItemClick={goProductDetail} />
            <div className="m5-best">
              <div className="m5-best__badge">
                <span className="m5-best__star" aria-hidden>
                  ★
                </span>
                이번 달 BEST
              </div>
              <div className="m5-best__row">
                <div className="m5-best__thumb">
                  <img src={bestProduct.imageUrl} alt={bestProduct.name} loading="lazy" decoding="async" />
                </div>
                <div className="m5-best__meta">
                  <p className="m5-best__name">{bestProduct.name}</p>
                  <p className="m5-price m5-price--best">
                    <span className="m5-price__prefix">월</span>
                    <span className="m5-price__value">{bestProduct.price}</span>
                    <span className="m5-price__suffix">원부터</span>
                  </p>
                  <p className="m5-best__tag">{bestProduct.tag}</p>
                </div>
              </div>
              <button
                type="button"
                className="m5-best__more"
                onClick={() => goProductDetail(bestProduct.id)}
              >
                더보기 &gt;
              </button>
            </div>
          </section>

          <section className="module module-coupon" aria-labelledby="m6-coupon-title">
            <div className="m6-coupon">
              <div className="m6-coupon__sparkle" aria-hidden />
              <div className="m6-coupon__inner">
                <div className="m6-coupon__head">
                  <span className="m6-coupon__lock" aria-hidden>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 11V8a5 5 0 0110 0v3"
                        stroke="#facc15"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="5"
                        y="11"
                        width="14"
                        height="11"
                        rx="2"
                        stroke="#facc15"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="16" r="1.5" fill="#facc15" />
                    </svg>
                  </span>
                  <h2 id="m6-coupon-title" className="m6-coupon__title">
                    내 신용점수로 숨은 혜택 열기
                  </h2>
                </div>
                <ul className="m6-coupon__hints">
                  <li>
                    <span className="m6-coupon__accent">800점 이상</span>
                    <span className="m6-coupon__hint-muted"> · 3개월 </span>
                    <span className="m6-coupon__accent">50%</span>
                  </li>
                  <li>
                    <span className="m6-coupon__accent">700~799점</span>
                    <span className="m6-coupon__hint-muted"> · 첫 달 무료</span>
                  </li>
                  <li>
                    <span className="m6-coupon__hint-muted">그 외 · 설치비 면제</span>
                  </li>
                </ul>
                <button type="button" className="m6-coupon__cta">
                  [ 1초 만에 확인하기 ▶ ]
                </button>
                <p className="m6-coupon__note">※ 신용조회 이력이 남지 않아요</p>
              </div>
            </div>
          </section>

          <section className="module module-trust" aria-label="신뢰 요소">
            <div className="m7-trust">
              <div className="m7-trust__block m7-trust__block--stat">
                <p className="m7-trust__stat">
                  누적 구독 고객{' '}
                  <strong className="m7-trust__stat-num">325만 세대</strong>
                </p>
              </div>

              <div className="m7-trust__divider" aria-hidden />

              <div className="m7-trust__block m7-trust__block--reviews">
                <h2 className="m7-trust__h2">실제 고객 후기</h2>
                <div className="m7-trust__carousel-shell">
                  <button
                    type="button"
                    className="m7-trust__nav"
                    aria-label="이전 후기"
                    onClick={() => scrollTrustReviews(-1)}
                  >
                    ◀
                  </button>
                  <div
                    ref={trustReviewsCarouselRef}
                    className="m7-trust__carousel"
                    tabIndex={0}
                    role="region"
                    aria-roledescription="캐러셀"
                    aria-label="고객 후기"
                  >
                    {trustReviews.map((item) => (
                      <article key={item.id} className="m7-trust__review-card">
                        <p className="m7-trust__stars" aria-label="별점 5점 만점">
                          ★★★★★
                        </p>
                        <blockquote className="m7-trust__quote">
                          “{item.quote}”
                        </blockquote>
                        <p className="m7-trust__attr">{item.customerName} 님의 후기</p>
                      </article>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="m7-trust__nav"
                    aria-label="다음 후기"
                    onClick={() => scrollTrustReviews(1)}
                  >
                    ▶
                  </button>
                </div>
              </div>

              <div className="m7-trust__divider" aria-hidden />

              <div className="m7-trust__block m7-trust__block--press">
                <p className="m7-trust__press-head">
                  <span className="m7-trust__press-icon" aria-hidden>
                    📰
                  </span>
                  언론에서 주목한 LG 가전구독
                </p>
                <ul className="m7-trust__logos" aria-label="언론사 로고">
                  {pressOutlets.map((name) => (
                    <li key={name} className="m7-trust__logo">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="module module-faq" aria-labelledby="m8-faq-title">
            <div className="m8-faq">
              <h2 id="m8-faq-title" className="m8-faq__title">
                FAQ
              </h2>
              <div className="m8-faq__list" role="list">
                {faqs.map((item, idx) => {
                  const opened = openedFaq === idx
                  const panelId = `m8-faq-panel-${idx}`
                  const headerId = `m8-faq-header-${idx}`
                  return (
                    <article
                      key={item.q}
                      className={`m8-faq__item ${opened ? 'is-open' : ''}`}
                      role="listitem"
                    >
                      <h3 className="m8-faq__heading">
                        <button
                          id={headerId}
                          className="m8-faq__trigger"
                          type="button"
                          aria-expanded={opened}
                          aria-controls={panelId}
                          onClick={() => setOpenedFaq(opened ? null : idx)}
                        >
                          <span className="m8-faq__trigger-inner">
                            <span className="m8-faq__q-mark" aria-hidden>
                              Q.
                            </span>
                            <span className="m8-faq__q-text">{item.q}</span>
                          </span>
                          <span
                            className="m8-faq__chevron"
                            aria-hidden
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={headerId}
                        className="m8-faq__panel"
                        hidden={!opened}
                      >
                        {opened && <p className="m8-faq__answer">{item.a}</p>}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="module module-final" aria-labelledby="m9-final-title">
            <div className="m9-final">
              <p id="m9-final-title" className="m9-final__copy">
                오늘의 가전, 오늘 바로
              </p>
              <button type="button" className="m9-final__mega-cta">
                <span className="m9-final__mega-cta-accent">0원</span>으로 구독 시작하기 ▶
              </button>
              <button type="button" className="m9-final__sub-cta">
                10초 설문 참여하고 선물 받기
              </button>
              <button type="button" className="m9-final__sub-cta">
                전화 상담 받기
              </button>
            </div>
          </section>
        </main>
      </div>

      <aside className="sticky-bar" aria-label="하단 고정 청약 바">
        <p className="sticky-bar__price">
          <span className="sticky-bar__price-label">월</span>
          <strong>20,400원~</strong>
        </p>
        <button type="button" className="sticky-cta" onClick={() => goProductDetail('air')}>
          지금 구독 신청하기
        </button>
      </aside>
    </div>
  )
}
