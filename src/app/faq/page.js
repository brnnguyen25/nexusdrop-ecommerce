const FAQS = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders typically ship within 24 hours and arrive within 3–7 business days, depending on your location.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee on all products. If something isn't right, reach out and we'll make it right.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within the United States. International shipping is on our roadmap.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation with tracking details on your Profile page.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards through our secure checkout, powered by Stripe.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-6 space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#9CA3AF]">
          Everything you need to know before you shop.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <details
            key={i}
            className="glass-panel p-5 rounded-2xl border border-[#1F2937] cursor-pointer group"
          >
            <summary className="font-semibold text-white text-sm flex items-center justify-between">
              {faq.question}
              <span className="text-[#8B5CF6] group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
