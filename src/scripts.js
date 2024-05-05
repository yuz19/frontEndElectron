// Import ipcRenderer from Electron

// Select the form elements
const taskNameInput = document.getElementById('st_task_name');
const taskTypeInput = document.getElementById('st_task_type');
const taskDirectionInput = document.getElementById('st_task_direction');
const linkedTaskInput = document.getElementById('st_linked_task');
const linkedProductInput = document.getElementById('st_linked_product');
const roleInput = document.getElementById('st_role');
const linkedTaskPerformerInput = document.getElementById('st_linked_task_performer');
const successorInput = document.getElementById('st_successor');
const predecessorInput = document.getElementById('st_predecessor');
const linkKindInput = document.getElementById('st_link_kind');

// Add event listener to the form submission
xmlForm.addEventListener('submit', async () => {
 

    // Get the values from each input
    const taskName = taskNameInput.value;
    const taskType = taskTypeInput.value;
    const taskDirection = taskDirectionInput.value;
    const linkedTask = linkedTaskInput.value;
    const linkedProduct = linkedProductInput.value;
    const role = roleInput.value;
    const linkedTaskPerformer = linkedTaskPerformerInput.value;
    const successor = successorInput.value;
    const predecessor = predecessorInput.value;
    const linkKind = linkKindInput.value;

    // Create an object with the form data
    const formData = {
        taskName,
        taskType,
        taskDirection,
        linkedTask,
        linkedProduct,
        role,
        linkedTaskPerformer,
        successor,
        predecessor,
        linkKind
    };

    try { 
        // Use await to call the API method to create a note
        const res = await api.createNote(formData);
        console.log(res); // Log the response from the API
    } catch (error) {
        console.error(error); // Log any errors that occur during the API call
    }
});


// Get Role
const taskRoleInput = document.getElementById('st_roles');
const submitRoleButton = document.getElementById('submitRole');

submitRoleButton.addEventListener('click', async () => {
    // Get the value from the input
    const role = taskRoleInput.value;

    try { 
        // Use await to call the API method to create a note
        const res = await api.createRole({ role });
        console.log(res); // Log the response from the API
    } catch (error) {
        console.error(error); // Log any errors that occur during the API call
    }
});
