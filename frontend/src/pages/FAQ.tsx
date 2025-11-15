import { useState } from 'react';
import MotionWrapper from '../components/ui/motion-wrapper';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, MasterCard, and American Express, as well as PayPal and Apple Pay."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days. Express shipping options are available for faster delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on most items. Items must be in new, unused condition with all original packaging."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also view your order status in your account."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Find answers to common questions about our products, shipping, returns, and more.
        </p>
      </MotionWrapper>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <MotionWrapper
            key={index}
            className="bg-white dark:bg-background-dark rounded-2xl shadow-lg mb-4 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
              <svg 
                className={`w-5 h-5 text-muted transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-muted">
                <p>{faq.answer}</p>
              </div>
            )}
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
};

export default FAQ;