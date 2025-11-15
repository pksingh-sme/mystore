import MotionWrapper from '../components/ui/motion-wrapper';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionWrapper
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Shipping Policy</h1>
        <p className="text-muted">Last updated: November 15, 2023</p>
      </MotionWrapper>

      <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Shipping Methods</h2>
            <p className="text-muted mb-4">
              We offer several shipping options to meet your needs:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Standard Shipping</h3>
                <p className="text-muted text-sm">3-5 business days</p>
                <p className="text-muted mt-2">Free for orders over $50</p>
                <p className="text-muted">$5.99 for orders under $50</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Express Shipping</h3>
                <p className="text-muted text-sm">1-2 business days</p>
                <p className="text-muted mt-2">$12.99 flat rate</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Processing Time</h2>
            <p className="text-muted">
              All orders are processed within 1-2 business days. Orders are not shipped or delivered 
              on weekends or holidays. If we are experiencing a high volume of orders, shipments may 
              be delayed by a few days. Please allow additional days in transit for delivery.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Shipping Restrictions</h2>
            <p className="text-muted mb-4">
              We currently ship to the United States, Canada, and the United Kingdom. We may offer 
              shipping to additional countries in the future.
            </p>
            <p className="text-muted">
              Some products may have shipping restrictions due to size, weight, or hazardous materials. 
              These restrictions will be noted on the product page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Delivery Issues</h2>
            <p className="text-muted">
              If your package has not arrived within the expected timeframe, please contact us at 
              shipping@shopease.com with your order number. We will work with the carrier to locate 
              your package and resolve any delivery issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">International Shipping</h2>
            <p className="text-muted">
              International shipping rates and delivery times vary by destination. Customs duties 
              and taxes may apply and are the responsibility of the recipient. We are not responsible 
              for any delays caused by customs clearance.
            </p>
          </section>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default ShippingPolicy;