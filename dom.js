const form = document.querySelector("#user-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // obtener los valores de los inputs
  const nombre = document.querySelector("#inputName");
  const apellido = document.querySelector("#inputLastName")
  const fecha = document.querySelector("#inputFecha");
  const country = document.querySelector("#inputCountry");
  const avatar = document.querySelector("#inputAvatar");

  const userInfo = {
    nombre: nombre.value,
    apellido: apellido.value,
    fecha: fecha.value,
    country: country.value,
    avatar: avatar.value,
  };
  createData(userInfo);
});

const getData = async () => {
  try {
    const response = await fetch(
      "https://kodemia-form-26js-rc-default-rtdb.firebaseio.com/.json",
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
          fecha: item[1].fecha,
          country: item[1].country,
          avatar: item[1].avatar,
        };
        
        createContainer(personaObject)
      });
      
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
 container.appendChild(thenewCard);
 //Imagen
 const avatarimage = document.createElement("img");
 avatarimage.setAttribute("src", funcion.avatar);
 avatarimage.style.width = "80px";
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
 thenewCard.appendChild(deleteButton);   
 deleteButton.addEventListener("click", (e) => {
  const buttonID = e.target.id
  console.log(buttonID);
  deleteData(buttonID)
})
  //EDIT BUTTON
  const editButton = document.createElement('button')
  editButton.setAttribute("class", "btn-close");
  editButton.setAttribute("id", funcion.id);
  editButton.setAttribute("type", "button");
  editButton.style.width = "10px";
  editButton.style.height = "18px";
  editButton.style.backgroundColor = "green";
  thenewCard.appendChild(editButton)
  editButton.addEventListener("click", (e) => {
    const editButtonID = e.target.id
    console.log(editButtonID);
    ButtonRedirection(editButtonID)
  })
}

const createData = async (userdata) => {
  const response = await fetch(
    "https://kodemia-form-26js-rc-default-rtdb.firebaseio.com/.json",
    {
      method: "POST",
      body: JSON.stringify(userdata),
    }
  );
  if (response.status === 200) {
    location.reload()
  } else {
    console.log("Hubo un error al postear");
  }
};


const deleteData = async (id) => {
  const response = await fetch(
    `https://kodemia-form-26js-rc-default-rtdb.firebaseio.com/${id}.json`,
    {
      method: "DELETE",
    }
  ); 
  if (response.status === 200) {
    location.reload()
  } else
  console.log('Hubo un error al borrar');
};


const ButtonRedirection = (id) => {
  window.location.href = `http://127.0.0.1:3000/clase-APIs/tareasAPI/tarea2/editForm.html?id=${id}`
}