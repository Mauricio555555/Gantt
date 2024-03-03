// Seleccionamos el botón y el formulario
var showFormButton = document.getElementById("showFormButton");
var taskForm = document.getElementById("taskForm");
// Función que se ejecuta cuando window.onload ocurre
  var obj = new Gantt([]);

// Verificamos si los elementos existen antes de agregar el event listener
if (showFormButton && taskForm) {
  // Agregamos un event listener al botón para mostrar el formulario
  showFormButton.addEventListener("click", function () {
    // Mostramos el formulario cambiando su estilo display a 'block'
    taskForm.style.display = "block";
  });
} else {
  console.error("No se encontraron los elementos showFormButton y/o taskForm");
}

function addTask(obj) {
  // Obtener los valores del formulario
  const taskName = document.getElementById('taskName').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const color = document.getElementById('color').value;
  const completion = document.getElementById('completion').value;

  // Crear un array con los datos de la tarea
  const task = [taskName, startDate, endDate, color, completion];

  // Agregar la tarea al objeto Gantt
  obj.addTask(task);

  // Limpiar el formulario o hacer cualquier otro procesamiento necesario
}

