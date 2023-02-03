export interface Champignons {
  id?: number;
  name: string;
  category?: string,
  attaqueF?: string;
  attaqueR?: string;
  createdAt?: Date,
  updatedAt?: Date;
  imgUrl?: ImageUrl
}

export interface ImageUrl {
  img1?: string;
  img2?: string;
  img3: string;
}
