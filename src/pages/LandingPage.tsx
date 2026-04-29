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
  const [openedPressId, setOpenedPressId] = useState<string | null>(null)

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

  const hygieneMission = {
    detail: '나에게 딱 맞는 구독제품은?',
    reward: '시작하기',
  } as const

  const topPopularIds = ['wash-tower', 'styler', 'fridge', 'air'] as const
  const topPopularProducts = topPopularIds.map((id) => {
    const d = PRODUCT_DETAILS[id]
    return {
      id,
      name: d.fullName,
      price: d.monthly,
      imageUrl: d.imageUrl,
    }
  })

  const bestDetail = PRODUCT_DETAILS['aircon']
  const bestProduct = {
    id: 'aircon' as const,
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

  const pressArticles = [
    {
      id: 'asia',
      outlet: '아시아경제',
      headline: "[언박싱] 집안일 줄여주는 진짜 '이모님'…LG 가전 케어 구독 써보니",
      summary: [
        "기자가 직접 체험한 케어서비스에서 '2인 1조' 매니저가 방문해 분해·세척·스팀·살균을 체계적으로 진행했다고 소개합니다.",
        '에어컨 내부 토출구·팬·드레인판 등 셀프 청소가 어려운 영역까지 관리해 냄새와 위생 개선 체감이 컸다고 전합니다.',
        '제품 점검, 소모품 교체, 무상 A/S 등 통합 관리형 소비 수요가 커지고 있으며 LG 구독 케어가 이를 지원한다고 정리합니다.',
      ],
      sourceUrl: 'https://n.news.naver.com/mnews/article/277/0005744763?sid=101',
    },
    {
      id: 'etnews',
      outlet: '전자신문',
      headline: '[디지털라이프] 9년 만의 첫 에어컨 분해 청소…LG 구독 케어 받아보니',
      summary: [
        '9년 사용한 에어컨을 분해했을 때 내부 오염이 확인됐고, 전문 매니저의 고압 세척·건조·UV 살균으로 개선됐다고 설명합니다.',
        '프리미엄/라이트플러스 등 상품별 케어 범위 차이를 함께 안내하며, 분해 세척의 필요성을 강조합니다.',
        '정기 전문 케어가 제품 성능 유지와 위생 관리에 실질적으로 도움이 됐다는 체험 관점을 전달합니다.',
      ],
      sourceUrl: 'https://n.news.naver.com/mnews/article/030/0003394429?sid=105',
    },
    {
      id: 'joongang',
      outlet: '중앙일보',
      headline: "매일 닦아도 오염물질 찌든 우리집, 범인은 '가전 내부'에 있었다",
      summary: [
        '겉으로는 깨끗해 보여도 가전 내부 곰팡이·먼지 오염이 누적될 수 있고, 실내 공기/피부 건강에 영향을 줄 수 있다고 설명합니다.',
        "전문가 인터뷰를 통해 '분해 청소+정기 점검'의 필요성을 제시하고, 특히 알레르기·호흡기 민감군의 관리 중요성을 강조합니다.",
        'LG 구독 전문케어를 사례로 가전별 맞춤 관리(세척·살균·점검·소모품 교체) 흐름을 소개합니다.',
      ],
      sourceUrl: 'https://www.joongang.co.kr/article/25400191',
    },
    {
      id: 'jhealth',
      outlet: '헬스중앙',
      headline: '실내로 퍼지는 가전 내부 오염…전문가 케어로 관리해야',
      summary: [
        '환기가 줄어드는 계절에는 실내 오염 노출이 늘고, 내부 청소가 어려운 가전이 오염 확산의 원인이 될 수 있다고 짚습니다.',
        '세탁기·에어컨·공기청정기 등은 구조상 습기와 오염이 쌓이기 쉬워 분해 기반 전문 관리가 현실적 대안으로 제시됩니다.',
        'LG 구독 전문케어의 정기 방문 관리(클리닝·살균·점검·필터 교체)가 소비자 관리 부담을 줄인다고 정리합니다.',
      ],
      sourceUrl: 'https://jhealthmedia.joins.com/news/articleView.html?idxno=31853',
    },
  ] as const

  const openedPressArticle = pressArticles.find((item) => item.id === openedPressId) ?? null

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
              0원으로 시작하는 LG 가전 구독
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
                <span>토스에서만</span>
              </p>
              <p className="m3-banner__headline">
                토스고객 한정 특별 혜택,
                <br />
                첫 <span className="m3-banner__accent">3개월</span> 구독료 <span className="m3-banner__accent">0원!</span>
              </p>
              <p className="m3-banner__sub">
                <span className="m3-banner__accent">+</span> 토스머니 최대{' '}
                <span className="m3-banner__accent">3만원</span> 캐시백
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
                    <li>토스 고객 한정으로 첫 3개월 구독료 0원 혜택 제공 (상품/조건별 상이)</li>
                    <li>토스 결제 시 토스머니 최대 3만원 캐시백 제공</li>
                    <li>청약 완료 고객 대상 설치 우선 배정 및 알림톡 안내</li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section className="module module-mission" aria-labelledby="m4-title">
            <header className="m4-heading">
              <h2 id="m4-title" className="m4-title">
                나의 위생관리 지수를 테스트 해보세요
              </h2>
            </header>
            <button type="button" className="m4-inline-cta" onClick={() => navigate('/mission/hygiene')}>
              <span className="m4-inline-cta__text">{hygieneMission.detail}</span>
              <span className="m4-inline-cta__reward">{hygieneMission.reward}</span>
            </button>
          </section>

          <section className="module module-products product-showcase" aria-labelledby="m5-title">
            <h2 id="m5-title" className="m5-section-title">
              구독 베스트 Top 5
            </h2>
            <button
              type="button"
              className="m5-best"
              onClick={() => goProductDetail(bestProduct.id)}
              aria-label={`${bestProduct.name} 상품 상세 보기`}
            >
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
            </button>
            <ProductGrid items={topPopularProducts} onItemClick={goProductDetail} />
          </section>

          <section className="module module-trust" aria-label="신뢰 요소">
            <div className="m7-trust">
              <div className="m7-trust__block m7-trust__block--stat">
                <p className="m7-trust__stat">
                  누적 구독 고객{' '}
                  <strong className="m7-trust__stat-num">270만 계정</strong>
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
                  {pressArticles.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="m7-trust__logo"
                        onClick={() => setOpenedPressId(item.id)}
                        aria-label={`${item.outlet} 기사 요약 보기`}
                      >
                        {item.outlet}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {openedPressArticle && (
            <div className="press-modal" role="dialog" aria-modal="true" aria-labelledby="press-modal-title">
              <div className="press-modal__backdrop" onClick={() => setOpenedPressId(null)} aria-hidden />
              <div className="press-modal__content">
                <p className="press-modal__outlet">{openedPressArticle.outlet}</p>
                <h3 id="press-modal-title" className="press-modal__title">
                  {openedPressArticle.headline}
                </h3>
                <ul className="press-modal__summary">
                  {openedPressArticle.summary.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <a
                  className="press-modal__link"
                  href={openedPressArticle.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  원문 보기
                </a>
                <button type="button" className="press-modal__close" onClick={() => setOpenedPressId(null)}>
                  닫기
                </button>
              </div>
            </div>
          )}

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

        </main>
      </div>

    </div>
  )
}
