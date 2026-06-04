export const lessonContent = {
  'found-1': {
    objectives: [
      'Explicar qué ocurre desde que escribís una URL hasta que ves la página',
      'Distinguir los roles del cliente y del servidor en una petición HTTP',
      'Identificar los principales protocolos de la web: HTTP, HTTPS, DNS',
    ],
    sections: [
      {
        title: 'El viaje de una petición',
        body: 'Cuando escribís una URL en el navegador, éste primero consulta el DNS para traducir el nombre de dominio a una dirección IP. Luego abre una conexión TCP hacia ese servidor y envía una petición HTTP con el método, la ruta y cabeceras. El servidor procesa la petición y responde con un código de estado, cabeceras y el cuerpo del recurso solicitado.',
        code: `GET /index.html HTTP/1.1
Host: ejemplo.com
Accept: text/html`,
      },
      {
        title: 'HTTP y HTTPS',
        body: 'HTTP es el protocolo de transferencia de hipertexto que define el formato de peticiones y respuestas. HTTPS agrega una capa TLS que cifra la comunicación, garantizando confidencialidad e integridad. Los navegadores modernos marcan los sitios sin HTTPS como "No seguro" y muchas APIs sólo funcionan en contextos seguros.',
      },
      {
        title: 'El navegador renderiza la página',
        body: 'Una vez recibido el HTML, el navegador lo parsea y construye el DOM. Al encontrar referencias a CSS y JavaScript los descarga y los procesa. El motor de renderizado calcula el layout, pinta los píxeles en pantalla y ejecuta los scripts. Este proceso es la base de todo lo que aprenderás sobre performance y optimización.',
      },
    ],
    concepts: [
      { term: 'DNS', definition: 'Sistema distribuido que traduce nombres de dominio legibles por humanos a direcciones IP numéricas.' },
      { term: 'HTTP', definition: 'Protocolo de capa de aplicación que define cómo se estructuran y transmiten mensajes entre cliente y servidor.' },
      { term: 'TLS', definition: 'Protocolo criptográfico que proporciona comunicaciones seguras en redes de computadoras, base de HTTPS.' },
      { term: 'DOM', definition: 'Representación en árbol del documento HTML que el navegador construye y que JavaScript puede manipular.' },
      { term: 'Código de estado HTTP', definition: 'Número de tres dígitos que indica el resultado de una petición: 200 éxito, 404 no encontrado, 500 error del servidor.' },
    ],
    exercises: [
      'Abrí las DevTools de tu navegador, andá a la pestaña Network y analizá los encabezados de la petición y respuesta al cargar una página conocida.',
      'Buscá en DevTools el tiempo que tarda cada recurso en cargarse e identificá cuál es el más lento.',
      'Escribí con tus propias palabras los pasos que ocurren desde que presionás Enter en la barra de direcciones hasta que ves el contenido.',
    ],
  },

  'found-2': {
    objectives: [
      'Inicializar un repositorio Git y realizar commits significativos',
      'Usar ramas para desarrollar funcionalidades de forma aislada',
      'Sincronizar cambios con un repositorio remoto en GitHub',
      'Resolver conflictos de merge de manera efectiva',
    ],
    sections: [
      {
        title: 'Qué es el control de versiones',
        body: 'Git es un sistema de control de versiones distribuido que registra cada cambio en tu código como una fotografía del estado del proyecto. A diferencia de guardar copias de archivos manualmente, Git permite viajar en el tiempo, trabajar en paralelo y fusionar cambios de distintas personas sin perder trabajo. Cada desarrollador tiene una copia completa del historial.',
        code: `git init
git add .
git commit -m "feat: estructura inicial del proyecto"`,
      },
      {
        title: 'Ramas y flujo de trabajo',
        body: 'Una rama es un puntero móvil a un commit específico. Crear una rama te permite experimentar o implementar una funcionalidad sin afectar la rama principal. El flujo más común es crear una rama por funcionalidad, hacer commits, y luego fusionarla con main mediante un pull request revisado por el equipo.',
        code: `git checkout -b feature/login
# trabajás en tus cambios
git add src/auth.js
git commit -m "feat: formulario de login con validación"
git push origin feature/login`,
      },
      {
        title: 'Mensajes de commit convencionales',
        body: 'Un mensaje de commit bien escrito comunica el porqué de un cambio, no solo el qué. La convención Conventional Commits usa prefijos como feat, fix, docs, refactor, test para categorizar cambios automáticamente. Esto facilita la generación de changelogs y la comprensión del historial por parte del equipo.',
      },
    ],
    concepts: [
      { term: 'Commit', definition: 'Fotografía del estado de los archivos en un momento dado, con un mensaje descriptivo y un hash único.' },
      { term: 'Rama (branch)', definition: 'Línea de desarrollo independiente que permite trabajar en paralelo sin afectar otras ramas.' },
      { term: 'Merge', definition: 'Operación que integra los cambios de una rama en otra, combinando los historiales.' },
      { term: 'Remote', definition: 'Versión del repositorio alojada en un servidor como GitHub que sirve de punto de sincronización entre colaboradores.' },
      { term: 'Pull Request', definition: 'Mecanismo de plataformas como GitHub para proponer cambios, revisar código y fusionar ramas controladamente.' },
    ],
    exercises: [
      'Creá un repositorio nuevo, agregá un archivo README y realizá al menos tres commits con mensajes descriptivos siguiendo Conventional Commits.',
      'Creá una rama llamada feature/mi-funcionalidad, modificá un archivo, hacé commit y luego fusionála con main usando git merge.',
      'Subí el repositorio a GitHub y practicá el flujo de pull request: creá una rama, pusheá y abrí un PR aunque seas el único colaborador.',
    ],
  },

  'found-3': {
    objectives: [
      'Configurar VS Code con extensiones esenciales para desarrollo web',
      'Navegar el sistema de archivos y ejecutar comandos básicos en la terminal',
      'Usar atajos de teclado que aumenten la velocidad de edición',
    ],
    sections: [
      {
        title: 'El editor de código',
        body: 'VS Code es el editor más usado en desarrollo web por su velocidad, extensibilidad y la integración con Git y la terminal. Las extensiones más valiosas al empezar son ESLint para detectar errores, Prettier para formatear el código automáticamente y GitLens para visualizar el historial de cambios en cada línea. Configurar el formato automático al guardar elimina fricciones del flujo de trabajo.',
        code: `// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2
}`,
      },
      {
        title: 'La terminal como herramienta central',
        body: 'La terminal te da control directo sobre el sistema operativo y es indispensable para ejecutar servidores, instalar dependencias, controlar Git y automatizar tareas. Los comandos más usados son cd, ls, mkdir, cp, mv y rm para navegar y gestionar archivos. Invertir tiempo en aprender la terminal multiplica la productividad a largo plazo.',
        code: `cd ~/proyectos
mkdir mi-sitio && cd mi-sitio
ls -la`,
      },
    ],
    concepts: [
      { term: 'Extensión', definition: 'Plugin que agrega funcionalidad a VS Code, como soporte para lenguajes, linters o integraciones con servicios externos.' },
      { term: 'Linter', definition: 'Herramienta que analiza el código estáticamente para detectar errores, problemas de estilo y malas prácticas antes de ejecutarlo.' },
      { term: 'Formatter', definition: 'Herramienta que reorganiza automáticamente el código siguiendo reglas de estilo consistentes, como Prettier.' },
      { term: 'Path absoluto vs relativo', definition: 'Un path absoluto parte desde la raíz del sistema (/home/user), mientras que uno relativo parte desde el directorio actual.' },
    ],
    exercises: [
      'Instalá VS Code y configurá Prettier con formato automático al guardar; verificá que funcione editando un archivo JavaScript con formato incorrecto.',
      'Navegá por el sistema de archivos usando solo la terminal: creá una carpeta, movete dentro, creá un archivo con touch y listá el contenido.',
      'Aprendé y practicá cinco atajos de teclado de VS Code: duplicar línea, mover línea, abrir terminal integrada, búsqueda en archivos y paleta de comandos.',
    ],
  },

  'found-4': {
    objectives: [
      'Escribir HTML semántico usando los elementos correctos para cada contenido',
      'Estructurar una página completa con header, main, footer y nav',
      'Entender la importancia del HTML semántico para accesibilidad y SEO',
    ],
    sections: [
      {
        title: 'Por qué el HTML semántico importa',
        body: 'El HTML semántico usa elementos cuyo nombre describe el tipo de contenido que contienen. Usar article en lugar de div para un artículo, o nav para navegación, comunica la estructura al navegador, a los lectores de pantalla y a los motores de búsqueda. Esta práctica mejora la accesibilidad sin trabajo extra y es la base de un código mantenible.',
        code: `<article>
  <header>
    <h1>Título del artículo</h1>
    <time datetime="2025-01-15">15 de enero</time>
  </header>
  <p>Contenido del artículo...</p>
</article>`,
      },
      {
        title: 'Elementos estructurales de HTML5',
        body: 'HTML5 introdujo elementos de sección como header, footer, main, nav, section, article y aside. Cada uno comunica un rol específico en la página. main debe aparecer una sola vez por página y contener el contenido principal, mientras que header y footer pueden repetirse dentro de section o article.',
        code: `<body>
  <header><nav>...</nav></header>
  <main>
    <section>...</section>
    <aside>...</aside>
  </main>
  <footer>...</footer>
</body>`,
      },
      {
        title: 'Formularios y accesibilidad básica',
        body: 'Los formularios requieren asociar cada input con su label usando el atributo for que apunta al id del campo. Esto permite que los lectores de pantalla anuncien el propósito del campo cuando recibe foco. Los atributos required, type y autocomplete mejoran la experiencia del usuario y la validación nativa del navegador.',
      },
    ],
    concepts: [
      { term: 'HTML semántico', definition: 'Uso de elementos HTML cuyo nombre describe el significado del contenido, en lugar de usar div o span para todo.' },
      { term: 'Accesibilidad', definition: 'Práctica de diseñar interfaces que puedan ser usadas por personas con diversas discapacidades, incluyendo quienes usan lectores de pantalla.' },
      { term: 'SEO', definition: 'Optimización para motores de búsqueda; el HTML semántico ayuda a los crawlers a entender la jerarquía y relevancia del contenido.' },
      { term: 'Atributo alt', definition: 'Texto alternativo en imágenes que describe su contenido para lectores de pantalla y cuando la imagen no carga.' },
    ],
    exercises: [
      'Construí el HTML de una página de blog con al menos un artículo completo, usando header, main, article, section, aside y footer correctamente.',
      'Validá tu HTML en validator.w3.org y corregí todos los errores o advertencias que encuentres.',
      'Agregá un formulario de contacto con campos de nombre, email y mensaje, asegurándote de que cada campo tenga su label asociado.',
    ],
  },

  'found-5': {
    objectives: [
      'Comprender el box model: content, padding, border y margin',
      'Distinguir entre elementos block e inline y cómo afectan el flujo',
      'Usar box-sizing: border-box para simplificar el cálculo de dimensiones',
    ],
    sections: [
      {
        title: 'El modelo de caja',
        body: 'Cada elemento HTML es una caja rectangular compuesta de cuatro capas: el contenido en el centro, rodeado de padding (espacio interior), luego el border y finalmente el margin (espacio exterior). Por defecto, width y height sólo afectan el área de contenido, lo que hace que agregar padding o border aumente el tamaño total del elemento.',
        code: `/* Con box-sizing: border-box, width incluye padding y border */
* {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 1.5rem;
  border: 1px solid #ccc;
  /* El total sigue siendo 300px */
}`,
      },
      {
        title: 'Flujo normal del documento',
        body: 'En el flujo normal, los elementos block como div, p y h1 ocupan todo el ancho disponible y se apilan verticalmente. Los elementos inline como span, a y strong fluyen dentro del texto horizontal. Entender el flujo normal es esencial antes de usar Flexbox o Grid, porque estas herramientas lo modifican en lugar de reemplazarlo.',
      },
      {
        title: 'Colapso de márgenes',
        body: 'Cuando dos márgenes verticales adyacentes se encuentran, no se suman sino que colapsan y prevalece el mayor. Este comportamiento afecta los márgenes entre párrafos, entre el primer hijo y su padre, y entre hermanos adyacentes. Conocer este fenómeno evita frustración al intentar espaciar elementos verticalmente.',
      },
    ],
    concepts: [
      { term: 'Box model', definition: 'Modelo que describe cómo se calcula el tamaño y espacio de cada elemento: content + padding + border + margin.' },
      { term: 'box-sizing: border-box', definition: 'Propiedad que hace que width y height incluyan el padding y el border, simplificando los cálculos de layout.' },
      { term: 'Elemento block', definition: 'Elemento que ocupa todo el ancho disponible y genera un salto de línea antes y después, como div, p, h1.' },
      { term: 'Elemento inline', definition: 'Elemento que fluye dentro del texto sin generar saltos de línea, como span, a, strong.' },
      { term: 'Colapso de márgenes', definition: 'Comportamiento por el cual dos márgenes verticales adyacentes se fusionan en uno solo, prevaleciendo el mayor.' },
    ],
    exercises: [
      'Creá una tarjeta con width fijo, padding, border y margin. Inspeccionala en DevTools y observá cómo cambia el tamaño total con y sin box-sizing: border-box.',
      'Creá tres párrafos con distintos márgenes verticales y observá el colapso de márgenes en DevTools.',
      'Experimentá con display: inline, block e inline-block en distintos elementos y documentá las diferencias de comportamiento.',
    ],
  },

  'found-6': {
    objectives: [
      'Crear layouts con Flexbox usando flex-direction, justify-content y align-items',
      'Controlar el crecimiento y encogimiento de items con flex-grow y flex-shrink',
      'Construir una barra de navegación y una grilla de tarjetas con Flexbox',
    ],
    sections: [
      {
        title: 'El modelo Flexbox',
        body: 'Flexbox es un modelo de layout unidimensional diseñado para distribuir espacio y alinear items en una sola dirección, ya sea fila o columna. Al aplicar display: flex a un contenedor, sus hijos directos se convierten en flex items y siguen las reglas del eje principal (main axis) y el eje transversal (cross axis). Esta separación entre contenedor e items es la clave para entender Flexbox.',
        code: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}`,
      },
      {
        title: 'Alineación y distribución',
        body: 'justify-content controla la distribución de espacio sobre el eje principal, con valores como flex-start, center, space-between y space-around. align-items alinea los items en el eje transversal. Para alinear un solo item de forma diferente al resto, se usa align-self. La propiedad gap permite espaciado uniforme entre items sin usar márgenes.',
        code: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 280px; /* grow shrink basis */
}`,
      },
      {
        title: 'Flex-grow, flex-shrink y flex-basis',
        body: 'flex-grow determina cuánto puede crecer un item para ocupar el espacio disponible. flex-shrink determina cuánto puede encogerse cuando el espacio es insuficiente. flex-basis establece el tamaño inicial antes de que se apliquen grow y shrink. La shorthand flex: 1 es equivalente a flex: 1 1 0, permitiendo que los items crezcan equitativamente.',
      },
    ],
    concepts: [
      { term: 'Flex container', definition: 'Elemento al que se le aplica display: flex, lo que convierte a sus hijos directos en flex items.' },
      { term: 'Main axis', definition: 'Eje principal de un flex container, determinado por flex-direction: puede ser horizontal (row) o vertical (column).' },
      { term: 'justify-content', definition: 'Propiedad que distribuye el espacio libre entre flex items a lo largo del eje principal.' },
      { term: 'align-items', definition: 'Propiedad que alinea los flex items a lo largo del eje transversal dentro del flex container.' },
      { term: 'flex-wrap', definition: 'Propiedad que permite a los flex items pasar a la siguiente línea cuando no caben en el contenedor.' },
    ],
    exercises: [
      'Construí una barra de navegación con el logo a la izquierda, links centrados y un botón a la derecha, usando solo Flexbox.',
      'Creá una grilla de tarjetas que sea responsive usando flex-wrap y flex: 1 1 250px, sin media queries.',
      'Construí un layout de página completo con header, sidebar y contenido principal usando Flexbox anidado.',
    ],
  },

  'found-7': {
    objectives: [
      'Definir grillas con grid-template-columns y grid-template-rows',
      'Posicionar elementos manualmente con grid-column y grid-row',
      'Crear layouts de página complejos usando grid-template-areas',
    ],
    sections: [
      {
        title: 'Fundamentos de CSS Grid',
        body: 'CSS Grid es un sistema de layout bidimensional que permite controlar filas y columnas simultáneamente. A diferencia de Flexbox que opera en una sola dirección, Grid gestiona ambos ejes a la vez. Se define en el contenedor con display: grid y las columnas se especifican con grid-template-columns usando valores fijos, porcentajes o la unidad fr que representa fracciones del espacio disponible.',
        code: `.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 0;
}`,
      },
      {
        title: 'Grid template areas',
        body: 'grid-template-areas permite nombrar zonas de la grilla y asignar elementos a esas zonas con grid-area, creando un layout visual en el CSS. Esto hace que la intención del layout sea legible de un vistazo. Cambiar la disposición para distintos breakpoints es tan simple como redefinir el template-areas en la media query.',
        code: `.layout {
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }`,
      },
      {
        title: 'La unidad fr y repeat()',
        body: 'La unidad fr distribuye el espacio disponible de forma proporcional. repeat(3, 1fr) crea tres columnas iguales, mientras que repeat(auto-fill, minmax(200px, 1fr)) crea tantas columnas como quepan de al menos 200px, haciendo el layout responsive sin media queries. Esta técnica es una de las más poderosas del CSS moderno.',
      },
    ],
    concepts: [
      { term: 'Grid container', definition: 'Elemento con display: grid que establece un contexto de formato de grilla para sus hijos directos.' },
      { term: 'Unidad fr', definition: 'Unidad fraccionaria que representa una porción del espacio libre disponible en el grid container.' },
      { term: 'grid-template-areas', definition: 'Propiedad que define zonas nombradas en la grilla para asignar elementos de forma declarativa y visual.' },
      { term: 'grid-column / grid-row', definition: 'Propiedades que especifican en qué líneas de la grilla empieza y termina un elemento.' },
      { term: 'minmax()', definition: 'Función de CSS Grid que establece un tamaño mínimo y máximo para columnas o filas, habilitando layouts flexibles.' },
    ],
    exercises: [
      'Creá un layout de página con header, sidebar izquierdo, área de contenido y footer usando grid-template-areas.',
      'Construí una galería de imágenes responsive con repeat(auto-fill, minmax(200px, 1fr)) y observá cómo se adapta al cambiar el tamaño de la ventana.',
      'Posicioná un elemento para que abarque dos columnas y dos filas usando grid-column y grid-row.',
    ],
  },

  'found-8': {
    objectives: [
      'Aplicar la estrategia mobile-first al escribir CSS',
      'Usar media queries para adaptar el layout a distintos viewports',
      'Elegir unidades relativas (rem, em, %) para tipografía y espaciado fluidos',
    ],
    sections: [
      {
        title: 'La estrategia mobile-first',
        body: 'Mobile-first significa escribir los estilos base para pantallas pequeñas y luego agregar complejidad mediante media queries con min-width para pantallas más grandes. Este enfoque es más eficiente porque los dispositivos móviles no descargan estilos de pantallas grandes innecesariamente, y obliga a priorizar el contenido esencial desde el inicio del diseño.',
        code: `/* Base: mobile */
.nav { flex-direction: column; }

/* Tablet en adelante */
@media (min-width: 768px) {
  .nav { flex-direction: row; }
}

/* Desktop */
@media (min-width: 1024px) {
  .nav { gap: 2rem; }
}`,
      },
      {
        title: 'Unidades relativas y tipografía fluida',
        body: 'Las unidades rem se calculan en relación al font-size del elemento raíz (html), haciendo que todo escale proporcionalmente. clamp() permite definir un valor que crece linealmente entre un mínimo y un máximo según el viewport, creando tipografía verdaderamente fluida sin puntos de quiebre discretos. Esto elimina la necesidad de redefinir font-sizes en múltiples media queries.',
        code: `html { font-size: 16px; }

h1 {
  /* mínimo 1.75rem, fluido entre viewports, máximo 3rem */
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
}`,
      },
    ],
    concepts: [
      { term: 'Mobile-first', definition: 'Estrategia de diseño que comienza por la experiencia en pantallas pequeñas y agrega complejidad para pantallas mayores.' },
      { term: 'Media query', definition: 'Regla CSS que aplica estilos condicionalmente según características del dispositivo como el ancho del viewport.' },
      { term: 'Viewport', definition: 'Área visible de la ventana del navegador, cuyas dimensiones determinan qué media queries se activan.' },
      { term: 'rem', definition: 'Unidad relativa al font-size del elemento raíz (html), que facilita el escalado tipográfico consistente.' },
      { term: 'clamp()', definition: 'Función CSS que limita un valor entre un mínimo y un máximo, permitiendo interpolación fluida según el viewport.' },
    ],
    exercises: [
      'Tomá un layout de tres columnas de desktop y reescribilo con enfoque mobile-first: una columna en base, dos en tablet, tres en desktop.',
      'Reemplazá todos los valores px de font-size en un proyecto por rem y verificá que el texto escale correctamente al cambiar el font-size del html.',
      'Implementá un componente de navegación que sea un menú hamburguesa en mobile y una barra horizontal en desktop.',
    ],
  },

  'found-9': {
    objectives: [
      'Identificar los tipos de datos primitivos de JavaScript y cómo se comportan',
      'Declarar variables con let y const de manera apropiada',
      'Escribir estructuras de control: if/else, switch, for, while y for...of',
    ],
    sections: [
      {
        title: 'Tipos y variables',
        body: 'JavaScript tiene siete tipos primitivos: string, number, bigint, boolean, undefined, null y symbol. Las variables declaradas con const no pueden reasignarse, mientras que let sí permite reasignación pero está limitada al bloque donde se declara. Usar const por defecto y let sólo cuando se necesita reasignación es la convención moderna que reduce errores accidentales.',
        code: `const nombre = 'Ana';
let edad = 28;
const activo = true;

// typeof permite inspeccionar el tipo
console.log(typeof nombre); // "string"
console.log(typeof 42);     // "number"
console.log(typeof null);   // "object" (bug histórico de JS)`,
      },
      {
        title: 'Operadores y coerción',
        body: 'JavaScript realiza coerción implícita de tipos en comparaciones con ==, lo que produce resultados sorprendentes. Usar === (igualdad estricta) compara valor y tipo sin coerción, siendo predecible. Los operadores lógicos && y || no solo retornan booleanos sino el valor del operando que determina el resultado, comportamiento útil para valores por defecto.',
        code: `// Coerción vs igualdad estricta
console.log(0 == false);  // true (coerción)
console.log(0 === false); // false (estricta)

// Short-circuit evaluation
const nombre = usuario?.nombre || 'Anónimo';`,
      },
      {
        title: 'Estructuras de control',
        body: 'El for...of itera sobre cualquier iterable (arrays, strings, Maps, Sets) de forma limpia sin preocuparse por índices. El for...in itera sobre las claves enumerables de un objeto. El operador ternario ? : es útil para asignaciones condicionales simples, pero no debe anidarse porque pierde legibilidad.',
      },
    ],
    concepts: [
      { term: 'Tipo primitivo', definition: 'Valor inmutable que no es un objeto: string, number, boolean, null, undefined, bigint, symbol.' },
      { term: 'Hoisting', definition: 'Comportamiento de JavaScript que mueve las declaraciones al inicio de su scope durante la compilación, antes de la ejecución.' },
      { term: 'Coerción de tipos', definition: 'Conversión implícita de un tipo a otro que JavaScript realiza en comparaciones y operaciones con tipos mixtos.' },
      { term: 'Scope de bloque', definition: 'Ámbito limitado al bloque (llaves {}) donde se declara una variable con let o const.' },
      { term: 'Truthy / Falsy', definition: 'Valores que se evalúan como verdaderos o falsos en contextos booleanos; los falsy son: 0, "", null, undefined, NaN, false.' },
    ],
    exercises: [
      'Creá una función que reciba un array de números y retorne un objeto con la suma, el promedio y el valor máximo.',
      'Escribí un programa que imprima los números del 1 al 100, pero que para múltiplos de 3 imprima "Fizz", para múltiplos de 5 "Buzz" y para múltiplos de ambos "FizzBuzz".',
      'Explorá la coerción de tipos: escribí cinco comparaciones con == que den resultados inesperados y explicá por qué ocurren.',
    ],
  },

  'found-10': {
    objectives: [
      'Entender la diferencia entre declaración de función y expresión de función',
      'Explicar el scope léxico y el cierre (closure)',
      'Usar funciones de orden superior y callbacks correctamente',
    ],
    sections: [
      {
        title: 'Declaraciones vs expresiones de función',
        body: 'Una declaración de función (function foo() {}) se eleva al inicio del scope por hoisting, lo que permite usarla antes de definirla. Una expresión de función (const foo = function() {}) o arrow function (const foo = () => {}) no se eleva y sólo existe desde el punto de declaración. Las arrow functions no tienen su propio this, lo que las hace ideales para callbacks.',
        code: `// Arrow function con retorno implícito
const doble = (n) => n * 2;

// Arrow function con cuerpo
const saludar = (nombre) => {
  const msg = \`Hola, \${nombre}\`;
  return msg;
};`,
      },
      {
        title: 'Scope léxico y closures',
        body: 'El scope léxico significa que una función tiene acceso a las variables del entorno donde fue definida, no donde fue llamada. Cuando una función retorna otra función que accede a las variables de la externa, se crea un closure: la función interna "cierra" sobre el entorno externo y mantiene esas variables vivas. Los closures son la base de patrones como el módulo y el factory function.',
        code: `function crearContador() {
  let cuenta = 0;
  return {
    incrementar: () => ++cuenta,
    obtener: () => cuenta,
  };
}

const contador = crearContador();
contador.incrementar();
console.log(contador.obtener()); // 1`,
      },
    ],
    concepts: [
      { term: 'Scope léxico', definition: 'Regla por la que el alcance de las variables se determina por la posición del código en el texto, no por cómo se llama la función.' },
      { term: 'Closure', definition: 'Función que recuerda y accede a variables de su scope externo incluso después de que ese scope haya terminado de ejecutarse.' },
      { term: 'Función de orden superior', definition: 'Función que recibe otras funciones como argumentos o devuelve una función como resultado.' },
      { term: 'Callback', definition: 'Función pasada como argumento a otra función para ser invocada en algún momento posterior.' },
      { term: 'Hoisting', definition: 'Proceso por el que las declaraciones de función se mueven al inicio de su scope antes de la ejecución del código.' },
    ],
    exercises: [
      'Escribí una función crearMultiplicador(factor) que retorne una función que multiplique su argumento por factor, usando closure.',
      'Implementá una función debounce(fn, ms) que retrase la ejecución de fn hasta que pasen ms milisegundos sin que se la vuelva a llamar.',
      'Explicá con un ejemplo propio la diferencia entre this en una función normal y en una arrow function dentro de un método de objeto.',
    ],
  },

  'found-11': {
    objectives: [
      'Usar los métodos de array map, filter y reduce con confianza',
      'Encadenar métodos de array para transformar datos de forma declarativa',
      'Distinguir cuándo usar forEach, map, filter y reduce según el objetivo',
    ],
    sections: [
      {
        title: 'Métodos de transformación de arrays',
        body: 'map transforma cada elemento y retorna un array nuevo del mismo tamaño. filter retorna un array con los elementos que pasan la condición. reduce acumula todos los elementos en un único valor. Ninguno de estos métodos modifica el array original, lo que los hace seguros y predecibles. Son preferibles a los bucles for cuando el código declara la intención en lugar de los pasos.',
        code: `const productos = [
  { nombre: 'Taza', precio: 350, stock: true },
  { nombre: 'Libro', precio: 1200, stock: false },
  { nombre: 'Lapiz', precio: 80, stock: true },
];

const totalDisponible = productos
  .filter((p) => p.stock)
  .reduce((acc, p) => acc + p.precio, 0);

console.log(totalDisponible); // 430`,
      },
      {
        title: 'find, some, every y flat',
        body: 'find retorna el primer elemento que cumple la condición (o undefined). some retorna true si al menos un elemento la cumple. every retorna true si todos la cumplen. flatMap combina map y flat en un paso: mapea cada elemento y aplana el resultado un nivel. Estos métodos reemplazan bucles imperativos con expresiones declarativas más legibles.',
        code: `const numeros = [1, 2, 3, 4, 5];

const tienePares = numeros.some((n) => n % 2 === 0);   // true
const todosPares = numeros.every((n) => n % 2 === 0);  // false
const primerPar  = numeros.find((n) => n % 2 === 0);   // 2`,
      },
    ],
    concepts: [
      { term: 'Array.map()', definition: 'Método que aplica una función a cada elemento y retorna un array nuevo con los resultados transformados.' },
      { term: 'Array.filter()', definition: 'Método que retorna un array nuevo con sólo los elementos para los que la función predicate retorna true.' },
      { term: 'Array.reduce()', definition: 'Método que acumula todos los elementos del array en un único valor usando una función acumuladora.' },
      { term: 'Inmutabilidad', definition: 'Principio de no modificar los datos originales sino crear nuevas versiones con los cambios aplicados.' },
      { term: 'Programación declarativa', definition: 'Estilo que expresa el qué se quiere lograr en lugar del cómo hacerlo paso a paso.' },
    ],
    exercises: [
      'Dado un array de objetos con nombre, edad y ciudad, usá filter y map para obtener los nombres en mayúsculas de las personas mayores de 18 años.',
      'Usá reduce para agrupar un array de objetos por una propiedad, retornando un objeto donde las claves son los valores únicos de esa propiedad.',
      'Reescribí un bucle for imperativo que calcule estadísticas de un array usando sólo métodos de array encadenados.',
    ],
  },

  'found-12': {
    objectives: [
      'Seleccionar elementos del DOM con querySelector y querySelectorAll',
      'Crear y modificar elementos dinámicamente con createElement e innerHTML',
      'Escuchar y responder a eventos del usuario con addEventListener',
    ],
    sections: [
      {
        title: 'Seleccionar y leer el DOM',
        body: 'querySelector acepta cualquier selector CSS y retorna el primer elemento que coincide. querySelectorAll retorna un NodeList con todos los coincidentes, que puede iterarse con forEach. Es preferible usar selectores semánticos como data-* o clases específicas a IDs para mantener el CSS y el JS desacoplados.',
        code: `const boton = document.querySelector('[data-action="enviar"]');
const items = document.querySelectorAll('.lista-item');

items.forEach((item) => {
  console.log(item.textContent);
});`,
      },
      {
        title: 'Crear y modificar elementos',
        body: 'createElement crea un elemento en memoria sin insertarlo al DOM. Se le pueden agregar clases, atributos y contenido antes de añadirlo con appendChild o insertAdjacentElement. innerHTML es más rápido para estructuras grandes pero puede abrir vulnerabilidades XSS si se inserta contenido de usuarios sin sanitizar. Para texto de usuario siempre usá textContent.',
        code: `function crearTarjeta(titulo, descripcion) {
  const card = document.createElement('article');
  card.className = 'card';
  const h2 = document.createElement('h2');
  h2.textContent = titulo;
  card.appendChild(h2);
  return card;
}

document.querySelector('.grid').appendChild(crearTarjeta('Hola', '...'));`,
      },
      {
        title: 'Eventos y delegación',
        body: 'addEventListener agrega un listener que se ejecuta cuando ocurre un evento en el elemento. En lugar de agregar listeners a cada elemento de una lista, se puede usar event delegation: un único listener en el contenedor padre que inspecciona event.target para saber qué hijo disparó el evento. Esto es más eficiente y funciona con elementos creados dinámicamente.',
      },
    ],
    concepts: [
      { term: 'DOM', definition: 'Representación en árbol de los elementos HTML que el navegador construye y que JavaScript puede leer y modificar.' },
      { term: 'Event delegation', definition: 'Patrón que consiste en registrar un único listener en un elemento padre para manejar eventos de todos sus hijos.' },
      { term: 'Event bubbling', definition: 'Mecanismo por el que un evento se propaga desde el elemento origen hacia los ancestros en el árbol del DOM.' },
      { term: 'XSS', definition: 'Cross-Site Scripting: vulnerabilidad que ocurre al insertar HTML no sanitizado que puede contener scripts maliciosos.' },
      { term: 'NodeList', definition: 'Colección de nodos del DOM retornada por querySelectorAll, similar a un array pero con métodos limitados.' },
    ],
    exercises: [
      'Construí una lista de tareas que permita agregar ítems con un formulario y marcarlos como completados al hacer clic.',
      'Implementá event delegation en una lista de 50 items generados dinámicamente con un solo addEventListener en el contenedor.',
      'Creá un componente de acordeón que muestre y oculte contenido al hacer clic en los encabezados, manejando el estado con clases CSS.',
    ],
  },

  'found-13': {
    objectives: [
      'Aplicar HTML, CSS y JavaScript vanilla para construir una aplicación interactiva completa',
      'Gestionar estado de la aplicación con objetos JavaScript',
      'Usar eventos del mouse y teclado para crear experiencias interactivas',
    ],
    sections: [
      {
        title: 'Arquitectura del proyecto',
        body: 'Etch-a-Sketch es un juguete que permite dibujar moviendo perillas. La versión web usa una grilla de divs donde el color de cada celda cambia al pasar el mouse. El estado de la aplicación es simple: el tamaño de la grilla y si el modo borrador está activo. Separar la lógica de render (crear los divs) de la lógica de negocio (cambiar el tamaño, resetear) hace el código mantenible.',
        code: `function crearGrilla(tamaño) {
  const grilla = document.querySelector('#grilla');
  grilla.innerHTML = '';
  grilla.style.gridTemplateColumns = \`repeat(\${tamaño}, 1fr)\`;

  for (let i = 0; i < tamaño * tamaño; i++) {
    const celda = document.createElement('div');
    celda.classList.add('celda');
    grilla.appendChild(celda);
  }
}`,
      },
      {
        title: 'Interactividad con eventos',
        body: 'El dibujo ocurre al mover el mouse sobre las celdas mientras el botón está presionado. Para trackear si el mouse está presionado, se escuchan los eventos mousedown y mouseup en el documento. Luego cada celda escucha mouseover y sólo colorea si el estado indica que el mouse está presionado. Esta combinación de estado global y eventos locales es un patrón fundamental.',
      },
    ],
    concepts: [
      { term: 'Estado de aplicación', definition: 'Conjunto de variables que representan la condición actual de la interfaz y determinan qué se renderiza.' },
      { term: 'Event mouseover', definition: 'Evento que se dispara cada vez que el cursor entra en el área de un elemento.' },
      { term: 'CSS Grid dinámico', definition: 'Técnica de modificar grid-template-columns desde JavaScript para cambiar la cantidad de columnas en tiempo de ejecución.' },
    ],
    exercises: [
      'Implementá el Etch-a-Sketch completo con una grilla de 16x16 que cambia de color al pasar el mouse con el botón presionado.',
      'Agregá un botón que pida al usuario un número y regenere la grilla con ese nuevo tamaño, manteniendo un máximo de 100x100.',
      'Implementá modos de color: un modo con color aleatorio por celda, un modo con un color elegido por el usuario y un modo borrador.',
    ],
  },

  'int-1': {
    objectives: [
      'Explicar la cadena de prototipos y cómo JavaScript resuelve propiedades',
      'Entender el comportamiento de this en distintos contextos de invocación',
      'Crear objetos con Object.create y con constructores de función',
    ],
    sections: [
      {
        title: 'La cadena de prototipos',
        body: 'En JavaScript, cada objeto tiene una referencia interna a otro objeto llamado su prototipo. Cuando se accede a una propiedad que no existe en el objeto, el motor la busca en el prototipo, luego en el prototipo del prototipo, y así sucesivamente hasta llegar a null. Este mecanismo es la base de la herencia en JavaScript, y es importante entenderlo antes de usar la sintaxis de clases.',
        code: `const animal = { respira: true };
const perro = Object.create(animal);
perro.ladra = true;

console.log(perro.ladra);   // true (propia)
console.log(perro.respira); // true (heredada del prototipo)
console.log(perro.hasOwnProperty('respira')); // false`,
      },
      {
        title: 'El this dinámico',
        body: 'El valor de this no se determina cuando se define la función sino cuando se la invoca. En una llamada de método (obj.metodo()), this es el objeto antes del punto. En una función normal llamada directamente, this es undefined en strict mode. Los métodos call, apply y bind permiten especificar explícitamente el valor de this, siendo bind el más usado para crear versiones "fijas" de métodos.',
        code: `const persona = {
  nombre: 'Ana',
  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  },
};

const saludarAna = persona.saludar.bind(persona);
setTimeout(saludarAna, 1000); // this sigue siendo persona`,
      },
    ],
    concepts: [
      { term: 'Prototipo', definition: 'Objeto del que otro hereda propiedades y métodos a través de la cadena de prototipos de JavaScript.' },
      { term: 'this', definition: 'Referencia al objeto de contexto de una función, cuyo valor depende de cómo se invoca la función.' },
      { term: 'Object.create()', definition: 'Método que crea un objeto nuevo con el objeto pasado como argumento establecido como su prototipo.' },
      { term: 'hasOwnProperty()', definition: 'Método que verifica si una propiedad pertenece directamente al objeto y no a su cadena de prototipos.' },
      { term: 'bind()', definition: 'Método que crea una nueva función con this fijado permanentemente al valor especificado.' },
    ],
    exercises: [
      'Creá una cadena de prototipos de tres niveles: vehiculo → automovil → deportivo, y verificá la herencia con instanceof y hasOwnProperty.',
      'Escribí un ejemplo donde el mismo método produce resultados distintos según cómo se llama (como método, como callback, con bind).',
      'Implementá un sistema simple de herencia usando Object.create sin usar la sintaxis de clase.',
    ],
  },

  'int-2': {
    objectives: [
      'Usar la sintaxis de clases de ES6 para crear constructores legibles',
      'Implementar herencia con extends y super',
      'Aplicar el patrón de composición como alternativa a la herencia profunda',
    ],
    sections: [
      {
        title: 'Clases en JavaScript',
        body: 'Las clases de ES6 son "azúcar sintáctica" sobre el sistema de prototipos. No agregan un mecanismo nuevo, sino una sintaxis más limpia para el mismo comportamiento. El constructor inicializa las propiedades de la instancia, los métodos se definen dentro del cuerpo de la clase y se ubican en el prototipo, y los métodos estáticos pertenecen a la clase misma.',
        code: `class Figura {
  constructor(color) {
    this.color = color;
  }
  describir() {
    return \`Figura de color \${this.color}\`;
  }
}

class Circulo extends Figura {
  constructor(color, radio) {
    super(color);
    this.radio = radio;
  }
  area() { return Math.PI * this.radio ** 2; }
}`,
      },
      {
        title: 'Composición sobre herencia',
        body: 'La herencia profunda (A extiende B extiende C extiende D) genera acoplamiento fuerte y hace difícil reutilizar comportamiento. La composición ensambla objetos a partir de unidades pequeñas de funcionalidad. En JavaScript, esto se implementa típicamente mezclando objetos con Object.assign o el spread operator, o pasando dependencias como argumentos (inyección de dependencias).',
        code: `const puedeVolar = (obj) => ({
  volar: () => \`\${obj.nombre} vuela\`,
});

const puedeNadar = (obj) => ({
  nadar: () => \`\${obj.nombre} nada\`,
});

const crearPato = (nombre) => {
  const base = { nombre };
  return Object.assign(base, puedeVolar(base), puedeNadar(base));
};`,
      },
    ],
    concepts: [
      { term: 'Clase', definition: 'Plantilla para crear objetos que define propiedades y métodos; en JavaScript es sintaxis sobre el sistema de prototipos.' },
      { term: 'extends', definition: 'Palabra clave que establece una relación de herencia entre clases, haciendo que una subclase herede del prototipo de la superclase.' },
      { term: 'super()', definition: 'Llamada que invoca el constructor de la superclase dentro del constructor de la subclase, inicializando la parte heredada.' },
      { term: 'Composición', definition: 'Patrón de diseño que construye objetos combinando comportamientos pequeños e independientes en lugar de usar herencia.' },
      { term: 'Método estático', definition: 'Método definido en la clase misma (no en el prototipo) que se llama sobre la clase, no sobre las instancias.' },
    ],
    exercises: [
      'Creá una jerarquía de clases para una aplicación de zoo con Animal, Mamífero, Ave y al menos dos clases concretas como Perro y Águila.',
      'Refactorizá la jerarquía anterior usando composición para los comportamientos puedeCorrer, puedeVolar, puedeNadar.',
      'Implementá una clase EventEmitter básica con métodos on, off y emit.',
    ],
  },

  'int-3': {
    objectives: [
      'Explicar qué es el event loop y por qué JavaScript es asíncrono',
      'Crear y encadenar Promesas correctamente',
      'Simplificar código asíncrono con async/await y manejar errores con try/catch',
    ],
    sections: [
      {
        title: 'El event loop y la asincronía',
        body: 'JavaScript es de un solo hilo: ejecuta una tarea a la vez. El event loop permite la asincronía posponiendo tareas (como esperar una respuesta de red) fuera del call stack, en colas de tareas. Cuando el stack queda vacío, el event loop toma la siguiente tarea de la cola de microtareas (promesas) primero, y luego de la cola de macrotareas (setTimeout). Entender esto explica por qué el código asíncrono debe ser explícito.',
        code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2`,
      },
      {
        title: 'Promesas y async/await',
        body: 'Una Promesa representa un valor que estará disponible en el futuro, en estado pending, fulfilled o rejected. .then() encadena transformaciones del valor exitoso y .catch() maneja errores. La sintaxis async/await hace que el código asíncrono se lea de forma secuencial: await pausa la ejecución de la función async hasta que la promesa se resuelva, sin bloquear el hilo.',
        code: `async function obtenerUsuario(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error al obtener usuario:', err);
    throw err;
  }
}`,
      },
    ],
    concepts: [
      { term: 'Event loop', definition: 'Mecanismo que permite a JavaScript manejar operaciones asíncronas comprobando continuamente si el call stack está vacío para procesar tareas pendientes.' },
      { term: 'Promesa (Promise)', definition: 'Objeto que representa la eventual finalización (o fallo) de una operación asíncrona y su valor resultante.' },
      { term: 'async/await', definition: 'Sintaxis que permite escribir código asíncrono de forma secuencial, usando await para esperar la resolución de promesas.' },
      { term: 'Microtarea', definition: 'Tarea de alta prioridad en la cola de tareas, como los callbacks de promesas, que se procesa antes que las macrotareas.' },
      { term: 'Promise.all()', definition: 'Método que ejecuta múltiples promesas en paralelo y resuelve cuando todas completan, o rechaza si cualquiera falla.' },
    ],
    exercises: [
      'Creá una función que retorne una Promesa que se resuelva con un número aleatorio después de 1 segundo, y encadenala con .then() para duplicar el valor.',
      'Usá Promise.all para hacer tres peticiones fetch en paralelo y mostrar los resultados cuando todas completen.',
      'Implementá una función con async/await que reintente una operación fallida hasta tres veces antes de propagar el error.',
    ],
  },

  'int-4': {
    objectives: [
      'Usar fetch para realizar peticiones GET y POST con cabeceras y body',
      'Manejar errores de red y errores HTTP de forma diferenciada',
      'Cancelar peticiones en vuelo con AbortController',
    ],
    sections: [
      {
        title: 'Fetch: peticiones y respuestas',
        body: 'fetch retorna una Promesa que se resuelve con un objeto Response cuando llega la respuesta, incluso si el estado HTTP es un error (4xx, 5xx). Esto significa que hay que verificar response.ok o response.status explícitamente antes de procesar el cuerpo. El cuerpo se lee con métodos como .json(), .text() o .blob(), que también retornan Promesas.',
        code: `async function postJSON(url, datos) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? \`HTTP \${res.status}\`);
  }
  return res.json();
}`,
      },
      {
        title: 'AbortController para cancelar peticiones',
        body: 'AbortController permite cancelar peticiones fetch en vuelo pasando su signal a la opción signal de fetch. Cuando se llama abort(), la promesa de fetch rechaza con un AbortError. Esto es esencial en interfaces donde el usuario puede navegar o cambiar un filtro antes de que llegue la respuesta anterior, evitando actualizar el estado con datos obsoletos.',
        code: `const controller = new AbortController();

fetch('/api/datos', { signal: controller.signal })
  .then((r) => r.json())
  .catch((err) => {
    if (err.name === 'AbortError') return; // cancelado, ignorar
    throw err;
  });

// Cancelar después de 5 segundos
setTimeout(() => controller.abort(), 5000);`,
      },
    ],
    concepts: [
      { term: 'fetch()', definition: 'API nativa del navegador para realizar peticiones HTTP, retornando una Promesa que resuelve con la Response.' },
      { term: 'Response.ok', definition: 'Propiedad booleana que es true si el código de estado HTTP está en el rango 200-299.' },
      { term: 'AbortController', definition: 'Objeto que permite señalizar la cancelación de operaciones asíncronas como peticiones fetch.' },
      { term: 'CORS', definition: 'Mecanismo de seguridad del navegador que restringe las peticiones HTTP a orígenes distintos del que sirve la página.' },
      { term: 'Race condition', definition: 'Error que ocurre cuando dos operaciones asíncronas llegan en orden distinto al esperado, causando inconsistencias en el estado.' },
    ],
    exercises: [
      'Construí un buscador que realice una petición fetch al tipear y cancele la petición anterior si el usuario sigue escribiendo antes de que llegue la respuesta.',
      'Creá una función fetchConReintentos que reintente una petición hasta N veces con espera exponencial entre intentos.',
      'Implementá una clase APIClient que envuelva fetch agregando autenticación con Bearer token, manejo de errores unificado y timeout automático.',
    ],
  },

  'int-5': {
    objectives: [
      'Usar import y export de módulos ES de forma nativa',
      'Entender qué hace un bundler y por qué Vite es la opción moderna',
      'Configurar un proyecto desde cero con Vite',
    ],
    sections: [
      {
        title: 'Módulos ES nativos',
        body: 'Los módulos ES (ESM) permiten dividir el código en archivos con exports e imports explícitos, reemplazando patrones como las IIFEs o CommonJS. Cada módulo tiene su propio scope: las variables declaradas en un módulo no contaminan el global. Los navegadores modernos soportan ESM nativamente con type="module", pero en producción los bundlers los empaquetan para optimizar la carga.',
        code: `// utils.js
export const formatDate = (date) =>
  new Intl.DateTimeFormat('es-AR').format(date);

export default function calcularIVA(precio, tasa = 0.21) {
  return precio * tasa;
}

// main.js
import calcularIVA, { formatDate } from './utils.js';`,
      },
      {
        title: 'Vite: por qué y cómo',
        body: 'Vite aprovecha ESM nativos del navegador durante el desarrollo, sirviendo cada archivo transformado por separado sin bundling previo. Esto hace que el servidor de desarrollo inicie instantáneamente y que los hot module replacements sean casi instantáneos. En producción usa Rollup para crear bundles optimizados con tree-shaking y code-splitting automático.',
        code: `npm create vite@latest mi-app -- --template react
cd mi-app
npm install
npm run dev`,
      },
    ],
    concepts: [
      { term: 'Módulo ES (ESM)', definition: 'Sistema de módulos estándar de JavaScript que usa import/export para definir dependencias entre archivos.' },
      { term: 'Bundler', definition: 'Herramienta que empaqueta múltiples módulos en uno o pocos archivos optimizados para producción.' },
      { term: 'Tree-shaking', definition: 'Optimización del bundler que elimina el código exportado pero no importado (código muerto) del bundle final.' },
      { term: 'HMR (Hot Module Replacement)', definition: 'Técnica de desarrollo que reemplaza módulos en el navegador sin recargar la página completa.' },
      { term: 'Code-splitting', definition: 'División del bundle en múltiples chunks que se cargan bajo demanda, reduciendo el tiempo de carga inicial.' },
    ],
    exercises: [
      'Creá un proyecto Vite vanilla y refactorizá un script monolítico dividiéndolo en al menos tres módulos con responsabilidades claras.',
      'Configurá un alias en vite.config.js para usar @/ en lugar de rutas relativas largas.',
      'Analizá el bundle de producción con rollup-plugin-visualizer e identificá el módulo más pesado.',
    ],
  },

  'int-6': {
    objectives: [
      'Configurar ESLint con una configuración flat moderna',
      'Entender las reglas más importantes y cuándo desactivarlas con criterio',
      'Integrar ESLint en el flujo de trabajo con scripts y pre-commit hooks',
    ],
    sections: [
      {
        title: 'Por qué un linter',
        body: 'Un linter analiza el código estáticamente para encontrar errores, inconsistencias y antipatrones antes de ejecutarlo. ESLint es el linter estándar de JavaScript y es altamente configurable: se pueden habilitar reglas individuales, usar configuraciones compartidas como eslint:recommended, y agregar plugins para React, TypeScript o accesibilidad. Integrado en el editor, detecta problemas en tiempo real.',
        code: `// eslint.config.js (flat config)
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];`,
      },
      {
        title: 'Convenciones de código en equipo',
        body: 'Las convenciones de código son acuerdos sobre el estilo y estructura del código que facilitan la revisión y el mantenimiento. Prettier maneja el formato (sangría, comillas, punto y coma) de forma no negociable. ESLint maneja la calidad del código (variables sin usar, complejidad ciclomática, imports desordenados). La combinación de ambos cubre los dos aspectos sin conflictos si se configura correctamente.',
      },
    ],
    concepts: [
      { term: 'Análisis estático', definition: 'Análisis del código sin ejecutarlo para detectar errores, vulnerabilidades o incumplimiento de convenciones.' },
      { term: 'Flat config', definition: 'Nuevo formato de configuración de ESLint (v9+) que usa un archivo eslint.config.js con un array de objetos de configuración.' },
      { term: 'Pre-commit hook', definition: 'Script que se ejecuta automáticamente antes de cada commit de Git para validar o formatear el código.' },
      { term: 'Husky', definition: 'Herramienta que facilita la configuración de Git hooks en proyectos Node.js.' },
    ],
    exercises: [
      'Instalá ESLint en un proyecto existente, ejecutalo y corregí todos los errores que encuentre.',
      'Configurá un pre-commit hook con husky y lint-staged que ejecute ESLint sólo sobre los archivos staged.',
      'Creá una regla ESLint personalizada simple que prohíba usar console.log en archivos de producción.',
    ],
  },

  'int-7': {
    objectives: [
      'Escribir pruebas unitarias con Vitest usando describe, it y expect',
      'Aplicar el ciclo TDD (Red-Green-Refactor) en una función simple',
      'Usar mocks y spies para aislar unidades de código en las pruebas',
    ],
    sections: [
      {
        title: 'Pruebas unitarias con Vitest',
        body: 'Vitest es un framework de pruebas construido sobre Vite que reutiliza la misma configuración del proyecto. Es compatible con la API de Jest, por lo que el conocimiento es transferible. Las pruebas se organizan en suites con describe y los casos individuales con it o test. expect provee los matchers para verificar resultados: toBe para igualdad estricta, toEqual para igualdad profunda, toThrow para errores.',
        code: `import { describe, it, expect } from 'vitest';
import { sumar, dividir } from './math.js';

describe('operaciones matemáticas', () => {
  it('suma dos números positivos', () => {
    expect(sumar(2, 3)).toBe(5);
  });

  it('lanza error al dividir por cero', () => {
    expect(() => dividir(10, 0)).toThrow('División por cero');
  });
});`,
      },
      {
        title: 'TDD y mocks',
        body: 'Test-Driven Development invierte el orden: se escribe la prueba que falla (Red), se implementa el mínimo código para que pase (Green) y se refactoriza manteniendo las pruebas en verde (Refactor). Los mocks reemplazan dependencias externas (APIs, base de datos) con implementaciones controladas. vi.fn() crea una función mock y vi.spyOn() espía sobre métodos existentes.',
        code: `import { vi, it, expect } from 'vitest';
import { notificarUsuario } from './notificaciones.js';

it('llama al servicio de email con los datos correctos', async () => {
  const mockEnviar = vi.fn().mockResolvedValue({ ok: true });
  await notificarUsuario('hola@test.com', 'Bienvenido', mockEnviar);
  expect(mockEnviar).toHaveBeenCalledWith('hola@test.com', 'Bienvenido');
});`,
      },
    ],
    concepts: [
      { term: 'Prueba unitaria', definition: 'Prueba que verifica el comportamiento de una unidad aislada de código (función, clase) sin dependencias externas reales.' },
      { term: 'TDD', definition: 'Metodología de desarrollo donde se escriben las pruebas antes que el código de producción, guiando el diseño.' },
      { term: 'Mock', definition: 'Objeto o función falsa que reemplaza una dependencia real en pruebas, con comportamiento controlado y registro de llamadas.' },
      { term: 'Coverage', definition: 'Porcentaje del código que es ejecutado por las pruebas; una métrica útil pero no suficiente por sí sola.' },
      { term: 'AAA (Arrange-Act-Assert)', definition: 'Patrón para estructurar pruebas: preparar el escenario, ejecutar la acción, y verificar el resultado.' },
    ],
    exercises: [
      'Escribí pruebas unitarias para una función carrito de compras con métodos agregar, eliminar y calcularTotal antes de implementarla (TDD).',
      'Creá pruebas para una función que hace fetch a una API, usando vi.mock para no realizar peticiones reales.',
      'Configurá la cobertura de código en Vitest y alcanzá un 80% de coverage en un módulo de utilidades.',
    ],
  },

  'int-8': {
    objectives: [
      'Crear componentes funcionales de React con JSX',
      'Pasar datos entre componentes mediante props',
      'Entender la reconciliación y por qué las keys son importantes en listas',
    ],
    sections: [
      {
        title: 'Componentes y JSX',
        body: 'Un componente de React es una función que recibe props y retorna JSX, que es una extensión de sintaxis de JavaScript que parece HTML pero se transpila a llamadas a React.createElement. Los componentes se nombran con mayúscula inicial para que React los distinga de los elementos HTML nativos. JSX permite expresiones JavaScript dentro de llaves, pero sólo expresiones, no sentencias.',
        code: `function TarjetaUsuario({ nombre, avatar, rol }) {
  return (
    <article className="card">
      <img src={avatar} alt={nombre} />
      <h2>{nombre}</h2>
      <p className="rol">{rol}</p>
    </article>
  );
}`,
      },
      {
        title: 'Props y composición de componentes',
        body: 'Las props son argumentos que el componente padre pasa al hijo, y son de sólo lectura: un componente nunca debe modificar sus propias props. La prop especial children permite envolver contenido arbitrario, habilitando el patrón de composición. Los valores por defecto de props se definen con desestructuración en los parámetros de la función.',
        code: `function Panel({ titulo, children, variante = 'default' }) {
  return (
    <div className={\`panel panel--\${variante}\`}>
      <h3 className="panel__titulo">{titulo}</h3>
      <div className="panel__cuerpo">{children}</div>
    </div>
  );
}

// Uso
<Panel titulo="Alertas" variante="warning">
  <p>Contenido del panel</p>
</Panel>`,
      },
    ],
    concepts: [
      { term: 'JSX', definition: 'Extensión de sintaxis de JavaScript que permite escribir estructura similar a HTML dentro del código, transpilada a llamadas React.createElement.' },
      { term: 'Props', definition: 'Argumentos de sólo lectura que un componente padre pasa a un componente hijo para configurar su apariencia o comportamiento.' },
      { term: 'Reconciliación', definition: 'Proceso de React para determinar qué partes del DOM actualizar comparando el árbol virtual nuevo con el anterior.' },
      { term: 'key', definition: 'Prop especial que ayuda a React identificar qué items de una lista cambiaron, se agregaron o se eliminaron.' },
      { term: 'children', definition: 'Prop especial que contiene el contenido JSX anidado entre las etiquetas de apertura y cierre de un componente.' },
    ],
    exercises: [
      'Construí un componente Card reutilizable con props para imagen, título, descripción y un botón de acción con callback.',
      'Creá una lista de componentes a partir de un array de datos, asegurándote de asignar keys estables (no índices).',
      'Implementá un componente Layout que use la prop children para envolver contenido con un header y footer comunes.',
    ],
  },

  'int-9': {
    objectives: [
      'Agregar estado a componentes con useState y entender su ciclo de actualización',
      'Manejar eventos del DOM en React correctamente',
      'Gestionar formularios controlados en React',
    ],
    sections: [
      {
        title: 'useState y actualizaciones de estado',
        body: 'useState retorna un par [valor, setter]. Llamar al setter con un nuevo valor encola una re-renderización del componente. Las actualizaciones de estado son asíncronas respecto al render actual: leer el estado inmediatamente después del setter devolverá el valor anterior. Cuando el nuevo estado depende del anterior, se pasa una función actualizadora al setter para garantizar consistencia.',
        code: `import { useState } from 'react';

function Contador() {
  const [cuenta, setCuenta] = useState(0);

  const incrementar = () => {
    // Forma funcional: garantiza usar el estado más reciente
    setCuenta((prev) => prev + 1);
  };

  return <button onClick={incrementar}>Clics: {cuenta}</button>;
}`,
      },
      {
        title: 'Formularios controlados',
        body: 'En un formulario controlado, React es la fuente de verdad del valor de cada input: el estado del componente refleja lo que está en el campo. Cada cambio del input llama al setter de useState, actualizando el estado y re-renderizando el input con el nuevo valor. Esto permite validar en tiempo real, transformar el input y manejar el submit de forma sencilla.',
        code: `function FormularioLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}`,
      },
    ],
    concepts: [
      { term: 'useState', definition: 'Hook de React que agrega estado local a un componente funcional, retornando el valor actual y una función para actualizarlo.' },
      { term: 'Renderización', definition: 'Proceso por el que React llama a la función del componente para calcular qué debe mostrar en pantalla.' },
      { term: 'Formulario controlado', definition: 'Formulario donde React gestiona el valor de cada campo de input a través de estado, siendo la única fuente de verdad.' },
      { term: 'Setter funcional', definition: 'Forma de llamar al setter de useState con una función (prev => nuevo) para garantizar que el nuevo estado se basa en el más reciente.' },
      { term: 'SyntheticEvent', definition: 'Envoltura de React sobre los eventos nativos del navegador, con la misma API pero comportamiento consistente entre navegadores.' },
    ],
    exercises: [
      'Construí un componente de lista de tareas con estado que permita agregar, completar y eliminar tareas.',
      'Implementá un formulario de registro con validación en tiempo real (email válido, contraseña de mínimo 8 caracteres) usando estado.',
      'Creá un componente de carrito de compras que gestione items con cantidad y calcule el total dinámicamente.',
    ],
  },

  'int-10': {
    objectives: [
      'Usar useEffect para sincronizar componentes con sistemas externos',
      'Entender cuándo y cómo limpiar efectos con la función de limpieza',
      'Controlar cuándo se ejecuta un efecto con el array de dependencias',
    ],
    sections: [
      {
        title: 'El ciclo de vida con useEffect',
        body: 'useEffect se ejecuta después de que React renderiza el componente al DOM. El array de dependencias controla cuándo vuelve a ejecutarse: vacío [] significa sólo en el montaje, con variables significa cuando alguna cambia, y sin array significa en cada renderización. Sincronizar con una API externa, suscribirse a eventos y manipular el DOM directamente son los casos de uso legítimos de useEffect.',
        code: `import { useState, useEffect } from 'react';

function TiempoReal() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setHora(new Date()), 1000);
    // Función de limpieza: se ejecuta al desmontar o antes de re-ejecutar
    return () => clearInterval(intervalo);
  }, []); // [] = solo al montar

  return <p>{hora.toLocaleTimeString()}</p>;
}`,
      },
      {
        title: 'Fetching de datos con useEffect',
        body: 'Un patrón común es cargar datos al montar el componente o cuando cambia un parámetro. Dentro del efecto se llama a fetch, y en la función de limpieza se cancela la petición con AbortController para evitar actualizar el estado de un componente desmontado. Las variables de estado para los datos, el loading y el error se manejan por separado.',
        code: `useEffect(() => {
  const controller = new AbortController();
  setLoading(true);
  fetch(\`/api/posts/\${id}\`, { signal: controller.signal })
    .then((r) => r.json())
    .then((data) => { setPost(data); setLoading(false); })
    .catch((err) => { if (err.name !== 'AbortError') setError(err); });
  return () => controller.abort();
}, [id]);`,
      },
    ],
    concepts: [
      { term: 'useEffect', definition: 'Hook de React para sincronizar un componente con sistemas externos; se ejecuta después del render.' },
      { term: 'Array de dependencias', definition: 'Segundo argumento de useEffect que lista los valores que, al cambiar, provocan que el efecto se re-ejecute.' },
      { term: 'Función de limpieza', definition: 'Función opcional que useEffect puede retornar para deshacer el efecto (cancelar subscripciones, timers, peticiones).' },
      { term: 'Efecto secundario', definition: 'Cualquier operación que afecta algo fuera del componente: peticiones de red, modificación del DOM, timers, subscripciones.' },
      { term: 'Stale closure', definition: 'Bug donde un efecto captura valores de estado o props que ya no son los actuales porque el array de dependencias está incompleto.' },
    ],
    exercises: [
      'Creá un componente que cargue una lista de posts desde una API pública al montar, mostrando estados de loading y error.',
      'Implementá un efecto que sincronice el título de la página (document.title) con el estado del componente.',
      'Construí un componente de búsqueda con debounce que realice fetch sólo cuando el usuario deja de escribir, cancelando peticiones anteriores.',
    ],
  },

  'int-11': {
    objectives: [
      'Crear y consumir contexto de React para compartir estado entre componentes',
      'Aplicar el principio de colocación de estado al nivel correcto del árbol',
      'Identificar cuándo el contexto es suficiente y cuándo se necesita una librería de estado',
    ],
    sections: [
      {
        title: 'Context API',
        body: 'Context API resuelve el prop drilling: pasar props a través de múltiples componentes intermedios que no los usan. Se crea un contexto con createContext, se envuelve el árbol con el Provider que expone el valor, y cualquier componente descendiente puede consumirlo con useContext. El contexto se re-renderiza cuando el value del Provider cambia, lo que exige precaución con objetos creados en línea.',
        code: `const TemaContext = createContext('claro');

function App() {
  const [tema, setTema] = useState('claro');
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      <Pagina />
    </TemaContext.Provider>
  );
}

function BotonTema() {
  const { tema, setTema } = useContext(TemaContext);
  return <button onClick={() => setTema(t => t === 'claro' ? 'oscuro' : 'claro')}>{tema}</button>;
}`,
      },
      {
        title: 'Colocación de estado',
        body: 'El estado debe vivir en el componente más bajo del árbol que lo necesite. Si sólo un componente lo usa, debe ser local (useState). Si varios hermanos lo comparten, se eleva al ancestro común más cercano. Si cruza mucho del árbol o lleva a prop drilling, se extrae a un contexto. Si el estado es complejo y se actualiza frecuentemente, considerar una librería como Zustand.',
      },
    ],
    concepts: [
      { term: 'Context API', definition: 'Mecanismo de React para compartir valores entre componentes sin pasarlos explícitamente como props a través de cada nivel.' },
      { term: 'Prop drilling', definition: 'Patrón problemático de pasar props a través de múltiples componentes intermedios que no los necesitan.' },
      { term: 'Elevación de estado', definition: 'Mover el estado al ancestro común más cercano de los componentes que necesitan compartirlo.' },
      { term: 'useReducer', definition: 'Hook alternativo a useState para estados complejos o con múltiples transiciones, inspirado en el patrón Redux.' },
      { term: 'Colocación de estado', definition: 'Principio de ubicar el estado en el componente más específico posible que lo requiera, evitando estado global innecesario.' },
    ],
    exercises: [
      'Implementá un contexto de autenticación que provea usuario, login y logout a toda la aplicación.',
      'Creá un carrito de compras compartido entre un componente de productos y uno de resumen, usando Context API.',
      'Refactorizá un componente con prop drilling de tres niveles usando Context, midiendo el impacto en legibilidad.',
    ],
  },

  'int-12': {
    objectives: [
      'Construir una aplicación React funcional de principio a fin',
      'Integrar todos los conceptos del track intermedio en un proyecto cohesivo',
      'Practicar el flujo de desarrollo: diseño de componentes, estado, efectos y API',
    ],
    sections: [
      {
        title: 'Planificación del proyecto',
        body: 'El gestor de biblioteca personal permite agregar libros con título, autor y estado de lectura (por leer, leyendo, leído). Antes de codear, conviene listar los componentes, el estado necesario y el flujo de datos. Los componentes principales son: FormularioLibro, ListaLibros, FiltroEstado y EstadísticasLectura. El estado central es el array de libros, que se persiste en localStorage.',
        code: `// Estructura de datos
const libro = {
  id: crypto.randomUUID(),
  titulo: 'El nombre del viento',
  autor: 'Patrick Rothfuss',
  estado: 'leyendo', // 'por-leer' | 'leyendo' | 'leido'
  agregadoEn: new Date().toISOString(),
};`,
      },
      {
        title: 'Integración con localStorage y custom hooks',
        body: 'Persistir el estado en localStorage requiere sincronizar en ambas direcciones: leer al montar el componente y escribir en cada cambio. Un custom hook useLocalStorage(key, initialValue) encapsula este comportamiento y puede reutilizarse en otros proyectos. Los custom hooks son funciones que empiezan con "use" y pueden llamar a otros hooks, extrayendo lógica con estado fuera de los componentes.',
        code: `function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : valorInicial;
    } catch { return valorInicial; }
  });

  const guardar = (v) => {
    setValor(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [valor, guardar];
}`,
      },
    ],
    concepts: [
      { term: 'Custom hook', definition: 'Función de JavaScript que empieza con "use", llama a hooks de React y extrae lógica con estado reutilizable.' },
      { term: 'localStorage', definition: 'API del navegador para persistir datos clave-valor en el dispositivo del usuario entre sesiones.' },
      { term: 'CRUD', definition: 'Acrónimo de Create, Read, Update, Delete: las cuatro operaciones básicas sobre datos en una aplicación.' },
    ],
    exercises: [
      'Implementá el gestor completo con las operaciones agregar, cambiar estado y eliminar libro, con persistencia en localStorage.',
      'Agregá filtros por estado de lectura y una barra de búsqueda por título o autor.',
      'Incluí estadísticas: total de libros, libros leídos este mes y el autor con más libros en la biblioteca.',
    ],
  },

  'adv-1': {
    objectives: [
      'Identificar cuándo el estado local y el contexto no son suficientes',
      'Comparar las principales opciones de estado global: Zustand, Jotai y Redux Toolkit',
      'Implementar un store con Zustand para una funcionalidad real',
    ],
    sections: [
      {
        title: 'Cuándo escalar el estado',
        body: 'El estado local es suficiente para la mayoría de los componentes. El contexto funciona bien para estado que cambia raramente (tema, usuario autenticado). El estado global con una librería dedicada se justifica cuando muchos componentes no relacionados comparten estado mutable, cuando las actualizaciones son frecuentes y el rendimiento importa, o cuando se necesita persistencia, tiempo-viaje o debuggeo avanzado.',
      },
      {
        title: 'Zustand: estado global minimalista',
        body: 'Zustand es una librería de estado global de 1KB que usa un store fuera del árbol de React. Se crea con create(), combinando estado y acciones en un mismo objeto. Los componentes se subscriben sólo a las porciones del store que necesitan, evitando re-renderizaciones innecesarias sin selectores complejos. La ausencia de boilerplate lo hace ideal para la mayoría de los proyectos.',
        code: `import { create } from 'zustand';

const useCarritoStore = create((set) => ({
  items: [],
  agregar: (producto) =>
    set((state) => ({ items: [...state.items, producto] })),
  vaciar: () => set({ items: [] }),
}));

// En el componente
const { items, agregar } = useCarritoStore();`,
      },
    ],
    concepts: [
      { term: 'Estado global', definition: 'Estado compartido entre componentes no relacionados en el árbol de React, gestionado fuera de la jerarquía de componentes.' },
      { term: 'Store', definition: 'Contenedor centralizado de estado y lógica de actualización, accesible desde cualquier parte de la aplicación.' },
      { term: 'Selector', definition: 'Función que extrae una porción específica del store, permitiendo que el componente se re-renderice sólo cuando esa porción cambia.' },
      { term: 'Zustand', definition: 'Librería minimalista de estado global para React que usa un store fuera del árbol de componentes.' },
      { term: 'Inmutabilidad', definition: 'Principio de no mutar el estado directamente sino crear nuevas referencias, necesario para que React detecte cambios.' },
    ],
    exercises: [
      'Migrá el carrito de compras del proyecto anterior de Context API a Zustand y comparar la complejidad del código.',
      'Implementá un store de notificaciones con Zustand que permita agregar, marcar como leídas y eliminar notificaciones.',
      'Agregá middleware de persistencia (zustand/middleware persist) al store para que sobreviva recargas del navegador.',
    ],
  },

  'adv-2': {
    objectives: [
      'Implementar caché de datos con estrategias stale-while-revalidate',
      'Usar TanStack Query para gestionar el ciclo de vida de las peticiones',
      'Implementar paginación, infinite scroll y mutaciones optimistas',
    ],
    sections: [
      {
        title: 'El problema del data fetching en React',
        body: 'Gestionar data fetching con useEffect tiene varios problemas: condiciones de carrera, re-fetching innecesario, falta de caché compartida entre componentes y manejo manual del loading/error. TanStack Query (React Query) resuelve estos problemas con una capa de caché del lado del cliente que sincroniza datos del servidor automáticamente, con estrategias configurables de revalidación.',
        code: `import { useQuery } from '@tanstack/react-query';

function Perfil({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    staleTime: 5 * 60 * 1000, // 5 minutos antes de revalidar
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg error={error} />;
  return <PerfilCard user={data} />;
}`,
      },
      {
        title: 'Mutaciones y actualizaciones optimistas',
        body: 'useMutation gestiona operaciones que modifican datos en el servidor. Las actualizaciones optimistas actualizan la UI inmediatamente (antes de que el servidor confirme) y revierten si hay error. Esto crea la sensación de respuesta instantánea. onMutate, onError y onSettled son los callbacks del ciclo de vida de una mutación.',
        code: `const mutation = useMutation({
  mutationFn: (nuevoPost) => fetch('/api/posts', {
    method: 'POST', body: JSON.stringify(nuevoPost)
  }),
  onMutate: async (nuevoPost) => {
    await queryClient.cancelQueries({ queryKey: ['posts'] });
    const prev = queryClient.getQueryData(['posts']);
    queryClient.setQueryData(['posts'], (old) => [...old, nuevoPost]);
    return { prev };
  },
  onError: (_err, _vars, ctx) => {
    queryClient.setQueryData(['posts'], ctx.prev);
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
});`,
      },
    ],
    concepts: [
      { term: 'Stale-while-revalidate', definition: 'Estrategia de caché que sirve datos expirados inmediatamente mientras actualiza la caché en segundo plano.' },
      { term: 'Query key', definition: 'Identificador único de una query en TanStack Query que determina la entrada de caché y las dependencias de revalidación.' },
      { term: 'Mutación optimista', definition: 'Técnica de actualizar la UI antes de la confirmación del servidor, revirtiendo si ocurre un error.' },
      { term: 'Invalidación de queries', definition: 'Marcar una entrada de caché como obsoleta para que se re-fetch en la próxima oportunidad.' },
      { term: 'Streaming', definition: 'Técnica donde el servidor envía partes de la respuesta a medida que las genera, permitiendo renderización incremental.' },
    ],
    exercises: [
      'Implementá una lista paginada de artículos con TanStack Query que precargue la siguiente página mientras el usuario lee la actual.',
      'Creá una mutación de like optimista que actualice el contador inmediatamente y revierta si el servidor falla.',
      'Configurá un QueryClient global con staleTime y gcTime apropiados para minimizar re-fetches innecesarios.',
    ],
  },

  'adv-3': {
    objectives: [
      'Configurar React Router 7 con rutas anidadas y layouts compartidos',
      'Implementar code-splitting por ruta con lazy() y Suspense',
      'Gestionar estados de carga y error por ruta con loaders y errorElement',
    ],
    sections: [
      {
        title: 'Rutas anidadas y layouts',
        body: 'React Router 7 permite anidar rutas de forma que un layout padre persista mientras el contenido hijo cambia. Esto es ideal para aplicaciones con una navegación lateral o superior que no debe re-renderizarse en cada cambio de ruta. El componente Outlet marca dónde se renderiza el componente hijo activo. Los loaders de ruta permiten cargar datos antes de renderizar, integrando el fetching con la navegación.',
        code: `export const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,   // header + nav persistentes
  children: [
    { index: true, element: <Home /> },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Overview /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
  ],
}]);`,
      },
      {
        title: 'Code-splitting por ruta',
        body: 'lazy() junto con Suspense permite dividir el bundle por ruta: cada ruta se carga sólo cuando el usuario la visita. Esto reduce el bundle inicial significativamente. El componente Suspense muestra un fallback mientras el chunk de la ruta se descarga. En producción, el prefetching de rutas probables mejora la experiencia.',
        code: `import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const SettingsPage  = lazy(() => import('../pages/SettingsPage'));

export const router = createBrowserRouter([{
  path: '/',
  element: (
    <Suspense fallback={<PageSpinner />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    { path: 'dashboard', element: <DashboardPage /> },
    { path: 'settings', element: <SettingsPage /> },
  ],
}]);`,
      },
    ],
    concepts: [
      { term: 'Ruta anidada', definition: 'Ruta cuyo componente se renderiza dentro del Outlet de la ruta padre, compartiendo el layout de ésta.' },
      { term: 'Outlet', definition: 'Componente de React Router que marca el punto de inserción del componente hijo activo en un layout padre.' },
      { term: 'Code-splitting', definition: 'División del bundle en múltiples chunks que se cargan bajo demanda, reduciendo el tiempo de carga inicial.' },
      { term: 'lazy()', definition: 'Función de React que permite cargar un componente de forma diferida (lazy) sólo cuando se necesita renderizarlo.' },
      { term: 'Loader', definition: 'Función asociada a una ruta en React Router que carga datos necesarios antes de renderizar el componente.' },
    ],
    exercises: [
      'Implementá code-splitting en todas las rutas de la aplicación y verificá en DevTools que cada ruta genera un chunk separado.',
      'Creá un layout de dashboard con navegación lateral persistente usando rutas anidadas y Outlet.',
      'Implementá rutas protegidas que redirijan al login si el usuario no está autenticado, usando un componente wrapper.',
    ],
  },

  'adv-4': {
    objectives: [
      'Implementar accesibilidad de teclado en componentes interactivos personalizados',
      'Usar atributos WAI-ARIA correctamente para comunicar roles y estado',
      'Auditar una aplicación con herramientas de accesibilidad y corregir los problemas encontrados',
    ],
    sections: [
      {
        title: 'Por qué importa la accesibilidad operativa',
        body: 'La accesibilidad no es un feature opcional: millones de personas usan la web con lectores de pantalla, navegación por teclado o tecnologías de asistencia. La especificación WAI-ARIA define roles, estados y propiedades que permiten comunicar la semántica de componentes personalizados a estas tecnologías. Un botón que sólo es un div estilizado es inutilizable para un usuario de teclado.',
        code: `// Mal: div como botón no es accesible
<div onClick={toggle}>Menú</div>

// Bien: button nativo o con ARIA correcto
<button
  type="button"
  aria-expanded={abierto}
  aria-controls="menu-lista"
  onClick={toggle}
>
  Menú
</button>
<ul id="menu-lista" hidden={!abierto}>
  <li><a href="/inicio">Inicio</a></li>
</ul>`,
      },
      {
        title: 'Patrones de teclado y ARIA',
        body: 'El patrón de diseño WAI-ARIA define qué teclas deben funcionar en cada widget. Un dialog modal debe atrapar el foco dentro mientras está abierto. Un listbox debe responder a las flechas para moverse entre opciones. Un tab panel usa Tab para moverse entre pestañas y Enter para activarlas. Implementar estos patrones correctamente requiere gestión explícita del foco con focus() y tabIndex.',
        code: `function Dialog({ abierto, onCerrar, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (abierto) ref.current?.focus();
  }, [abierto]);

  return abierto ? (
    <div
      role="dialog"
      aria-modal="true"
      ref={ref}
      tabIndex={-1}
      onKeyDown={(e) => e.key === 'Escape' && onCerrar()}
    >
      {children}
    </div>
  ) : null;
}`,
      },
    ],
    concepts: [
      { term: 'WAI-ARIA', definition: 'Especificación W3C que define roles, estados y propiedades para comunicar la semántica de widgets complejos a tecnologías de asistencia.' },
      { term: 'Role', definition: 'Atributo ARIA que indica el tipo de widget (button, dialog, listbox) cuando el elemento HTML nativo no expresa esa semántica.' },
      { term: 'aria-label', definition: 'Atributo que provee un nombre accesible a un elemento cuando el texto visible no es suficiente o no existe.' },
      { term: 'Gestión del foco', definition: 'Práctica de mover programáticamente el foco del teclado al elemento correcto cuando la UI cambia dinámicamente.' },
      { term: 'Lector de pantalla', definition: 'Software que lee en voz alta el contenido de la pantalla para usuarios con discapacidad visual.' },
    ],
    exercises: [
      'Construí un componente Accordion accesible con teclado: Tab para moverse entre botones y Enter/Space para expandir.',
      'Auditá tu aplicación con axe DevTools o Lighthouse y corregí todos los issues de nivel A y AA.',
      'Implementá un componente Select personalizado completamente accesible siguiendo el patrón Combobox de WAI-ARIA.',
    ],
  },

  'adv-5': {
    objectives: [
      'Medir y entender las tres métricas Core Web Vitals: LCP, INP y CLS',
      'Identificar las causas más comunes de bajo rendimiento en cada métrica',
      'Establecer presupuestos de performance y medirlos en CI',
    ],
    sections: [
      {
        title: 'Core Web Vitals',
        body: 'Google definió tres métricas Core Web Vitals como proxy de la experiencia del usuario: LCP (Largest Contentful Paint) mide cuándo aparece el contenido principal, INP (Interaction to Next Paint) mide la latencia de respuesta a interacciones, y CLS (Cumulative Layout Shift) mide la estabilidad visual. Los umbrales "bueno" son LCP < 2.5s, INP < 200ms y CLS < 0.1.',
        code: `// Medir con web-vitals library
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(({ value }) => console.log('LCP:', value));
onINP(({ value }) => console.log('INP:', value));
onCLS(({ value }) => console.log('CLS:', value));`,
      },
      {
        title: 'Presupuestos y monitoreo continuo',
        body: 'Un presupuesto de performance define límites máximos para métricas críticas: tamaño del bundle JS, tiempo de carga en red 3G, LCP. Lighthouse CI puede ejecutarse en cada pull request y fallar el build si se exceden los presupuestos, convirtiendo la performance en un requisito de calidad. Esto evita la degradación gradual que ocurre cuando nadie mide continuamente.',
      },
    ],
    concepts: [
      { term: 'LCP (Largest Contentful Paint)', definition: 'Métrica que registra cuándo el elemento de contenido más grande visible en el viewport termina de renderizarse.' },
      { term: 'INP (Interaction to Next Paint)', definition: 'Métrica que mide la latencia de respuesta a interacciones del usuario a lo largo de toda la sesión.' },
      { term: 'CLS (Cumulative Layout Shift)', definition: 'Métrica que mide la suma de todos los cambios de layout inesperados durante la vida de la página.' },
      { term: 'Time to First Byte (TTFB)', definition: 'Tiempo desde que se hace la petición hasta que llega el primer byte de la respuesta del servidor.' },
      { term: 'Presupuesto de performance', definition: 'Límites máximos definidos para métricas de rendimiento que se verifican automáticamente en el proceso de integración continua.' },
    ],
    exercises: [
      'Analizá tu aplicación con Lighthouse y PageSpeed Insights; documentá los tres problemas de mayor impacto en LCP.',
      'Configurá Lighthouse CI en un repositorio GitHub y definí presupuestos que fallen el build si LCP > 3s.',
      'Identificá y corregí las causas de CLS en una página con imágenes sin dimensiones declaradas y fuentes web.',
    ],
  },

  'adv-6': {
    objectives: [
      'Identificar re-renderizaciones innecesarias con React DevTools Profiler',
      'Aplicar memo, useMemo y useCallback con criterio basado en medición',
      'Entender cuándo estas optimizaciones ayudan y cuándo agregan complejidad sin beneficio',
    ],
    sections: [
      {
        title: 'Por qué React re-renderiza',
        body: 'React re-renderiza un componente cuando su estado cambia, cuando las props cambian por referencia o cuando el padre re-renderiza. La mayoría de las re-renderizaciones son baratas y no causan problemas de rendimiento perceptibles. Antes de optimizar, siempre medir con el Profiler de React DevTools para identificar qué componentes son costosos y con qué frecuencia re-renderizan.',
        code: `// React.memo evita re-renderizaciones si las props no cambian
const ListaItem = React.memo(function ListaItem({ titulo, onClick }) {
  return <li onClick={onClick}>{titulo}</li>;
});

// useCallback estabiliza la referencia de la función entre renders
const handleClick = useCallback(() => {
  setSeleccionado(id);
}, [id]); // sólo recrea si id cambia`,
      },
      {
        title: 'useMemo para cálculos costosos',
        body: 'useMemo memoriza el resultado de un cálculo costoso y sólo lo recalcula cuando sus dependencias cambian. Es útil para transformaciones de listas grandes, cálculos estadísticos o construcción de estructuras de datos complejas. No usar useMemo en cálculos triviales: el overhead de la memorización puede superar el beneficio. La regla es: medir primero, optimizar después.',
        code: `const estadisticas = useMemo(() => {
  // Cálculo costoso sobre miles de items
  return items.reduce((acc, item) => ({
    total: acc.total + item.precio,
    count: acc.count + 1,
    max: Math.max(acc.max, item.precio),
  }), { total: 0, count: 0, max: 0 });
}, [items]); // recalcula sólo cuando items cambia`,
      },
    ],
    concepts: [
      { term: 'React.memo', definition: 'HOC que envuelve un componente y evita re-renderizaciones si las props no han cambiado por referencia o valor.' },
      { term: 'useMemo', definition: 'Hook que memoriza el resultado de un cálculo y lo recalcula sólo cuando las dependencias cambian.' },
      { term: 'useCallback', definition: 'Hook que memoriza una función y retorna la misma referencia entre renders, útil para estabilizar callbacks pasados a componentes memoizados.' },
      { term: 'Reconciliación', definition: 'Proceso de React para comparar el árbol virtual anterior y el nuevo para determinar qué cambios hacer en el DOM real.' },
      { term: 'Profiler', definition: 'Herramienta de React DevTools que registra el tiempo de renderización de cada componente para identificar cuellos de botella.' },
    ],
    exercises: [
      'Usá React DevTools Profiler para identificar el componente que más tarda en renderizar en tu aplicación y optimizalo.',
      'Creá una lista de 1000 items y medí el impacto de agregar React.memo al item con y sin useCallback en el handler.',
      'Implementá virtualización de listas con @tanstack/virtual para una lista de 10.000 elementos.',
    ],
  },

  'adv-7': {
    objectives: [
      'Optimizar imágenes para web: formatos modernos, dimensiones y lazy loading',
      'Implementar carga de fuentes sin FOUT ni CLS',
      'Identificar y eliminar recursos de bloqueo de renderización',
    ],
    sections: [
      {
        title: 'Optimización de imágenes',
        body: 'Las imágenes son frecuentemente el recurso más pesado de una página. WebP y AVIF son formatos modernos que ofrecen la misma calidad visual con 25-50% menos peso. El elemento picture permite servir el formato más eficiente según soporte del navegador. Los atributos width y height en imágenes y el uso de aspect-ratio en CSS previenen el CLS al reservar el espacio antes de cargar.',
        code: `<picture>
  <source srcset="/img/hero.avif" type="image/avif" />
  <source srcset="/img/hero.webp" type="image/webp" />
  <img
    src="/img/hero.jpg"
    alt="Descripción de la imagen"
    width="1200"
    height="630"
    loading="lazy"
    decoding="async"
  />
</picture>`,
      },
      {
        title: 'Fuentes web y carga crítica',
        body: 'Las fuentes web pueden causar FOUT (Flash of Unstyled Text) o FOIT (Flash of Invisible Text) si no se gestionan correctamente. font-display: swap muestra el texto con la fuente fallback inmediatamente y la reemplaza cuando carga. Precargar las fuentes más críticas con link rel="preload" reduce el tiempo hasta que se muestra el texto con la tipografía correcta. Limitar los pesos y subsets de fuentes reduce el peso descargado.',
      },
    ],
    concepts: [
      { term: 'WebP / AVIF', definition: 'Formatos modernos de imagen con mejor compresión que JPEG o PNG, soportados por navegadores actuales.' },
      { term: 'Lazy loading', definition: 'Carga diferida de recursos (imágenes, scripts) hasta que son necesarios, reduciendo el peso inicial de la página.' },
      { term: 'FOUT', definition: 'Flash of Unstyled Text: momento en que el texto se muestra con la fuente fallback antes de que cargue la fuente web.' },
      { term: 'Critical CSS', definition: 'CSS necesario para renderizar el contenido visible sin scroll, que se incluye inline en el HTML para eliminar bloqueo de render.' },
      { term: 'Preload', definition: 'Directiva link que indica al navegador que descargue un recurso con alta prioridad antes de que sea descubierto por el parser.' },
    ],
    exercises: [
      'Convertí todas las imágenes de un proyecto a WebP y medí la reducción de peso total con Lighthouse.',
      'Implementá lazy loading nativo en todas las imágenes below-the-fold y verificá que las imágenes del hero no tengan lazy loading.',
      'Configurá font-display: swap en las fuentes web y medí el impacto en CLS antes y después.',
    ],
  },

  'adv-8': {
    objectives: [
      'Configurar un pipeline de CI/CD completo con GitHub Actions para un proyecto frontend',
      'Automatizar pruebas, linting y build en cada pull request',
      'Desplegar automáticamente a producción al fusionar en main',
    ],
    sections: [
      {
        title: 'Integración continua con GitHub Actions',
        body: 'GitHub Actions permite definir workflows en archivos YAML que se ejecutan en eventos como push, pull_request o release. Un workflow de CI típico para frontend instala dependencias, ejecuta el linter, corre las pruebas y construye el proyecto. Si cualquier paso falla, el workflow falla y el pull request queda bloqueado hasta que se corrija, creando un safety net automático.',
        code: `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build`,
      },
      {
        title: 'Despliegue continuo',
        body: 'El CD extiende el CI agregando un paso de despliegue que se ejecuta sólo cuando el merge llega a la rama main. Plataformas como Vercel, Netlify o Cloudflare Pages se integran con GitHub para desplegar automáticamente. La estrategia más segura es desplegar primero a un ambiente de staging, ejecutar smoke tests y luego promover a producción, todo automáticamente en el pipeline.',
      },
    ],
    concepts: [
      { term: 'CI (Integración Continua)', definition: 'Práctica de integrar cambios de código frecuentemente y verificarlos con pruebas automatizadas inmediatamente.' },
      { term: 'CD (Despliegue Continuo)', definition: 'Extensión del CI que automatiza el despliegue a producción cuando todos los pasos de verificación pasan.' },
      { term: 'GitHub Actions', definition: 'Plataforma de CI/CD integrada en GitHub que ejecuta workflows definidos en YAML en respuesta a eventos del repositorio.' },
      { term: 'Artefacto de build', definition: 'Archivos generados por el proceso de build (carpeta dist) que se despliegan al servidor de producción.' },
      { term: 'Environment secrets', definition: 'Variables de entorno sensibles (API keys, tokens) almacenadas de forma segura en el repositorio y disponibles en los workflows.' },
    ],
    exercises: [
      'Creá un workflow de GitHub Actions que ejecute lint y pruebas en cada pull request y bloquee el merge si fallan.',
      'Configurá el despliegue automático a Vercel o Netlify al mergear en main, con preview deployments en PRs.',
      'Agregá Lighthouse CI al pipeline para que falle si el LCP supera los 3 segundos en el despliegue de preview.',
    ],
  },

  'adv-9': {
    objectives: [
      'Implementar un Error Boundary para capturar errores en el árbol de componentes',
      'Integrar un servicio de monitoreo de errores en producción',
      'Agregar telemetría básica de performance y comportamiento del usuario',
    ],
    sections: [
      {
        title: 'Error Boundaries y manejo de errores en React',
        body: 'Los Error Boundaries son componentes de clase que capturan errores de JavaScript en el árbol de componentes hijo y muestran una UI de fallback. Sin ellos, un error en un componente hace que toda la aplicación se desmonte. Se implementan con componentDidCatch y getDerivedStateFromError. Sentry es el servicio más usado para capturar, agregar y alertar sobre errores de frontend en producción.',
        code: `class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    Sentry.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) return <ErrorFallback error={this.state.error} />;
    return this.props.children;
  }
}`,
      },
      {
        title: 'Telemetría y observabilidad',
        body: 'La telemetría convierte la aplicación en producción en una fuente de información sobre comportamiento real. Web Vitals enviadas a un endpoint de analítica muestran el rendimiento que experimentan los usuarios reales. Los eventos de comportamiento (clicks, navegación, conversiones) permiten entender los flujos que siguen los usuarios. La combinación de errores, rendimiento y comportamiento es la observabilidad completa de un frontend.',
      },
    ],
    concepts: [
      { term: 'Error Boundary', definition: 'Componente de React que captura errores JavaScript en sus hijos y renderiza una UI de fallback en lugar de propagar el error.' },
      { term: 'Sentry', definition: 'Servicio de monitoreo de errores que captura, agrupa y alerta sobre excepciones en aplicaciones de producción.' },
      { term: 'Observabilidad', definition: 'Capacidad de entender el estado interno de un sistema a partir de sus salidas: logs, métricas y trazas.' },
      { term: 'Real User Monitoring (RUM)', definition: 'Monitoreo del rendimiento experimentado por usuarios reales en producción, en contraste con pruebas sintéticas en CI.' },
      { term: 'Sesión replay', definition: 'Grabación de la interacción del usuario con la UI para reproducir bugs que son difíciles de replicar localmente.' },
    ],
    exercises: [
      'Implementá un Error Boundary en la raíz de la aplicación y en las secciones críticas por separado, con UIs de fallback apropiadas.',
      'Integrá Sentry en la aplicación y verificá que un error lanzado intencionalmente aparezca en el dashboard.',
      'Implementá el envío de Core Web Vitals a un endpoint propio usando la librería web-vitals.',
    ],
  },

  'adv-10': {
    objectives: [
      'Integrar todos los conceptos del curso en una plataforma de cursos funcional',
      'Tomar decisiones de arquitectura justificadas y documentarlas',
      'Desplegar la aplicación completa con CI/CD a producción',
    ],
    sections: [
      {
        title: 'Planificación y arquitectura',
        body: 'El proyecto final es la plataforma de cursos que estás usando ahora mismo. Incluye autenticación, gestión de progreso persistente, rutas protegidas, diseño responsive y accesible. Antes de codear, documentá las decisiones de arquitectura: por qué Zustand en lugar de Context para el progreso, por qué React Router 7 para el routing, qué estrategia de data fetching adoptar. Las decisiones documentadas son tan valiosas como el código.',
        code: `// Estructura de carpetas recomendada
src/
  components/    # Componentes reutilizables
  pages/         # Un directorio por ruta
  hooks/         # Custom hooks
  data/          # Datos estáticos y helpers
  context/       # Contextos de React
  styles/        # Variables y estilos globales
  routes/        # Configuración del router`,
      },
      {
        title: 'Checklist de calidad',
        body: 'Antes de considerar el proyecto terminado, verificar: las rutas protegidas redirigen correctamente, los errores de red muestran mensajes útiles, la aplicación es navegable por teclado, el contraste de colores cumple WCAG AA, el Lighthouse score supera 90 en todas las categorías, el pipeline de CI/CD despliega automáticamente al mergear, y hay Error Boundaries en las secciones críticas.',
      },
    ],
    concepts: [
      { term: 'Decisión de arquitectura', definition: 'Elección de diseño de alto nivel que afecta múltiples partes del sistema y es difícil de cambiar una vez implementada.' },
      { term: 'Deuda técnica', definition: 'Costo implícito del trabajo adicional causado por elegir una solución rápida en lugar de una mejor pero más lenta.' },
      { term: 'Feature flag', definition: 'Mecanismo que permite activar o desactivar funcionalidades en producción sin necesidad de un nuevo despliegue.' },
      { term: 'ADR (Architecture Decision Record)', definition: 'Documento breve que captura una decisión de arquitectura importante, su contexto y las consecuencias.' },
    ],
    exercises: [
      'Completá la implementación de todas las páginas de lección, asegurándote de que la navegación prev/next funcione correctamente.',
      'Ejecutá una auditoría completa de accesibilidad con axe y corregí todos los issues encontrados.',
      'Desplegá la aplicación completa a Vercel con CI/CD, variables de entorno configuradas y preview deployments en PRs.',
    ],
  },
};
