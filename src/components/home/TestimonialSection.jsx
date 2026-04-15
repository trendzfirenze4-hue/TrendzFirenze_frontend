

"use client";

const testimonials = [
  {
    name: "Aditi Sharma",
    role: "Verified Buyer",
    image: "https://m.media-amazon.com/images/M/MV5BZWJkYjlkNDYtNWNjMy00OTM2LTllMzUtZTM2YTM3ODBkOWEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    text: "The finish looks premium and the bag feels elegant for office and outings.",
  },
  {
    name: "Sneha Kapoor",
    role: "Verified Buyer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGYmHzOREErlA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725562160445?e=2147483647&v=beta&t=3gdQj6Ht3avEDLVc1ovajpRhbkTvtt7bNYc3cyBZyHY",
    text: "Beautiful styling, spacious inside, and the design looks far more premium in person.",
  },
  {
    name: "Riya Mehta",
    role: "Verified Buyer",
    image: "https://fsi9-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/895x498/public/2023-05/kh_mehta_riya_022523_0085.jpg?h=97f0edea&itok=jG9FUBOO",
    text: "A very polished everyday bag. It instantly made my outfit look more put together.",
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.03),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.04),transparent_34%)]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:max-w-full lg:px-10 lg:py-18">
        <div className="mb-8 animate-[fadeUp_0.7s_ease-out] sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Testimonials
          </p>

          <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[34px] lg:text-[38px]">
            What customers are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className="group animate-[fadeUp_0.8s_ease-out] rounded-[26px] border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:p-7"
              style={{
                animationDelay: `${index * 120}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="overflow-hidden rounded-full border border-neutral-200 bg-[#f5f5f5]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[56px] w-[56px] object-cover sm:h-[62px] sm:w-[62px]"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[16px] font-semibold text-[#111111] sm:text-[17px]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {item.role}
                  </p>
                </div>

                <span className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-[#fafafa] text-[12px] text-[#111111] transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  ★
                </span>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="text-[26px] leading-none text-black/20 transition-colors duration-300 group-hover:text-black/30">
                  “
                </span>
                <div className="h-[1px] w-10 bg-black/10 transition-all duration-300 group-hover:w-14 group-hover:bg-black/20" />
              </div>

              <p className="mt-4 text-[15px] leading-7 text-neutral-700 sm:text-[16px]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}