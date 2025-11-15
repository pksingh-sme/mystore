import MotionWrapper from '../components/ui/motion-wrapper';

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Refund Policy</h1>
        <p className="text-muted">Last updated: November 15, 2023</p>
      </MotionWrapper>

      <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Return Policy</h2>
            <p className="text-muted mb-4">
              We offer a 30-day return policy, which means you have 30 days after receiving your item 
              to request a return. To be eligible for a return, your item must be in the same condition 
              that you received it, unworn or unused, with tags, and in its original packaging.
            </p>
            <p className="text-muted">
              You'll also need to provide a receipt or proof of purchase. To start a return, you can 
              contact us at support@shopease.com. If your return is accepted, we'll send you a return 
              shipping label, as well as instructions on how and where to send your package.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Refunds</h2>
            <p className="text-muted mb-4">
              We will notify you once we've received and inspected your return, and let you know if 
              the refund was approved or not. If approved, you'll be automatically refunded on your 
              original payment method within 10 business days.
            </p>
            <p className="text-muted">
              Please note that shipping costs are non-refundable. If you receive a refund, the cost 
              of return shipping will be deducted from your refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Exchanges</h2>
            <p className="text-muted">
              The fastest way to ensure you get what you want is to return the item you have, and 
              then make a separate purchase for the new item. We don't offer direct exchanges unless 
              the item was defective or damaged when you received it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Exceptions</h2>
            <p className="text-muted mb-4">
              Certain types of items cannot be returned, like:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted mb-4">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Some health and personal care items</li>
            </ul>
            <p className="text-muted">
              We also do not accept returns for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted">
              <li>Items that were定制 or personalized</li>
              <li>Perishable goods (such as food, flowers, or plants)</li>
              <li>Hazardous materials, flammable liquids, or gases</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-muted">
              If you have any questions about our refund policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-900 dark:text-white">ShopEase Support Team</p>
              <p className="text-muted">support@shopease.com</p>
              <p className="text-muted">123 Commerce Street, Business City, BC 12345</p>
            </div>
          </section>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default RefundPolicy;