import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './SignupPage.module.css';

export function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? '/dashboard';

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setPending(true);
    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setPending(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Crear cuenta"
      title="Empezá tu ruta de cero."
      subtitle="Tres pistas, desde el primer <div> hasta arquitectura de frontend."
    >
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="¿Cómo te llamás?"
            value={form.name}
            onChange={onChange}
          />
        </div>

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

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={onChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm">Confirmar</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Repetí la contraseña"
              value={form.confirm}
              onChange={onChange}
            />
          </div>
        </div>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button
          type="submit"
          className={`btn-arcade ${styles.submit}`}
          disabled={pending}
        >
          {pending ? '▶ Creando cuenta…' : '▶ New game'}
        </button>

        <p className={styles.alt}>
          ¿Ya tenés cuenta? <Link to="/login">Ingresar</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
