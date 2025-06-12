'use client';
import { fetchList } from '@/api/helpers';
import { createNewUser } from '@/api/server-actions';
import { GlobalContext } from '@/context/GlobalContext';
import { User } from '@/types';
import { FormEvent, use, useEffect, useState } from 'react';

interface Props {
  form: string;
  setOpen: (open: boolean) => void;
  setActiveTab: (key: string) => void;
}

const AuthForm = ({ form, setOpen, setActiveTab }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setUser } = use(GlobalContext) as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const validateInputs = () => {
    const newErrors: { email: string; password: string; general: string } = {
      email: '',
      password: '',
      general: '',
    };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });
    setSuccessMessage('');

    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (form === 'login') {
        // await signInWithEmailAndPassword(auth, email, password);
        await fetchList<User[]>('Movies-Users?select=*', false).then((res) => {
          const user = res.find(
            (u) => u.email === email && u.password === password
          );
          if (user) {
            localStorage.setItem('token', user.id);
            setUser(user);
            setSuccessMessage('Login successful! Redirecting...');
            setSuccess(true);
          } else {
            setErrors((prev) => ({
              ...prev,
              general: 'Email or Password is not correct',
            }));
          }
        });
      } else if (form === 'register') {
        const userData = {
          email,
          password,
        };

        await fetchList<User[]>('Movies-Users?select=*', false).then((res) => {
          if (res.some((user) => user.email === email)) {
            setErrors((prev) => ({
              ...prev,
              email: 'User with this emails is already exists',
            }));
            return false;
          } else {
            createNewUser(userData)
              .then(() => {
                setSuccessMessage('Registration successful!');
                setSuccess(true);
              })
              .catch((err) => console.log(err));

            return;
          }
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          console.error('Authentication error:', error);
      }

      setErrors((prev) => ({ ...prev, general: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setOpen(false);
        setActiveTab('main');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, setOpen]);

  return (
    <form
      className="bg-custom-dark2 m-auto w-full p-5 md:w-4/5 md:p-10"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-10 text-start text-xl text-white">
        {form === 'login' ? 'Sign In' : 'Sign Up'}
      </h3>

      {successMessage && (
        <div className="my-6">
          <p className="text-sm text-green-500">{successMessage}</p>
        </div>
      )}

      {errors.general && !successMessage && (
        <div className="my-6">
          <p className="text-sm text-red-500">{errors.general}</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder=""
            className={`peer h-8 w-full rounded-md border-gray-300 bg-slate-700 px-2 text-sm text-white placeholder-transparent focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
          />
          <label
            htmlFor="email"
            className={`pointer-events-none absolute left-2 text-sm text-gray-600 transition-all ${email ? '-top-4.5 text-xs' : 'peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400'} peer-focus:-top-4.5 peer-focus:text-xs`}
          >
            Email
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="relative w-full">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: '' }));
            }}
            placeholder=""
            className={`peer h-8 w-full rounded-md border-gray-300 bg-slate-700 px-2 text-sm text-white placeholder-transparent focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
          />
          <label
            htmlFor="password"
            className={`pointer-events-none absolute left-2 text-sm text-gray-600 transition-all ${password ? '-top-4.5 text-xs' : 'peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400'} peer-focus:-top-4.5 peer-focus:text-xs`}
          >
            Password
          </label>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex w-full justify-end">
          <button
            type="submit"
            className={`cursor-pointer rounded-md bg-yellow-400 px-5 py-2 ${isSubmitting ? 'opacity-70' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
