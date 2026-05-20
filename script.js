/**
 * Lógica principal de la aplicación SPA "Técnicas de Usabilidad"
 */

// Función para eliminar tildes y acentos
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// --- 1. DATOS DE TÉCNICAS (Generador dinámico para completitud visual) ---

// Función para autocompletar campos faltantes en base a un formato estándar de 24 puntos
const completeTechniqueInfo = (tech) => {
    const defaultDetails = {
        fuente: "Bibliografía estándar de usabilidad (ej. Nielsen, Norman).",
        objetivo: "Mejorar la calidad de interacción detectando problemas de diseño.",
        momento_uso: tech.filters?.momento || "Cualquier momento del ciclo de vida.",
        tipo_metodo: tech.filters?.tipo_metodo || "Evaluación de usabilidad.",
        limitaciones: "Requiere cierta curva de aprendizaje y tiempo de análisis.",
        ejemplo: `Aplicación de ${tech.name} para optimizar un flujo de carrito de compras.`,
        pregunta: "¿Cumple el sistema con los objetivos de eficiencia y satisfacción?",
        tareas: "1. Preparación. 2. Selección de métricas. 3. Ejecución. 4. Análisis.",
        criterios_exito: "Obtención de datos claros que fundamenten cambios de diseño.",
        metricas: tech.filters?.tipo_dato === 'Cuantitativo' ? "Tiempo, Tasa de éxito, Errores" : "Comentarios, Observaciones, Patrones de uso",
        perfil_participantes: "Representativos del público objetivo o evaluadores expertos.",
        num_participantes: tech.filters?.num_participantes || "Depende del contexto.",
        moderador: tech.filters?.moderador === 'Sí' ? "Imprescindible para guiar la prueba." : "No requerido.",
        experiencia_ejecutor: "Conocimientos intermedios en métodos UX.",
        etica: "Privacidad de datos y consentimiento informado si hay usuarios.",
        entorno: tech.filters?.entorno || "Adaptable (remoto o presencial).",
        recursos: "Dispositivo de prueba, software de registro, guiones.",
        coste: tech.filters?.coste || "Variable.",
        tiempo_usuario: tech.filters?.tiempo || "Aproximadamente 30-60 min.",
        prueba_piloto: tech.filters?.prueba_piloto === 'Sí' ? "Recomendada encarecidamente." : "Opcional.",
        pasos: "1. Definir alcance. 2. Preparar entorno. 3. Ejecutar. 4. Consolidar informe.",
        formato_informe: "Documento resumen con hallazgos categorizados por severidad.",
        definicion_errores: "Cualquier obstáculo que impida al usuario lograr su meta."
    };

    return {
        ...tech,
        details: { ...defaultDetails, ...(tech.details || {}) }
    };
};

