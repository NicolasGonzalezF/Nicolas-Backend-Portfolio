import {faker} from "@faker-js/faker"
faker.location="en"

const generateProduct=()=>{
    return{
        title:faker.commerce.productName(),
        description:faker.lorem.sentence(),
        code:faker.lorem.word(),
        price:faker.commerce.price(),
        stock:faker.string.numeric(2,{bannedDigits:["0"]}),
        category:"655b92be363b19dfbd005b5b",
        thumbnail:faker.image.urlPicsumPhotos(),
    }
}

export {generateProduct}