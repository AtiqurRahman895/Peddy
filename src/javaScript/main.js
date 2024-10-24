// change the background of nav bar

window.addEventListener(`scroll`, () => {
    if (window.scrollY >= 20) {
      document
        .querySelector(`.headerSection`)
        .classList.add(`headerSectionAnimation`);
    } else {
      document
        .querySelector(`.headerSection`)
        .classList.remove(`headerSectionAnimation`);
    }
  });

// category Tabs

let tabsWrappers1= document.querySelector(`.tabsWrapper1`)
let tabsWrappers2= document.querySelector(`.tabsWrapper2`)
// Fetch All Pet Categories
const allCategories= async()=>{
    try {
        let res=await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
        let data=await res.json()
        displayCategories(data.categories)
    } catch (error) {
        console.log(error)
    }
}
allCategories()
// display Categories to UI
const displayCategories=(data)=>{
    data.forEach((eachCategory)=>{
        
        let tabContent = `
            <div onclick="categoryPets('${eachCategory.category}')" class="categoryTabButton ${eachCategory.category}TabButton h-full flex items-center justify-center gap-2">
                <img src="${eachCategory.category_icon}" alt="All" class="w-[2rem]">
                <h6>${eachCategory.category}</h6>
            </div>
        `;

        let tab1 = document.createElement(`div`);
        let tab2 = document.createElement(`div`);

        tab1.innerHTML = tabContent;
        tab2.innerHTML = tabContent;

        tabsWrappers1.append(tab1);
        tabsWrappers2.append(tab2);
    })
}

// Fetch All Pets

let petsWrapper= document.querySelector(`.petsWrapper`)
// // Fetch All Pets 
const allPets= async(sort=false)=>{
    try {
        let res=await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
        let data=await res.json()
        if(sort){
            data.pets.sort((a,b)=>b.price-a.price)
            displayPets(data.pets)

        }else{
            displayPets(data.pets)
        }
    } catch (error) {
        console.log(error)
    }
}
allPets()
// display pets to UI
const displayPets=(data)=>{
    petsWrapper.innerHTML=`
            <div class="text-custom-green text-center flex flex-col items-center h-fit py-24 px-4 sm:py-30 rounded-md space-y-4">
              <span class="loading loading-infinity loading-lg"></span>
            </div>`
    setTimeout(()=>{
        petsWrapper.innerHTML=``
        !data.length?notAvailable(false):data.forEach((eachPet)=>{
            notAvailable()
            let pets= document.createElement(`div`)
            pets.innerHTML=`
                        <div class="border rounded-md p-3 flex flex-col gap-3 h-fit">
                            <img src="${eachPet.image}" alt="" class="rounded-md">
                            <div class="flex flex-col gap-2">
                                <h6>${eachPet.pet_name}</h6>
                                <div class="flex items-center gap-3">
                                    <i class="fa-sharp fa-light fa-paw-simple text-custom-green"></i>
                                    <p>Breed: ${eachPet.breed?eachPet.breed:'Not available!'}</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <i class="fa-light fa-calendar-days text-custom-green"></i>
                                    <p>Birth: ${eachPet.date_of_birth?eachPet.date_of_birth:'Not available!'}</p>
                                </div>
                                <div class="flex items-center gap-1">
                                    <i class="fa-light fa-venus-mars text-custom-green"></i>
                                    <p>Gender: ${eachPet.gender?eachPet.gender:'Not available!'}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="fa-sharp fa-light fa-circle-dollar text-custom-green"></i>
                                    <p>Price : ${eachPet.price?eachPet.price:'Not available'}$</p>
                                </div>
                            </div>
                            <div class="flex justify-between gap-1 pt-3 border-t">
                                <button type="button" onclick='clickLikeButton(this,${eachPet.petId})' class="cardButton likeButton p-2"><i class="fa-light fa-thumbs-up"></i></button>
                                <button type="button" onclick='clickAdoptButton(${eachPet.petId})' class="cardButton adoptButton${eachPet.petId} p-2">Adopt</button>
                                <button type="button" onclick='clickDetailsButton(${eachPet.petId})' class="cardButton p-2">Details</button>
                            </div>
                        </div>
            `
            petsWrapper.append(pets)
        })
    },2000)

}

// Fetch Pets by Category

