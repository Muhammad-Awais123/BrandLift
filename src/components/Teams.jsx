import React from 'react'
import { teamData } from '../assets/assets'

export default function TeamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Team
          </h2>
          <p className="mt-3 text-gray-600 text-base max-w-xl mx-auto">
            The people who shape ideas, build strategies, and drive BrandLift forward.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={member.image}
                    className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-white
                               group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 rounded-full blur-lg opacity-0 
                                  bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 
                                  group-hover:opacity-30 transition-all duration-500">
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium text-sm mt-1">
                  {member.title}
                </p>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  Supporting BrandLift with creativity, strategy, and dedication.
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
