

// "use client";

// const testimonials = [
//   {
//     name: "Aditi Sharma",
//     role: "Verified Buyer",
//     image:
//       "https://m.media-amazon.com/images/M/MV5BZWJkYjlkNDYtNWNjMy00OTM2LTllMzUtZTM2YTM3ODBkOWEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
//     text: "The finish looks premium and the bag feels elegant for office and outings.",
//   },
//   {
//     name: "Sneha Kapoor",
//     role: "Verified Buyer",
//     image:
//       "https://media.licdn.com/dms/image/v2/D5603AQGYmHzOREErlA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725562160445?e=2147483647&v=beta&t=3gdQj6Ht3avEDLVc1ovajpRhbkTvtt7bNYc3cyBZyHY",
//     text: "Beautiful styling, spacious inside, and the design looks far more premium in person.",
//   },
//   {
//     name: "Riya Mehta",
//     role: "Verified Buyer",
//     image:
//       "https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/895x498/public/2023-05/kh_mehta_riya_022523_0085.jpg?h=97f0edea&itok=jG9FUBOO",
//     text: "A very polished everyday bag. It instantly made my outfit look more put together.",
//   },
// ];

// export default function TestimonialSection() {
//   return (
//     <section className="relative overflow-hidden bg-white">
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.03),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.04),transparent_34%)]" />

//       {/* SAME REDUCED PADDING FOR DESKTOP AND LARGE SCREEN */}
//       <div className="relative mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-4 sm:py-10 lg:max-w-full lg:px-4 lg:py-10 xl:px-4 xl:py-10 2xl:px-4 2xl:py-10">
//         <div className="mb-6 animate-[fadeUp_0.7s_ease-out]">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
//             Testimonials
//           </p>

//           <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[34px] lg:text-[38px]">
//             What customers are saying
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:gap-5 lg:grid-cols-3 lg:gap-5">
//           {testimonials.map((item, index) => (
//             <article
//               key={item.name}
//               className="group animate-[fadeUp_0.8s_ease-out] rounded-[26px] border border-neutral-200 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:p-5 lg:p-5"
//               style={{
//                 animationDelay: `${index * 120}ms`,
//                 animationFillMode: "both",
//               }}
//             >
//               <div className="flex items-center gap-4">
//                 <div className="overflow-hidden rounded-full border border-neutral-200 bg-[#f5f5f5]">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="h-[56px] w-[56px] object-cover sm:h-[62px] sm:w-[62px]"
//                   />
//                 </div>

//                 <div className="min-w-0">
//                   <h3 className="text-[16px] font-semibold text-[#111111] sm:text-[17px]">
//                     {item.name}
//                   </h3>

//                   <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
//                     {item.role}
//                   </p>
//                 </div>

//                 <span className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-[#fafafa] text-[12px] text-[#111111] transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
//                   ★
//                 </span>
//               </div>

//               <div className="mt-4 flex items-center gap-2">
//                 <span className="text-[26px] leading-none text-black/20 transition-colors duration-300 group-hover:text-black/30">
//                   “
//                 </span>

//                 <div className="h-[1px] w-10 bg-black/10 transition-all duration-300 group-hover:w-14 group-hover:bg-black/20" />
//               </div>

//               <p className="mt-3 text-[15px] leading-7 text-neutral-700 sm:text-[16px]">
//                 {item.text}
//               </p>
//             </article>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeUp {
//           from {
//             opacity: 0;
//             transform: translateY(24px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </section>
//   );
// }











// "use client";

// const testimonials = [
//   {
//     name: "Aditi Sharma",
//     role: "Verified Buyer",
//     image:
//       "https://m.media-amazon.com/images/M/MV5BZWJkYjlkNDYtNWNjMy00OTM2LTllMzUtZTM2YTM3ODBkOWEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
//     text: "The finish looks premium and the bag feels elegant for office and outings.",
//   },
//   {
//     name: "Sneha Kapoor",
//     role: "Verified Buyer",
//     image:
//       "https://media.licdn.com/dms/image/v2/D5603AQGYmHzOREErlA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725562160445?e=2147483647&v=beta&t=3gdQj6Ht3avEDLVc1ovajpRhbkTvtt7bNYc3cyBZyHY",
//     text: "Beautiful styling, spacious inside, and the design looks far more premium in person.",
//   },
//   {
//     name: "Riya Mehta",
//     role: "Verified Buyer",
//     image:
//       "https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/895x498/public/2023-05/kh_mehta_riya_022523_0085.jpg?h=97f0edea&itok=jG9FUBOO",
//     text: "A very polished everyday bag. It instantly made my outfit look more put together.",
//   },
// ];

