function toggleFormations(formationNumber, buttonElement) {
    const contentToShow = document.getElementById('formation' + formationNumber);
    const buttonToAdjust = buttonElement; 
    
    if (contentToShow.style.display === 'block') {
        contentToShow.style.display = 'none'; 
        buttonToAdjust.style.marginBottom = '10px';
    } else {
        const allContents = document.querySelectorAll('.formation-content');
        allContents.forEach(content => {
            content.style.display = 'none';
        });

        const allButtons = document.querySelectorAll('.bouton');
        allButtons.forEach(button => {
            button.style.marginBottom = '10px'; 
        });
        contentToShow.style.display = 'block';
        buttonToAdjust.style.marginBottom = '0'; 
    }
}

// ANIMATE 

const canvas = document.querySelector('.background-canvas');

const ctx = canvas.getContext('2d');
canvas.width =  window.innerWidth
canvas.height =  window.innerHeight

let particulesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80)*(canvas.width/80)
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});


class Particule {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(139, 135, 144, 0.74)';
        ctx.fill();
    }

    update() {
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }
        
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.x += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw()
    }
}

function init(){
    particulesArray = [];
    let numberOfParticules = (canvas.height * canvas.width) / 9000;
    for(let i = 0; i < numberOfParticules; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'rgba(139, 135, 144, 0.74)';

        particulesArray.push(new Particule(x, y, directionX, directionY, size, color));
    }
}

function connect(){
    let opacityValue = 1;
    for(let a = 0; a < particulesArray.length; a++){
        for(let b = a; b < particulesArray.length; b++){
            let distance = ((particulesArray[a].x - particulesArray[b].x) * (particulesArray[a].x - particulesArray[b].x)) + ((particulesArray[a].y - particulesArray[b].y) * (particulesArray[a].y - particulesArray[b].y));
            if(distance < (canvas.width/7) * (canvas.height/7)){
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(175,175,175,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulesArray[a].x, particulesArray[a].y);
                ctx.lineTo(particulesArray[b].x, particulesArray[b].y)
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);
    for(let i = 0; i < particulesArray.length; i++){
        particulesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.height/80));
    init();
})

window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.x = undefined;
})

init();
animate();
