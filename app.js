const addAlarm = document.querySelector('.add-alarm')
const cancel = document.querySelector('.cancel')
const alarmContainer = document.querySelector('.alarm-container')
const form = document.querySelector('form')
const inputName = document.querySelector('input[type="text"]')
const inputHour = document.querySelector('#hour')
const inputMin = document.querySelector('#mins')
const allAlarm = document.querySelector('.all-alarms')
const state = document.querySelector('.state')
const radio = document.querySelectorAll('.radio')
const time = document.querySelector('.time')
const alarmSet = document.querySelector('.alarm-set')

// declaring variables
let eachAlarmData = {
    Aname: '',
    Ahour: '',
    Amin: '',
    id: '',
    session: ''
}
const ovrAlarmData = []

let alarmTime
track = new Audio()
track.src = 'sound.mp3'

// adding event handlers

addAlarm.addEventListener('click', (e) => {
    e.preventDefault()
    if (!form.classList.contains('display-block')) {
        form.classList.add('display-block')
        alarmContainer.style.display = 'none'
        alarmSet.style.display = 'none'
    }
})

cancel.addEventListener('click', (e) => {
    e.preventDefault()
    if (form.classList.contains('display-block')) {
        form.classList.remove('display-block')
        alarmContainer.style.display = 'block'
        alarmSet.style.display = 'block'
    }
})

inputName.addEventListener('change', (e) => {
    eachAlarmData.Aname = e.target.value
})

inputHour.addEventListener('change', (e) => {
    eachAlarmData.Ahour = e.target.value
    if (e.target.value > 12 || e.target.value <= 0) {
        alert('Hour must be between 1 and 12')
    }
    else if (e.target.value < 10) {
        eachAlarmData.Ahour = `0${e.target.value}`
    }
})

inputMin.addEventListener('change', (e) => {
    if (e.target.value > 60 || e.target.value < 0) {
        alert(' Minute must be between 0 and 59')
    } else if (e.target.value < 10) {
        eachAlarmData.Amin = `0${e.target.value}`
    } else {
        eachAlarmData.Amin = e.target.value
    }
})

// getting the time
setInterval(() => {
    let h = new Date().getHours()
    let m = new Date().getMinutes()
    let s = new Date().getSeconds()
    let session = 'AM'

    if (h >= 12) {
        h = h - 12
        session = 'PM'
    }

    h == 0 ? h = 12 : h

    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s

    currentTime = `${h}:${m}:${s} ${session}`
    time.innerHTML = currentTime
    s = '00'
    seconds = Number(s)
    if (alarmTime == currentTime) {
        track.play()
        track.loop = true
        const dismissBtn = document.querySelectorAll('.dismiss-btn');
        dismissBtn.forEach(btn => {
            btn.innerHTML = 'Dismiss Alarm';
            btn.style.cursor = 'pointer';
        });
    }

}, 1000)


const getTime = function () {
    ovrAlarmData.forEach(element => {
        myAlarm = `${element.Ahour}:${element.Amin}:${seconds} ${element.session}`
        alarmTime = myAlarm
    });
}

// declaring function
const pushAlarm = () => {
    let alarmContent = ''
    let ButtonStatus = 'In Progress'
    const overAllAlarm = JSON.parse(window.localStorage.getItem('ovralarm'))
    alarmSet.innerHTML = `${overAllAlarm.length} alarm set`
    overAllAlarm?.forEach(function (value) {
        alarmContent += `
                <div class="each-alarm">
                <div class="text">
                    <div>${value.Aname ? value.Aname : 'alarm'}</div>
                    <div>${value.Ahour} : ${value.Amin} ${value.session} </div>
                </div>
                <div class="check">
                <button class="dismiss-btn">${ButtonStatus}</button>
                </div>
            </div>
            `
    })
    allAlarm.innerHTML = alarmContent
    const dismissBtn = document.querySelectorAll('.dismiss-btn');
    dismissBtn.forEach(btn => {
        btn.classList.add('display-block');
        if (btn.innerHtml == 'Dismiss Alarm') {
            btn.addEventListener('click', () => {
                track.pause()
                btn.innerHTML = 'Completed'
                btn.style.cursor = 'not-allowed';
            })
        }
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    radio.forEach((radio) => {
        if (radio.checked) {
            eachAlarmData.session = radio.id
        }
    })
    if (eachAlarmData.session == '') {
        alert('select a session whether am or pm')
    }
    else if ((inputHour.value.trim() === '' || inputMin.value.trim() === '')) {
        alert('minute or/and hour field is empty')
    }
    else if (eachAlarmData.Ahour > 12 || eachAlarmData.Ahour <= 0) {
        alert('hour must be between 0 and 59')
    } else if (eachAlarmData.Amin > 59 || eachAlarmData.Amin < 0) {
        alert('minute must be between 0 and 59')
    }
    else {
        eachAlarmData.id = new Date().getTime()
        ovrAlarmData.push(eachAlarmData)
        window.localStorage.setItem('ovralarm', JSON.stringify(ovrAlarmData))
        pushAlarm()
        alert(`alarm set for ${eachAlarmData.Ahour}:${eachAlarmData.Amin}${eachAlarmData.session} successfully`)
        form.classList.remove('display-block')
        alarmContainer.style.display = 'block'
        alarmSet.style.display = 'block'
        getTime()

        eachAlarmData = {
            Aname: '',
            Ahour: '',
            Amin: '',
            id: '',
            session: ''
        }
        inputHour.value = ''
        inputMin.value = ''
        inputName.value = ''
    }
})


window.addEventListener('load', pushAlarm)










