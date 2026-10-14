const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
let cache;
function load() {
  if (cache) return cache;
  if (!process.env.PADRON_SECRET_KEY) throw new Error('PADRON_SECRET_KEY faltante');
  const d=JSON.parse(fs.readFileSync(path.join(process.cwd(),'private','padron.enc.json'),'utf8'));
  const encrypted=Buffer.from(d.data,'base64');
  const tag=encrypted.subarray(encrypted.length-16);
  const cipher=crypto.createDecipheriv('aes-256-gcm',Buffer.from(process.env.PADRON_SECRET_KEY,'base64'),Buffer.from(d.nonce,'base64'));
  cipher.setAAD(Buffer.from('FCAG-padron-2026'));
  cipher.setAuthTag(tag);
  cache=JSON.parse(Buffer.concat([cipher.update(encrypted.subarray(0,-16)),cipher.final()]).toString('utf8'));
  return cache;
}
module.exports = async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method !== 'POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Método no admitido'});}
  const doc=String(req.body?.dni || '').replace(/[.\s-]/g,'');
  if(!/^[0-9]{7,9}$/.test(doc)) return res.status(400).json({error:'Ingresá un DNI válido, sin puntos.'});
  try {
    const row=load()[doc.replace(/^0+/,'')];
    if(!row) return res.status(200).json({estado:'NO_ENCONTRADO',doble:false});
    // Do not expose names, legajos, other-faculty status, or personal records.
    return res.status(200).json({estado:row.estado,doble:!!row.doble});
  } catch(error) {console.error('Error configurando consulta de padrón');return res.status(503).json({error:'La consulta todavía no está disponible. Usá los padrones oficiales.'});}
};