// let petsWrapper= document.querySelector(`.petsWrapper`)
// Fetch Pets with category
const categoryPets= async(category)=>{
    try {
        let res=await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        let data=await res.json()

        if(document.querySelector(`.sortByPriceButton`).classList.contains(`activeSortButton`)){
            data.data.sort((a,b)=>b.price-a.price)
            displayCategoryPets(data.data,category)

        }else{
            displayCategoryPets(data.data,category)
        }

        // displayCategoryPets(data.data,category)
    } catch (error) {
        console.log(error)
    }
}
// display pets to UI
const displayCategoryPets=(data,category)=>{

    // Change active category Button 

    let categoryTabButton=document.querySelectorAll(`.categoryTabButton`)
    categoryTabButton.forEach((eachCategoryTabButton)=>{
        eachCategoryTabButton.classList.toggle(`activeCategoryTabButton`,false)
    })
    let specificCategoryTabButtons= document.querySelectorAll(`.${category}TabButton`)
    specificCategoryTabButtons.forEach((eachSpecificCategoryTabButton)=>{
        eachSpecificCategoryTabButton.classList.add('activeCategoryTabButton')
    })

    // loading for 2s

    petsWrapper.innerHTML=``
    petsWrapper.classList.toggle('sm:grid-cols-2',false)
    petsWrapper.classList.toggle('xl:grid-cols-3',false)
    petsWrapper.innerHTML=`
            <div class="text-custom-green text-center flex flex-col items-center h-fit py-24 px-4 sm:py-30 rounded-md space-y-4">
              <span class="loading loading-infinity loading-lg"></span>
            </div>`
    setTimeout(()=>{

        // show category data if found

        petsWrapper.innerHTML=``
        !data.length?notAvailable(false):data.forEach((eachPet)=>{
            let pets= document.createElement(`div`)
            notAvailable()
            pets.innerHTML=`
                        <div class="border rounded-md p-3 flex flex-col gap-3 h-fit">
                            <img src="${eachPet.image}" alt="" class="rounded-md">
                            <div class="flex flex-col gap-2">
                                <h6>${eachPet.pet_name}</h6>
                                <div class="flex items-center gap-3">
                                    <i class="fa-sharp fa-light fa-paw-simple text-custom-green"></i>
                                    <p>Breed: ${eachPet.breed?eachPet.breed:'Not available!'}</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <i class="fa-light fa-calendar-days text-custom-green"></i>
                                    <p>Birth: ${eachPet.date_of_birth?eachPet.date_of_birth:'Not available!'}</p>
                                </div>
                                <div class="flex items-center gap-1">
                                    <i class="fa-light fa-venus-mars text-custom-green"></i>
                                    <p>Gender: ${eachPet.gender?eachPet.gender:'Not available!'}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="fa-sharp fa-light fa-circle-dollar text-custom-green"></i>
                                    <p>Price : ${eachPet.price?eachPet.price:'Not available'}$</p>
                                </div>
                            </div>
                            <div class="flex justify-between gap-1 pt-3 border-t">
                                <button type="button" onclick='clickLikeButton(this,${eachPet.petId})' class="cardButton likeButton p-2"><i class="fa-light fa-thumbs-up"></i></button>
                                <button type="button" onclick='clickAdoptButton(${eachPet.petId})' class="cardButton adoptButton${eachPet.petId} p-2">Adopt</button>
                                <button type="button" onclick='clickDetailsButton(${eachPet.petId})' class="cardButton p-2">Details</button>
                            </div>
                        </div>
            `
            petsWrapper.append(pets)
        })
    },2000)

}

// Available or not

const notAvailable=(available=true)=>{
    if(!available){
        petsWrapper.classList.toggle('sm:grid-cols-2',false)
        petsWrapper.classList.toggle('xl:grid-cols-3',false)
        petsWrapper.innerHTML=`
            <div class="text-center flex flex-col items-center h-fit py-12 px-4 sm:p-12 bg-custom-ash rounded-md space-y-4">
              <img src="../assets/error.webp" alt="Not Available" class="w-[150px]">
              <h3>No Information Available</h3>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>`
    }else{
        petsWrapper.classList.toggle('sm:grid-cols-2',true)
        petsWrapper.classList.toggle('xl:grid-cols-3',true)

    }
}

// Fetch Pet Details by ID

const petDetailsById= async(petId, carrierFunction)=>{
    try {
        let res=await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        let data=await res.json()
        carrierFunction(data.petData)
    } catch (error) {
        console.log(error)
    }
}


// display liked pets to UI

let likedPetsWrapper= document.querySelector(`.likedPetsWrapper`)

const displayLikedPet=(pet)=>{

        let likedPet= document.createElement(`div`)
        likedPet.id=`pet${pet.petId}`
        likedPet.innerHTML=`<img src="${pet.image}" onclick='clickDetailsButton(${pet.petId})' alt="${pet.pet_name}" class="w-fit rounded-md hover:shadow-md">`
        likedPetsWrapper.append(likedPet)
    
}

let clickLikeButton=(e,petId)=>{
    if(e.classList.contains(`activeCardButton`)){
        document.getElementById(`pet${petId}`).remove()
    }else{
        petDetailsById(petId,displayLikedPet)

    }
    e.classList.toggle(`activeCardButton`)

}

// display pet's Details Modal to UI

let detailsModalWrapper= document.querySelector(`.detailsModalWrapper`)

