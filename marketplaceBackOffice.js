/////////////////////////////////////
/////GESTIONE CARICAMENTO PAGINE/////
/////////////////////////////////////
// const PATH_PAGINA_BACKOFFICE = "marketplaceBackOffice.html";

// function caricaMarketplaceHome() {
//   console.log("Funzione marketplaceBackOffice eseguita!");
//   caricaPagina(PATH_PAGINA_BACKOFFICE);
// }

// function caricaPagina(pagina) {
//   console.log("Caricamento pagina:", pagina);
//   window.location.replace(pagina);
// }

/////////////////////////////////////////
/////DICHIARAZIONE VARIABILI GLOBALI/////
/////////////////////////////////////////
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const tbody = document.querySelector("#tbody");
const productName = document.querySelector("#name");
const productDescription = document.querySelector("#description");
const productBrand = document.querySelector("#brand");
const productImage = document.querySelector("#imageUrl");
const productPrice = document.querySelector("#price");
const btnSalva = document.querySelector("#btnSalva");
const btnCaricaProdotto = document.querySelector('#btnCaricaProdotto')
const formCaricaProdotto = document.querySelector("#formCaricaProdotto")

/////////////////////////////////
/////GESTIONE CHIAMATE FETCH/////
/////////////////////////////////
async function fetchaProdotti() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhODY0ODRlZjFiYzAwMTVkZjVhZmYiLCJpYXQiOjE3NTA3NjMwODEsImV4cCI6MTc1MTk3MjY4MX0.6HlWZ_oJAV-t9dTDPzSUrX9d0v9csoawLruhltDs-EY",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    mostraProdotti(data);
  } catch (error) {
    console.log("Errore nella fetch:", error);
  }
}

////////////////////////////////////
/////GESTIONE CHIAMATA FUNZIONI/////
////////////////////////////////////
const path = window.location.pathname;

if (path.includes("marketplaceBackOffice.html")) {
  gestisciSpinner();
  fetchaProdotti();
}

//////////////////////////
/////GESTIONE SPINNER/////
//////////////////////////
function gestisciSpinner() {
  // Verifico se il caricamento della pagina è già terminato
  if (document.readyState === "complete") {
    // Se sì, nascondo lo spinner
    spinner.classList.add("d-none");
  } else {
    // Se la pagina non è ancora completamente caricata,
    // allora aspetta l'evento "load" (il completamento del caricamento)
    window.addEventListener("load", () => {
      // Quando il caricamento è finito, si nasconde lo spinner
      spinner.classList.add("d-none");
    });
  }
}
///////////////////////////////
/////GESTIONE RENDER FETCH/////
///////////////////////////////
function mostraProdotti(products) {
  tbody.innerHTML = "";

  const tabellaProdotti = products.map((product) => caricaRiga(product));
  tbody.append(...tabellaProdotti);
}

////////////////////////////////////
/////GESTIONE CREAZIONE TABELLA/////
////////////////////////////////////
function caricaRiga(product) {
  try {
    //Riga
    const tr = document.createElement("tr");

    //Cella nome
    const tdName = document.createElement("td");
    tdName.innerText = product.name;

    //Cella marchio
    const tdBrand = document.createElement("td");
    tdBrand.innerText = product.brand;

    //Cella img
    const tdImage = document.createElement("td");
    tdImage.innerText = product.imageUrl;
    tdImage.style.whiteSpace = 'nowrap';
    tdImage.style.overflow = 'hidden';
    tdImage.style.textOverflow = 'ellipsis';
    tdImage.style.maxWidth = '200px';

    //Cella prezzo
    const tdPrice = document.createElement("td");
    tdPrice.innerText = "€ " + product.price;

    tr.append(tdName, tdBrand, tdImage, tdPrice);
    return tr;
  } catch (error) {
    console.warn("Errore nel caricamento della riga: ", error);
  }
}

////////////////////////////////////
/////GESTIONE AGGIUNTA PRODOTTO/////
////////////////////////////////////
async function saveProduct() {
  console.log("btnSalva funziona");
  const nuovoProdotto = {
    name: productName.value,
    description: productDescription.value,
    brand: productBrand.value,
    imageUrl: productImage.value,
    price: parseFloat(productPrice.value),
  };
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhODY0ODRlZjFiYzAwMTVkZjVhZmYiLCJpYXQiOjE3NTA3NjMwODEsImV4cCI6MTc1MTk3MjY4MX0.6HlWZ_oJAV-t9dTDPzSUrX9d0v9csoawLruhltDs-EY",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuovoProdotto),
    });
    console.log(nuovoProdotto);
    if (!response.ok) throw new Error("Errore nel salvataggio prodotto");

    alert("Prodotto salvato con successo!");
    fetchaProdotti(); // ricarica la tabella
    clearForm();

  } catch (error) {
    console.log("Errore nel salvataggio: ", error);
  }
}

function clearForm() {
  productName.value = "";
  productDescription.value = "";
  productBrand.value = "";
  productImage.value = "";
  productPrice.value = "";
}

btnSalva.addEventListener("click", saveProduct);

////////////////////////////////////////////////
/////GESTIONE APERTURA FORM CARICA PRODOTTO/////
////////////////////////////////////////////////
function CaricaNuovoProdotto() {
  console.log("btnCaricaNuovoProdotto funziona")
  formCaricaProdotto.classList.toggle("d-none")
}

btnCaricaProdotto.addEventListener('click', CaricaNuovoProdotto)