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

const addTask = document.getElementById('addTask');
const xmlForm = document.getElementById('xmlForm');
xmlForm.addEventListener('click',async()=>{
    const res = await api.createxml({});

})
// Add event listener to the form submission
addTask.addEventListener('click', async () => {
 

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
const roleSelect=document.getElementById('st_role')
submitRoleButton.addEventListener('click', async () => {
    // Get the value from the input
    
    const role = taskRoleInput.value;

    try { 
        // Use await to call the API method to create a note
        const res = await api.createRole({ role });

         // Update the select element with the new role
         const option = document.createElement('option');
         option.text = role;
         roleSelect.add(option); 

        console.log(res); // Log the response from the API
    } catch (error) {
        console.error(error); // Log any errors that occur during the API call
    }
});

// Get Product
const productInput = document.getElementById('st_Products');
const submitProductButton = document.getElementById('submitProduct');
const isCompositeCheckbox = document.getElementById('st_Products_composit');
const ProdSelect=document.getElementById('st_linked_product')

submitProductButton.addEventListener('click', async () => {
    // Get the value from the input
    const product = productInput.value;
    const isComposite = String(isCompositeCheckbox.checked);

    try { 
        if(product){

        // Use await to call the API method to create a product
        const res = await api.createProduct({ product, isComposite });
        
         // Update the select element with the new role
         const option = document.createElement('option');
         option.text = product;
         ProdSelect.add(option); 
        }
        console.log(res); // Log the response from the API
    } catch (error) {
        console.error(error); // Log any errors that occur during the API call
    }
});


// Get Uses
const usesInput = document.getElementById('st_uses');
const submitUsesButton = document.getElementById('submitUses');
const ToolSelect=document.getElementById('st_linked_use')

submitUsesButton.addEventListener('click', async () => {
    // Get the value from the input
    const use = usesInput.value;
    const tool=ToolSelect.value;
    try { 
        // Use await to call the API method to create a use
        const res = await api.createUse({ use,tool });
        
        console.log(res); // Log the response from the API
    } catch (error) {
        console.error(error); // Log any errors that occur during the API call
    }
});

// Get toolsDefinition
const toolInput = document.getElementById('st_tool');
const submitToolsButton = document.getElementById('submitTools');

submitToolsButton.addEventListener('click', async () => {
    // Get the value from the input
    const tool = toolInput.value;

    try { 
        if(tool){
        // Use await to call the API method to create a tool
        const res = await api.createTool({ tool });
        // Update the select element with the new role
        const option = document.createElement('option');
        option.text = tool;
        ToolSelect.add(option); 
        console.log(res); // Log the response from the API
        }

    } catch (error) {
        console.error(error); // Log any errors that occur during the API call
    }
});
