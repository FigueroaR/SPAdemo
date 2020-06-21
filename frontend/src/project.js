function Project(name, cost, employees, contractor_id) {
  this.name = name
  this.cost = cost
  this.employees = employees
  this.contractor_id = contractor_id
}

function allProjects(){
  clearForm()
  clearMainContent()
  console.log("all projects")
  let main = document.getElementsByClassName("content__main")[0]
  fetch(BASE_URL + "/projects")
    .then(resp => resp.json())
    .then(projects => {
      projects.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1)
        main.innerHTML+= projects.map(project =>  ` 
        <li> Project: <a href="#" class="projectlink" data-cid="${project.contractor_id}" data-id="${project.id}"> ${project.name}</a> 
        | By:
        <button data-id=${project.contractor_id} class="show" onclick="showContractor(${project.contractor_id})"; return false;>
          <svg class="content__main--icon-contractor">
            <use xlink:href="img/sprite.svg#icon-user"></use>
          </svg>
        </button>
        
        <button data-id=${project.id} class="edit" onclick="editProject(${project.contractor_id},${project.id})"; return false;>
          <svg class="content__main--icon-edit">
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        </button>

        <button data-id=${project.id} class="delete" onclick="deleteProject(${project.id})"; return false;>
          <svg class="content__main--icon-delete">
            <use xlink:href="img/sprite.svg#icon-file-minus"></use>
          </svg>
        </button>
        </li>
        `).join(''); 

        let individualContracts = document.querySelectorAll("a.projectlink")
            individualContracts.forEach( project => {
                project.addEventListener("click", (e) => {
                    showProject(e.currentTarget.dataset.id, e.currentTarget.dataset.cid)
                    e.preventDefault();
                   
                })
            })
        let closeForm =  document.querySelector(".edit")
            closeForm.addEventListener("dblclick", clearForm())
    })
}
function showProject(id, cid){
  clearForm();
  clearMainContent();
  console.log("Show project")
  let main = document.getElementsByClassName("content__main")[0]
  fetch(BASE_URL + `/contractors/${cid}/projects/${id}`)
    .then(resp => resp.json())
    .then(project => {
        
        let html = `
        <h3>Project Name:</h3>
        <p>${project.name}</p></br>
        <h3>Budget:</h3>
        <p>${project.cost}</p></br>
        <h3>Staff Total:</h3>
        <p>${project.employees}</p></br>
        <h3>Contractor ID:</h3>
        <p>${project.contractor_id}</p></br>
        `
        main.innerHTML += html
    })
}

function newProject(id) {
  clearForm();
  //clearMainContent();
  console.log("new project")
  let form = document.getElementsByClassName("content__form")[0]
  let html = `<form class="createProject" >
  <label>Project Name:</label>
  <input type="text" id="Project Name"></br>
  <label>Total Cost:</label>
  <input type="number" id="Cost"></br>
  <label>Staff Total:</label>
  <input type="number" id="Employees"></br>
  <input type="hidden" id="contractorID" value=${id} data-id=${id}>
  <input type="submit" data-id=${id} value="Create Project" class="btn btn__createProject">
  <button class="cancel">Cancel</button
  </form>`
  form.innerHTML = html
  let executeProject = document.querySelector("input.btn__createProject")
    executeProject.addEventListener("click", (e) => {
        createProject(e.currentTarget.dataset.id) 
        //allProjects()
        e.preventDefault()
        
    } )
    let cancel = document.querySelector(".cancel")
    cancel.addEventListener("click", clearForm)

}
function createProject(id){
  console.log("create Project")
  let main = document.getElementsByClassName("content__main")[0]
  let newproject = new Project(
    document.getElementById("Project Name").value , 
    document.getElementById("Cost").value, 
    document.getElementById("Employees").value, 
    document.getElementById("contractorID").value
  )
    
  fetch( BASE_URL + `/projects`, {
    method: "POST",
    body: JSON.stringify(newproject),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  })
  .then(resp => resp.json())
  .then( project => { 
    main.innerHTML +=  `
    <li> Project: <a href="#" class="projectlink" data-cid="${project.contractor_id}" data-id="${project.id}"> ${project.name}</a> 
        | By:
        <button data-id=${project.contractor_id} class="show" onclick="showContractor(${project.contractor_id})"; return false;>
          <svg class="content__main--icon-contractor">
            <use xlink:href="img/sprite.svg#icon-user"></use>
          </svg>
        </button>
        
        <button data-id=${project.id} class="edit" onclick="editProject(${project.contractor_id},${project.id})"; return false;>
          <svg class="content__main--icon-edit">
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        </button>

        <button data-id=${project.id} class="delete" onclick="deleteProject(${project.id})"; return false;>
          <svg class="content__main--icon-delete">
            <use xlink:href="img/sprite.svg#icon-file-minus"></use>
          </svg>
        </button>
        </li>
    `
  })
  clearForm();
  clearMainContent();
  allProjects();
}
function editProject(cid, id){
  console.log("edit Project")
  clearForm();
  fetch(BASE_URL + `/contractors/${cid}/projects/${id}`)
    .then(resp => resp.json())
    .then(project => {
        let main = document.getElementsByClassName("content__form")[0]
        let html = `
        <form>
        <label>Project Name:</label>
        <input type="text" id="name" value="${project.name}"></br>
        <label>Budget:</label>
        <input type="number" id="cost" value="${project.cost}"></br>
        <label>Staff Total:</label>
        <input type="number" id="employees" value="${project.employees}"></br>
        <input type="hidden" id="contractorID" value="${project.contractor_id}" data-id="${project.contractor_id}"> 
        <input type ="submit" value="Edit Project" class="btn btn__editThisProject" data-id="${project.id}">
        <button class="cancel">Cancel</button
        </form>
        `
        main.innerHTML = html;
        let editThisContract = document.querySelector("input.btn__editThisProject")
        editThisContract.addEventListener("click", (e) => {
            updateProject(e.currentTarget.dataset.id) 
            e.preventDefault();
        }) 
        let cancel = document.querySelector(".cancel")
        cancel.addEventListener("click", clearForm)

    })
}
function updateProject(id){
  console.log("update projects")
  let updated = new Project(
    document.getElementById("name").value , 
    document.getElementById("cost").value, 
    document.getElementById("employees").value,
    document.getElementById("contractorID").value 
    )
    fetch( BASE_URL + `/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updated),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  }).then(resp => resp.json())
  .then( project => {
    let tag = document.querySelectorAll(`a[data-id="${id}"]`)[0].parentElement
    tag.innerHTML = `Project: <a href="#" class="projectlink" data-cid="${project.contractor_id}" data-id="${project.id}"> ${project.name}</a> 
    | By:
    <button data-id=${project.contractor_id} class="show" onclick="showContractor(${project.contractor_id})"; return false;>
      <svg class="content__main--icon-contractor">
        <use xlink:href="img/sprite.svg#icon-user"></use>
      </svg>
    </button>
    
    <button data-id=${project.id} class="edit" onclick="editProject(${project.contractor_id},${project.id})"; return false;>
      <svg class="content__main--icon-edit">
        <use xlink:href="img/sprite.svg#icon-edit"></use>
      </svg>
    </button>

    <button data-id=${project.id} class="delete" onclick="deleteProject(${project.id})"; return false;>
      <svg class="content__main--icon-delete">
        <use xlink:href="img/sprite.svg#icon-file-minus"></use>
      </svg>
    </button>
    `
  
    clearForm()
  })
}

function deleteProject(id) {
  console.log("all projects")
  
  fetch(BASE_URL + `/projects/${id}`, {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  })
  .then(document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement.remove()) 
}