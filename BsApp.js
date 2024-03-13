let toggleButton = document.querySelector('.navbar-toggler-icon')


toggleButton.addEventListener('click', hideBorder );
window.addEventListener('DOMContentLoaded', displayBorder);
window.addEventListener('resize', displayBorder );


//borders on small screen
function hideBorder ()  {
const liElements = document.querySelectorAll('.navbar-nav .nav-item');
        liElements.forEach(item => { item.classList.remove('border', 'border-md-1', 'border-light', 'rounded-2')
     })
    }


function displayBorder () {
const liElements = document.querySelectorAll('.navbar-nav .nav-item');
            liElements.forEach(item => {item.classList.add('border', 'border-md-1', 'border-light', 'rounded-2')
         })
    }