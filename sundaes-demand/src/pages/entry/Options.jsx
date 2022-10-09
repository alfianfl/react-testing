import { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import {pricePerItem} from "../../constants";
import {useOrderDetails} from "../../contexts/OrderDetails";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [OrderDetails, updateItemCount] = useOrderDetails()
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((err) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, itemCount) => updateItemCount(itemName, itemCount, optionType)}
    />
  ));
  return (
  <>
  <h2>{title}</h2>
  <p>${pricePerItem[optionType]} each</p>
  <p>{title} total: {OrderDetails.totals[optionType]}</p>
  <Row>{optionItems}</Row>
  </>)
}

export default Options;
