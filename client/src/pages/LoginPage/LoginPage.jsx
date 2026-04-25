import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setPending(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Ingresar"
      title="Volvé a donde te quedaste."
      subtitle="Tu progreso está guardado localmente, esperando."
    >
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="tu@correo.com"
            value={form.email}
            onChange={onChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
          />
        </div>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button
          type="submit"
          className={`btn-arcade magenta ${styles.submit}`}
          disabled={pending}
        >
          {pending ? '▶ Ingresando…' : '▶ Insert coin'}
        </button>

        <p className={styles.alt}>
          ¿Todavía no tenés cuenta? <Link to="/signup">Crear cuenta</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
