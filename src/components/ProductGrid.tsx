import { forwardRef } from 'react'

export type ProductGridItem = {
  id: string
  name: string
  price: string
  imageUrl: string
}

type ProductGridProps = {
  items: ProductGridItem[]
  onItemClick: (id: string) => void
  layout?: 'grid' | 'rail'
  listRole?: string
}

const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(function ProductGrid(
  { items, onItemClick, layout = 'grid', listRole = 'list' },
  ref,
) {
  const isRail = layout === 'rail'

  return (
    <div
      ref={ref}
      className={`product-grid ${isRail ? 'product-grid--rail' : 'product-grid--grid'}`}
      role={listRole}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="product-grid__card"
          role="listitem"
          onClick={() => onItemClick(item.id)}
        >
          <div className="product-grid__thumb">
            <img src={item.imageUrl} alt={item.name} loading="lazy" decoding="async" />
          </div>
          <div className="product-grid__body">
            <p className="product-grid__name">{item.name}</p>
            <p className="product-grid__price">
              <span>월 </span>
              <strong>{item.price}</strong>
              <span>원부터</span>
            </p>
          </div>
        </button>
      ))}
      {isRail && <span className="product-grid__rail-end" aria-hidden />}
    </div>
  )
})

export default ProductGrid
