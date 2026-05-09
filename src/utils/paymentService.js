/**
 * Razorpay Payment Service
 * Handles client-side checkout for Genius CV
 */

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const handlePayment = async (plan) => {
  const success = await loadRazorpay();
  
  if (!success) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const amount = plan.price.replace('₹', '');
  
  if (amount === '0') {
    return { success: true, message: 'Plan started successfully' };
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Use env variable or placeholder
    amount: parseInt(amount) * 100, // Amount in paise
    currency: 'INR',
    name: 'Genius CV',
    description: `${plan.name} Subscription`,
    image: '/favicon.svg',
    handler: function (response) {
      // This callback is executed after successful payment
      alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      console.log('Payment details:', response);
      // Here you would typically call your backend/Supabase to update user plan
    },
    prefill: {
      name: 'User Name',
      email: 'user@example.com',
      contact: '9999999999',
    },
    notes: {
      plan_name: plan.name,
    },
    theme: {
      color: '#7C3AED', // Purple theme to match Genius CV
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

