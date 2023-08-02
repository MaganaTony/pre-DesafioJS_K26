let resultPersons = [];
const form = document.querySelector("#user-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // obtener los valores de los inputs
  const nombre = document.querySelector("#inputName");
  const apellido = document.querySelector("#inputLastName");
  const genero = document.querySelector('input[name="gender"]:checked');
  const fecha = document.querySelector("#inputFecha");
  const country = document.querySelector("#inputCountry");
  const avatar = document.querySelector("#inputAvatar");

  const userInfo = {
    nombre: nombre.value,
    apellido: apellido.value,
    genero: genero.value,
    fecha: fecha.value,
    country: country.value,
    avatar: avatar.value,
  };
  createData(userInfo);
});

const getData = async () => {
  try {
    const response = await fetch(
      "https://kodemia26-default-rtdb.firebaseio.com/.json",
      {
        method: "GET",
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      const array = Object.entries(data);
      console.log(array);
      const maparray = array.map((item) => {
        const personaObject = {
          id: item[0],
          name: item[1].nombre,
          LastName: item[1].apellido,
          gender: item[1].genero,
          fecha: item[1].fecha,
          country: item[1].country,
          avatar: item[1].avatar,
        };
        createContainer(personaObject);
        return personaObject;
      });
      resultPersons = maparray;
    } else {
      alert("Hubo un error");
    }
  } catch (error) {
    console.log(error, "Hubo un error");
  }
};

getData();

const createContainer = (funcion) => {
  //Container
  const container = document.querySelector(".container");

  //CARD
  const thenewCard = document.createElement("div");
  thenewCard.setAttribute("class", "card-container");
  thenewCard.setAttribute("class", "d-flex justify-content-center flex-wrap");
  thenewCard.style.margin="10px"
  container.appendChild(thenewCard);
  //Imagen
  const avatarimage = document.createElement("img");
  avatarimage.setAttribute("src", funcion.avatar);
  avatarimage.style.width = "10em";
  avatarimage.style.height = "15em";
  thenewCard.appendChild(avatarimage);
  //ContainerText
  const containerText = document.createElement("div");
  containerText.setAttribute("class", "container-text");
  thenewCard.appendChild(containerText);
  //Info
  const name = document.createElement("h2");
  name.textContent = funcion.name;
  containerText.appendChild(name);

  const LastName = document.createElement("h2");
  LastName.textContent = funcion.LastName;
  containerText.appendChild(LastName);

  const gender = document.createElement("h2");
  gender.textContent = funcion.gender;
  containerText.appendChild(gender);

  const fechaData = document.createElement("h2");
  fechaData.textContent = funcion.fecha;
  containerText.appendChild(fechaData);

  const countryData = document.createElement("h2");
  countryData.textContent = funcion.country;
  containerText.appendChild(countryData);
  //DELETE BUTTON
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn-close");
  deleteButton.setAttribute("id", funcion.id);
  deleteButton.setAttribute("type", "button");
  deleteButton.style.width = "10px";
  deleteButton.style.height = "18px";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.margin='0.2em'
  thenewCard.appendChild(deleteButton);
  deleteButton.addEventListener("click", (e) => {
    const buttonID = e.target.id;
    console.log(buttonID);
    deleteData(buttonID);
  });
  //EDIT BUTTON
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "btn-close");
  editButton.setAttribute("id", funcion.id);
  editButton.setAttribute("type", "button");
  editButton.style.width = "10px";
  editButton.style.height = "18px";
  editButton.style.backgroundColor = "green";
  editButton.style.margin='0.2em'
  thenewCard.appendChild(editButton);
  editButton.addEventListener("click", (e) => {
    const editButtonID = e.target.id;
    console.log(editButtonID);
    ButtonRedirection(editButtonID);
  });
};

const createData = async (userdata) => {
  const response = await fetch(
    "https://kodemia26-default-rtdb.firebaseio.com/.json",
    {
      method: "POST",
      body: JSON.stringify(userdata),
    }
  );
  if (response.status === 200) {
    location.reload();
  } else {
    console.log("Hubo un error al postear");
  }
};

const deleteData = async (id) => {
  const response = await fetch(
    `https://kodemia26-default-rtdb.firebaseio.com/${id}.json`,
    {
      method: "DELETE",
    }
  );
  if (response.status === 200) {
    location.reload();
  } else console.log("Hubo un error al borrar");
};

const ButtonRedirection = (id) => {
  window.location.href = `http://127.0.0.1:3000/editForm.html?id=${id}`;
};

//Nueva funcion de SEARCG
const formSearch = document.querySelector("#seach-form");
formSearch.style.marginTop="50px"
formSearch.style.marginLeft="10px"
formSearch.addEventListener("submit", (event) => {
  event.preventDefault();

  // obtener los valores de los inputs
  const searchInput = document.querySelector("#searchInput");
  const searchValue = searchInput.value;
  filterResults(searchValue);
});

const filterResults = (filter) => {
  resultPersons.filter((item) => {
    if (item.name === filter) {
      console.log("Se encontro");
      //Container
      const container = document.querySelector(".container");
      container.innerHTML=""
      //CARD
      const thenewCard = document.createElement("div");
      thenewCard.setAttribute("class", "card-container");
      container.appendChild(thenewCard);
      //Imagen
      const avatarimage = document.createElement("img");
      avatarimage.setAttribute("src", item.avatar);
      avatarimage.style.width = "80px";
      thenewCard.appendChild(avatarimage);
      //ContainerText
      const containerText = document.createElement("div");
      containerText.setAttribute("class", "container-text");
      thenewCard.appendChild(containerText);
      //Info
      const name = document.createElement("h2");
      name.textContent = item.name;
      containerText.appendChild(name);

      const LastName = document.createElement("h2");
      LastName.textContent = item.LastName;
      containerText.appendChild(LastName);

      const gender = document.createElement("h2");
      gender.textContent = item.gender;
      containerText.appendChild(gender);

      const fechaData = document.createElement("h2");
      fechaData.textContent = item.fecha;
      containerText.appendChild(fechaData);

      const countryData = document.createElement("h2");
      countryData.textContent = item.country;
      containerText.appendChild(countryData);
      alert("Se encontro la coincidencia!");
    } else {
      alert("No se encontro ninguna coincidencia");
    }
  });
};