// Base de datos de técnicas (Clasificadas según solicitud)
const rawTechniques = [
    {
        "id": "an-lisis-heur-stico",
        "name": "Análisis Heurístico",
        "category": "inspeccion",
        "subtitle": "Evaluar si los elementos de la interfaz de usuario conforman principios proba...",
        "filters": {
            "momento": "Diseño/Prototipado",
            "tipo_metodo": "Inspección",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "0 (Expertos)",
            "entorno": "Remoto",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Interaction Design\",.",
            "objetivo": "Evaluar si los elementos de la interfaz de usuario conforman principios probados de usabilidad (heurísticas) para predecir problemas de uso,.",
            "momento_uso": "Se puede utilizar en cualquier etapa de un proyecto de diseño, funcionando bien como complemento o alternativa a las pruebas con usuarios,.",
            "tipo_metodo": "Método de inspección de usabilidad analítico, predictivo y sin participación de usuarios,.",
            "limitaciones": "A veces pasa por alto problemas graves que solo los usuarios reales encontrarían, y puede provocar \"falsas alarmas\" identificando problemas que no existen,. Requiere de evaluadores muy expertos para ser realmente eficaz.",
            "ejemplo": "Analizar el proceso para \"agregar amigos\" en una red social revisando si el sistema previene errores o comunica bien su estado.",
            "pregunta": "¿Se apega el sistema a las reglas de oro de interfaz, comunicando correctamente información y previniendo la carga de memoria a corto plazo?,.",
            "tareas": "Los evaluadores revisan los elementos de la interfaz de forma independiente (generalmente en dos pasadas) comparándolos contra las heurísticas.",
            "criterios_exito": "Identificar problemas de usabilidad, categorizarlos por severidad y sugerir soluciones constructivas,.",
            "metricas": "Produce listas cualitativas de hallazgos y datos cuantitativos basados en el cálculo del porcentaje de problemas identificados o promedios de severidad,.",
            "perfil_participantes": "No hay usuarios; es llevado a cabo por evaluadores, consultores de diseño o investigadores de UX.",
            "num_participantes": "Tradicionalmente de 3 a 5 evaluadores, ya que esto detecta hasta el 75% de los problemas.",
            "moderador": "Expertos en factores humanos e interacción.",
            "experiencia_ejecutor": "Alto. Los investigadores con gran experiencia identifican más y mayores problemas reales que los novatos,.",
            "etica": "No involucra reclutar sujetos humanos externos, eludiendo problemas complejos de privacidad.",
            "entorno": "Remoto, asíncrono o presencial en cualquier oficina.",
            "recursos": "Prototipos, un marco de heurísticas (como las 10 de Nielsen) y directrices de evaluación estructuradas,.",
            "coste": "Relativamente bajo comparado a movilizar usuarios reales.",
            "tiempo_usuario": "El evaluador invierte de una a dos horas revisando de manera independiente el producto.",
            "prueba_piloto": "No es aplicable.",
            "pasos": "1. Sesión informativa sobre el objetivo; 2. Periodo de evaluación independiente (primera pasada para entender flujo, segunda para detalles); 3. Sesión de debate (debriefing) en equipo para acordar problemas y soluciones,,.",
            "formato_informe": "Recomendaciones textuales y diagramas de radar para representar medias visuales del desempeño de la usabilidad hallado,.",
            "definicion_errores": "El error es una desviación teórica del diseño frente al principio heurístico; sin intervención correctiva sobre usuarios humanos."
        }
    },
    {
        "id": "modelos-predictivos-ley-de-fitts",
        "name": "Model Evaluation",
        "category": "inspeccion",
        "subtitle": "Proporcionar estimaciones matemáticas sobre la eficiencia de un sistema predi...",
        "filters": {
            "momento": "Diseño/Prototipado",
            "tipo_metodo": "Inspección",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "0 (Expertos)",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\",,.",
            "objetivo": "Proporcionar estimaciones matemáticas sobre la eficiencia de un sistema prediciendo el tiempo necesario para alcanzar y seleccionar un objetivo (como un botón) en pantalla,.",
            "momento_uso": "Durante las fases de diseño sin necesidad de esperar a tener un prototipo avanzado o funcional y antes de llamar a usuarios reales,.",
            "tipo_metodo": "Método predictivo cuantitativo, analítico y matemático.",
            "limitaciones": "Posee un alcance muy estrecho y preciso (solo analiza velocidades y trayectos), lo cual impide medir experiencias subjetivas, emocionales o la usabilidad integral de aprendizaje,.",
            "ejemplo": "Calcular si las etiquetas de una barra de herramientas en Microsoft Word hacen que el \"objetivo\" del botón sea suficientemente grande para ser alcanzado más rápido con el ratón.",
            "pregunta": "¿Cuál es la secuencia u organización de teclas/iconos que minimiza el tiempo de selección y previene la sobre- alineación accidental?,.",
            "tareas": "Cuantificar distancias entre controles y calcular índices matemáticos.",
            "criterios_exito": "El diseño matemático alcanza una eficiencia óptima predicha superior a las alternativas evaluadas.",
            "metricas": "Exclusivamente cuantitativo; medidas predictivas de tiempo, tamaño y distancia,.",
            "perfil_participantes": "No intervienen participantes.",
            "num_participantes": "Cero.",
            "moderador": "Diseñadores de interacción e investigadores de HCI.",
            "experiencia_ejecutor": "Medio-Alto (requiere conocimiento del diseño ergonómico y fórmulas).",
            "etica": "N/A, prescinde del uso de sujetos de investigación humanos.",
            "entorno": "Oficina del diseñador o simulaciones remotas.",
            "recursos": "Maquetas de la interfaz y las fórmulas logarítmicas de la Ley de Fitts.",
            "coste": "Muy bajo.",
            "tiempo_usuario": "Rápido de generar predicciones numéricas en el escritorio.",
            "prueba_piloto": "N/A.",
            "pasos": "Definir la ubicación y ancho de los botones en el diseño; aplicar la ecuación analizando la relación velocidad-precisión; usar la información para rediseñar aglomeraciones y prevenir errores de clic,.",
            "formato_informe": "Estimaciones numéricas de eficiencia y guías de separación espacial de elementos,.",
            "definicion_errores": "El modelo predice que un botón pequeño generará un error (\"overshooting\"); se rediseña sin intervenir a usuarios reales."
        }
    },
    {
        "id": "recorrido-cognitivo-recorrido-guiado",
        "name": "Recorrido Guiado",
        "category": "inspeccion",
        "subtitle": "Simular el proceso de resolución de problemas en la mente del usuario para ev...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Inspección",
            "tipo_dato": "Cualitativo",
            "num_participantes": "1-5",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\",.",
            "objetivo": "Simular el proceso de resolución de problemas en la mente del usuario para evaluar el nivel de facilidad de aprendizaje de un sistema (ease of learning) explorando un diseño,.",
            "momento_uso": "Desde representaciones tempranas (mock- ups) hasta productos maduros para predecir deficiencias antes de iniciar un ciclo de pruebas con usuarios.",
            "tipo_metodo": "Técnica de inspección analítica grupal y predictiva.",
            "limitaciones": "Analizar grandes tareas resulta tedioso y largo, a menudo causando que los diseñadores se pongan a la defensiva sobre su trabajo y se sumerjan en justificaciones teóricas innecesarias,.",
            "ejemplo": "Examinar los pasos en la pantalla de una tableta clínica para ver si un paciente de primera vez podrá intuir dónde presionar \"Registro\".",
            "pregunta": "¿Entenderá el usuario qué hacer para la tarea, verá la acción necesaria, y comprenderá el efecto tras la retroalimentación de la interfaz?,.",
            "tareas": "Identificar los usuarios y elaborar una secuencia escrita detallada de todas las interacciones paso a paso que el usuario debe ejecutar para su objetivo.",
            "criterios_exito": "El comité acuerda conjuntamente respuestas positivas sobre si la interfaz hace obvia cada sub-tarea.",
            "metricas": "Datos cualitativos (documentación de supuestos, comentarios de incidentes sutiles y fallos en el diseño).",
            "perfil_participantes": "No participan sujetos reales, es emulado por evaluadores expertos en lugar del usuario.",
            "num_participantes": "Grupo de análisis pequeño (diseñador y uno o más investigadores UX).",
            "moderador": "Un líder de sesión investigador UX.",
            "experiencia_ejecutor": "Alto, requiere estructurar la reunión, cortar justificaciones a la defensiva e interpretar perfiles cognitivos.",
            "etica": "N/A, evita el uso de población real.",
            "entorno": "Oficina o sala de reuniones con el equipo.",
            "recursos": "Un prototipo o descripción, guion de tareas representativas y un formulario estandarizado de registro de preguntas,.",
            "coste": "Bajo.",
            "tiempo_usuario": "Una sesión de grupo optimizada consume alrededor de 2.5 horas.",
            "prueba_piloto": "No requerida por ser un proceso analítico analizado en escritorio.",
            "pasos": "1. Definir perfil, escenarios y modelo; 2. Reunir al equipo evaluador; 3. Caminar cada paso preguntando teóricamente si el usuario verá e interpretará la acción; 4. Registrar supuestos; 5. Revisar el diseño para arreglar deficiencias,,,.",
            "formato_informe": "Una síntesis en hoja o tabla formal que detalla el paso fallido, la causa y un sumario para correcciones de rediseño.",
            "definicion_errores": "Un \"error\" es que el grupo dictamine que la acción no será obvia; no hay intervenciones ni ayudas ya que se realiza en un debate teórico."
        }
    },
    {
        "id": "pruebas-a-b-y-anal-ticas",
        "name": "Métricas de Referencia",
        "category": "indagacion",
        "subtitle": "Optimizar y medir variables exactas de un producto experimentando remotamente...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "+15",
            "entorno": "Remoto",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Interaction Design\",,.",
            "objetivo": "Optimizar y medir variables exactas de un producto experimentando remotamente con métricas de comportamiento reales para tomar decisiones objetivas de diseño (ej. mejorar retención),.",
            "momento_uso": "Cuando un producto o sitio web se encuentra en vivo y tiene un volumen funcional masivo de tráfico para poder monitorearlo,.",
            "tipo_metodo": "Técnica de observación indirecta automatizada, un experimento estadísticamente controlado (en A/B) o correlacional (Analytics puro),.",
            "limitaciones": "Los datos cuantitativos muestran \"qué\" hicieron las personas (ej. cuántos abandonaron), pero omiten la razón cualitativa (\"por qué\" lo hicieron). Una prueba A/B requiere de habilidades y programación experimental robusta,,.",
            "ejemplo": "Implementar dos variantes estéticas para un mismo botón de compra y ver cuál diseño genera mayores clics e incrementa ventas sin impactar otras áreas.",
            "pregunta": "¿Produce la modificación de la Interfaz A un rendimiento superior verificable estadísticamente frente al diseño de referencia B?.",
            "tareas": "El usuario ejecuta operaciones de uso natural en el sistema sin intervención manual ni tareas prescritas formalmente por un observador.",
            "criterios_exito": "El sistema registra si la acción meta del análisis (como un clic final o finalizar una inscripción) ocurre dentro de un marco temporal de la sesión,.",
            "metricas": "Gran volumen de datos crudos cuantitativos (tasas, clics, rebotes, permanencia, páginas visitadas),.",
            "perfil_participantes": "Población completa de consumidores, clientes reales dispersos demográficamente,.",
            "num_participantes": "Requiere de muestras extremadamente masivas (miles o cientos de miles de individuos simultáneos) para validar la significancia,.",
            "moderador": "Sistemas de software remoto de inyección analítica (no hay moderación humana directa),.",
            "experiencia_ejecutor": "Alto en métodos matemáticos; requiere dominio en ingeniería de software, pruebas t (t-tests) y diseño de datos,.",
            "etica": "Sensibilidad extremadamente alta sobre la privacidad. Las pruebas ciegas plantean un debate de consentimiento informado pues los usuarios no están conscientes de estar siendo rastreados como sujetos de experimentos.",
            "entorno": "Exclusivamente online, sin localización física,.",
            "recursos": "Herramientas especializadas como Google Analytics u otras arquitecturas robustas de software para registrar logs,.",
            "coste": "Relativamente económico para la empresa por volumen general, aunque las firmas contratan a consultores expertos de datos costosos,.",
            "tiempo_usuario": "El registro asíncrono suele requerir despliegues de recolección continuos de semanas o meses.",
            "prueba_piloto": "Implica asegurar antes del despliegue en vivo que el código funciona y particiona limpidamente a los usuarios del segmento.",
            "pasos": "Determinar una métrica variable clave; crear diseño A y variante B; configurar software para asignar los diseños al azar a usuarios entrantes; capturar el registro remoto; concluir usando pruebas de significancia,.",
            "formato_informe": "Tableros visuales interactivos (dashboards), gráficos y tablas numéricas complejas,.",
            "definicion_errores": "Si un participante no completa el flujo deseado en la versión desplegada, queda almacenado como parte del error estadístico; los investigadores jamás intervienen remotamente."
        }
    },
    {
        "id": "creaci-n-de-cuestionarios",
        "name": "Creación de Cuestionarios",
        "category": "indagacion",
        "subtitle": "Responder preguntas estructuradas sobre el contexto demográfico, reacciones y...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "+15",
            "entorno": "Remoto",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "Sí",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\",,.",
            "objetivo": "Responder preguntas estructuradas sobre el contexto demográfico, reacciones y recabar opiniones evaluativas a escala mediante grupos amplios,.",
            "momento_uso": "Desde el entendimiento temprano de requisitos, hasta ser distribuido inmediatamente después de probar productos sumativamente,.",
            "tipo_metodo": "Técnica de recogida de información tanto cuantitativa como cualitativa de tipo asíncrona,.",
            "limitaciones": "Generalmente sufren de tasas bajas de devolución (response rates) y si no se diseñan muy cuidadosamente, brindan datos deficientes o sesgados,.",
            "ejemplo": "Enviar por correo un formulario online sobre las percepciones de navegabilidad en un nuevo software contable a una base de clientes global.",
            "pregunta": "¿Cuáles son las opiniones consensuadas o las particularidades de preferencias funcionales en el segmento amplio del producto?.",
            "tareas": "Lectura de las instrucciones, selección de opciones fijas o la formulación de textos por el usuario de manera solitaria.",
            "criterios_exito": "Lograr que el participante reflexione genuinamente y complete la herramienta hasta la fase final sin frustrarse y abandonarla.",
            "metricas": "Produce respuestas contables con escalas numéricas y matrices cualitativas de campos libres de respuesta,.",
            "perfil_participantes": "Usuarios representativos extraídos de la población real o paneles seleccionados.",
            "num_participantes": "Amplio rango, desde docenas a cientos o miles (recolecciones de encuestas extensas o survey datasets).",
            "moderador": "Se ejecutan indirectamente y se responden sin investigador presencial (asíncronas).",
            "experiencia_ejecutor": "Alto nivel al plantear el diseño, un sesgo de redacción genera respuestas totalmente inútiles.",
            "etica": "Debe especificarse previamente la política de cómo se usarán los datos agregados, y asegurar siempre un almacenamiento blindado bajo encriptación en los servidores.",
            "entorno": "Generalmente online o enviado por vía de correo, y opcionalmente basado en hojas de papel de manera deslocalizada,.",
            "recursos": "Herramientas de software en la web para distribución masiva.",
            "coste": "Relativamente de muy bajos requerimientos o exigencias en presupuesto comparado al tamaño de alcance global garantizado.",
            "tiempo_usuario": "Pocos minutos por bloque (para evitar fatiga de cuestionario).",
            "prueba_piloto": "Es obligatorio para aclarar y afinar el lenguaje para que las personas no duden frente a respuestas ambiguas o dobles negativos.",
            "pasos": "1. Fijar objetivos numéricos, 2. Generar ítems cerrados/abiertos; 3. Limpiar con un piloto; 4. Lanzar remota a la lista; 5. Recuperar la data y depurarla por fallos (\"data cleansing\") antes del análisis de frecuencias de respuestas,,.",
            "formato_informe": "Visualizaciones descriptivas o de porcentajes y listado resumido de requerimientos extraídos.",
            "definicion_errores": "No se monitorizan equivocaciones del uso de pantalla ni hay contacto presencial; un fallo metodológico se contabiliza como campos inválidos."
        }
    },
    {
        "id": "entrevistas-personales",
        "name": "Entrevistas Personales",
        "category": "indagacion",
        "subtitle": "Extraer relatos narrativos profundos sobre cómo reaccionan las personas a un ...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "1-5",
            "entorno": "Remoto",
            "coste": "Alto",
            "tiempo": "+60 min",
            "prueba_piloto": "Sí",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Interaction Design\",,.",
            "objetivo": "Extraer relatos narrativos profundos sobre cómo reaccionan las personas a un nuevo diseño, capturando la raíz y racionalización natural detrás de su contexto en lugar de solo asumir sus problemas,.",
            "momento_uso": "Primordialmente para el proceso de descubrimiento inicial (requerimientos) o exploraciones tempranas buscando comprender la vida diaria del usuario,.",
            "tipo_metodo": "Forma de recolección empírica de datos verbales directa, exploratoria y mayoritariamente cualitativa.",
            "limitaciones": "Fenómeno de dilema dual: \"lo que dice y lo que hace\"; la persona contesta cosas para complacer al facilitador, lo que puede provocar que los datos narrados no correspondan a sus verdaderos actos posteriores,.",
            "ejemplo": "Hacer videollamada por Zoom con un usuario y usar técnicas de sondeo para preguntarle en profundidad por qué no comprendió el botón de compra.",
            "pregunta": "¿Cuáles son las particularidades detalladas de las rutinas, percepciones subjetivas, experiencias y motivaciones exactas del sujeto con respecto al escenario de interacción de diseño planteado?,.",
            "tareas": "El formato dicta entablar una conversación, ya sea libre sin orden predefinido (no estructurada) o sujeta a guías (estructurada).",
            "criterios_exito": "El éxito lo denota crear un ambiente fluido donde el usuario no se cierre, ofreciendo observaciones sin que perciba inducciones artificiales.",
            "metricas": "Produce grandes corpus transcritos y cualitativos detallando actitudes.",
            "perfil_participantes": "Usuarios elegidos de manera representativa al demográfico.",
            "num_participantes": "Grupo pequeño de muestra para profundización individual intensiva.",
            "moderador": "Un evaluador humano (investigador de UX) entrenado en orquestar interacciones sociales o diálogo,.",
            "experiencia_ejecutor": "Alto. Requiere paciencia, lectura gestual y evitar mostrar prejuicios, controlando con eficacia las \"preguntas guiadas\",.",
            "etica": "Es esencial cuidar de la incomodidad personal o la sensibilidad que puedan disparar los temas privados tocados y conseguir aval escrito de las transcripciones confidenciales de voz y video digital.",
            "entorno": "Remoto (Webex / Zoom), laboratorios formales o en terreno,.",
            "recursos": "Un guion preliminar o notas, cámaras web o de audio de alta resolución y programas de transcripción textual de audios a base digital,.",
            "coste": "Relativamente de costo y recursos humanos medio-altos a causa del extenso esfuerzo invertido tras terminar transcribiendo palabra a palabra.",
            "tiempo_usuario": "Requiere largos fragmentos en torno a la hora o una ventana considerable por sujeto.",
            "prueba_piloto": "De carácter fundamental para depurar que las preguntas estructuradas presentadas resulten precisas y claras antes de desplegarlas en el proyecto general.",
            "pasos": "1) Establecer ambiente seguro, 2) Hacer fluir las temáticas generales, 3) Interrogar sobre los contextos concretos prestando máxima alerta y neutralidad a los resultados 4) Documentar notas y extraer temas cualitativos a través de esquemas de codificación (\"coding\"),,.",
            "formato_informe": "Matriz destilada con narrativas temáticas categorizadas acompañadas de selecciones exactas de las mejores citas de voz originadas para apoyar afirmaciones,.",
            "definicion_errores": "El investigador es intervencionista total, reestructurando con sondas cada vez que detecta malentendidos durante la plática."
        }
    },
    {
        "id": "pruebas-de-usabilidad-experimentos",
        "name": "Usability Testing",
        "category": "usuario",
        "subtitle": "Comprobar sistemáticamente si los usuarios típicos comprenden un sistema y al...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Prueba Usuario",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Laboratorio",
            "coste": "Alto",
            "tiempo": "<30 min",
            "prueba_piloto": "Sí",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Interaction Design\",,.",
            "objetivo": "Comprobar sistemáticamente si los usuarios típicos comprenden un sistema y alcanzan las métricas de eficacia sin experimentar frustraciones graves bajo escenarios controlados,.",
            "momento_uso": "Desde modelos formativos tempranos (prototipados) hasta fases de sumativas para productos o actualizaciones de aplicaciones antes de ser desplegadas públicamente,.",
            "tipo_metodo": "Examen observacional estricto con recolección robusta en la que rigen recuentos de comportamientos conductuales e intenciones explícitas.",
            "limitaciones": "La principal debilidad metodológica subyace en que tienen un bajo índice de validez ecológica (ecological validity) porque se desarrollan artificialmente sin distracciones naturales de ruidos o interrupciones impredecibles de hogares reales,.",
            "ejemplo": "Instruir a un participante adulto en una habitación aislada para que localice alquileres en un buscador y contabilizar cuánto tiempo o clics comete intentándolo sin ayuda exterior.",
            "pregunta": "¿Cuán satisfactorio, eficiente y efectivo es el conjunto de características diseñado frente al escenario representativo del usuario típico planteado?.",
            "tareas": "Un pliego exacto (scripts) de encomiendas de flujos vitales a realizar (como hacer compras, bajar archivos, o localizar ajustes en un iPad),.",
            "criterios_exito": "Llegar veloz y lógicamente al objetivo del sistema y expresar confort pos-tarea.",
            "metricas": "Recolecciones exhaustivas métricas tales como conteo de clicks, tiempos brutos invertidos, bitácoras automáticas cruzado en paralelo con las exclamaciones de audio emitidas,.",
            "perfil_participantes": "Personas minuciosamente elegidas representativas (\"typical users\") de la audiencia destinataria del mercado objetivo final de producto.",
            "num_participantes": "Tradicionalmente involucra desde alrededor de 5 personas y aumenta para estudios más precisos.",
            "moderador": "Un grupo compuesto de un facilitador observante, técnicos de registros y en ocasiones codiseñadores del equipo interno presenciando y anotando apartados del ensayo desde cuartos anexos.",
            "experiencia_ejecutor": "Alta, debe lograr moderar y registrar interacciones de humanos en vivo sin intervenir o que la interacción quede distorsionada.",
            "etica": "Son obligatorios los consentimientos de investigación formal para grabar legalmente y asegurar los archivos capturados audiovisualmente sin divulgar nombres.",
            "entorno": "Una habitación formal acondicionada llamada laboratorio de usabilidad (usability labs) dotado con equipamiento y aislamiento especializado.",
            "recursos": "Un abanico muy elaborado consistente de computadoras analíticas (ej. Morae loggers), espejos semi transparentes de una cara, configuraciones de captura facial, rastreo de ojos (eye-tracking), software y micrófono condensador,.",
            "coste": "Fuerte, debido al nivel elevado del alquiler especializado, los honorarios y tecnología.",
            "tiempo_usuario": "Suele requerir bloques desde 45 a 120 minutos en la sesión presencial intensiva.",
            "prueba_piloto": "Indispensable para verificar y constatar operativamente que el set de programas computacionales corre fluidamente.",
            "pasos": "Acoger, entregar los formatos; observar silenciosamente la navegación en pantalla mientras se solicita verbalizar (think aloud); recoger cuestionarios,.",
            "formato_informe": "Tabulaciones robustas visuales con errores recurrentes acompañados idealmente por una grabación condensada (video excerpt) apoyando la evidencia cualitativa reportada de manera irrebatible,.",
            "definicion_errores": "Se codifica cada vez que la persona equivoca un clic y se limita fuertemente la intervención evitando arruinar el comportamiento orgánico."
        }
    },
    {
        "id": "dise-o-participativo-y-co-creativo",
        "name": "Diseño Participativo",
        "category": "indagacion",
        "subtitle": "Empoderar a los actores involucrados integrándolos en las decisiones del dise...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Contexto Real",
            "coste": "Alto",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\",,.",
            "objetivo": "Empoderar a los actores involucrados integrándolos en las decisiones del diseño directo para asegurar que la solución concuerda con sus verdaderos propósitos de trabajo o contexto en la sociedad y crear aprendizaje mutuo,.",
            "momento_uso": "Desde las fases formativas embrionarias para generar conceptos viables hasta los escalones maduros,.",
            "tipo_metodo": "Intervención cualitativa, política, comunitaria e iterativa orientada a grupos heterogéneos,.",
            "limitaciones": "Demanda cantidades enormes de paciencia, coordinación en la logística temporal de diferentes gremios, un reto al desbalance de poder jerárquico dentro de jerarquías de trabajo formales y dificulta generalizaciones a nivel macro-diseño estandarizado,.",
            "ejemplo": "Coordinar que un equipo sindicalista obrero decida y diseñe un nuevo menú funcional conjuntamente con ingenieros en un formato de diseño.",
            "pregunta": "¿Cuáles son las barreras, conceptualizaciones creativas y requisitos propuestos conjuntamente por la alianza del usuario interno y los creativos del sistema a fabricar?.",
            "tareas": "Integrar exploraciones creativas donde la audiencia crea maquetas del entorno.",
            "criterios_exito": "El éxito no reside solo en un artefacto, sino en generar equidad democrática de la interfaz que todos asumen y sienten legítima.",
            "metricas": "Recolección de impresiones fuertemente narrativa cualitativa y construcción abstracta representativa sin datos rígidos automatizados,.",
            "perfil_participantes": "Personas cotidianas, grupos activistas, y todo agente afectado directamente junto a ingenieros expertos,.",
            "num_participantes": "Comités y alianzas multidisciplinares congregadas presencialmente.",
            "moderador": "Un grupo de mediadores especializados actuando exclusivamente de facilitadores democráticos.",
            "experiencia_ejecutor": "Requiere amplias destrezas sociales superiores, sabiendo delegar autoridad sin controlar a los presentes.",
            "etica": "Involucra compromisos fuertemente políticos de transparencia industrial promoviendo prácticas reales emancipadoras en vez de apariencias de falsa inclusión.",
            "entorno": "Escenarios comunitarios o locales donde las partes convergen para realizar el trabajo colaborativo grupal.",
            "recursos": "Pizarras masivas, cartulinas, tableros o metodologías interactivas y material creativo para prototipar físicamente o bosquejar ideas con sus manos conjuntamente.",
            "coste": "Extremadamente costoso por comprometer simultáneamente largas jornadas laborables, recursos espaciales del conjunto diverso y viajes de coordinación prolongados.",
            "tiempo_usuario": "Requiere implicaciones de gran largo alcance consistentes de semanas intensas de discusiones y compromisos de proyecto.",
            "prueba_piloto": "Más que pilotar la metodología, las partes ensayan su empatía.",
            "pasos": "1. Identificar partes y establecer condiciones horizontales. 2. Identificar dilemas mutuos. 3. Sesiones prácticas formativas en prototipado. 4. Toma conjunta de decisiones,.",
            "formato_informe": "Creaciones conceptuales generadas y acuerdos consensuados en el grupo.",
            "definicion_errores": "Los errores no aplican al usuario sino al facilitador si restringe la conversación; su intervención se destina puramente a invitar y alentar aportaciones mudas."
        }
    },
    {
        "id": "estudio-de-campo-investigaciones-en-el-mundo-natural",
        "name": "Estudio de Campo",
        "category": "usuario",
        "subtitle": "Capturar y descifrar la integración real de los individuos usando nuevas inte...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Prueba Usuario",
            "tipo_dato": "Mixto",
            "num_participantes": "+15",
            "entorno": "Contexto Real",
            "coste": "Medio",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Interaction Design\",,,.",
            "objetivo": "Capturar y descifrar la integración real de los individuos usando nuevas intervenciones tecnológicas expuestos a sus contextos sociales cotidianos naturales no simulados,.",
            "momento_uso": "Primordialmente aplicado tanto al iniciar levantamientos tempranos de investigación o como estrategia sumativa avanzada probando hardware ya disponible sin alterar la inmersión del entorno general,.",
            "tipo_metodo": "Técnica observacional de comportamiento mixta, fuertemente centrada en despliegue pasivo y prolongado,.",
            "limitaciones": "Debido al casi nulo control directo de laboratorio, resulta extremadamente desafiante asignar causalidades concretas de problemas entre una miríada de factores que impactan (clima, eventos sociales). Suelen acarrear recolecciones masivas abrumadoras (Big Data desordenada),.",
            "ejemplo": "Estudiar personas explorando el campo durante meses utilizando cámaras ubicadas pasivamente en su entorno documentando fauna de manera solitaria.",
            "pregunta": "¿De qué formas interactúan orgánicamente, integran rutinas cotidianas y confrontan la tecnología en un ecosistema del mundo exterior?.",
            "tareas": "Ninguna tarea impuesta de manera rígida. Las personas realizan simplemente actividades espontáneas,.",
            "criterios_exito": "El éxito estriba en recuperar los sistemas a salvo tras periodos y consolidar los reportes recolectados de su experiencia inmersiva continua.",
            "metricas": "Produce datos enlazados mixtos (diarios autocompletados, uso automático o timestamps y transcripciones de comportamientos diarios).",
            "perfil_participantes": "Habitantes normales integrados socialmente (ciudadanos, familias, grupos, trabajadores).",
            "num_participantes": "Varía de muy acotados usuarios a miles o agrupaciones geográficas comunitarias.",
            "moderador": "Nadie en tiempo real. Existe involucramiento pasivo por parte del diseñador de fondo analizando remotamente.",
            "experiencia_ejecutor": "Alto requerimiento de la capacidad investigadora e interpretativa para coordinar infraestructura remota sin perder registros ni asfixiar sujetos.",
            "etica": "Obliga a una alerta de máxima integridad bioética por riesgo a grabar a extraños, espacios de la privacidad íntima en casas u oficinas permanentemente por sensores,.",
            "entorno": "Exteriores y entornos de vida cotidiana puros (hogares o calles del mundo natural real).",
            "recursos": "Cámaras ubicuas, dispositivos de la internet de las cosas (IoT), sistemas telemétricos embebidos o software como diarios electrónicos programables de captura remota y encuestas.",
            "coste": "Uno de los despliegues logísticos de más alta complejidad presupuestaria.",
            "tiempo_usuario": "Desde fracciones de meses continuas ininterrumpidas prolongándose por múltiples años.",
            "prueba_piloto": "Primordial el validar de forma anticipada técnica y funcionalmente el software desatendido en el dispositivo.",
            "pasos": "Determinar lugares, suministrar la plataforma o artefactos programados al grupo y observar sin perturbarlos. Posteriormente recoger y entrevistar,.",
            "formato_informe": "Historias consolidadas exhaustivas y de hallazgos ambientales.",
            "definicion_errores": "Libre de alteración ajena, el error son adaptaciones u obstáculos naturales de las personas y el evaluador rehúye de cualquier intervención directa para salvaguardar la \"validez ecológica\",."
        }
    },
    {
        "id": "escalas-likert",
        "name": "Escalas Likert",
        "category": "indagacion",
        "subtitle": "Registrar eficientemente una medida explícita y precisa de las opiniones y ac...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "1-5",
            "entorno": "Laboratorio",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\" e \"Interaction Design\",.",
            "objetivo": "Registrar eficientemente una medida explícita y precisa de las opiniones y actitudes del evaluador cuantificando en puntos la dimensión que muestra ante una aseveración del producto o su carga cognitiva,.",
            "momento_uso": "Usado primordialmente al diseñar interrogatorios y estructurar documentos retrospectivos masivos finalizadas las pruebas de laboratorio o encuestas de recolección,.",
            "tipo_metodo": "Técnica psicométrica cuantitativa y de sondeo rápido de satisfacción.",
            "limitaciones": "Configurar secuencias excesivamente largas entorpece y fatiga la retentiva visual impidiendo resultados reflexivos, mientras que números pares eliminan la casilla neutral.",
            "ejemplo": "Proporcionar en pantalla un enunciado como \"El menú resultaba enredado\" con puntos seleccionables correlativos de \"1. Totalmente en desacuerdo\" al \"5. Totalmente de acuerdo\".",
            "pregunta": "¿Cuál fue la intensidad perceptiva subjetiva del participante a nivel numérico sobre atributos críticos de la carga requerida o efectividad mostrada?,.",
            "tareas": "Identificar el nivel mental de coincidencia propia y elegir la caja o número adecuado dictado en la escala.",
            "criterios_exito": "Que la totalidad de cuestionamientos obligatorios sean calificados sin ser forzados falsamente a sesgos de respuesta extrema.",
            "metricas": "Exclusivamente cuantitativo originando índices tabulados de intensidad que oscilan usualmente de 1 a 5 (o hasta 7) y generando sumatorias por condición evaluada,.",
            "perfil_participantes": "General.",
            "num_participantes": "Muestras desde pequeñas a censos o estudios masivos.",
            "moderador": "Usualmente rellenadas privadamente y de forma individual o digital asíncrona por el interesado final.",
            "experiencia_ejecutor": "Bajo, si las encuestas previas contaron con un diseño óptimo de afirmaciones balanceadas.",
            "etica": "Nulas barreras invasivas.",
            "entorno": "Sala final adyacente del laboratorio de forma posterior o por distribución vía enlace,.",
            "recursos": "Matrices gráficas visualmente legibles diseñadas online y hojas estandarizadas.",
            "coste": "Extremadamente bajo.",
            "tiempo_usuario": "Requiere poquísimos minutos sin carga extenuante.",
            "prueba_piloto": "Aplicada al inicio entre compañeros a los fines de suprimir posibles ambigüedades idiomáticas de lectura en los ítems cerrados previstos.",
            "pasos": "Presentar el objeto o interacción de software; desplegar el cuestionario tabulado con rangos de conformidad; recibir datos; limpiar las discrepancias y calcular las tendencias,.",
            "formato_informe": "Presentado gráficamente vía visualización del espectro frecuencial o medias generales por categoría.",
            "definicion_errores": "Las incomprensiones en el método se documentan como respuestas nulas; la intervención es improcedente puesto que corrompe el criterio imparcial del encuestado final."
        }
    },
    {
        "id": "diferencial-sem-ntico",
        "name": "Diferencial Semántico",
        "category": "indagacion",
        "subtitle": "Revelar en profundidad y recabar dimensiones estéticas e impresiones emociona...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "+15",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "Sí",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\" e \"Interaction Design\",.",
            "objetivo": "Revelar en profundidad y recabar dimensiones estéticas e impresiones emocionales subjetivas pidiendo al interesado situar al producto analizado gráficamente entre dos adjetivos bipolares diametralmente opuestos.",
            "momento_uso": "Al igual que escalas Likert, es distribuido retrospectivamente al concluir dinámicas interactivas sumativas o pruebas conceptuales presenciales de atributos de marca.",
            "tipo_metodo": "Técnica psicométrica para recabar retroalimentación afectiva visual basada en magnitudes cuantitativas relativas.",
            "limitaciones": "Cuesta encontrar y garantizar en el diccionario verdaderos atributos duales que funcionen en todas las interpretaciones de los encuestados y evitar un \"sesgo\" humano intrínseco de querer seleccionar subconscientemente números visualmente altos para quedar bien.",
            "ejemplo": "Exponer la dicotomía entre \"Moderno\" contra \"Tradicional\" separados por varias opciones numéricas intermedias y encargar señalar cuan contemporáneo asimilan el nuevo sistema móvil en la balanza media.",
            "pregunta": "¿En qué cuadrante de polaridad perciben afectiva y estéticamente las cualidades generales de la solución o interfaz presentada?.",
            "tareas": "Reflexión psicológica rápida y marcado centralizado sobre el eje propuesto que une ambas palabras antónimas extremas.",
            "criterios_exito": "El usuario procesa de forma ágil el espectro semántico y anota imparcialmente la marca donde asocia instintivamente el elemento evaluado.",
            "metricas": "Cuantitativo; típicamente fraccionado de rangos continuos del 1 al 7 y medias.",
            "perfil_participantes": "Cualquier sujeto objetivo o actor previamente expuesto directamente al material real diseñado.",
            "num_participantes": "De muestras medianas (decenas de participantes de laboratorio) a masivas remotas.",
            "moderador": "El evaluado.",
            "experiencia_ejecutor": "Los investigadores solo preparan la balanza lingüística de atributos de manera equilibrada para la captura de respuestas de la máquina.",
            "etica": "Inofensivo al participante y confidencial.",
            "entorno": "Remotamente o post-prueba presencial al instante.",
            "recursos": "Matrices en impreso o digitales con series de puntos distribuidos (como del 3 al 0 al 3) para esquivar sesgos del formato.",
            "coste": "Extremadamente de bajo costo.",
            "tiempo_usuario": "Tan solo breves instantes sumados al final de encuestas generales.",
            "prueba_piloto": "Sumamente recomendable ensayar la matriz de palabras para constatar si su comprensión de sinónimos es compartida lógicamente entre los demográficos.",
            "pasos": "Formular la dicotomía de juicios estéticos; entregar el mecanismo de tabla tras la experiencia principal; requerir que se tache la posición sin meditar dilatadamente; extraer el promedio del consenso total por matriz unificada de valoraciones,.",
            "formato_informe": "Tabulaciones descriptivas de barras o trazar perfiles conectando visualmente con una línea central continua sobre el papel la curva principal predominante del gusto medio por ítem.",
            "definicion_errores": "N/A; ninguna corrección presencial interrumpe un método de carácter estrictamente de la apreciación interna del usuario en soledad."
        }
    },
    {
        "id": "pruebas-experimentales-controladas-task-testing",
        "name": "Task Testing",
        "category": "indagacion",
        "subtitle": "Probar numéricamente hipótesis específicas sobre los aspectos y característic...",
        "filters": {
            "momento": "Diseño/Prototipado",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "5-15",
            "entorno": "Laboratorio",
            "coste": "Medio",
            "tiempo": "30-60 min",
            "prueba_piloto": "No",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Interaction Design\", , , .",
            "objetivo": "Probar numéricamente hipótesis específicas sobre los aspectos y características de un diseño para determinar sistemáticamente la relación de causalidad y variables que reducen los errores y el tiempo, .",
            "momento_uso": "Cuando se tienen diferentes variantes bien definidas del diseño y se desea comparar estadísticamente el comportamiento o elegir definitivamente entre dos opciones operativas finas (diseño A o B) .",
            "tipo_metodo": "Técnica de evaluación cuantitativa inferencial y científica.",
            "limitaciones": "Tienen muy baja \"validez ecológica\"; no representan cómo la gente usa el producto en su hogar de forma natural, sino bajo una presión artificial que puede afectar las respuestas humanas de ansiedad,.",
            "ejemplo": "Dividir grupos y dar a una mitad un menú jerárquico y a otra un menú en cascada para evaluar qué grupo cronometrado logra hacer el mismo pedido final en menor lapso promedio .",
            "pregunta": "¿Existe una diferencia y variación estadísticamente significativa en el desempeño, velocidad o los errores frente al uso de una nueva configuración frente al estándar de control original establecido? .",
            "tareas": "Realizar la tarea descrita mientras el cronómetro o el sistema registra el rendimiento (por ejemplo, buscar un botón o realizar selecciones complejas repetidas), .",
            "criterios_exito": "El éxito lo marcan los resultados donde la métrica de éxito esperada (ej. completar la ruta bajo el menor tiempo registrado) logra validar numéricamente que no ocurre por casualidad u otro efecto confuso .",
            "metricas": "Estrictamente datos cuantitativos exactos (recuento total de equivocaciones por sesión, tiempos de respuestas fraccionados (SD), varianza de pulsaciones físicas de interacción) .",
            "perfil_participantes": "Población definida estrechamente que sea asignada preferiblemente al azar para evitar sesgos individuales internos de rendimiento empírico previo o disparidad .",
            "num_participantes": "Requiere de números estadísticamente altos por cada cuadrante u opción; preferible el diseño intersujetos (o intra- sujetos con contrapesos) , .",
            "moderador": "Investigadores académicos, evaluadores rigurosos que fijan parámetros inamovibles de prueba en todo el proceso .",
            "experiencia_ejecutor": "Alto requerimiento disciplinar metodológico en probabilidad, diseño factorial, t-tests y contrapeso analítico matemático científico .",
            "etica": "Debe eludirse el \"efecto Hawthorne\" garantizando no intimidar al participante mediante la rigidez cronometrada del análisis de fallas en los laboratorios con formatos obligatorios consensuados antes del ensayo.",
            "entorno": "Estrictamente realizado en las instalaciones formales y bajo aislamiento estricto (Laboratorios).",
            "recursos": "Aplicaciones o diseños totalmente integrados, temporizadores automatizados de milisegundos o software para aplicar distribuciones de estadística formal .",
            "coste": "Considerablemente un método pesado en materia financiera de organización.",
            "tiempo_usuario": "Sesiones medias o largas para abarcar diseños factoriales mixtos repetidos (ej. intra-sujetos).",
            "prueba_piloto": "Resulta la actividad precursora más vital para anular fallos antes de lanzar la estadística, permitiendo arreglar parámetros o métricas que estaban confundiendo al participante piloto.",
            "pasos": "1. Asignar hipótesis de trabajo exactas; 2. Aislar en las ramas de la estructura independiente/dependiente respectiva al grupo experimental; 3. Someter a cronómetro las pruebas del control y variantes; 4. Finalizado, correr los análisis t-tests , , .",
            "formato_informe": "Tabulaciones estrictas, informes y gráficas de cálculo sobre los umbrales de probabilidad de significancia de tiempo de respuesta (p-values y medias estadísticas) .",
            "definicion_errores": "Un error o falla es cualquier retraso registrado por encima de los baremos esperados o fallos tabulados; el experimentador es totalmente neutro y está vetada cualquier intervención que invalide un número del cronómetro , ."
        }
    },
    {
        "id": "recorrido-pluralista",
        "name": "Recorrido Pluralista",
        "category": "inspeccion",
        "subtitle": "Sirve para predecir problemas de usabilidad evaluando fuertemente los pasos d...",
        "filters": {
            "momento": "Diseño/Prototipado",
            "tipo_metodo": "Inspección",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Presencial",
            "coste": "Alto",
            "tiempo": "30-60 min",
            "prueba_piloto": "Sí",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\",.",
            "objetivo": "Sirve para predecir problemas de usabilidad evaluando fuertemente los pasos detallados de una tarea; permite que un equipo multidisciplinario identifique fallos de interacción aportando diversas experiencias y opiniones,.",
            "momento_uso": "Durante las fases de diseño y desarrollo utilizando escenarios y prototipos de pantallas.",
            "tipo_metodo": "Método de inspección de usabilidad colaborativo y en grupo,.",
            "limitaciones": "Exige reunir a todos los investigadores al mismo tiempo y el proceso avanza forzosamente a la velocidad del integrante más lento. Debido a las limitaciones de tiempo, generalmente solo se pueden explorar unos pocos escenarios y rutas en el sistema.",
            "ejemplo": "Evaluar la navegación de un sistema como iTunes, donde un usuario, un programador y un investigador anotan individualmente dónde harían clic antes de debatir sus opciones,.",
            "pregunta": "¿Qué acciones lógicas tomaría cada persona para moverse de una pantalla a otra y qué problemas de diálogo surgen en ese paso?,.",
            "tareas": "Un escenario de uso que consta de unas pocas pantallas de prototipo por las que hay que navegar.",
            "criterios_exito": "Discutir todas las acciones sugeridas por los presentes antes de pasar a la siguiente ronda de pantallas.",
            "metricas": "Principalmente cualitativos, basados en las acciones escritas y los debates de resolución,.",
            "perfil_participantes": "Usuarios típicos, desarrolladores de software y especialistas en usabilidad,.",
            "num_participantes": "Un equipo de trabajo.",
            "moderador": "Un investigador de usabilidad o líder de sesión.",
            "experiencia_ejecutor": "Alto, requiere moderar un debate multidisciplinar.",
            "etica": "Requiere consentimiento estándar al incorporar usuarios representativos externos en la sesión.",
            "entorno": "Sala de reuniones.",
            "recursos": "Escenarios de tarea impresos y copias de las pantallas del prototipo a evaluar.",
            "coste": "Medio-Alto, debido al coste de sincronizar a múltiples profesionales y usuarios simultáneamente.",
            "tiempo_usuario": "Consumo de tiempo elevado por el consenso grupal paso a paso.",
            "prueba_piloto": "Recomendada para asegurar que el escenario prototipado se entienda.",
            "pasos": "1. Cada persona asume el rol del usuario típico. 2. Se entrega el escenario con pantallas. 3. Cada individuo escribe la secuencia de acciones que tomaría sin hablar con el resto. 4. Se discuten las acciones elegidas. 5. Se avanza a la siguiente pantalla.",
            "formato_informe": "Lista consensuada de problemas de interfaz a corregir.",
            "definicion_errores": "Un problema se detecta cuando las acciones escritas por los participantes difieren de la ruta óptima del sistema; el moderador interviene guiando el debate pantalla por pantalla."
        }
    },
    {
        "id": "recorrido-cognitivo",
        "name": "Recorrido Cognitivo",
        "category": "inspeccion",
        "subtitle": "Simular el proceso de resolución de problemas de los usuarios paso a paso par...",
        "filters": {
            "momento": "Diseño/Prototipado",
            "tipo_metodo": "Inspección",
            "tipo_dato": "Cualitativo",
            "num_participantes": "0 (Expertos)",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\"-.",
            "objetivo": "Simular el proceso de resolución de problemas de los usuarios paso a paso para evaluar específicamente la \"facilidad de aprendizaje\" (ease of learning) de un diseño,.",
            "momento_uso": "Fases de diseño, utilizando una especificación, maqueta o prototipo del sistema,.",
            "tipo_metodo": "Método de inspección de usabilidad analítico.",
            "limitaciones": "El análisis detallado puede tomar demasiado tiempo y provocar que los diseñadores se pongan a la defensiva, justificando sus diseños mediante largas explicaciones de teoría cognitiva.",
            "ejemplo": "Evaluar la pantalla de \"Check-in\" de una tableta en una clínica de salud para predecir si un paciente nuevo sabrá instintivamente que debe tocar el botón inferior derecho.",
            "pregunta": "¿Sabrá el usuario qué hacer, verá cómo hacerlo y entenderá si la acción fue correcta a través del feedback del sistema?.",
            "tareas": "Identificar y documentar una secuencia clara de acciones exactas necesarias para que el usuario complete la meta.",
            "criterios_exito": "Alcanzar un acuerdo en las cuatro preguntas de análisis cognitivo (notar la acción, asociar el resultado, etc.) para cada paso de la tarea-.",
            "metricas": "Cualitativos, recopilando suposiciones de problemas y notas sobre cambios de diseño.",
            "perfil_participantes": "No hay usuarios reales; es ejecutado por diseñadores e investigadores de UX asumiendo el rol cognitivo del usuario.",
            "num_participantes": "Un diseñador y uno o más investigadores de UX.",
            "moderador": "Un líder de sesión o investigador.",
            "experiencia_ejecutor": "Alto, el líder debe fijar reglas estrictas para evitar debates teóricos infinitos sobre cognición.",
            "etica": "N/A (no se experimenta con humanos).",
            "entorno": "Oficina del equipo de diseño.",
            "recursos": "Maqueta/prototipo, perfiles de usuario, secuencia de tareas y un formulario de retroalimentación estandarizado,.",
            "coste": "Bajo.",
            "tiempo_usuario": "Si el análisis es de grano grueso, suele completarse en aproximadamente 2.5 horas.",
            "prueba_piloto": "N/A.",
            "pasos": "1. Documentar características del usuario y escenario. 2. Reunir a los expertos. 3. Caminar por la secuencia de acción respondiendo a cuatro preguntas (¿será evidente la acción?, ¿notará el control?, etc.). 4. Documentar suposiciones. 5. Revisar el diseño-.",
            "formato_informe": "Un formulario estandarizado donde se registran las respuestas negativas de la evaluación, documentando la gravedad del problema.",
            "definicion_errores": "El error es una desviación donde el equipo concluye que el usuario no notará o no entenderá la acción; al no haber usuarios reales, no hay intervención en vivo-."
        }
    },
    {
        "id": "think-aloud",
        "name": "Think Aloud",
        "category": "indagacion",
        "subtitle": "Externalizar los procesos de pensamiento del usuario para comprender la causa...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Laboratorio",
            "coste": "Medio",
            "tiempo": "30-60 min",
            "prueba_piloto": "Sí",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\",-; \"Interaction Design\"-.",
            "objetivo": "Externalizar los procesos de pensamiento del usuario para comprender la causa raíz de un problema y saber cómo están pensando acerca del producto, \"leyendo su mente\" en tiempo real,,.",
            "momento_uso": "Durante pruebas exploratorias o de usabilidad temprana.",
            "tipo_metodo": "Técnica de observación y recolección de datos cualitativos basada en un \"protocolo verbal\" concurrente,.",
            "limitaciones": "Es antinatural, aumenta la carga mental y ralentiza drásticamente el rendimiento del usuario (invalidando métricas de tiempo). Además, los usuarios suelen quedarse en silencio cuando las tareas se vuelven difíciles, justo cuando la información es más necesaria,,,.",
            "ejemplo": "Pedir a un usuario que narre sus pensamientos en voz alta mientras intenta buscar una \"bicicleta eléctrica para niños\" en el buscador Lycos-.",
            "pregunta": "¿Qué está mirando el usuario en la pantalla, qué está tratando de conseguir y por qué un diseño le funciona o no?,.",
            "tareas": "Realizar tareas reales y representativas interactuando con el software mientras se mantiene un monólogo verbal,.",
            "criterios_exito": "Lograr un comentario continuo (verbal protocol) sincronizado con las interacciones del sistema,.",
            "metricas": "Datos cualitativos a través de transcripciones de audio (protocolos de pensamiento), observaciones de frustración y confusión,,.",
            "perfil_participantes": "Usuarios finales típicos.",
            "num_participantes": "Los mismos de un test de usabilidad tradicional-.",
            "moderador": "Un evaluador / test moderator.",
            "experiencia_ejecutor": "Moderado. Debe saber cuándo intervenir para romper silencios incómodos sin guiar la respuesta del usuario ni forzar la técnica si hay resistencia,.",
            "etica": "Es vital informar que \"no se le está evaluando a él, sino al software\", e incluir consentimientos para grabación de voz/video,,.",
            "entorno": "Entorno controlado, como un laboratorio de usabilidad,.",
            "recursos": "Prototipos interactivos, guiones, micrófonos y cámaras o software de registro como Morae,.",
            "coste": "Incrementa moderadamente los tiempos del análisis debido a las transcripciones posteriores.",
            "tiempo_usuario": "Ralentiza el rendimiento de la tarea original,.",
            "prueba_piloto": "Útil para ensayar el ritmo. Se recomienda hacer que el moderador \"demuestre\" la técnica antes de empezar.",
            "pasos": "1. Demostrar la técnica brevemente. 2. Pedir al usuario que narre sus pensamientos continuamente. 3. Observar. 4. Interrumpir sutilmente para recordarle que hable si se queda en silencio,,.",
            "formato_informe": "Fragmentos de transcripciones del protocolo en voz alta vinculados a los problemas de usabilidad hallados-.",
            "definicion_errores": "Un error se entiende por la confusión verbal. El moderador interviene únicamente para decir \"siga hablando\", evitando brindar pistas de la tarea,."
        }
    },
    {
        "id": "prueba-de-memoria",
        "name": "Prueba de Memoria",
        "category": "indagacion",
        "subtitle": "Permite verificar de manera sutil si el participante notó, procesó y asimiló ...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Laboratorio",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\"-.",
            "objetivo": "Permite verificar de manera sutil si el participante notó, procesó y asimiló un elemento visual crucial de la interfaz (como una etiqueta o advertencia) sin haber llamado su atención de forma artificial durante la prueba activa.",
            "momento_uso": "Durante la fase de \"debriefing\" retrospectivo (justo después de que el usuario haya finalizado la tarea o el test)-.",
            "tipo_metodo": "Técnica de entrevista/evaluación retrospectiva de la memoria a corto plazo.",
            "limitaciones": "Se basa en la memoria inmediata de los participantes, los cuales podrían inventar respuestas si olvidaron el evento.",
            "ejemplo": "Durante la entrevista posterior a la prueba, mostrarle al usuario un manual o pantalla con una tira de cinta adhesiva opaca tapando un mensaje de error y preguntarle \"¿Recuerda qué decía ahí?\".",
            "pregunta": "¿El usuario realmente notó y prestó atención a la advertencia o etiqueta mientras navegaba por el sistema?.",
            "tareas": "Recordar elementos ocultos bajo demanda.",
            "criterios_exito": "El usuario enuncia claramente el texto o la función alojada en la posición que se le oculta visualmente.",
            "metricas": "Cualitativos; registros de atención, retención visual e impacto de un diseño gráfico en la pantalla.",
            "perfil_participantes": "Los usuarios que acaban de realizar la prueba de usabilidad presencial.",
            "num_participantes": "Todos los que conforman la muestra del test.",
            "moderador": "El evaluador / Test Moderator.",
            "experiencia_ejecutor": "Bajo-Medio (requiere tacto para interrogar sin que el usuario se sienta examinado intelectualmente).",
            "etica": "Es crucial rebajar la ansiedad, aclarando que si no recuerdan el elemento es culpa de un mal diseño y no de su intelecto,.",
            "entorno": "La sala de pruebas o laboratorio.",
            "recursos": "Una copia en papel de la pantalla/producto con el componente clave tapado o tachado.",
            "coste": "Nulo / Muy bajo (solo papel).",
            "tiempo_usuario": "Un par de minutos adicionales al final de la sesión.",
            "prueba_piloto": "N/A, ocurre en retrospectiva.",
            "pasos": "1. El usuario completa el uso de la interfaz. 2. En el debriefing, el moderador saca una versión del producto tapando una etiqueta clave. 3. Se le pregunta qué había escrito ahí.",
            "formato_informe": "Anotaciones narrativas indicando qué elementos visuales sufren de ceguera inatencional.",
            "definicion_errores": "El fallo ocurre si el usuario ignora por completo la nota del sistema; la intervención es netamente reveladora y posterior."
        }
    },
    {
        "id": "cuestionarios-de-satisfacci-n",
        "name": "Cuestionarios de Satisfacción",
        "category": "indagacion",
        "subtitle": "Medir actitudes, opiniones y creencias de los usuarios evaluando su nivel de ...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "1-5",
            "entorno": "Remoto",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "Sí",
            "moderador": "No"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\", \"Interaction Design\"- ,-.",
            "objetivo": "Medir actitudes, opiniones y creencias de los usuarios evaluando su nivel de satisfacción general y reacciones afectivas tras experimentar un producto,,.",
            "momento_uso": "Al finalizar la interacción con las tareas de la prueba (post-test),.",
            "tipo_metodo": "Técnica psicométrica cuantitativa y cualitativa de auto- reporte,-.",
            "limitaciones": "Los usuarios tienden a elegir las opciones que creen que el evaluador desea (\"What they say and what they do\"). Errores de diseño (como rangos de números solapados o escalas muy largas) generan frustración y datos inválidos,-.",
            "ejemplo": "Enviar una encuesta a clientes de aerolíneas separada en segmentos (check-in, equipaje, comida) pidiendo que califiquen \"El uso del color es excelente\" en una escala de 1 a 5,.",
            "pregunta": "¿Cuán satisfactoria, aceptable o disfrutable fue la experiencia de interacción con el sistema para el usuario?,.",
            "tareas": "Leer sentencias y seleccionar el nivel de acuerdo o respuesta correspondiente.",
            "criterios_exito": "Completar de manera reflexiva y honesta todo el formato de preguntas.",
            "metricas": "Cuantitativos (porcentajes, promedios) y respuestas tabuladas a través de escalas de calificación (Rating Scales),.",
            "perfil_participantes": "Usuarios que acaban de interactuar con el diseño.",
            "num_participantes": "De muestras pequeñas de laboratorio a estudios masivos en línea.",
            "moderador": "Se autoadministra por el participante de forma física o remota.",
            "experiencia_ejecutor": "El diseño inicial exige un alto rigor del investigador para evitar ambigüedades idiomáticas y dobles negativas.",
            "etica": "Asegurar que los datos recolectados se tratarán de forma confidencial y anónima en los análisis y protegerlos en bases de datos.",
            "entorno": "Remoto (online), correo o en sala física post- prueba,.",
            "recursos": "Formularios en papel o herramientas en línea de encuestas con casillas de verificación, menús desplegables y botones de radio,.",
            "coste": "Bajo.",
            "tiempo_usuario": "Usualmente toma solo unos pocos minutos.",
            "prueba_piloto": "Sumamente necesario probar para asegurar que las escalas y preguntas se entienden sin confusión.",
            "pasos": "Reunir grupo de sentencias; decidir tipo de escala (ej. 1 a 5); aplicar tras la prueba de uso; depurar datos de errores; calcular porcentajes y promedios,,.",
            "formato_informe": "Visualizaciones gráficas, promedios, gráficos de barras-.",
            "definicion_errores": "Un error metodológico ocurre si el usuario marca rangos ambiguos; no existe intervención humana en encuestas asíncronas."
        }
    },
    {
        "id": "prueba-piloto-estudio-piloto",
        "name": "Prueba Piloto",
        "category": "indagacion",
        "subtitle": "Permite identificar y corregir fallas en el equipo de grabación, en las instr...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "1-5",
            "entorno": "Laboratorio",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "Sí",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\",-; \"Interaction Design\".",
            "objetivo": "Permite identificar y corregir fallas en el equipo de grabación, en las instrucciones de los guiones, o en el procedimiento experimental antes de iniciar las pruebas oficiales,.",
            "momento_uso": "Aproximadamente una semana o uno a dos días antes del lanzamiento del test real,.",
            "tipo_metodo": "Ensayo metodológico exploratorio.",
            "limitaciones": "Requiere tiempo adicional en el cronograma; además, la persona usada para el ensayo queda invalidada para participar en la prueba real y sus datos se descartan.",
            "ejemplo": "Pedirle a un compañero de oficina que haga la prueba del sitio web grabándolo con la cámara para confirmar que entiende los guiones y que Morae registra sus clics correctamente,.",
            "pregunta": "¿Funciona la tecnología, es claro el lenguaje del cuestionario y la duración de las tareas concuerda con lo planificado?,.",
            "tareas": "Se simula la misma secuencia exacta de tareas preparada para los sujetos experimentales.",
            "criterios_exito": "Lograr que la sesión simulada fluya de inicio a fin sin atascos logísticos de equipo o comprensión-.",
            "metricas": "Viabilidad técnica, tiempos capturados y problemas cualitativos de estructura.",
            "perfil_participantes": "Personas similares a los usuarios objetivo, o simplemente colegas de trabajo internos.",
            "num_participantes": "Generalmente 1 a 2 individuos de prueba.",
            "moderador": "El moderador principal del test.",
            "experiencia_ejecutor": "Similar al requerido para el test formal.",
            "etica": "Usar los mismos acuerdos de privacidad que se usarán en el estudio real.",
            "entorno": "El laboratorio o sala donde se realizará el test final.",
            "recursos": "Prototipos terminados, material impreso de la prueba, cámaras, laptops y grabadores sincronizados listos-.",
            "coste": "Bajo (emplea a compañeros).",
            "tiempo_usuario": "Igual a la duración diseñada para el estudio real (ej. 1 a 2 horas).",
            "prueba_piloto": "Esta actividad es, en sí misma, la prueba piloto.",
            "pasos": "1. Preparar todo el equipo un día antes. 2. Realizar la prueba completa asumiendo que el colega es un participante real. 3. Documentar fallos del método. 4. Corregir guiones y congelar desarrollo de código-.",
            "formato_informe": "Revisiones internas de la lista de verificación del diseño-.",
            "definicion_errores": "Fallas del servidor de grabación u oscuridad en la forma de explicar las tareas; se intervienen directamente para anotar el defecto."
        }
    },
    {
        "id": "card-sorting-abierto",
        "name": "Card Sorting Abierto",
        "category": "indagacion",
        "subtitle": "Diseñar la \"encontrabilidad\" del contenido y recopilar información valiosa so...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "0 (Expertos)",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "Sí",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\".",
            "objetivo": "Diseñar la \"encontrabilidad\" del contenido y recopilar información valiosa sobre cómo los usuarios organizan mentalmente el contenido, qué vocabulario utilizan y cómo nombran las etiquetas en una interfaz de usuario.",
            "momento_uso": "En las fases iniciales del desarrollo de la arquitectura de la información.",
            "tipo_metodo": "Técnica cualitativa / cuantitativa de diseño generativo y organización.",
            "limitaciones": "Los usuarios pueden clasificar el contenido bajo nombres lógicos para ellos pero completamente inviables para los objetivos comerciales de la organización.",
            "ejemplo": "Darle a los usuarios un montón de tarjetas físicas sin título que muestran funciones de una web vacacional, y pedirles que armen montones lógicos y escriban el título de cada pila.",
            "pregunta": "¿Bajo qué conceptos y agrupaciones categoriza el público el contenido de manera intuitiva y cómo lo nombran?.",
            "tareas": "Agrupar tarjetas en pilas que tengan sentido y generar nombres para esas categorías.",
            "criterios_exito": "Que el participante asigne cada función o elemento a una pila lógica mentalmente estructurada.",
            "metricas": "Frecuencia de agrupaciones y afinidad conceptual del vocabulario.",
            "perfil_participantes": "Usuarios finales objetivo de la plataforma.",
            "num_participantes": "Generalmente una muestra media (ej. 15-20 personas) para descubrir patrones de asociación.",
            "moderador": "El investigador evalúa los patrones formados.",
            "experiencia_ejecutor": "Bajo-Medio (se apoya fuertemente en software para clústeres).",
            "etica": "Nulas barreras invasivas.",
            "entorno": "Salas amplias o herramientas remotas digitales.",
            "recursos": "Tarjetas físicas de cartón o un software especializado de clasificación.",
            "coste": "Muy económico (very inexpensive method).",
            "tiempo_usuario": "De 20 a 30 minutos promedio por sesión.",
            "prueba_piloto": "Recomendado ensayar que las tarjetas originales se entiendan.",
            "pasos": "1. Entregar las tarjetas con las funciones no categorizadas. 2. Pedir al usuario que las lea y agrupe. 3. Solicitar al usuario que escriba un título para la nueva agrupación que ha creado.",
            "formato_informe": "Dendrogramas y matrices de afinidad o etiquetas más repetidas.",
            "definicion_errores": "No hay errores concretos; la intervención se minimiza para no contaminar su estructura mental."
        }
    },
    {
        "id": "card-sorting-cerrado",
        "name": "Card Sorting Cerrado",
        "category": "indagacion",
        "subtitle": "Evaluar si las categorías o títulos preexistentes que ha propuesto la organiz...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Remoto",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "Sí",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\".",
            "objetivo": "Evaluar si las categorías o títulos preexistentes que ha propuesto la organización resultan lógicos y obvios para que los usuarios encuentren las funciones del contenido.",
            "momento_uso": "Después de haber definido una estructura inicial de la arquitectura (posiblemente tras un sorting abierto).",
            "tipo_metodo": "Técnica de evaluación organizativa cuantitativa.",
            "limitaciones": "Fuerza al usuario a encajar elementos dentro de categorías rígidas predefinidas que pueden no estar alineadas con sus modelos mentales naturales.",
            "ejemplo": "Entregar al usuario las categorías fijas \"Vehículos\", \"Mascotas\" y \"Deportes\", pidiéndole que asigne una baraja de opciones (ej. \"Bicicleta\") dentro de uno de esos grupos exactos.",
            "pregunta": "¿Los usuarios comprenden el vocabulario de las categorías preestablecidas y saben dónde ubicar un ítem?.",
            "tareas": "Emparejar funciones o tarjetas con la etiqueta predefinida que el diseñador ha proporcionado.",
            "criterios_exito": "Clasificar con éxito el 100% de las tarjetas proporcionadas en los directorios exigidos.",
            "metricas": "Porcentaje de coincidencias exactas entre lo esperado por el diseñador y la acción del usuario.",
            "perfil_participantes": "Usuarios representativos.",
            "num_participantes": "Múltiples usuarios para asegurar tendencia.",
            "moderador": "Investigador de usabilidad.",
            "experiencia_ejecutor": "Bajo-Medio.",
            "etica": "Nulas barreras invasivas.",
            "entorno": "Remoto u oficinas.",
            "recursos": "Tarjetas de contenido y tarjetas más grandes con los títulos fijos de las categorías.",
            "coste": "Muy económico.",
            "tiempo_usuario": "Usualmente menos de media hora.",
            "prueba_piloto": "Necesario para ver si una categoría está demasiado ambigua.",
            "pasos": "1. Proveer las categorías fijas. 2. Entregar los contenidos. 3. Ordenar al usuario que ubique cada ítem en el receptáculo que considere apropiado.",
            "formato_informe": "Matriz de porcentaje de coincidencias.",
            "definicion_errores": "Error se define como clasificar el ítem en la categoría \"incorrecta\" a ojos del negocio; el investigador no interviene para redirigir."
        }
    },
    {
        "id": "prototipo-en-papel-bocetos",
        "name": "Prototipo en Papel",
        "category": "indagacion",
        "subtitle": "Obtener retroalimentación muy temprana para identificar qué funciones o diseñ...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "1-5",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\",-; \"Interaction Design\",.",
            "objetivo": "Obtener retroalimentación muy temprana para identificar qué funciones o diseños (elementos de interfaz, etiquetas, menús) son intuitivos antes de que se gaste presupuesto escribiendo código de software,-.",
            "momento_uso": "Extremadamente temprano en el ciclo de diseño, para explorar conceptos de bajo riesgo.",
            "tipo_metodo": "Prototipado de baja fidelidad (low-fidelity prototyping) formativo,.",
            "limitaciones": "Al no operar como un dispositivo real, carece de robustez y tiempo de respuesta auténtico. Requiere que un humano simule la \"computadora\" para cambiar pantallas de forma manual, lo que a veces es tosco,-.",
            "ejemplo": "Dibujar una pantalla de búsqueda de vuelos en una cartulina y usar notas adhesivas para desplegar el \"menú\" cada vez que un usuario señala con su dedo un elemento,.",
            "pregunta": "¿Entiende el usuario el modelo base, la posición de los ítems y las etiquetas generales propuestas en el boceto?.",
            "tareas": "Escenarios guiados donde el usuario simula navegar \"tocando\" el papel.",
            "criterios_exito": "Que el usuario interactúe y avance por la secuencia de la hoja asimilando el flujo sin perderse gravemente.",
            "metricas": "Mayoritariamente notas cualitativas de comportamiento u opiniones verbales.",
            "perfil_participantes": "Usuarios objetivo o partes interesadas (stakeholders) del proyecto,.",
            "num_participantes": "Pequeños grupos o pruebas uno a uno, iterando rápidamente entre sesiones.",
            "moderador": "Se requieren dos personas: un moderador y alguien que hace de \"computadora\" humana.",
            "experiencia_ejecutor": "Nivel medio para orquestar los recortes de papel en tiempo real sin frustrar al sujeto.",
            "etica": "Estándar.",
            "entorno": "Cualquier espacio de mesa física, como oficinas.",
            "recursos": "Tarjetas índice de 3x5 pulgadas, tijeras, cartulina, notas adhesivas (sticky notes), bolígrafos,.",
            "coste": "Extremadamente barato (cheap and quick),.",
            "tiempo_usuario": "Sesiones ágiles; además su ajuste entre sesiones toma escasos minutos.",
            "prueba_piloto": "Ensayo con el moderador que fingirá ser la \"máquina\".",
            "pasos": "1. Dibujar el boceto. 2. Pedir al participante que ejecute la tarea pensando en voz alta. 3. El usuario \"toca\" el papel. 4. El colega pone una nueva hoja simulando respuesta del sistema. 5. Alterar los recortes según la retroalimentación-.",
            "formato_informe": "El reporte principal es el propio prototipo corregido físicamente con tijeras entre sesiones.",
            "definicion_errores": "Confusión respecto a un icono mal dibujado; la intervención se da para explicar la naturaleza del prototipo si el usuario no comprende cómo simular una acción."
        }
    },
    {
        "id": "focus-group",
        "name": "Focus Group",
        "category": "indagacion",
        "subtitle": "Extraer opiniones profundas, reacciones iniciales a diseños, percepciones com...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "1-5",
            "entorno": "Laboratorio",
            "coste": "Alto",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\"; \"Interaction Design\",.",
            "objetivo": "Extraer opiniones profundas, reacciones iniciales a diseños, percepciones compartidas y debates dentro de un público representativo buscando consensos para nuevos conceptos.",
            "momento_uso": "Durante el descubrimiento temprano de requerimientos o en etapas formativas evaluativas iniciales.",
            "tipo_metodo": "Técnica de recolección de datos mediante entrevista grupal cualitativa y semiestructurada.",
            "limitaciones": "Se sufre el sesgo de \"lo que dicen frente a lo que hacen\"; algunos usuarios pueden responder solo para agradar o ser arrastrados por voces dominantes en el grupo.",
            "ejemplo": "Reunir a una familia en una sala para mostrarles propuestas dibujadas de un asistente de voz y pedirles que conversen sobre cuál prefieren usar.",
            "pregunta": "¿Cuáles son las impresiones consensuadas y las reacciones emocionales del demográfico frente al nuevo concepto de diseño?.",
            "tareas": "Principalmente responder a los temas lanzados por el facilitador.",
            "criterios_exito": "Lograr una sesión dinámica donde todos los miembros hablen y se descubran requerimientos ocultos.",
            "metricas": "Datos cualitativos como citas, temas recurrentes y actitudes sociales.",
            "perfil_participantes": "Usuarios cuidadosamente reclutados que conocen la demografía objetivo del producto.",
            "num_participantes": "Un grupo pequeño, usualmente entre 5 y 12 participantes guiados simultáneamente,.",
            "moderador": "Un facilitador de grupo capacitado.",
            "experiencia_ejecutor": "Alto, necesario para controlar el flujo de una conversación social sin sesgarla y evitar que voces fuertes apaguen al resto.",
            "etica": "Asegurar que los miembros den permiso para grabar el audio y salvaguarden la confidencialidad de la sala.",
            "entorno": "Salas amplias de laboratorio o remotamente por Cisco Webex/Zoom.",
            "recursos": "Grabadoras, guion de temas semiestructurados y prototipos iniciales o elementos catalizadores (props),.",
            "coste": "Medio a alto, por coordinar incentivos a grupos múltiples en simultáneo.",
            "tiempo_usuario": "Sesiones amplias, alrededor de 1 a 2 horas para desarrollar confianza grupal.",
            "prueba_piloto": "Ensayo con el equipo para validar que las preguntas detonantes generen debate.",
            "pasos": "1. Reclutar perfiles representativos. 2. Presentar reglas y objetivos. 3. Mostrar el producto. 4. El facilitador guía la conversación dejando que el grupo debata. 5. Transcribir cintas,.",
            "formato_informe": "Reporte cualitativo enfocado en análisis temático (Thematic Analysis) del discurso.",
            "definicion_errores": "No existen errores aplicables en una tarea interactiva; la intervención del facilitador es diplomática para repartir la palabra."
        }
    },
    {
        "id": "cuestionarios-sus",
        "name": "Cuestionarios SUS",
        "category": "indagacion",
        "subtitle": "Determinar con rapidez y fiabilidad validada la satisfacción del usuario y re...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "+15",
            "entorno": "Remoto",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Handbook of Usability Testing\",; \"Interaction Design\".",
            "objetivo": "Determinar con rapidez y fiabilidad validada la satisfacción del usuario y recopilar datos sobre qué tan utilizable considera un producto mediante una escala estándar de la industria (ISO 9241),.",
            "momento_uso": "Justo después de finalizar la sesión del test, como cuestionario post-prueba (post-test questionnaire).",
            "tipo_metodo": "Técnica psicométrica cuantitativa y sumativa,.",
            "limitaciones": "Brinda un puntaje matemático global del sistema pero es completamente ineficaz para señalar exactamente en qué página o botón específico radica el defecto de usabilidad.",
            "ejemplo": "Proveer a los usuarios una adaptación del test SUS tras usar una nueva boleta de votación electrónica para que califiquen del 1 al 5 premisas como \"Creo que el sistema es complejo\",.",
            "pregunta": "¿Cuál es el índice global de satisfacción y usabilidad percibida del software a nivel estadístico?,.",
            "tareas": "El usuario debe indicar su acuerdo o desacuerdo a 10 afirmaciones prefijadas alternas.",
            "criterios_exito": "El usuario evalúa instintivamente todas las escalas propuestas sin demorarse.",
            "metricas": "Cuantitativos. Produce una representación visual en escalas Likert (1-5) que se tabula para obtener una puntuación final única.",
            "perfil_participantes": "Cualquier persona que acaba de finalizar las pruebas controladas del sistema.",
            "num_participantes": "De muestras mínimas experimentales a grandes evaluaciones masivas remotas.",
            "moderador": "Generalmente autocompletado en soledad por el participante.",
            "experiencia_ejecutor": "Bajo. Al estar estandarizado (ISO), el investigador solo recopila respuestas.",
            "etica": "Bajo nivel invasivo.",
            "entorno": "Sala de \"debriefing\" posterior al laboratorio o mediante enlace online.",
            "recursos": "Formularios SUS impresos o encuestas web adaptadas.",
            "coste": "Gratuito (la herramienta es pública y estandarizada).",
            "tiempo_usuario": "Requiere escasos minutos (menos de 5 min).",
            "prueba_piloto": "No es necesaria para la técnica matriz, a menos que se adapte el lenguaje a niños pequeños.",
            "pasos": "1. Terminar prueba. 2. Entregar cuestionario SUS de 10 ítems. 3. Indicarle que marque rápidamente la opción del 1 al 5. 4. Aplicar la fórmula matemática cruzada para obtener el porcentaje,.",
            "formato_informe": "Una puntuación sumativa global.",
            "definicion_errores": "N/A."
        }
    },
    {
        "id": "escenarios-y-personas",
        "name": "Escenarios y Personas",
        "category": "indagacion",
        "subtitle": "\"Dar vida\" a los requisitos de los usuarios capturando su esencia mediante hi...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Presencial",
            "coste": "Medio",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\"-,-.",
            "objetivo": "\"Dar vida\" a los requisitos de los usuarios capturando su esencia mediante historias narrativas (escenarios) ligadas a arquetipos ficticios muy específicos (personas), generando empatía entre los desarrolladores-.",
            "momento_uso": "En la etapa del descubrimiento de requerimientos y diseño conceptual inicial,.",
            "tipo_metodo": "Técnica descriptiva e iterativa de modelado sintético de comportamiento-.",
            "limitaciones": "Pueden producir fuertes distorsiones o estereotipos nocivos (\"caricaturas\") si los arquetipos inventados no están respaldados vigorosamente por datos reales recolectados en terreno,.",
            "ejemplo": "Desarrollar a la \"Persona Mary\" (una señora que va a misa) junto a un \"Escenario visual\" de su trayecto con un taxi autónomo detallando sus temores de movilidad en la rampa-.",
            "pregunta": "¿Quién es detalladamente nuestro cliente base y cuál es la historia contextual de su interacción con el sistema?-.",
            "tareas": "Analizar datos brutos, fusionar perfiles y construir narrativas escritas detalladas de interacción,.",
            "criterios_exito": "Las historias desarrolladas resultan creíbles, ricas y anclan firmemente las decisiones del equipo de desarrollo al modelo mental de los usuarios finales.",
            "metricas": "Principalmente cualitativos (citas directas, perfiles demográficos ficticios, líneas de tiempo y descripciones narrativas)-.",
            "perfil_participantes": "Derivados de la población real entrevistada.",
            "num_participantes": "Sintetizado (generalmente se hacen de 2 a 4 \"Personas\" para cubrir a todo el grueso del mercado).",
            "moderador": "Investigadores de diseño UX.",
            "experiencia_ejecutor": "Alto, se requiere gran capacidad de síntesis analítica y storytelling para no fabricar falsos positivos.",
            "etica": "Los datos mezclados de las personas deben mantener la anonimidad de las fuentes auténticas de entrevista que alimentaron el modelo.",
            "entorno": "El espacio de análisis del estudio (estudio de escritorio).",
            "recursos": "Pizarras, fotografías de recurso, esquemas gráficos (Customer journey maps), y perfiles extraídos de entrevistas de contexto,.",
            "coste": "Medio.",
            "tiempo_usuario": "Trabajo de escritorio de días o semanas.",
            "prueba_piloto": "Compartir los perfiles con stakeholders para asegurar su grado de realismo.",
            "pasos": "1. Recabar entrevistas cualitativas. 2. Generar el arquetipo (Persona) con foto, nombre, actitudes. 3. Crear una historia (Escenario) de un flujo de vida detallando el problema. 4. Utilizarlo para desarrollar \"Casos de Uso\" técnicos-.",
            "formato_informe": "Carteles infográficos impresos, tableros descriptivos ricos que ilustran la jornada del usuario (Journey stages)-.",
            "definicion_errores": "El error ocurre al nivel del equipo si no respetan el perfil de la Persona al diseñar código."
        }
    },
    {
        "id": "estado-del-arte",
        "name": "State of Art",
        "category": "inspeccion",
        "subtitle": "Sirve para analizar y documentar las mejores soluciones existentes en el merc...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Inspección",
            "tipo_dato": "Mixto",
            "num_participantes": "0 (Expertos)",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "Conocimiento experto externo (no proveniente de los libros dados).",
            "objetivo": "Sirve para analizar y documentar las mejores soluciones existentes en el mercado, identificar estándares de la industria y detectar huecos de innovación en competidores.",
            "momento_uso": "En la etapa inicial de Descubrimiento (Discovery), antes de diseñar nuevas interfaces.",
            "tipo_metodo": "Método analítico, de investigación de escritorio (Desk research).",
            "limitaciones": "Replicar soluciones de la competencia asumiendo que son correctas puede llevar a heredar sus propios problemas de usabilidad subyacentes.",
            "ejemplo": "Analizar los procesos de \"checkout\" de Amazon, eBay y Walmart antes de diseñar el carrito de compras de un nuevo e-commerce.",
            "pregunta": "¿Cómo resuelven actualmente otros productos este problema de interacción y cuáles son los estándares que el usuario ya espera?",
            "tareas": "Identificar referentes, interactuar con ellos asumiendo metas de usuario y documentar el flujo de pantallas.",
            "criterios_exito": "Lograr un mapa claro de convenciones visuales y de interacción que dominan en el sector.",
            "metricas": "Cualitativos (inventarios de funciones, capturas) y cuantitativos (conteo de clics necesarios en la competencia).",
            "perfil_participantes": "No hay usuarios (se evalúan productos competidores).",
            "num_participantes": "0 usuarios. Se evalúan entre 3 a 5 productos referentes.",
            "moderador": "Un Diseñador o Investigador UX.",
            "experiencia_ejecutor": "Medio. Requiere buen ojo crítico para la usabilidad.",
            "etica": "Se debe respetar la propiedad intelectual y no realizar ingeniería inversa ilegal de código ajeno.",
            "entorno": "Entorno de oficina (trabajo de escritorio).",
            "recursos": "Cuentas de acceso a los servicios de la competencia y software de hojas de cálculo o pizarras virtuales.",
            "coste": "Bajo (solo requiere el tiempo del investigador).",
            "tiempo_usuario": "Varios días de análisis interno por parte del equipo.",
            "prueba_piloto": "No aplica.",
            "pasos": "1. Elegir productos competidores directos e indirectos. 2. Definir los flujos a evaluar. 3. Recorrerlos documentando con capturas. 4. Sintetizar las fortalezas y debilidades.",
            "formato_informe": "Matriz comparativa o tabla de \"Benchmarking\" ilustrada con buenas y malas prácticas.",
            "definicion_errores": "El sesgo del evaluador al preferir ideas propias es el mayor riesgo; no hay intervención de usuarios."
        }
    },
    {
        "id": "pruebas-de-pasillo",
        "name": "Pruebas de Pasillo",
        "category": "usuario",
        "subtitle": "Obtener feedback de usabilidad extremadamente rápido y económico sobre un dis...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Prueba Usuario",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "Conocimiento experto externo (no proveniente de los libros dados).",
            "objetivo": "Obtener feedback de usabilidad extremadamente rápido y económico sobre un diseño, interceptando a transeúntes al azar para detectar fallos obvios (\"low-hanging fruit\").",
            "momento_uso": "En fases muy tempranas (wireframes rápidos) o cuando no hay presupuesto ni tiempo para reclutar usuarios de laboratorio.",
            "tipo_metodo": "Observacional, formativo, de guerrilla e informal.",
            "limitaciones": "La muestra tiene una validez muy baja porque las personas interceptadas podrían no conocer el dominio del software ni ser el público objetivo real.",
            "ejemplo": "Parar a un trabajador del departamento de recursos humanos en la cafetería y pedirle que intente reservar un vuelo en un prototipo de móvil en 3 minutos.",
            "pregunta": "¿Existen fallos de interacción catastróficos u obvios en la navegación básica del diseño?",
            "tareas": "Una o máximo tres tareas muy sencillas y directas (\"Encuentra el botón de cancelar\").",
            "criterios_exito": "El participante espontáneo logra entender la interfaz en segundos sin contexto previo de la aplicación.",
            "metricas": "Principalmente cualitativos (observaciones directas de confusión y bloqueos rápidos).",
            "perfil_participantes": "Cualquier transeúnte, colega de otras áreas o público general disponible en el entorno.",
            "num_participantes": "Unos 5 participantes son suficientes para esta aproximación rápida.",
            "moderador": "El diseñador o investigador UX.",
            "experiencia_ejecutor": "Básico-Medio. Debe ser extrovertido para acercarse a desconocidos y amable para no quitarles tiempo.",
            "etica": "Consentimiento verbal inmediato (\"¿Te importaría darme 3 minutos de tu tiempo?\"); no suele grabarse video por estar en lugares públicos.",
            "entorno": "Pasillos corporativos, cafeterías, parques.",
            "recursos": "Portátil o teléfono móvil con el prototipo y una libreta de notas.",
            "coste": "Muy bajo (A veces se compensa con un café o un caramelo).",
            "tiempo_usuario": "Entre 5 a 10 minutos máximo.",
            "prueba_piloto": "Un ensayo mental rápido para comprobar que el prototipo no tiene enlaces rotos antes de salir al pasillo.",
            "pasos": "1. Interceptar a alguien. 2. Explicar brevemente la dinámica. 3. Darle el dispositivo. 4. Observar el bloqueo sin asistirle. 5. Agradecer y liberarle.",
            "formato_informe": "Lista rápida de tareas pendientes (\"To- do list\") de problemas a corregir esa misma tarde.",
            "definicion_errores": "Si el transeúnte duda más de unos segundos, se asume que la pantalla falla; el moderador interviene velozmente para rescatarle y que no pierda su tiempo personal."
        }
    },
    {
        "id": "modelo-de-aceptaci-n-de-la-tecnolog-a",
        "name": "Technology Acceptance (TAM)",
        "category": "indagacion",
        "subtitle": "Sirve para medir y predecir estadísticamente si los usuarios adoptarán o rech...",
        "filters": {
            "momento": "Desarrollo",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cuantitativo",
            "num_participantes": "+15",
            "entorno": "Remoto",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "Sí",
            "moderador": "No"
        },
        "details": {
            "fuente": "Conocimiento experto externo (no proveniente de los libros dados).",
            "objetivo": "Sirve para medir y predecir estadísticamente si los usuarios adoptarán o rechazarán un nuevo sistema basándose en la \"Utilidad Percibida\" (PU) y la \"Facilidad de Uso Percibida\" (PEOU).",
            "momento_uso": "Se aplica principalmente cuando se implementa un sistema nuevo o tras lanzar versiones beta a un mercado para prever su éxito de adopción.",
            "tipo_metodo": "Cuantitativo, de modelo psicométrico e inferencial.",
            "limitaciones": "Se apoya en percepciones autorreportadas (lo que las personas \"creen\" que van a hacer), las cuales a veces difieren de las métricas reales de uso posterior.",
            "ejemplo": "Desplegar una encuesta a todos los médicos de un hospital sobre si creen que el nuevo software de historias clínicas les ahorra tiempo y si les resultó intuitivo de aprender.",
            "pregunta": "¿Cuál es la intención conductual del usuario de seguir utilizando la tecnología basada en sus juicios de utilidad y facilidad?",
            "tareas": "Rellenar la batería de preguntas estándar basadas en el marco metodológico del creador original (Davis).",
            "criterios_exito": "Las tasas de finalización de las encuestas son altas y superan los umbrales de validez interna.",
            "metricas": "Datos fuertemente cuantitativos procedentes de escalas Likert de 7 puntos.",
            "perfil_participantes": "Población que se verá obligada a usar o está considerando comprar el producto.",
            "num_participantes": "Masivo. Requiere cientos de respuestas para garantizar viabilidad estadística (regresiones).",
            "moderador": "Formato asíncrono (sin moderador humano en tiempo real).",
            "experiencia_ejecutor": "Alto. Demanda amplios conocimientos en modelado de ecuaciones estructurales o análisis factorial.",
            "etica": "Mantener estricto anonimato (especialmente en contextos empresariales) para que los empleados no teman represalias si puntúan mal la herramienta corporativa.",
            "entorno": "Remoto, a través de correo electrónico o en pantallas emergentes (pop-ups).",
            "recursos": "Herramientas de encuestas online y programas estadísticos (SPSS / R).",
            "coste": "Bajo económicamente, pero alto en capacidad analítica posterior.",
            "tiempo_usuario": "Unos pocos minutos para rellenar los ítems (ej. menos de 5 min).",
            "prueba_piloto": "Útil para constatar que las traducciones de \"Utilidad\" a diferentes idiomas conservan su sentido.",
            "pasos": "1. Distribuir el software. 2. Enviar encuesta a la base de usuarios. 3. Obtener matriz de datos. 4. Correr la regresión estadística entre la Facilidad, Utilidad y la Actitud de Uso.",
            "formato_informe": "Modelos de flechas gráficas (Path diagrams) indicando la fuerza predictiva de la usabilidad sobre las ventas o adopción.",
            "definicion_errores": "Faltas de respuesta o llenados aleatorios (todo \"7\") se catalogan como errores métricos y se depuran del análisis sin intervención directa."
        }
    },
    {
        "id": "usuario-arquetipo",
        "name": "Archetype User",
        "category": "indagacion",
        "subtitle": "Sirve para sintetizar en un único usuario representativo un conjunto comparti...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "0 (Expertos)",
            "entorno": "Contexto Real",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"UX Optimization: Combining Behavioral UX and Usability Testing Data to Optimize Websites\".",
            "objetivo": "Sirve para sintetizar en un único usuario representativo un conjunto compartido de necesidades, antecedentes, mapas mentales y tareas críticas, evitando que el equipo diseñe en base a casos extremos o preferencias personales.",
            "momento_uso": "Es el primer paso (Step 1) en la optimización de la experiencia de usuario (UX), y debe actualizarse tan a menudo como sea necesario para mantenerse al día con los objetivos de la audiencia.",
            "tipo_metodo": "Método formativo basado en la investigación de campo y observación directa (Contextual Inquiry).",
            "limitaciones": "Las \"Proto-Personas\" (creadas usando solo datos secundarios o de marketing sin observación de campo) son útiles de forma temporal, pero son incompletas y deben actualizarse a \"Design Personas\" basadas en usuarios reales lo antes posible.",
            "ejemplo": "Crear el arquetipo de \"Jessica\", una abuela de 64 años con ingresos fijos enfocada en su salud, que necesita una solución fácil para ponerse en forma mediante una web.",
            "pregunta": "¿Cuáles son las metas, comportamientos, dispositivos y mapas mentales de las personas que interactuarán con el sistema?.",
            "tareas": "Identificar a quién observar, ir a su entorno, dejarlos hablar, indagar sobre sus problemas subyacentes y consolidar los datos buscando patrones comunes de comportamiento.",
            "criterios_exito": "Construir una representación sólida que funcione como \"prueba de fuego\" (litmus test) dentro del equipo para decidir si una nueva función de software es realmente necesaria o evitar el aumento descontrolado del alcance (scope creep).",
            "metricas": "Datos cualitativos (comportamientos, motivaciones, dispositivos que utiliza, tareas críticas a cumplir y nivel de dominio del sistema).",
            "perfil_participantes": "Personas que sean representativas de los usuarios más comunes del sistema en cuestión.",
            "num_participantes": "Se aconsejan entre 5 a 10 sesiones de observación de usuarios por arquetipo para asegurar que se identifiquen patrones comunes.",
            "moderador": "Investigadores de diseño o investigadores de UX (UX Researchers).",
            "experiencia_ejecutor": "Requiere habilidad para escuchar activamente, saber no interrumpir al usuario y saber hacer preguntas de sondeo (probing) si se detectan pistas no verbales de confusión.",
            "etica": "Se debe pedir el tiempo amablemente a la persona en lugares públicos o privados, a menudo ofreciendo un pequeño incentivo como un café o tarjeta de regalo por su colaboración.",
            "entorno": "El entorno real y natural del usuario (por ejemplo, una parada de camiones si diseñas para camioneros, o una cafetería si es público general).",
            "recursos": "Una hoja de papel con las preguntas principales (qué y a quién observar), libreta de notas, y posteriormente, se debe conseguir una fotografía realista de una persona (evitando fotos de archivo falsas) para ilustrar la ficha final.",
            "coste": "Muy bajo, a menudo solo el costo de invitar a un café o dar una tarjeta de regalo.",
            "tiempo_usuario": "Tan solo unos pocos minutos en los que la persona comparte sus pensamientos durante la observación de una tarea (\"a few minutes sharing their thoughts\").",
            "prueba_piloto": "Es muy sugerido realizar \"sesiones de práctica\" (practice sessions) con amigos o familiares para ensayar la técnica de indagación y aprender a hacer preguntas de seguimiento antes de salir a observar desconocidos al campo.",
            "pasos": "1. Preparar las preguntas de investigación. 2. Salir de la oficina al entorno del usuario. 3. Observar y escuchar. 4. Indagar a fondo en los problemas y gestos no verbales. 5. Consolidar las notas en grupo para extraer el perfil final.",
            "formato_informe": "Un documento visual consolidado que debe incluir: fotografía realista, nombre, tareas críticas, escenario de uso, antecedentes (background) y nivel de experiencia.",
            "definicion_errores": "En la metodología en sí, un error crítico es usar exclusivamente información secundaria (como llamadas de atención al cliente) y asumir que eso reemplaza la investigación de campo requerida para el arquetipo."
        }
    },
    {
        "id": "pruebas-combinadas",
        "name": "Pruebas Combinadas",
        "category": "indagacion",
        "subtitle": "Extraer métricas sobre la escala de un problema (\"Qué ocurre\", enfoque cuanti...",
        "filters": {
            "momento": "Diseño/Prototipado",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "+15",
            "entorno": "Remoto",
            "coste": "Alto",
            "tiempo": "+60 min",
            "prueba_piloto": "Sí",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "Conocimiento experto externo (no proveniente de los libros dados).",
            "objetivo": "Extraer métricas sobre la escala de un problema (\"Qué ocurre\", enfoque cuantitativo) y usar métodos observables para entender el razonamiento de fondo (\"Por qué ocurre\", enfoque cualitativo).",
            "momento_uso": "Cuando un producto está maduro o ha sido lanzado y requiere comprender problemas detectados en masa, o validar un prototipo de alta fidelidad desde dos ángulos.",
            "tipo_metodo": "Híbrido: Cuantitativo y Cualitativo.",
            "limitaciones": "Resulta muy costoso, exige conocimientos analíticos de dos perfiles técnicos diferentes (analista de datos y moderador cualitativo) y alarga agresivamente los tiempos.",
            "ejemplo": "Ver en Google Analytics que el 60% se marcha en la página de pagos (Test Cuantitativo A/B) y luego invitar a 6 personas al laboratorio para que compren e indaguen qué les asustó (Test Cualitativo).",
            "pregunta": "¿Se alinea la intención psicológica narrativa del usuario con las métricas registradas automatizadas del comportamiento a escala?",
            "tareas": "Tareas duales: usar el software naturalmente sin mediador, seguido por sesiones presenciales de validación prescriptiva.",
            "criterios_exito": "Los hallazgos del análisis de Big Data y las observaciones de laboratorio convergen y justifican el mismo problema.",
            "metricas": "Big Data (tasas de abandono, clics) fusionado con Thick Data (razonamientos de voz, emociones en vivo).",
            "perfil_participantes": "Usuarios orgánicos remotos, cruzado con una submuestra representativa local.",
            "num_participantes": "Miles en la prueba automatizada, respaldados por una fracción pequeña local de validación (5 a 12).",
            "moderador": "Científicos de datos (Data Scientists) y Moderadores UX en conjunto.",
            "experiencia_ejecutor": "Muy alto. Se necesita especialización para enlazar la frialdad del número con el calor del comportamiento.",
            "etica": "Informar sobre las \"cookies\" y grabaciones masivas de analítica por cuestiones legales, junto a los formularios clásicos audiovisuales de la prueba presencial.",
            "entorno": "Servidores en vivo en la nube (online) más un laboratorio (Usability Lab).",
            "recursos": "Software de analíticas potentes, sistemas para tests A/B y configuraciones completas de laboratorio.",
            "coste": "Extremadamente Alto.",
            "tiempo_usuario": "Sesiones de laboratorio de 60 mins que ocurren semanas después de rastrear la data remota.",
            "prueba_piloto": "Fundamental en la rama automatizada para asegurar que el código no ralentiza la página.",
            "pasos": "1. Recolección masiva cuantitativa; 2. Encontrar \"cuellos de botella\" analíticos; 3. Estructurar sesiones de laboratorio sobre ese cuello; 4. Triangular ambos conjuntos para definir rediseño.",
            "formato_informe": "Dashboards visuales robustos enriquecidos con citas exactas (\"quotes\") de los participantes.",
            "definicion_errores": "La intervención del software es nula en la rama analítica, y sutilmente regulada en la rama de presencialidad, unificando el error como la tasa total de fracasos justificada."
        }
    },
    {
        "id": "estudio-de-segmento",
        "name": "Estudio de Segmento",
        "category": "indagacion",
        "subtitle": "Dividir a la población masiva y heterogénea de usuarios en sub-grupos (segmen...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "+15",
            "entorno": "Remoto",
            "coste": "Alto",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "Conocimiento experto externo (no proveniente de los libros dados).",
            "objetivo": "Dividir a la población masiva y heterogénea de usuarios en sub-grupos (segmentos) más pequeños, precisos y medibles, para entregarles interfaces y jerarquías personalizadas.",
            "momento_uso": "Desde las fases de estrategia tempranas a las auditorías avanzadas post-lanzamiento.",
            "tipo_metodo": "Método de encuestas y análisis de datos (cuantitativo/cualitativo).",
            "limitaciones": "Un diseño hiper-segmentado encarece mucho el código final de un software. Se corre el riesgo de agrupar solo por edades, olvidando agrupar por los hábitos reales con la app.",
            "ejemplo": "Dividir la base de usuarios de Spotify en \"Usuarios Descubridores de Novedades\" frente a \"Usuarios Oyentes Pasivos de Playlists\" y cambiar cómo se les muestra la pantalla de inicio a cada uno.",
            "pregunta": "¿Existen dentro de nuestra audiencia subgrupos con perfiles demográficos, actitudes y necesidades de interacción estadísticamente diferentes?",
            "tareas": "Rellenar grandes bases de encuestas demográficas y hábitos técnicos.",
            "criterios_exito": "Descubrir agrupaciones claras en los que las necesidades internas del grupo son homogéneas, pero distintas frente a otros grupos.",
            "metricas": "Correlaciones y clusters sobre variables demográficas, psicográficas (estilo de vida) o conductuales.",
            "perfil_participantes": "Extracciones aleatorias de la base total de clientes.",
            "num_participantes": "De gran volumen, cientos o miles para soportar análisis factorial sólido.",
            "moderador": "Investigadores de Marketing y Data Analysts sin mediación oral.",
            "experiencia_ejecutor": "Alto en métodos matemáticos de encuestas.",
            "etica": "Es muy crítico anonimizar bases de datos (RGPD / leyes de protección de datos) al trabajar con perfiles de edad o salarios.",
            "entorno": "Remoto, en línea.",
            "recursos": "Herramientas de despliegue de encuestas masivas (Typeform / Qualtrics) y minería de datos (Data Mining).",
            "coste": "Alto, especialmente si se paga por cuotas a paneles de usuarios.",
            "tiempo_usuario": "Requiere largos plazos de rastreo analítico y encuestas de 10 minutos por sujeto.",
            "prueba_piloto": "Testar rigurosamente la encuesta del panel para no desechar presupuestos en preguntas erróneas.",
            "pasos": "1. Acumular y extraer datos. 2. Identificar variables divisorias de los usuarios. 3. Correr herramientas de clustering. 4. Nombrar cada segmento descubierto. 5. Priorizar los segmentos principales para diseñar UX para ellos.",
            "formato_informe": "Mapas circulares e informes de volumen indicando la viabilidad económica y técnica de atender la usabilidad de cada grupo.",
            "definicion_errores": "El participante no asume el error, un fallo del diseñador en segmentar mal invalida toda la proyección económica del producto."
        }
    },
    {
        "id": "investigaci-n-etnogr-fica",
        "name": "Investigación Etnográfica",
        "category": "usuario",
        "subtitle": "Sirve para comprender cómo las personas construyen sus versiones del mundo y ...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Prueba Usuario",
            "tipo_dato": "Cualitativo",
            "num_participantes": "5-15",
            "entorno": "Contexto Real",
            "coste": "Alto",
            "tiempo": "30-60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\".",
            "objetivo": "Sirve para comprender cómo las personas construyen sus versiones del mundo y cómo utilizan el lenguaje y las herramientas en su realidad cotidiana.",
            "momento_uso": "Principalmente en las etapas formativas de investigación para el descubrimiento de requerimientos (discovering requirements).",
            "tipo_metodo": "Técnica de recopilación de datos de naturaleza observacional y cualitativa.",
            "limitaciones": "Genera cantidades masivas de datos complejos. Al no tener una estructura previa, el análisis puede ser muy subjetivo y es difícil establecer un foco claro de diseño.",
            "ejemplo": "Observar el comportamiento cotidiano de médicos en un hospital durante semanas sin pedirles que realicen tareas específicas frente a una pantalla.",
            "pregunta": "¿Cómo interactúa el usuario de manera natural en su propio entorno y cultura, sin marcos de referencia ni tareas impuestas artificialmente por el investigador?.",
            "tareas": "Ninguna. Involucra observar la situación sin imponer ninguna estructura a priori ni guiones de tareas.",
            "criterios_exito": "El investigador se sumerge en el entorno lo suficiente como para extraer una comprensión profunda y holística del comportamiento sin alterar el contexto.",
            "metricas": "Estrictamente datos cualitativos, grabaciones continuas, discursos y notas de observación en campo.",
            "perfil_participantes": "Usuarios reales y comunidades inmersas en su entorno natural.",
            "num_participantes": "Variable, desde individuos únicos hasta grupos de trabajadores completos.",
            "moderador": "Un etnógrafo o investigador UX observador.",
            "experiencia_ejecutor": "Muy alto. Debe saber fundirse en el entorno y recolectar datos sin guiar, interferir o contaminar la situación.",
            "etica": "Es crucial el consentimiento explícito de toda la comunidad observada para mantener el respeto a la privacidad durante grabaciones extensas.",
            "entorno": "El entorno real y natural de los usuarios (trabajo, hogar, calle).",
            "recursos": "Grabadoras, cuadernos de notas de campo, cámaras y, en ocasiones, entrevistas no estructuradas de apoyo.",
            "coste": "Muy alto, requiere semanas o meses de tiempo del investigador.",
            "tiempo_usuario": "Requiere largas ventanas de observación inmersiva.",
            "prueba_piloto": "Difícil de aplicar dado que se documenta la realidad sin intervención.",
            "pasos": "1. Acceder y ser aceptado por la comunidad a observar. 2. Observar la situación sin estructuras previas. 3. Tomar notas o documentar el discurso. 4. Realizar el análisis de la cultura.",
            "formato_informe": "Descripciones textuales densas (\"thick descriptions\"), análisis del discurso y diarios de campo.",
            "definicion_errores": "No existen \"errores\" porque el usuario no sigue tareas. El investigador tiene prohibido intervenir o instruir a la persona. --------------------------------------------------------------------------------"
        }
    },
    {
        "id": "brainstorming-para-innovaci-n",
        "name": "BrainStorming",
        "category": "indagacion",
        "subtitle": "Es una técnica genérica utilizada para explorar el espacio del problema y gen...",
        "filters": {
            "momento": "Fase inicial",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "1-5",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "<30 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "\"Interaction Design\".",
            "objetivo": "Es una técnica genérica utilizada para explorar el espacio del problema y generar, refinar y desarrollar grandes ideas creativas o diseños alternativos (\"out-of-the-box\") para apoyar a las personas.",
            "momento_uso": "Durante la actividad inicial de descubrimiento de requerimientos (discovering requirements).",
            "tipo_metodo": "Técnica de ideación colaborativa, cualitativa y divergente/convergente.",
            "limitaciones": "Requiere una gran facilitación para evitar que el grupo empiece a criticar prematuramente las ideas inusuales, lo cual destruye la creatividad y bloquea a los participantes.",
            "ejemplo": "Usar palabras aleatorias u objetos físicos en una mesa de diseño para que el equipo genere ideas de cómo modernizar el sistema de reservas de una aerolínea.",
            "pregunta": "¿Cuáles son las alternativas de diseño innovadoras y poco ortodoxas que pueden resolver este problema funcional de los usuarios?.",
            "tareas": "Fomentar una gran cantidad de ideas sin preocuparse por la calidad inicial, y luego combinarlas.",
            "criterios_exito": "Generar un volumen enorme de ideas heterodoxas y finalmente fusionarlas y refinarlas en opciones novedosas útiles.",
            "metricas": "Cualitativo: cantidad total de ideas generadas (Quantity over quality).",
            "perfil_participantes": "Personas que conocen a la audiencia para la que están diseñando, con rangos variados de experiencia.",
            "num_participantes": "Un grupo pequeño, preferiblemente entre 5 y 12 participantes.",
            "moderador": "Un facilitador o líder de sesión con buena preparación.",
            "experiencia_ejecutor": "Medio/Alto. La técnica requiere planificación cuidadosa y habilidad para contener el impulso de criticar de los asistentes.",
            "etica": "Es fundamental establecer un entorno libre de prejuicios donde se retengan todas las críticas (criticisms should be withheld) para que nadie tema proponer algo \"tonto\".",
            "entorno": "Salas de diseño, talleres de co-creación u oficinas creativas.",
            "recursos": "Catalizadores de ideas (como objetos físicos), palabras aleatorias impresas y espacios amplios (pizarras).",
            "coste": "Bajo.",
            "tiempo_usuario": "Rápido; normalmente sesiones intensivas de una o dos horas.",
            "prueba_piloto": "No es necesaria para generar ideas creativas en una pizarra.",
            "pasos": "1. Fijar un problema claro a resolver. 2. Pedir la mayor cantidad posible de ideas. 3. Prohibir todas las críticas iniciales. 4. Animar a pensar fuera de la caja. 5. Seleccionar, combinar, refinar y mejorar las ideas válidas.",
            "formato_informe": "Mapas mentales, esquemas de diseño y listas de requerimientos consolidadas.",
            "definicion_errores": "El único error es la crítica prematura. La intervención del moderador está dirigida al equipo para forzarlos a ser creativos y evitar censuras. --------------------------------------------------------------------------------"
        }
    },
    {
        "id": "diagrama-de-afinidad",
        "name": "Diagrama de Afinidad",
        "category": "indagacion",
        "subtitle": "Sirve para organizar, agrupar y consolidar grandes cantidades de datos desest...",
        "filters": {
            "momento": "Evaluación Final",
            "tipo_metodo": "Indagación",
            "tipo_dato": "Cualitativo",
            "num_participantes": "0 (Expertos)",
            "entorno": "Presencial",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "Conocimiento experto en UX integrado con el concepto analítico de UX Optimization.",
            "objetivo": "Sirve para organizar, agrupar y consolidar grandes cantidades de datos desestructurados (como notas de entrevistas o ideas de un brainstorming) identificando temas, características en común y patrones de comportamiento.",
            "momento_uso": "Después de realizar entrevistas, encuestas abiertas o sesiones de ideación, justo durante la fase de análisis de datos cualitativos y definición del modelo del usuario.",
            "tipo_metodo": "Herramienta de síntesis cualitativa, visual e inductiva.",
            "limitaciones": "El equipo puede sufrir \"sesgo de confirmación\" forzando que ciertas notas encajen en una categoría preconcebida, perdiendo hallazgos que rompen el molde.",
            "ejemplo": "Tras entrevistar a 15 personas sobre por qué abandonan un carrito de compras, el equipo escribe cada queja en un post-it y agrupa todos los relacionados con \"fallas de tarjeta de crédito\" bajo el título \"Problemas de Pago\".",
            "pregunta": "¿Cuáles son los patrones o clústeres temáticos subyacentes que agrupan lógicamente la voz del usuario?",
            "tareas": "Extraer observaciones individuales, escribirlas en notas, revisar la pared y mover las notas hacia grupos similares.",
            "criterios_exito": "El equipo clasifica el 100% de la información cruda en categorías jerárquicas lógicas acordadas por todos.",
            "metricas": "Cualitativos, categorizaciones, listas temáticas y frecuencias visuales.",
            "perfil_participantes": "No asisten usuarios finales. Es ejecutado por investigadores UX, diseñadores y miembros del negocio.",
            "num_participantes": "Grupos colaborativos de trabajo (típicamente de 3 a 7 personas).",
            "moderador": "El UX Researcher principal organiza el ejercicio.",
            "experiencia_ejecutor": "Medio. Se requiere capacidad analítica y de síntesis.",
            "etica": "Los datos volcados en los post-its deben haber sido anonimizados previamente para no violar la privacidad de las fuentes reales.",
            "entorno": "En la oficina, frente a una pared grande o en software de pizarras virtuales (como Miro o Mural).",
            "recursos": "Notas adhesivas (Post-its), marcadores y una gran pared vacía.",
            "coste": "Bajo.",
            "tiempo_usuario": "El ejercicio en equipo suele durar de 1 a 3 horas dependiendo del volumen de datos.",
            "prueba_piloto": "No aplica por ser un método de trabajo de escritorio interno.",
            "pasos": "1. Consolidar los datos escribiendo cada hallazgo en una nota. 2. Pegar todo aleatoriamente en la pared. 3. Los miembros mueven en silencio los post-its formando grupos afines. 4. Se nombran las categorías (headers).",
            "formato_informe": "El mapa visual en la pared, que luego se digitaliza como un informe jerárquico de requerimientos de diseño.",
            "definicion_errores": "No existen usuarios cometiendo errores de sistema. El equipo de investigadores debate e interviene directamente reubicando las notas hasta lograr un consenso total."
        }
    },
    {
        "id": "potdad",
        "name": "POTDAD",
        "category": "inspeccion",
        "subtitle": "Sirve para estructurar, cuantificar y comprender el conocimiento y las secuen...",
        "filters": {
            "momento": "Diseño/Prototipado",
            "tipo_metodo": "Inspección",
            "tipo_dato": "Mixto",
            "num_participantes": "+15",
            "entorno": "Laboratorio",
            "coste": "Bajo",
            "tiempo": "+60 min",
            "prueba_piloto": "No",
            "moderador": "Sí"
        },
        "details": {
            "fuente": "Construcción teórica apoyada en los capítulos de Análisis de Tareas (Task Analysis) y Modelos Cognitivos de \"Human- Computer Interaction\" e \"Interaction Design\".",
            "objetivo": "Sirve para estructurar, cuantificar y comprender el conocimiento y las secuencias lógicas requeridas para realizar una meta tras haber observado empíricamente el comportamiento humano, permitiendo predecir y optimizar la interacción.",
            "momento_uso": "En las fases de evaluación y análisis de datos, una vez que el equipo de investigación ya ha salido a observar al usuario y necesita traducir esas observaciones abiertas en requisitos concretos de rediseño de interfaz.",
            "tipo_metodo": "Es un método analítico, de modelado predictivo y de síntesis de datos mixtos (cualitativos y cuantitativos).",
            "limitaciones": "Produce cantidades masivas de datos que pueden ser abrumadores de analizar, y sus resultados dependen directamente de que el observador original no haya contaminado el entorno natural del usuario al recolectar la información.",
            "ejemplo": "Revisar las transcripciones y videos de un usuario intentando buscar la palabra 'daltonismo' en un diccionario, mapeando sus retrocesos (\"overshoots\") y hojeos para rediseñar un sistema de búsqueda digital más eficiente.",
            "pregunta": "¿Cuáles son los micro-pasos, tiempos exactos, y cuellos de botella en los que incurren los usuarios al intentar alcanzar su meta en la vida real?",
            "tareas": "Identificar los objetos, eventos y acciones (como en el modelo TAKD), desglosándolos en una taxonomía jerárquica para revelar patrones comunes.",
            "criterios_exito": "El éxito radica en traducir el 100% de la información cruda en un modelo estructurado que elimine los pasos redundantes del usuario.",
            "metricas": "Mezcla de datos cuantitativos (tiempos totales del operador, número de clics o equivocaciones) y datos cualitativos (narrativas de frustración documentadas).",
            "perfil_participantes": "En esta fase analítica no participan los usuarios finales directamente; los sujetos fueron parte de la fase de observación previa.",
            "num_participantes": "Las observaciones base provienen habitualmente de grupos pequeños a medianos (5 a 15 personas), suficientes para encontrar los patrones de error.",
            "moderador": "Equipos de investigadores UX, analistas de datos y diseñadores trabajando de forma colaborativa.",
            "experiencia_ejecutor": "Medio-Alto. Requiere una fuerte capacidad analítica para estructurar taxonomías jerárquicas y extraer conclusiones sin forzar sesgos propios de confirmación.",
            "etica": "Es vital que los datos recolectados (como audios y videos de la observación) que se van a analizar cuenten con un consentimiento informado por escrito y sean completamente anonimizados para proteger a las fuentes reales.",
            "entorno": "Trabajo de escritorio de los investigadores (oficina, pizarras colaborativas o laboratorios de análisis).",
            "recursos": "Notas de campo de las observaciones, grabaciones, hojas de cálculo de tiempos (como el modelo GOMS) y software para diagramar flujos.",
            "coste": "Bajo a Medio económicamente, pero de alto requerimiento en horas laborables de los analistas.",
            "tiempo_usuario": "El mapeo y desglose de un solo registro de interacción puede consumir desde 1 hasta varias horas de trabajo para el equipo.",
            "prueba_piloto": "Ensayo analítico interno en el que el equipo revisa una sola transcripción u observación para calibrar el método antes de tabular todo el set de datos restante.",
            "pasos": "1. Reunir los registros de observación directa. 2. Listar todos los objetos, acciones y eventos involucrados en la tarea del usuario. 3. Cuantificar los tiempos operativos de cada micromovimiento (teclado, ratón). 4. Categorizar inductivamente los errores y frustraciones. 5. Sintetizar los hallazgos en un nuevo flujo de diseño más corto.",
            "formato_informe": "Diagramas de Análisis Jerárquico de Tareas (HTA) o tablas tabuladas de métricas de desempeño divididas por operador y sistema.",
            "definicion_errores": "Un \"error\" es cualquier paso extra, confusión o retraso detectado en los registros del usuario frente al flujo ideal; al ser una labor retrospectiva de escritorio, la intervención sobre el usuario es nula."
        }
    }
];

