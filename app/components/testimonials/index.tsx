"use client"

import Image from "next/image"
import { TESTIMONIALS } from "@/lib/constants"

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Don't Take Our Word For It
        </h2>
        <p className="text-gray-600 text-center mb-12">
          See what our customers are saying about Ploomber
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 