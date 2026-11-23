import {apiUrl} from './variables';
import {kirjaudu, paivitaLoginNappi} from './login';

const rekisteroidy = async (
  username: string,
  email: string,
  password: string,
): Promise<void> => {
  const response = await fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, email, password}),
  });
  if (response.status === 409) {
    throw new Error('Käyttäjänimi tai sähköposti on jo käytössä');
  }
  if (!response.ok) {
    throw new Error(`Virhe: ${response.status}`);
  }
};

export const alustaRegister = () => {
  const registerBtn =
    document.querySelector<HTMLButtonElement>('#register-btn');
  const registerModal =
    document.querySelector<HTMLDialogElement>('#register-modal');
  const registerForm =
    document.querySelector<HTMLFormElement>('#register-form');
  const registerVirhe =
    document.querySelector<HTMLParagraphElement>('#register-virhe');

  registerBtn?.addEventListener('click', () => {
    if (registerVirhe) registerVirhe.textContent = '';
    registerModal?.showModal();
  });

  document.querySelector('#register-sulje')?.addEventListener('click', () => {
    registerModal?.close();
  });

  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username =
      document.querySelector<HTMLInputElement>('#register-username')?.value ??
      '';
    const email =
      document.querySelector<HTMLInputElement>('#register-email')?.value ?? '';
    const password =
      document.querySelector<HTMLInputElement>('#register-password')?.value ??
      '';

    try {
      await rekisteroidy(username, email, password);

      const kayttaja = await kirjaudu(username, password);
      localStorage.setItem('token', kayttaja.token);
      localStorage.setItem('user_name', kayttaja.user_name);

      registerForm.reset();
      registerModal?.close();
      paivitaLoginNappi();
    } catch (error) {
      if (registerVirhe) {
        registerVirhe.textContent =
          error instanceof Error
            ? error.message
            : 'Rekisteröityminen epäonnistui';
      }
    }
  });
};