const techniques = rawTechniques.map(completeTechniqueInfo);

// --- 2. CONFIGURACIÓN DE FILTROS ---
const filterDefinitions = {
    momento: { label: 'Momento de uso', options: ['Fase inicial', 'Diseño/Prototipado', 'Desarrollo', 'Evaluación Final'] },
    tipo_metodo: { label: 'Tipo de método', options: ['Inspección', 'Prueba Usuario', 'Indagación'] },
    tipo_dato: { label: 'Tipo de dato', options: ['Cualitativo', 'Cuantitativo', 'Mixto'] },
    num_participantes: { label: 'Nº Participantes', options: ['0 (Expertos)', '1-5', '5-15', '+15'] },
    entorno: { label: 'Entorno de prueba', options: ['Remoto', 'Presencial', 'Laboratorio', 'Contexto Real'] },
    coste: { label: 'Coste', options: ['Bajo', 'Medio', 'Alto'] },
    tiempo: { label: 'Tiempo estimado', options: ['<30 min', '30-60 min', '+60 min'] },
    prueba_piloto: { label: 'Prueba piloto', options: ['Sí', 'No'] },
    moderador: { label: 'Moderador', options: ['Sí', 'No'] }
};

// Mapas de Categorías
const categoryInfo = {
    inspeccion: { title: "Técnicas de Inspección", desc: "Métodos donde evaluadores expertos examinan la interfaz para detectar problemas de usabilidad sin la intervención directa de usuarios reales." },
    usuario: { title: "Pruebas de Usuario", desc: "Técnicas que implican observar y analizar cómo usuarios reales interactúan con el sistema para completar tareas específicas." },
    indagacion: { title: "Técnicas de Indagación", desc: "Métodos basados en preguntar directamente a los usuarios para descubrir sus necesidades, preferencias y actitudes." }
};