const displayDetailsModal=(pet)=>{
    let adoptButton= document.querySelector(`.adoptButton${pet.petId}`)

        detailsModalWrapper.innerHTML=`              
            <dialog id="detailsModal" class="modal modal-middle bg-[rgba(0,0,0,0.40)]">
        <div class="modal-box bg-white flex flex-col gap-3 hide-scrollbar" >
          <img src="${pet.image}" alt="Pet Image" class="">
          <h5 class="">${pet.pet_name?pet.pet_name:'Not available!'}</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div class="flex items-center gap-3">
              <i class="fa-sharp fa-light fa-paw-simple text-custom-green"></i>
              <p>Breed: ${pet.breed?pet.breed:'Not available!'}</p>
            </div>
            <div class="flex items-center gap-3">
              <i class="fa-light fa-calendar-days text-custom-green"></i>
              <p>Birth: ${pet.date_of_birth?pet.date_of_birth:'Not available!'}</p>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-light fa-venus-mars text-custom-green"></i>
              <p>Gender: ${pet.gender?pet.gender:'Not available!'}</p>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-sharp fa-light fa-circle-dollar text-custom-green"></i>
              <p>Price : ${pet.price?pet.price:'Not available'}$</p>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-light fa-syringe text-custom-green"></i>
              <p>Vaccinated status: ${pet.vaccinated_status?pet.vaccinated_status:'Not available!'}</p>
            </div>
          </div>
  
          <div class="border-t pt-3 flex flex-col gap-3">
            <b class="text-black">Details Information</b>
            <p>${pet.pet_details?pet.pet_details:'Not available!'}</p>
          </div>

          <button type="button" onclick='clickAdoptButton(${pet.petId})' class="cardButton  adoptButton${pet.petId} ${adoptButton.innerText=='Adopted'?'activeCardButton':''} py-2.5" ${adoptButton.innerText=='Adopted'?"disabled":""}>${adoptButton.innerText=='Adopted'?"Adopted":"Adopt"}</button>

            <form method="dialog" class="w-full">
              <button class="modalButton  w-full">Close</button>
            </form>
  
        </div>
            </dialog>
        `

    document.getElementById(`detailsModal`).open='true'
    
}

let clickDetailsButton=(petId)=>{
    petDetailsById(petId,displayDetailsModal)

}

// display pet's Adopt Modal to UI

let adoptModalWrapper= document.querySelector(`.adoptModalWrapper`)

const displayAdoptModal=(pet)=>{


        let counter=4
        let adoptCounter=setInterval(()=>{
            counter--
            adoptModalWrapper.innerHTML=`              
      <dialog id="adoptModal" class="modal modal-middle sm:modal-middle bg-[rgba(0,0,0,0.40)]">
        <div class="modal-box bg-white flex flex-col items-center hide-scrollbar" >

          <img src="../assets/handshake.svg" alt="Handshake Image" class="w-[10rem]">
          <h3>Congrates</h3>
          <p>${pet.pet_name}'s Adoption Process will end in</p>

         <h1 class="text-custom-green">${counter}s</h1>
  
        </div>
      </dialog>
              `
            
              if(counter<0){
                clearInterval(adoptCounter)
                document.getElementById(`adoptModal`).open='' 
                disableAdoptButton(true,pet.petId)

              }else{
                document.getElementById(`adoptModal`).open='true' 
              }
        },1000)
    
}

let clickAdoptButton=(petId)=>{
    petDetailsById(petId,displayAdoptModal)
}

// disable adopt Button
let disableAdoptButton=(disable,petId)=>{
    if(disable){
        let adoptButtons= document.querySelectorAll(`.adoptButton${petId}`)
        adoptButtons.forEach((eachAdoptButton)=>{
            eachAdoptButton.disabled="disabled"
            eachAdoptButton.classList.add(`activeCardButton`)
            eachAdoptButton.innerText=`Adopted`
        })
    }else null
}

// To sort pets by price

let sortByPriceButton=document.querySelectorAll(`.sortByPriceButton`)


sortByPriceButton.forEach((eachSortByPriceButton)=>{
    eachSortByPriceButton.addEventListener('click',(e)=>{

        document.querySelectorAll(`.sortByPriceButton`)[0].classList.toggle(`activeSortButton`)
        document.querySelectorAll(`.sortByPriceButton`)[1].classList.toggle(`activeSortButton`)
    
        if(eachSortByPriceButton.classList.contains(`activeSortButton`)){
    
            if(document.querySelector(`.activeCategoryTabButton`)){
                document.querySelector(`.activeCategoryTabButton`).click()
                console.log("sort1")
                document.querySelectorAll(`.sortByPriceButton`)[0].innerText='Sorted by price'
                document.querySelectorAll(`.sortByPriceButton`)[1].innerText='Sorted by price'
    
            }else{
                console.log("sort2")
                allPets(true)
                document.querySelectorAll(`.sortByPriceButton`)[0].innerText='Sorted by price'
                document.querySelectorAll(`.sortByPriceButton`)[1].innerText='Sorted by price'
            }
        }else{
    
            if(document.querySelector(`.activeCategoryTabButton`)){
                document.querySelector(`.activeCategoryTabButton`).click()
                console.log("sort3")
                document.querySelectorAll(`.sortByPriceButton`)[0].innerText='Sort by price'
                document.querySelectorAll(`.sortByPriceButton`)[1].innerText='Sort by price'
    
            }else{
                console.log("sort4")
                allPets(false)
                document.querySelectorAll(`.sortByPriceButton`)[0].innerText='Sort by price'
                document.querySelectorAll(`.sortByPriceButton`)[1].innerText='Sort by price'
            }
                
            }
        
    })
})


