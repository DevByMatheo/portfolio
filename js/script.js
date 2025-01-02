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