// --- 3. ESTADO GLOBAL ---
const state = {
    currentView: 'inicio',
    currentCategory: null,
    currentTechnique: null,
    searchQuery: '',
    filters: {} // { momento: ['Fase inicial'], coste: ['Bajo'] }
};

// --- 4. CONTROLADORES DOM Y EVENTOS ---
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initSearch();
    initFiltersUI();
    initContactForm();
});

function initNavigation() {
    // Navegación general (Delega el evento para soportar elementos dinámicos como las migas de pan)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-target]');
        if (btn) {
            const target = btn.getAttribute('data-target');
            if (['inspeccion', 'usuario', 'indagacion'].includes(target)) {
                navigateTo('categoria', target);
            } else {
                navigateTo(target);
            }
            // Cerrar menú móvil si está abierto
            document.getElementById('main-nav').classList.remove('active');
        }
    });

    // Menú hamburguesa móvil
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        document.getElementById('main-nav').classList.toggle('active');
    });

    // Botón volver
    document.getElementById('btn-back').addEventListener('click', () => {
        navigateTo('categoria', state.currentCategory);
    });

    // Toggle Filtros Móvil
    document.getElementById('mobile-filter-toggle').addEventListener('click', () => {
        document.getElementById('filter-panel').classList.toggle('active');
    });
}

