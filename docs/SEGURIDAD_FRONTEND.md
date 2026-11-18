# INFORME DE AUDITORÍA DE SEGURIDAD DEL FRONTEND

## 1. Objetivo

Identificar, analizar, mitigar y documentar las vulnerabilidades presentes en las dependencias del frontend de DeliveryGo, utilizando npm audit y pruebas de verificación funcional.

## 2. Herramientas utilizadas

- Node.js
- npm
- Git
- Vite
- Vitest
- GitHub Advisory Database

## 3. Vulnerabilidad identificada

- Paquete afectado: picomatch.
- Versión publicada identificada en el árbol: 4.0.7.
- Identificador: GHSA-fc5q-39xc-vjpf.
- Tipo: Regular Expression Denial of Service (ReDoS).
- Severidad: Alta.

La vulnerabilidad está relacionada con patrones extglob que pueden provocar un consumo excesivo de recursos durante el procesamiento de expresiones regulares.

Referencia oficial:
https://github.com/advisories/GHSA-fc5q-39xc-vjpf

## 4. Dependencias involucradas

La cadena de dependencias identificada incluye:

- Vite.
- tinyglobby.
- fdir.
- picomatch.
- Vitest.

Estas dependencias utilizan picomatch dentro del árbol de dependencias del proyecto.

## 5. Acciones realizadas

1. Se ejecutó npm audit para identificar las vulnerabilidades.
2. Se generó un reporte inicial mediante npm-audit-report.json.
3. Se ejecutó npm audit fix para intentar aplicar actualizaciones compatibles.
4. Se comprobó que la vulnerabilidad de picomatch persistía.
5. Se evaluó npm audit fix --force, pero no se aplicó debido a los cambios potencialmente incompatibles propuestos por npm.
6. Se fijaron versiones específicas de las dependencias del proyecto para mejorar la reproducibilidad de las instalaciones.
7. Se trasladaron Vite y @vitejs/plugin-react a devDependencies.
8. Se incorporó un override de picomatch hacia un fork comunitario de GitHub.
9. Se verificó el commit instalado mediante npm ls picomatch.
10. Se ejecutaron pruebas preliminares de expresiones regulares, rendimiento y comportamiento funcional.
11. Se ejecutaron las pruebas automatizadas del proyecto.
12. Se ejecutó la compilación de producción.
13. Se repitieron las auditorías de seguridad.

## 6. Modificaciones de dependencias

Se establecieron versiones específicas:

### Dependencias de producción

- react: 19.3.1
- react-dom: 19.3.1
- react-router-dom: 7.18.5

### Dependencias de desarrollo

- @vitejs/plugin-react: 4.7.0
- jsdom: 31.0.1
- vite: 6.4.6
- vitest: 5.1.0

### Override comunitario

Se configuró el siguiente override:

picomatch:
git+https://github.com/seeibt/picomatch.git#1bf0d04563cb9ce568cf36efc5f6b7187d9911d5

Repositorio:
https://github.com/seeibt/picomatch

El cambio corresponde a una implementación comunitaria y no a una versión oficial publicada de picomatch.

## 7. Pruebas de verificación

### 7.1. Pruebas automatizadas

Comando:

npm test

Resultado:

- Archivos de prueba: 1 aprobado.
- Pruebas ejecutadas: 2.
- Pruebas aprobadas: 2.
- Pruebas fallidas: 0.

### 7.2. Compilación de producción

Comando:

npm run build

Resultado:

- Vite 6.4.6.
- 43 módulos transformados.
- Compilación finalizada correctamente.

### 7.3. Pruebas preliminares del parche

Se realizaron tres verificaciones:

- Seis patrones de expresiones regulares.
- Cuatro casos de rendimiento.
- Pruebas de conservación del comportamiento funcional.

Resultado: todos los casos ejecutados fueron aprobados.

Estas pruebas son preliminares y no constituyen una demostración exhaustiva de ausencia de vulnerabilidades ReDoS.

## 8. Resultados de auditoría

### Auditoría completa

Comando:

npm audit

Resultado:

- Cinco vulnerabilidades de severidad alta.
- La auditoría continúa identificando picomatch como afectado.
- No se puede declarar limpia la totalidad del árbol de dependencias.

### Auditoría de producción

Comando:

npm audit --omit=dev

Resultado:

- Cero vulnerabilidades reportadas.

Este resultado corresponde únicamente a las dependencias de producción.

## 9. Análisis del resultado

La incorporación del fork comunitario permitió ejecutar pruebas preliminares satisfactorias en los escenarios evaluados.

Sin embargo, npm audit continúa identificando la versión 4.0.7 como afectada por el aviso GHSA-fc5q-39xc-vjpf.

Por lo tanto, el override debe considerarse una mitigación experimental pendiente de validación exhaustiva y no una corrección definitiva oficialmente reconocida por npm.

La auditoría completa sigue reportando cinco vulnerabilidades altas.

## 10. Estado de seguridad

