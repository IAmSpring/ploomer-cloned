"use client"

import { ImageWithFallback } from "@/app/components/ui/image-with-fallback"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { BRAND_IMAGES } from '@/lib/constants'

export function BrandsCarousel() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="brands-carousel"
        >
          {Object.entries(BRAND_IMAGES).map(([name, src]) => (
            <SwiperSlide key={name}>
              <div className="flex items-center justify-center h-20">
                <ImageWithFallback
                  src={src}
                  alt={`${name} logo`}
                  width={150}
                  height={50}
                  className="max-h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
} 