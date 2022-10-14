import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import axios from 'axios'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/pagination'
import style from './GolfRecommend.module.scss'

function index() {
  const [golf, setGolf] = useState(null)
  const golfRec = async () => {
    const res = await axios.get(
      encodeURI(
        process.env.NEXT_PUBLIC_API_URL +
          `/product-list/themes?category=골프여행&page=0&sort=`,
      ),
    )
    setGolf(res.data.data.content)
  }

  useEffect(() => {
    golfRec()
  }, [])
  if (!golf) return <>상품을 준비중입니다...</>
  return (
    <>
      <Swiper spaceBetween={10} slidesPerView={2.2}>
        {golf &&
          golf.map((golf: string, index: number) => (
            <SwiperSlide key={index}>
              <Link href={`/product-detail/${golf.id}`}>
                <img src={golf.thumbnail} alt="img" className={style.img} />
              </Link>
              <span className={style.nation}>{golf.country}</span>
              <div className={style.title}>{golf.productName}</div>
              <div className={style.hashTags}>
                <div className={style.hashTag1}>#{golf.ages} &nbsp;</div>
                <div className={style.hashTag2}>#{golf.companion}&nbsp;</div>
              </div>
              {golf.basicPrice == 0 ? (
                <div className={style.price}>가격 문의</div>
              ) : (
                <div className={style.price}>
                  {golf.basicPrice.toLocaleString('ko-KR')}원
                </div>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}

export default index
