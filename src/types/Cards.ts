export interface ICard {
    id: string;
    imageURL: string;
    title: string;
    isCompleted: boolean;
    isSelected: boolean;
    reward: number;
    price?: number;
  }