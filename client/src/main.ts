import './style.css';
import {apiUrl} from './variables.ts';
import {alustaLogin} from './login.ts';
import {alustaRegister} from './register.ts';

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

alustaLogin();
alustaRegister();
naytaRavintolat();
// ---------- Sivujen vaihto (Koti / Ravintolat / Meistä) ----------

const sivut = ['koti', 'ravintolat', 'meista'];

const naytaSivu = () => {
  let sivu = location.hash.slice(1);
  if (!sivut.includes(sivu)) sivu = 'koti';

  document.querySelectorAll<HTMLElement>('[data-view]').forEach((osio) => {
    osio.classList.toggle('hidden', osio.id !== `page-${sivu}`);
  });

  document
    .querySelectorAll<HTMLButtonElement>('nav button')
    .forEach((nappi) => {
      const aktiivinen = nappi.dataset.page === sivu;
      nappi.classList.toggle('bg-blue-700', aktiivinen);
      nappi.classList.toggle('bg-gray-400', !aktiivinen);
    });
};

document.querySelectorAll<HTMLButtonElement>('nav button').forEach((nappi) => {
  nappi.addEventListener('click', () => {
    location.hash = nappi.dataset.page!;
  });
});

window.addEventListener('hashchange', naytaSivu);
naytaSivu();
