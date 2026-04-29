import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function SubscriptionBridgePage() {
  const navigate = useNavigate()

  return (
    <div className="bridge-page-wrap">
      <div className="bridge-page">
        <section className="bridge-card" aria-label="회원 정보 입력">
          <button
            type="button"
            className="bridge-card__header"
            onClick={() => navigate(-1)}
            aria-label="이전으로"
          >
            <span className="bridge-card__header-title">회원 정보</span>
            <span className="bridge-card__chevron" aria-hidden>
              ›
            </span>
          </button>

          <div className="bridge-field">
            <p className="bridge-field__label">이름</p>
            <div className="bridge-field__line" />
          </div>

          <div className="bridge-field">
            <p className="bridge-field__label">생년월일</p>
            <div className="bridge-birth-row">
              <span>생년월일 8자리</span>
              <span className="bridge-birth-row__dash">-</span>
              <span>●●●●●●●</span>
            </div>
            <div className="bridge-field__line" />
          </div>

          <div className="bridge-field">
            <p className="bridge-field__label">이메일</p>
            <p className="bridge-field__hint">등록해 주세요.</p>
            <div className="bridge-field__line" />
          </div>

          <div className="bridge-field">
            <p className="bridge-field__label">휴대폰 번호</p>
            <div className="bridge-field__line" />
          </div>

          <div className="bridge-field">
            <p className="bridge-field__label">주소</p>
            <div className="bridge-address-row">
              <div className="bridge-field__line bridge-field__line--short" />
              <button type="button" className="bridge-zip-btn">
                우편번호 검색
              </button>
            </div>
            <div className="bridge-field__line" />
            <div className="bridge-field__line" />
          </div>

          <button type="button" className="bridge-submit-btn" onClick={() => navigate('/subscribe/flow/0')}>
            구독 신청하기
          </button>
        </section>
      </div>
    </div>
  )
}
