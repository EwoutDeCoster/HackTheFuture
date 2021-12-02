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

let susfactor = 0;

const myHeaders = new Headers();
myHeaders.append("userId", "detwurrels402");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function getMotive(id) {
  fetch("https://htf-2021.zinderlabs.com/motive", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      while (i < result.length) {
        if (result[i].suspectId == id) {
          document.getElementById("motive").innerHTML = result[i].text;
          document.getElementById("susfactor").innerHTML =
            parseInt(document.getElementById("susfactor").innerHTML) + 5;
        }

        i += 1;
      }
      if (document.getElementById("susfactor").innerHTML == 0) {
        document.getElementById("susfactor").innerHTML = `${-3}`;
      }
    });
}

function getCar(naam) {
  fetch("https://htf-2021.zinderlabs.com/car", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      while (i < result.length) {
        if (result[i].owner == naam) {
          document.getElementById(
            "licence"
          ).innerHTML = `${result[i].licenseplate}`;
          document.getElementById(
            "manu"
          ).innerHTML = `${result[i].manufacturer}`;
          document.getElementById("type").innerHTML = `${result[i].type}`;
          document.getElementById("colorr").innerHTML = `${result[i].color}`;
          getSighting(result[i].licenseplate);
        }

        i += 1;
      }
    });
}

function fetchProfiles() {
  fetch("https://htf-2021.zinderlabs.com/suspect", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      while (i < result.length) {
        if (result[i].id == getUrlVars().suspect) {
          document
            .getElementById("avatarr")
            .insertAdjacentHTML(
              "afterbegin",
              `<div class="avatar" style="background-image:url(&quot;${result[i].imgSrc}&quot;);"></div>`
            );
          document.getElementById("susname").innerHTML = result[i].name;
          getCar(result[i].name);
        }

        i += 1;
      }
    });
}

function getSighting(nummerplaat) {
  fetch(
    `https://htf-2021.zinderlabs.com/sighting/car/${nummerplaat}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      while (i < result.length) {
        document.getElementById("locationrow").insertAdjacentHTML(
          "afterbegin",
          `<div class="col-md-6">
            <div class="contact-info portfolio-info-card">
                <h2>${result[i].location} <p style="font-size: 17px;">${result[i].startTime} - ${result[i].endTime}</p></h2>
                <div class="row">
                    <div class="col-1"><i class="icon ion-android-calendar icon"></i></div>
                    <div class="col-9"><span id="locdata"></span></div>
                </div>
            </div>
        </div>`
        );
        let timee = result[i].endTime;
        let timestr = timee.substring(0, 5).replace(":", "");
        if (timestr > 1800 || timestr < 100) {
          document.getElementById("susfactor").innerHTML =
            parseInt(document.getElementById("susfactor").innerHTML) - 50;
        }
        fetch(
          `https://htf-2021.zinderlabs.com/location/${result[i].location}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            document.getElementById("locdata").innerHTML = result.description;
          });

        i += 1;
      }
    });
}
function getSubjectSighting(id) {
  fetch(
    `https://htf-2021.zinderlabs.com/sighting/suspect/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      console.log(result);
      while (i < result.length) {
        if (result[i].location == "traphal") {
          document.getElementById("locationsubjectrow").insertAdjacentHTML(
            "afterbegin",
            `<div class="col-md-6">
            <div class="contact-info portfolio-info-card">
                <h2>${result[i].location} <p style="font-size: 17px;">${result[i].startTime} - ${result[i].endTime}</p></h2>
            </div>
        </div>`
          );
        }

        i += 1;
      }
    });
}

function testAlibi(id) {
  fetch(`https://htf-2021.zinderlabs.com/alibi/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      let verified = "Not verified";
      let color = "red";
      while (i < result.length) {
        if (result[i].verified) {
          verified = "Verified";
          color = "green";
        }
        document.getElementById("alibis").insertAdjacentHTML(
          "afterbegin",
          `<div class="col-md-6">
        <div class="contact-info portfolio-info-card">
            <h2>Alibi ${
              i + 1
            } <p style="font-size: 20px; color: ${color};">${verified}</p></h2>
            <div class="row">
                <div class="col-1"><i class="icon ion-android-calendar icon"></i></div>
                <div class="col-9"><span>${result[i].description}</span></div>
            </div>
        </div>
    </div>`
        );
        i += 1;
      }
    });
}

function checkFingerPrints() {
  fetch(
    "https://htf-2021.zinderlabs.com/fingerprint/Insulinespuit",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      let i = 0;
      while (i < result.fingerprints.length) {
        if (result.fingerprints[i] == getUrlVars().suspect) {
          document.getElementById("susfactor").innerHTML =
            parseInt(document.getElementById("susfactor").innerHTML) + 20;
        }

        i += 1;
      }
    });
}

const init = function () {
  fetchProfiles();
  getMotive(getUrlVars().suspect);
  testAlibi(getUrlVars().suspect);
  getSubjectSighting(getUrlVars().suspect);
  checkFingerPrints();
};

window.onload = init;
