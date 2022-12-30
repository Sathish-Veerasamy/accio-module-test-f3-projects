let ans = [];
getFromAPi = async () => {
  const res = await fetch("https://api.ipify.org/?format=json");
  const data = await res.json();
  document.getElementById("id").textContent = data.ip;
  console.log(`https://ipinfo.io/${data.ip}/geo?token=22d87bc4c31cb6`);

  const req = await fetch(
    `https://ipinfo.io/${data.ip}/geo?token=22d87bc4c31cb6`
  );
  const locn = await req.json();
  console.log(locn);
  const t = locn.loc,
    lat = t.substring(0, t.indexOf(",")),
    long = t.substring(t.indexOf(",") + 1),
    city = locn.city,
    region = locn.region,
    org = locn.org,
    hostName = locn.hostname,
    timeZonee = locn.timezone,
    datetime_str = new Date().toLocaleString("en-US", { timeZone: timeZonee }),
    pinCode = locn.postal;
  document.getElementById("lat").textContent = "Lat: " + lat;
  document.getElementById("long").textContent = "Long: " + long;
  document.getElementById("city").textContent = "City: " + city;
  document.getElementById("region").textContent = "Region: " + region;
  document.getElementById("org").textContent = "Organization: " + org;
  document.getElementById("host").textContent = "Hostname: " + long;
  document.getElementById("timeZone").textContent = "Timezone: " + timeZonee;
  document.getElementById("dateTime").textContent = "Datetime: " + datetime_str;
  document.getElementById("pinCode").textContent = "Pincode: " + pinCode;
  document.getElementById("message").textContent =
    "Message: Number of pincode(s) found: " + pinCode.split(",").length;

  const image = document.getElementById("map");
  image.src = `https://maps.google.com/maps?q=${lat}, ${long}&output=embed`;

  const postData = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
  const postInfo = await postData.json();
  const postDetails = postInfo[0].PostOffice;
  console.log(postDetails);

  function createCard(data) {
    var cardContainer = document.getElementById("cardContainer");
    const name = document.createElement("p");
    (branchType = document.createElement("p")),
      (deliveryStatus = document.createElement("p")),
      (district = document.createElement("p")),
      (division = document.createElement("p")),
      (card = document.createElement("div"));

    card.classList.add("card-box");
    name.textContent = "Name: " + data[0];
    branchType.textContent = "BranchType: " + data[1];
    deliveryStatus.textContent = "DeliveryStatus: " + data[2];
    district.textContent = "District: " + data[3];
    division.textContent = "Divison: " + data[4];

    card.appendChild(name);
    card.appendChild(branchType);
    card.appendChild(deliveryStatus);
    card.appendChild(district);
    card.appendChild(division);

    cardContainer.appendChild(card);
  }

  for (var i = 0; i < postDetails.length; i++) {
    let ans = [];
    ans.push(postDetails[i].Name);
    ans.push(postDetails[i].BranchType);
    ans.push(postDetails[i].DeliveryStatus);
    ans.push(postDetails[i].District);
    ans.push(postDetails[i].Division);
    console.log(ans);
    createCard(ans);
  }
};
