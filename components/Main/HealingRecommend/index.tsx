import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import axios from 'axios'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/pagination'
import style from './HealingRecommend.module.scss'

function index() {
  const [healing, setHealing] = useState(null)
  const healingRec = async () => {
    const res = await axios.get(
      encodeURI(
        process.env.NEXT_PUBLIC_API_URL +
          `/product-list/themes?category=리조트 휴양 및 힐링&page=0&sort=`,
      ),
    )
    setHealing(res.data.data.content)
  }

  useEffect(() => {
    healingRec()
  }, [])
  if (!healing) return <>상품을 준비중입니다...</>
  return (
    <>
      <Swiper spaceBetween={10} slidesPerView={2.2}>
        {healing &&
          healing.map((heal: string, index: number) => (
            <SwiperSlide key={index}>
              <Link href={`/product-detail/${heal.id}`}>
                <img src={heal.thumbnail} alt="img" className={style.img} />
              </Link>
              <span className={style.nation}>{heal.country}</span>
              <div className={style.title}>{heal.productName}</div>
              <div className={style.hashTags}>
                <div className={style.hashTag1}>#{heal.ages} &nbsp;</div>
                <div className={style.hashTag2}>#{heal.companion}&nbsp;</div>
              </div>
              {heal.basicPrice == 0 ? (
                <div className={style.price}>가격 문의</div>
              ) : (
                <div className={style.price}>
                  {heal.basicPrice.toLocaleString('ko-KR')}원
                </div>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}

export default index