// export default function TestimonialSection() {
//   const sliderItems = [...testimonials, ...testimonials];

//   return (
//     <section className="relative overflow-hidden bg-white">
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.03),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.04),transparent_34%)]" />

//       <div className="relative mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-4 sm:py-10 lg:max-w-full lg:px-4 lg:py-10 xl:px-4 xl:py-10 2xl:px-4 2xl:py-10">
//         <div className="mb-6 animate-[fadeUp_0.7s_ease-out]">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
//             Testimonials
//           </p>

//           <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[34px] lg:text-[38px]">
//             What customers are saying
//           </h2>
//         </div>

//         <div className="testimonial-slider overflow-hidden">
//           <div className="testimonial-track flex gap-5">
//             {sliderItems.map((item, index) => (
//               <article
//                 key={`${item.name}-${index}`}
//                 className="group testimonial-card shrink-0 rounded-[26px] border border-neutral-200 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:p-5 lg:p-5"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="overflow-hidden rounded-full border border-neutral-200 bg-[#f5f5f5]">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-[56px] w-[56px] object-cover sm:h-[62px] sm:w-[62px]"
//                     />
//                   </div>

//                   <div className="min-w-0">
//                     <h3 className="text-[16px] font-semibold text-[#111111] sm:text-[17px]">
//                       {item.name}
//                     </h3>

//                     <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
//                       {item.role}
//                     </p>
//                   </div>

//                   <span className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-[#fafafa] text-[12px] text-[#111111] transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
//                     ★
//                   </span>
//                 </div>

//                 <div className="mt-4 flex items-center gap-2">
//                   <span className="text-[26px] leading-none text-black/20 transition-colors duration-300 group-hover:text-black/30">
//                     “
//                   </span>

//                   <div className="h-[1px] w-10 bg-black/10 transition-all duration-300 group-hover:w-14 group-hover:bg-black/20" />
//                 </div>

//                 <p className="mt-3 text-[15px] leading-7 text-neutral-700 sm:text-[16px]">
//                   {item.text}
//                 </p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>

//      <style jsx>{`
//   @keyframes testimonialSlide {
//     from {
//       transform: translateX(0);
//     }
//     to {
//       transform: translateX(calc(-50% - 10px));
//     }
//   }

//   .testimonial-track {
//     width: max-content;
//     animation: testimonialSlide 18s linear infinite;
//   }

//   .testimonial-slider:hover .testimonial-track {
//     animation-play-state: paused;
//   }

//   .testimonial-card {
//     width: calc((100vw - 48px) / 1);
//     min-height: 360px;

//     /* SAME SHAPE AS YOUR IMAGE */
//     border-radius: 0 70px 0 70px;
//   }

//   .testimonial-card > div:first-child {
//     border-top-right-radius: 70px;
//   }

//   .testimonial-card > div:last-child {
//     border-bottom-left-radius: 70px;
//   }

//   @media (min-width: 768px) {
//     .testimonial-card {
//       width: calc((100vw - 60px) / 2);
//     }
//   }

//   @media (min-width: 1024px) {
//     .testimonial-card {
//       width: calc((100vw - 72px) / 3);
//     }
//   }
// `}</style>
//     </section>
//   );
// }


















"use client";

import { FaThumbsUp } from "react-icons/fa";