Estado: MITIGACIÓN EXPERIMENTAL APLICADA; CORRECCIÓN DEFINITIVA PENDIENTE DE VERIFICACIÓN.

Se realizaron modificaciones de dependencias, se incorporó un parche comunitario y se ejecutaron pruebas funcionales y de regresión.

La auditoría de producción no reporta vulnerabilidades, pero la auditoría completa continúa identificando cinco vulnerabilidades altas.

## 11. Medidas recomendadas

- Supervisar las actualizaciones oficiales de picomatch.
- Verificar los cambios del fork comunitario antes de mantenerlo.
- Ejecutar periódicamente npm audit.
- Mantener las dependencias fijadas a versiones verificadas.
- Evitar procesar patrones glob no confiables sin controles.
- Repetir las pruebas funcionales y de seguridad al actualizar dependencias.
- Retirar el override experimental cuando exista una versión oficial corregida y compatible.

## 12. Evidencias

- npm-audit-report.json.
- Resultados de npm audit.
- Resultados de npm audit --omit=dev.
- Resultado de npm test.
- Resultado de npm run build.
- Resultado de npm ls picomatch.
- Pruebas preliminares del parche comunitario.
- Historial de modificaciones de Git.

## 13. Estado del gate CI (2026-11-18)

La auditoría completa `npm audit --audit-level=high` es bloqueante en GitHub Actions. En Node 22/npm 10.9.9, `npm audit --json` termina con exit code 1 y contabiliza cinco findings HIGH: un solo GHSA de picomatch repetido en la cadena `picomatch` → `fdir`/`tinyglobby` → `vite`/`vitest`. El contenedor de CI conserva el hallazgo aunque `npm ci` termine correctamente.

En el entorno anfitrión Node 24.21.0/npm 11.19.0, `npm audit --json` devuelve exit code 0 y vulnerabilidades vacías con el mismo lockfile. Ese resultado discrepa del entorno Node 22 usado por CI y no sirve para considerar resuelto el advisory. La ficha oficial GHSA-fc5q-39xc-vjpf sigue indicando versiones afectadas hasta 4.0.7 y ninguna versión corregida: https://github.com/advisories/GHSA-fc5q-39xc-vjpf.

El override apunta al commit `1bf0d04563cb9ce568cf36efc5f6b7187d9911d5` del fork seeibt, que corresponde a la propuesta upstream #237, todavía abierta: https://github.com/micromatch/picomatch/pull/237. La propuesta mitiga el patrón `+(*a)` observado y la prueba de regresión local comprueba el regex compilado y el matching con límite de tiempo. Esto no equivale a un release oficial ni elimina los cinco findings del audit del contenedor.

**Estado:** FAIL/BLOCKED para el gate completo de dependencias; no declarar el frontend listo mientras Node 22/npm 10.9.9 reporte esos cinco HIGH. La suite de pruebas y el build sí pasaron por separado. No se ejecutó ningún workflow remoto.

## 14. Decisión de mitigación y clasificación (2026-11-17)

Se compararon las alternativas locales en `docs/picomatch-redos-decision.md` (documento transversal del Harness). `vite@6.2.7` sería un downgrade dentro de major 6; `vitest@3.1.4` sería un downgrade mayor de 5 a 3. El ensayo del árbol alternativo dejó siete hallazgos, incluidos dos CRITICAL. Se descartó sustituir picomatch por otra API, añadir patch-package, mantener un parche propio en postinstall, un script ad hoc fuera de Vitest y controles de entrada de la aplicación (el producto no pasa patrones de usuarios a picomatch). Una evaluación temporal aislada de `patch-package@8.0.1` observó 55 entradas nuevas de lock y 14 dependencias directas listadas en el árbol de la herramienta; no se aplicó al lockfile de DeliveryGo. Si se adoptara, DeliveryGo agregaría `patch-package` como una dependencia directa; el audit del ensayo siguió con los mismos cinco HIGH.

La decisión local es mantener el único override existente fijado por hash al commit seeibt `1bf0d04563cb9ce568cf36efc5f6b7187d9911d5`, correspondiente a la PR abierta #237. No se ocultan findings con allowlists, exclusions ni un umbral menor. La suite Vitest prueba `+(*a)`, `+(*)`, `*(*a)` y `+(a*b)` con casos positivos/negativos y no-matches adversariales limitados a cinco segundos. Es evidencia de mitigación para esos patrones concretos, no prueba de seguridad universal ni corrección oficial.

- **Hallazgos corregidos upstream:** 0.
- **Mitigación demostrada:** patrones específicos cubiertos por la regresión sobre el commit hash-pinned.
- **Pendientes:** 5 HIGH de GHSA-fc5q-39xc-vjpf en Node 22/npm 10.9.9, hasta un release oficial corregido o actualización del advisory y una nueva auditoría limpia.
- **Resultado:** FAIL/BLOCKED; no considerar el proyecto listo. El audit Node 24/npm 11.19.0 que devuelve 0 no sustituye el resultado del entorno CI.
