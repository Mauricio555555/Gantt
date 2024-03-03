function addTask() {
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

  // Aquí puedes hacer lo que quieras con el objeto de la tarea, como enviarlo a una API, guardar en una base de datos, etc.
  console.log(task);
  // También puedes agregar aquí la lógica para mostrar la tarea en un diagrama de Gantt utilizando Astro.
}
