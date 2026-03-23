import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { subscribeNewsletter } from '../services/api';

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('exit_popup_shown')) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exit_popup_shown')) {
        setShow(true);
        sessionStorage.setItem('exit_popup_shown', 'true');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      await subscribeNewsletter(email);
      toast.success('🎉 Discount code sent to your email!');
      if (window.gtag) {
        window.gtag('event', 'exit_popup_conversion', {
          event_category: 'engagement',
          event_label: 'newsletter_subscribe',
        });
      }
      setShow(false);
    } catch (error) {
      // Fallback: show the code directly so lead is never lost
      toast.success('Your discount code: CASA10OFF — use it when you contact us!');
      setShow(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    if (window.gtag) {
      window.gtag('event', 'exit_popup_close', { event_category: 'engagement' });
    }
  };

  if (!show) return null;

  return (
    <div className="exit-popup-overlay" onClick={handleClose}>
      <div className="exit-popup" onClick={(e) => e.stopPropagation()}>
        <button className="exit-popup-close" onClick={handleClose}>×</button>

        <div className="exit-popup-icon">🎁</div>
        <h2>Wait! Don't Leave Empty-Handed</h2>
        <p>Get <strong>10% OFF</strong> your first interior design project + FREE 3D visualization!</p>

        <div className="discount-code">
          <small style={{ fontSize: '0.85rem', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
            Your Exclusive Code
          </small>
          <div className="code">CASA10OFF</div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email to claim"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Claiming...' : 'Claim My 10% Discount'}
          </button>
        </form>

        <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.7 }}>
          * Valid for new customers only. Cannot be combined with other offers.
        </p>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
