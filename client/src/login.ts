import {apiUrl} from './variables';

type Kayttaja = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_role: string;
  user_address: string | null;
  token: string;
};

const haeOmaTieto = async (): Promise<Omit<Kayttaja, 'token'> | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await fetch(`${apiUrl}/auth/me`, {
    headers: {Authorization: `Bearer ${token}`},
  });

  if (!response.ok) {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    return null;
  }

  const data = await response.json();
  return data.user;
};

export const kirjaudu = async (
  username: string,
  password: string,
): Promise<Kayttaja> => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  });
  if (response.status === 401) {
    throw new Error('Väärä käyttäjänimi tai salasana');
  }
  if (!response.ok) {
    throw new Error(`Virhe: ${response.status}`);
  }
  return response.json();
};

export const paivitaLoginNappi = () => {
  const loginBtn = document.querySelector<HTMLButtonElement>('#login-btn');
  const registerBtn =
    document.querySelector<HTMLButtonElement>('#register-btn');

  const nimi = localStorage.getItem('user_name');
  if (loginBtn) {
    loginBtn.textContent = nimi ? `Kirjaudu ulos (${nimi})` : 'Kirjaudu';
  }
  // piilotetaan Rekisteröidy-nappi kun ollaan kirjautuneena
  registerBtn?.classList.toggle('hidden', !!localStorage.getItem('token'));
};

export const alustaLogin = () => {
  const loginBtn = document.querySelector<HTMLButtonElement>('#login-btn');
  const loginModal = document.querySelector<HTMLDialogElement>('#login-modal');
  const loginForm = document.querySelector<HTMLFormElement>('#login-form');
  const loginVirhe =
    document.querySelector<HTMLParagraphElement>('#login-virhe');

  loginBtn?.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
      // kirjaudutaan ulos
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      paivitaLoginNappi();
    } else {
      if (loginVirhe) loginVirhe.textContent = '';
      loginModal?.showModal();
    }
  });

  document.querySelector('#login-sulje')?.addEventListener('click', () => {
    loginModal?.close();
  });

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username =
      document.querySelector<HTMLInputElement>('#login-username')?.value ?? '';
    const password =
      document.querySelector<HTMLInputElement>('#login-password')?.value ?? '';

    try {
      const kayttaja = await kirjaudu(username, password);
      localStorage.setItem('token', kayttaja.token);
      localStorage.setItem('user_name', kayttaja.user_name);
      loginForm.reset();
      loginModal?.close();
      paivitaLoginNappi();
    } catch (error) {
      if (loginVirhe) {
        loginVirhe.textContent =
          error instanceof Error ? error.message : 'Kirjautuminen epäonnistui';
      }
    }
  });

  haeOmaTieto()
    .then((kayttaja) => {
      if (kayttaja) localStorage.setItem('user_name', kayttaja.user_name);
      paivitaLoginNappi();
    })
    .catch((error) => console.error('Tokenin tarkistus epäonnistui:', error));
};
