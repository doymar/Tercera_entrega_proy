import { fakerES_MX as faker } from "@faker-js/faker";

 const generateProduct = () => {
    const product = {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      description: faker.commerce.productMaterial(),
      price: faker.commerce.price(),
      code:faker.commerce.isbn(),
      stock: faker.number.int(100),
      category: faker.commerce.department(),
    };
    return product;
 };
    
 export const randomProducts = () =>{
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = generateProduct();
        products.push(product);
    }
    return products;
};
  