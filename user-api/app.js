const axios = require('axios')


// primeiro faço o request para a API usando o axios e guardo a informação que me trás 
const url = 'https://random-data-api.com/api/users/random_user'

axios.get(url, { responseType: 'json' })
    .then((res) => {
        let userData;
        userData = res.data

        // depois vou fazer o console.log
        // console.log(`Meu nome é ${userData.first_name} ${userData.last_name} moro na cidade ${userData.address.city} meu gênero é ${userData.gender}. 
        //             Nasci na data ${userData.date_of_birth} e meu número de seguro social é ${userData.social_insurance_number}`)
        let user = {
            nome: userData.first_name,
            sobrenome: userData.last_name,
            cidade: userData.address.city
        }

        // console.log(user)
    })
    .catch((error) => console.log(error))

const getData = async () => { 
    try { 
        const res = await axios.get(url, { responseType: 'json' })

        let userData = res.data

        let user = {
            nome: userData.first_name,
            sobrenome: userData.last_name,
            cidade: userData.address.city
        }

        console.log(user)
    } catch (erro) {
        console.log(erro)
    }
    
}

getData()