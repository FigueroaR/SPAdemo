function Contractor(firstName, lastName, phoneNum, email){
  this.firstName = firstName 
  this.lastName = lastName
  this.phoneNum = phoneNum
  this.email = email
}

function allContractors(){
  clearForm()
  clearMainContent()
  console.log("all contractors")
  let main = document.getElementsByClassName("content__main")[0]
  fetch( BASE_URL + "/contractors")
  .then(resp => resp.json())
  .then(contractors => {
    contractors.sort((a, b) => a.lastName.toLocaleLowerCase() > b.lastName.toLocaleLowerCase() ? 1 : -1)
    main.innerHTML+= contractors.map( contractor =>  `
        <li><a href="#" class="userProfile" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}, ${contractor.firstName}</a>
      
        <button data-id=${contractor.id} class="btn btn__projects" onclick="contractorProjects(${contractor.id})"; return false;>
          <svg class="content__main--icon-list">
            <use xlink:href="img/sprite.svg#icon-list"></use>
          </svg>
        </button>

        <button data-lastname=${contractor.lastName} data-id=${contractor.id} class="btn btn__project" onclick="newProject(${contractor.id})"; return false;>
          <svg class="content__main--icon-newproject">
            <use xlink:href="img/sprite.svg#icon-file-plus"></use>
          </svg>
        </button>

        <button data-id=${contractor.id} class="btn btn__edit" onclick="editContractor(${contractor.id})"; return false;><svg class="link__edit">
          <svg class="content__main--icon-edit">
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        </button>

        <button data-id=${contractor.id} class="btn btn__delete" onclick="deleteContractor(${contractor.id})"; return false;><svg class="link__delete">
          <svg class="content__main--icon-delete">
            <use xlink:href="img/sprite.svg#icon-user-x"></use>
          </svg>
        </button>
      </li>`).join(''); 

      let profiles = document.querySelectorAll("a.userProfile")
        profiles.forEach( contractor => {
          contractor.addEventListener("click", (e) => {
            showContractor(e.currentTarget.dataset.id)
            e.preventDefault();
            })
      })
  })
}
function showContractor(id){
  
  clearForm();
  clearMainContent();
  console.log("show contractor", "number:",id)
  let main =  document.getElementsByClassName("content__main")[0]
  fetch( BASE_URL + `/contractors/${id}`)
  .then( resp => resp.json())
  .then( contractor => {
    let html = `<h3>First Name:</h3>
    <p> ${contractor.firstName}</p></br>
    <h3>Last Name:</h3>
    <p> ${contractor.lastName}</p></br>
    <h3>Phone Num:</h3>
    <p>${contractor.phoneNum} </p></br>
    <h3>email:</h3>
    <p>${contractor.email} </p></br>`

    main.innerHTML = html
  })
}
function newContractor() {
  console.log("new contractor")
  clearForm();
  //clearMainContent();

  let form = document.getElementsByClassName("content__form")[0]
  let html = `
        <form class="content__input">
        <label>First Name:</label>
        <input type ="text" id="First Name"></br>
        <label>Last Name:</label>
        <input type ="text" id="Last Name"></br>
        <label>Phone Num:</label>
        <input type ="text" id="Phone Num"></br>
        <label>email:</label>
        <input type ="text" id="email"></br>
        <input type ="submit" value="Create Contractor" class="btn btn__input">
        <button class="cancel">Cancel</button
        </form>
    `
    form.innerHTML = html
    let create = document.querySelector("input.btn__input")
    create.addEventListener("click" , (e) => {
      createContractor()
      e.preventDefault();
    })

    let cancel = document.querySelector(".cancel")
      cancel.addEventListener("click", clearForm)
}


