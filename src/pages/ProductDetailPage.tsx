import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { PRODUCT_DETAILS } from '../data/productDetails'
import '../App.css'

const DEFAULT_CARE_SERVICES = [
  { id: 'filter', icon: '🧼', title: '필터/소모품 교체' },
  { id: 'wash', icon: '🧬', title: '분해 세척' },
  { id: 'clean', icon: '✨', title: '내/외부 토탈클리닝' },
  { id: 'repair', icon: '🛡️', title: '무상 A/S' },
] as const

export default function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const detail = productId ? PRODUCT_DETAILS[productId] : undefined
  const otherProducts = Object.entries(PRODUCT_DETAILS)
    .filter(([id]) => id !== productId)
    .map(([id, product]) => ({
      id,
      name: product.fullName,
      price: product.monthly,
      imageUrl: product.imageUrl,
    }))
  const careServices = DEFAULT_CARE_SERVICES
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const imageRailRef = useRef<HTMLDivElement>(null)
  const recoRailRef = useRef<HTMLDivElement>(null)
  const galleryImages = useMemo(() => (detail ? [detail.imageUrl] : []), [detail])
  const headerTitle = detail ? `${detail.categoryLabel.split(' · ')[0]} 구독` : '상세 상품'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  useEffect(() => {
    const onScroll = () => setIsHeaderScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onImageRailScroll = () => {
    const rail = imageRailRef.current
    if (!rail) return
    const index = Math.round(rail.scrollLeft / rail.clientWidth)
    setActiveSlide(index)
  }

  const scrollReco = (dir: -1 | 1) => {
    const rail = recoRailRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>('.pd-reco__card')
    const step = card ? card.offsetWidth + 10 : 170
    rail.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  if (!detail) {
    return (
      <div className="pd-page pd-page--empty">
        <p className="pd-empty-icon" aria-hidden>
          📭
        </p>
        <p className="pd-empty">상품을 찾을 수 없습니다.</p>
        <p className="pd-empty-desc">잠시 후 다시 시도하거나 홈에서 다른 구독 제품을 확인해 주세요.</p>
        <button type="button" className="pd-cta-primary" onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>
    )
  }

  return (
    <div className="pd-page">
      <nav className={`pd-nav app-header ${isHeaderScrolled ? 'is-scrolled' : ''}`} aria-label="페이지 내비게이션">
        <button
          type="button"
          className="pd-nav__back app-header__icon-btn"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
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
        <p className="app-header__title">{headerTitle}</p>
        <button
          type="button"
          className="pd-nav__back app-header__icon-btn"
          onClick={() => navigate('/')}
          aria-label="홈"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 10.5l9-7 9 7V20a1 1 0 01-1 1h-5.5v-6h-5v6H4a1 1 0 01-1-1v-9.5z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>

      <main className="pd-main">
        <h1 className="pd-h1">{detail.headline}</h1>

        <div className="pd-image-wrap">
          <div ref={imageRailRef} className="pd-image-rail" onScroll={onImageRailScroll}>
            {galleryImages.map((img, idx) => (
              <div key={`${img}-${idx}`} className="pd-image-slide skeleton">
                <img
                  className="pd-image"
                  src={img}
                  alt={detail.fullName}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
          </div>
          <div className="pd-image-dots" aria-hidden>
            {galleryImages.map((_, idx) => (
              <span key={idx} className={idx === activeSlide ? 'is-active' : ''} />
            ))}
          </div>
        </div>

        <p className="pd-cat">{detail.categoryLabel}</p>
        <p className="pd-name">{detail.fullName}</p>

        <div className="pd-pricing">
          <section className="pd-benefit-card" aria-label="혜택 요약">
            <p className="pd-benefit-card__chip">토스 제휴 혜택</p>
            <p className="pd-benefit-card__main">월 0원으로 시작</p>
            <p className="pd-benefit-card__desc">
              첫 달 혜택 적용 시 · 일시불 대비 최대 {detail.lumpSum}원 절약
            </p>
          </section>

          <div className="pd-price-detail">
            <p className="pd-price-row">
              <span>정상 월 구독료</span>
              <strong>{detail.monthly}원</strong>
            </p>
            <p className="pd-price-row pd-price-row--discount">
              <span>토스 제휴 할인</span>
              <strong>-{Number(detail.monthly.replace(/,/g, '')).toLocaleString()}원</strong>
            </p>
            <p className="pd-price-row pd-price-row--final">
              <span>이번 달 납부금액</span>
              <strong>0원</strong>
            </p>
          </div>
        </div>

        <section className="pd-care" aria-label="이 구독에 포함된 케어서비스">
          <h2 className="pd-care__title">이 구독에 포함된 케어서비스</h2>
          <div className="pd-care__grid" role="list">
            {careServices.map((service) => (
              <article key={service.id} className="pd-care__card" role="listitem">
                <p className="pd-care__badge">✓ 포함</p>
                <p className="pd-care__icon" aria-hidden>
                  {service.icon}
                </p>
                <p className="pd-care__name">{service.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pd-reco product-showcase" aria-label="다른 구독 가능 제품">
          <div className="pd-reco__head">
            <h2 className="pd-reco__title">다른 구독 가능 제품</h2>
            <div className="pd-reco__actions">
              <button type="button" className="pd-reco__action-btn" aria-label="이전 제품" onClick={() => scrollReco(-1)}>
                ◀
              </button>
              <button type="button" className="pd-reco__action-btn" aria-label="다음 제품" onClick={() => scrollReco(1)}>
                ▶
              </button>
            </div>
          </div>
          <ProductGrid
            ref={recoRailRef}
            items={otherProducts}
            layout="rail"
            onItemClick={(id) => navigate(`/product/${id}`)}
          />
        </section>
      </main>

      <aside className="pd-fixed-cta" aria-label="하단 고정 청약 영역">
        <button
          type="button"
          className="pd-fixed-cta__primary"
          onClick={() => navigate('/subscribe/flow/0')}
        >
          구독 신청하기
        </button>
        <p className="pd-fixed-cta__info">📨 신청 시 카카오 알림톡으로 링크가 전송돼요</p>
      </aside>
    </div>
  )
}