function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');

    searchToggle.addEventListener('click', () => {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchResults.classList.add('hidden');
        }
    });

    // Cerrar buscador si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
            searchBox.classList.remove('active');
            searchResults.classList.add('hidden');
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = removeAccents(e.target.value.trim().toLowerCase());
        
        if (query.length === 0) {
            searchResults.innerHTML = '';
            searchResults.classList.add('hidden');
            return;
        }

        const matches = techniques.filter(t => 
            removeAccents(t.name.toLowerCase()).includes(query) || 
            removeAccents(t.subtitle.toLowerCase()).includes(query)
        );

        searchResults.classList.remove('hidden');
        
        if (matches.length === 0) {
            searchResults.innerHTML = '<li class="no-results-li">No se encontraron técnicas</li>';
            return;
        }

        searchResults.innerHTML = matches.map(t => 
            `<li data-id="${t.id}">${t.name}</li>`
        ).join('');

        // Añadir evento click a cada resultado para ir a la ficha de la técnica
        searchResults.querySelectorAll('li[data-id]').forEach(li => {
            li.addEventListener('click', () => {
                const techId = li.getAttribute('data-id');
                searchBox.classList.remove('active');
                searchResults.classList.add('hidden');
                searchInput.value = ''; // Limpiar buscador
                navigateTo('detalle', techId);
            });
        });
    });
}