function createContractor(){
  let newContractor = new Contractor(document.getElementById("First Name").value, 
  document.getElementById("Last Name").value, 
  document.getElementById("Phone Num").value, 
  document.getElementById("email").value)

  let main = document.getElementsByClassName("content__main")[0]
    fetch(BASE_URL+'/contractors',{
        method: "POST",
        body: JSON.stringify(newContractor),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(contractor => {
        main.innerHTML+= `
        <li><a href="#" class="userProfile" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}, ${contractor.firstName}</a>
      
        <button data-id=${contractor.id} class="btn btn__projects" onclick="contractorProjects(${contractor.id})"; return false;>
          <svg class="content__main--icon-list">
            <use xlink:href="img/sprite.svg#icon-list"></use>
          </svg>
        </button>

        <button data-lastname=${contractor.lastName} data-id=${contractor.id} class="btn btn__project" onclick="newProject(${contractor.id})"; return false;>
          <svg class="content__main--icon-newproject">
            <use xlink:href="img/sprite.svg#icon-file-plus"></use>
          </svg>
        </button>

        <button data-id=${contractor.id} class="btn btn__edit" onclick="editContractor(${contractor.id})"; return false;><svg class="link__edit">
          <svg class="content__main--icon-edit">
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        </button>

        <button data-id=${contractor.id} class="btn btn__delete" onclick="deleteContractor(${contractor.id})"; return false;><svg class="link__delete">
          <svg class="content__main--icon-delete">
            <use xlink:href="img/sprite.svg#icon-user-x"></use>
          </svg>
        </button>
      </li>
      `
      let profiles = document.querySelectorAll("a.userProfile")
        profiles.forEach( contractor => {
          contractor.addEventListener("click", (e) => {
            showContractor(e.currentTarget.dataset.id)
            e.preventDefault();
            })
      })
      clearForm();
    })
}
function editContractor(id){
  console.log("edit contractor")
  fetch( BASE_URL + `/contractors/${id}`) 
    .then(resp => resp.json())
    .then(contractor => {
        let form = document.getElementsByClassName("content__form")[0]
    
        let html = `<form>
                <label>First Name: </label>
                <input type ="text" id="First Name" value="${contractor.firstName}"></br>
                <label>Last Name:</label>
                <input type ="text" id="Last Name" value="${contractor.lastName}"></br>
                <label>Phone Num:</label>
                <input type ="text" id="Phone Num" value="${contractor.phoneNum}"></br>
                <label>email:</label>
                <input type ="text" id="email" value="${contractor.email}"></br>
                <input type ="submit" class="btn btn__editContractor" value="Edit Contractor" data-id="${contractor.id}">
                <button class="cancel">Cancel</button
            </form>`
            form.innerHTML = html

            let editThisContractor = document.querySelector("input.btn__editContractor")
            editThisContractor.addEventListener("click", (e) => {
                updateContractor(e.currentTarget.dataset.id) 
                e.preventDefault();
            })
            let cancel = document.querySelector(".cancel")
            cancel.addEventListener("click", clearForm)
    })
}
function updateContractor(id){
  console.log("update contractors")
  let updatedContractor = new Contractor(document.getElementById("First Name").value, 
  document.getElementById("Last Name").value, 
  document.getElementById("Phone Num").value, 
  document.getElementById("email").value)

  fetch(BASE_URL+`/contractors/${id}`,{
      method: "PATCH",
      body: JSON.stringify(updatedContractor),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })
  .then(resp => resp.json())
  .then( contractor => {
    let tag = document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement
    tag.innerHTML = `
      <a href="#" class="userProfile" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}, ${contractor.firstName}</a>
      
        <button data-id=${contractor.id} class="btn btn__projects" onclick="contractorProjects(${contractor.id})"; return false;>
          <svg class="content__main--icon-list">
            <use xlink:href="img/sprite.svg#icon-list"></use>
          </svg>
        </button>

        <button data-lastname=${contractor.lastName} data-id=${contractor.id} class="btn btn__project" onclick="newProject(${contractor.id})"; return false;>
          <svg class="content__main--icon-newproject">
            <use xlink:href="img/sprite.svg#icon-file-plus"></use>
          </svg>
        </button>

        <button data-id=${contractor.id} class="btn btn__edit" onclick="editContractor(${contractor.id})"; return false;><svg class="link__edit">
          <svg class="content__main--icon-edit">
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        </button>

        <button data-id=${contractor.id} class="btn btn__delete" onclick="deleteContractor(${contractor.id})"; return false;><svg class="link__delete">
          <svg class="content__main--icon-delete">
            <use xlink:href="img/sprite.svg#icon-user-x"></use>
          </svg>
        </button>
      `
      let profiles = document.querySelectorAll("a.userProfile")
        profiles.forEach( contractor => {
          contractor.addEventListener("click", (e) => {
            showContractor(e.currentTarget.dataset.id)
            e.preventDefault();
            })
      })
    clearForm();
  })
}

function deleteContractor(id) {
  console.log("all contractors")
  fetch(BASE_URL + `/contractors/${id}`, {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  })
    .then(document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement.remove()) 
  }


  function contractorProjects(id){
    clearForm();
  clearMainContent();
  console.log("contractor projects")
  let main = document.getElementsByClassName("content__main")[0]
  fetch(BASE_URL + `/contractors/${id}`)
    .then(resp => resp.json())
    .then(contractors => {
      main.innerHTML += contractors.projects.map( project => 
        `<li> Project: <a href="#" class="projectlink" data-cid="${project.contractor_id}" data-id="${project.id}"> ${project.name}</a> 
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
      </li>`).join('')  
    })
  }