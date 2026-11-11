import './style.css';

const apiUrl = 'http://localhost:3000';

type Ravintola = {
  restaurant_id: number;
  name: string;
  location: string;
  restaurant_type: string;
  restaurant_description: string;
};

const haeRavintolat = async (): Promise<Ravintola[]> => {
  const response = await fetch(`${apiUrl}/restaurants`);
  if (!response.ok) {
    throw new Error(`Virhe: ${response.status}`);
  }
  return response.json();
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
    console.log('Ruokalista, ravintola', ravintola.restaurant_id);
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

naytaRavintolat();