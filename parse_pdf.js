const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Ficha Técnica bien rellenadas.pdf');

pdf(dataBuffer).then(function(data) {
    let text = data.text;
    let fichas = [];
    let blocks = text.split(/Ficha T[eé]cnica \d+\s*:/i);
    blocks.shift(); 
    
    blocks.forEach(block => {
        let ficha = {};
        let details = {};
        
        const getField = (start, end) => {
            let regex;
            if (end) {
                regex = new RegExp(`${start}\\.\\s*[^:]+:\\s*([\\s\\S]*?)(?=\\n\\s*${end}\\.)`, 'i');
            } else {
                regex = new RegExp(`${start}\\.\\s*[^:]+:\\s*([\\s\\S]*)`, 'i');
            }
            let match = block.match(regex);
            return match ? match[1].trim() : '';
        };

        details.nombre = getField(1, 2);
        details.fuente = getField(2, 3);
        details.objetivo = getField(3, 4);
        details.momento_uso = getField(4, 5);
        details.tipo_metodo = getField(5, 6);
        details.limitaciones = getField(6, 7);
        details.ejemplo = getField(7, 8);
        details.pregunta = getField(8, 9);
        details.tareas = getField(9, 10);
        details.criterios_exito = getField(10, 11);
        details.metricas = getField(11, 12);
        details.perfil_participantes = getField(12, 13);
        details.num_participantes = getField(13, 14);
        details.moderador = getField(14, 15);
        details.experiencia_ejecutor = getField(15, 16);
        details.etica = getField(16, 17);
        details.entorno = getField(17, 18);
        details.recursos = getField(18, 19);
        details.coste = getField(19, 20);
        details.tiempo_usuario = getField(20, 21);
        details.prueba_piloto = getField(21, 22);
        details.pasos = getField(22, 23);
        details.formato_informe = getField(23, 24);
        details.definicion_errores = getField(24, null);

        for (let k in details) {
             details[k] = details[k].replace(/\n/g, ' ').replace(/\s+/g, ' ');
        }

        let name = details.nombre || 'Técnica';
        name = name.replace(/\s*\(.*\)/,'').trim();
        let id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        let category = 'indagacion';
        let tipoLower = details.tipo_metodo.toLowerCase();
        if (tipoLower.includes('inspección') || tipoLower.includes('analítico') || tipoLower.includes('heurístico') || tipoLower.includes('experto')) category = 'inspeccion';
        else if (tipoLower.includes('usuario') || tipoLower.includes('experimental') || tipoLower.includes('test') || tipoLower.includes('observacional') || tipoLower.includes('laboratorio')) category = 'usuario';
        
        let subtitle = details.objetivo.split('.')[0] + '.';
        if (subtitle.length > 80) subtitle = subtitle.substring(0, 77) + '...';

        let momento = 'Evaluación Final';
        let momentoText = details.momento_uso.toLowerCase();
        if (momentoText.includes('inicial') || momentoText.includes('descubrimiento') || momentoText.includes('tempran') || momentoText.includes('formativa')) momento = 'Fase inicial';
        else if (momentoText.includes('diseño') || momentoText.includes('prototipo') || momentoText.includes('mock')) momento = 'Diseño/Prototipado';
        else if (momentoText.includes('desarrollo') || momentoText.includes('implement')) momento = 'Desarrollo';
        
        let tipo_metodo_filter = category === 'inspeccion' ? 'Inspección' : category === 'usuario' ? 'Prueba Usuario' : 'Indagación';
        
        let tipo_dato = 'Cualitativo';
        let metricas = details.metricas.toLowerCase();
        if (metricas.includes('cuantitativo') && metricas.includes('cualitativo') || metricas.includes('mixt') || metricas.includes('ambos')) tipo_dato = 'Mixto';
        else if (metricas.includes('cuantitativo')) tipo_dato = 'Cuantitativo';
        
        let num_part = '1-5';
        let num_text = details.num_participantes.toLowerCase();
        let perf_text = details.perfil_participantes.toLowerCase();
        if (num_text.includes('0') || num_text.includes('cero') || num_text.includes('expertos') || perf_text.includes('no hay') || perf_text.includes('no asisten') || perf_text.includes('no intervienen') || num_text.includes('ninguno')) num_part = '0 (Expertos)';
        else if (num_text.includes('masiva') || num_text.includes('miles') || num_text.includes('cientos') || num_text.includes('+15') || num_text.includes('15') || num_text.includes('20')) num_part = '+15';
        else if (num_text.includes('5') && num_text.includes('15')) num_part = '5-15';
        else if (num_text.includes('pequeñ') || num_text.includes('3 a 5') || num_text.includes('1 a 2') || num_text.includes('1 a 5')) num_part = '1-5';
        else num_part = '5-15';
        
        let entorno = 'Presencial';
        let entText = details.entorno.toLowerCase();
        if (entText.includes('remoto') || entText.includes('online') || entText.includes('correo') || entText.includes('línea')) entorno = 'Remoto';
        else if (entText.includes('laboratorio')) entorno = 'Laboratorio';
        else if (entText.includes('natural') || entText.includes('campo') || entText.includes('real') || entText.includes('contexto')) entorno = 'Contexto Real';
        
        let coste = 'Medio';
        let costText = details.coste.toLowerCase();
        if (costText.includes('bajo') || costText.includes('económico') || costText.includes('barato') || costText.includes('gratuito') || costText.includes('nulo')) coste = 'Bajo';
        else if (costText.includes('alto') || costText.includes('costoso') || costText.includes('fuerte')) coste = 'Alto';
        
        let tiempo = '30-60 min';
        let timeText = details.tiempo_usuario.toLowerCase();
        if (timeText.includes('poco') || timeText.includes('minuto') || timeText.includes('<30') || timeText.includes('breve') || timeText.includes('rápido')) tiempo = '<30 min';
        else if (timeText.includes('hora') || timeText.includes('semana') || timeText.includes('mes') || timeText.includes('día')) tiempo = '+60 min';
        
        let piloto = 'No';
        let pilotText = details.prueba_piloto.toLowerCase();
        if (pilotText.includes('sí') || pilotText.includes('obligatorio') || pilotText.includes('indispensable') || pilotText.includes('recomend') || pilotText.includes('necesario') || pilotText.includes('fundamental') || pilotText.includes('útil')) piloto = 'Sí';
        
        let mod = 'Sí';
        let modText = details.moderador.toLowerCase();
        let ejecutorText = details.moderador.toLowerCase();
        if (ejecutorText.includes('no') || ejecutorText.includes('autoadministra') || ejecutorText.includes('software') || ejecutorText.includes('cero') || ejecutorText.includes('nadie') || ejecutorText.includes('evaluado') || ejecutorText.includes('asíncrono')) mod = 'No';
        
        ficha.id = id;
        ficha.name = name;
        ficha.category = category;
        ficha.subtitle = subtitle;
        ficha.filters = { momento, tipo_metodo: tipo_metodo_filter, tipo_dato, num_participantes: num_part, entorno, coste, tiempo, prueba_piloto: piloto, moderador: mod };
        
        delete details.nombre;
        ficha.details = details;
        
        if (id) fichas.push(ficha);
    });
    
    let scriptJs = fs.readFileSync('script.js', 'utf8');
    let startIndex = scriptJs.indexOf('const rawTechniques = [');
    let endIndex = scriptJs.indexOf('];', startIndex) + 2;
    
    if (startIndex !== -1 && endIndex !== -1) {
        let newArrStr = 'const rawTechniques = ' + JSON.stringify(fichas, null, 4) + ';';
        scriptJs = scriptJs.substring(0, startIndex) + newArrStr + scriptJs.substring(endIndex);
        fs.writeFileSync('script.js', scriptJs);
        console.log(`Replaced with ${fichas.length} fichas.`);
    } else {
        console.error('Could not find rawTechniques array in script.js');
    }
});
