import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, ApiError } from '../../lib/api.js';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './CheckoutButton.module.css';

/**
 * Botón de pago. Llama a /api/billing/checkout, recibe la URL de la
 * Stripe Checkout Session y redirige el navegador para completar el pago.
 *
 * Si el usuario ya está suscrito, muestra el estado PRO en lugar del botón.
 */
export function CheckoutButton({ className = '' }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (user?.isSubscribed) {
    return (
      <span className={`btn-arcade yellow ${styles.proBadge} ${className}`} aria-disabled="true">
        ★ PRO ACTIVO
      </span>
    );
  }

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const data = await api.billing.checkout();
      if (data?.mock) {
        // Modo demo: vamos a nuestra propia página de checkout in-app.
        navigate('/checkout', { state: { amount: data.amount, currency: data.currency } });
        return;
      }
      if (!data?.url) throw new Error('No se recibió la URL de pago.');
      // Stripe real: redirige a la página hospedada de Checkout.
      window.location.href = data.url;
    } catch (err) {
      const msg =
        err instanceof ApiError && err.status === 503
          ? 'El sistema de pagos no está configurado todavía.'
          : err?.message || 'No se pudo iniciar el pago.';
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`btn-arcade magenta ${className}`}
        onClick={handleCheckout}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? '⏳ Procesando…' : '★ Hazte PRO'}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
