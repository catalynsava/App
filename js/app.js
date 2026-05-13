async function loadRoluri()
{
    const response = await fetch("pages/roluri.html");
    const html = await response.text();
    document.getElementById("right_content").innerHTML = html;
}

async function loadButoane()
{
    const response = await fetch("pages/butoane.html");
    const html = await response.text();
    document.getElementById("middle_content").innerHTML = html;
}

async function loadCapitole(capitol)
{
    if (capitol == 1) {
        const response = await fetch("pages/pozitie.html");
        const html = await response.text();
        document.getElementById("right_content").innerHTML = html;
        await get_cfg_tip_roluri();
        await get_cfg_localitati();
        await get_cfg_exploatatii();
        let jsonPozitie = await get_pozitia();
        console.log(jsonPozitie);
        document.getElementById("selectTipPozitie").value = jsonPozitie.cod_tip;
        document.getElementById("selectCfgLocalitate").value = jsonPozitie.cod_localitate;
        document.getElementById("selectTipExploatatie").value = jsonPozitie.cod_exploatatie;
        document.getElementById("volum_input").value = jsonPozitie.volum;
        document.getElementById("pozitie_input").value = jsonPozitie.pozitie;
        document.getElementById("judet_input").value = jsonPozitie.judet;
        document.getElementById("localitate_input").value = jsonPozitie.localitate_adresa_pozitie;
        document.getElementById("zona_input").value = jsonPozitie.zona;
        document.getElementById("strada_input").value = jsonPozitie.strada;
        document.getElementById("numar_input").value = jsonPozitie.numar;
        document.getElementById("litera_input").value = jsonPozitie.litera;
        document.getElementById("bloc_input").value = jsonPozitie.bloc;
        document.getElementById("scara_input").value = jsonPozitie.scara;
        document.getElementById("etaj_input").value = jsonPozitie.etaj;
        document.getElementById("apartament_input").value = jsonPozitie.apartament;
        document.getElementById("nume_input").value = jsonPozitie.nume;
        document.getElementById("initiala_input").value = jsonPozitie.initiala;
        document.getElementById("cnp_input").value = jsonPozitie.cnp;
        document.getElementById("email_input").value = jsonPozitie.email;
        document.getElementById("telefon_input").value = jsonPozitie.telefon;
        document.getElementById("buletin_input").value = jsonPozitie.buletin;
    }
    if (capitol == 2) {
        const response = await fetch("pages/capitol1.html");
        const html = await response.text();
        document.getElementById("right_content").innerHTML = html;
    }
    
}

async function loadDetalii()
{
    const response = await fetch("pages/detalii.html");

    const html = await response.text();

    document.getElementById("right_content").innerHTML = html;
}

//opis
async function getRoluri() {

    let html = "";

    const res = await fetch("date/roluri.json");
    if (!res.ok) {
        throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
    }
    const data = await res.json();

    data.forEach((o) => {

        html += `
            <button 
                class="list-group-item list-group-item-action btn-sm">
                ${o.titular}
            </button>
        `;
    });

    document.getElementById("opisList").innerHTML = html;

    return data;
}

/* initializare */
async function get_pozitia(){
    try {
        // 2. Puneți 'await' pentru a opri codul până când serverul răspunde
        const raspuns = await fetch("date/pozitie.json");
        
        // 3. Verificați manual dacă statusul HTTP este OK (ex: 200)
        if (!raspuns.ok) {
            throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
        }
        
        // 4. Puneți 'await' pentru a extrage textul JSON formatat ca obiect/array
        const date = await raspuns.json();

        //document.getElementById("selectTipPozitie").text = date.cod_tip;
        
        // În acest punct, variabila 'date' este complet încărcată și gata de utilizat
        //console.log(date);
        return date;

    } catch (eroare) {
        // 5. Orice eroare de rețea sau de rețetă HTTP cade direct aici
        console.error("A apărut o problemă la descărcare:", eroare);
    }
};

// 1. Adăugați cuvântul 'async' înainte de funcție
async function get_cfg_tip_roluri() {
    try {
        let html = "";
        const raspuns = await fetch("date/cfg_tip_roluri.json");
        
        if (!raspuns.ok) {
            throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
        }
        const date = await raspuns.json();
        date.forEach( (item) => {
            html += `
                <option value="${item.cod}">${item.descriere}</option>
            `;
        });
        document.getElementById("selectTipPozitie").innerHTML = html;

        return date;

    } catch (eroare) {
        // 5. Orice eroare de rețea sau de rețetă HTTP cade direct aici
        console.error("A apărut o problemă la descărcare:", eroare);
    }
}
async function get_cfg_localitati() {
    try {
        let html = "";
        const raspuns = await fetch("date/cfg_localitati.json");
        if (!raspuns.ok) {
            throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
        }
        const date = await raspuns.json();
        date.forEach( (item) => {
            html += `
                <option value="${item.cod}">${item.denumire}</option>
            `;
        });
        document.getElementById("selectCfgLocalitate").innerHTML = html;
        console.log(date);
    } catch (error) {
        console.error("A apărut o problemă la descărcare:", error);
    } 
}
async function get_cfg_exploatatii() {
    try {
        let html = "";
        const raspuns = await fetch("date/cfg_exploatatii.json");
        if (!raspuns.ok) {
            throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
        }
        const date = await raspuns.json();
        date.forEach( (item) => {
            html += `
                <option value="${item.cod}">${item.descriere}</option>
            `;
        });
        document.getElementById("selectTipExploatatie").innerHTML = html;
        console.log(date);
    } catch (error) {
        console.error("A apărut o problemă la descărcare:", error);
    }
}

async function initializare() {
    //let json_cfg_tip_roluri = await get_cfg_tip_roluri();
    //await get_cfg_localitati();

    

    await loadRoluri();
    await loadButoane();
    await getRoluri();

    
}


initializare();
