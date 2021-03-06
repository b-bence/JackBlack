const totalNumberOfDisks = document.querySelectorAll('.disk');
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
        disk.addEventListener('dragend', dragEnd);
    });
}


function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
    lastDisk = event.dataTransfer.getData("text");
}


function dragEnd(event) {
    checkWin();
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

        sameDisk = list.children[0] === document.getElementById(data);

        if (event.target.getAttribute('class') === 'tower' && !sameDisk) {
            try {
                if (event.target.childNodes.length === 1) {
                    list.insertBefore(document.getElementById(data), list.childNodes[0]);
                    let counter = document.getElementById('counter');
                    counter.innerHTML = parseInt(counter.innerHTML) + 1;
                }
                else {
                    let currentDisk = parseInt(data.split('')[data.length - 1]);
                    let firstTowerDiskSize;

                    labelLoop:
                        for (let node of event.target.childNodes) {
                            try {
                                if (node.hasAttribute('draggable')) {
                                    firstTowerDiskSize = parseInt(node.getAttribute('index'));
                                    console.log(firstTowerDiskSize);
                                    if (firstTowerDiskSize > currentDisk && firstTowerDiskSize) {
                                        list.insertBefore(document.getElementById(data), list.childNodes[0]);
                                        counter();
                                    }
                                    break labelLoop;
                                }
                            } catch (e) {
                                if (firstTowerDiskSize === undefined) {
                                    list.insertBefore(document.getElementById(data), list.childNodes[0]);
                                    counter();
                                    break labelLoop;
                                }
                            }
                        }
                }
            } catch (e) {
                console.log('Something went wrong!');
            }

            removeListener();
            selectFirstDisk();
            addListener();
        }
    });
});


function counter() {
    let counter = document.getElementById('counter');
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
}


function checkWin() {
    if (dropZones[2].children.length === totalNumberOfDisks.length) {
        alert('Congrats! You won the game');
        window.location.pathname = '/';
    }
}