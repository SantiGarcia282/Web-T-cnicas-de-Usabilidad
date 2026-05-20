const fs = require('fs');

let scriptJs = fs.readFileSync('script.js', 'utf8');
let startIndex = scriptJs.indexOf('const rawTechniques = [');
let endIndex = scriptJs.indexOf('];', startIndex) + 2;

let jsonStr = scriptJs.substring(startIndex + 22, endIndex - 1);
let fichas = JSON.parse(jsonStr);

fichas.forEach(f => {
    let currentName = f.name.toLowerCase();
    
    if (currentName.includes('modelos predictivos')) { f.name = "Model Evaluation"; return; }
    if (currentName.includes('pruebas a/b y analíticas')) { f.name = "Métricas de Referencia"; return; }
    if (currentName.includes('pruebas de usabilidad / experimentos')) { f.name = "Usability Testing"; return; }
});

let newArrStr = 'const rawTechniques = ' + JSON.stringify(fichas, null, 4) + ';';
let newScriptJs = scriptJs.substring(0, startIndex) + newArrStr + scriptJs.substring(endIndex);
fs.writeFileSync('script.js', newScriptJs);
console.log("Done");
