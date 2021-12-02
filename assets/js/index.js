/*<div class="card border-0"><a href="#"><img class="card-img-top scale-on-hover" src="assets/img/nature/image1.jpg" alt="Card Image" /></a>
        <div class="card-body">
            <h6><a href="#">Lorem Ipsum</a></h6>
            <p class="text-muted card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna.</p>
        </div>
    </div>
</div>*/

const myHeaders = new Headers();
myHeaders.append("userId", "detwurrels402");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function fetchProfiles() {
  fetch("https://htf-2021.zinderlabs.com/suspect", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      console.log(result.length);
      while (i < result.length) {
        document.getElementById("box").insertAdjacentHTML(
          "beforeend",
          `<div class="col-md-6 col-lg-4"><div class="card border-0 suscol"><img style="margin-left: 25%;" class="card-img-top scale-on-hover susimg" src="${result[i].imgSrc}" alt="Card Image" />
        <div class="card-body">
            <h6><a href="suspect.html?suspect=${result[i].id}">${result[i].name}</a></h6>
        </div>
    </div>
</div>`
        );

        i += 1;
      }
    });
}

const init = function () {
  fetchProfiles();
};

window.onload = init;
