# Buscador de padrón FCAG — implementación

## Archivos que subir a GitHub
- `elecciones.html` actualizado.
- `api/consultar-padron.js`.
- `private/padron.enc.json` (cifrado AES-256-GCM; no contiene padrones legibles).

**NO subir a GitHub** los PDF originales, `CLAVE_VERCEL_NO_SUBIR_A_GITHUB.txt` ni `build_padron.py` con rutas locales. No subir esta clave a un repo público.

## Configurar Vercel
En el proyecto de Vercel > Settings > Environment Variables, crear la variable `PADRON_SECRET_KEY` copiando el valor indicado en `CLAVE_VERCEL_NO_SUBIR_A_GITHUB.txt`. Aplicarla al ambiente Production y hacer un nuevo despliegue. El endpoint de Vercel debe responder en `/api/consultar-padron`.

**IMPORTANTE:** la clave no debe quedar en un archivo público ni en variables `NEXT_PUBLIC_*`/`VITE_*`. El buscador requiere hosting Vercel con Functions, no únicamente HTML estático. Antes de abrir el buscador al público, configurá protección anti-abuso por IP con Vercel WAF/rate limits: un DNI no autentica a su titular y una herramienta pública podría usarse para consultas masivas. Evitar métricas/logs de DNI.

## Interpretación configurada
- CUMPLE CONDICION / INGRESANTE CUMPLE: vota las tres elecciones según criterio informado.
- NO CUMPLE: consultar posibilidad de votar Centro (el PDF no contiene el dato de cursadas/parciales).
- INGRESANTE: estado indicado por la organización: no vota. **Revisar con Junta Electoral:** instructivos públicos de UNLP de otros años permiten a «ingresante» votar solo Centro.
- EGRESADO, registro dudoso o no encontrado: consultar fuente oficial.
- Doble empadronamiento: se agrega advertencia de que debe optar por una facultad para votar Consejos; no modifica automáticamente su habilitación FCAG.

## Fuentes y límites
Padrón FCAG 2026 y listado de doble empadronamiento adjuntos. La extracción automática obtuvo 955 condiciones claras, 9 condiciones en revisión, y 438 documentos en el padrón de otras dependencias. Se detectaron registros con texto extraído de forma irregular: **antes de publicar, contrastar con PDF y Junta Electoral**. Los documentos presentes solo en el listado de doble empadronamiento no indican por sí mismos derecho a votar en FCAG.

La UNLP y Facultad de Informática publican para 2026 la opción de doble empadronamiento en Rectorado los días 4, 5 y 6/11, de 9 a 18, antes de votar, con DNI/libreta; Informática informa además una opción anticipada digital para su propia Facultad. Confirmar si FCAG habilita esa alternativa.

## Documentación el día de la votación
La página indica DNI o libreta universitaria **físicos**; no DNI digital Mi Argentina ni foto, de acuerdo con las instrucciones brindadas para FCAG. Confirmar en Junta Electoral si se admite un documento alternativo registrado.
