import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_DETAILS } from '../data/productDetails'
import '../App.css'

const DEFAULT_CARE_SERVICES = [
  { id: 'filter', icon: '🧰', title: '필터/소모품 교체' },
  { id: 'wash', icon: '🫧', title: '분해 세척' },
  { id: 'clean', icon: '✨', title: '내/외부 토탈클리닝' },
  { id: 'repair', icon: '🔧', title: '무상 A/S' },
] as const

const AIR_CARE_SERVICES = [
  {
    id: 'air-filter',
    title: '필터 / 소모품 교체',
    description: '성능 유지를 위해 필터·소모품을 주기적으로 교체합니다.',
    imageUrl: '/pd-air-care-reference.png',
    objectPosition: 'left top',
  },
  {
    id: 'air-cleanbooster',
    title: '클린부스터 클리닝',
    description: '공기가 토출되는 곳까지 분해해 클린부스터를 꼼꼼하게 클리닝합니다.',
    imageUrl: '/pd-air-care-reference.png',
    objectPosition: 'right top',
  },
  {
    id: 'air-wash',
    title: '분해 세척',
    description: '클린부스터의 커버, 연결부, 팬, 필터를 분리 후 스팀으로 케어합니다.',
    imageUrl: '/pd-air-care-reference.png',
    objectPosition: 'left center',
  },
  {
    id: 'air-total',
    title: '내/외부 토탈클리닝',
    description: '보이지 않는 필터 안쪽부터 제품 외부까지 꼼꼼하게 클리닝합니다.',
    imageUrl: '/pd-air-care-reference.png',
    objectPosition: 'right center',
  },
  {
    id: 'air-sensor',
    title: '공기질 센서 점검',
    description: '청정 성능을 제대로 발휘할 수 있도록 먼지 센서를 점검/관리합니다.',
    imageUrl: '/pd-air-care-reference.png',
    objectPosition: 'left bottom',
  },
  {
    id: 'air-repair',
    title: '무상 A/S',
    description: '계약기간 내 제품 고장 시, 무상 A/S를 제공합니다.',
    imageUrl: '/pd-air-care-reference.png',
    objectPosition: 'right bottom',
  },
] as const

export default function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const detail = productId ? PRODUCT_DETAILS[productId] : undefined
  const otherProducts = Object.entries(PRODUCT_DETAILS).filter(([id]) => id !== productId)
  const careServices = productId === 'air' ? AIR_CARE_SERVICES : DEFAULT_CARE_SERVICES

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  if (!detail) {
    return (
      <div className="pd-page pd-page--empty">
        <p className="pd-empty">상품을 찾을 수 없습니다.</p>
        <button type="button" className="pd-cta-primary" onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>
    )
  }

  return (
    <div className="pd-page">
      <nav className="pd-nav" aria-label="페이지 내비게이션">
        <button
          type="button"
          className="pd-nav__back"
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
      </nav>

      <main className="pd-main">
        <h1 className="pd-h1">{detail.headline}</h1>

        <div className="pd-image-wrap">
          <img
            className="pd-image"
            src={detail.imageUrl}
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        <p className="pd-cat">{detail.categoryLabel}</p>
        <p className="pd-name">{detail.fullName}</p>

        <div className="pd-pricing">
          <p className="pd-lump">
            일시불 구매 시 <del>{detail.lumpSum}원</del>
          </p>
          <p className="pd-monthly">
            <span className="pd-monthly__label">월 구독료</span>
            <strong>{detail.monthly}원</strong>
          </p>
          <p className="pd-benefit-label">최대 혜택가</p>
          <p className="pd-benefit-value">{detail.benefitMax}원</p>
        </div>

        <section className="pd-care" aria-label="이 구독에 포함된 케어서비스">
          <h2 className="pd-care__title">이 구독에 포함된 케어서비스</h2>
          <div className="pd-care__grid" role="list">
            {careServices.map((service) => (
              <article key={service.id} className="pd-care__card" role="listitem">
                {'imageUrl' in service ? (
                  <div className="pd-care__thumb">
                    <img
                      src={service.imageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: service.objectPosition }}
                    />
                  </div>
                ) : (
                  <p className="pd-care__icon" aria-hidden>
                    {service.icon}
                  </p>
                )}
                <p className="pd-care__name">{service.title}</p>
                {'description' in service && <p className="pd-care__desc">{service.description}</p>}
              </article>
            ))}
          </div>
        </section>

        <button type="button" className="pd-cta-primary">
          청약하기 ▶
        </button>
        <button type="button" className="pd-cta-secondary">
          전화 상담하기
        </button>

        <p className="pd-info">
          <span className="pd-info__icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#3182f6" strokeWidth="1.5" />
              <path
                d="M12 16v-5M12 8h.01"
                stroke="#3182f6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          청약하기 탭 시, 카카오 알림톡으로 LG닷컴 다이렉트 청약 링크가 전송됩니다.
        </p>

        <section className="pd-reco" aria-label="다른 구독 가능 제품">
          <h2 className="pd-reco__title">다른 구독 가능 제품</h2>
          <div className="pd-reco__rail" role="list">
            {otherProducts.map(([id, product]) => (
              <button
                key={id}
                type="button"
                className="pd-reco__card"
                role="listitem"
                onClick={() => navigate(`/product/${id}`)}
              >
                <div className="pd-reco__thumb">
                  <img src={product.imageUrl} alt="" loading="lazy" decoding="async" />
                </div>
                <p className="pd-reco__name">{product.fullName}</p>
                <p className="pd-reco__price">
                  월 <strong>{product.monthly}</strong>원부터
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
