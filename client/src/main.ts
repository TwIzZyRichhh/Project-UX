import './style.css';

const apiUrl = 'http://localhost:3000';

type Ravintola = {
  restaurant_id: number;
  name: string;
  location: string;
  restaurant_type: string;
  restaurant_description: string;
};

type Ruoka = {
  menu_description: string;
  food_name: string;
  price: number;
  special_diet: string;
};

type Kayttaja = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_role: string;
  user_address: string | null;
  token: string;
};

const haeRavintolat = async (): Promise<Ravintola[]> => {
  const response = await fetch(`${apiUrl}/restaurants`);
  if (!response.ok) {
    throw new Error(`Virhe: ${response.status}`);
  }
  return response.json();
};

const haeMenu = async (id: number): Promise<Ruoka[]> => {
  const response = await fetch(`${apiUrl}/restaurants/menu/${id}`);
  if (!response.ok) {
    throw new Error(`Virhe: ${response.status}`);
  }
  return response.json();
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

const kirjaudu = async (
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

const modal = document.querySelector<HTMLDialogElement>('#menu-modal');
const modalOtsikko =
  document.querySelector<HTMLHeadingElement>('#modal-otsikko');
const modalSisalto = document.querySelector<HTMLDivElement>('#modal-sisalto');

document.querySelector('#modal-sulje')?.addEventListener('click', () => {
  modal?.close();
});

modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

const avaaMenu = async (ravintola: Ravintola) => {
  if (!modal || !modalOtsikko || !modalSisalto) return;

  modalOtsikko.textContent = ravintola.name;
  modalSisalto.textContent = 'Ladataan...';
  modal.showModal();

  try {
    const menu = await haeMenu(ravintola.restaurant_id);
    modalSisalto.innerHTML = '';

    if (menu.length === 0) {
      modalSisalto.textContent = 'Ruokalistaa ei löytynyt.';
      return;
    }

    const lista = document.createElement('ul');
    lista.className = 'divide-y';

    menu.forEach((rivi) => {
      const li = document.createElement('li');
      li.className = 'py-2 flex justify-between gap-4';

      const vasen = document.createElement('div');
      const nimi = document.createElement('div');
      nimi.className = 'font-bold';
      nimi.textContent = rivi.food_name;
      const ruokavalio = document.createElement('div');
      ruokavalio.className = 'text-sm text-gray-600';
      ruokavalio.textContent = rivi.special_diet ?? '';
      vasen.append(nimi, ruokavalio);

      const hinta = document.createElement('div');
      hinta.textContent = `${rivi.price} €`;

      li.append(vasen, hinta);
      lista.appendChild(li);
    });

    modalSisalto.appendChild(lista);
  } catch (error) {
    console.error('Menun haku epäonnistui:', error);
    modalSisalto.textContent = 'Ruokalistan haku epäonnistui.';
  }
};

const luoKortti = (ravintola: Ravintola): HTMLElement => {
  const kortti = document.createElement('div');
  kortti.className = 'max-w-sm rounded overflow-hidden shadow-lg bg-gray-400';

  kortti.innerHTML = `
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">${ravintola.name}</div>
      <p class="text-gray-700 text-sm mb-2">${ravintola.location} · ${ravintola.restaurant_type}</p>
      <p class="text-gray-700 text-base">${ravintola.restaurant_description}</p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <button class="ruokalista-nappi hover:bg-blue-700 text-black-500 font-bold py-2 px-4 rounded-md border-2 border-black bg-white">
        Ruokalista
      </button>
    </div>
  `;

  const nappi = kortti.querySelector<HTMLButtonElement>('.ruokalista-nappi');
  nappi?.addEventListener('click', () => {
    avaaMenu(ravintola);
  });

  return kortti;
};

const naytaRavintolat = async () => {
  try {
    const ravintolat = await haeRavintolat();
    const sailio = document.querySelector<HTMLDivElement>('#ravintolat');
    if (!sailio) return;

    sailio.innerHTML = '';
    ravintolat.forEach((ravintola) => {
      sailio.appendChild(luoKortti(ravintola));
    });
  } catch (error) {
    console.error('Haku epäonnistui:', error);
  }
};


const loginBtn = document.querySelector<HTMLButtonElement>('#login-btn');
const loginModal = document.querySelector<HTMLDialogElement>('#login-modal');
const loginForm = document.querySelector<HTMLFormElement>('#login-form');
const loginVirhe =
  document.querySelector<HTMLParagraphElement>('#login-virhe');

const paivitaLoginNappi = () => {
  if (!loginBtn) return;
  const nimi = localStorage.getItem('user_name');
  loginBtn.textContent = nimi ? `Kirjaudu ulos (${nimi})` : 'Kirjaudu';
};

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

naytaRavintolat();