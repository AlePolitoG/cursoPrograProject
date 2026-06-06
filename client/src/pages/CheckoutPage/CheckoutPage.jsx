import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './CheckoutPage.module.css';

/**
 * Página de checkout en modo DEMO (beta, sin Stripe real).
 *
 * Simula una pasarela de pago: muestra el monto, una tarjeta de prueba
 * precargada y un botón para "pagar". Al confirmar llama a
 * /api/billing/demo/confirm (activa PRO en el backend) y recarga el
 * dashboard para refrescar el estado de la sesión.
 */
export function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const amount = location.state?.amount ?? 30;
  const currency = (location.state?.currency ?? 'usd').toUpperCase();
  const priceLabel = `$${amount} ${currency}`;

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  // Tarjeta de prueba precargada — esto NO procesa ningún cobro real.
  const [card, setCard] = useState({
    number: '4242 4242 4242 4242',
    exp: '12 / 34',
    cvc: '123',
    name: user?.email ?? '',
  });

  const onChange = (e) => setCard((c) => ({ ...c, [e.target.name]: e.target.value }));

  // Si ya es PRO, no tiene sentido volver a pagar.
  if (user?.isSubscribed) {
    return (
      <div className={`${styles.page} glass-panel`}>
        <h1 className={styles.title}>Ya sos PRO ★</h1>
        <p className={styles.muted}>Tu suscripción está activa.</p>
        <button type="button" className="btn-arcade" onClick={() => navigate('/dashboard')}>
          ▶ Volver al dashboard
        </button>
      </div>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await api.billing.confirmDemo();
      // Recarga completa para que AuthContext re-hidrate isSubscribed=true.
      window.location.href = '/dashboard?checkout=success';
    } catch (err) {
      setError(err?.message || 'No se pudo completar el pago.');
      setPending(false);
    }
  }

  return (
    <div className={`${styles.page} glass-panel`}>
      <span className={styles.demoTag}>● MODO DEMO — sin cobro real</span>

      <header className={styles.head}>
        <p className={styles.eyebrow}>◆ CHECKOUT · CURSO PRO</p>
        <h1 className={styles.title}>Desbloquear acceso completo</h1>
        <p className={styles.amount}>
          {priceLabel}
          <span className={styles.period}> / mes</span>
        </p>
      </header>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="card-name">Nombre en la tarjeta</label>
          <input id="card-name" name="name" value={card.name} onChange={onChange} autoComplete="off" />
        </div>

        <div className={styles.field}>
          <label htmlFor="card-number">Número de tarjeta</label>
          <input id="card-number" name="number" value={card.number} onChange={onChange} inputMode="numeric" autoComplete="off" />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="card-exp">Vence</label>
            <input id="card-exp" name="exp" value={card.exp} onChange={onChange} autoComplete="off" />
          </div>
          <div className={styles.field}>
            <label htmlFor="card-cvc">CVC</label>
            <input id="card-cvc" name="cvc" value={card.cvc} onChange={onChange} inputMode="numeric" autoComplete="off" />
          </div>
        </div>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button type="submit" className={`btn-arcade magenta ${styles.pay}`} disabled={pending} aria-busy={pending}>
          {pending ? '⏳ Procesando…' : `▶ Pagar ${priceLabel}`}
        </button>

        <button
          type="button"
          className={`btn-arcade ${styles.cancel}`}
          onClick={() => navigate('/dashboard')}
          disabled={pending}
        >
          Cancelar
        </button>

        <p className={styles.disclaimer}>
          Pago simulado para la beta. No se procesa ninguna tarjeta ni se cobra dinero real.
        </p>
      </form>
    </div>
  );
}