const testimonials = [
  {
    name: "Sneha Kapoor",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    isVerified: true,
    image: "https://media.licdn.com/dms/image/v2/D5603AQGYmHzOREErlA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725562160445?e=2147483647&v=beta&t=3gdQj6Ht3avEDLVc1ovajpRhbkTvtt7bNYc3cyBZyHY",
    text: "Beautiful styling, spacious inside, and the design looks far more premium in person. I love the classy everyday look.",
    recommends: true
  },
  {
    name: "Aditi Sharma",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    isVerified: true,
    image: "https://m.media-amazon.com/images/M/MV5BZWJkYjlkNDYtNWNjMy00OTM2LTllMzUtZTM2YTM3ODBkOWEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    text: "The finish looks premium and the bag feels elegant for office and outings. Perfect for everyday use.",
    recommends: true
  },
  {
    name: "Riya Mehta",
    location: "Delhi, India",
    rating: 4.8,
    isVerified: true,
    image: "https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/895x498/public/2023-05/kh_mehta_riya_022523_0085.jpg?h=97f0edea&itok=jG9FUBOO",
    text: "A very polished everyday bag. It instantly made my outfit look more put together. Highly recommend!",
    recommends: true
  },
  {
    name: "Priya Singh",
    location: "Pune, Maharashtra",
    rating: 5.0,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    text: "Absolutely love this bag! The quality is exceptional and it goes with everything in my wardrobe.",
    recommends: true
  },
  {
    name: "Neha Gupta",
    location: "Hyderabad, Telangana",
    rating: 4.6,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    text: "Great value for money. Spacious, stylish, and very well made. Gets compliments everywhere.",
    recommends: true
  },
  {
    name: "Kavya Reddy",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    text: "Perfect blend of style and functionality. The leather feels premium and it's very durable.",
    recommends: true
  }
];

export default function TestimonialSection() {
  const sliderItems = [...testimonials, ...testimonials];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="text-[#FFB800]">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="text-[#FFB800]">½</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-neutral-300">★</span>);
    }
    return stars;
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.02),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.03),transparent_34%)]" />

      {/* ✅ ONLY CHANGE: removed max-w */}
      <div className="relative w-full px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

        <div className="mb-8 text-center sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Testimonials
          </p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-[#111111] sm:text-[34px] lg:text-[42px]">
            What customers are saying
          </h2>
          <p className="mt-2 text-neutral-500 text-sm max-w-2xl mx-auto sm:mx-0">
            Loved by thousands of customers across India
          </p>
        </div>

        <div className="testimonial-slider overflow-hidden">
          <div className="testimonial-track flex gap-5">
            {sliderItems.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="group testimonial-card shrink-0 border border-neutral-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-neutral-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 overflow-hidden border border-neutral-100 bg-[#f8f8f8]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[52px] w-[52px] object-cover sm:h-[60px] sm:w-[60px]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] font-semibold text-[#111111] sm:text-[16px]">
                        {item.name}
                      </h3>
                      {item.isVerified && (
                        <span className="inline-flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-full">
                          <span className="text-[9px] font-medium text-green-700">Verified</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-neutral-400">
                      {item.location}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-[13px] font-semibold text-[#111111]">{item.rating}</span>
                      <div className="flex items-center gap-0.5 text-[11px]">
                        {renderStars(item.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-100 bg-[#fafafa] text-[13px] font-semibold text-[#111111] shadow-sm transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white sm:h-9 sm:w-9">
                    ★
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="font-serif text-[32px] leading-none text-black/15">
                    “
                  </span>
                  <div className="h-[1px] flex-1 bg-black/8" />
                </div>

                <p className="mt-3 text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                  {item.text}
                </p>

                {item.recommends && (
                  <div className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-neutral-50 px-2.5 py-1">
                    <FaThumbsUp className="text-[12px]" />
                    <span className="text-[10px] font-medium text-neutral-600 uppercase tracking-wide">
                      {item.name.split(" ")[0]} Recommends This Product!
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <div className="h-1.5 w-8 rounded-full bg-black"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-300"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-300"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes testimonialSlide {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 10px)); }
        }

        .testimonial-track {
          width: max-content;
          animation: testimonialSlide 22s linear infinite;
        }

        .testimonial-slider:hover .testimonial-track {
          animation-play-state: paused;
        }

        .testimonial-card {
          width: calc(100vw - 32px);
          min-height: 320px;
          border-radius: 70px 0 0 70px;
        }

        .testimonial-card > div:first-child > div:first-child {
          border-radius: 50px 0 0 50px;
        }

        @media (min-width: 640px) {
          .testimonial-card {
            width: calc((100vw - 48px) / 1.5);
          }
        }

        @media (min-width: 768px) {
          .testimonial-card {
            width: calc((100vw - 80px) / 2);
          }
        }

        @media (min-width: 1024px) {
          .testimonial-card {
            width: calc((100vw - 120px) / 3);
          }
        }

        /* ✅ FULL WIDTH FIX */
        @media (min-width: 1280px) {
          .testimonial-card {
            width: calc((100vw - 120px) / 3);
          }
        }
      `}</style>
    </section>
  );
}