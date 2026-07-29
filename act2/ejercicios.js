const nombre = "Emmanuel Sierra Holguin";
const ficha = 3412768;
const notas = [2.0, 2.5, 3.8];
const promedio = (notas[0] + notas[1] + notas[2]) / 3;

console.log(`================`);
console.log(`sistemas de notas sena`)
console.log(`================`);
console.log(`Aprendiz: ${nombre}`);
console.log(`ficha: ${ficha}`);
console.log(`notas: ${notas}`);
console.log(`================`);
console.log(`Promedio: ${promedio.toFixed(1)}`);
console.log(`Estado: ${promedio >= 3 ? "Aprobado" : "No Aprobado"}`);

