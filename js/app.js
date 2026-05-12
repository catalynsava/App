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

async function initializare() {
    //let json_cfg_tip_roluri = await get_cfg_tip_roluri();
    await get_cfg_localitati();

    let jsonPozitie = await get_pozitia();
    console.log(jsonPozitie);

    await loadRoluri();
    await loadButoane();
    await getRoluri();
}


initializare();
