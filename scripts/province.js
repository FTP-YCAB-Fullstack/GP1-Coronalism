const formatNumber = (number) => Intl.NumberFormat('id-ID').format(number)
const listContainer = document.getElementById('listData')

const setContent = ({data}) => {
    let countData = 0
    data.forEach(item => {
        const div = document.createElement('div')
        div.setAttribute('class' , 'w-full md:w-1/3')
        div.innerHTML = `
            <div class="rounded-md w-5/6 h-full flex flex-col justify-center mx-auto hover:shadow-sm transition duration-300 shadow-md my-2 md:my-4 p-4 text-center">
                <h3 class="text-lg md:text-2xl font-semibold mb-3">${item.provinsi}</h3>
                <div class="flex flex-row gap-2">
                    <div class="text-red-400 w-1/3">
                        <h6>Positif</h6>
                        <h4 class="font-semibold text-lg md:text-2xl" >${formatNumber(item.kasusPosi)}</h4>
                    </div>
                    <div class="text-green-400 w-1/3">
                        <h6>Sembuh</h6>
                        <h4 class="font-semibold text-lg md:text-2xl" >${formatNumber(item.kasusSemb)}</h4>
                    </div>
                    <div class="text-yellow-400 w-1/3">
                        <h6>Meninggal</h6>
                        <h4 class="font-semibold text-lg md:text-2xl" >${formatNumber(item.kasusMeni)}</h4>
                    </div>
                </div>
            </div>
        `
        countData++
        if(item.provinsi !== 'Indonesia' && countData <= 6) {
            listContainer.append(div)
        }
    })
}

let dataApi = null;

try {
    fetch('https://indonesia-covid-19.mathdro.id/api/provinsi/')
        .then(res => res.json())
        .then(json => {
            setContent(json)
            dataApi = json.data
        })
} catch(error) {
    console.log(error)
}

const detailElement = document.getElementById('detail-data')

// filter data
const filterData = (value) => {
    let notfound = true
    dataApi.forEach(item => {
        if(item.provinsi.toLowerCase().includes(value.toLowerCase())) {
            notfound = false
            
            let provinsi = detailElement.querySelector('.provinsi')
            let positif = detailElement.querySelector('.positif')
            let sembuh = detailElement.querySelector('.sembuh')
            let meninggal = detailElement.querySelector('.meninggal')

            listContainer.style.display = "none"
            detailElement.parentElement.style.display ="flex"
            
            provinsi.textContent = item.provinsi
            positif.textContent = formatNumber(item.kasusPosi)
            sembuh.textContent = formatNumber(item.kasusSemb)
            meninggal.textContent = formatNumber(item.kasusMeni)
        }
    })
    if(notfound) {
        listContainer.style.display = "none"
        const element = document.getElementById('notfound')
        element.style.display = 'block'
    }
}


// get inputan

let getInput = document.getElementById("inputan")
let title = document.getElementById('titleData')
getInput.addEventListener('keyup' , (e) => {
    if(e.target.value !== '') {
        title.style.visibility = 'hidden'
    } else {
        title.style.visibility = 'visible'
    }
    
    let notfound = true
    let result = ``
    let countData = 0
    dataApi.forEach(item => {
        let check = item.provinsi.toLowerCase().includes(e.target.value.toLowerCase())
        if(check) {
            notfound = false
            console.log(item.provinsi)
            let element = `
            <div class="w-full md:w-1/3">
                <div class="rounded-md w-5/6 h-full flex flex-col justify-center mx-auto hover:shadow-sm transition duration-300 shadow-md my-2 md:my-4 p-4 text-center">
                    <h3 class="text-lg md:text-2xl font-semibold mb-3">${item.provinsi}</h3>
                    <div class="flex flex-row gap-2">
                        <div class="text-red-400 w-1/3">
                            <h6>Positif</h6>
                            <h4 class="font-semibold text-lg md:text-2xl" >${formatNumber(item.kasusPosi)}</h4>
                        </div>
                        <div class="text-green-400 w-1/3">
                            <h6>Sembuh</h6>
                            <h4 class="font-semibold text-lg md:text-2xl" >${formatNumber(item.kasusSemb)}</h4>
                        </div>
                        <div class="text-yellow-400 w-1/3">
                            <h6>Meninggal</h6>
                            <h4 class="font-semibold text-lg md:text-2xl" >${formatNumber(item.kasusMeni)}</h4>
                        </div>
                    </div>
                </div>
            </div>
            `
            countData++
            if(item.provinsi !== 'Indonesia' && countData <= 6) {
                result += element
            }
        }
    })

    const notfoundElement = document.getElementById('notfound')
    if(notfound) {
        listContainer.style.display = "none"
        notfoundElement.style.display = 'block'
    } else {
        listContainer.style.display = 'flex'
        notfoundElement.style.display = 'none'
        listContainer.innerHTML = result
    }
})

