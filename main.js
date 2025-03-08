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
const modalElem = document.getElementById("modal");
const submitForm = document.getElementById("submitForm");
searchINput.focus();
let globalData = [];
let selectedId;
getAllCompany()
let isUpdate = false;

searchINput.addEventListener("input", () => {
    const searchValue = searchINput.value
        .trim()
        .replaceAll(" ", "")
        .toLowerCase();

    const filteredList = globalData.filter(item => item.companyName
        .toLowerCase()
        .replaceAll(" ", "")
        .includes(searchValue)
    )
    domRender(filteredList)
})

showBtn.addEventListener("click", () => {
    modalElem.classList.remove("hidden")
})

closeBtn.addEventListener("click", () => {
    modalElem.classList.add("hidden");
    selectedId = null;
    isUpdate = false;
    submitForm.reset();
})

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isUpdate) {
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
                modalElem.classList.add("hidden");
                submitForm.reset()
            })
    } else {
        fetch(`${apiUrl}/${selectedId}`, {
            method: 'PUT',
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
                modalElem.classList.add("hidden");
                isUpdate = false;
                submitForm.reset();
            })
    }
})


function domRender(list) {
    companiesElem.innerHTML = ""
    list.forEach(item => {
        companiesElem.innerHTML += `
        <div class="p-[30px] shadow-lg rounded-[10px] border-[1px] border-[violet] relative">
            <h2 class="text-[25px] font-[700] break-words">${item.companyName}</h2>
            <p>Contact name : ${item.contactName}</p>
            <p>Contact Title : ${item.contactTitle}</p>
            <p>City : ${item.address?.city}</p>
            <p>Country : ${item.address?.country}</p>
            <div class="absolute bottom-[10px] right-[10px] text-[blue]">
                <button class="cursor-pointer" onclick="deleteCompany(${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <button class="cursor-pointer"  onclick="showModal(${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                </button>
            </div>
        </div>`
    })
}

function deleteCompany(id) {
    console.log(id);

    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
        .then((res) => {
            res.ok ? getAllCompany() : null;
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

function showModal(id) {
    const foundCompany = globalData.find(item => item.id === id)
    selectedId = id;
    modalElem.classList.remove("hidden");
    isUpdate = true;
    companyName.value = foundCompany.companyName;
    contactName.value = foundCompany.contactName;
    contactTitle.value = foundCompany.contactTitle;
    country.value = foundCompany.address.country;
    street.value = foundCompany.address.street;
    city.value = foundCompany.address.city;
    region.value = foundCompany.address.region;
    postalCode.value = foundCompany.address.postalCode;
    phone.value = foundCompany.address.phone;
}