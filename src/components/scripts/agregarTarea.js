// Seleccionamos el botón y el formulario
var showFormButton = document.getElementById("showFormButton");
var taskForm = document.getElementById("taskForm");
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

export function addTask(task) {
  // Obtener los valores del formulario
  var taskName = document.getElementById("taskName").value;
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var color = document.getElementById("color").value;
  var completion = document.getElementById("completion").value;

  // Crear objeto de tarea
  var task = {
      taskName: taskName,
      startDate: startDate,
      endDate: endDate,
      color: color,
      completion: completion
  };

  obj.addTask(task);

  // Aquí puedes hacer lo que quieras con el objeto de la tarea, como enviarlo a una API, guardar en una base de datos, etc.
  console.log(task);
  // También puedes agregar aquí la lógica para mostrar la tarea en un diagrama de Gantt utilizando Astro.
}
