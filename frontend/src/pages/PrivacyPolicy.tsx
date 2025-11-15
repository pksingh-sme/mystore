import MotionWrapper from '../components/ui/motion-wrapper';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="text-muted">Last updated: November 15, 2023</p>
      </MotionWrapper>

      <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
            <p className="text-muted mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              place an order, or contact customer support. This may include your name, email address, 
              phone number, shipping address, and payment information.
            </p>
            <p className="text-muted">
              We also automatically collect certain information about your device and how you interact 
              with our website, including your IP address, browser type, and browsing behavior.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and shipping updates</li>
              <li>Improve our website and customer experience</li>
              <li>Send you promotional emails (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Information Sharing</h2>
            <p className="text-muted mb-4">
              We do not sell or rent your personal information to third parties. We may share your 
              information with trusted service providers who help us operate our business, such as 
              payment processors, shipping carriers, and email service providers.
            </p>
            <p className="text-muted">
              We may also disclose your information if required by law or to protect our rights and 
              the rights of others.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Rights</h2>
            <p className="text-muted">
              You have the right to access, update, or delete your personal information. You may also 
              opt out of marketing communications at any time. To exercise these rights, please 
              contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-muted">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-900 dark:text-white">ShopEase Privacy Team</p>
              <p className="text-muted">privacy@shopease.com</p>
              <p className="text-muted">123 Commerce Street, Business City, BC 12345</p>
            </div>
          </section>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default PrivacyPolicy;