// --- 5. RENDERIZADO Y NAVEGACIÓN (SPA) ---

function navigateTo(view, payload = null) {
    // Ocultar todas las secciones
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    
    // Actualizar nav active state
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    
    state.currentView = view;

    if (view === 'inicio') {
        document.getElementById('view-inicio').classList.remove('hidden');
        document.querySelector('.nav-item[data-target="inicio"]').classList.add('active');
    } 
    else if (view === 'categoria') {
        state.currentCategory = payload;
        document.getElementById('view-categoria').classList.remove('hidden');
        document.querySelector(`.nav-item[data-target="${payload}"]`).classList.add('active');
        
        // Setup Headers
        document.getElementById('cat-title').textContent = categoryInfo[payload].title;
        document.getElementById('cat-desc').textContent = categoryInfo[payload].desc;
        
        renderGrid();
    }
    else if (view === 'detalle') {
        state.currentTechnique = payload;
        document.getElementById('view-detalle').classList.remove('hidden');
        // Mantener activo el menú de la categoría
        if(state.currentCategory) {
            document.querySelector(`.nav-item[data-target="${state.currentCategory}"]`).classList.add('active');
        }
        renderDetail();
    }
    else if (view === 'contacto') {
        document.getElementById('view-contacto').classList.remove('hidden');
        document.querySelector('.nav-item[data-target="contacto"]').classList.add('active');
    }
    
    window.scrollTo(0, 0);
}

