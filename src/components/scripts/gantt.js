export class Gantt {
  constructor() {
    this.tasks = [];
    this.dateWidth = 178;
    this.minDate = null;
    this.maxDate = null;
    this.loadTasksFromFile();
  }

  async loadTasksFromFile() {
    try {
      const response = await fetch('/src/components/data/gantt.json');
      if (response.ok) {
        const tasksData = await response.json();
        this.tasks = tasksData;
        this.updateGantt();
      } else {
        console.error('Error al cargar el archivo JSON:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }

  addTask(task) {
    this.tasks.push(task);
    this.updateGantt();
    this.saveTasksToFile();
  }

  async saveTasksToFile() {
    try {
        // Formatear el archivo JSON
        const formattedTasks = JSON.stringify(this.tasks);

        // Construir la solicitud para obtener el archivo JSON existente
        const existingResponse = await fetch('/src/components/data/gantt.json');

        if (existingResponse.ok) {
            // Si el archivo existe, actualiza su contenido
            const response = await fetch('/src/components/data/gantt.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formattedTasks,
            });

            if (!response.ok) {
                const errorMessage = response.statusText || 'Error desconocido al guardar las tareas.';
                console.error(errorMessage);
            } else {
                console.log('Las tareas se han guardado correctamente en el archivo JSON.');
            }
        } else {
            // Si el archivo no existe, crea uno nuevo
            const newResponse = await fetch('src/components/data/gantt.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formattedTasks,
            });

            if (!newResponse.ok) {
                const errorMessage = newResponse.statusText || 'Error desconocido al crear el archivo JSON.';
                console.error(errorMessage);
            } else {
                console.log('Se ha creado un nuevo archivo JSON con las tareas.');
            }
        }
    } catch (error) {
        console.error('Error al guardar las tareas en el archivo JSON:', error);
    }
}


  updateGantt() {
    this.setMinAndMaxDate();
    const tableHeader = this.buildTableHeader();
    const tableBody = this.buildTableBody();
    document.getElementById("gantt").innerHTML = tableHeader + tableBody;
  }
    // Método para calcular la diferencia en días entre dos fechas
    diffInDays(max, min) {
      const diffTime = Math.abs(max - min);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

  setMinAndMaxDate() {
    let minDate = Infinity;
    let maxDate = -Infinity;
    for (const task of this.tasks) {
      const startDate = new Date(task.startDate);
      const endDate = new Date(task.endDate);
      if (startDate < minDate) {
        minDate = startDate;
      }
      if (endDate > maxDate) {
        maxDate = endDate;
      }
    }
    this.minDate = minDate;
    this.maxDate = maxDate;
  }

  buildTableHeader() {
    let html = "<table><thead><tr>";
    const diffDays = this.diffInDays(this.maxDate, this.minDate) + 1;
    let actual = new Date(this.minDate);
  
    for (let i = 0; i < diffDays && actual <= this.maxDate; i++) {
      actual.setDate(actual.getDate() + 1);
      html += "<th>" + actual.toISOString().substr(0, 10).replace("T", " ") + "</th>";
    }
    html += "</tr></thead><tbody>";
  
    return html;
  }
  
  buildTableBody() {
    let html = "";
  
    for (const task of this.tasks) {
      const taskName = task.taskName;
      const startDate = new Date(task.startDate);
      const endDate = new Date(task.endDate);
      const color = task.color;
      const completion = task.completion;
  
      const days = this.diffInDays(endDate, startDate) + 1;
      const daysBefore = this.diffInDays(startDate, this.minDate);
      const daysAfter = this.diffInDays(this.maxDate, endDate);
  
      html += "<tr>";
      if (daysBefore > 0) {
        html += `<td colspan="${daysBefore}"></td>`;
      }
      html += `<td class="event-cell" colspan="${days}" style="background-color: ${color};">
                <span>${completion}% done</span>${taskName}</td>`;
      if (daysAfter > 0) {
        html += `<td colspan="${daysAfter}"></td>`;
      }
      html += "</tr>";
    }
  
    html += "</tbody></table>";
  
    return html;
  }
  
}

// Crear una instancia de Gantt
const gantt = new Gantt();
