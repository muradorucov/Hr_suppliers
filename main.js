// fetch(apiUrl, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         username: "filan",
//         password: "123456"
//     })
// })


let apiUrl = "https://northwind.vercel.app/api/suppliers";
const companiesElem = document.querySelector("#companies");
const searchINput = document.getElementById("search");
const showBtn = document.getElementById("showbtn");
const closeBtn = document.getElementById("close");
const createModalElem = document.getElementById("createmodal");
const createForm = document.getElementById("createForm");
searchINput.focus();
let globalData = [];
getAllCompany()

searchINput.addEventListener("input", () => {
    const searchValue = searchINput.value
        .trim()
        .replaceAll(" ", "")
        .toLowerCase();

    console.log(searchValue);

    const filteredList = globalData.filter(item => item.companyName
        .toLowerCase()
        .replaceAll(" ", "")
        .includes(searchValue)
    )
    domRender(filteredList)
})

showBtn.addEventListener("click", () => {
    createModalElem.classList.remove("hidden")
})

closeBtn.addEventListener("click", () => {
    createModalElem.classList.add("hidden")
})

createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            companyName: companyName.value,
            contactName: contactName.value,
            contactTitle: contactTitle.value,
            address: {
                street: street.value,
                city: city.value,
                region: region.value,
                postalCode: postalCode.value,
                country: country.value,
                phone: phone.value
            }
        })
    })
        .then((res) => {
            res.ok ? getAllCompany() : null;
        })
        .finally(() => {
            createModalElem.classList.add("hidden");
        })
})


function domRender(list) {
    companiesElem.innerHTML = ""
    list.forEach(item => {
        companiesElem.innerHTML += `
        <div class="p-[30px] shadow-lg rounded-[10px] border-[1px] border-[violet]">
            <h2 class="text-[25px] font-[700] break-words">${item.companyName}</h2>
            <p>Contact name : ${item.contactName}</p>
            <p>Contact Title : ${item.contactTitle}</p>
            <p>City : ${item.address?.city}</p>
            <p>Country : ${item.address?.country}</p>
        </div>`
    })
}
function getAllCompany() {
    fetch(apiUrl)
        .then((res) => res.json())
        .then(data => {
            globalData = data
            domRender(data)
        })

}