// --- 6. LÓGICA DE FILTROS Y GRID ---

function initFiltersUI() {
    const form = document.getElementById('filter-form');
    let html = '';

    for (const [key, def] of Object.entries(filterDefinitions)) {
        html += `<div class="filter-group">
                    <h3>${def.label}</h3>`;
        def.options.forEach(opt => {
            html += `<label class="filter-label">
                        <input type="checkbox" name="${key}" value="${opt}">
                        ${opt}
                     </label>`;
        });
        html += `</div>`;
    }
    form.innerHTML = html;

    // Listeners
    form.addEventListener('change', updateFilters);
    
    document.getElementById('clear-filters').addEventListener('click', (e) => {
        form.reset();
        updateFilters();
    });
    document.getElementById('btn-reset-empty').addEventListener('click', () => {
        form.reset();
        document.getElementById('global-search').value = '';
        state.searchQuery = '';
        updateFilters();
    });
}

function updateFilters() {
    const form = document.getElementById('filter-form');
    const formData = new FormData(form);
    state.filters = {};

    for (const key of Object.keys(filterDefinitions)) {
        const values = formData.getAll(key);
        if (values.length > 0) {
            state.filters[key] = values;
        }
    }
    renderGrid();
}

function applyFiltersToData() {
    return techniques.filter(t => {
        // 1. Filtrar por Categoría actual
        if (state.currentCategory && t.category !== state.currentCategory) return false;

        // 2. Filtrar por Búsqueda de texto
        if (state.searchQuery) {
            const query = removeAccents(state.searchQuery.toLowerCase());
            if (!removeAccents(t.name.toLowerCase()).includes(query) && !removeAccents(t.subtitle.toLowerCase()).includes(query)) {
                return false;
            }
        }

        // 3. Filtrar por Checkboxes laterales
        for (const [filterKey, selectedValues] of Object.entries(state.filters)) {
            const techniqueValue = t.filters[filterKey];
            if (!selectedValues.includes(techniqueValue)) {
                return false;
            }
        }

        return true;
    });
}

