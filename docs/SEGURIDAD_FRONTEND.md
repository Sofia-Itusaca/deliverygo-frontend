

\# INFORME DE AUDITORÍA DE SEGURIDAD DEL FRONTEND



\## 1. Objetivo



Identificar, analizar y documentar las vulnerabilidades existentes en las dependencias del frontend de DeliveryGo mediante npm audit.



\## 2. Herramientas utilizadas



\- Node.js

\- npm

\- Git

\- Vite

\- GitHub Advisory Database



\## 3. Vulnerabilidad identificada



\- Paquete afectado: picomatch

\- Versión instalada: 4.0.7

\- Identificador: GHSA-fc5q-39xc-vjpf

\- CVE: CVE-2026-112366

\- Tipo: Regular Expression Denial of Service (ReDoS).

\- Severidad: Alta.



La vulnerabilidad permite provocar un consumo excesivo de recursos mediante patrones extglob especialmente diseñados.



\## 4. Dependencias involucradas



La cadena de dependencias identificada fue:



vite

&#x20; └── tinyglobby

&#x20;      └── fdir

&#x20;           └── picomatch



También se identificó Vitest como otra dependencia que utiliza picomatch.



\## 5. Acciones realizadas



1\. Se ejecutó npm audit para identificar vulnerabilidades.

2\. Se generó el reporte npm-audit-report.json.

3\. Se ejecutó npm audit fix para aplicar actualizaciones compatibles.

4\. Se repitió npm audit y se comprobó que persistían seis hallazgos de severidad alta.

5\. Se ejecutó npm run build y la compilación finalizó correctamente.

6\. Se ejecutó npm audit --omit=dev y se identificaron cinco hallazgos altos.

7\. Se verificó mediante npm view picomatch version que la última versión publicada disponible era 4.0.7.



\## 6. Análisis del resultado



La vulnerabilidad persiste porque la versión instalada de picomatch (4.0.7) se encuentra dentro del rango afectado por el aviso de seguridad.



No se aplicó npm audit fix --force porque npm indicó que requería cambios incompatibles en las dependencias del proyecto.



Tampoco se instaló una versión inexistente o no verificada.



\## 7. Verificación funcional



Se ejecutó:



npm run build



Resultado: compilación exitosa del frontend.



\## 8. Estado de seguridad



Estado: PENDIENTE DE CORRECCIÓN DEFINITIVA.



Se identificó y documentó la vulnerabilidad, pero no se puede declarar completamente solucionada mientras no exista una versión corregida y compatible.



\## 9. Medidas recomendadas



\- Revisar periódicamente las actualizaciones de picomatch.

\- Mantener actualizadas las dependencias del frontend.

\- Evitar el procesamiento de patrones glob proporcionados por usuarios no confiables.

\- Repetir npm audit cuando se publique una versión corregida.

\- Verificar la compatibilidad de las actualizaciones antes de incorporarlas.



\## 10. Evidencias



\- npm-audit-report.json.

\- Resultados de npm audit.

\- Resultado de npm audit --omit=dev.

\- Resultado de npm run build.

\- Historial de cambios en Git.



