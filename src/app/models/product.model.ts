export class Product {
    constructor(
        public id:number,
        public user_id:number,
        public category_id:number,
        public name:string,
        public description:string,
        public image:string,
        public status:string,
        public price:number,
        public stock:number
    ){}
}