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
        <li><a href="#" class="content__item content__item--userProfile" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}, ${contractor.firstName}</a>
      
        
          <svg data-id=${contractor.id} class="content__icon content__icon--list" onclick="contractorProjects(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-list"></use>
          </svg>
        

        
          <svg data-lastname=${contractor.lastName} data-id=${contractor.id} class="content__icon content__icon--newproject" onclick="newProject(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-file-plus"></use>
          </svg>

      
          <svg data-id=${contractor.id} class="content__icon content__icon--edit" onclick="editContractor(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        
          <svg data-id=${contractor.id} class="content__icon content__icon--delete" onclick="deleteContractor(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-user-x"></use>
          </svg>
      </li>`).join(''); 

      let profiles = document.querySelectorAll("a.content__item--userProfile")
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
    let html = `<h3 class="h-three">First Name:</h3>
    <p> ${contractor.firstName}</p></br>
    <h3 class="h-three">Last Name:</h3>
    <p> ${contractor.lastName}</p></br>
    <h3 class="h-three">Phone Num:</h3>
    <p>${contractor.phoneNum} </p></br>
    <h3 class="h-three">email:</h3>
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
        <form class="content__form--input">
          <label class="content__form--label">First Name:</label></br>
          <input class="content__form--field" type ="text" id="First Name"></br>
          <label class="content__form--label">Last Name:</label></br>
          <input class="content__form--field" type ="text" id="Last Name"></br>
          <label class="content__form--label">Phone Num:</label></br>
          <input class="content__form--field" type ="text" id="Phone Num"></br>
          <label class="content__form--label">email:</label></br>
          <input class="content__form--field" type ="text" id="email"></br>
          <input type ="submit" value="Create Contractor" class="btn btn__form btn__form--input">
          <button class="btn btn__form btn__form--cancel">Cancel</button>
        </form>
    `
    form.innerHTML = html
    let create = document.querySelector("input.btn__form--input")
    create.addEventListener("click" , (e) => {
      createContractor()
      e.preventDefault();
    })

    let cancel = document.querySelector(".btn__form--cancel")
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
        <li><a href="#" class="content__item content__item--userProfile" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}, ${contractor.firstName}</a>
      
        
          <svg data-id=${contractor.id} class="content__icon content__icon--list" onclick="contractorProjects(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-list"></use>
          </svg>
        

        
          <svg data-lastname=${contractor.lastName} data-id=${contractor.id} class="content__icon content__icon--newproject" onclick="newProject(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-file-plus"></use>
          </svg>

      
          <svg data-id=${contractor.id} class="content__icon content__icon--edit" onclick="editContractor(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        
          <svg data-id=${contractor.id} class="content__icon content__icon--delete" onclick="deleteContractor(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-user-x"></use>
          </svg>
      </li>
      `
      let profiles = document.querySelectorAll("a.ccontent__item--userProfile")
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
    
        let html = `
        <form class="content__form--input">
          <label class="content__form--label">First Name: </label><br>
          <input class="content__form--field" class="content__form--field type ="text" id="First Name" value="${contractor.firstName}"></br>
          <label class="content__form--label">Last Name:</label><br>
          <input class="content__form--field" class="content__form--field type ="text" id="Last Name" value="${contractor.lastName}"></br>
          <label class="content__form--label">Phone Num:</label><br>
          <input class="content__form--field" class="content__form--field type ="text" id="Phone Num" value="${contractor.phoneNum}"></br>
          <label class="content__form--label">email:</label><br>
          <input class="content__form--field" type ="text" id="email" value="${contractor.email}"></br>
          <input type ="submit" class="btn btn__form btn__form--editContractor" value="Edit Contractor" data-id="${contractor.id}">
          <button class="btn btn__form btn__form--cancel">Cancel</button>
        </form>`

        form.innerHTML = html

            let editThisContractor = document.querySelector("input.btn__form--editContractor")
            editThisContractor.addEventListener("click", (e) => {
                updateContractor(e.currentTarget.dataset.id) 
                e.preventDefault();
            })
            let cancel = document.querySelector(".btn__form--cancel")
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
    <li><a href="#" class="content__item content__item--userProfile" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}, ${contractor.firstName}</a>
      
        
          <svg data-id=${contractor.id} class="content__icon content__icon--list" onclick="contractorProjects(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-list"></use>
          </svg>
        

        
          <svg data-lastname=${contractor.lastName} data-id=${contractor.id} class="content__icon content__icon--newproject" onclick="newProject(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-file-plus"></use>
          </svg>

      
          <svg data-id=${contractor.id} class="content__icon content__icon--edit" onclick="editContractor(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-edit"></use>
          </svg>
        
          <svg data-id=${contractor.id} class="content__icon content__icon--delete" onclick="deleteContractor(${contractor.id})"; return false;>
            <use xlink:href="img/sprite.svg#icon-user-x"></use>
          </svg>
    </li>
    `
      let profiles = document.querySelectorAll("a.content__item--userProfile")
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
      main.innerHTML += contractors.projects.map( project => `
      <li><a href="#" class="content__item content__item--projectlink" data-cid="${project.contractor_id}" data-id="${project.id}"> ${project.name}</a>
        
        <svg data-id=${project.contractor_id} class="content__icon content__icon--contractor" onclick="showContractor(${project.contractor_id})"; return false;>
          <use xlink:href="img/sprite.svg#icon-user"></use>
        </svg>
        
        <svg data-id=${project.id} class="content__icon content__icon--edit" onclick="editProject(${project.contractor_id},${project.id})"; return false;>
          <use xlink:href="img/sprite.svg#icon-edit"></use>
        </svg>
    
        <svg data-id=${project.id} class="content__icon content__icon--delete" onclick="deleteProject(${project.id})"; return false;>
          <use xlink:href="img/sprite.svg#icon-file-minus"></use>
        </svg>
      
      </li>`).join('')
      
      
      let individualContracts = document.querySelectorAll("a.content__item--projectlink")
            individualContracts.forEach( project => {
                project.addEventListener("click", (e) => {
                    showProject(e.currentTarget.dataset.id, e.currentTarget.dataset.cid)
                    e.preventDefault();
                   
                })
            })
    })
}