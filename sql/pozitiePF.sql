SET @pRol = '0002732d-2dce-432b-b22a-62c89fbda14b';
SELECT  rol.id
, rol.cod_cfg_localitati AS cod_localitate
, cfg_localitati.denumire AS localitate_config
, rol.tip AS cod_tip
, cfg_tip_roluri.descriere AS descriere_tip
, rol.cod_cfg_exploatatii AS cod_exploatatie
, cfg_exploatatii.descriere as descriere_exploatatie
, rol.volum
, rol.pozitie
, rol.rol_impozite
, rol.data_declaratie
, rol.nr_inregistrare
, rol.data_inregistrare
, rol.semnat
, rol.anulat
, adrrol.id AS id_adresa_pozitie
, adrrol.cod_adresa AS cod_adresa_pozitie
, adrrol.judet
, adrrol.localitate AS localitate_adresa_pozitie
, adrrol.zona
, adrrol.strada
, adrrol.numar
, adrrol.litera
, adrrol.bloc
, adrrol.scara
, adrrol.etaj
, adrrol.apartament
, adrpf.cod_postal
, adrpf.cod_siruta
, pers.id AS id_pivot_persoana
, pf.id AS id_persoana_fizica
, pf.cnp
, pf.nume
, pf.initiala
, pf.prenume
, pf.email
, pf.telefon
, pf.buletin
, pf.id_adresa AS id_adresa_pf
, adrpf.cod_adresa AS cod_adresa_pf
, adrpf.judet as pf_judet
, adrpf.localitate as pf_localitate
, adrpf.zona as pf_zona
, adrpf.strada as pf_strada
, adrpf.numar as pf_numar
, adrpf.litera as pf_litera
, adrpf.bloc as pf_bloc
, adrpf.scara as pf_scara
, adrpf.apartament as pf_apartament
, adrpf.cod_postal as pf_cod_postal
, adrpf.cod_siruta as pf_cod_siruta
 FROM adrese_roluri rol
 INNER JOIN adrese adrrol ON rol.id_adresa_rol = adrrol.id
 INNER JOIN persoane pers ON rol.id_persoana = pers.id
 INNER JOIN persoane_fizice pf ON pers.id_persoana = pf.id
 INNER JOIN adrese adrpf ON pf.id_adresa = adrpf.id
 INNER JOIN cfg_tip_roluri ON rol.tip = cfg_tip_roluri.cod
 INNER JOIN cfg_localitati ON rol.cod_cfg_localitati = cfg_localitati.cod
 INNER JOIN cfg_exploatatii ON rol.cod_cfg_exploatatii = cfg_exploatatii.cod
 WHERE rol.id = '0002732d-2dce-432b-b22a-62c89fbda14b';