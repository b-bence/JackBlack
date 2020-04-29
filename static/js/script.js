let disks = [];
let dropZones = document.querySelectorAll('.tower');
selectFirstDisk();
addListener();


function selectFirstDisk() {
    disks = [];
    for (let i = 0; i < dropZones.length; i++) {
        let zone = dropZones[i];
        if (zone.firstElementChild !== null) {
            disks.push(zone.firstElementChild);
        }
    }
}


function removeListener() {
    disks.forEach(disk => {
        disk.removeEventListener('dragstart', dragStart)
    });
}


function addListener() {
    disks.forEach(disk => {
        disk.addEventListener('dragstart', dragStart);
    });
}


function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
    lastDisk = event.dataTransfer.getData("text");
}


dropZones.forEach(dropZone => {

    dropZone.addEventListener('dragover', event => {
        event.preventDefault();
    });

    dropZone.addEventListener('drop', event => {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        let list = event.target;
        let sameDisk;
        // console.log(dropZones[0].children[0])

        sameDisk = list.children[0] === document.getElementById(data) ;

        if (event.target.getAttribute('class') === 'tower' && !sameDisk) {
            try {
                if (event.target.childNodes.length === 1){
                    list.insertBefore(document.getElementById(data), list.childNodes[0]);
                    let counter = document.getElementById('counter');
                    counter.innerHTML = parseInt(counter.innerHTML) + 1;
                }
                else {
                    let towerIndex = parseInt(event.target.getAttribute('data'));

                    let towerDisk = parseInt(disks[towerIndex].getAttribute('index'));
                    let currentDisk = data.split('')[data.length - 1];

                    if (currentDisk < towerDisk){
                        list.insertBefore(document.getElementById(data), list.childNodes[0]);
                        let counter = document.getElementById('counter');
                        counter.innerHTML = parseInt(counter.innerHTML) + 1;
                    }
                }
            } catch (e) {
                console.log('Something went wrong!')
            }

        }
        if (dropZones[2].children.length === 1){
            if (checkWin()){
                // console.log('gg')
            }
            else{
                // console.log('not gg')
            }
        }
        console.log('Initial disks: ' + disks)
        removeListener();
        selectFirstDisk();
        console.log("After drop: " + disks)
        addListener();

    });
});

function checkWin(){
    let counter = 0;
    for (let i = 0; i < dropZones[2].children.length-1; i++){
        if (dropZones[2].children[i].getAttribute('index') <
            dropZones[2].children[i+1].getAttribute('index')){
            counter ++
        }
    }
    console.log(counter)
    if (counter ===  dropZones[2].children.length){
        return true
    }
}