function renderGrid() {
    const grid = document.getElementById('techniques-grid');
    const emptyState = document.getElementById('empty-state');
    
    const filteredData = applyFiltersToData();

    if (filteredData.length === 0) {
        grid.innerHTML = '';
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    grid.innerHTML = filteredData.map(t => `
        <div class="technique-card" onclick="navigateTo('detalle', '${t.id}')" role="button" tabindex="0">
            <h3>${t.name}</h3>
            <p class="card-subtitle">${t.subtitle}</p>
            <div class="card-meta">
                <span class="badge">⏱️ ${t.filters.tiempo}</span>
                <span class="badge">💰 ${t.filters.coste}</span>
                <span class="badge">👥 ${t.filters.num_participantes}</span>
            </div>
        </div>
    `).join('');
}

// --- 7. VISTA DETALLE (24 Puntos) ---

const iconMap = {
    fuente: "📚", objetivo: "🎯", momento_uso: "⏱️", tipo_metodo: "🛠️",
    limitaciones: "⚠️", ejemplo: "💡", pregunta: "❓", tareas: "📋",
    criterios_exito: "✅", metricas: "📊", perfil_participantes: "👤",
    num_participantes: "👥", moderador: "🗣️", experiencia_ejecutor: "🎓",
    etica: "⚖️", entorno: "🏢", recursos: "🧰", coste: "💰",
    tiempo_usuario: "⏳", prueba_piloto: "🧪", pasos: "👣",
    formato_informe: "📄", definicion_errores: "❌"
};

const labelMap = {
    fuente: "Fuente bibliográfica", objetivo: "Objetivo (¿Para qué sirve?)",
    momento_uso: "Momento de uso", tipo_metodo: "Tipo de método",
    limitaciones: "Limitaciones o trade-offs", ejemplo: "Ejemplo práctico",
    pregunta: "Pregunta de investigación", tareas: "Lista de tareas",
    criterios_exito: "Criterios de éxito", metricas: "Métricas y tipos de datos",
    perfil_participantes: "Perfil de participantes", num_participantes: "Número de participantes",
    moderador: "Moderador (¿Quién ejecuta?)", experiencia_ejecutor: "Experiencia del ejecutor",
    etica: "Consideraciones éticas", entorno: "Entorno de la prueba",
    recursos: "Recursos y materiales", coste: "Coste estimado",
    tiempo_usuario: "Tiempo estimado por usuario", prueba_piloto: "Prueba piloto",
    pasos: "Pasos de ejecución", formato_informe: "Formato del informe",
    definicion_errores: "Definición de errores"
};

function renderDetail() {
    const tech = techniques.find(t => t.id === state.currentTechnique);
    if (!tech) return;

    // Breadcrumbs
    document.getElementById('bc-category').textContent = categoryInfo[tech.category].title;
    document.getElementById('bc-category').setAttribute('data-target', tech.category);
    document.getElementById('bc-technique').textContent = tech.name;

    // Header Detalle
    document.getElementById('det-title').textContent = tech.name;
    document.getElementById('det-subtitle').textContent = tech.subtitle;

    // Contenido (24 puntos)
    const contentBox = document.getElementById('detail-content');
    let html = '';

    // Convertimos el objeto details a un array para iterar
    const keys = Object.keys(labelMap);
    
    keys.forEach(key => {
        const val = tech.details[key];
        // Hacer full-width algunos campos que suelen ser largos
        const isFullWidth = ['pasos', 'ejemplo', 'limitaciones', 'fuente'].includes(key) ? 'full-width' : '';
        
        html += `
            <div class="detail-item ${isFullWidth}">
                <h3>${iconMap[key] || '🔹'} ${labelMap[key]}</h3>
                <p>${val}</p>
            </div>
        `;
    });

    contentBox.innerHTML = html;
}

// --- 8. VALIDACIÓN FORMULARIO CONTACTO (Recomendación 5) ---

function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        inputs.forEach(input => {
            if(!validateInput(input)) isValid = false;
        });

        if(isValid) {
            document.getElementById('form-success').classList.remove('hidden');
            form.reset();
            inputs.forEach(i => {
                i.classList.remove('valid');
                i.classList.remove('invalid');
            });
            setTimeout(() => {
                document.getElementById('form-success').classList.add('hidden');
            }, 5000);
        }
    });
}

function validateInput(input) {
    const errorSpan = document.getElementById(`err-${input.name}`);
    let valid = true;
    let errorMsg = '';

    if (input.value.trim() === '') {
        valid = false;
        errorMsg = 'Este campo es obligatorio.';
    } else if (input.type === 'email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(input.value)) {
            valid = false;
            errorMsg = 'Por favor, introduce un correo válido (ej: usuario@mail.com).';
        }
    } else if (input.name === 'motivo' && input.value.trim().length < 10) {
        valid = false;
        errorMsg = 'El mensaje es demasiado corto. Sé un poco más específico.';
    }

    if (!valid) {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorSpan.textContent = errorMsg;
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorSpan.textContent = '';
    }

    return valid;
}
