/*<div class="card border-0"><a href="#"><img class="card-img-top scale-on-hover" src="assets/img/nature/image1.jpg" alt="Card Image" /></a>
        <div class="card-body">
            <h6><a href="#">Lorem Ipsum</a></h6>
            <p class="text-muted card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna.</p>
        </div>
    </div>
</div>*/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }

const myHeaders = new Headers();
myHeaders.append("userId", "detwurrels402");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getMotive(id) {
    fetch("https://htf-2021.zinderlabs.com/motive", requestOptions)
  .then(response => response.json())
  .then(result => {
    let i = 0;
    console.log(result.length)
    while (i < result.length) {
        if (result[i].suspectId == id) {
            console.log(result[i].text)
            document.getElementById("motive").innerHTML = result[i].text;
        }
        

        i += 1;
    }
  }
      
    
    )
}

function getCar(id) {
    fetch("https://htf-2021.zinderlabs.com/motive", requestOptions)
  .then(response => response.json())
  .then(result => {
    let i = 0;
    console.log(result.length)
    while (i < result.length) {
        if (result[i].suspectId == id) {
            document.getElementById("motive").innerHTML = `${result[i].text}`;
        }
        else {
            document.getElementById("motive").innerHTML = "Geen motief";
        }
        

        i += 1;
    }
  }
      
    
    )
}

function fetchProfiles() {
    fetch("https://htf-2021.zinderlabs.com/suspect", requestOptions)
  .then(response => response.json())
  .then(result => {
    let i = 0;
    console.log(result.length)
    while (i < result.length) {
        if (result[i].id == getUrlVars().suspect) {
            document.getElementById("avatarr").insertAdjacentHTML("afterbegin", 
        `<div class="avatar" style="background-image:url(&quot;${result[i].imgSrc}&quot;);"></div>`
        );
        }
        
        

        i += 1;
    }
  }
      
    
    )
}



const init = function() {
    fetchProfiles();
    getMotive(getUrlVars().suspect)
}

window.onload = init;