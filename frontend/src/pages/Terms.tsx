import MotionWrapper from '../components/ui/motion-wrapper';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Terms and Conditions</h1>
        <p className="text-muted">Last updated: November 15, 2023</p>
      </MotionWrapper>

      <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Acceptance of Terms</h2>
            <p className="text-muted">
              By accessing or using ShopEase, you agree to be bound by these Terms and Conditions. 
              If you disagree with any part of these terms, you may not access the website. These 
              terms apply to all visitors, users, and others who access or use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Use of Service</h2>
            <p className="text-muted mb-4">
              Our service is provided for your personal and non-commercial use. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the service or servers connected to it</li>
              <li>Attempt to gain unauthorized access to any portion of the service</li>
              <li>Transmit any worms or viruses or any code of a destructive nature</li>
              <li>Use the service in any way that violates any applicable law or regulation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Account Registration</h2>
            <p className="text-muted">
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for maintaining the confidentiality of your account and password 
              and for restricting access to your computer. You agree to accept responsibility for 
              all activities that occur under your account or password.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Intellectual Property</h2>
            <p className="text-muted">
              The service and its original content, features, and functionality are and will remain 
              the exclusive property of ShopEase and its licensors. The service is protected by 
              copyright, trademark, and other laws of both the United States and foreign countries. 
              Our trademarks and trade dress may not be used in connection with any product or service 
              without the prior written consent of ShopEase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Limitation of Liability</h2>
            <p className="text-muted">
              In no event shall ShopEase, nor its directors, employees, partners, agents, suppliers, 
              or affiliates, be liable for any indirect, incidental, special, consequential or 
              punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your access to or use of or inability to 
              access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Changes to Terms</h2>
            <p className="text-muted">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any 
              time. If a revision is material, we will provide at least 30 days' notice prior to any 
              new terms taking effect. What constitutes a material change will be determined at our 
              sole discretion. By continuing to access or use our service after any revisions become 
              effective, you agree to be bound by the revised terms.
            </p>
          </section>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default Terms;