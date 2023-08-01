const search = window.location.search
const url = new URLSearchParams(search)
const urlID = url.get('id')

const getData = async (id) => {
    try {
      const response = await fetch(`https://kodemia-form-26js-rc-default-rtdb.firebaseio.com/${id}.json`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);        
        dataEditForm(data)
      } else {
        alert("Hubo un error");
      }
    } catch (error) {
      console.log(error, "Hubo un error");
    }
  };
  
  getData(urlID);

  const dataEditForm = (info) => {
    const nombre = document.querySelector("#inputName");
    nombre.value = info.nombre
    const apellido = document.querySelector("#inputLastName");
    apellido.value = info.apellido
    const genero = document.querySelector('input[name="gender"]:checked')
    const fecha = document.querySelector("#inputFecha");
    fecha.value = info.fecha
    const country = document.querySelector("#inputCountry");
    country.value=info.country
    const avatar = document.querySelector("#inputAvatar");
    //Container
    const container = document.querySelector(".container");
    //CARD
    const thenewCard = document.createElement("div");
    thenewCard.setAttribute("class", "card-container");
    container.appendChild(thenewCard);
    //Imagen
    const avatarimage = document.createElement("img");
    avatarimage.setAttribute("src", info.avatar);
    avatarimage.style.width = "100%";
    thenewCard.appendChild(avatarimage);

  }


  const form = document.querySelector("#user-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    // obtener los valores de los inputs
    const nombre = document.querySelector("#inputName");
    const apellido = document.querySelector("#inputLastName")
    const genero = document.querySelector('input[name="gender"]:checked')
    const fecha = document.querySelector("#inputFecha");
    const country = document.querySelector("#inputCountry");
  
    const userInfo = {
      nombre: nombre.value,
      apellido: apellido.value,
      genero: genero.value,
      fecha: fecha.value,
      country: country.value,
    };
    updateDataById(urlID, userInfo);
  });

  const updateDataById = async(id, updatedData) => {
    const response = await fetch(`https://kodemia-form-26js-rc-default-rtdb.firebaseio.com/${id}.json`,{
        method: 'PATCH',
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(updatedData)
    });
    ButtonRedirection()
};

const ButtonRedirection = () => {
    window.location.href = `http://127.0.0.1:3000/clase-APIs/tareasAPI/tarea2/index.html`
  }