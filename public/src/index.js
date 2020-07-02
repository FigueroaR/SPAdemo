const BASE_URL = "http://localhost:3000"
//const BASE_URL = "https://git.heroku.com/project-central-by-rf.git"
window.addEventListener('load', () => {
  console.log("Welcome to Project Central! Where you can keep track of your employees projects.")

  
  headerEventListeners();
  allContractors();
})

function headerEventListeners() {
  let contractors = document.getElementsByClassName("header__link--allcontractors")[0]
      contractors.addEventListener("click", allContractors)

  let newcontractor = document.getElementsByClassName("header__link--newcontractor")[0]  
      newcontractor.addEventListener("click", newContractor)

  let allprojects = document.getElementsByClassName("header__link--allprojects")[0]
      allprojects.addEventListener("click", allProjects)

}

function clearForm() {
  let form = document.getElementsByClassName("content__form")[0]
  form.innerHTML = ""
  console.log("form cleared")
}


function clearMainContent() {
  let main = document.getElementsByClassName("content__main")[0]
  main.innerHTML = ""
  console.log("main content cleared")
}