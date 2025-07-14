
import React from 'react';

const TermsPage = () => {
  return (
    <div className="px-4 py-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Ødds. These Terms and Conditions govern your use of our platform 
              and provide information about our service.
            </p>
            <p>
              By accessing or using Ødds, you agree to be bound by these Terms and Conditions.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our services. By using Ødds, 
              you represent and warrant that you are at least 18 years of age.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p>
              To access certain features of our platform, you may need to register for an account.
              You agree to provide accurate information during the registration process and to 
              keep your account information updated.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Responsible Gaming</h2>
            <p>
              We promote responsible participation. Set reasonable limits for yourself and 
              never participate with funds that you cannot afford to lose.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
            <p>
              You agree not to engage in any activities that may interfere with the proper 
              functioning of our platform or attempt to gain unauthorized access to any part of our service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Ødds shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages resulting from your use or 
              inability to use our platform.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p>
              We may modify these Terms and Conditions from time to time. We will notify you 
              of any material changes by posting the new Terms on our platform.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
