SELECT
  ar.id
, cl.denumire
, ar.tip
, ar.volum
, ar.pozitie
, pers.id_persoana AS idPersoana
, CASE  WHEN ar.tip IN (1,2) THEN CONCAT_WS(' '
, pf.nume
, pf.initiala
, pf.prenume) WHEN ar.tip IN (3,4) THEN CONCAT_WS(' '
, pj.denumire
, fo.abreviere) END AS titular
, ar.id_adresa_rol
 FROM adrese_roluri ar
 INNER JOIN persoane pers ON ar.id_persoana = pers.id
 INNER JOIN cfg_localitati cl  ON ar.cod_cfg_localitati = cl.cod
 LEFT JOIN persoane_fizice pf  ON pers.id_persoana = pf.id AND ar.tip IN (1,2)
 LEFT JOIN persoane_juridice pj  ON pers.id_persoana = pj.id AND ar.tip IN (3,4)
 LEFT JOIN cfg_forme_organizare AS fo ON pj.cod_forma_organizare = fo.cod
 WHERE cl.denumire = 'BORCA' AND ar.tip = 1 AND ar.volum =2
 ORDER BY  cl.denumire
, ar.tip
, ar.volum
, ar.pozitie;