let pacientes = [];

function ingresarPaciente() {
  // Validación del ID
  let id = prompt("Ingrese el ID del paciente");
  
  let nombre;
  do {
    nombre = prompt("Ingrese el nombre del paciente");
    if (!nombre || nombre.trim() === "") {
      alert("Error: El nombre no puede estar vacío. Intente nuevamente.");
    }
  } while (!nombre || nombre.trim() === "");
  
  let edad = prompt("Ingrese la edad del paciente");
  
  let genero;
  do {
    genero = prompt("Ingrese el género del paciente (M/F)").toUpperCase();
    if (genero !== "M" && genero !== "F") {
      alert("Error:Intente nuevamente.");
    }
  } while (genero !== "M" && genero !== "F");
  
  let peso;
  do {
    peso = prompt("Ingrese el peso del paciente (kg)");
    peso = parseFloat(peso);
    if (isNaN(peso) || peso <= 0) {
      alert("Error: Intente nuevamente.");
    }
  } while (isNaN(peso) || peso <= 0);
  
  let altura;
  do {
    altura = prompt("Ingrese la altura del paciente (m o cm)");
    altura = parseFloat(altura);
    if (isNaN(altura) || altura <= 0) {
      alert("Error: La altura debe ser un número positivo. Intente nuevamente.");
    }
  } while (isNaN(altura) || altura <= 0);
  
  let alturaM = altura > 3 ? altura / 100 : altura;
  
  let imc = peso / (alturaM ** 2);
  imc = imc.toFixed(2);
  
  let clasificacion;
  if (imc < 18.5) clasificacion = "Bajo peso";
  else if (imc < 24.9) clasificacion = "Peso normal";
  else if (imc < 29.9) clasificacion = "Sobrepeso";
  else clasificacion = "Obesidad";
  
  alert(`Su IMC es ${imc}, su composición corporal es: ${clasificacion}`);
  
  pacientes.push({
    id,
    nombre,
    edad,
    genero,
    peso,
    altura: alturaM,
    imc: parseFloat(imc),
    clasificacion
  });
  
  console.log(pacientes);
  
  if (confirm("¿Desea ingresar los datos de otra persona?")) {
    ingresarPaciente();
  }
}

function mostrarInformes() {
  let hombres = 0; 
  let mujeres = 0; 
  let edadH = 0; 
  let edadM = 0; 
  let menores = 0; 
  let sobrepesoH = 0; 
  let sobrepesoM = 0;
  
  let menor = pacientes[0];
  
  for (let i = 0; i < pacientes.length; i++) {
    let p = pacientes[i];
    
    if (p.genero === "M") {
      hombres++;
      edadH += p.edad;
      if (p.clasificacion === "Sobrepeso") {
        sobrepesoH++;
      }
    } else if (p.genero === "F") {
      mujeres++;
      edadM += p.edad;
      if (p.clasificacion === "Sobrepeso") {
        sobrepesoM++;
      }
    }
    
    if (p.edad < 18) {
      menores++;
    }
    
    if (parseFloat(p.imc) < parseFloat(menor.imc)) {
      menor = p;
    }
  }
  
  let promH = hombres > 0 ? Math.round(edadH / hombres) : 0;
  let promM = mujeres > 0 ? Math.round(edadM / mujeres) : 0;
  
  alert(
    "Total Hombres: " + hombres + "\n" +
    "Total Mujeres: " + mujeres + "\n" +
    "Promedio edad Hombres: " + promH + "\n" +
    "Promedio edad Mujeres: " + promM + "\n" +
    "Total menores de edad: " + menores + "\n" +
    "Hombres con sobrepeso: " + sobrepesoH + "\n" +
    "Mujeres con sobrepeso: " + sobrepesoM + "\n" +
    "Paciente con menor IMC: ID: " + menor.id + ", " + menor.nombre + ", " + menor.edad + " años, " + menor.genero + " (" + menor.imc + ")"
  );
}

function menu() {
  let seguir = true;
  
  while (seguir) {
    let opcion = prompt(
      "Menú Calculadora IMC\n" +
      "1. Ingresar paciente\n" +
      "2. Ver informes\n" +
      "3. Salir"
    );
    
    switch(opcion) {
      case "1":
        ingresarPaciente();
        break;
      case "2":
        if (pacientes.length > 0) {
          mostrarInformes();
        } else {
          alert("No hay pacientes registrados.");
        }
        break;
      case "3":
        seguir = false;
        alert("¡Gracias por usar la calculadora IMC!");
        break;
      default:
        alert("Opción no válida. Por favor seleccione 1, 2 o 3.");
    }
  }
}

menu();