import { nanoid } from "@reduxjs/toolkit";

const listItem = [
  {
    id: nanoid(),
    heading: "Company",
    list_item_1: "features",
    list_item_2: "pricing",
    list_item_3: "affiliate program",
    list_item_4: "press kit",
  },

  {
    id: nanoid(),
    heading: "support",
    list_item_1: "Account",
    list_item_2: "help",
    list_item_3: "contact us",
    list_item_4: "customer support",
  },
  {
    id: nanoid(),
    heading: "legals",
    list_item_1: "terms and consitions",
    list_item_2: "privacy policy",
    list_item_3: "licensing",
    // list_item_4: "",
  },
];

export default listItem;
