import { useState } from "react";
import { CardItem } from "../../lib/types/search";

const useBasket = () => {
  // Sahifa qayta ochilganda savatni localStorage'dan tiklaydi.
  const cardJson: string | null = localStorage.getItem("cardData");
  const currentCard = cardJson ? JSON.parse(cardJson) : [];
  const [cardItems, setCardItems] = useState<CardItem[]>(currentCard);

  // Mahsulotni ID bo'yicha topadi yoki savatga yangi qator qo'shadi.
  const onAdd = (input: CardItem) => {
    const exist = cardItems.find((item: CardItem) => item._id === input._id);

    if (exist) {
      // Savatdagi mahsulot sonini bittaga oshiradi.
      const cardUpdate = cardItems.map((item: CardItem) =>
        item._id === input._id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      // Yangilangan savatni state va localStorage'da saqlaydi.
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    } else {
      const cardUpdate = [...cardItems, { ...input }];
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    }
  };

  // Miqdorni bittaga kamaytiradi, oxirgi dona bo'lsa o'chiradi.
  const onRemove = (input: CardItem) => {
    const exist = cardItems.find((item: CardItem) => item._id === input._id);

    if (!exist) return;

    if (exist?.quantity === 1) {
      const cardUpdate = cardItems.filter(
        (item: CardItem) => item._id !== input._id,
      );

      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    } else {
      const cardUpdate = cardItems.map((item: CardItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      );
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    }
  };

  // Mahsulotni barcha donalari bilan savatdan o'chiradi.
  const onDelete = (input: CardItem) => {
    const cardUpdate = cardItems.filter(
      (item: CardItem) => item._id !== input._id,
    );
    setCardItems(cardUpdate);
    localStorage.setItem("cardData", JSON.stringify(cardUpdate));
  };

  // Savatni bo'shatib, localStorage'dagi ro'yxatni o'chiradi.
  const onDeleteAll = () => {
    setCardItems([]);
    localStorage.removeItem("cardData");
  };

  return {
    cardItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
