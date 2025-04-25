let pacientes = [];

function datosDelPaciente() {
  let nombre = prompt("Ingrese el nombre del paciente");
  if (!nombre) return;
  
  let edad = prompt("Ingrese la edad del paciente");
  if (!edad) return;
  
  let genero = prompt("Ingrese el género del paciente (M/F)");
  if (!genero) return;
  
  let peso = prompt("Ingrese el peso del paciente:");
  if (!peso) return;
  peso = parseFloat(peso);
  
  let altura = prompt("Ingrese la altura del paciente:");
  if (!altura) return;
  
  let alturaM = altura > 3 ? altura / 100 : altura;
  alturaM = parseFloat(alturaM);
  
  let imc = peso / (alturaM ** 2);
  imc = imc.toFixed(2);
  
  let clasificacion;
  if (imc < 18.5) clasificacion = "bajo peso";
  else if (imc < 24.9) clasificacion = "peso normal";
  else if (imc < 29.9) clasificacion = "sobrepeso";
  else clasificacion = "obesidad";
  
  alert(`Su IMC es ${imc}, su composición corporal es: ${clasificacion}`);
  
  pacientes.push({
    nombre, 
    edad, 
    genero, 
    peso, 
    altura: alturaM, 
    imc, 
    clasificacion
  });
  
  console.log(pacientes);
  
  const rta = () => confirm("¿Desea ingresar los datos de otra persona?");
  if (rta()) {
    return datosDelPaciente();
  }
}

datosDelPaciente();